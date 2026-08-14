/**
 * ResumeCTA
 * ---------
 * Animated Resume CTA with glassmorphic button and rocket hover state.
 *
 * Idle:
 *   - "● AVAILABLE" status badge floats above the button
 *   - Glassmorphic button: backdrop-blur + semi-transparent bg
 *   - No arrow — just "RESUME" in bold caps
 *
 * Hover:
 *   - Badge slides out upward (AnimatePresence exit)
 *   - Rocket springs in from the left with a gentle idle sway
 *   - Smoke particles drift from the rocket exhaust
 *   - "↗" slides in after "RESUME"
 *   - Shimmer sweeps the button face once
 *
 * Flags:
 *   SMOOTH_ROCKET = false → disables rocket + smoke (quick revert)
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SMOOTH_ROCKET = true;

// ── Smoke particle config — hardcoded to avoid random re-render drift ─────────
const SMOKE = [
  { id: 0, delay: 0,    dx: -5,  dy: 18, size: 5, dur: 1.4 },
  { id: 1, delay: 0.32, dx:  8,  dy: 22, size: 4, dur: 1.2 },
  { id: 2, delay: 0.6,  dx: -2,  dy: 16, size: 6, dur: 1.5 },
  { id: 3, delay: 0.88, dx:  11, dy: 20, size: 4, dur: 1.3 },
  { id: 4, delay: 1.15, dx: -9,  dy: 24, size: 5, dur: 1.4 },
];

// ── Available badge ───────────────────────────────────────────────────────────
function AvailableBadge() {
  return (
    <motion.div
      className="absolute bottom-full mb-3 left-1/2 flex items-center gap-2 px-3 py-[6px] rounded-full whitespace-nowrap"
      style={{
        transform: 'translateX(-50%)',
        background: 'color-mix(in srgb, var(--portfolio-fg) 7%, transparent)',
        border: '1px solid var(--portfolio-border)',
        backdropFilter: 'blur(8px)',
      }}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.92 }}
      transition={{ duration: 0.22, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {/* Green pulse dot */}
      <span className="relative flex h-[7px] w-[7px]">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ background: '#22c55e', animationDuration: '1.8s' }}
        />
        <span
          className="relative inline-flex rounded-full h-[7px] w-[7px]"
          style={{ background: '#22c55e' }}
        />
      </span>
      <span
        className="text-[9px] font-bold tracking-[0.18em] uppercase"
        style={{ color: 'var(--portfolio-fg)', opacity: 0.65 }}
      >
        Available
      </span>
    </motion.div>
  );
}

// ── Smoke particles ───────────────────────────────────────────────────────────
function SmokeParticles() {
  return (
    // Anchor point: horizontally centred at the rocket exhaust (bottom)
    <div className="absolute bottom-0 left-1/2" style={{ transform: 'translateX(-50%)', pointerEvents: 'none' }}>
      {SMOKE.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: -p.size / 2,
            top: 0,
            background: 'var(--portfolio-fg)',
          }}
          animate={{
            x: [0, p.dx],
            y: [0, p.dy],
            opacity: [0, 0.35, 0],
            scale: [0.4, 1.6, 0.6],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
            repeatDelay: 0.1,
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
      {/* Body */}
      <path
        d="M15 2C9.5 2 5 9 5 19.5V30L15 35.5L25 30V19.5C25 9 20.5 2 15 2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Porthole */}
      <circle cx="15" cy="17" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      {/* Left fin */}
      <path
        d="M5 26.5L1.5 35L5 32"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right fin */}
      <path
        d="M25 26.5L28.5 35L25 32"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Exhaust nozzle */}
      <path
        d="M11 30.5H19"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
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

  return (
    <motion.div
      className={`inline-flex flex-col items-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Rocket + badge + button — all relative to this wrapper */}
      <div
        className="relative inline-flex items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Available badge — visible when not hovered, exits upward on hover */}
        <AnimatePresence>
          {!hovered && <AvailableBadge />}
        </AnimatePresence>

        {/* Rocket — slides in from left on hover */}
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
                {/* Sway + float when settled */}
                <motion.div
                  className="relative"
                  animate={{ rotate: [-2, 2, -2], y: [0, -4, 0] }}
                  transition={{
                    rotate: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                    y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <RocketIcon />
                  <SmokeParticles />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* ── Glassmorphic button ── */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden px-5 md:px-7 py-[10px] md:py-3 rounded-xl text-xs md:text-sm font-bold tracking-[0.14em] inline-flex items-center gap-0"
          style={{
            background: hovered
              ? 'color-mix(in srgb, var(--portfolio-fg) 10%, transparent)'
              : 'color-mix(in srgb, var(--portfolio-fg) 5%, transparent)',
            backdropFilter: 'blur(14px) saturate(160%)',
            WebkitBackdropFilter: 'blur(14px) saturate(160%)',
            border: '1px solid color-mix(in srgb, var(--portfolio-fg) 18%, transparent)',
            boxShadow: hovered
              ? '0 8px 32px color-mix(in srgb, var(--portfolio-bg) 40%, transparent), inset 0 1px 0 color-mix(in srgb, var(--portfolio-fg) 12%, transparent)'
              : '0 4px 16px color-mix(in srgb, var(--portfolio-bg) 30%, transparent), inset 0 1px 0 color-mix(in srgb, var(--portfolio-fg) 8%, transparent)',
            color: 'var(--portfolio-fg)',
            transition: 'background 0.25s, box-shadow 0.25s',
          }}
        >
          {/* Shimmer sweep — once per hover enter */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="shimmer"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, var(--portfolio-fg) 50%, transparent 100%)',
                  opacity: 0.07,
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '120%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>

          {/* Label */}
          <span className="relative z-10 flex items-center">
            RESUME

            {/* ↗ arrow slides in after text on hover */}
            <span
              className="inline-block overflow-hidden"
              style={{
                width: hovered ? '1.4em' : '0',
                opacity: hovered ? 1 : 0,
                transition: 'width 0.22s cubic-bezier(0.215,0.61,0.355,1), opacity 0.22s',
                marginLeft: hovered ? '0.35em' : '0',
              }}
            >
              ↗
            </span>
          </span>
        </a>
      </div>
    </motion.div>
  );
}
