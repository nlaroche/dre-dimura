import { useState, useEffect, useRef, useCallback } from 'react';
import { useSliderParam, useToggleParam } from './hooks/useJuceParam';
import { useAudioLevels } from './hooks/useAudioLevels';
import { EP3Module } from './components/modules/EP3Module';
import { RE201Module } from './components/modules/RE201Module';
import { SchafferModule } from './components/modules/SchafferModule';
import { TascamModule } from './components/modules/TascamModule';
import { FXModule } from './components/modules/FXModule';

const MODULE_COUNT = 4;
const MODULE_NAMES = ['GOLDEN TAPE', 'JADE SPACE', 'OBSIDIAN', 'PORTA 80'];

// Animation duration (both modules slide simultaneously)
const SLIDE_DURATION = 350;

// Arrow SVG components
function LeftArrow() {
  return (
    <svg viewBox="0 0 24 24">
      <polyline points="15,18 9,12 15,6" />
    </svg>
  );
}

function RightArrow() {
  return (
    <svg viewBox="0 0 24 24">
      <polyline points="9,6 15,12 9,18" />
    </svg>
  );
}

function App() {
  // Module selection
  const module = useSliderParam('module', { defaultValue: 0 });
  const [displayedModule, setDisplayedModule] = useState(0);
  const [incomingModule, setIncomingModule] = useState<number | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Core parameter hooks
  const drive = useSliderParam('drive', { defaultValue: 0.25 });
  const tone = useSliderParam('tone', { defaultValue: 0.5 });
  const output = useSliderParam('output', { defaultValue: 0.5 });
  const mix = useSliderParam('mix', { defaultValue: 1.0 });
  const character = useSliderParam('character', { defaultValue: 0.5 });
  const warmth = useSliderParam('warmth', { defaultValue: 0.5 });
  const bypass = useToggleParam('bypass', { defaultValue: false });

  // Audio level metering
  const audioLevels = useAudioLevels();

  // Current module index
  const currentModule = Math.round(module.value * 3);

  // Handle module change with simultaneous slide animation
  const handleModuleChange = useCallback((newIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(MODULE_COUNT - 1, newIndex));
    if (clampedIndex !== currentModule && !isAnimating) {
      const dir = clampedIndex > currentModule ? 'left' : 'right';
      setIsAnimating(true);
      setDirection(dir);
      setIncomingModule(clampedIndex);

      // After animation completes, finalize the change
      setTimeout(() => {
        setDisplayedModule(clampedIndex);
        module.setValue(clampedIndex / 3);
        setIncomingModule(null);
        setIsAnimating(false);
      }, SLIDE_DURATION);
    }
  }, [currentModule, isAnimating, module]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Sync displayed module with actual module (only when idle)
  useEffect(() => {
    if (!isAnimating && incomingModule === null) {
      setDisplayedModule(currentModule);
    }
  }, [currentModule, isAnimating, incomingModule]);

  // Navigate
  const handlePrev = () => handleModuleChange(currentModule - 1);
  const handleNext = () => handleModuleChange(currentModule + 1);

  // Common props for all modules
  const moduleProps = {
    drive,
    tone,
    output,
    mix,
    character,
    warmth,
    bypass,
    audioLevels,
  };

  // Render a specific module by index
  const renderModuleByIndex = (index: number) => {
    switch (index) {
      case 0:
        return <EP3Module {...moduleProps} />;
      case 1:
        return <RE201Module {...moduleProps} />;
      case 2:
        return <SchafferModule {...moduleProps} />;
      case 3:
        return <TascamModule {...moduleProps} />;
      default:
        return <EP3Module {...moduleProps} />;
    }
  };

  // Generate rack holes
  const renderRackHoles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => (
      <div key={i} className={i % 3 === 1 ? 'rack-screw' : 'rack-thread-hole'} />
    ));
  };

  return (
    <div className="studio-environment">
      {/* Equipment Rack */}
      <div className="equipment-rack">
        {/* Rack Top Panel */}
        <div className="rack-top-panel" />

        {/* Rack Rails + Content */}
        <div className="rack-rails">
          {/* Left Rail */}
          <div className="rack-rail left">
            {renderRackHoles(30)}
          </div>

          {/* Rack Content */}
          <div className="rack-content">
            {/* Preamp Slot */}
            <div className={`unit-slot preamp-slot ${isAnimating ? 'animating' : ''}`}>
              {/* Outgoing module (slides out) */}
              <div className={`unit-carrier ${isAnimating ? `slide-out-${direction}` : ''}`}>
                {renderModuleByIndex(displayedModule)}
              </div>

              {/* Incoming module (slides in simultaneously) */}
              {incomingModule !== null && (
                <div className={`unit-carrier slide-in-${direction}`}>
                  {renderModuleByIndex(incomingModule)}
                </div>
              )}
            </div>

            {/* FX Slot */}
            <div className="unit-slot fx-slot">
              <div className="unit-carrier">
                <FXModule
                  mix={mix}
                  bypass={bypass}
                />
              </div>
            </div>
          </div>

          {/* Right Rail */}
          <div className="rack-rail right">
            {renderRackHoles(30)}
          </div>
        </div>

        {/* Navigation */}
        <div className="rack-navigation">
          <button
            className="nav-btn"
            onClick={handlePrev}
            disabled={currentModule === 0 || isAnimating}
          >
            <LeftArrow />
          </button>

          <div className="module-indicators">
            {MODULE_NAMES.map((_, i) => (
              <button
                key={i}
                className={`indicator-dot ${i === currentModule ? 'active' : ''}`}
                onClick={() => handleModuleChange(i)}
                disabled={isAnimating}
              />
            ))}
          </div>

          <div className="module-badge">
            {MODULE_NAMES[displayedModule]}
          </div>

          <button
            className="nav-btn"
            onClick={handleNext}
            disabled={currentModule === MODULE_COUNT - 1 || isAnimating}
          >
            <RightArrow />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
