/**
 * ResumeCTA
 * ---------
 * Glassmorphic Resume button with animated border arc and rocket hover state.
 *
 * Rocket phase machine:
 *   hidden  → cursor enters → present  (springs in, floats gently, 1 s wait)
 *   present → 1 s elapsed  → flying   (follows SVG path every frame via useAnimationFrame)
 *   any     → cursor leaves → hidden   (springs out immediately)
 *
 * Path following is computed with SVGPathElement.getPointAtLength() so the rocket
 * is EXACTLY on the bezier curve at all times and the heading angle is derived from
 * the path tangent — no keyframe artifacts, perfectly fluid.
 *
 * SMOOTH_ROCKET = false → disables rocket for quick revert.
 */

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  useAnimationFrame,
} from 'framer-motion';

const SMOOTH_ROCKET   = true;
const LOOP_DURATION   = 7000; // ms per complete loop

// ── Flight path ───────────────────────────────────────────────────────────────
// Coordinates are in the rocket's own local space: (0,0) = parked position.
// Shape (counter-clockwise): launch up-left → sweep far-left → arc back right →
// loop past button → return. Matches the reference screenshot.
const FLIGHT_PATH_D =
  'M 0 0 ' +
  'C -60 -140, -560 -120, -1060 -8 ' +  // up-left arc, reaches far left
  'C -1160 50, -500 95, -22 75 ' +        // sweeps down-right
  'C 115 72, 230 8, 222 -65 ' +           // loops right, past button
  'C 212 -125, 42 -28, 0 0';             // curves back home

// ── Smoke particles ───────────────────────────────────────────────────────────
// Anchored at exhaust nozzle: SVG y=30.5 / viewBox-h=42 × rendered 44 px ≈ 12 px from bottom
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
          animate={{ x: [0, p.dx], y: [0, p.dy], opacity: [0, 0.28, 0], scale: [0.4, 1.5, 0.5] }}
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
  const [phase, setPhase]   = useState<Phase>('hidden');
  const timer               = useRef<ReturnType<typeof setTimeout>>();
  const phaseRef            = useRef<Phase>('hidden');
  const svgPathRef          = useRef<SVGPathElement | null>(null);
  const rocketBodyRef       = useRef<HTMLDivElement | null>(null);
  const progressRef         = useRef(0);

  // Keep a ref in sync so the animation-frame callback never has a stale closure
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const handleEnter = () => {
    setPhase('present');
    timer.current = setTimeout(() => setPhase('flying'), 1000);
  };
  const handleLeave = () => {
    clearTimeout(timer.current);
    setPhase('hidden');
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  // Reset path progress and clear inline transform when not flying
  useEffect(() => {
    if (phase !== 'flying') {
      progressRef.current = 0;
      if (rocketBodyRef.current) rocketBodyRef.current.style.transform = '';
    }
  }, [phase]);

  // Per-frame path following — only runs during 'flying' phase
  useAnimationFrame((_, delta) => {
    if (phaseRef.current !== 'flying') return;
    const path = svgPathRef.current;
    const body = rocketBodyRef.current;
    if (!path || !body) return;

    const totalLen = path.getTotalLength();
    progressRef.current = (progressRef.current + delta / LOOP_DURATION) % 1;

    const dist   = progressRef.current * totalLen;
    const ahead  = ((progressRef.current + 0.004) % 1) * totalLen; // 0.4% ahead for tangent

    const pt  = path.getPointAtLength(dist);
    const ptA = path.getPointAtLength(ahead);

    // Heading angle: atan2(dx, -dy) so rotate=0 ↔ nose pointing up
    const angle = Math.atan2(ptA.x - pt.x, -(ptA.y - pt.y)) * (180 / Math.PI);

    body.style.transform = `translate(${pt.x}px, ${pt.y}px) rotate(${angle}deg)`;
  });

  // ── Rotating border arc ───────────────────────────────────────────────────
  const angle    = useMotionValue(0);
  const hovered  = phase !== 'hidden';
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
        {/* Hidden SVG that owns the path — used only for getPointAtLength() */}
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', width: 0, height: 0, overflow: 'visible' }}
        >
          <path ref={svgPathRef} d={FLIGHT_PATH_D} />
        </svg>

        {/* ── Rocket ──────────────────────────────────────────────────────── */}
        {SMOOTH_ROCKET && (
          // Outer: spring entry / exit
          <motion.div
            className="absolute right-full flex items-end"
            style={{ paddingRight: 14, paddingBottom: 2, zIndex: 100 }}
            animate={phase === 'hidden' ? { x: -36, opacity: 0 } : { x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            {/* Path-follower: transform is written directly in useAnimationFrame */}
            <div ref={rocketBodyRef} style={{ position: 'relative' }}>
              {/* Idle float — active only when present; held at 0 during flight */}
              <motion.div
                animate={
                  phase === 'present'
                    ? { y: [0, -5, 0], rotate: [-2, 2, -2] }
                    : { y: 0, rotate: 0 }
                }
                transition={{
                  y:        { duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' },
                  rotate:   { duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' },
                  default:  { duration: 0.3 },
                }}
              >
                <RocketIcon />
                <SmokeParticles />
              </motion.div>
            </div>
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
