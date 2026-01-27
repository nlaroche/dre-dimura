/**
 * Hearthglow - Warm amber gothic background with candlelit atmosphere
 */
export function HearthglowBackground() {
  return (
    <svg viewBox="0 0 900 520" preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* Richer warm base */}
        <linearGradient id="hg-bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1510" />
          <stop offset="50%" stopColor="#141210" />
          <stop offset="100%" stopColor="#18140f" />
        </linearGradient>

        {/* Warm amber glow - top left */}
        <radialGradient id="hg-warmGlow1" cx="10%" cy="15%" r="45%">
          <stop offset="0%" stopColor="#d4a030" stopOpacity="0.15" />
          <stop offset="60%" stopColor="#a07020" stopOpacity="0.05" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Complementary green glow - right side */}
        <radialGradient id="hg-greenGlow1" cx="90%" cy="40%" r="35%">
          <stop offset="0%" stopColor="#3a6848" stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Green accent - bottom left */}
        <radialGradient id="hg-greenGlow2" cx="5%" cy="85%" r="30%">
          <stop offset="0%" stopColor="#2a5838" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Warm glow - bottom center */}
        <radialGradient id="hg-warmGlow2" cx="50%" cy="95%" r="50%">
          <stop offset="0%" stopColor="#c08828" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Subtle green mist - top right */}
        <radialGradient id="hg-greenMist" cx="80%" cy="10%" r="40%">
          <stop offset="0%" stopColor="#406050" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Dust/particle glow */}
        <filter id="hg-dustGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>

        {/* Sharper particle */}
        <filter id="hg-sparkle" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
        </filter>

        {/* Vignette - lighter */}
        <radialGradient id="hg-vignette" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="75%" stopColor="transparent" />
          <stop offset="100%" stopColor="#0a0806" stopOpacity="0.5" />
        </radialGradient>

        {/* Gothic arch pattern */}
        <pattern id="hg-archPattern" patternUnits="userSpaceOnUse" width="120" height="200" x="0" y="-50">
          <path
            d="M60,200 L60,80 Q60,20 30,20 Q0,20 0,80 L0,200 M60,200 L60,80 Q60,20 90,20 Q120,20 120,80 L120,200"
            fill="none"
            stroke="#3a3028"
            strokeWidth="1"
            opacity="0.15"
          />
        </pattern>
      </defs>

      {/* Base layer */}
      <rect width="900" height="520" fill="url(#hg-bgGradient)" />

      {/* Gothic arch pattern overlay */}
      <rect width="900" height="520" fill="url(#hg-archPattern)" opacity="0.4" />

      {/* Color atmosphere layers */}
      <rect width="900" height="520" fill="url(#hg-warmGlow1)" />
      <rect width="900" height="520" fill="url(#hg-greenGlow1)" />
      <rect width="900" height="520" fill="url(#hg-greenGlow2)" />
      <rect width="900" height="520" fill="url(#hg-warmGlow2)" />
      <rect width="900" height="520" fill="url(#hg-greenMist)" />

      {/* Decorative gothic lines */}
      <g stroke="#4a4030" strokeWidth="0.5" fill="none" opacity="0.2">
        {/* Horizontal ornate line top */}
        <path d="M100,60 Q200,55 300,60 T500,60 T700,60 T800,60" />
        {/* Horizontal ornate line bottom */}
        <path d="M100,460 Q200,465 300,460 T500,460 T700,460 T800,460" />
      </g>

      {/* Corner ornaments */}
      <g stroke="#5a4830" strokeWidth="1" fill="none" opacity="0.25">
        {/* Top left */}
        <path d="M25,25 L25,70 M25,25 L70,25 M35,35 Q35,50 50,50 L65,50" />
        {/* Top right */}
        <path d="M875,25 L875,70 M875,25 L830,25 M865,35 Q865,50 850,50 L835,50" />
        {/* Bottom left */}
        <path d="M25,495 L25,450 M25,495 L70,495 M35,485 Q35,470 50,470 L65,470" />
        {/* Bottom right */}
        <path d="M875,495 L875,450 M875,495 L830,495 M865,485 Q865,470 850,470 L835,470" />
      </g>

      {/* Floating amber dust particles */}
      <g filter="url(#hg-dustGlow)">
        <circle cx="80" cy="120" r="2" fill="#e0a840">
          <animate attributeName="cy" values="120;85;120" dur="14s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="7s" repeatCount="indefinite" />
        </circle>
        <circle cx="820" cy="180" r="1.5" fill="#d09830">
          <animate attributeName="cy" values="180;150;180" dur="12s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="380" r="1.8" fill="#c08828">
          <animate attributeName="cy" values="380;350;380" dur="16s" repeatCount="indefinite" />
          <animate attributeName="cx" values="200;220;200" dur="20s" repeatCount="indefinite" />
        </circle>
        <circle cx="700" cy="400" r="1.2" fill="#b07820">
          <animate attributeName="cy" values="400;365;400" dur="11s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Floating green particles - complementary */}
      <g filter="url(#hg-dustGlow)">
        <circle cx="750" cy="100" r="1.5" fill="#50a070">
          <animate attributeName="cy" values="100;70;100" dur="13s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="450" r="1.2" fill="#408858">
          <animate attributeName="cy" values="450;420;450" dur="15s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;0.5;0.25" dur="9s" repeatCount="indefinite" />
        </circle>
        <circle cx="850" cy="350" r="1" fill="#509868">
          <animate attributeName="cy" values="350;320;350" dur="10s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Sparkle highlights */}
      <g filter="url(#hg-sparkle)">
        <circle cx="120" cy="90" r="1" fill="#fff8e0" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="780" cy="130" r="0.8" fill="#e0fff0" opacity="0.3">
          <animate attributeName="opacity" values="0.15;0.45;0.15" dur="4s" repeatCount="indefinite" begin="1s" />
        </circle>
        <circle cx="400" cy="70" r="0.8" fill="#fff8e0" opacity="0.25">
          <animate attributeName="opacity" values="0.1;0.4;0.1" dur="5s" repeatCount="indefinite" begin="2s" />
        </circle>
      </g>

      {/* Vignette */}
      <rect width="900" height="520" fill="url(#hg-vignette)" />
    </svg>
  );
}
