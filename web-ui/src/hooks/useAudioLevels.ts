/**
 * React Hook for receiving audio levels from C++ processor
 */

import { useState, useEffect, useRef } from 'react';
import { addCustomEventListener, isInJuceWebView } from '../lib/juce-bridge';

interface AudioLevels {
  inputLevel: number;
  outputLevel: number;
}

/**
 * Hook to receive audio level data from the C++ audio processor.
 * Returns smoothed input and output levels (0-1 range).
 */
export function useAudioLevels(): AudioLevels {
  const [levels, setLevels] = useState<AudioLevels>({
    inputLevel: 0,
    outputLevel: 0,
  });

  // Smoothing for VU-style meter response
  const smoothedRef = useRef({ input: 0, output: 0 });

  useEffect(() => {
    if (!isInJuceWebView()) {
      // In development mode, simulate some activity
      let frame: number;
      const simulate = () => {
        const t = Date.now() * 0.001;
        const simLevel = 0.3 + Math.sin(t * 2) * 0.15 + Math.random() * 0.1;
        setLevels({
          inputLevel: simLevel,
          outputLevel: simLevel * 0.9,
        });
        frame = requestAnimationFrame(simulate);
      };
      frame = requestAnimationFrame(simulate);
      return () => cancelAnimationFrame(frame);
    }

    // Listen for audio level events from C++
    const removeListener = addCustomEventListener('audioLevels', (data) => {
      const levelData = data as { inputLevel: number; outputLevel: number };

      // VU meter smoothing (attack ~10ms, release ~300ms)
      const attackCoeff = 0.3;
      const releaseCoeff = 0.05;

      const smoothInput = levelData.inputLevel > smoothedRef.current.input
        ? smoothedRef.current.input + (levelData.inputLevel - smoothedRef.current.input) * attackCoeff
        : smoothedRef.current.input + (levelData.inputLevel - smoothedRef.current.input) * releaseCoeff;

      const smoothOutput = levelData.outputLevel > smoothedRef.current.output
        ? smoothedRef.current.output + (levelData.outputLevel - smoothedRef.current.output) * attackCoeff
        : smoothedRef.current.output + (levelData.outputLevel - smoothedRef.current.output) * releaseCoeff;

      smoothedRef.current = { input: smoothInput, output: smoothOutput };

      setLevels({
        inputLevel: smoothInput,
        outputLevel: smoothOutput,
      });
    });

    return removeListener;
  }, []);

  return levels;
}
