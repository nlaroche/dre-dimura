/**
 * Golden Tape (EP-3) - 60s/70s Psychedelic, Desert Highway
 * Dreamy, hazy, atmospheric with subtle organic motion
 */
import { motion } from 'framer-motion';
import { useMemo } from 'react';

// Wispy haze strand - organic curved lines that drift
function HazeWisp({
  startX,
  startY,
  length,
  angle,
  delay,
  duration,
  color,
  thickness
}: {
  startX: number;
  startY: number;
  length: number;
  angle: number;
  delay: number;
  duration: number;
  color: string;
  thickness: number;
}) {
  // Create a crooked, organic path
  const endX = startX + Math.cos(angle) * length;
  const endY = startY + Math.sin(angle) * length;
  const ctrl1X = startX + Math.cos(angle + 0.3) * length * 0.3;
  const ctrl1Y = startY + Math.sin(angle + 0.3) * length * 0.3;
  const ctrl2X = startX + Math.cos(angle - 0.2) * length * 0.7;
  const ctrl2Y = startY + Math.sin(angle - 0.2) * length * 0.7;

  return (
    <motion.path
      d={`M${startX},${startY} C${ctrl1X},${ctrl1Y} ${ctrl2X},${ctrl2Y} ${endX},${endY}`}
      stroke={color}
      strokeWidth={thickness}
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: [0, 1, 1, 0],
        opacity: [0, 0.4, 0.3, 0],
        x: [0, 30, 50],
        y: [0, -10, -20],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Soft floating blob - amorphous haze shape
function FloatingBlob({
  cx,
  cy,
  size,
  delay,
  color,
}: {
  cx: number;
  cy: number;
  size: number;
  delay: number;
  color: string;
}) {
  const id = useMemo(() => `blob-${cx}-${cy}-${Math.random()}`, [cx, cy]);

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.25, 0.2, 0.15, 0],
        x: [0, 40, 70, 100],
        y: [0, -15, -5, -25],
        scale: [0.8, 1, 1.2, 1.1, 0.9],
      }}
      transition={{
        duration: 18 + delay * 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <defs>
        <radialGradient id={id} cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="60%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx={cx}
        cy={cy}
        rx={size * 1.5}
        ry={size}
        fill={`url(#${id})`}
        filter="url(#softBlur)"
      />
    </motion.g>
  );
}

// Gentle bird - simple, elegant silhouette with smooth glide
function GlidingBird({
  delay,
  startX,
  y,
  direction
}: {
  delay: number;
  startX: number;
  y: number;
  direction: 1 | -1;
}) {
  return (
    <motion.path
      d="M0,0 Q4,-3 8,0 Q12,-3 16,0"
      stroke="#2a1510"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      initial={{ x: startX, y, opacity: 0 }}
      animate={{
        x: startX + direction * 900,
        y: [y, y - 8, y - 3, y - 12, y - 6],
        opacity: [0, 0.5, 0.5, 0.5, 0.4, 0],
      }}
      transition={{
        duration: 25,
        delay,
        repeat: Infinity,
        repeatDelay: 8,
        ease: "linear",
        y: {
          duration: 25,
          delay,
          repeat: Infinity,
          repeatDelay: 8,
          times: [0, 0.25, 0.5, 0.75, 1],
          ease: "easeInOut",
        }
      }}
    />
  );
}

