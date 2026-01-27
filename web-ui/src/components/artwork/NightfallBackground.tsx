/**
 * Filament - Cold, clean digital aesthetic with sharp vertical lines
 * and hints of red/purple
 */
export function NightfallBackground() {
  return (
    <svg viewBox="0 0 900 520" preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* Lighter cold base */}
        <linearGradient id="nf-bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#12141a" />
          <stop offset="100%" stopColor="#0e1014" />
        </linearGradient>

        {/* Subtle purple ambient - left */}
        <linearGradient id="nf-purpleAmbient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#402048" stopOpacity="0.25" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>

        {/* Subtle red ambient - right */}
        <linearGradient id="nf-redAmbient" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#401820" stopOpacity="0.2" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>

        {/* Cold blue center glow */}
        <radialGradient id="nf-centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#203040" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Vignette - lighter */}
        <radialGradient id="nf-vignette" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
        </radialGradient>

        {/* Line glow filter */}
        <filter id="nf-lineGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>

        {/* Sharp line filter */}
        <filter id="nf-sharpLine" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
        </filter>
      </defs>

      {/* Base */}
      <rect width="900" height="520" fill="url(#nf-bgGradient)" />

      {/* Ambient color washes */}
      <rect width="900" height="520" fill="url(#nf-purpleAmbient)" />
      <rect width="900" height="520" fill="url(#nf-redAmbient)" />
      <rect width="900" height="520" fill="url(#nf-centerGlow)" />

      {/* Vertical grid lines - static structure */}
      <g stroke="#252530" strokeWidth="1" opacity="0.7">
        <line x1="100" y1="0" x2="100" y2="520" />
        <line x1="200" y1="0" x2="200" y2="520" />
        <line x1="300" y1="0" x2="300" y2="520" />
        <line x1="400" y1="0" x2="400" y2="520" />
        <line x1="500" y1="0" x2="500" y2="520" />
        <line x1="600" y1="0" x2="600" y2="520" />
        <line x1="700" y1="0" x2="700" y2="520" />
        <line x1="800" y1="0" x2="800" y2="520" />
      </g>

      {/* Horizontal accent lines */}
      <g stroke="#252530" strokeWidth="0.5" opacity="0.5">
        <line x1="0" y1="130" x2="900" y2="130" />
        <line x1="0" y1="390" x2="900" y2="390" />
      </g>

      {/* Animated vertical scan lines - blue */}
      <g filter="url(#nf-sharpLine)">
        <line x1="150" y1="0" x2="150" y2="520" stroke="#4060a0" strokeWidth="1" opacity="0.15">
          <animate attributeName="x1" values="150;160;150" dur="8s" repeatCount="indefinite" />
          <animate attributeName="x2" values="150;160;150" dur="8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.25;0.15" dur="4s" repeatCount="indefinite" />
        </line>
        <line x1="450" y1="0" x2="450" y2="520" stroke="#5070b0" strokeWidth="1" opacity="0.12">
          <animate attributeName="x1" values="450;445;450" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="445;450;445" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.12;0.2;0.12" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="750" y1="0" x2="750" y2="520" stroke="#4868a0" strokeWidth="1" opacity="0.15">
          <animate attributeName="x1" values="750;755;750" dur="7s" repeatCount="indefinite" />
          <animate attributeName="x2" values="755;750;755" dur="7s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Animated vertical lines - purple accent */}
      <g filter="url(#nf-sharpLine)">
        <line x1="80" y1="0" x2="80" y2="520" stroke="#8050a0" strokeWidth="0.5" opacity="0.2">
          <animate attributeName="opacity" values="0.1;0.25;0.1" dur="5s" repeatCount="indefinite" />
        </line>
        <line x1="320" y1="0" x2="320" y2="520" stroke="#7048a0" strokeWidth="0.5" opacity="0.15">
          <animate attributeName="opacity" values="0.15;0.3;0.15" dur="6s" repeatCount="indefinite" begin="1s" />
        </line>
      </g>

      {/* Animated vertical lines - red accent */}
      <g filter="url(#nf-sharpLine)">
        <line x1="820" y1="0" x2="820" y2="520" stroke="#a04858" strokeWidth="0.5" opacity="0.15">
          <animate attributeName="opacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite" />
        </line>
        <line x1="580" y1="0" x2="580" y2="520" stroke="#904050" strokeWidth="0.5" opacity="0.12">
          <animate attributeName="opacity" values="0.08;0.18;0.08" dur="5s" repeatCount="indefinite" begin="2s" />
        </line>
      </g>

      {/* Rising data streams - sharp vertical movement */}
      <g stroke="#5080c0" strokeWidth="2" opacity="0.1" strokeLinecap="round">
        <line x1="250" y1="520" x2="250" y2="480">
          <animate attributeName="y1" values="520;-40" dur="4s" repeatCount="indefinite" />
          <animate attributeName="y2" values="480;-80" dur="4s" repeatCount="indefinite" />
        </line>
        <line x1="550" y1="520" x2="550" y2="490">
          <animate attributeName="y1" values="520;-30" dur="3.5s" repeatCount="indefinite" begin="0.5s" />
          <animate attributeName="y2" values="490;-60" dur="3.5s" repeatCount="indefinite" begin="0.5s" />
        </line>
        <line x1="650" y1="520" x2="650" y2="470">
          <animate attributeName="y1" values="520;-50" dur="4.5s" repeatCount="indefinite" begin="1s" />
          <animate attributeName="y2" values="470;-100" dur="4.5s" repeatCount="indefinite" begin="1s" />
        </line>
      </g>

      {/* Rising data streams - purple */}
      <g stroke="#8060b0" strokeWidth="1.5" opacity="0.08" strokeLinecap="round">
        <line x1="120" y1="520" x2="120" y2="485">
          <animate attributeName="y1" values="520;-35" dur="5s" repeatCount="indefinite" begin="0.3s" />
          <animate attributeName="y2" values="485;-70" dur="5s" repeatCount="indefinite" begin="0.3s" />
        </line>
        <line x1="380" y1="520" x2="380" y2="495">
          <animate attributeName="y1" values="520;-25" dur="4s" repeatCount="indefinite" begin="1.5s" />
          <animate attributeName="y2" values="495;-50" dur="4s" repeatCount="indefinite" begin="1.5s" />
        </line>
      </g>

      {/* Rising data streams - red */}
      <g stroke="#a05060" strokeWidth="1.5" opacity="0.06" strokeLinecap="round">
        <line x1="780" y1="520" x2="780" y2="490">
          <animate attributeName="y1" values="520;-30" dur="4.2s" repeatCount="indefinite" begin="0.8s" />
          <animate attributeName="y2" values="490;-60" dur="4.2s" repeatCount="indefinite" begin="0.8s" />
        </line>
      </g>

      {/* Corner brackets - minimal tech */}
      <g stroke="#3040608" strokeWidth="1" fill="none" opacity="0.3">
        <path d="M20,20 L20,50 M20,20 L50,20" stroke="#4060a0" />
        <path d="M880,20 L880,50 M880,20 L850,20" stroke="#8050a0" />
        <path d="M20,500 L20,470 M20,500 L50,500" stroke="#8050a0" />
        <path d="M880,500 L880,470 M880,500 L850,500" stroke="#a05060" />
      </g>

      {/* Small accent dots */}
      <g fill="#6080c0" opacity="0.4">
        <circle cx="100" cy="130" r="1.5" />
        <circle cx="800" cy="130" r="1.5" />
        <circle cx="100" cy="390" r="1.5" />
        <circle cx="800" cy="390" r="1.5" />
      </g>

      {/* Vignette */}
      <rect width="900" height="520" fill="url(#nf-vignette)" />
    </svg>
  );
}
