#include "EffectsDSP.h"

// =============================================================================
// CATHODE EFFECTS Implementation
// =============================================================================

// --- Ember: Tube Saturation ---
void EmberDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);
    lastSampleL = 0.0f;
    lastSampleR = 0.0f;
}

void EmberDSP::reset()
{
    EffectBase::reset();
    lastSampleL = 0.0f;
    lastSampleR = 0.0f;
}

float EmberDSP::processSample(float input)
{
    // Asymmetric tube-style saturation with even harmonics
    float x = input * 2.0f;  // Boost into saturation

    // Positive half: softer clipping (even harmonics)
    if (x > 0.0f)
    {
        x = std::tanh(x * 0.8f) * 1.1f;
    }
    // Negative half: harder clipping
    else
    {
        x = std::tanh(x * 1.2f);
    }

    return x * 0.7f;  // Output scaling
}

void EmberDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        // Add subtle low-pass smoothing for warmth
        float wetL = processSample(dryL * 0.7f + lastSampleL * 0.3f);
        float wetR = processSample(dryR * 0.7f + lastSampleR * 0.3f);

        lastSampleL = dryL;
        lastSampleR = dryR;

        leftChannel[i] = dryL + (wetL - dryL) * mixVal;
        rightChannel[i] = dryR + (wetR - dryR) * mixVal;
    }
}

// --- Haze: Dark Plate Reverb ---
void HazeDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);

    // Initialize delay lines for diffuse reverb
    int delay1 = static_cast<int>(0.037 * sampleRate);  // ~37ms
    int delay2 = static_cast<int>(0.053 * sampleRate);  // ~53ms

    delayBufferL1.resize(delay1, 0.0f);
    delayBufferL2.resize(delay2, 0.0f);
    delayBufferR1.resize(delay1, 0.0f);
    delayBufferR2.resize(delay2, 0.0f);

    writePos1 = 0;
    writePos2 = 0;

    // Dark low-pass at 2kHz
    auto coeffs = juce::dsp::IIR::Coefficients<float>::makeLowPass(sampleRate, 2000.0f, 0.7f);
    lpfL.coefficients = coeffs;
    lpfR.coefficients = coeffs;
}

void HazeDSP::reset()
{
    EffectBase::reset();
    std::fill(delayBufferL1.begin(), delayBufferL1.end(), 0.0f);
    std::fill(delayBufferL2.begin(), delayBufferL2.end(), 0.0f);
    std::fill(delayBufferR1.begin(), delayBufferR1.end(), 0.0f);
    std::fill(delayBufferR2.begin(), delayBufferR2.end(), 0.0f);
    lpfL.reset();
    lpfR.reset();
    feedbackL = feedbackR = 0.0f;
}

void HazeDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        // Read from delay lines
        float tap1L = delayBufferL1[writePos1];
        float tap2L = delayBufferL2[writePos2];
        float tap1R = delayBufferR1[writePos1];
        float tap2R = delayBufferR2[writePos2];

        // Mix taps and apply feedback
        float wetL = lpfL.processSample(tap1L * 0.6f + tap2L * 0.4f);
        float wetR = lpfR.processSample(tap1R * 0.6f + tap2R * 0.4f);

        // Write to delay lines with cross-feedback
        delayBufferL1[writePos1] = dryL + wetR * 0.45f;
        delayBufferL2[writePos2] = wetL * 0.5f + dryL * 0.3f;
        delayBufferR1[writePos1] = dryR + wetL * 0.45f;
        delayBufferR2[writePos2] = wetR * 0.5f + dryR * 0.3f;

        // Advance write positions
        writePos1 = (writePos1 + 1) % delayBufferL1.size();
        writePos2 = (writePos2 + 1) % delayBufferL2.size();

        leftChannel[i] = dryL + wetL * mixVal;
        rightChannel[i] = dryR + wetR * mixVal;
    }
}

