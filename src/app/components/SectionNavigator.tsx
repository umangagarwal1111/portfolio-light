import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export interface NavSection {
  id: string;
  label: string;
}

// ── Scroll spy via IntersectionObserver ──────────────────────────────────────
export function useSectionSpy(sections: NavSection[]): string {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    if (sections.length === 0) return;

    const visible = new Map<string, number>(); // id → boundingClientRect.top

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (!id) return;
          if (entry.isIntersecting) {
            visible.set(id, entry.boundingClientRect.top);
          } else {
            visible.delete(id);
          }
        });

        if (visible.size === 0) return;

        // Pick the section whose top edge is closest to (but still below) 0
        let best = '';
        let bestY = Infinity;
        visible.forEach((y, id) => {
          const dist = Math.abs(y);
          if (dist < bestY) { bestY = dist; best = id; }
        });
        if (best) setActiveId(best);
      },
      { rootMargin: '-10% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return activeId;
}

// ── SectionNavigator UI ──────────────────────────────────────────────────────
export function SectionNavigator({ sections }: { sections: NavSection[] }) {
  const activeId = useSectionSpy(sections);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  const spring = prefersReduced
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 500, damping: 38 };

  const labelSpring = prefersReduced
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 420, damping: 32 };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  return (
    <nav
      aria-label="Section navigator"
      className="fixed right-4 md:right-7 top-1/2 z-40 flex flex-col items-end gap-[10px] md:gap-3"
      style={{ transform: 'translateY(-50%)' }}
    >
      {sections.map(({ id, label }) => {
        const isActive = id === activeId;
        const isHighlighted = id === hoveredId || id === focusedId;

        return (
          <div
            key={id}
            className="flex items-center gap-2 md:gap-3 cursor-pointer"
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => scrollTo(id)}
          >
            {/* Label — desktop only, fades in on hover/focus */}
            <AnimatePresence>
              {isHighlighted && (
                <motion.span
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={labelSpring}
                  className="hidden md:block text-[10px] tracking-widest select-none pointer-events-none"
                  style={{ color: 'var(--portfolio-fg)' }}
                >
                  {label.toUpperCase()}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Bar indicator */}
            <motion.button
              onClick={() => scrollTo(id)}
              onFocus={() => setFocusedId(id)}
              onBlur={() => setFocusedId(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollTo(id);
                }
              }}
              aria-label={`Go to ${label}`}
              aria-current={isActive ? 'true' : undefined}
              animate={{
                width: isActive
                  ? isHighlighted ? 28 : 22
                  : isHighlighted ? 18 : 12,
                opacity: isActive ? 1 : isHighlighted ? 0.55 : 0.18,
              }}
              initial={false}
              transition={spring}
              className="block rounded-full border-none cursor-pointer focus-visible:ring-1 focus-visible:ring-offset-2"
              style={{
                height: 2,
                minWidth: 12,
                backgroundColor: 'var(--portfolio-fg)',
                padding: 0,
                // Increase tap target without affecting layout
                outline: 'none',
              }}
            />
          </div>
        );
      })}
    </nav>
  );
}
