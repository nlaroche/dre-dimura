import { useState } from 'react';
import { Knob } from '../Knob';
import { GoldenTapeArt } from '../artwork/ModuleArtwork';

interface ModuleProps {
  drive: { value: number; setValue: (v: number) => void; onDragStart: () => void; onDragEnd: () => void };
  tone: { value: number; setValue: (v: number) => void; onDragStart: () => void; onDragEnd: () => void };
  output: { value: number; setValue: (v: number) => void; onDragStart: () => void; onDragEnd: () => void };
  mix: { value: number; setValue: (v: number) => void; onDragStart: () => void; onDragEnd: () => void };
  character: { value: number; setValue: (v: number) => void; onDragStart: () => void; onDragEnd: () => void };
  warmth: { value: number; setValue: (v: number) => void; onDragStart: () => void; onDragEnd: () => void };
  bypass: { value: boolean; toggle: () => void };
  audioLevels: { inputLevel: number; outputLevel: number };
}

const PRESETS = [
  'Init',
  'Warm Vintage',
  'Crispy Tape',
  'Fat Compression',
  'Gentle Squeeze',
  'Tape Saturation',
  'Lo-Fi Crunch',
];

// Modern VU Meter component
function VUMeter({ level, accent }: { level: number; accent: string }) {
  const percentage = Math.min(100, level * 100);

  return (
    <div className="vu-meter-modern">
      <div className="vu-scale">
        <span>-20</span>
        <span>-10</span>
        <span>0</span>
        <span style={{ color: '#ff6040' }}>+3</span>
      </div>
      <div className="vu-bar">
        <div
          className="vu-fill"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${accent} 0%, ${accent} 70%, #ff6040 90%, #ff3030 100%)`
          }}
        />
      </div>
    </div>
  );
}

export function EP3Module({
  drive,
  tone,
  output,
  character,
  warmth,
  bypass,
  audioLevels,
}: ModuleProps) {
  const [preset, setPreset] = useState(0);

  // Use real audio output level for VU meter
  const vuLevel = bypass.value ? 0 : Math.min(1, audioLevels.outputLevel);

  return (
    <div className={`preamp-unit golden-tape-unit ${bypass.value ? 'bypassed' : ''}`}>
      {/* Pop Art Background */}
      <GoldenTapeArt />

      {/* Content Layer */}
      <div className="module-content">
        {/* Header */}
        <div className="module-header">
          <div className="module-brand">
            <span className="module-logo">GOLDEN TAPE</span>
            <span className="module-subtitle">Echoplex EP-3 Preamp</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Preset Selector */}
            <select
              value={preset}
              onChange={(e) => setPreset(Number(e.target.value))}
              className="preset-select"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(248, 192, 96, 0.3)',
                borderRadius: '6px',
                padding: '8px 12px',
                color: '#f8c060',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              {PRESETS.map((name, i) => (
                <option key={i} value={i}>{name}</option>
              ))}
            </select>

            {/* Status Light */}
            <div
              className={`pilot-light amber ${!bypass.value ? 'on' : ''}`}
              style={{ color: '#f8c060' }}
            />
          </div>
        </div>

        {/* Main Controls */}
        <div className="module-controls">
          <div className="glass-panel controls-glass">
            <Knob
              value={drive.value}
              onChange={drive.setValue}
              onDragStart={drive.onDragStart}
              onDragEnd={drive.onDragEnd}
              label="Drive"
              variant="golden"
            />

            <VUMeter level={vuLevel} accent="#f8c060" />

            <Knob
              value={output.value}
              onChange={output.setValue}
              onDragStart={output.onDragStart}
              onDragEnd={output.onDragEnd}
              label="Output"
              variant="golden"
            />

            <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.1)' }} />

            <Knob
              value={tone.value}
              onChange={tone.setValue}
              onDragStart={tone.onDragStart}
              onDragEnd={tone.onDragEnd}
              label="Tone"
              variant="golden"
              size="small"
            />

            <Knob
              value={warmth.value}
              onChange={warmth.setValue}
              onDragStart={warmth.onDragStart}
              onDragEnd={warmth.onDragEnd}
              label="Warmth"
              variant="golden"
              size="small"
            />

            <Knob
              value={character.value}
              onChange={character.setValue}
              onDragStart={character.onDragStart}
              onDragEnd={character.onDragEnd}
              label="Character"
              variant="golden"
              size="small"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="module-footer">
          <span className="module-footer-text">Dre DiMura Audio</span>
          <span className="module-footer-text" style={{ opacity: 0.3 }}>SN: 001-2024</span>
        </div>
      </div>
    </div>
  );
}