// --- Echo: Tape Delay ---
void EchoDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);

    // ~350ms delay (vintage tape echo time)
    int delayLength = static_cast<int>(0.35 * sampleRate);
    delayBufferL.resize(delayLength + 100, 0.0f);  // Extra for modulation
    delayBufferR.resize(delayLength + 100, 0.0f);
    writePos = 0;
    lfoPhase = 0.0f;

    // Tape-like tone (gentle roll-off)
    auto coeffs = juce::dsp::IIR::Coefficients<float>::makeLowPass(sampleRate, 4000.0f, 0.6f);
    lpfL.coefficients = coeffs;
    lpfR.coefficients = coeffs;
}

void EchoDSP::reset()
{
    EffectBase::reset();
    std::fill(delayBufferL.begin(), delayBufferL.end(), 0.0f);
    std::fill(delayBufferR.begin(), delayBufferR.end(), 0.0f);
    lpfL.reset();
    lpfR.reset();
    feedbackL = feedbackR = 0.0f;
    lfoPhase = 0.0f;
}

void EchoDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    const float lfoRate = 0.5f;  // Slow wow/flutter
    const float lfoDepth = 15.0f;  // Samples of modulation
    const int baseDelay = static_cast<int>(0.35 * sampleRate);

    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        // Wow/flutter modulation
        float mod = std::sin(lfoPhase * 2.0f * 3.14159f) * lfoDepth;
        lfoPhase += lfoRate / sampleRate;
        if (lfoPhase >= 1.0f) lfoPhase -= 1.0f;

        // Modulated read position
        float readPosF = writePos - baseDelay - mod;
        if (readPosF < 0) readPosF += delayBufferL.size();

        int readPos = static_cast<int>(readPosF);
        float frac = readPosF - readPos;
        int nextPos = (readPos + 1) % delayBufferL.size();

        // Linear interpolation for smooth modulation
        float tapL = delayBufferL[readPos] * (1.0f - frac) + delayBufferL[nextPos] * frac;
        float tapR = delayBufferR[readPos] * (1.0f - frac) + delayBufferR[nextPos] * frac;

        // Apply tape tone
        float wetL = lpfL.processSample(tapL);
        float wetR = lpfR.processSample(tapR);

        // Write with feedback
        delayBufferL[writePos] = dryL + wetL * 0.4f;
        delayBufferR[writePos] = dryR + wetR * 0.4f;

        writePos = (writePos + 1) % delayBufferL.size();

        leftChannel[i] = dryL + wetL * mixVal;
        rightChannel[i] = dryR + wetR * mixVal;
    }
}

// --- Drift: Tape Chorus ---
void DriftDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);

    // ~30ms max delay for chorus
    int delayLength = static_cast<int>(0.03 * sampleRate) + 50;
    delayBufferL.resize(delayLength, 0.0f);
    delayBufferR.resize(delayLength, 0.0f);
    writePos = 0;
    lfoPhase = 0.0f;
}

void DriftDSP::reset()
{
    EffectBase::reset();
    std::fill(delayBufferL.begin(), delayBufferL.end(), 0.0f);
    std::fill(delayBufferR.begin(), delayBufferR.end(), 0.0f);
    lfoPhase = 0.0f;
}

void DriftDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    const float lfoRate = 0.3f;  // Slow, dreamy
    const float lfoDepth = 0.012f * sampleRate;  // ~12ms modulation depth
    const float centerDelay = 0.015f * sampleRate;  // ~15ms center

    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        // Sine LFO with stereo spread
        float lfoL = std::sin(lfoPhase * 2.0f * 3.14159f) * lfoDepth;
        float lfoR = std::sin((lfoPhase + 0.25f) * 2.0f * 3.14159f) * lfoDepth;  // 90 degree offset
        lfoPhase += lfoRate / sampleRate;
        if (lfoPhase >= 1.0f) lfoPhase -= 1.0f;

        // Modulated read positions
        float readPosL = writePos - centerDelay - lfoL;
        float readPosR = writePos - centerDelay - lfoR;
        if (readPosL < 0) readPosL += delayBufferL.size();
        if (readPosR < 0) readPosR += delayBufferR.size();

        int rPosL = static_cast<int>(readPosL);
        int rPosR = static_cast<int>(readPosR);
        float fracL = readPosL - rPosL;
        float fracR = readPosR - rPosR;

        // Linear interpolation
        float wetL = delayBufferL[rPosL] * (1.0f - fracL) +
                     delayBufferL[(rPosL + 1) % delayBufferL.size()] * fracL;
        float wetR = delayBufferR[rPosR] * (1.0f - fracR) +
                     delayBufferR[(rPosR + 1) % delayBufferR.size()] * fracR;

        // Write dry signal
        delayBufferL[writePos] = dryL;
        delayBufferR[writePos] = dryR;
        writePos = (writePos + 1) % delayBufferL.size();

        leftChannel[i] = dryL + (wetL - dryL) * mixVal * 0.7f;
        rightChannel[i] = dryR + (wetR - dryR) * mixVal * 0.7f;
    }
}

// --- Velvet: Smooth Low-Pass ---
void VelvetDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);

    // Warm, smooth low-pass at 3kHz with resonance
    auto coeffs = juce::dsp::IIR::Coefficients<float>::makeLowPass(sampleRate, 3000.0f, 1.2f);
    filterL.coefficients = coeffs;
    filterR.coefficients = coeffs;
}

void VelvetDSP::reset()
{
    EffectBase::reset();
    filterL.reset();
    filterR.reset();
}

void VelvetDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    // Get current mix value once per block for coefficient calculation
    float currentMix = mix.getCurrentValue();

    // Only update coefficients at block rate (not per-sample)
    if (currentMix > 0.001f)
    {
        float cutoff = 3000.0f - currentMix * 2000.0f;  // 3kHz to 1kHz
        auto coeffs = juce::dsp::IIR::Coefficients<float>::makeLowPass(sampleRate, cutoff, 1.0f + currentMix * 0.5f);
        *filterL.coefficients = *coeffs;
        *filterR.coefficients = *coeffs;
    }

    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        float wetL = filterL.processSample(dryL);
        float wetR = filterR.processSample(dryR);

        leftChannel[i] = dryL + (wetL - dryL) * mixVal;
        rightChannel[i] = dryR + (wetR - dryR) * mixVal;
    }
}

// =============================================================================
// FILAMENT EFFECTS Implementation
// =============================================================================

// --- Fracture: Digital Clipping ---
void FractureDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);
}

void FractureDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        // Hard digital clipping with pre-gain based on mix
        float gain = 1.0f + mixVal * 4.0f;
        float wetL = std::max(-1.0f, std::min(1.0f, dryL * gain));
        float wetR = std::max(-1.0f, std::min(1.0f, dryR * gain));

        // Add subtle aliasing by quantizing
        float bits = 12.0f - mixVal * 4.0f;  // 12-bit to 8-bit
        float levels = std::pow(2.0f, bits);
        wetL = std::round(wetL * levels) / levels;
        wetR = std::round(wetR * levels) / levels;

        leftChannel[i] = dryL + (wetL - dryL) * mixVal;
        rightChannel[i] = dryR + (wetR - dryR) * mixVal;
    }
}

// --- Glisten: Shimmer Reverb ---
void GlistenDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);

    // Main reverb delay
    int delayLength = static_cast<int>(0.08 * sampleRate);
    delayBufferL.resize(delayLength, 0.0f);
    delayBufferR.resize(delayLength, 0.0f);

    // Shimmer pitch-shift buffer
    int shimmerLength = static_cast<int>(0.04 * sampleRate);
    shimmerBufferL.resize(shimmerLength, 0.0f);
    shimmerBufferR.resize(shimmerLength, 0.0f);

    writePos = 0;
    shimmerPos = 0;
    shimmerPhase = 0.0f;

    // High-pass to brighten shimmer
    auto coeffs = juce::dsp::IIR::Coefficients<float>::makeHighPass(sampleRate, 2000.0f, 0.7f);
    hpfL.coefficients = coeffs;
    hpfR.coefficients = coeffs;
}

