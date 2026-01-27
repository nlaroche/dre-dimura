import React, { useRef, useCallback } from 'react';

export type KnobVariant = 'golden' | 'jade' | 'obsidian' | 'porta';
export type KnobSize = 'normal' | 'small';

interface KnobProps {
  value: number;
  onChange: (value: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  label: string;
  variant?: KnobVariant;
  size?: KnobSize;
  min?: number;
  max?: number;
}

export function Knob({
  value,
  onChange,
  onDragStart,
  onDragEnd,
  label,
  variant = 'golden',
  size = 'normal',
  min = 0,
  max = 1,
}: KnobProps) {
  const knobRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  const normalizedValue = (value - min) / (max - min);
  const rotation = -135 + normalizedValue * 270;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      startY.current = e.clientY;
      startValue.current = value;
      onDragStart?.();

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDragging.current) return;

        const deltaY = startY.current - moveEvent.clientY;
        const sensitivity = 0.005;
        const newValue = Math.max(
          min,
          Math.min(max, startValue.current + deltaY * sensitivity)
        );
        onChange(newValue);
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        onDragEnd?.();
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [value, min, max, onChange, onDragStart, onDragEnd]
  );

  const handleDoubleClick = useCallback(() => {
    onChange(0.5);
  }, [onChange]);

  const sizeClass = size === 'small' ? 'small' : '';

  return (
    <div className={`knob-container ${variant} ${sizeClass}`}>
      <div
        ref={knobRef}
        className="knob-body"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="knob-outer">
          <div
            className="knob-inner"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="knob-pointer" />
          </div>
        </div>
      </div>
      <span className="knob-label">{label}</span>
    </div>
  );
}
