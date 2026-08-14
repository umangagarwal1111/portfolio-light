/**
 * ResumeCTA
 * ---------
 * Glassmorphic Resume CTA with animated border arc and rocket hover state.
 *
 * Rocket phase machine:
 *   hidden  → cursor enters → present (spring in, gentle float for ~1 s)
 *   present → 1 s elapsed  → flying  (traces invisible bezier loop, repeats)
 *   any     → cursor leaves → hidden  (spring out)
 *
 * Border: a bright 25° arc sweeps the 1 px border continuously (conic-gradient
 * driven by a Framer Motion angle value, 4 s per revolution).
 *
 * Flag: SMOOTH_ROCKET = false → disables rocket entirely for quick revert.
 */

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';

const SMOOTH_ROCKET = true;

// ── Rocket flight path ────────────────────────────────────────────────────────
// Relative offsets (CSS px) from the rocket's parked position.
// Smooth bezier approximated via 8 keyframe stops + `times` array.
const PATH = {
  x:      [0, -60, -180, -260, -220, -110, -45,  0],
  y:      [0, -90,  -75,    0,   80,  100,  55,  0],
  rotate: [0, -28,  -12,    8,   24,   10,   2,  0],
  times:  [0, 0.13, 0.30, 0.47, 0.62, 0.77, 0.90, 1],
};

// ── Smoke particles ───────────────────────────────────────────────────────────
// Anchor: exhaust nozzle at SVG y=30.5 / height=42 → ~32 px from top → 12 px from bottom
const SMOKE = [
  { id: 0, delay: 0,    dx: -5,  dy: 14, size: 5, dur: 1.4 },
  { id: 1, delay: 0.32, dx:  7,  dy: 17, size: 4, dur: 1.2 },
  { id: 2, delay: 0.60, dx: -2,  dy: 13, size: 6, dur: 1.5 },
  { id: 3, delay: 0.88, dx:  9,  dy: 16, size: 4, dur: 1.3 },
  { id: 4, delay: 1.15, dx: -7,  dy: 19, size: 5, dur: 1.4 },
];

function SmokeParticles() {
  return (
    <div
      className="absolute left-1/2"
      style={{ bottom: 12, transform: 'translateX(-50%)', pointerEvents: 'none' }}
    >
      {SMOKE.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left: -p.size / 2, top: 0, background: 'var(--portfolio-fg)' }}
          animate={{ x: [0, p.dx], y: [0, p.dy], opacity: [0, 0.3, 0], scale: [0.4, 1.5, 0.5] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.05 }}
        />
      ))}
    </div>
  );
}

// ── Rocket SVG ────────────────────────────────────────────────────────────────
function RocketIcon() {
  return (
    <svg width="32" height="44" viewBox="0 0 30 42" fill="none" style={{ color: 'var(--portfolio-fg)' }} aria-hidden="true">
      <path d="M15 2C9.5 2 5 9 5 19.5V30L15 35.5L25 30V19.5C25 9 20.5 2 15 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="15" cy="17" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 26.5L1.5 35L5 32"   stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 26.5L28.5 35L25 32" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 30.5H19"            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// ── ResumeCTA ─────────────────────────────────────────────────────────────────
type Phase = 'hidden' | 'present' | 'flying';

export function ResumeCTA({ href, className = '' }: { href: string; className?: string }) {
  const [phase, setPhase] = useState<Phase>('hidden');
  const [hovered, setHovered] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const handleEnter = () => {
    setHovered(true);
    setPhase('present');
    timer.current = setTimeout(() => setPhase('flying'), 1000);
  };
  const handleLeave = () => {
    setHovered(false);
    clearTimeout(timer.current);
    setPhase('hidden');
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  // ── Rotating border arc ─────────────────────────────────────────────────
  const angle = useMotionValue(0);
  useEffect(() => {
    const ctrl = animate(angle, 360, { duration: 4, ease: 'linear', repeat: Infinity });
    return ctrl.stop;
  }, [angle]);

  const borderBg = useTransform(angle, (a) => {
    const hi = hovered ? '65%' : '45%';
    return `conic-gradient(from ${a}deg, var(--portfolio-border) 0%, color-mix(in srgb, var(--portfolio-fg) ${hi}, transparent) 8%, var(--portfolio-border) 16%, var(--portfolio-border) 100%)`;
  });

  return (
    <motion.div
      className={`inline-flex flex-col items-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div
        className="relative inline-flex items-center"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* ── Rocket ─────────────────────────────────────────────────────── */}
        {SMOOTH_ROCKET && (
          <motion.div
            className="absolute right-full flex items-end"
            style={{ paddingRight: 14, paddingBottom: 2 }}
            // Outer: visibility — springs in / out
            animate={phase === 'hidden' ? { x: -36, opacity: 0 } : { x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            {/* Middle: path flight OR at rest */}
            <motion.div
              animate={
                phase === 'flying'
                  ? { x: PATH.x, y: PATH.y, rotate: PATH.rotate }
                  : { x: 0, y: 0, rotate: 0 }
              }
              transition={
                phase === 'flying'
                  ? { duration: 4, ease: 'easeInOut', times: PATH.times, repeat: Infinity, repeatType: 'loop' }
                  : { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }
              }
              className="relative"
            >
              {/* Inner: idle float (only while present, stops during flight) */}
              <motion.div
                animate={
                  phase === 'present'
                    ? { y: [0, -4, 0], rotate: [-2, 2, -2] }
                    : { y: 0, rotate: 0 }
                }
                transition={{
                  y:      { duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' },
                  rotate: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' },
                }}
              >
                <RocketIcon />
                <SmokeParticles />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* ── Animated border wrapper (sharp corners) ─────────────────── */}
        <motion.div
          className="relative p-[1px] overflow-hidden"
          style={{ background: borderBg }}
        >
          {/* ── Glassmorphic button ───────────────────────────────────── */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden px-5 md:px-7 py-[10px] md:py-3 text-xs md:text-sm font-bold tracking-[0.14em] inline-flex items-center"
            style={{
              background:           'color-mix(in srgb, var(--portfolio-fg) 6%, transparent)',
              backdropFilter:       'blur(14px) saturate(160%)',
              WebkitBackdropFilter: 'blur(14px) saturate(160%)',
              boxShadow:            'inset 0 1px 0 color-mix(in srgb, var(--portfolio-fg) 10%, transparent)',
              color:                'var(--portfolio-fg)',
              transition:           'background 0.25s',
            }}
          >
            {/* Shimmer — fires once on hover enter */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key="shimmer"
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent 0%, var(--portfolio-fg) 50%, transparent 100%)', opacity: 0.07 }}
                  initial={{ x: '-100%' }}
                  animate={{ x: '120%' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>

            <span className="relative z-10">RESUME</span>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
