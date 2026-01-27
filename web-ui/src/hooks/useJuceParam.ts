/**
 * React Hooks for JUCE 8 Parameter Binding
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getSliderState,
  getToggleState,
  isInJuceWebView,
} from '../lib/juce-bridge';

// ==============================================================================
// useSliderParam - Continuous Float Parameters
// ==============================================================================

interface SliderParamOptions {
  defaultValue?: number;
}

interface SliderParamReturn {
  value: number;
  setValue: (value: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  isConnected: boolean;
}

export function useSliderParam(
  paramId: string,
  options: SliderParamOptions = {}
): SliderParamReturn {
  const { defaultValue = 0.5 } = options;
  const [value, setValueState] = useState(defaultValue);
  const stateRef = useRef(getSliderState(paramId));
  const isDraggingRef = useRef(false);
  const isConnected = isInJuceWebView();

  useEffect(() => {
    const state = stateRef.current;

    if (isConnected) {
      setValueState(state.getNormalisedValue());
    }

    const listenerId = state.valueChangedEvent.addListener(() => {
      // Ignore JUCE value updates while dragging - use our optimistic value instead
      if (!isDraggingRef.current) {
        setValueState(state.getNormalisedValue());
      }
    });

    return () => {
      state.valueChangedEvent.removeListener(listenerId);
    };
  }, [isConnected]);

  const setValue = useCallback((newValue: number) => {
    setValueState(newValue);
    stateRef.current.setNormalisedValue(newValue);
  }, []);

  const onDragStart = useCallback(() => {
    isDraggingRef.current = true;
    stateRef.current.sliderDragStarted();
  }, []);

  const onDragEnd = useCallback(() => {
    isDraggingRef.current = false;
    stateRef.current.sliderDragEnded();
    // Sync with JUCE's final value after drag ends
    setValueState(stateRef.current.getNormalisedValue());
  }, []);

  return { value, setValue, onDragStart, onDragEnd, isConnected };
}

// ==============================================================================
// useToggleParam - Boolean Parameters
// ==============================================================================

interface ToggleParamOptions {
  defaultValue?: boolean;
}

interface ToggleParamReturn {
  value: boolean;
  setValue: (value: boolean) => void;
  toggle: () => void;
  isConnected: boolean;
}

export function useToggleParam(
  paramId: string,
  options: ToggleParamOptions = {}
): ToggleParamReturn {
  const { defaultValue = false } = options;
  const [value, setValueState] = useState(defaultValue);
  const stateRef = useRef(getToggleState(paramId));
  const isConnected = isInJuceWebView();

  useEffect(() => {
    const state = stateRef.current;

    if (isConnected) {
      setValueState(state.getValue());
    }

    const listenerId = state.valueChangedEvent.addListener(() => {
      setValueState(state.getValue());
    });

    return () => {
      state.valueChangedEvent.removeListener(listenerId);
    };
  }, [isConnected]);

  const setValue = useCallback((newValue: boolean) => {
    setValueState(newValue);
    stateRef.current.setValue(newValue);
  }, []);

  const toggle = useCallback(() => {
    const newValue = !stateRef.current.getValue();
    setValueState(newValue);
    stateRef.current.setValue(newValue);
  }, []);

  return { value, setValue, toggle, isConnected };
}
