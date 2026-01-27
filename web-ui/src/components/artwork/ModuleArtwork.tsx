/**
 * Pop Art Style SVG Artwork for Each Module Era
 * Bold, iconic, screenprint-inspired designs
 */

// Golden Tape (EP-3) - 60s/70s Psychedelic, Desert Highway Vibes
export function GoldenTapeArt() {
  return (
    <svg className="module-artwork golden-art" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* Sunset gradient */}
        <linearGradient id="sunsetGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#1a0a00" />
          <stop offset="20%" stopColor="#4a1a08" />
          <stop offset="40%" stopColor="#b84820" />
          <stop offset="60%" stopColor="#e87830" />
          <stop offset="80%" stopColor="#f8a848" />
          <stop offset="100%" stopColor="#ffd080" />
        </linearGradient>
        {/* Sun glow */}
        <radialGradient id="sunGlow" cx="50%" cy="70%" r="40%">
          <stop offset="0%" stopColor="#fff8e0" />
          <stop offset="30%" stopColor="#ffc040" />
          <stop offset="60%" stopColor="#e86020" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {/* Road gradient */}
        <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2020" />
          <stop offset="100%" stopColor="#0a0505" />
        </linearGradient>
      </defs>

      {/* Sky background */}
      <rect width="800" height="400" fill="url(#sunsetGrad)" />

      {/* Sun */}
      <circle cx="400" cy="280" r="120" fill="url(#sunGlow)" />
      <circle cx="400" cy="280" r="60" fill="#fff0c0" opacity="0.9" />

      {/* Horizontal bands across sun (retro style) */}
      <g opacity="0.3">
        <rect x="280" y="240" width="240" height="8" fill="#1a0a00" />
        <rect x="290" y="260" width="220" height="6" fill="#1a0a00" />
        <rect x="300" y="280" width="200" height="5" fill="#1a0a00" />
        <rect x="310" y="300" width="180" height="4" fill="#1a0a00" />
        <rect x="320" y="316" width="160" height="3" fill="#1a0a00" />
      </g>

      {/* Desert mountains silhouette */}
      <path d="M0,320 L100,280 L200,300 L280,260 L380,290 L480,250 L580,280 L680,260 L750,285 L800,270 L800,400 L0,400 Z"
            fill="#1a0808" opacity="0.9" />
      <path d="M0,340 L150,310 L250,330 L350,300 L450,325 L550,305 L650,330 L800,310 L800,400 L0,400 Z"
            fill="#0f0505" opacity="0.95" />

      {/* Road - converging perspective */}
      <path d="M350,400 L400,320 L450,400 Z" fill="url(#roadGrad)" />
      <path d="M320,400 L400,300 L480,400 Z" fill="#1a1010" opacity="0.5" />

      {/* Road dashes */}
      <g fill="#f8a848" opacity="0.8">
        <rect x="396" y="380" width="8" height="20" />
        <rect x="397" y="355" width="6" height="15" />
        <rect x="398" y="335" width="4" height="12" />
        <rect x="399" y="320" width="2" height="8" />
      </g>

      {/* Cacti silhouettes */}
      <g fill="#0a0505">
        {/* Left cactus */}
        <path d="M80,400 L80,350 L75,350 L75,330 L85,330 L85,350 L80,350 L80,340 L95,340 L95,360 L90,360 L90,400 Z" />
        <path d="M70,370 L70,350 Q70,340 80,340 L80,350 L75,350 L75,370 Z" />

        {/* Right cactus */}
        <path d="M720,400 L720,360 L715,360 L715,340 L725,340 L725,360 L720,360 L720,355 L740,355 L740,380 L735,380 L735,400 Z" />
      </g>

      {/* Flying birds */}
      <g stroke="#1a0808" strokeWidth="2" fill="none" opacity="0.6">
        <path d="M200,180 Q210,170 220,180 Q230,170 240,180" />
        <path d="M250,160 Q258,152 266,160 Q274,152 282,160" />
        <path d="M550,190 Q560,180 570,190 Q580,180 590,190" />
      </g>

      {/* Retro tape reel icon in corner */}
      <g transform="translate(680, 40)" opacity="0.15">
        <circle cx="40" cy="40" r="35" fill="none" stroke="#fff" strokeWidth="4" />
        <circle cx="40" cy="40" r="12" fill="#fff" />
        <circle cx="40" cy="40" r="25" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="8 4" />
      </g>
    </svg>
  );
}

