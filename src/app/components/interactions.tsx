import { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from 'motion/react';

// ─── SCROLL PROGRESS BAR ───────────────────────────────────────
// Thin white line at the very top that fills as you scroll
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
      style={{ scaleX, background: 'var(--portfolio-fg)' }}
    />
  );
}

// ─── SPLIT TEXT REVEAL ─────────────────────────────────────────
// Each character animates in from below with stagger
export function SplitTextReveal({
  text,
  className = '',
  delay = 0,
  as: Tag = 'span',
  lineStyles = {},
  styledWords = {},
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  lineStyles?: Record<number, string>;
  styledWords?: Record<string, string>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const lines = text.split('\n');

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, lineIndex) => {
        const lineClass = lineStyles[lineIndex] ?? '';
        const lineBaseIndex = lines.slice(0, lineIndex).join('').length;
        const words = line.split(' ');
        let lineCharOffset = 0;

        return (
          <span key={lineIndex} className={`block overflow-hidden ${lineClass}`}>
            {words.map((word, wordIndex) => {
              const wordClass = styledWords[word] ?? '';
              const segment = wordIndex > 0 ? ' ' + word : word;
              const segmentStart = lineCharOffset;
              lineCharOffset += segment.length;

              return (
                <span key={wordIndex} className={wordClass}>
                  {segment.split('').map((char, ci) => {
                    const globalIndex = lineBaseIndex + segmentStart + ci;
                    return (
                      <motion.span
                        key={`${lineIndex}-${wordIndex}-${ci}`}
                        className="inline-block"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={
                          isInView
                            ? { y: '0%', opacity: 1 }
                            : { y: '100%', opacity: 0 }
                        }
                        transition={{
                          duration: 0.5,
                          delay: delay + globalIndex * 0.02,
                          ease: [0.215, 0.61, 0.355, 1],
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}

// ─── MAGNETIC BUTTON ───────────────────────────────────────────
// Button that subtly follows the cursor when hovered
export function MagneticButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// ─── TEXT SCRAMBLE ──────────────────────────────────────────────
// On hover, text scrambles through random characters before resolving
export function TextScramble({
  text,
  className = '',
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  as?: 'h3' | 'span' | 'p' | 'div';
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = text.length;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 1 / 2;

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);
  }, [text, isScrambling]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Tag onMouseEnter={scramble} className={className}>
      {displayText}
    </Tag>
  );
}

// ─── CURSOR-FOLLOWING IMAGE REVEAL ─────────────────────────────
// Image follows cursor position within the project row
export function CursorImage({
  imageUrl,
  isVisible,
  containerRef,
}: {
  imageUrl: string;
  isVisible: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left + 16);
      mouseY.set(e.clientY - rect.top + 16);
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove);
      return () => el.removeEventListener('mousemove', handleMouseMove);
    }
  }, [containerRef, mouseX, mouseY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute top-0 left-0 pointer-events-none z-20 hidden md:block"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-80 h-60 overflow-hidden border-2" style={{ borderColor: 'var(--portfolio-fg)' }}>
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── INFINITE MARQUEE ──────────────────────────────────────────
// Continuously scrolling text band — classic brutalist element.
// Uses CSS @keyframes instead of Framer Motion so the animation runs
// on the compositor thread, completely off the JS main thread.
// This prevents Framer Motion's scheduler from being pinged every
// frame, which was contributing to scroll jank on direction changes.
export function Marquee({
  text,
  className = '',
  speed = 20,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-flex"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="inline-block px-4">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── STAGGERED LINE REVEAL ─────────────────────────────────────
// Each child block fades in with a stagger
export function StaggeredReveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

// ─── ANIMATED SECTION (enhanced) ───────────────────────────────
export function AnimatedSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      // y: 60 → 0 was removed as the root cause of perceived scroll pausing.
      // Scrolling down toward a section while it animates upward creates a
      // head-on collision — the opposing motions feel like a scroll stutter.
      // Fade-only entry keeps the reveal effect without fighting scroll direction.
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ─── WIPE UNDERLINE LINK ───────────────────────────────────────
// Underline wipes in from left on hover
export function WipeLink({
  href,
  children,
  className = '',
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={`relative group inline-block ${className}`}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)]" style={{ background: 'var(--portfolio-fg)' }} />
    </a>
  );
}

// ── PARALLAX WRAPPER ──────────────────────────────────────────
// Content moves at a different rate than scroll
export function ParallaxText({
  children,
  className = '',
  speed = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ position: 'relative' }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// ─── HORIZONTAL LINE DRAW ──────────────────────────────────────
// A horizontal line that draws in when scrolled into view
export function LineReveal({ className = '' }: { className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`h-[1px] ${className}`}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
      style={{ originX: 0, background: 'var(--portfolio-fg)' }}
    />
  );
}