void GlistenDSP::reset()
{
    EffectBase::reset();
    std::fill(delayBufferL.begin(), delayBufferL.end(), 0.0f);
    std::fill(delayBufferR.begin(), delayBufferR.end(), 0.0f);
    std::fill(shimmerBufferL.begin(), shimmerBufferL.end(), 0.0f);
    std::fill(shimmerBufferR.begin(), shimmerBufferR.end(), 0.0f);
    hpfL.reset();
    hpfR.reset();
    shimmerPhase = 0.0f;
}

void GlistenDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    const float pitchShiftRatio = 2.0f;  // Octave up

    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        // Read main reverb
        float reverbL = delayBufferL[writePos];
        float reverbR = delayBufferR[writePos];

        // Simple pitch-shift via phase vocoder approximation
        shimmerPhase += pitchShiftRatio;
        if (shimmerPhase >= shimmerBufferL.size()) shimmerPhase -= shimmerBufferL.size();

        int shimmerRead = static_cast<int>(shimmerPhase);
        float shimmerL = shimmerBufferL[shimmerRead] * 0.3f;
        float shimmerR = shimmerBufferR[shimmerRead] * 0.3f;

        // High-pass the shimmer
        shimmerL = hpfL.processSample(shimmerL);
        shimmerR = hpfR.processSample(shimmerR);

        // Combine
        float wetL = reverbL * 0.6f + shimmerL;
        float wetR = reverbR * 0.6f + shimmerR;

        // Write to buffers
        delayBufferL[writePos] = dryL + wetL * 0.35f;
        delayBufferR[writePos] = dryR + wetR * 0.35f;
        shimmerBufferL[shimmerPos] = dryL + reverbL * 0.4f;
        shimmerBufferR[shimmerPos] = dryR + reverbR * 0.4f;

        writePos = (writePos + 1) % delayBufferL.size();
        shimmerPos = (shimmerPos + 1) % shimmerBufferL.size();

        leftChannel[i] = dryL + wetL * mixVal;
        rightChannel[i] = dryR + wetR * mixVal;
    }
}

// --- Cascade: Multi-tap Delay ---
void CascadeDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);

    // ~500ms max delay
    int delayLength = static_cast<int>(0.5 * sampleRate);
    delayBufferL.resize(delayLength, 0.0f);
    delayBufferR.resize(delayLength, 0.0f);
    writePos = 0;

    // Set tap times: 125ms, 250ms, 375ms, 500ms
    tapDelays[0] = static_cast<int>(0.125 * sampleRate);
    tapDelays[1] = static_cast<int>(0.25 * sampleRate);
    tapDelays[2] = static_cast<int>(0.375 * sampleRate);
    tapDelays[3] = static_cast<int>(0.5 * sampleRate) - 1;
}

void CascadeDSP::reset()
{
    EffectBase::reset();
    std::fill(delayBufferL.begin(), delayBufferL.end(), 0.0f);
    std::fill(delayBufferR.begin(), delayBufferR.end(), 0.0f);
}

void CascadeDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        // Sum all taps
        float wetL = 0.0f, wetR = 0.0f;
        for (int t = 0; t < NUM_TAPS; ++t)
        {
            int readPos = writePos - tapDelays[t];
            if (readPos < 0) readPos += delayBufferL.size();
            wetL += delayBufferL[readPos] * tapGains[t];
            wetR += delayBufferR[readPos] * tapGains[t];
        }

        // Normalize
        wetL *= 0.5f;
        wetR *= 0.5f;

        // Write with minimal feedback for pristine sound
        delayBufferL[writePos] = dryL + wetL * 0.15f;
        delayBufferR[writePos] = dryR + wetR * 0.15f;

        writePos = (writePos + 1) % delayBufferL.size();

        leftChannel[i] = dryL + wetL * mixVal;
        rightChannel[i] = dryR + wetR * mixVal;
    }
}

