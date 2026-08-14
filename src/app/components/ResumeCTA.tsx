/**
 * ResumeCTA
 * ---------
 * Glassmorphic Resume button with animated border arc and rocket hover state.
 *
 * Rocket phase machine (on hover):
 *   hidden → present  : rocket springs in, gentle float for 1 s
 *   present → flying  : traces an invisible path covering the full contact section
 *   any → hidden      : cursor leaves, rocket springs out immediately
 *
 * Path shape (counter-clockwise loop, matching reference):
 *   Start (right side) → up-left → far left → lower sweep → back right → home
 *   Rocket completes one full –360° rotation per loop (head-first).
 *
 * Border: bright 25° arc sweeps the 1 px border via conic-gradient + Framer angle.
 *
 * SMOOTH_ROCKET = false → disables rocket entirely for quick revert.
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

// ── Flight path ───────────────────────────────────────────────────────────────
// Coordinates are px offsets from the rocket's parked position (left of button).
// The path is a large counter-clockwise loop spanning the full section width.
// rotate: –360 total rotation so the nose always faces the direction of travel.
const PATH = {
  x:      [0, -280, -650, -980, -820, -420,  +60,  +200,  +170,   +30,    0],
  y:      [0,  -90,  -30,  +80,  +190, +200, +185,   +90,   -60,   -25,    0],
  rotate: [0,  -50,  -90, -130,  -165, -200, -235,  -278,  -320,  -350, -360],
  times:  [0, 0.10, 0.22,  0.35,  0.47, 0.57, 0.67,  0.78,  0.88,  0.95,  1.0],
};

// Duration of one full loop (seconds)
const LOOP_DURATION = 6;

// ── Smoke particles ───────────────────────────────────────────────────────────
// Anchored at exhaust nozzle: SVG y=30.5 in viewBox 42 h, rendered 44 px tall
// → 30.5/42 × 44 ≈ 32 px from top → 12 px from bottom
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
      <path d="M5 26.5L1.5 35L5 32"    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 26.5L28.5 35L25 32" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 30.5H19"            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// ── ResumeCTA ─────────────────────────────────────────────────────────────────
type Phase = 'hidden' | 'present' | 'flying';

export function ResumeCTA({ href, className = '' }: { href: string; className?: string }) {
  const [phase, setPhase] = useState<Phase>('hidden');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const handleEnter = () => {
    setPhase('present');
    timer.current = setTimeout(() => setPhase('flying'), 1000);
  };
  const handleLeave = () => {
    clearTimeout(timer.current);
    setPhase('hidden');
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  const hovered = phase !== 'hidden';

  // ── Rotating border arc ───────────────────────────────────────────────────
  const angle = useMotionValue(0);
  useEffect(() => {
    const ctrl = animate(angle, 360, { duration: 4, ease: 'linear', repeat: Infinity });
    return ctrl.stop;
  }, [angle]);

  const borderBg = useTransform(angle, (a) => {
    const hi = hovered ? '70%' : '45%';
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
        {/* ── Rocket ──────────────────────────────────────────────────────── */}
        {SMOOTH_ROCKET && (
          // Outer: controls visibility (springs in / out)
          <motion.div
            className="absolute right-full flex items-end"
            style={{ paddingRight: 14, paddingBottom: 2, zIndex: 100 }}
            animate={phase === 'hidden' ? { x: -36, opacity: 0 } : { x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            {/* Middle: path flight when flying, or rests at origin */}
            <motion.div
              animate={
                phase === 'flying'
                  ? { x: PATH.x, y: PATH.y, rotate: PATH.rotate }
                  : { x: 0, y: 0, rotate: 0 }
              }
              transition={
                phase === 'flying'
                  ? {
                      duration: LOOP_DURATION,
                      ease: 'easeInOut',
                      times: PATH.times,
                      repeat: Infinity,
                      repeatType: 'loop',
                    }
                  : { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }
              }
              className="relative"
              style={{ transformOrigin: '50% 70%' }} // pivot near rocket centre-of-mass
            >
              {/* Inner: gentle float while present; returns to 0,0 during flight */}
              <motion.div
                animate={
                  phase === 'present'
                    ? { y: [0, -5, 0], rotate: [-2, 2, -2] }
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

        {/* ── Animated border wrapper (sharp corners) ─────────────────────── */}
        <motion.div
          className="relative p-[1px] overflow-hidden"
          style={{ background: borderBg }}
        >
          {/* ── Glassmorphic button ─────────────────────────────────────────── */}
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
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, var(--portfolio-fg) 50%, transparent 100%)',
                    opacity: 0.07,
                  }}
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