// Jade Space (RE-201) - 70s/80s Cosmic, Dub, Space Echo
export function JadeSpaceArt() {
  return (
    <svg className="module-artwork jade-art" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* Deep space gradient */}
        <radialGradient id="spaceGrad" cx="30%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#0a2020" />
          <stop offset="40%" stopColor="#051515" />
          <stop offset="100%" stopColor="#010808" />
        </radialGradient>
        {/* Nebula glow */}
        <radialGradient id="nebulaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#40a080" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#208060" stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {/* Planet gradient */}
        <radialGradient id="planetGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#60c0a0" />
          <stop offset="50%" stopColor="#308868" />
          <stop offset="100%" stopColor="#104030" />
        </radialGradient>
        {/* Ring gradient */}
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="20%" stopColor="#80e0c0" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#a0f0d0" stopOpacity="0.8" />
          <stop offset="80%" stopColor="#80e0c0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Deep space background */}
      <rect width="800" height="400" fill="url(#spaceGrad)" />

      {/* Nebula clouds */}
      <ellipse cx="600" cy="150" rx="200" ry="120" fill="url(#nebulaGlow)" />
      <ellipse cx="150" cy="300" rx="180" ry="100" fill="url(#nebulaGlow)" opacity="0.6" />

      {/* Stars - various sizes */}
      <g fill="#fff">
        {/* Large stars with glow */}
        <circle cx="120" cy="80" r="2" opacity="0.9" />
        <circle cx="680" cy="60" r="2.5" opacity="1" />
        <circle cx="400" cy="40" r="1.5" opacity="0.8" />
        <circle cx="750" cy="200" r="2" opacity="0.9" />
        <circle cx="50" cy="180" r="1.8" opacity="0.85" />

        {/* Medium stars */}
        <circle cx="200" cy="120" r="1" opacity="0.7" />
        <circle cx="350" cy="90" r="1" opacity="0.6" />
        <circle cx="500" cy="70" r="1.2" opacity="0.75" />
        <circle cx="600" cy="350" r="1" opacity="0.65" />
        <circle cx="720" cy="120" r="1" opacity="0.7" />
        <circle cx="280" cy="200" r="1.1" opacity="0.6" />
        <circle cx="450" cy="180" r="0.9" opacity="0.55" />

        {/* Small stars */}
        <circle cx="80" cy="250" r="0.6" opacity="0.5" />
        <circle cx="180" cy="50" r="0.5" opacity="0.45" />
        <circle cx="320" cy="150" r="0.5" opacity="0.4" />
        <circle cx="420" cy="280" r="0.6" opacity="0.5" />
        <circle cx="550" cy="120" r="0.5" opacity="0.45" />
        <circle cx="650" cy="250" r="0.6" opacity="0.5" />
        <circle cx="770" cy="350" r="0.5" opacity="0.4" />
        <circle cx="100" cy="350" r="0.5" opacity="0.45" />
        <circle cx="250" cy="320" r="0.5" opacity="0.4" />
        <circle cx="380" cy="350" r="0.6" opacity="0.5" />
      </g>

      {/* Main planet with ring */}
      <g transform="translate(550, 200)">
        {/* Planet ring (behind) */}
        <ellipse cx="0" cy="20" rx="120" ry="25" fill="none" stroke="url(#ringGrad)" strokeWidth="8"
                 clipPath="url(#ringClipBack)" opacity="0.7" />

        {/* Planet body */}
        <circle cx="0" cy="0" r="70" fill="url(#planetGrad)" />

        {/* Planet surface details */}
        <ellipse cx="-20" cy="-10" rx="25" ry="15" fill="#40a080" opacity="0.3" />
        <ellipse cx="15" cy="25" rx="20" ry="12" fill="#207050" opacity="0.4" />

        {/* Planet ring (front) */}
        <ellipse cx="0" cy="20" rx="120" ry="25" fill="none" stroke="url(#ringGrad)" strokeWidth="8"
                 strokeDasharray="200 180" opacity="0.8" />

        {/* Highlight */}
        <ellipse cx="-25" cy="-30" rx="15" ry="10" fill="#80f0c0" opacity="0.2" />
      </g>

      {/* Smaller moon */}
      <circle cx="200" cy="150" r="25" fill="#406858" />
      <circle cx="193" cy="143" r="8" fill="#508868" opacity="0.5" />

      {/* Echo wave rings (representing the space echo) */}
      <g stroke="#40c090" fill="none" opacity="0.3">
        <circle cx="100" cy="300" r="40" strokeWidth="1" />
        <circle cx="100" cy="300" r="60" strokeWidth="0.8" />
        <circle cx="100" cy="300" r="80" strokeWidth="0.6" />
        <circle cx="100" cy="300" r="100" strokeWidth="0.4" />
      </g>

      {/* Shooting star */}
      <line x1="700" y1="30" x2="620" y2="90" stroke="#fff" strokeWidth="2" opacity="0.6" />
      <line x1="700" y1="30" x2="680" y2="45" stroke="#fff" strokeWidth="3" opacity="0.8" />
    </svg>
  );
}

