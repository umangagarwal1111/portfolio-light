/**
 * ResumeCTA
 * ---------
 * Animated anchor button for the Resume CTA in the contact section.
 *
 * Idle:  pulsing beacon dot sits above the button — signals interactivity.
 * Hover: rocket SVG slides in from the left (spring physics), arrow icon morphs
 *        ⇩ → ↗, shimmer sweeps the button face, rocket floats gently.
 *
 * Toggle SMOOTH_ROCKET = false to disable the rocket entirely and revert to
 * a simple bordered button with just the shimmer + icon-swap.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SMOOTH_ROCKET = true; // set false to revert to plain button

// ── Beacon ────────────────────────────────────────────────────────────────────
function Beacon() {
  return (
    <div
      className="relative flex items-center justify-center mb-3"
      style={{ width: 12, height: 12 }}
      aria-hidden="true"
    >
      {/* Outer ping ring */}
      <span
        className="absolute inset-0 rounded-full animate-ping"
        style={{
          background: 'var(--portfolio-fg)',
          opacity: 0.25,
          animationDuration: '2.2s',
        }}
      />
      {/* Inner ping ring — offset phase */}
      <span
        className="absolute inset-0 rounded-full animate-ping"
        style={{
          background: 'var(--portfolio-fg)',
          opacity: 0.12,
          animationDuration: '2.2s',
          animationDelay: '1.1s',
        }}
      />
      {/* Core dot */}
      <span
        className="relative block rounded-full"
        style={{ width: 6, height: 6, background: 'var(--portfolio-fg)' }}
      />
    </div>
  );
}

// ── Rocket SVG ────────────────────────────────────────────────────────────────
function RocketIcon() {
  return (
    <svg
      width="30"
      height="42"
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
      {/* Exhaust flame */}
      <path
        d="M11 35.5Q13 41 15 39Q17 41 19 35.5"
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
      {/* Beacon */}
      <Beacon />

      {/* Rocket + Button row */}
      <div
        className="relative inline-flex items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Rocket — slides in from the left on hover */}
        {SMOOTH_ROCKET && (
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute right-full flex items-center"
                style={{ paddingRight: 12 }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                {/* Gentle float idle once landed */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatType: 'loop',
                  }}
                >
                  <RocketIcon />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Button */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden px-4 md:px-6 py-2 md:py-3 rounded text-xs md:text-sm font-bold tracking-widest inline-flex items-center gap-2"
          style={{
            backgroundColor: hovered ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)',
            borderColor: 'var(--portfolio-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
            color: 'var(--portfolio-fg)',
            transition: 'background-color 0.2s',
          }}
        >
          {/* Shimmer sweep — fires once on each hover enter */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="shimmer"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, var(--portfolio-fg) 50%, transparent 100%)',
                  opacity: 0.08,
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>

          {/* Arrow — morphs ⇩ ↔ ↗ on hover */}
          <span className="relative inline-block w-[1em] overflow-hidden" style={{ lineHeight: 1 }}>
            <AnimatePresence mode="wait">
              {hovered ? (
                <motion.span
                  key="up"
                  className="block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.18, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  ↗
                </motion.span>
              ) : (
                <motion.span
                  key="down"
                  className="block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.18, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  ⇩
                </motion.span>
              )}
            </AnimatePresence>
          </span>

          RESUME
        </a>
      </div>
    </motion.div>
  );
}
