import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Skip on touch/coarse-pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Belt-and-suspenders: force cursor:none via inline style on html + body
    // (in addition to CSS rule) so it takes effect with zero delay on re-entry
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.cursor;
    const prevBody = body.style.cursor;
    html.style.setProperty('cursor', 'none', 'important');
    body.style.setProperty('cursor', 'none', 'important');

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"], input, select, textarea, [data-cursor-hover]')) {
        if (ringRef.current) {
          ringRef.current.style.width = '48px';
          ringRef.current.style.height = '48px';
        }
      }
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (!related?.closest('a, button, [role="button"], input, select, textarea, [data-cursor-hover]')) {
        if (ringRef.current) {
          ringRef.current.style.width = '32px';
          ringRef.current.style.height = '32px';
        }
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });

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
      html.style.cursor = prevHtml;
      body.style.cursor = prevBody;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return createPortal(
    <>
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
          zIndex: 2147483647,
          willChange: 'transform',
          transform: 'translate(-200px, -200px) translate(-50%, -50%)',
        }}
      />
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
          zIndex: 2147483646,
          opacity: 0.75,
          transition: 'width 0.2s ease, height 0.2s ease',
          willChange: 'transform',
          transform: 'translate(-200px, -200px) translate(-50%, -50%)',
        }}
      />
    </>,
    document.body
  );
}
