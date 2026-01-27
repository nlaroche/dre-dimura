#pragma once

#include <juce_dsp/juce_dsp.h>
#include "Effects/EffectsDSP.h"

/**
 * PreampDSP - Vintage console/tube preamp emulation
 *
 * Combines transformer saturation characteristics with tube harmonic generation
 * to recreate the "accidental mojo" of vintage studio equipment.
 *
 * Signal flow:
 * Input -> Transformer Stage -> Tube Stage -> Tone Shaping -> Effects Chain -> Output
 *
 * Effects Chain Order: Distortion -> Filter -> Modulation -> Delay -> Reverb
 */
class PreampDSP
{
public:
    PreampDSP();

    void prepare(const juce::dsp::ProcessSpec& spec);
    void reset();

    template <typename ProcessContext>
    void process(const ProcessContext& context);

    // Parameter setters (0.0 to 1.0 normalized range)
    void setDrive(float newDrive);
    void setTone(float newTone);
    void setOutputGain(float newOutput);

    // Cathode effect setters
    void setCathEmber(float mix);
    void setCathHaze(float mix);
    void setCathEcho(float mix);
    void setCathDrift(float mix);
    void setCathVelvet(float mix);

    // Filament effect setters
    void setFilFracture(float mix);
    void setFilGlisten(float mix);
    void setFilCascade(float mix);
    void setFilPhase(float mix);
    void setFilPrism(float mix);

    // Steel Plate effect setters
    void setSteelScorch(float mix);
    void setSteelRust(float mix);
    void setSteelGrind(float mix);
    void setSteelShred(float mix);
    void setSteelSnarl(float mix);

private:
    // Saturation function combining transformer and tube characteristics
    float processSample(float input);

    // Soft clipping with asymmetric harmonics (tube-like)
    float softClip(float x);

    // Transformer saturation (symmetric, subtle)
    float transformerSaturate(float x);

    // Parameters
    juce::SmoothedValue<float> driveGain;
    juce::SmoothedValue<float> toneValue;
    juce::SmoothedValue<float> outputGain;

    // Tone control filter
    juce::dsp::IIR::Filter<float> toneFilterL;
    juce::dsp::IIR::Filter<float> toneFilterR;

    // DC blocking
    juce::dsp::IIR::Filter<float> dcBlockerL;
    juce::dsp::IIR::Filter<float> dcBlockerR;

    double sampleRate = 44100.0;

    // Internal state for subtle nonlinearity memory
    float lastSampleL = 0.0f;
    float lastSampleR = 0.0f;

    // ======================================
    // Effect Instances
    // ======================================

    // Cathode Effects (Warm, Vintage, Tube)
    EmberDSP cathEmber;    // Distortion
    VelvetDSP cathVelvet;  // Filter
    DriftDSP cathDrift;    // Modulation
    EchoDSP cathEcho;      // Delay
    HazeDSP cathHaze;      // Reverb

    // Filament Effects (Cold, Digital, Precise)
    FractureDSP filFracture;  // Distortion
    PrismDSP filPrism;        // Filter
    PhaseDSP filPhase;        // Modulation
    CascadeDSP filCascade;    // Delay
    GlistenDSP filGlisten;    // Reverb

    // Steel Plate Effects (Aggressive, Industrial, Raw)
    ScorchDSP steelScorch;  // Distortion
    SnarlDSP steelSnarl;    // Filter
    ShredDSP steelShred;    // Modulation
    GrindDSP steelGrind;    // Delay
    RustDSP steelRust;      // Reverb
};

// Template implementation
template <typename ProcessContext>
void PreampDSP::process(const ProcessContext& context)
{
    auto& inputBlock = context.getInputBlock();
    auto& outputBlock = context.getOutputBlock();

    const auto numChannels = outputBlock.getNumChannels();
    const auto numSamples = outputBlock.getNumSamples();

    if (context.isBypassed)
    {
        outputBlock.copyFrom(inputBlock);
        return;
    }

    // Process preamp per-sample
    for (size_t sample = 0; sample < numSamples; ++sample)
    {
        float drive = driveGain.getNextValue();
        float tone = toneValue.getNextValue();
        float outGain = outputGain.getNextValue();

        // Update tone filter coefficients when tone changes
        // Tone control: 0.0 = darker, 0.5 = neutral, 1.0 = brighter
        float cutoff = 800.0f + (tone * 4000.0f); // 800 Hz to 4800 Hz
        auto coeffs = juce::dsp::IIR::Coefficients<float>::makeLowShelf(
            sampleRate, cutoff, 0.707f, 0.5f + tone);
        *toneFilterL.coefficients = *coeffs;
        *toneFilterR.coefficients = *coeffs;

        for (size_t channel = 0; channel < numChannels; ++channel)
        {
            auto ch = static_cast<int>(channel);
            auto smp = static_cast<int>(sample);

            float input = inputBlock.getSample(ch, smp);

            // Apply input drive
            float driven = input * (1.0f + drive * 3.0f);

            // Transformer stage (subtle, symmetric saturation)
            float transformed = transformerSaturate(driven);

            // Tube stage (asymmetric harmonics)
            float tubed = softClip(transformed);

            // Apply tone shaping
            float shaped = (channel == 0)
                ? toneFilterL.processSample(tubed)
                : toneFilterR.processSample(tubed);

            // DC blocking
            float dcBlocked = (channel == 0)
                ? dcBlockerL.processSample(shaped)
                : dcBlockerR.processSample(shaped);

            // Output gain (before effects)
            float output = dcBlocked * outGain;

            outputBlock.setSample(ch, smp, output);
        }
    }

    // ======================================
    // Effects Chain Processing (block-based)
    // Order: Distortion -> Filter -> Modulation -> Delay -> Reverb
    // ======================================

    // Get raw pointers for effect processing
    auto numSamplesInt = static_cast<int>(numSamples);
    float* leftChannel = outputBlock.getChannelPointer(0);
    float* rightChannel = (numChannels > 1) ? outputBlock.getChannelPointer(1) : leftChannel;

    // Cathode Effects Chain
    cathEmber.process(leftChannel, rightChannel, numSamplesInt);    // Distortion
    cathVelvet.process(leftChannel, rightChannel, numSamplesInt);   // Filter
    cathDrift.process(leftChannel, rightChannel, numSamplesInt);    // Modulation
    cathEcho.process(leftChannel, rightChannel, numSamplesInt);     // Delay
    cathHaze.process(leftChannel, rightChannel, numSamplesInt);     // Reverb

    // Filament Effects Chain
    filFracture.process(leftChannel, rightChannel, numSamplesInt);  // Distortion
    filPrism.process(leftChannel, rightChannel, numSamplesInt);     // Filter
    filPhase.process(leftChannel, rightChannel, numSamplesInt);     // Modulation
    filCascade.process(leftChannel, rightChannel, numSamplesInt);   // Delay
    filGlisten.process(leftChannel, rightChannel, numSamplesInt);   // Reverb

    // Steel Plate Effects Chain
    steelScorch.process(leftChannel, rightChannel, numSamplesInt);  // Distortion
    steelSnarl.process(leftChannel, rightChannel, numSamplesInt);   // Filter
    steelShred.process(leftChannel, rightChannel, numSamplesInt);   // Modulation
    steelGrind.process(leftChannel, rightChannel, numSamplesInt);   // Delay
    steelRust.process(leftChannel, rightChannel, numSamplesInt);    // Reverb
}
