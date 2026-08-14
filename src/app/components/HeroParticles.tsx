/**
 * HeroParticles
 * -------------
 * Full-background particle field for the hero / masthead section.
 * ~7 000 particles distributed in a soft jittered grid across the canvas.
 * Each particle springs back to its home position; cursor pushes nearby
 * particles away, creating a ripple / wake effect as the pointer moves.
 *
 * Performance notes:
 *  - Single ctx.fill() per frame (batched path — one call, not 7 000).
 *  - DPR capped at 2.
 *  - No font sampling — initialises immediately on mount.
 *  - Color synced via MutationObserver (light ↔ dark mode).
 */

import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;   // current position (CSS px)
  ox: number; oy: number; // home position
  vx: number; vy: number; // velocity
}

// ── tunables ──────────────────────────────────────────────────────────────────
const TARGET_COUNT    = 7000;
const REPULSION_R     = 130;   // px — how far the cursor disturbs particles
const REPULSION_FORCE = 9;     // scatter strength
const SPRING          = 0.032; // pull-back stiffness (low = slow drift return)
const DAMPING         = 0.88;  // velocity decay (lower = more friction)
const DOT_R           = 1.0;   // particle radius in CSS px
const DOT_ALPHA       = 0.13;  // opacity per dot — subtle against bg

export function HeroParticles({ className = '' }: { className?: string }) {
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

    // ── colour sync (light ↔ dark) ────────────────────────────────────────
    const syncFg = () => {
      fg.current =
        getComputedStyle(document.documentElement)
          .getPropertyValue('--portfolio-fg')
          .trim() || '#f0ede8';
    };
    syncFg();
    const themeObs = new MutationObserver(syncFg);
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    // ── build particles ───────────────────────────────────────────────────
    // Jittered grid: divide canvas into cells, one particle per cell with
    // random offset — gives even coverage without pure-random clustering.
    const build = () => {
      const { width: W, height: H } = canvas.getBoundingClientRect();
      if (W < 1 || H < 1) return;

      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const aspect = W / H;
      const cols   = Math.ceil(Math.sqrt(TARGET_COUNT * aspect));
      const rows   = Math.ceil(TARGET_COUNT / cols);
      const cellW  = W / cols;
      const cellH  = H / rows;

      const raw: Particle[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Home position: cell centre + gentle random jitter
          const ox = (c + 0.5 + (Math.random() - 0.5) * 0.9) * cellW;
          const oy = (r + 0.5 + (Math.random() - 0.5) * 0.9) * cellH;
          raw.push({
            // Start slightly scattered so they visibly settle on load
            x: ox + (Math.random() - 0.5) * 24,
            y: oy + (Math.random() - 0.5) * 24,
            ox, oy,
            vx: 0, vy: 0,
          });
        }
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

      // One path per frame — single fill() call for all 7 000 dots
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

        ctx.moveTo(p.x + DOT_R, p.y);
        ctx.arc(p.x, p.y, DOT_R, 0, Math.PI * 2);
      }

      ctx.fill();
      raf.current = requestAnimationFrame(tick);
    };

    // ── mouse tracking ─────────────────────────────────────────────────────
    // Canvas is pointer-events-none; listen at window level.
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

    // Start immediately — no font loading needed
    build();
    tick();

    return () => {
      alive.current = false;
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      themeObs.disconnect();
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
