import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ─── HOOK ──────────────────────────────────────────────────────
function useIsMobileLocal() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

// ─── TYPE ──────────────────────────────────────────────────────
interface TypoStyle {
  id: string;
  text: string;
  fontFamily: string;
  fontWeight: number | string;
  fontSize: string;
  letterSpacing: string;
  fontStyle?: 'italic' | 'normal';
  isGlitch?: boolean;
  /** ms to stay visible before transitioning. Default: see interval constants */
  holdMs?: number;
}

// ─── DESKTOP STYLES (8) ────────────────────────────────────────
// Each style explores a distinct design language for "Umang Agarwal".
const DESKTOP_STYLES: TypoStyle[] = [
  {
    // 1 ─ Thin caps: sparse, minimal, like a luxury brand label
    id: 'thin-caps',
    text: 'UMANG AGARWAL',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 200,
    fontSize: '0.6rem',
    letterSpacing: '0.38em',
  },
  {
    // 2 ─ Bold display: heavy, confident, takes up space
    id: 'bold-display',
    text: 'Umang Agarwal',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 900,
    fontSize: '0.95rem',
    letterSpacing: '-0.045em',
  },
  {
    // 3 ─ Serif editorial: Playfair italic, newspaper / magazine feel
    id: 'serif-editorial',
    text: 'Umang Agarwal',
    fontFamily: '"Playfair Display", Georgia, serif',
    fontWeight: 400,
    fontSize: '0.9rem',
    letterSpacing: '0.02em',
    fontStyle: 'italic',
  },
  {
    // 4 ─ Monospace: developer / terminal feel
    id: 'mono-dev',
    text: 'umang.agarwal()',
    fontFamily: '"Space Mono", "Courier New", monospace',
    fontWeight: 400,
    fontSize: '0.66rem',
    letterSpacing: '0.01em',
  },
  {
    // 5 ─ Pixel: retro game, nostalgic
    id: 'pixel',
    text: 'U.AGARWAL',
    fontFamily: '"Press Start 2P", monospace',
    fontWeight: 400,
    fontSize: '0.42rem',
    letterSpacing: '0.08em',
    holdMs: 3200,
  },
  {
    // 6 ─ Condensed display: editorial poster energy
    id: 'condensed',
    text: 'UMANG AGARWAL',
    fontFamily: '"Oswald", Inter, sans-serif',
    fontWeight: 700,
    fontSize: '0.875rem',
    letterSpacing: '0.14em',
  },
  {
    // 7 ─ Handwritten signature: personal, warm
    id: 'script',
    text: 'Umang Agarwal',
    fontFamily: '"Dancing Script", cursive',
    fontWeight: 700,
    fontSize: '1.05rem',
    letterSpacing: '0.02em',
  },
  {
    // 8 ─ Glitch: digital, edgy, modern
    id: 'glitch',
    text: 'Umang Agarwal',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 800,
    fontSize: '0.875rem',
    letterSpacing: '-0.02em',
    isGlitch: true,
    holdMs: 3000,
  },
];

// ─── MOBILE STYLES (5) ─────────────────────────────────────────
// Compact "UA" initials — simple, readable at small nav size.
const MOBILE_STYLES: TypoStyle[] = [
  {
    // 1 ─ Bold sans: confident, the default feel
    id: 'bold',
    text: 'UA',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 900,
    fontSize: '0.9rem',
    letterSpacing: '-0.04em',
  },
  {
    // 2 ─ Serif monogram: refined, editorial
    id: 'serif',
    text: 'UA',
    fontFamily: '"Playfair Display", Georgia, serif',
    fontWeight: 400,
    fontSize: '0.95rem',
    letterSpacing: '0.05em',
    fontStyle: 'italic',
  },
  {
    // 3 ─ Pixel: crisp retro
    id: 'pixel',
    text: 'UA',
    fontFamily: '"Press Start 2P", monospace',
    fontWeight: 400,
    fontSize: '0.45rem',
    letterSpacing: '0.06em',
    holdMs: 2200,
  },
  {
    // 4 ─ Ultra light: airy, spaced out
    id: 'light',
    text: 'UA',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 100,
    fontSize: '0.875rem',
    letterSpacing: '0.5em',
  },
  {
    // 5 ─ Glitch: digital
    id: 'glitch',
    text: 'UA',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 800,
    fontSize: '0.9rem',
    letterSpacing: '0.02em',
    isGlitch: true,
    holdMs: 2000,
  },
];

