/**
 * UAParticles
 * -----------
 * Renders the "UA" initials as a particle field on a canvas.
 * Each particle springs back to its home position (forming the letter shapes)
 * and scatters away from the cursor when it passes nearby.
 *
 * Performance notes:
 *  - Capped at MAX_PARTICLES (4 000) via random subsampling.
 *  - Single ctx.fill() call per frame (batch path) instead of per-particle.
 *  - DPR capped at 2 to avoid 4× memory on high-density screens.
 *  - Color read once + updated only on theme class change (MutationObserver).
 */

import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;   // current position (CSS px)
  ox: number; oy: number; // resting / home position
  vx: number; vy: number; // velocity
}

// ── tunables ─────────────────────────────────────────────────────────────────
const MAX_PARTICLES   = 4000;
const SAMPLE_GAP      = 5;     // sample every Nth pixel when reading the text bitmap
const REPULSION_R     = 115;   // px — cursor interaction radius
const REPULSION_FORCE = 7.5;   // strength of the scatter push
const SPRING          = 0.052; // pull-back stiffness (lower = slower return)
const DAMPING         = 0.87;  // velocity decay per frame (lower = more friction)
const DOT_R           = 1.3;   // particle dot radius in CSS px
const DOT_ALPHA       = 0.035; // overall dot opacity (watermark feel)

export function UAParticles({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pts       = useRef<Particle[]>([]);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const raf       = useRef(0);
  const fg        = useRef('#f0ede8');
  const alive     = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    alive.current = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ── theme colour sync ─────────────────────────────────────────────────
    const syncFg = () => {
      fg.current =
        getComputedStyle(document.documentElement)
          .getPropertyValue('--portfolio-fg')
          .trim() || '#f0ede8';
    };
    syncFg();
    const themeObserver = new MutationObserver(syncFg);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    // ── build particle field from offscreen text bitmap ────────────────────
    const build = () => {
      const { width: W, height: H } = canvas.getBoundingClientRect();
      if (W < 1 || H < 1) return;

      // Physical pixel canvas
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // reset + set scale

      // Offscreen render — same CSS dimensions, no DPR needed for sampling
      const off    = document.createElement('canvas');
      off.width    = Math.round(W);
      off.height   = Math.round(H);
      const offCtx = off.getContext('2d')!;

      // "UA" right-aligned, vertically centred, filling ~75 % of height
      const fontSize = H * 0.78;
      offCtx.font         = `900 ${fontSize}px Inter, 'Helvetica Neue', Arial, sans-serif`;
      offCtx.textAlign    = 'right';
      offCtx.textBaseline = 'middle';
      offCtx.fillStyle    = '#fff';
      offCtx.fillText('UA', W - 20, H / 2);

      // Sample non-transparent pixels → particle home positions
      const iW   = off.width;
      const iH   = off.height;
      const data = offCtx.getImageData(0, 0, iW, iH).data;
      const raw: Particle[] = [];

      for (let y = 0; y < iH; y += SAMPLE_GAP) {
        for (let x = 0; x < iW; x += SAMPLE_GAP) {
          if (data[(y * iW + x) * 4 + 3] > 100) {
            raw.push({
              // start slightly scattered so the form-up on load feels alive
              x:  x + (Math.random() - 0.5) * 50,
              y:  y + (Math.random() - 0.5) * 50,
              ox: x,
              oy: y,
              vx: 0,
              vy: 0,
            });
          }
        }
      }

      // Random subsample if over budget
      if (raw.length > MAX_PARTICLES) {
        for (let i = raw.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [raw[i], raw[j]] = [raw[j], raw[i]];
        }
        raw.length = MAX_PARTICLES;
      }

      pts.current = raw;
    };

    // ── animation loop ─────────────────────────────────────────────────────
    const tick = () => {
      if (!alive.current) return;

      const W = canvas.width  / dpr;
      const H = canvas.height / dpr;

      ctx.clearRect(0, 0, W, H);

      const { x: mx, y: my } = mouse.current;
      const particles = pts.current;

      ctx.fillStyle   = fg.current;
      ctx.globalAlpha = DOT_ALPHA;

      // Batch all dots into one path → single fill() call per frame
      ctx.beginPath();

      for (const p of particles) {
        // Spring toward home
        p.vx += (p.ox - p.x) * SPRING;
        p.vy += (p.oy - p.y) * SPRING;

        // Cursor repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPULSION_R * REPULSION_R && d2 > 0) {
          const d = Math.sqrt(d2);
          const f = ((REPULSION_R - d) / REPULSION_R) * REPULSION_FORCE;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }

        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x  += p.vx;
        p.y  += p.vy;

        // moveTo avoids sub-path close artefacts between arcs
        ctx.moveTo(p.x + DOT_R, p.y);
        ctx.arc(p.x, p.y, DOT_R, 0, Math.PI * 2);
      }

      ctx.fill();

      raf.current = requestAnimationFrame(tick);
    };

    // ── mouse / pointer tracking ───────────────────────────────────────────
    // Canvas is pointer-events-none so we listen at window level,
    // then convert to canvas-local coordinates.
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    // ── resize → rebuild ───────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf.current);
      build();
      tick();
    });
    ro.observe(canvas);

    // ── wait for fonts then start ──────────────────────────────────────────
    document.fonts.ready.then(() => { build(); tick(); });

    return () => {
      alive.current = false;
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      themeObserver.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
