/**
 * React Hook for Real-time Audio Level Metering
 * Receives level data from the JUCE processor via WebView events
 */

import { useState, useEffect } from 'react';
import { addCustomEventListener, isInJuceWebView } from '../lib/juce-bridge';

interface AudioLevels {
  inputLevel: number;
  outputLevel: number;
  inputLevelL: number;
  inputLevelR: number;
  outputLevelL: number;
  outputLevelR: number;
}

interface UseAudioLevelsReturn extends AudioLevels {
  isConnected: boolean;
}

/**
 * Hook to receive real-time audio levels from the JUCE processor.
 * Updates at ~30fps when audio is playing.
 */
export function useAudioLevels(): UseAudioLevelsReturn {
  const [levels, setLevels] = useState<AudioLevels>({
    inputLevel: 0,
    outputLevel: 0,
    inputLevelL: 0,
    inputLevelR: 0,
    outputLevelL: 0,
    outputLevelR: 0,
  });

  const isConnected = isInJuceWebView();

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    const removeListener = addCustomEventListener('audioLevels', (data) => {
      const levelData = data as AudioLevels;
      setLevels({
        inputLevel: levelData.inputLevel ?? 0,
        outputLevel: levelData.outputLevel ?? 0,
        inputLevelL: levelData.inputLevelL ?? 0,
        inputLevelR: levelData.inputLevelR ?? 0,
        outputLevelL: levelData.outputLevelL ?? 0,
        outputLevelR: levelData.outputLevelR ?? 0,
      });
    });

    return removeListener;
  }, [isConnected]);

  return {
    ...levels,
    isConnected,
  };
}
