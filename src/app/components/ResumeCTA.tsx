/**
 * ResumeCTA
 * ---------
 * Glassmorphic Resume button with animated border arc and rocket hover state.
 *
 * Rocket phase machine:
 *   hidden  → cursor enters → present  (slides from behind CTA, floats, 1 s wait)
 *   present → 1 s elapsed  → flying   (follows SVG path: loops right, exits left — one-shot)
 *   flying  → path complete → exited  (rocket off-screen)
 *   any     → cursor leaves → hidden   (slides back behind CTA)
 *
 * Trail:
 *   A <canvas> is mounted via React portal directly in document.body (position: fixed,
 *   full-viewport) so it is NEVER clipped by any ancestor's overflow or stacking context.
 *   Each animation frame the rocket's real viewport position is recorded; the canvas
 *   redraws a smooth tapered arc through that history every frame — guaranteed fluid.
 *
 * SMOOTH_ROCKET = false → disables rocket for quick revert.
 */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  useAnimationFrame,
} from 'framer-motion';

const SMOOTH_ROCKET   = true;
const FLIGHT_DURATION = 5500;  // ms
const ROCKET_PAD_R    = 14;    // px gap between rocket right edge and button left edge
const MAX_TRAIL       = 80;    // frames of position history kept

// ── Flight path ───────────────────────────────────────────────────────────────
const FLIGHT_PATH_D =
  'M 0 0 ' +
  'C 70 -100, 200 -140, 255 -25 ' +
  'C 295 65, 230 145, 100 150 ' +
  'C -60 155, -310 110, -620 65 ' +
  'C -1000 20, -1500 -10, -2100 15';

// ── Canvas frame renderer ─────────────────────────────────────────────────────
// Draws the trail AND the rocket onto the same viewport-fixed canvas so that
// mix-blend-mode: difference applies to both at the page level — no stacking-
// context isolation from ancestor transforms.
//
// pts      — viewport px history (oldest [0] → newest [n-1])
// angleDeg — current rocket heading (degrees)
// rw / rh  — rendered rocket dimensions (CSS px)
function renderFrame(
  canvas: HTMLCanvasElement,
  pts:    Array<{ x: number; y: number }>,
  angleDeg: number,
  rw: number,
  rh: number,
) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const vw  = window.innerWidth;
  const vh  = window.innerHeight;

  if (canvas.width !== vw * dpr || canvas.height !== vh * dpr) {
    canvas.width  = vw * dpr;
    canvas.height = vh * dpr;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, vw, vh);

  const n = pts.length;
  if (n < 1) return;

  // ── Trail pass 1: soft outer glow ────────────────────────────────────────
  for (let i = 0; i < n; i++) {
    const t = i / Math.max(n - 1, 1);
    const r = t * 7;
    if (r < 0.4) continue;
    ctx.beginPath();
    ctx.arc(pts[i].x, pts[i].y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${+(t * 0.18).toFixed(3)})`;
    ctx.fill();
  }

  // ── Trail pass 2: bright core ─────────────────────────────────────────────
  for (let i = 0; i < n; i++) {
    const t = i / Math.max(n - 1, 1);
    const r = t * 2.5;
    if (r < 0.3) continue;
    ctx.beginPath();
    ctx.arc(pts[i].x, pts[i].y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${+(t * 0.82).toFixed(3)})`;
    ctx.fill();
  }

  // ── Rocket shape at trail head ────────────────────────────────────────────
  // Draw in canvas → same difference blend as the trail; no stacking-context trap.
  // viewBox is 0 0 30 42; scale so it matches the DOM rocket's rendered size.
  const head  = pts[n - 1];
  const scale = rw / 30;
  const rad   = angleDeg * (Math.PI / 180);

  ctx.save();
  ctx.translate(head.x, head.y);   // move to rocket centre (viewport px)
  ctx.rotate(rad);
  ctx.translate(-rw / 2, -rh / 2); // origin → rocket top-left
  ctx.scale(scale, scale);

  // Body
  ctx.beginPath();
  ctx.moveTo(15, 2);
  ctx.bezierCurveTo(9.5, 2, 5, 9, 5, 19.5);
  ctx.lineTo(5, 30); ctx.lineTo(15, 35.5); ctx.lineTo(25, 30);
  ctx.lineTo(25, 19.5);
  ctx.bezierCurveTo(25, 9, 20.5, 2, 15, 2);
  ctx.closePath();
  ctx.fillStyle = 'white';
  ctx.fill();

  // Left fin
  ctx.beginPath();
  ctx.moveTo(5, 26.5); ctx.lineTo(0, 41); ctx.lineTo(5, 37);
  ctx.closePath();
  ctx.fillStyle = 'white';
  ctx.fill();

  // Right fin
  ctx.beginPath();
  ctx.moveTo(25, 26.5); ctx.lineTo(30, 41); ctx.lineTo(25, 37);
  ctx.closePath();
  ctx.fillStyle = 'white';
  ctx.fill();

  // Porthole — black so difference reveals background colour through it
  ctx.beginPath();
  ctx.arc(15, 17, 3, 0, Math.PI * 2);
  ctx.fillStyle = 'black';
  ctx.fill();

  // Flame
  ctx.beginPath();
  ctx.moveTo(12, 31.5);
  ctx.quadraticCurveTo(13.5, 39, 15, 41);
  ctx.quadraticCurveTo(16.5, 39, 18, 31.5);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.fill();

  ctx.restore();
}

