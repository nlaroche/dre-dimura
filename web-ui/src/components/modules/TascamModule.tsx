import { Knob } from '../Knob';
import { Fader } from '../Fader';
import { Porta80Art } from '../artwork/ModuleArtwork';

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

// Stereo Channel Meter
function ChannelMeter({ value, label, accent }: { value: number; label: string; accent: string }) {
  const height = Math.min(100, Math.max(0, value * 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <div style={{
        width: '16px',
        height: '60px',
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '4px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '2px',
          right: '2px',
          height: `${height}%`,
          background: `linear-gradient(180deg, #ff3030 0%, #ffaa00 20%, #ffff30 40%, ${accent} 100%)`,
          borderRadius: '2px',
          transition: 'height 100ms ease',
          boxShadow: `0 0 8px ${accent}`,
        }} />
      </div>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color: accent,
        opacity: 0.7,
      }}>{label}</span>
    </div>
  );
}

// Cassette animation
function CassetteWindow({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div style={{
      width: '80px',
      height: '32px',
      background: 'rgba(0,0,0,0.6)',
      border: '1px solid rgba(240, 80, 160, 0.3)',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
    }}>
      <div style={{
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: 'conic-gradient(from 0deg, #2a2a35 0deg, #1a1a25 90deg, #2a2a35 180deg, #1a1a25 270deg, #2a2a35 360deg)',
        border: '2px solid #3a3a45',
        animation: isPlaying ? 'spin 2s linear infinite' : 'none',
      }} />
      <div style={{
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: 'conic-gradient(from 0deg, #2a2a35 0deg, #1a1a25 90deg, #2a2a35 180deg, #1a1a25 270deg, #2a2a35 360deg)',
        border: '2px solid #3a3a45',
        animation: isPlaying ? 'spin 2s linear infinite' : 'none',
      }} />
    </div>
  );
}

export function TascamModule({
  drive,
  tone,
  output,
  mix,
  character,
  warmth,
  bypass,
  audioLevels,
}: ModuleProps) {
  const leftLevel = bypass.value ? 0 : Math.min(1, audioLevels.outputLevel);
  const rightLevel = bypass.value ? 0 : Math.min(1, audioLevels.outputLevel * 0.95);
  const accent = '#f050a0';

  return (
    <div className={`preamp-unit porta80-unit ${bypass.value ? 'bypassed' : ''}`}>
      {/* Pop Art Background - Synthwave */}
      <Porta80Art />

      {/* Content Layer */}
      <div className="module-content">
        {/* Header */}
        <div className="module-header">
          <div className="module-brand">
            <span className="module-logo">PORTA 80</span>
            <span className="module-subtitle">TASCAM Cassette Multitrack</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <CassetteWindow isPlaying={!bypass.value} />

            {/* Status Light */}
            <div
              className={`pilot-light red ${!bypass.value ? 'on' : ''}`}
              style={{ color: '#ff4040' }}
            />
          </div>
        </div>

        {/* Main Controls */}
        <div className="module-controls">
          <div className="glass-panel controls-glass">
            {/* Stereo Meters */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <ChannelMeter value={leftLevel} label="L" accent={accent} />
              <ChannelMeter value={rightLevel} label="R" accent={accent} />
            </div>

            {/* Faders */}
            <div style={{
              display: 'flex',
              gap: '12px',
              padding: '0 8px',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              borderRight: '1px solid rgba(255,255,255,0.1)',
            }}>
              <Fader
                value={drive.value}
                onChange={drive.setValue}
                onDragStart={drive.onDragStart}
                onDragEnd={drive.onDragEnd}
                label="Input"
              />
              <Fader
                value={output.value}
                onChange={output.setValue}
                onDragStart={output.onDragStart}
                onDragEnd={output.onDragEnd}
                label="Output"
              />
            </div>

            <Knob
              value={character.value}
              onChange={character.setValue}
              onDragStart={character.onDragStart}
              onDragEnd={character.onDragEnd}
              label="Saturation"
              variant="porta"
            />

            <Knob
              value={tone.value}
              onChange={tone.setValue}
              onDragStart={tone.onDragStart}
              onDragEnd={tone.onDragEnd}
              label="High"
              variant="porta"
            />

            <Knob
              value={warmth.value}
              onChange={warmth.setValue}
              onDragStart={warmth.onDragStart}
              onDragEnd={warmth.onDragEnd}
              label="Low"
              variant="porta"
            />

            <Knob
              value={mix.value}
              onChange={mix.setValue}
              onDragStart={mix.onDragStart}
              onDragEnd={mix.onDragEnd}
              label="Tape"
              variant="porta"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="module-footer">
          <span className="module-footer-text">Dre DiMura Audio</span>

          <div className="toggle-switch" onClick={bypass.toggle}>
            <span className="toggle-label" style={{ color: accent }}>Record</span>
            <div className={`toggle-track ${!bypass.value ? 'active' : ''}`} style={{
              '--toggle-accent': accent,
            } as React.CSSProperties}>
              <div className="toggle-thumb" />
            </div>
          </div>
        </div>
      </div>

      {/* CSS for cassette spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