// Obsidian (Schaffer-Vega) - Late 70s/80s Arena Rock
export function ObsidianArt() {
  return (
    <svg className="module-artwork obsidian-art" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* Deep night sky gradient */}
        <linearGradient id="stormGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#05050a" />
          <stop offset="40%" stopColor="#0a0a15" />
          <stop offset="100%" stopColor="#08080f" />
        </linearGradient>

        {/* Lightning glow filter - more intense */}
        <filter id="lightningGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur1" />
          <feGaussianBlur stdDeviation="2" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Spotlight beam gradient - cone from above */}
        <linearGradient id="spotBeam1" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="30%" stopColor="#f0e0ff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#a080ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="spotBeam2" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#ffe0f0" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ff80a0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="spotBeam3" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="30%" stopColor="#e0f0ff" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#80a0ff" stopOpacity="0" />
        </linearGradient>

        {/* Stage flood glow */}
        <radialGradient id="stageGlow" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#b060ff" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#6030a0" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Dark sky background */}
      <rect width="800" height="400" fill="url(#stormGrad)" />

      {/* Distant storm clouds - layered */}
      <g opacity="0.5">
        <ellipse cx="100" cy="50" rx="150" ry="45" fill="#12121a" />
        <ellipse cx="350" cy="30" rx="180" ry="50" fill="#0e0e16" />
        <ellipse cx="600" cy="45" rx="160" ry="40" fill="#101018" />
        <ellipse cx="750" cy="60" rx="120" ry="35" fill="#12121a" />
      </g>

      {/* Main lightning bolt - dramatic jagged */}
      <g filter="url(#lightningGlow)">
        {/* Outer glow layer */}
        <path
          d="M395,0 L385,45 L405,48 L375,95 L400,98 L355,160 L385,163 L320,250 L365,200 L340,197 L380,145 L355,142 L390,90 L365,87 L395,0"
          fill="#c0d0ff"
          opacity="0.6"
        />
        {/* Main bolt */}
        <path
          d="M398,0 L390,42 L406,44 L382,88 L402,90 L365,148 L388,150 L335,230 L372,185 L352,183 L385,138 L365,136 L392,85 L375,83 L398,0"
          fill="#e8f0ff"
        />
        {/* Hot white core */}
        <path
          d="M399,5 L393,40 L404,41 L387,82 L401,83 L372,138 L387,139 L350,210 L378,175 L362,174 L387,132 L373,131 L394,80 L382,79 L399,5"
          fill="#ffffff"
        />
      </g>

      {/* Secondary bolt - left */}
      <g filter="url(#lightningGlow)" opacity="0.7">
        <path
          d="M180,0 L175,35 L188,37 L165,80 L182,82 L150,140"
          fill="#d0e0ff"
        />
        <path
          d="M182,0 L178,33 L187,34 L170,75 L182,76 L158,125"
          fill="#fff"
        />
      </g>

      {/* Lightning branches */}
      <g filter="url(#lightningGlow)" opacity="0.5">
        <path d="M365,148 L330,165 L310,200" stroke="#c0d8ff" strokeWidth="2" fill="none" />
        <path d="M388,150 L420,170 L445,165" stroke="#c0d8ff" strokeWidth="2" fill="none" />
        <path d="M385,138 L350,150 L335,175" stroke="#d0e0ff" strokeWidth="1.5" fill="none" />
        <path d="M182,82 L155,95 L140,120" stroke="#c0d8ff" strokeWidth="1.5" fill="none" />
      </g>

      {/* Spotlight beams from above - proper cones */}
      <g>
        {/* Left spot */}
        <polygon points="120,0 40,400 200,400" fill="url(#spotBeam1)" />
        {/* Center spot */}
        <polygon points="400,0 280,400 520,400" fill="url(#spotBeam2)" />
        {/* Right spot */}
        <polygon points="680,0 600,400 760,400" fill="url(#spotBeam3)" />
      </g>

      {/* Stage/arena floor glow */}
      <ellipse cx="400" cy="420" rx="450" ry="100" fill="url(#stageGlow)" />

      {/* Arena silhouette - cleaner */}
      <path
        d="M0,400 L0,340 C100,320 200,305 400,300 C600,305 700,320 800,340 L800,400 Z"
        fill="#030306"
      />

      {/* Crowd heads silhouette */}
      <g fill="#050508">
        <ellipse cx="50" cy="360" rx="15" ry="12" />
        <ellipse cx="85" cy="355" rx="14" ry="11" />
        <ellipse cx="120" cy="358" rx="16" ry="13" />
        <ellipse cx="160" cy="352" rx="14" ry="12" />
        <ellipse cx="200" cy="350" rx="15" ry="12" />
        <ellipse cx="240" cy="348" rx="16" ry="13" />
        <ellipse cx="280" cy="345" rx="14" ry="11" />
        <ellipse cx="320" cy="343" rx="15" ry="12" />
        <ellipse cx="360" cy="342" rx="16" ry="13" />
        <ellipse cx="400" cy="340" rx="15" ry="12" />
        <ellipse cx="440" cy="342" rx="14" ry="11" />
        <ellipse cx="480" cy="343" rx="16" ry="13" />
        <ellipse cx="520" cy="345" rx="15" ry="12" />
        <ellipse cx="560" cy="348" rx="14" ry="11" />
        <ellipse cx="600" cy="350" rx="16" ry="13" />
        <ellipse cx="640" cy="352" rx="15" ry="12" />
        <ellipse cx="680" cy="355" rx="14" ry="11" />
        <ellipse cx="720" cy="358" rx="16" ry="13" />
        <ellipse cx="760" cy="362" rx="15" ry="12" />
      </g>

      {/* Raised hands in crowd */}
      <g fill="#040407" opacity="0.9">
        <path d="M150,355 L150,325 L155,325 L155,355" />
        <path d="M300,342 L300,310 L305,310 L305,342" />
        <path d="M500,343 L500,312 L505,312 L505,343" />
        <path d="M650,352 L650,322 L655,322 L655,352" />
      </g>

      {/* Subtle light fixture hints at top */}
      <g fill="#ffffff" opacity="0.8">
        <circle cx="120" cy="5" r="4" />
        <circle cx="400" cy="5" r="5" />
        <circle cx="680" cy="5" r="4" />
      </g>
    </svg>
  );
}

