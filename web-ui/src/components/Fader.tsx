import React, { useRef, useCallback } from 'react';

interface FaderProps {
  value: number;
  onChange: (value: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  label: string;
  min?: number;
  max?: number;
}

export function Fader({
  value,
  onChange,
  onDragStart,
  onDragEnd,
  label,
  min = 0,
  max = 1,
}: FaderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const normalizedValue = (value - min) / (max - min);
  const thumbBottom = normalizedValue * 60; // Track height minus padding and thumb

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      onDragStart?.();

      const updateValue = (clientY: number) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const relativeY = rect.bottom - clientY;
        const newValue = Math.max(min, Math.min(max, (relativeY / rect.height) * (max - min) + min));
        onChange(newValue);
      };

      updateValue(e.clientY);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDragging.current) return;
        updateValue(moveEvent.clientY);
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
    [min, max, onChange, onDragStart, onDragEnd]
  );

  const handleDoubleClick = useCallback(() => {
    onChange(0.5);
  }, [onChange]);

  return (
    <div className="fader-container">
      <div
        ref={trackRef}
        className="fader-track"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="fader-groove" />
        <div className="fader-thumb" style={{ bottom: `${thumbBottom}px` }} />
      </div>
      <span className="fader-label">{label}</span>
    </div>
  );
}
