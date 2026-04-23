import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const hovering = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Skip on touch/coarse-pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Force cursor: none immediately via JS — no CSS timing delay
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onHoverStart = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"], input, select, textarea, [data-cursor-hover]')) {
        hovering.current = true;
        if (ringRef.current) {
          ringRef.current.style.width = '48px';
          ringRef.current.style.height = '48px';
        }
      }
    };

    const onHoverEnd = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (!related?.closest('a, button, [role="button"], input, select, textarea, [data-cursor-hover]')) {
        hovering.current = false;
        if (ringRef.current) {
          ringRef.current.style.width = '32px';
          ringRef.current.style.height = '32px';
        }
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onHoverStart);
    document.addEventListener('mouseout', onHoverEnd);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onHoverStart);
      document.removeEventListener('mouseout', onHoverEnd);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Dot — exact position, no opacity transition */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#ffffff',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transform: 'translate(-200px, -200px) translate(-50%, -50%)',
        }}
      />
      {/* Ring — lagging follower */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid #ffffff',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0.75,
          transition: 'width 0.2s ease, height 0.2s ease',
          willChange: 'transform',
          transform: 'translate(-200px, -200px) translate(-50%, -50%)',
        }}
      />
    </>
  );
}