// ─── TRANSITION VARIANTS ───────────────────────────────────────
// Each style index gets its own exit/enter motion so back-to-back
// transitions feel different rather than just repeating the same blur fade.
const TRANSITIONS = [
  // blur-fade (default): gentle, almost like changing focus
  {
    initial: { opacity: 0, y: 5,  filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0,  filter: 'blur(0px)' },
    exit:    { opacity: 0, y: -5, filter: 'blur(4px)' },
    duration: 0.35,
  },
  // slide-up: snappy, editorial
  {
    initial: { opacity: 0, y: 12, filter: 'blur(0px)' },
    animate: { opacity: 1, y: 0,  filter: 'blur(0px)' },
    exit:    { opacity: 0, y: -12, filter: 'blur(0px)' },
    duration: 0.28,
  },
  // scale-fade: soft, logo-like
  {
    initial: { opacity: 0, scale: 0.88, filter: 'blur(2px)' },
    animate: { opacity: 1, scale: 1,    filter: 'blur(0px)' },
    exit:    { opacity: 0, scale: 1.08, filter: 'blur(2px)' },
    duration: 0.32,
  },
];

// ─── COMPONENT ─────────────────────────────────────────────────
export function HeaderNameAnimation({ onClick }: { onClick?: () => void }) {
  const isMobile = useIsMobileLocal();
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const styles = isMobile ? MOBILE_STYLES : DESKTOP_STYLES;
  // Desktop cycles every 2.5s, mobile every 1.8s; slowdown on hover
  const defaultHoldMs = isMobile ? 1800 : 2500;

  useEffect(() => {
    // Reset to first style when switching breakpoints so nothing looks off
    setIndex(0);
  }, [isMobile]);

  useEffect(() => {
    const current = styles[index];
    const hold = isHovered
      ? (current.holdMs ?? defaultHoldMs) * 3   // pause longer on hover
      : (current.holdMs ?? defaultHoldMs);

    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % styles.length);
    }, hold);

    return () => clearTimeout(timer);
  }, [index, isHovered, styles, defaultHoldMs]);

  const current = styles[index];
  const variant = TRANSITIONS[index % TRANSITIONS.length];

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Fixed dimensions prevent layout shift across different typography widths.
      // Desktop: wide enough for "UMANG AGARWAL" thin-caps (widest style).
      // Mobile: just wide enough for "UA" plus generous letter-spacing.
      className="relative focus:outline-none cursor-pointer flex items-center overflow-visible"
      style={{
        width: isMobile ? '2.6rem' : '10rem',
        height: '1.4rem',
      }}
      aria-label="Go to top — Umang Agarwal"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={current.id}
          // Glitch class + data-text drives ::before / ::after CSS pseudo-elements
          className={current.isGlitch ? 'header-glitch' : ''}
          data-text={current.isGlitch ? current.text : undefined}
          style={{
            position: 'absolute',
            whiteSpace: 'nowrap',
            fontFamily: current.fontFamily,
            fontWeight: current.fontWeight,
            fontSize: current.fontSize,
            letterSpacing: current.letterSpacing,
            fontStyle: current.fontStyle ?? 'normal',
            color: 'var(--portfolio-fg)',
            lineHeight: 1,
            // Slightly speed up the animation on hover for a reactive feel
            animationDuration: isHovered ? '0.35s' : undefined,
          }}
          initial={variant.initial}
          animate={variant.animate}
          exit={variant.exit}
          transition={{
            duration: variant.duration,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {current.text}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
