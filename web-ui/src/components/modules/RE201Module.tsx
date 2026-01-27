import { Knob } from '../Knob';
import { JadeSpaceArt } from '../artwork/ModuleArtwork';

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

// Modern LED Meter component
function LEDMeter({ value, label, accent }: { value: number; label: string; accent: string }) {
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
      <span className="led-label" style={{ color: accent }}>{label}</span>
    </div>
  );
}

export function RE201Module({
  drive,
  tone,
  output,
  mix,
  character,
  warmth,
  bypass,
  audioLevels,
}: ModuleProps) {
  const displayText = bypass.value ? 'BYPASS' : 'ACTIVE';
  const inputLevel = bypass.value ? 0 : Math.min(1, audioLevels.inputLevel);
  const outputLevel = bypass.value ? 0 : Math.min(1, audioLevels.outputLevel);

  return (
    <div className={`preamp-unit jade-space-unit ${bypass.value ? 'bypassed' : ''}`}>
      {/* Pop Art Background */}
      <JadeSpaceArt />

      {/* Content Layer */}
      <div className="module-content">
        {/* Header */}
        <div className="module-header">
          <div className="module-brand">
            <span className="module-logo">JADE SPACE</span>
            <span className="module-subtitle">Roland RE-201 Space Echo</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* LCD Display */}
            <div style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(80, 216, 144, 0.3)',
              borderRadius: '4px',
              padding: '8px 16px',
              minWidth: '100px',
              textAlign: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: '#50d890',
                textShadow: '0 0 10px #50d890',
                letterSpacing: '2px',
              }}>
                {displayText}
              </span>
            </div>

            {/* Status Light */}
            <div
              className={`pilot-light green ${!bypass.value ? 'on' : ''}`}
              style={{ color: '#50d890' }}
            />
          </div>
        </div>

        {/* Main Controls */}
        <div className="module-controls">
          <div className="glass-panel controls-glass">
            <LEDMeter value={inputLevel} label="In" accent="#50d890" />

            <Knob
              value={drive.value}
              onChange={drive.setValue}
              onDragStart={drive.onDragStart}
              onDragEnd={drive.onDragEnd}
              label="Intensity"
              variant="jade"
            />

            <Knob
              value={character.value}
              onChange={character.setValue}
              onDragStart={character.onDragStart}
              onDragEnd={character.onDragEnd}
              label="Character"
              variant="jade"
            />

            <Knob
              value={tone.value}
              onChange={tone.setValue}
              onDragStart={tone.onDragStart}
              onDragEnd={tone.onDragEnd}
              label="Tone"
              variant="jade"
            />

            <Knob
              value={warmth.value}
              onChange={warmth.setValue}
              onDragStart={warmth.onDragStart}
              onDragEnd={warmth.onDragEnd}
              label="Bass"
              variant="jade"
            />

            <Knob
              value={output.value}
              onChange={output.setValue}
              onDragStart={output.onDragStart}
              onDragEnd={output.onDragEnd}
              label="Volume"
              variant="jade"
            />

            <Knob
              value={mix.value}
              onChange={mix.setValue}
              onDragStart={mix.onDragStart}
              onDragEnd={mix.onDragEnd}
              label="Echo"
              variant="jade"
            />

            <LEDMeter value={outputLevel} label="Out" accent="#50d890" />
          </div>
        </div>

        {/* Footer */}
        <div className="module-footer">
          <span className="module-footer-text">Dre DiMura Audio</span>
          <span className="module-footer-text" style={{ opacity: 0.3 }}>Space Echo Series</span>
        </div>
      </div>
    </div>
  );
}
