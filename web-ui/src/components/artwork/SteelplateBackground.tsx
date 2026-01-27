/**
 * Steel Plate - Rough industrial grey with aggressive red accents
 */
export function SteelplateBackground() {
  return (
    <svg viewBox="0 0 900 520" preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* Dark steel base */}
        <linearGradient id="sp-bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1c1c1e" />
          <stop offset="50%" stopColor="#161618" />
          <stop offset="100%" stopColor="#1a1a1c" />
        </linearGradient>

        {/* Red glow - left edge */}
        <linearGradient id="sp-redGlow1" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#802030" stopOpacity="0.35" />
          <stop offset="25%" stopColor="#601020" stopOpacity="0.15" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>

        {/* Red glow - right edge */}
        <linearGradient id="sp-redGlow2" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="#702028" stopOpacity="0.3" />
          <stop offset="20%" stopColor="#501018" stopOpacity="0.1" />
          <stop offset="40%" stopColor="transparent" />
        </linearGradient>

        {/* Red hot spot - bottom */}
        <radialGradient id="sp-redHot" cx="30%" cy="90%" r="40%">
          <stop offset="0%" stopColor="#801828" stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Vignette - heavier */}
        <radialGradient id="sp-vignette" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
        </radialGradient>

        {/* Scratch texture filter */}
        <filter id="sp-scratch" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>

        {/* Glow filter */}
        <filter id="sp-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>

        {/* Sharp filter */}
        <filter id="sp-sharp" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
        </filter>
      </defs>

      {/* Base */}
      <rect width="900" height="520" fill="url(#sp-bgGradient)" />

      {/* Rough horizontal texture lines */}
      <g stroke="#252528" strokeWidth="1" opacity="0.5">
        <line x1="0" y1="30" x2="900" y2="32" />
        <line x1="0" y1="65" x2="900" y2="63" />
        <line x1="0" y1="98" x2="900" y2="100" />
        <line x1="0" y1="135" x2="900" y2="133" />
        <line x1="0" y1="170" x2="900" y2="172" />
        <line x1="0" y1="205" x2="900" y2="203" />
        <line x1="0" y1="240" x2="900" y2="242" />
        <line x1="0" y1="278" x2="900" y2="276" />
        <line x1="0" y1="315" x2="900" y2="317" />
        <line x1="0" y1="350" x2="900" y2="348" />
        <line x1="0" y1="388" x2="900" y2="390" />
        <line x1="0" y1="425" x2="900" y2="423" />
        <line x1="0" y1="460" x2="900" y2="462" />
        <line x1="0" y1="495" x2="900" y2="493" />
      </g>

      {/* Red ambient washes */}
      <rect width="900" height="520" fill="url(#sp-redGlow1)" />
      <rect width="900" height="520" fill="url(#sp-redGlow2)" />
      <rect width="900" height="520" fill="url(#sp-redHot)" />

      {/* Diagonal red streaks - aggressive */}
      <g filter="url(#sp-glow)">
        <line x1="-50" y1="150" x2="200" y2="0" stroke="#a03040" strokeWidth="3" opacity="0.2">
          <animate attributeName="opacity" values="0.15;0.25;0.15" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="-30" y1="300" x2="150" y2="180" stroke="#902838" strokeWidth="2" opacity="0.15">
          <animate attributeName="opacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite" begin="0.5s" />
        </line>
        <line x1="0" y1="450" x2="180" y2="320" stroke="#801828" strokeWidth="2.5" opacity="0.18">
          <animate attributeName="opacity" values="0.12;0.22;0.12" dur="3.5s" repeatCount="indefinite" begin="1s" />
        </line>
        <line x1="700" y1="520" x2="920" y2="350" stroke="#a03040" strokeWidth="3" opacity="0.2">
          <animate attributeName="opacity" values="0.15;0.28;0.15" dur="3.2s" repeatCount="indefinite" begin="0.3s" />
        </line>
        <line x1="750" y1="520" x2="920" y2="420" stroke="#902030" strokeWidth="2" opacity="0.15">
          <animate attributeName="opacity" values="0.1;0.18;0.1" dur="4.5s" repeatCount="indefinite" begin="1.5s" />
        </line>
        <line x1="850" y1="0" x2="920" y2="100" stroke="#801828" strokeWidth="2" opacity="0.12">
          <animate attributeName="opacity" values="0.08;0.16;0.08" dur="5s" repeatCount="indefinite" begin="2s" />
        </line>
      </g>

      {/* Vertical red accent lines */}
      <g filter="url(#sp-sharp)" stroke="#b04050" strokeWidth="1" opacity="0.1">
        <line x1="45" y1="0" x2="45" y2="520">
          <animate attributeName="opacity" values="0.08;0.15;0.08" dur="4s" repeatCount="indefinite" />
        </line>
        <line x1="855" y1="0" x2="855" y2="520">
          <animate attributeName="opacity" values="0.08;0.15;0.08" dur="4s" repeatCount="indefinite" begin="2s" />
        </line>
      </g>

      {/* Heavy corner brackets */}
      <g stroke="#3a3a40" strokeWidth="3" fill="none" opacity="0.5">
        <path d="M12,12 L12,60 M12,12 L60,12" />
        <path d="M888,12 L888,60 M888,12 L840,12" />
        <path d="M12,508 L12,460 M12,508 L60,508" />
        <path d="M888,508 L888,460 M888,508 L840,508" />
      </g>

      {/* Red corner accents */}
      <g stroke="#803040" strokeWidth="1" opacity="0.4">
        <path d="M18,18 L18,45 M18,18 L45,18" />
        <path d="M882,18 L882,45 M882,18 L855,18" />
        <path d="M18,502 L18,475 M18,502 L45,502" />
        <path d="M882,502 L882,475 M882,502 L855,502" />
      </g>

      {/* Bolts/rivets */}
      <g fill="#1a1a1c" stroke="#2a2a30" strokeWidth="2">
        <circle cx="28" cy="28" r="5" />
        <circle cx="872" cy="28" r="5" />
        <circle cx="28" cy="492" r="5" />
        <circle cx="872" cy="492" r="5" />
      </g>
      <g fill="#a04050" opacity="0.3">
        <circle cx="28" cy="28" r="2" />
        <circle cx="872" cy="28" r="2" />
        <circle cx="28" cy="492" r="2" />
        <circle cx="872" cy="492" r="2" />
      </g>

      {/* Scratch marks */}
      <g stroke="#2a2a2e" strokeWidth="0.5" opacity="0.3">
        <line x1="180" y1="120" x2="210" y2="160" />
        <line x1="185" y1="125" x2="205" y2="150" />
        <line x1="650" y1="380" x2="690" y2="360" />
        <line x1="655" y1="375" x2="680" y2="365" />
        <line x1="350" y1="450" x2="380" y2="470" />
        <line x1="500" y1="60" x2="540" y2="75" />
      </g>

      {/* Red indicator dots */}
      <g fill="#a04050">
        <circle cx="60" cy="90" r="2" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="840" cy="90" r="2" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
        </circle>
        <circle cx="60" cy="430" r="2" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
        </circle>
        <circle cx="840" cy="430" r="2" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" repeatCount="indefinite" begin="1.5s" />
        </circle>
      </g>

      {/* Horizontal dividers */}
      <g stroke="#2a2a30" strokeWidth="1" opacity="0.4">
        <line x1="70" y1="90" x2="830" y2="90" />
        <line x1="70" y1="430" x2="830" y2="430" />
      </g>

      {/* Vignette */}
      <rect width="900" height="520" fill="url(#sp-vignette)" />
    </svg>
  );
}
