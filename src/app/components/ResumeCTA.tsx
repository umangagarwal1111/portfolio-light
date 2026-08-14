/**
 * ResumeCTA
 * ---------
 * Glassmorphic Resume CTA with animated border and rocket hover state.
 *
 * Idle:
 *   - Glassmorphic button (backdrop-blur, semi-transparent)
 *   - A small arc of light travels continuously around the border
 *     (conic-gradient rotating at ~1 rev / 4 s)
 *
 * Hover:
 *   - Rocket springs in from the left with sway + float idle animation
 *   - Smoke particles drift from the rocket exhaust nozzle
 *   - Shimmer sweeps the button face once
 *   - Border arc intensifies
 *
 * Flag: SMOOTH_ROCKET = false → disables rocket + smoke for quick revert
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

const SMOOTH_ROCKET = true;

// ── Smoke particle config — fixed values to avoid random re-render drift ───────
const SMOKE = [
  { id: 0, delay: 0,    dx: -5,  dy: 14, size: 5, dur: 1.4 },
  { id: 1, delay: 0.32, dx:  7,  dy: 17, size: 4, dur: 1.2 },
  { id: 2, delay: 0.6,  dx: -2,  dy: 13, size: 6, dur: 1.5 },
  { id: 3, delay: 0.88, dx:  9,  dy: 16, size: 4, dur: 1.3 },
  { id: 4, delay: 1.15, dx: -7,  dy: 19, size: 5, dur: 1.4 },
];

// ── Smoke particles ───────────────────────────────────────────────────────────
// Anchored at the exhaust nozzle: y=30.5 in SVG(0 0 30 42), rendered 44px tall
//   → 30.5/42 × 44 ≈ 32 px from top → 12 px from bottom
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
          style={{
            width:  p.size,
            height: p.size,
            left:   -p.size / 2,
            top:    0,
            background: 'var(--portfolio-fg)',
          }}
          animate={{
            x:       [0, p.dx],
            y:       [0, p.dy],
            opacity: [0, 0.32, 0],
            scale:   [0.4, 1.5, 0.5],
          }}
          transition={{
            duration:    p.dur,
            delay:       p.delay,
            repeat:      Infinity,
            ease:        'easeOut',
            repeatDelay: 0.05,
          }}
        />
      ))}
    </div>
  );
}

// ── Rocket SVG ────────────────────────────────────────────────────────────────
function RocketIcon() {
  return (
    <svg
      width="32"
      height="44"
      viewBox="0 0 30 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: 'var(--portfolio-fg)' }}
      aria-hidden="true"
    >
      <path
        d="M15 2C9.5 2 5 9 5 19.5V30L15 35.5L25 30V19.5C25 9 20.5 2 15 2Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
      />
      <circle cx="15" cy="17" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 26.5L1.5 35L5 32"  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 26.5L28.5 35L25 32" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Nozzle — smoke anchors here */}
      <path d="M11 30.5H19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// ── ResumeCTA ─────────────────────────────────────────────────────────────────
export function ResumeCTA({
  href,
  className = '',
}: {
  href: string;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  // ── Rotating border arc ───────────────────────────────────────────────────
  // Drive a motion value 0→360, loop forever, build a conic-gradient from it.
  const angle = useMotionValue(0);

  useEffect(() => {
    const ctrl = animate(angle, 360, {
      duration: 4,
      ease: 'linear',
      repeat: Infinity,
    });
    return ctrl.stop;
  }, [angle]);

  // Traveling arc: dim base border + a ~25° bright spot
  const borderBg = useTransform(angle, (a) => {
    const intensity = hovered ? '65%' : '45%';
    return [
      `conic-gradient(from ${a}deg,`,
      `  var(--portfolio-border) 0%,`,
      `  color-mix(in srgb, var(--portfolio-fg) ${intensity}, transparent) 8%,`,
      `  var(--portfolio-border) 16%,`,
      `  var(--portfolio-border) 100%`,
      `)`,
    ].join('');
  });

  return (
    <motion.div
      className={`inline-flex flex-col items-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Rocket + Button row */}
      <div
        className="relative inline-flex items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Rocket — springs in from left on hover */}
        {SMOOTH_ROCKET && (
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute right-full flex items-end"
                style={{ paddingRight: 14, paddingBottom: 2 }}
                initial={{ x: -28, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -28, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <motion.div
                  className="relative"
                  animate={{ rotate: [-2, 2, -2], y: [0, -4, 0] }}
                  transition={{
                    rotate: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                    y:      { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <RocketIcon />
                  <SmokeParticles />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* ── Animated border wrapper ── */}
        {/* p-[1px] exposes 1 px of the conic-gradient bg as the border */}
        <motion.div
          className="relative p-[1px] rounded-xl overflow-hidden"
          style={{ background: borderBg }}
        >
          {/* ── Glassmorphic anchor button ── */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-[10px] overflow-hidden px-5 md:px-7 py-[10px] md:py-3 text-xs md:text-sm font-bold tracking-[0.14em] inline-flex items-center"
            style={{
              background:           'color-mix(in srgb, var(--portfolio-fg) 6%, transparent)',
              backdropFilter:       'blur(14px) saturate(160%)',
              WebkitBackdropFilter: 'blur(14px) saturate(160%)',
              boxShadow:            'inset 0 1px 0 color-mix(in srgb, var(--portfolio-fg) 10%, transparent)',
              color:                'var(--portfolio-fg)',
              transition:           'background 0.25s',
            }}
          >
            {/* Shimmer sweep — fires once on hover enter */}
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
