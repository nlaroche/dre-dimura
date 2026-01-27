import { useState, useCallback } from 'react';
import { useSliderParam, useToggleParam } from './hooks/useJuceParam';
import { Knob } from './components/Knob';
import { HearthglowBackground } from './components/artwork/HearthglowBackground';
import { NightfallBackground } from './components/artwork/NightfallBackground';

// Preamp configurations
const PREAMPS = [
  {
    id: 'cathode',
    name: 'Cathode',
    subtitle: 'Vintage Tube Warmth',
    theme: 'hearthglow',
  },
  {
    id: 'filament',
    name: 'Filament',
    subtitle: 'Cold Digital Edge',
    theme: 'nightfall',
  },
];

function VUMeter({ level, theme }: { level: number; theme: string }) {
  const percentage = Math.min(100, level * 100);

  return (
    <div className={`vu-meter ${theme}`}>
      <div className="vu-scale">
        <span>-20</span>
        <span>-10</span>
        <span>0</span>
        <span>+3</span>
      </div>
      <div className="vu-track">
        <div className="vu-fill" style={{ width: `${percentage}%` }} />
      </div>
      <div className="vu-label">Output</div>
    </div>
  );
}

function CarouselArrow({ direction, onClick, disabled }: {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      className={`carousel-arrow ${direction} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        {direction === 'left'
          ? <polyline points="15,18 9,12 15,6" />
          : <polyline points="9,6 15,12 9,18" />
        }
      </svg>
    </button>
  );
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');
  const [displayIndex, setDisplayIndex] = useState(0);

  const drive = useSliderParam('drive', { defaultValue: 0.25 });
  const tone = useSliderParam('tone', { defaultValue: 0.5 });
  const output = useSliderParam('output', { defaultValue: 0.5 });
  const bypass = useToggleParam('bypass', { defaultValue: false });

  const currentPreamp = PREAMPS[displayIndex];
  const vuLevel = bypass.value ? 0 : output.value * 0.8 + Math.random() * 0.1;

  const navigateTo = useCallback((newIndex: number) => {
    if (isTransitioning || newIndex === currentIndex) return;
    if (newIndex < 0 || newIndex >= PREAMPS.length) return;

    setTransitionDirection(newIndex > currentIndex ? 'right' : 'left');
    setIsTransitioning(true);
    setCurrentIndex(newIndex);

    // After exit animation, swap content
    setTimeout(() => {
      setDisplayIndex(newIndex);
    }, 300);

    // After enter animation, complete transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [currentIndex, isTransitioning]);

  const goNext = () => navigateTo(currentIndex + 1);
  const goPrev = () => navigateTo(currentIndex - 1);

  // Render background based on theme
  const renderBackground = () => {
    switch (currentPreamp.theme) {
      case 'nightfall':
        return <NightfallBackground />;
      default:
        return <HearthglowBackground />;
    }
  };

  return (
    <div className={`plugin-container ${currentPreamp.theme} ${bypass.value ? 'bypassed' : ''}`}>
      {/* Background with transition */}
      <div className={`plugin-background ${isTransitioning ? `transitioning-${transitionDirection}` : ''}`}>
        {renderBackground()}
      </div>

      {/* Main content */}
      <div className={`plugin-content ${isTransitioning ? `content-transitioning-${transitionDirection}` : ''}`}>
        {/* Header */}
        <header className="plugin-header">
          <div className="brand">
            <h1 className="brand-name">{currentPreamp.name}</h1>
            <span className="brand-subtitle">{currentPreamp.subtitle}</span>
          </div>

          <button
            className={`bypass-toggle ${bypass.value ? 'bypassed' : 'active'}`}
            onClick={bypass.toggle}
          >
            <div className="bypass-light" />
            <span className="bypass-text">{bypass.value ? 'Off' : 'On'}</span>
          </button>
        </header>

        {/* Controls */}
        <section className="controls-section">
          {/* Left Arrow */}
          <CarouselArrow
            direction="left"
            onClick={goPrev}
            disabled={currentIndex === 0 || isTransitioning}
          />

          <div className="controls-panel">
            <Knob
              value={drive.value}
              onChange={drive.setValue}
              onDragStart={drive.onDragStart}
              onDragEnd={drive.onDragEnd}
              label="Drive"
              size="large"
            />

            <VUMeter level={vuLevel} theme={currentPreamp.theme} />

            <Knob
              value={output.value}
              onChange={output.setValue}
              onDragStart={output.onDragStart}
              onDragEnd={output.onDragEnd}
              label="Output"
              size="large"
            />

            <div className="control-divider" />

            <Knob
              value={tone.value}
              onChange={tone.setValue}
              onDragStart={tone.onDragStart}
              onDragEnd={tone.onDragEnd}
              label="Tone"
              size="medium"
            />
          </div>

          {/* Right Arrow */}
          <CarouselArrow
            direction="right"
            onClick={goNext}
            disabled={currentIndex === PREAMPS.length - 1 || isTransitioning}
          />
        </section>

        {/* Footer */}
        <footer className="plugin-footer">
          <span className="footer-text">Dre DiMura Audio</span>

          {/* Carousel indicators */}
          <div className="carousel-indicators">
            {PREAMPS.map((_, i) => (
              <button
                key={i}
                className={`indicator ${i === currentIndex ? 'active' : ''}`}
                onClick={() => navigateTo(i)}
                disabled={isTransitioning}
              />
            ))}
          </div>

          <span className="footer-text">v1.0</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
