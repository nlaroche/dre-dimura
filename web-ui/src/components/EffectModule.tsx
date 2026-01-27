import React, { useRef, useCallback } from 'react';
import { useSliderParam } from '../hooks/useJuceParam';

type EffectTheme = 'cathode' | 'filament' | 'steelplate';

interface EffectModuleProps {
  paramId: string;
  name: string;
  theme: EffectTheme;
}

/**
 * EffectModule - Compact effect control with small knob
 * Self-contained: manages its own parameter state to avoid parent re-renders
 */
export function EffectModule({
  paramId,
  name,
  theme,
}: EffectModuleProps) {
  // Each module manages its own state - no parent re-renders when value changes
  const param = useSliderParam(paramId, { defaultValue: 0 });

  const knobRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  const isActive = param.value > 0.01;
  const rotation = -135 + param.value * 270;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      startY.current = e.clientY;
      startValue.current = param.value;
      param.onDragStart?.();

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDragging.current) return;

        const deltaY = startY.current - moveEvent.clientY;
        const sensitivity = 0.005;
        const newValue = Math.max(0, Math.min(1, startValue.current + deltaY * sensitivity));
        param.setValue(newValue);
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        param.onDragEnd?.();
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [param]
  );

  const handleDoubleClick = useCallback(() => {
    param.setValue(0);  // Reset to off on double-click
  }, [param]);

  return (
    <div className={`effect-module ${theme} ${isActive ? 'active' : ''}`}>
      <span className="effect-name">{name}</span>
      <div
        ref={knobRef}
        className="effect-knob"
        style={{ transform: `rotate(${rotation}deg)` }}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="effect-knob-cap">
          <div className="effect-knob-indicator" />
        </div>
      </div>
      <span className="effect-value">{Math.round(param.value * 100)}%</span>
    </div>
  );
}
