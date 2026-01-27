import { useMemo } from 'react';

export type VUVariant = 'golden' | 'jade';

interface VUMeterProps {
  value: number;
  variant?: VUVariant;
  label?: string;
}

export function VUMeter({ value, variant = 'golden', label = 'Level' }: VUMeterProps) {
  const needleAngle = useMemo(() => {
    // Needle swings from -45deg (min) to +45deg (max)
    return -45 + value * 90;
  }, [value]);

  return (
    <div className={`vu-wrapper ${variant}-vu`}>
      <div className="vu-meter">
        {/* Scale arc */}
        <div className="vu-scale" />

        {/* Scale markings */}
        <div className="vu-markings">
          <span className="vu-mark">-20</span>
          <span className="vu-mark">-10</span>
          <span className="vu-mark">0</span>
          <span className="vu-mark red">+3</span>
        </div>

        {/* Needle */}
        <div
          className="vu-needle"
          style={{ transform: `rotate(${needleAngle}deg)` }}
        />
        <div className="vu-needle-pivot" />
      </div>

      <div className="vu-label">{label}</div>
    </div>
  );
}
