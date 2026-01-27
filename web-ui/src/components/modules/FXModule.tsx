import { Knob } from '../Knob';

interface FXModuleProps {
  mix: { value: number; setValue: (v: number) => void; onDragStart: () => void; onDragEnd: () => void };
  bypass: { value: boolean; toggle: () => void };
}

export function FXModule({ mix, bypass }: FXModuleProps) {
  return (
    <div className="fx-module">
      {/* Left Ear */}
      <div className="fx-ear left">
        <div className="fx-screw" />
        <div className="fx-screw" />
      </div>

      {/* Content */}
      <div className="fx-content">
        <span className="fx-label">MIX</span>

        <div className="fx-controls">
          <Knob
            value={mix.value}
            onChange={mix.setValue}
            onDragStart={mix.onDragStart}
            onDragEnd={mix.onDragEnd}
            label="Dry/Wet"
            variant="obsidian"
            size="small"
          />

          <div className="toggle-switch" onClick={bypass.toggle}>
            <span className="toggle-label">Bypass</span>
            <div className={`toggle-track ${!bypass.value ? 'active' : ''}`}>
              <div className="toggle-thumb" />
            </div>
          </div>

          <div className={`fx-indicator ${!bypass.value ? 'active' : ''}`} />
        </div>
      </div>

      {/* Right Ear */}
      <div className="fx-ear right">
        <div className="fx-screw" />
        <div className="fx-screw" />
      </div>
    </div>
  );
}
