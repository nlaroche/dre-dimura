import React, { useRef, useCallback } from 'react';

type KnobSize = 'small' | 'medium' | 'large';

interface KnobProps {
  value: number;
  onChange: (value: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  label: string;
  min?: number;
  max?: number;
  size?: KnobSize;
}

const sizeMap: Record<KnobSize, number> = {
  small: 52,
  medium: 64,
  large: 80,
};

export function Knob({
  value,
  onChange,
  onDragStart,
  onDragEnd,
  label,
  min = 0,
  max = 1,
  size = 'medium',
}: KnobProps) {
  const knobRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  const sizeInPixels = sizeMap[size];
  const normalizedValue = (value - min) / (max - min);
  const rotation = -135 + normalizedValue * 270;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
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
    onChange((max - min) / 2 + min);
  }, [onChange, min, max]);

  const displayValue = Math.round(normalizedValue * 100);

  return (
    <div className={`knob-container ${size}`}>
      <div
        ref={knobRef}
        className="knob"
        style={{
          width: sizeInPixels,
          height: sizeInPixels,
          transform: `rotate(${rotation}deg)`,
        }}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="knob-cap">
          <div className="knob-indicator" />
        </div>
      </div>
      <div className="knob-value">{displayValue}%</div>
      <div className="knob-label">{label}</div>
    </div>
  );
}