// Drifting heat distortion layer
function HeatDistortion({ y, delay }: { y: number; delay: number }) {
  return (
    <motion.rect
      x={0}
      y={y}
      width={800}
      height={15}
      fill="url(#heatGrad)"
      initial={{ opacity: 0.1 }}
      animate={{
        opacity: [0.08, 0.15, 0.08],
        scaleY: [1, 1.3, 1],
        y: [y, y - 2, y],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Subtle sun corona shimmer
function SunCorona() {
  return (
    <motion.circle
      cx={400}
      cy={320}
      r={130}
      fill="url(#coronaGrad)"
      animate={{
        opacity: [0.6, 0.75, 0.6],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Atmospheric glow layer
function AtmosphericGlow({ y, height, color, delay }: { y: number; height: number; color: string; delay: number }) {
  return (
    <motion.rect
      x={0}
      y={y}
      width={800}
      height={height}
      fill={color}
      animate={{
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function GoldenTapeArt() {
  // Generate organic haze wisps
  const hazeWisps = useMemo(() => [
    { startX: 100, startY: 250, length: 80, angle: -0.3, delay: 0, duration: 15, color: '#f8c080', thickness: 12 },
    { startX: 250, startY: 220, length: 60, angle: -0.5, delay: 3, duration: 18, color: '#e8a060', thickness: 8 },
    { startX: 450, startY: 240, length: 100, angle: -0.2, delay: 6, duration: 20, color: '#f8b070', thickness: 15 },
    { startX: 600, startY: 230, length: 70, angle: -0.4, delay: 2, duration: 16, color: '#ffc080', thickness: 10 },
    { startX: 700, startY: 260, length: 50, angle: -0.6, delay: 8, duration: 14, color: '#e89050', thickness: 6 },
    { startX: 150, startY: 280, length: 90, angle: -0.1, delay: 5, duration: 22, color: '#f8a060', thickness: 14 },
    { startX: 350, startY: 270, length: 65, angle: -0.35, delay: 10, duration: 17, color: '#ffd090', thickness: 9 },
    { startX: 550, startY: 255, length: 75, angle: -0.25, delay: 4, duration: 19, color: '#e8b070', thickness: 11 },
  ], []);

  // Floating blobs
  const blobs = useMemo(() => [
    { cx: 120, cy: 200, size: 60, delay: 0, color: '#f8a050' },
    { cx: 300, cy: 180, size: 80, delay: 4, color: '#e88040' },
    { cx: 500, cy: 210, size: 70, delay: 2, color: '#f8b060' },
    { cx: 650, cy: 190, size: 55, delay: 6, color: '#ffc070' },
    { cx: 200, cy: 240, size: 90, delay: 8, color: '#e89050' },
    { cx: 420, cy: 230, size: 65, delay: 3, color: '#f8a040' },
  ], []);

  return (
    <svg className="module-artwork golden-art" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* Rich sunset gradient */}
        <linearGradient id="sunsetGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#1a0800" />
          <stop offset="8%" stopColor="#2a0f05" />
          <stop offset="18%" stopColor="#4a1a08" />
          <stop offset="30%" stopColor="#8a3010" />
          <stop offset="45%" stopColor="#c85018" />
          <stop offset="60%" stopColor="#e87025" />
          <stop offset="75%" stopColor="#f89035" />
          <stop offset="88%" stopColor="#fbb050" />
          <stop offset="100%" stopColor="#fdd080" />
        </linearGradient>

        {/* Sun body gradient */}
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8e8" />
          <stop offset="40%" stopColor="#ffe8b0" />
          <stop offset="70%" stopColor="#ffc860" />
          <stop offset="100%" stopColor="#f8a030" />
        </radialGradient>

        {/* Sun corona/glow */}
        <radialGradient id="coronaGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff0c0" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#ffc050" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#f08020" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#c04010" stopOpacity="0" />
        </radialGradient>

        {/* Heat distortion gradient */}
        <linearGradient id="heatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f8a040" stopOpacity="0" />
          <stop offset="20%" stopColor="#f8a040" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#ffc060" stopOpacity="0.3" />
          <stop offset="80%" stopColor="#f8a040" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f8a040" stopOpacity="0" />
        </linearGradient>

        {/* Road surface */}
        <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a2520" />
          <stop offset="50%" stopColor="#2a1a15" />
          <stop offset="100%" stopColor="#1a0a08" />
        </linearGradient>

        {/* Mountain silhouette gradient */}
        <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a0808" />
          <stop offset="100%" stopColor="#0a0404" />
        </linearGradient>

        {/* Soft blur filter */}
        <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
        </filter>

        {/* Stronger blur for distant haze */}
        <filter id="hazeBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
        </filter>

        {/* Vignette */}
        <radialGradient id="vignetteGrad" cx="50%" cy="60%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="70%" stopColor="transparent" />
          <stop offset="100%" stopColor="#0a0400" stopOpacity="0.5" />
        </radialGradient>
      </defs>

      {/* Sky background */}
      <rect width="800" height="400" fill="url(#sunsetGrad)" />

      {/* Distant atmospheric haze bands */}
      <AtmosphericGlow y={100} height={60} color="#f8905020" delay={0} />
      <AtmosphericGlow y={140} height={50} color="#ffa04018" delay={2} />
      <AtmosphericGlow y={180} height={40} color="#ffb05015" delay={4} />

      {/* Sun corona (soft outer glow) */}
      <SunCorona />

      {/* Sun body - subtle, not pulsing */}
      <circle cx={400} cy={320} r={85} fill="url(#sunGrad)" />

      {/* Sun bands (retro striped sun) */}
      <g opacity="0.4">
        <rect x="315" y="270" width="170" height="6" fill="#1a0800" rx="3" />
        <rect x="325" y="288" width="150" height="5" fill="#1a0800" rx="2.5" />
        <rect x="338" y="304" width="124" height="4" fill="#1a0800" rx="2" />
        <rect x="352" y="318" width="96" height="3.5" fill="#1a0800" rx="1.5" />
        <rect x="365" y="330" width="70" height="3" fill="#1a0800" rx="1.5" />
        <rect x="378" y="340" width="44" height="2.5" fill="#1a0800" rx="1" />
      </g>

      {/* Floating haze blobs - dreamy atmosphere */}
      <g filter="url(#hazeBlur)">
        {blobs.map((blob, i) => (
          <FloatingBlob key={i} {...blob} />
        ))}
      </g>

      {/* Wispy haze strands - crooked organic lines */}
      <g filter="url(#softBlur)">
        {hazeWisps.map((wisp, i) => (
          <HazeWisp key={i} {...wisp} />
        ))}
      </g>

      {/* Distant mountains - layered silhouettes */}
      <path
        d="M0,340 Q50,320 100,330 T200,315 T300,325 T400,310 T500,320 T600,308 T700,318 T800,330 L800,400 L0,400 Z"
        fill="#180808"
        opacity="0.7"
      />
      <path
        d="M0,355 Q80,340 150,348 T280,338 T400,345 T520,335 T650,342 T800,350 L800,400 L0,400 Z"
        fill="#0f0505"
        opacity="0.85"
      />
      <path
        d="M0,370 Q100,362 200,368 T350,360 T500,365 T650,358 T800,365 L800,400 L0,400 Z"
        fill="#0a0303"
        opacity="0.95"
      />

      {/* Heat distortion layers */}
      <HeatDistortion y={345} delay={0} />
      <HeatDistortion y={355} delay={1.5} />
      <HeatDistortion y={365} delay={3} />

      {/* Road - clear perspective highway */}
      <g>
        {/* Road shoulder/edge glow */}
        <path
          d="M320,400 L400,340 L480,400 Z"
          fill="#2a1510"
          opacity="0.5"
        />
        {/* Main road surface */}
        <path
          d="M340,400 L400,348 L460,400 Z"
          fill="url(#roadGrad)"
        />
        {/* Center line markings */}
        <g fill="#f8b050" opacity="0.9">
          <rect x="397" y="385" width="6" height="15" rx="1" />
          <rect x="398" y="368" width="4" height="12" rx="1" />
          <rect x="399" y="355" width="2" height="8" rx="0.5" />
        </g>
        {/* Edge lines */}
        <line x1="345" y1="400" x2="400" y2="352" stroke="#f8a040" strokeWidth="1" opacity="0.3" />
        <line x1="455" y1="400" x2="400" y2="352" stroke="#f8a040" strokeWidth="1" opacity="0.3" />
      </g>

      {/* Cacti silhouettes */}
      <g fill="#080404">
        {/* Left group */}
        <path d="M60,400 L60,355 Q60,350 65,350 L65,365 L75,365 L75,345 Q75,340 80,340 L80,365 L70,365 L70,400 Z" />
        <path d="M100,400 L100,370 Q100,365 105,365 L105,400 Z" />

        {/* Right group */}
        <path d="M720,400 L720,360 Q720,355 725,355 L725,370 L735,370 L735,350 Q735,345 740,345 L740,370 L730,370 L730,400 Z" />
        <path d="M755,400 L755,375 Q755,372 758,372 L758,400 Z" />
      </g>

      {/* Distant birds - simple elegant glides */}
      <g>
        <GlidingBird delay={0} startX={-50} y={140} direction={1} />
        <GlidingBird delay={12} startX={850} y={120} direction={-1} />
        <GlidingBird delay={6} startX={-50} y={160} direction={1} />
      </g>

      {/* Tape reel watermark - very subtle */}
      <g transform="translate(710, 50)" opacity="0.08">
        <circle cx="0" cy="0" r="30" fill="none" stroke="#fff" strokeWidth="3" />
        <circle cx="0" cy="0" r="18" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx="0" cy="0" r="8" fill="#fff" />
      </g>

      {/* Vignette overlay */}
      <rect width="800" height="400" fill="url(#vignetteGrad)" style={{ pointerEvents: 'none' }} />
    </svg>
  );
}
