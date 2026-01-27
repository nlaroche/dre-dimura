#pragma once

#include <juce_dsp/juce_dsp.h>
#include <vector>
#include <cmath>

/**
 * Base class for all single-parameter effects
 * Each effect has only a Mix parameter (0.0 = dry, 1.0 = full wet)
 */
class EffectBase
{
public:
    virtual ~EffectBase() = default;

    virtual void prepare(const juce::dsp::ProcessSpec& spec)
    {
        sampleRate = spec.sampleRate;
        mix.reset(sampleRate, 0.02);  // 20ms smoothing
    }

    virtual void reset()
    {
        mix.reset(sampleRate, 0.02);
    }

    void setMix(float newMix) { mix.setTargetValue(newMix); }

    // Process stereo buffer in-place
    virtual void process(float* leftChannel, float* rightChannel, int numSamples) = 0;

protected:
    double sampleRate = 44100.0;
    juce::SmoothedValue<float> mix;
};

// =============================================================================
// CATHODE EFFECTS (Warm, Vintage, Tube)
// =============================================================================

/**
 * Ember - Asymmetric tube saturation with even harmonics
 * Warm, musical breakup character
 */
class EmberDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void reset() override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;

private:
    float processSample(float input);
    float lastSampleL = 0.0f;
    float lastSampleR = 0.0f;
};

/**
 * Haze - Dark plate reverb with rolled-off highs
 * Vintage spring-like warmth
 */
class HazeDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void reset() override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;

private:
    // Simple comb filter delay lines for reverb
    std::vector<float> delayBufferL1, delayBufferL2, delayBufferR1, delayBufferR2;
    int writePos1 = 0, writePos2 = 0;
    juce::dsp::IIR::Filter<float> lpfL, lpfR;  // Darken filter
    float feedbackL = 0.0f, feedbackR = 0.0f;
};

/**
 * Echo - Tape delay emulation with wow/flutter
 * Organic, degrading repeats
 */
class EchoDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void reset() override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;

private:
    std::vector<float> delayBufferL, delayBufferR;
    int writePos = 0;
    float lfoPhase = 0.0f;
    juce::dsp::IIR::Filter<float> lpfL, lpfR;  // Tape tone
    float feedbackL = 0.0f, feedbackR = 0.0f;
};

/**
 * Drift - Slow chorus with tape-style modulation
 * Subtle, dreamy movement
 */
class DriftDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void reset() override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;

private:
    std::vector<float> delayBufferL, delayBufferR;
    int writePos = 0;
    float lfoPhase = 0.0f;
};

/**
 * Velvet - Smooth low-pass filter with resonance
 * Silky, rounded tone
 */
class VelvetDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void reset() override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;

private:
    juce::dsp::IIR::Filter<float> filterL, filterR;
};

// =============================================================================
// FILAMENT EFFECTS (Cold, Digital, Precise)
// =============================================================================

/**
 * Fracture - Digital clipping with aliasing artifacts
 * Crisp, aggressive edge
 */
class FractureDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;
};

/**
 * Glisten - Shimmer reverb with pitch-shifted tails
 * Ethereal, crystalline space
 */
class GlistenDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void reset() override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;

private:
    std::vector<float> delayBufferL, delayBufferR;
    std::vector<float> shimmerBufferL, shimmerBufferR;
    int writePos = 0, shimmerPos = 0;
    float shimmerPhase = 0.0f;
    juce::dsp::IIR::Filter<float> hpfL, hpfR;  // Brighten filter
};

/**
 * Cascade - Multi-tap digital delay, pristine
 * Clean, rhythmic repeats
 */
class CascadeDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void reset() override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;

private:
    std::vector<float> delayBufferL, delayBufferR;
    int writePos = 0;
    static constexpr int NUM_TAPS = 4;
    int tapDelays[NUM_TAPS] = {0, 0, 0, 0};
    float tapGains[NUM_TAPS] = {0.7f, 0.5f, 0.35f, 0.2f};
};

/**
 * Phase - Through-zero flanger, metallic
 * Sharp, jet-like sweep
 */
class PhaseDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void reset() override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;

private:
    std::vector<float> delayBufferL, delayBufferR;
    int writePos = 0;
    float lfoPhase = 0.0f;
    float feedbackL = 0.0f, feedbackR = 0.0f;
};

/**
 * Prism - Comb filter with feedback
 * Hollow, resonant coloring
 */
class PrismDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void reset() override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;

private:
    std::vector<float> delayBufferL, delayBufferR;
    int writePos = 0;
    float feedbackL = 0.0f, feedbackR = 0.0f;
};

// =============================================================================
// STEEL PLATE EFFECTS (Aggressive, Industrial, Raw)
// =============================================================================

/**
 * Scorch - Hard clipping + rectification
 * Brutal, relentless drive
 */
class ScorchDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;
};

/**
 * Rust - Gated reverb with harsh reflections
 * Industrial, punchy space
 */
class RustDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void reset() override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;

private:
    std::vector<float> delayBufferL1, delayBufferL2, delayBufferR1, delayBufferR2;
    int writePos1 = 0, writePos2 = 0;
    float envelope = 0.0f;
};

/**
 * Grind - Bit-crushed delay with degradation
 * Lo-fi, destroyed repeats
 */
class GrindDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void reset() override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;

private:
    std::vector<float> delayBufferL, delayBufferR;
    int writePos = 0;
    float feedbackL = 0.0f, feedbackR = 0.0f;
    int sampleHoldCounter = 0;
    float heldSampleL = 0.0f, heldSampleR = 0.0f;
};

/**
 * Shred - Aggressive ring modulation blend
 * Metallic, inharmonic
 */
class ShredDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;

private:
    float oscPhase = 0.0f;
};

/**
 * Snarl - Aggressive band-pass with distortion
 * Nasty, focused bite
 */
class SnarlDSP : public EffectBase
{
public:
    void prepare(const juce::dsp::ProcessSpec& spec) override;
    void reset() override;
    void process(float* leftChannel, float* rightChannel, int numSamples) override;

private:
    juce::dsp::IIR::Filter<float> bpfL, bpfR;
};
