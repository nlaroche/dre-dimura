import { Knob } from '../Knob';
import { ObsidianArt } from '../artwork/ModuleArtwork';

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

// Modern LED Meter Bar component
function LEDMeterBar({ value, label }: { value: number; label: string }) {
  const levels = [
    { threshold: 0.95, color: 'red' },
    { threshold: 0.85, color: 'red' },
    { threshold: 0.7, color: 'yellow' },
    { threshold: 0.55, color: 'yellow' },
    { threshold: 0.4, color: 'green' },
    { threshold: 0.25, color: 'green' },
    { threshold: 0.1, color: 'green' },
    { threshold: 0.0, color: 'green' },
  ];

  return (
    <div className="led-meter-modern">
      <div className="led-stack">
        {levels.map((level, i) => (
          <div
            key={i}
            className={`led-segment ${level.color} ${value >= level.threshold ? 'on' : ''}`}
          />
        ))}
      </div>
      <span className="led-label">{label}</span>
    </div>
  );
}

export function SchafferModule({
  drive,
  tone,
  output,
  mix,
  character,
  warmth,
  bypass,
  audioLevels,
}: ModuleProps) {
  const inputLevel = bypass.value ? 0 : Math.min(1, audioLevels.inputLevel);
  const outputLevel = bypass.value ? 0 : Math.min(1, audioLevels.outputLevel);

  return (
    <div className={`preamp-unit obsidian-unit ${bypass.value ? 'bypassed' : ''}`}>
      {/* Pop Art Background - Arena Rock Lightning */}
      <ObsidianArt />

      {/* Content Layer */}
      <div className="module-content">
        {/* Header */}
        <div className="module-header">
          <div className="module-brand">
            <span className="module-logo">OBSIDIAN</span>
            <span className="module-subtitle">Schaffer-Vega Wireless System</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Status LEDs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                className={`pilot-light amber ${!bypass.value ? 'on' : ''}`}
                style={{ color: '#f8c060' }}
              />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                opacity: 0.5,
                textTransform: 'uppercase',
              }}>Signal</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                className={`pilot-light green ${!bypass.value ? 'on' : ''}`}
                style={{ color: '#50d890' }}
              />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                opacity: 0.5,
                textTransform: 'uppercase',
              }}>Power</span>
            </div>
          </div>
        </div>

        {/* Main Controls */}
        <div className="module-controls">
          <div className="glass-panel controls-glass">
            <LEDMeterBar value={inputLevel} label="Input" />

            <Knob
              value={drive.value}
              onChange={drive.setValue}
              onDragStart={drive.onDragStart}
              onDragEnd={drive.onDragEnd}
              label="Gain"
              variant="obsidian"
            />

            <Knob
              value={character.value}
              onChange={character.setValue}
              onDragStart={character.onDragStart}
              onDragEnd={character.onDragEnd}
              label="Sustain"
              variant="obsidian"
            />

            <Knob
              value={tone.value}
              onChange={tone.setValue}
              onDragStart={tone.onDragStart}
              onDragEnd={tone.onDragEnd}
              label="Treble"
              variant="obsidian"
            />

            <Knob
              value={warmth.value}
              onChange={warmth.setValue}
              onDragStart={warmth.onDragStart}
              onDragEnd={warmth.onDragEnd}
              label="Bass"
              variant="obsidian"
            />

            <Knob
              value={output.value}
              onChange={output.setValue}
              onDragStart={output.onDragStart}
              onDragEnd={output.onDragEnd}
              label="Master"
              variant="obsidian"
            />

            <Knob
              value={mix.value}
              onChange={mix.setValue}
              onDragStart={mix.onDragStart}
              onDragEnd={mix.onDragEnd}
              label="Blend"
              variant="obsidian"
            />

            <LEDMeterBar value={outputLevel} label="Output" />
          </div>
        </div>

        {/* Footer */}
        <div className="module-footer">
          <span className="module-footer-text">Dre DiMura Audio</span>
          <span className="module-footer-text" style={{ opacity: 0.3 }}>Arena Rock Series</span>
        </div>
      </div>
    </div>
  );
}
