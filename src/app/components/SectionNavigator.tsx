import { useEffect, useRef, useState } from 'react';
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
  const activeId  = useSectionSpy(sections);
  const [hoveredId,  setHoveredId]  = useState<string | null>(null);
  const [focusedId,  setFocusedId]  = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragHoverId, setDragHoverId] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();
  const navRef         = useRef<HTMLElement>(null);
  const dragging       = useRef(false);
  const lastDragId     = useRef('');

  const spring = prefersReduced
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 500, damping: 38 };

  const labelSpring = prefersReduced
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 420, damping: 32 };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Offset for the fixed top nav so the section title is never hidden behind it.
    // Query the actual nav height at call-time so this works regardless of nav size.
    const fixedNav = document.querySelector('nav.fixed, nav[class*="fixed"]') as HTMLElement | null;
    const offset = (fixedNav ? fixedNav.offsetHeight : 72) + 24; // 24px breathing room
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  // ── Drag roller ───────────────────────────────────────────────────────────
  // Maps a pointer Y position to the nearest section and navigates to it.
  // setPointerCapture keeps events firing even when the cursor leaves the nav.
  const getSectionFromY = (clientY: number): NavSection | null => {
    if (!navRef.current) return null;
    const rect  = navRef.current.getBoundingClientRect();
    const relY  = clientY - rect.top;
    const index = Math.round((relY / rect.height) * (sections.length - 1));
    return sections[Math.max(0, Math.min(sections.length - 1, index))] ?? null;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    dragging.current = true;
    lastDragId.current = '';
    setIsDragging(true);
    navRef.current?.setPointerCapture(e.pointerId);
    const s = getSectionFromY(e.clientY);
    if (s) { lastDragId.current = s.id; setDragHoverId(s.id); scrollTo(s.id); }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!dragging.current) return;
    const s = getSectionFromY(e.clientY);
    if (s) {
      setDragHoverId(s.id);
      if (s.id !== lastDragId.current) {
        lastDragId.current = s.id;
        scrollTo(s.id);
      }
    }
  };

  const handlePointerUp = () => {
    dragging.current = false;
    setIsDragging(false);
    setDragHoverId(null);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Section navigator"
      // No gap — py padding on each row makes hit areas contiguous.
      // The nav grows/shrinks with content; top-1/2 + translateY centres it.
      className="fixed right-4 md:right-7 top-1/2 z-40 flex flex-col items-end"
      style={{
        transform:  'translateY(-50%)',
        cursor:     isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {sections.map(({ id, label }) => {
        const isActive      = id === activeId;
        const isHighlighted = id === hoveredId || id === focusedId || (isDragging && id === dragHoverId);

        return (
          <div
            key={id}
            // py-[8px] creates a 18px tall hit zone per bar (8 + 2 + 8).
            // Rows are flush — no gap prop — so there are zero dead zones.
            className="flex items-center gap-2 md:gap-3 py-[8px]"
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => scrollTo(id)}
          >
            {/* Label — desktop only, slides in from right on hover/focus */}
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

            {/* Horizontal bar — width and opacity spring-animate on state change */}
            <motion.button
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
                width:   isActive ? (isHighlighted ? 28 : 22) : (isHighlighted ? 18 : 12),
                opacity: isActive ? 1 : (isHighlighted ? 0.55 : 0.18),
              }}
              initial={false}
              transition={spring}
              className="block rounded-full border-none focus-visible:ring-1 focus-visible:ring-offset-2"
              style={{
                height:          2,
                minWidth:        12,
                backgroundColor: 'var(--portfolio-fg)',
                padding:         0,
                outline:         'none',
                cursor:          'inherit',
              }}
            />
          </div>
        );
      })}
    </nav>
  );
}