// ── Swoosh sound (synthesised — no audio file needed) ────────────────────────
function playSwoosh() {
  try {
    const actx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const go = () => {
      const buf  = actx.createBuffer(1, actx.sampleRate * 1.4, actx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

      const src    = actx.createBufferSource();
      src.buffer   = buf;
      const filter = actx.createBiquadFilter();
      filter.type  = 'bandpass';
      filter.frequency.setValueAtTime(1800, actx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(180, actx.currentTime + 1.4);
      filter.Q.value = 1.8;
      const gain = actx.createGain();
      gain.gain.setValueAtTime(0, actx.currentTime);
      gain.gain.linearRampToValueAtTime(0.28, actx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + 1.4);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(actx.destination);
      src.start();
      src.onended = () => actx.close();
    };
    if (actx.state === 'suspended') actx.resume().then(go); else go();
  } catch (_) { /* silently ignore if audio unavailable */ }
}

// ── Rocket SVG (filled, mix-blend-mode: difference) ───────────────────────────
function RocketIcon({ width, height }: { width: number; height: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 42"
      fill="none"
      aria-hidden="true"
      style={{ mixBlendMode: 'difference', display: 'block' }}
    >
      <path d="M15 2C9.5 2 5 9 5 19.5V30L15 35.5L25 30V19.5C25 9 20.5 2 15 2Z" fill="white" />
      <path d="M5 26.5L0 41L5 37Z"    fill="white" />
      <path d="M25 26.5L30 41L25 37Z" fill="white" />
      <circle cx="15" cy="17" r="3"   fill="black" />
      <path d="M12 31.5Q13.5 39 15 41Q16.5 39 18 31.5Z" fill="white" opacity="0.45" />
    </svg>
  );
}

// ── ResumeCTA ─────────────────────────────────────────────────────────────────
type Phase = 'hidden' | 'present' | 'flying' | 'exited';

export function ResumeCTA({ href, className = '' }: { href: string; className?: string }) {
  const [phase, setPhase]     = useState<Phase>('hidden');
  const timer                 = useRef<ReturnType<typeof setTimeout>>();
  const phaseRef              = useRef<Phase>('hidden');
  const svgPathRef            = useRef<SVGPathElement | null>(null);
  const rocketBodyRef         = useRef<HTMLDivElement | null>(null);
  const progressRef           = useRef(0);
  const smoothAngleRef        = useRef(0);

  // Trail — canvas is in a portal, positions are viewport coords
  const trailCanvasRef        = useRef<HTMLCanvasElement>(null);
  const posHistoryRef         = useRef<Array<{ x: number; y: number }>>([]);
  // Captured once at flight start: outer div's viewport top-left
  const outerDivRef           = useRef<HTMLDivElement | null>(null);
  const outerOriginRef        = useRef<{ left: number; top: number }>({ left: 0, top: 0 });

  // Measure CTA for rocket sizing + slide distance
  const borderWrapperRef      = useRef<HTMLDivElement | null>(null);
  const [ctaSize, setCtaSize] = useState({ width: 115, height: 40 });

  useEffect(() => {
    const el = borderWrapperRef.current;
    if (!el) return;
    const update = () => setCtaSize({ width: el.offsetWidth, height: el.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rocketHeight = ctaSize.height;
  const rocketWidth  = Math.round(rocketHeight * (30 / 42));
  const hiddenX      = ctaSize.width + ROCKET_PAD_R;

  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // Play swoosh the moment rocket launches — completely isolated from trail logic
  useEffect(() => { if (phase === 'flying') playSwoosh(); }, [phase]);

  // Snapshot outer div's viewport position the moment flying begins
  useEffect(() => {
    if (phase !== 'flying') return;
    const el = outerDivRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    outerOriginRef.current = { left: r.left, top: r.top };
  }, [phase]);

  const handleEnter = () => {
    clearTimeout(timer.current);
    setPhase('present');
    progressRef.current = 0;
    smoothAngleRef.current = 0;
    timer.current = setTimeout(() => setPhase('flying'), 1000);
  };
  const handleLeave = () => {
    clearTimeout(timer.current);
    setPhase('hidden');
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  // Reset on idle
  useEffect(() => {
    if (phase === 'hidden' || phase === 'present') {
      progressRef.current    = 0;
      smoothAngleRef.current = 0;
      posHistoryRef.current  = [];
      if (rocketBodyRef.current) rocketBodyRef.current.style.transform = '';
      const c   = trailCanvasRef.current;
      const ctx = c?.getContext('2d');
      if (c && ctx) ctx.clearRect(0, 0, c.width, c.height);
    }
  }, [phase]);

  // Per-frame: path following + trail recording + trail rendering
  useAnimationFrame((_, delta) => {
    if (phaseRef.current !== 'flying') return;
    const path = svgPathRef.current;
    const body = rocketBodyRef.current;
    if (!path || !body) return;

    const totalLen = path.getTotalLength();
    progressRef.current = Math.min(progressRef.current + delta / FLIGHT_DURATION, 1);

    if (progressRef.current >= 1) {
      phaseRef.current = 'exited';
      setPhase('exited');
      return;
    }

    const dist  = progressRef.current * totalLen;
    const ahead = Math.min(progressRef.current + 0.012, 0.997) * totalLen;
    const pt    = path.getPointAtLength(dist);
    const ptA   = path.getPointAtLength(ahead);

    // Smooth rotation
    const rawAngle = Math.atan2(ptA.x - pt.x, -(ptA.y - pt.y)) * (180 / Math.PI);
    const diff     = ((rawAngle - smoothAngleRef.current + 540) % 360) - 180;
    smoothAngleRef.current += diff * 0.1;
    body.style.transform = `translate(${pt.x}px, ${pt.y}px) rotate(${smoothAngleRef.current}deg)`;

    // Record rocket center in viewport coordinates
    const origin = outerOriginRef.current;
    posHistoryRef.current.push({
      x: origin.left + pt.x + rocketWidth  / 2,
      y: origin.top  + pt.y + rocketHeight / 2,
    });
    if (posHistoryRef.current.length > MAX_TRAIL) posHistoryRef.current.shift();

    // Render trail + rocket on canvas (both get viewport-level difference blend)
    const canvas = trailCanvasRef.current;
    if (canvas) renderFrame(canvas, posHistoryRef.current, smoothAngleRef.current, rocketWidth, rocketHeight);
  });

  // ── Rotating border arc ───────────────────────────────────────────────────
  const angle   = useMotionValue(0);
  const hovered = phase === 'present' || phase === 'flying';

  useEffect(() => {
    const ctrl = animate(angle, 360, { duration: 4, ease: 'linear', repeat: Infinity });
    return ctrl.stop;
  }, [angle]);

  const borderBg = useTransform(angle, (a) => {
    const hi = hovered ? '70%' : '45%';
    return `conic-gradient(from ${a}deg, var(--portfolio-border) 0%, color-mix(in srgb, var(--portfolio-fg) ${hi}, transparent) 8%, var(--portfolio-border) 16%, var(--portfolio-border) 100%)`;
  });

  const rocketVisible = phase === 'present' || phase === 'flying';

  return (
    <motion.div
      className={`inline-flex flex-col items-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Portal canvas — fixed, full-viewport, never clipped by ancestor overflow */}
      {SMOOTH_ROCKET && createPortal(
        <canvas
          ref={trailCanvasRef}
          aria-hidden="true"
          style={{
            position:      'fixed',
            top:           0,
            left:          0,
            width:         '100vw',
            height:        '100vh',
            pointerEvents: 'none',
            zIndex:        45,
            mixBlendMode:  'difference',
          }}
        />,
        document.body,
      )}

      <div
        className="relative inline-flex items-center"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Hidden SVG — path geometry for getPointAtLength() */}
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', width: 0, height: 0, overflow: 'visible' }}
        >
          <path ref={svgPathRef} d={FLIGHT_PATH_D} />
        </svg>

        {/* ── Rocket ──────────────────────────────────────────────────────── */}
        {SMOOTH_ROCKET && (
          <motion.div
            ref={outerDivRef}
            className="absolute right-full flex items-center"
            style={{
              paddingRight: ROCKET_PAD_R,
              zIndex:       5,
              top:          '50%',
              y:            '-50%',   // Framer Motion composites this with the spring x
            }}
            animate={rocketVisible ? { x: 0, opacity: 1 } : { x: hiddenX, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 26 }}
          >
            {/* Path-follower — transform written directly in useAnimationFrame */}
            <div ref={rocketBodyRef} style={{ position: 'relative' }}>
              <motion.div
                animate={
                  phase === 'present'
                    ? { y: [0, -4, 0], rotate: [-1.5, 1.5, -1.5] }
                    : { y: 0, rotate: 0 }
                }
                transition={{
                  y:       { duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' },
                  rotate:  { duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' },
                  default: { duration: 0.3 },
                }}
              >
                {/* DOM rocket — visible only during 'present' (idle float).
                    During 'flying' the canvas renders the rocket so it gets
                    true viewport-level mix-blend-mode: difference blending. */}
                <div style={{ opacity: phase === 'present' ? 1 : 0 }}>
                  <RocketIcon width={rocketWidth} height={rocketHeight} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ── Animated border wrapper — z-index 10, above rocket ──────────── */}
        <motion.div
          ref={borderWrapperRef}
          className="relative p-[1px] overflow-hidden"
          style={{ background: borderBg, zIndex: 10 }}
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden px-5 md:px-7 py-[10px] md:py-3 text-xs md:text-sm font-bold tracking-[0.14em] inline-flex items-center"
            style={{
              background:           'color-mix(in srgb, var(--portfolio-fg) 6%, transparent)',
              backdropFilter:       'blur(14px) saturate(160%)',
              WebkitBackdropFilter: 'blur(14px) saturate(160%)',
              boxShadow:            'inset 0 1px 0 color-mix(in srgb, var(--portfolio-fg) 10%, transparent)',
              color:                'var(--portfolio-fg)',
              transition:           'background 0.25s',
            }}
          >
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key="shimmer"
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent 0%, var(--portfolio-fg) 50%, transparent 100%)', opacity: 0.07 }}
                  initial={{ x: '-100%' }}
                  animate={{ x: '120%' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">RESUME</span>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
