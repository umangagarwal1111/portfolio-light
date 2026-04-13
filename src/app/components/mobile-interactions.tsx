import { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'motion/react';

// ─── DETECT MOBILE ─────────────────────────────────────────────
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

// ─── MOMENTUM TILT ON SCROLL ───────────────────────────────────
// Subtly tilts content based on scroll velocity for a physical feel.
// On desktop, renders children directly without tilt.
export function MomentumTilt({
  children,
  className = '',
  enabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
}) {
  const scrollVelocity = useMotionValue(0);
  const smoothRotate = useSpring(scrollVelocity, {
    stiffness: 150,
    damping: 20,
  });

  useEffect(() => {
    if (!enabled) {
      scrollVelocity.set(0);
      return;
    }

    // Previously this ran a continuous RAF loop every frame (~60fps) even when
    // the user wasn't scrolling. That constant Framer Motion set() call forced
    // the animation engine to reconcile on every frame, adding background noise
    // that could cause scroll stutter. Now it's event-driven: only tracks velocity
    // on scroll events, then schedules one RAF to write the value, and
    // decays back to 0 after scrolling stops.
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let rafId: number;
    let decayId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const now = Date.now();
      const dt = Math.max(now - lastTime, 1);
      const dy = window.scrollY - lastScrollY;
      const velocity = dy / dt;
      const clamped = Math.max(-2, Math.min(2, velocity * 8));

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        scrollVelocity.set(clamped);
      });

      lastScrollY = window.scrollY;
      lastTime = now;

      // Decay tilt back to 0 shortly after scrolling stops
      clearTimeout(decayId);
      decayId = setTimeout(() => scrollVelocity.set(0), 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(decayId);
    };
  }, [enabled, scrollVelocity]);

  // When disabled, render plain divs — a motion.div with style={{ rotateX: 0 }}
  // still creates a 3D stacking context even at zero rotation, adding GPU layer
  // pressure in the scroll path on iOS.
  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={className}
      style={{ perspective: '1000px', position: 'relative' }}
    >
      <motion.div style={{ rotateX: smoothRotate }}>
        {children}
      </motion.div>
    </div>
  );
}

// ─── ELASTIC OVERSCROLL SECTION ────────────────────────────────
// Sections spring into view with an elastic bounce effect on mobile.
export function ElasticSection({
  children,
  className = '',
  id,
  enabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  enabled?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      // y reduced from 80→20: large upward entry while scrolling down was
      // an opposing-motion pattern that felt like scroll resistance.
      initial={{ opacity: 0, y: enabled ? 20 : 0, scale: enabled ? 0.99 : 1 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: enabled ? 20 : 0, scale: enabled ? 0.99 : 1 }
      }
      transition={
        enabled
          ? {
              // damping raised from 12 → 22: the original spring was severely
              // underdamped and would overshoot + oscillate for 1-2 seconds.
              // During that oscillation (continuous scale + y repaints) the browser
              // competes with scroll, making it feel stuck. Higher damping snaps
              // cleanly to rest on the first pass.
              type: 'spring',
              stiffness: 80,
              damping: 22,
              mass: 0.8,
            }
          : { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
      }
    >
      {children}
    </motion.section>
  );
}

// ─── TAP-TO-REVEAL PROJECT IMAGE ──────────────────────────────
// On mobile, tapping a project card reveals its preview image with
// a spring animation. Tapping again dismisses it.
export function TapRevealImage({
  imageUrl,
  isVisible,
  onDismiss,
}: {
  imageUrl: string;
  isVisible: boolean;
  onDismiss: () => void;
}) {
  const handleDismiss = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      onDismiss();
    },
    [onDismiss]
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="overflow-hidden mt-6 border-2 cursor-pointer"
          style={{ borderColor: 'var(--portfolio-fg)' }}
          onClick={handleDismiss}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 200, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 18,
          }}
        >
          <motion.img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover grayscale contrast-125"
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            exit={{ scale: 1.3 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── SECTION COUNTER ──────────────────────────────────────────
// Fixed bottom-right counter showing current section position (01/04).
export function SectionCounter({
  activeSection,
  sections,
}: {
  activeSection: string;
  sections: string[];
}) {
  const currentIndex = sections.indexOf(activeSection) + 1;
  const total = sections.length;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 md:hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <div className="px-3 py-2 backdrop-blur-sm" style={{ border: '1px solid var(--portfolio-border-strong)', background: 'var(--portfolio-nav-bg)' }}>
        <div className="flex items-center gap-1 text-xs tracking-widest">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={currentIndex}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="inline-block w-4 text-center"
            >
              {String(currentIndex).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          <span className="opacity-40">/</span>
          <span className="opacity-40 w-4 text-center">
            {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── TOUCH RIPPLE ──────────────────────────────────────────────
// Creates a visual ripple effect from the touch/click point on mobile.
export function TouchRipple({
  children,
  className = '',
  enabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
}) {
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const nextId = useRef(0);
  const justTouched = useRef(false);

  const createRipple = useCallback(
    (clientX: number, clientY: number, el: HTMLElement) => {
      if (!enabled) return;
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const id = nextId.current++;
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 800);
    },
    [enabled]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      justTouched.current = true;
      createRipple(
        e.touches[0].clientX,
        e.touches[0].clientY,
        e.currentTarget as HTMLElement
      );
      setTimeout(() => {
        justTouched.current = false;
      }, 400);
    },
    [createRipple]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (justTouched.current) return;
      createRipple(
        e.clientX,
        e.clientY,
        e.currentTarget as HTMLElement
      );
    },
    [createRipple]
  );

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onTouchStart={enabled ? handleTouchStart : undefined}
      onClick={enabled ? handleClick : undefined}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none z-30"
          style={{
            background: 'var(--portfolio-muted)',
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 6, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// ─── SCROLL SPEED BLUR ─────────────────────────────────────────
// Adds a subtle motion blur effect when scrolling fast on mobile.
// Always renders <motion.div> to maintain stable DOM tree.
export function ScrollBlur({
  children,
  className = '',
  enabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
}) {
  const blur = useMotionValue(0);
  const smoothBlur = useSpring(blur, { stiffness: 200, damping: 30 });
  const filterValue = useTransform(smoothBlur, (v) =>
    v > 0.01 ? `blur(${v}px)` : 'none'
  );

  useEffect(() => {
    if (!enabled) {
      blur.set(0);
      return;
    }

    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let rafId: number;

    const track = () => {
      const now = Date.now();
      const dt = Math.max(now - lastTime, 1);
      const dy = Math.abs(window.scrollY - lastScrollY);
      const velocity = dy / dt;
      const blurValue = Math.min(3, velocity * 2);
      blur.set(blurValue);
      lastScrollY = window.scrollY;
      lastTime = now;
      rafId = requestAnimationFrame(track);
    };

    rafId = requestAnimationFrame(track);
    return () => cancelAnimationFrame(rafId);
  }, [enabled, blur]);

  return (
    <motion.div
      className={className}
      style={enabled ? { filter: filterValue } : undefined}
    >
      {children}
    </motion.div>
  );
}