// Porta 80 (TASCAM) - 80s Synthwave, Cassette Culture
export function Porta80Art() {
  return (
    <svg className="module-artwork porta-art" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* Synthwave sunset gradient */}
        <linearGradient id="synthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a0015" />
          <stop offset="30%" stopColor="#1a0030" />
          <stop offset="50%" stopColor="#400060" />
          <stop offset="70%" stopColor="#c02080" />
          <stop offset="85%" stopColor="#f04080" />
          <stop offset="100%" stopColor="#f8a040" />
        </linearGradient>
        {/* Neon glow filter */}
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Sun gradient */}
        <linearGradient id="synthSunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8f040" />
          <stop offset="50%" stopColor="#f08040" />
          <stop offset="100%" stopColor="#e04080" />
        </linearGradient>
        {/* Grid gradient */}
        <linearGradient id="gridGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f040a0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4020a0" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Sky gradient */}
      <rect width="800" height="400" fill="url(#synthGrad)" />

      {/* Stars */}
      <g fill="#fff" opacity="0.6">
        <circle cx="100" cy="50" r="1" />
        <circle cx="200" cy="30" r="0.8" />
        <circle cx="350" cy="60" r="1.2" />
        <circle cx="500" cy="40" r="0.9" />
        <circle cx="650" cy="55" r="1" />
        <circle cx="750" cy="35" r="0.8" />
        <circle cx="50" cy="80" r="0.7" />
        <circle cx="450" cy="20" r="1" />
      </g>

      {/* Synthwave sun */}
      <g transform="translate(400, 280)">
        <circle cx="0" cy="0" r="100" fill="url(#synthSunGrad)" />
        {/* Horizontal lines through sun */}
        <g fill="#0a0015">
          <rect x="-100" y="-10" width="200" height="6" />
          <rect x="-95" y="10" width="190" height="8" />
          <rect x="-85" y="30" width="170" height="10" />
          <rect x="-70" y="52" width="140" height="12" />
          <rect x="-50" y="76" width="100" height="14" />
        </g>
      </g>

      {/* Perspective grid floor */}
      <g stroke="url(#gridGrad)" strokeWidth="1.5" fill="none">
        {/* Horizontal lines */}
        <line x1="0" y1="300" x2="800" y2="300" />
        <line x1="0" y1="320" x2="800" y2="320" />
        <line x1="0" y1="345" x2="800" y2="345" />
        <line x1="0" y1="375" x2="800" y2="375" />
        <line x1="0" y1="400" x2="800" y2="400" />

        {/* Vertical lines (perspective) */}
        <line x1="400" y1="280" x2="400" y2="400" />
        <line x1="400" y1="280" x2="300" y2="400" />
        <line x1="400" y1="280" x2="200" y2="400" />
        <line x1="400" y1="280" x2="100" y2="400" />
        <line x1="400" y1="280" x2="0" y2="400" />
        <line x1="400" y1="280" x2="500" y2="400" />
        <line x1="400" y1="280" x2="600" y2="400" />
        <line x1="400" y1="280" x2="700" y2="400" />
        <line x1="400" y1="280" x2="800" y2="400" />
      </g>

      {/* Palm tree silhouettes */}
      <g fill="#0a0015">
        {/* Left palm */}
        <g transform="translate(80, 280)">
          <rect x="-4" y="0" width="8" height="120" />
          <path d="M0,-10 Q-50,-30 -80,-20 Q-40,-15 0,-10" />
          <path d="M0,-10 Q-40,-50 -70,-60 Q-30,-35 0,-10" />
          <path d="M0,-10 Q50,-30 80,-20 Q40,-15 0,-10" />
          <path d="M0,-10 Q40,-50 70,-60 Q30,-35 0,-10" />
          <path d="M0,-10 Q-20,-60 -30,-90 Q-10,-50 0,-10" />
          <path d="M0,-10 Q20,-60 30,-90 Q10,-50 0,-10" />
        </g>

        {/* Right palm */}
        <g transform="translate(720, 290)">
          <rect x="-3" y="0" width="6" height="110" />
          <path d="M0,-8 Q-40,-25 -60,-18 Q-30,-12 0,-8" />
          <path d="M0,-8 Q-30,-40 -55,-48 Q-22,-28 0,-8" />
          <path d="M0,-8 Q40,-25 60,-18 Q30,-12 0,-8" />
          <path d="M0,-8 Q30,-40 55,-48 Q22,-28 0,-8" />
          <path d="M0,-8 Q0,-55 0,-75 Q0,-40 0,-8" />
        </g>
      </g>

      {/* Cassette tape icon */}
      <g transform="translate(620, 80)" filter="url(#neonGlow)" opacity="0.25">
        <rect x="0" y="0" width="100" height="65" rx="5" fill="none" stroke="#f040a0" strokeWidth="2" />
        <circle cx="30" cy="35" r="15" fill="none" stroke="#f040a0" strokeWidth="2" />
        <circle cx="70" cy="35" r="15" fill="none" stroke="#f040a0" strokeWidth="2" />
        <circle cx="30" cy="35" r="5" fill="none" stroke="#f040a0" strokeWidth="1" />
        <circle cx="70" cy="35" r="5" fill="none" stroke="#f040a0" strokeWidth="1" />
        <rect x="20" y="52" width="60" height="8" rx="2" fill="none" stroke="#f040a0" strokeWidth="1" />
      </g>

      {/* Neon triangles decoration */}
      <g filter="url(#neonGlow)" opacity="0.4">
        <polygon points="150,150 180,200 120,200" fill="none" stroke="#40f0f0" strokeWidth="2" />
        <polygon points="650,130 675,170 625,170" fill="none" stroke="#f040a0" strokeWidth="2" />
      </g>

      {/* Chrome text effect line */}
      <line x1="100" y1="250" x2="300" y2="250" stroke="#fff" strokeWidth="1" opacity="0.3" />
      <line x1="500" y1="250" x2="700" y2="250" stroke="#fff" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}