// --- Phase: Through-Zero Flanger ---
void PhaseDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);

    // ~10ms max delay for flanging
    int delayLength = static_cast<int>(0.01 * sampleRate) + 10;
    delayBufferL.resize(delayLength, 0.0f);
    delayBufferR.resize(delayLength, 0.0f);
    writePos = 0;
    lfoPhase = 0.0f;
    feedbackL = feedbackR = 0.0f;
}

void PhaseDSP::reset()
{
    EffectBase::reset();
    std::fill(delayBufferL.begin(), delayBufferL.end(), 0.0f);
    std::fill(delayBufferR.begin(), delayBufferR.end(), 0.0f);
    lfoPhase = 0.0f;
    feedbackL = feedbackR = 0.0f;
}

void PhaseDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    const float lfoRate = 0.2f;  // Hz
    const float maxDelay = 0.008f * sampleRate;  // 8ms max

    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        // Triangle LFO for classic flanger sweep
        float lfo = std::abs(2.0f * lfoPhase - 1.0f);
        lfoPhase += lfoRate / sampleRate;
        if (lfoPhase >= 1.0f) lfoPhase -= 1.0f;

        // Modulated delay time
        float delayTime = lfo * maxDelay;
        float readPosF = writePos - delayTime - 1;
        if (readPosF < 0) readPosF += delayBufferL.size();

        int readPos = static_cast<int>(readPosF);
        float frac = readPosF - readPos;
        int nextPos = (readPos + 1) % delayBufferL.size();

        // Interpolated read
        float wetL = delayBufferL[readPos] * (1.0f - frac) + delayBufferL[nextPos] * frac;
        float wetR = delayBufferR[readPos] * (1.0f - frac) + delayBufferR[nextPos] * frac;

        // Through-zero effect: subtract from dry for metallic sound
        float outL = dryL - wetL * 0.7f;
        float outR = dryR - wetR * 0.7f;

        // Write with feedback
        float feedback = 0.5f + mixVal * 0.3f;
        delayBufferL[writePos] = dryL + wetL * feedback;
        delayBufferR[writePos] = dryR + wetR * feedback;

        writePos = (writePos + 1) % delayBufferL.size();

        leftChannel[i] = dryL + (outL - dryL) * mixVal;
        rightChannel[i] = dryR + (outR - dryR) * mixVal;
    }
}

// --- Prism: Comb Filter ---
void PrismDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);

    // Fixed comb delay ~7ms for hollow coloring
    int delayLength = static_cast<int>(0.007 * sampleRate);
    delayBufferL.resize(delayLength, 0.0f);
    delayBufferR.resize(delayLength, 0.0f);
    writePos = 0;
    feedbackL = feedbackR = 0.0f;
}

void PrismDSP::reset()
{
    EffectBase::reset();
    std::fill(delayBufferL.begin(), delayBufferL.end(), 0.0f);
    std::fill(delayBufferR.begin(), delayBufferR.end(), 0.0f);
    feedbackL = feedbackR = 0.0f;
}

void PrismDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        // Read delayed signal
        int readPos = writePos;
        float delayedL = delayBufferL[readPos];
        float delayedR = delayBufferR[readPos];

        // Comb filter: output = input + delayed * feedback
        float feedback = 0.5f + mixVal * 0.35f;
        float wetL = dryL + delayedL * feedback;
        float wetR = dryR + delayedR * feedback;

        // Write to buffer
        delayBufferL[writePos] = wetL;
        delayBufferR[writePos] = wetR;

        writePos = (writePos + 1) % delayBufferL.size();

        leftChannel[i] = dryL + (wetL - dryL) * mixVal * 0.7f;
        rightChannel[i] = dryR + (wetR - dryR) * mixVal * 0.7f;
    }
}

// =============================================================================
// STEEL PLATE EFFECTS Implementation
// =============================================================================

// --- Scorch: Hard Clipping ---
void ScorchDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);
}

void ScorchDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        // Aggressive hard clipping with pre-gain
        float gain = 1.0f + mixVal * 8.0f;
        float wetL = dryL * gain;
        float wetR = dryR * gain;

        // Hard clip
        wetL = std::max(-1.0f, std::min(1.0f, wetL));
        wetR = std::max(-1.0f, std::min(1.0f, wetR));

        // Rectification blend for brutal harmonics
        float rectL = std::abs(wetL) * 0.3f;
        float rectR = std::abs(wetR) * 0.3f;
        wetL = wetL * 0.7f + rectL * mixVal;
        wetR = wetR * 0.7f + rectR * mixVal;

        leftChannel[i] = dryL + (wetL - dryL) * mixVal;
        rightChannel[i] = dryR + (wetR - dryR) * mixVal;
    }
}

// --- Rust: Gated Reverb ---
void RustDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);

    // Short reflections for industrial sound
    int delay1 = static_cast<int>(0.023 * sampleRate);
    int delay2 = static_cast<int>(0.047 * sampleRate);

    delayBufferL1.resize(delay1, 0.0f);
    delayBufferL2.resize(delay2, 0.0f);
    delayBufferR1.resize(delay1, 0.0f);
    delayBufferR2.resize(delay2, 0.0f);

    writePos1 = 0;
    writePos2 = 0;
    envelope = 0.0f;
}

void RustDSP::reset()
{
    EffectBase::reset();
    std::fill(delayBufferL1.begin(), delayBufferL1.end(), 0.0f);
    std::fill(delayBufferL2.begin(), delayBufferL2.end(), 0.0f);
    std::fill(delayBufferR1.begin(), delayBufferR1.end(), 0.0f);
    std::fill(delayBufferR2.begin(), delayBufferR2.end(), 0.0f);
    envelope = 0.0f;
}

void RustDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    const float attack = 0.001f;
    const float release = 0.05f;

    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        // Envelope follower
        float inputLevel = std::max(std::abs(dryL), std::abs(dryR));
        float coef = (inputLevel > envelope) ? attack : release;
        envelope = envelope + coef * (inputLevel - envelope);

        // Gate threshold
        float gate = (envelope > 0.05f) ? 1.0f : envelope / 0.05f;

        // Read reflections
        float tap1L = delayBufferL1[writePos1];
        float tap2L = delayBufferL2[writePos2];
        float tap1R = delayBufferR1[writePos1];
        float tap2R = delayBufferR2[writePos2];

        // Harsh combination
        float wetL = (tap1L * 0.7f + tap2L * 0.5f) * gate;
        float wetR = (tap1R * 0.7f + tap2R * 0.5f) * gate;

        // Write with cross-feedback
        delayBufferL1[writePos1] = dryL + tap2R * 0.3f * gate;
        delayBufferL2[writePos2] = tap1L * 0.4f + dryL * 0.3f;
        delayBufferR1[writePos1] = dryR + tap2L * 0.3f * gate;
        delayBufferR2[writePos2] = tap1R * 0.4f + dryR * 0.3f;

        writePos1 = (writePos1 + 1) % delayBufferL1.size();
        writePos2 = (writePos2 + 1) % delayBufferL2.size();

        leftChannel[i] = dryL + wetL * mixVal;
        rightChannel[i] = dryR + wetR * mixVal;
    }
}

// --- Grind: Bitcrush Delay ---
void GrindDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);

    // ~300ms delay
    int delayLength = static_cast<int>(0.3 * sampleRate);
    delayBufferL.resize(delayLength, 0.0f);
    delayBufferR.resize(delayLength, 0.0f);
    writePos = 0;
    feedbackL = feedbackR = 0.0f;
    sampleHoldCounter = 0;
    heldSampleL = heldSampleR = 0.0f;
}

void GrindDSP::reset()
{
    EffectBase::reset();
    std::fill(delayBufferL.begin(), delayBufferL.end(), 0.0f);
    std::fill(delayBufferR.begin(), delayBufferR.end(), 0.0f);
    feedbackL = feedbackR = 0.0f;
    sampleHoldCounter = 0;
    heldSampleL = heldSampleR = 0.0f;
}

void GrindDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        // Sample rate reduction (hold samples)
        int holdFactor = 1 + static_cast<int>(mixVal * 7.0f);  // 1x to 8x reduction
        sampleHoldCounter++;
        if (sampleHoldCounter >= holdFactor)
        {
            sampleHoldCounter = 0;

            // Read from delay
            int readPos = writePos;
            float delayedL = delayBufferL[readPos];
            float delayedR = delayBufferR[readPos];

            // Bit reduction
            float bits = 16.0f - mixVal * 12.0f;  // 16-bit to 4-bit
            float levels = std::pow(2.0f, bits);
            heldSampleL = std::round(delayedL * levels) / levels;
            heldSampleR = std::round(delayedR * levels) / levels;
        }

        // Write to delay with feedback
        delayBufferL[writePos] = dryL + heldSampleL * 0.5f;
        delayBufferR[writePos] = dryR + heldSampleR * 0.5f;

        writePos = (writePos + 1) % delayBufferL.size();

        leftChannel[i] = dryL + heldSampleL * mixVal;
        rightChannel[i] = dryR + heldSampleR * mixVal;
    }
}

// --- Shred: Ring Modulation ---
void ShredDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);
    oscPhase = 0.0f;
}

void ShredDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    const float oscFreq = 200.0f;  // Hz - metallic frequency

    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        // Mix-dependent frequency modulation
        float freq = oscFreq + mixVal * 300.0f;  // 200Hz to 500Hz
        float osc = std::sin(oscPhase * 2.0f * 3.14159f);
        oscPhase += freq / sampleRate;
        if (oscPhase >= 1.0f) oscPhase -= 1.0f;

        // Ring modulate
        float wetL = dryL * osc;
        float wetR = dryR * osc;

        leftChannel[i] = dryL + (wetL - dryL) * mixVal * 0.8f;
        rightChannel[i] = dryR + (wetR - dryR) * mixVal * 0.8f;
    }
}

// --- Snarl: Aggressive Band-Pass ---
void SnarlDSP::prepare(const juce::dsp::ProcessSpec& spec)
{
    EffectBase::prepare(spec);

    // Aggressive mid-focused band-pass
    auto coeffs = juce::dsp::IIR::Coefficients<float>::makeBandPass(sampleRate, 1000.0f, 3.0f);
    bpfL.coefficients = coeffs;
    bpfR.coefficients = coeffs;
}

void SnarlDSP::reset()
{
    EffectBase::reset();
    bpfL.reset();
    bpfR.reset();
}

void SnarlDSP::process(float* leftChannel, float* rightChannel, int numSamples)
{
    // Calculate filter coefficients once per block using current mix value
    float currentMix = mix.getCurrentValue();
    if (currentMix >= 0.001f)
    {
        float freq = 800.0f + currentMix * 1200.0f;  // 800Hz to 2kHz
        float q = 2.0f + currentMix * 4.0f;  // More aggressive resonance with mix
        auto coeffs = juce::dsp::IIR::Coefficients<float>::makeBandPass(sampleRate, freq, q);
        *bpfL.coefficients = *coeffs;
        *bpfR.coefficients = *coeffs;
    }

    for (int i = 0; i < numSamples; ++i)
    {
        float mixVal = mix.getNextValue();
        if (mixVal < 0.001f) continue;

        float dryL = leftChannel[i];
        float dryR = rightChannel[i];

        float filteredL = bpfL.processSample(dryL);
        float filteredR = bpfR.processSample(dryR);

        // Add distortion to filtered signal
        float gain = 1.0f + mixVal * 3.0f;
        float wetL = std::tanh(filteredL * gain);
        float wetR = std::tanh(filteredR * gain);

        leftChannel[i] = dryL + wetL * mixVal;
        rightChannel[i] = dryR + wetR * mixVal;
    }
}
