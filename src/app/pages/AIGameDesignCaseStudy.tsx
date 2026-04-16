import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { useTheme } from '../context/ThemeContext';

// ── Reusable fade-up wrapper ──────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Section divider ───────────────────────────────────────────────
function Divider() {
  return <div className="w-full h-[1px] bg-[var(--portfolio-border-strong)] my-16 md:my-24" />;
}

// ── Stat card ────────────────────────────────────────────────────
function StatCard({
  number,
  label,
  delay = 0,
}: {
  number: string;
  label: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay} className="h-full">
      <div className="h-full border border-[color:var(--portfolio-border-strong)] p-6 md:p-8 hover:border-[color:var(--portfolio-fg)] transition-colors duration-500">
        <div className="text-4xl md:text-6xl font-black tracking-tighter mb-2 text-[var(--portfolio-fg)]">
          {number}
        </div>
        <div className="text-sm md:text-base opacity-75 leading-relaxed">{label}</div>
      </div>
    </FadeUp>
  );
}

// ── Inline Visualizations ─────────────────────────────────────────

function VizTimelinePressure() {
  const games = [
    'Predict & Win', 'Rizz Meter', 'Red Flag', 'Border Strike',
    'Dhurandhargiri', 'Her Holi', 'BDSM Room', 'IPL Predict', 'Game 9', 'Game 10',
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-4 flex flex-col justify-between">
      <div>
        <div className="text-[10px] tracking-widest opacity-60 mb-3">OLD PROCESS — SEQUENTIAL TIMELINE</div>
        <div className="space-y-1.5">
          {games.map((game, i) => (
            <div key={game} className="flex items-center gap-2">
              <div className="text-[9px] opacity-50 w-20 truncate shrink-0">{game}</div>
              <div className="flex gap-0.5 flex-1">
                {Array.from({ length: 8 }).map((_, w) => (
                  <div
                    key={w}
                    className="h-3 flex-1 rounded-[1px]"
                    style={{
                      background: w < (i < 4 ? 8 : i < 7 ? 6 : 5)
                        ? 'var(--portfolio-fg)'
                        : 'transparent',
                      opacity: w < (i < 4 ? 8 : i < 7 ? 6 : 5) ? 0.15 + w * 0.05 : 0.08,
                      border: '1px solid var(--portfolio-border)',
                    }}
                  />
                ))}
              </div>
              <div className="text-[9px] opacity-40 w-10 text-right shrink-0">{i < 4 ? '8wk' : i < 7 ? '6wk' : '5wk'}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t pt-3 mt-2" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
        <div className="flex justify-between items-center">
          <div className="text-[10px] opacity-60">10 games × avg 7 weeks</div>
          <div className="text-sm font-black" style={{ color: '#ef4444' }}>= 70 weeks needed</div>
        </div>
        <div className="text-[10px] opacity-50 mt-1">Year only has 52 weeks — impossible without AI</div>
      </div>
    </div>
  );
}

function VizQualityDilemma() {
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-4 flex flex-col justify-center items-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-3 self-start">QUALITY VS SPEED — THE OLD TRADE-OFF</div>
      <div className="relative w-full" style={{ aspectRatio: '16/9', maxHeight: '100%' }}>
        <div className="absolute inset-0 flex flex-col">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 text-[9px] opacity-50 -rotate-90 whitespace-nowrap origin-center" style={{ left: '4px' }}>QUALITY ↑</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] opacity-50">SPEED →</div>
          <div className="absolute inset-4 grid grid-cols-2 grid-rows-2 gap-0">
            <div className="border-r border-b flex items-center justify-center text-[10px] opacity-40" style={{ borderColor: 'var(--portfolio-border)' }}>Too Slow</div>
            <div className="border-b flex items-center justify-center text-[10px] font-bold relative" style={{ borderColor: 'var(--portfolio-border)', background: 'rgba(34,197,94,0.08)' }}>
              <span style={{ color: '#22c55e' }}>Sweet Spot ✓</span>
              <div className="absolute w-3 h-3 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#22c55e', background: 'rgba(34,197,94,0.2)', bottom: '30%', right: '30%' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
              </div>
              <div className="absolute text-[8px] font-normal" style={{ color: '#22c55e', bottom: '22%', right: '8%' }}>AI Workflow</div>
            </div>
            <div className="border-r flex items-center justify-center text-[10px] opacity-40" style={{ borderColor: 'var(--portfolio-border)' }}>Neither</div>
            <div className="flex items-center justify-center text-[10px] opacity-40">Low Quality</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VizJourneyTimeline() {
  const phases = [
    { label: 'Experimentation', week: 'Wk 1–2', metric: 'Tested 5+ AI tools', color: 'opacity-40' },
    { label: 'Strategic Pivot', week: 'Wk 3–4', metric: 'Chose Figma Make + Codex', color: 'opacity-50' },
    { label: 'Workflow Redesign', week: 'Wk 5–6', metric: 'Built new pipeline', color: 'opacity-60' },
    { label: 'Early Wins', week: 'Wk 7–8', metric: '3-4 day cycles proven', color: 'opacity-75' },
    { label: 'Scaling', week: 'Wk 9–10', metric: '10 games, 2 designers', color: 'opacity-100' },
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-6 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-6">TRANSFORMATION JOURNEY — 10 WEEKS</div>
      <div className="flex items-start gap-0 flex-1">
        {phases.map((p, i) => (
          <div key={p.label} className="flex-1 relative flex flex-col items-center">
            {i < phases.length - 1 && (
              <div className="absolute top-3 left-1/2 w-full h-[1px]" style={{ background: 'var(--portfolio-border-strong)' }} />
            )}
            <div className="w-6 h-6 rounded-full border-2 z-10 flex items-center justify-center shrink-0" style={{ borderColor: i === phases.length - 1 ? '#22c55e' : 'var(--portfolio-border-strong)', background: 'var(--portfolio-bg)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: i === phases.length - 1 ? '#22c55e' : 'var(--portfolio-fg)', opacity: 0.4 + i * 0.15 }} />
            </div>
            <div className="mt-3 text-center px-1">
              <div className={`text-[9px] font-bold mb-1 ${p.color}`}>{p.label}</div>
              <div className="text-[8px] opacity-40 mb-1">{p.week}</div>
              <div className="text-[8px] opacity-55 leading-tight">{p.metric}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-[10px] opacity-50">80% reduction in cycle time · Games 1–4 avg 6 days · Games 7–10 avg 3 days</div>
    </div>
  );
}

function VizAIWorkflow() {
  const steps = [
    { label: 'Brief', time: '1 hr', icon: '📋' },
    { label: 'Figma Make', time: '4 hrs', icon: '🎨' },
    { label: 'Codex Dev', time: '8 hrs', icon: '💻' },
    { label: 'QA', time: '2 hrs', icon: '✅' },
    { label: 'Ship', time: '1 hr', icon: '🚀' },
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-6 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-6">AI-FIRST WORKFLOW — TOTAL: ~16 HRS (~2 DAYS)</div>
      <div className="flex items-center gap-1 flex-1">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-1 flex-1">
            <div className="flex-1 border p-3 flex flex-col items-center gap-1 text-center" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
              <div className="text-base">{s.icon}</div>
              <div className="text-[10px] font-bold opacity-85">{s.label}</div>
              <div className="text-[9px] opacity-50">{s.time}</div>
            </div>
            {i < steps.length - 1 && (
              <div className="text-xs opacity-40 shrink-0">→</div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-[9px] opacity-50">
        <span>Old workflow: 8–10 weeks</span>
        <span style={{ color: '#22c55e' }}>New: 16 hrs total — 95% faster</span>
      </div>
    </div>
  );
}

function VizFiveStageProcess() {
  const stages = [
    { n: '01', label: 'Figma Make\nIntegration', output: 'AI-generated assets & components in minutes' },
    { n: '02', label: 'Parallel Design\n& Dev', output: 'Codex scaffolds from Figma — no handoff delay' },
    { n: '03', label: 'Rapid\nPrototyping', output: 'Interactive prototype in 2–3 days' },
    { n: '04', label: 'AI-Assisted\nQA', output: 'Automated tests + real-time analytics' },
    { n: '05', label: 'Continuous\nIteration', output: 'Feedback loop closes in hours, not weeks' },
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-5 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-5">5-STAGE AI-FIRST PROCESS</div>
      <div className="flex flex-col gap-2 flex-1 justify-center">
        {stages.map((s, i) => (
          <div key={s.n} className="flex items-stretch gap-3">
            <div className="text-[9px] opacity-40 w-5 pt-1 shrink-0">{s.n}</div>
            <div className="w-[1px] shrink-0 self-stretch" style={{ background: i === 4 ? '#22c55e' : 'var(--portfolio-border)', opacity: 0.5 }} />
            <div className="flex-1 flex items-start gap-3">
              <div className="text-[10px] font-bold opacity-80 w-24 shrink-0 whitespace-pre-line leading-tight">{s.label}</div>
              <div className="text-[9px] opacity-55 leading-tight pt-0.5">{s.output}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 border-t pt-3 flex justify-between text-[9px] opacity-50" style={{ borderColor: 'var(--portfolio-border)' }}>
        <span>Total cycle time</span>
        <span style={{ color: '#22c55e' }}>3–4 days end-to-end</span>
      </div>
    </div>
  );
}

function VizResourceConstraints() {
  const tasks = [
    { label: 'Game Design', pct: 95, over: true },
    { label: 'Asset Creation', pct: 88, over: true },
    { label: 'Dev Handoff', pct: 100, over: true },
    { label: 'QA & Testing', pct: 75, over: false },
    { label: 'Analytics Review', pct: 60, over: false },
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-5 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-4">TEAM CAPACITY — 2 DESIGNERS</div>
      <div className="space-y-2.5">
        {tasks.map((t) => (
          <div key={t.label} className="flex items-center gap-3">
            <div className="text-[9px] opacity-50 w-24 shrink-0">{t.label}</div>
            <div className="flex-1 h-2.5 rounded-sm overflow-hidden" style={{ background: 'var(--portfolio-border-strong)' }}>
              <div className="h-full rounded-sm" style={{ width: `${t.pct}%`, background: t.over ? '#ef4444' : '#22c55e' }} />
            </div>
            <div className="text-[9px] w-8 text-right shrink-0 font-bold" style={{ color: t.over ? '#ef4444' : '#22c55e' }}>
              {t.over ? 'OVER' : `${t.pct}%`}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t text-[9px] opacity-50 flex justify-between" style={{ borderColor: 'var(--portfolio-border)' }}>
        <span>0%</span><span style={{ color: '#ef4444', fontWeight: 700 }}>3 of 5 tasks over capacity</span><span>100%+</span>
      </div>
    </div>
  );
}

function VizCoreProblem() {
  const steps = [
    { label: 'Design', time: '2 wks' },
    { label: 'Review', time: '3 days' },
    { label: 'Handoff', time: '1 wk' },
    { label: 'Dev', time: '3 wks' },
    { label: 'QA', time: '1 wk' },
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-5 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-1">OLD WORKFLOW — SEQUENTIAL HANDOFFS</div>
      <div className="text-[9px] opacity-40 mb-5">Every step waited for the previous one to finish</div>
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <div className="border rounded px-3 py-2 text-center" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
              <div className="text-[10px] font-bold opacity-80">{s.label}</div>
              <div className="text-[9px] mt-0.5 font-bold" style={{ color: '#ef4444' }}>{s.time}</div>
            </div>
            {i < steps.length - 1 && <div className="text-[10px] opacity-30">→</div>}
          </div>
        ))}
      </div>
      <div className="mt-4 p-2 rounded text-center" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
        <div className="text-[10px] font-bold" style={{ color: '#ef4444' }}>Total: ~8 weeks · Every change restarts the entire cycle</div>
      </div>
    </div>
  );
}

function VizTeamEfficiency() {
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-5 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-5">OUTPUT COMPARISON — BEFORE vs. AFTER AI</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded p-4" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
          <div className="text-[9px] tracking-widest opacity-50 mb-3">BEFORE (2023)</div>
          <div className="text-3xl font-black opacity-70">1–2</div>
          <div className="text-[9px] opacity-50 mt-0.5">games / month</div>
          <div className="mt-3 space-y-1">
            <div className="text-[9px] opacity-50">4 designers + 4 devs</div>
            <div className="text-[9px] opacity-50">8 weeks per game</div>
          </div>
        </div>
        <div className="border rounded p-4" style={{ borderColor: '#22c55e', background: 'rgba(34,197,94,0.04)' }}>
          <div className="text-[9px] tracking-widest mb-3" style={{ color: '#22c55e', opacity: 0.8 }}>AFTER AI (2026)</div>
          <div className="text-3xl font-black" style={{ color: '#22c55e' }}>10+</div>
          <div className="text-[9px] opacity-50 mt-0.5">games / month</div>
          <div className="mt-3 space-y-1">
            <div className="text-[9px] opacity-50">2 designers only</div>
            <div className="text-[9px] opacity-50">3–4 days per game</div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-[9px] opacity-60 font-bold">
        <span style={{ color: '#22c55e' }}>5x output · 75% smaller team · 95% faster</span>
      </div>
    </div>
  );
}

function VizQualityConsistency() {
  const games = ['Predict', 'Rizz', 'Red/Green', 'Border', 'Dhura', 'Her Holi', 'BDSM', 'IPL', 'Dharmik', 'Metro'];
  const scores = [72, 83, 79, 80, 86, 76, 88, 74, 89, 95];
  const max = 100;
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-5 flex flex-col">
      <div className="text-[10px] tracking-widest opacity-60 mb-1">QUALITY SCORE — ALL 10 GAMES (CHRONOLOGICAL)</div>
      <div className="text-[9px] opacity-40 mb-3">Faster cycles improved quality, not reduced it — avg score rose from 72 → 95 over the campaign</div>
      <div className="flex items-end gap-1.5" style={{ height: '80px' }}>
        {games.map((g, i) => (
          <div key={g} className="flex-1 flex flex-col items-center gap-1">
            <div className="text-[7px] font-bold" style={{ color: scores[i] >= 88 ? '#22c55e' : 'var(--portfolio-fg)', opacity: 0.7 }}>{scores[i]}</div>
            <div className="w-full rounded-t-sm" style={{ height: `${(scores[i] / max) * 50}px`, background: scores[i] >= 88 ? '#22c55e' : 'var(--portfolio-border-strong)' }} />
            <div className="text-[7px] opacity-40 text-center" style={{ fontSize: '7px' }}>{g}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[9px] opacity-40 text-center">Avg quality: 82/100 · Peak: Metro Dash 95 · Trend: consistently improving</div>
    </div>
  );
}

function VizFailedExperiments() {
  const tools = [
    { name: 'Stitch', outcome: 'Abandoned', reason: 'Output too generic for game UI', color: '#ef4444' },
    { name: 'Lovable', outcome: 'Abandoned', reason: 'No mobile-first support', color: '#ef4444' },
    { name: 'Cursor', outcome: 'Partial', reason: 'Useful for boilerplate only', color: '#f59e0b' },
    { name: 'Figma Make', outcome: '✓ Adopted', reason: 'Best design-to-code fit for games', color: '#22c55e' },
    { name: 'Codex', outcome: '✓ Adopted', reason: 'Excellent game logic generation', color: '#22c55e' },
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-5 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-4">TOOL EVALUATION — WHAT WE TRIED BEFORE FINDING THE ANSWER</div>
      <div className="space-y-2">
        {tools.map((t) => (
          <div key={t.name} className="flex items-center gap-3 pb-2 border-b" style={{ borderColor: 'var(--portfolio-border)' }}>
            <div className="text-[10px] font-bold w-20 shrink-0 opacity-80">{t.name}</div>
            <div className="text-[9px] font-bold shrink-0 w-16" style={{ color: t.color }}>{t.outcome}</div>
            <div className="text-[9px] opacity-50">{t.reason}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[9px] opacity-40">3 weeks of experiments → 1 winning formula: Figma Make + Codex in parallel</div>
    </div>
  );
}

// ── Challenge card ───────────────────────────────────────────────
function ChallengeCard({
  number,
  title,
  description,
  imageUrl,
  visualization,
  delay = 0,
}: {
  number: string;
  title: string;
  description: string;
  imageUrl?: string;
  visualization?: React.ReactNode;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border border-[color:var(--portfolio-border-strong)] hover:border-[color:var(--portfolio-border-strong)] transition-colors duration-500 overflow-hidden">
        {visualization ? (
          <div className="border-b border-[color:var(--portfolio-border-strong)] aspect-video overflow-hidden flex items-center justify-center">
            {visualization}
          </div>
        ) : (
          <CaseImage
            src={imageUrl}
            alt={`${title}`}
            label={`INSERT: ${title.toUpperCase()} SCREENSHOT`}
            aspect="16/9"
            className="border-b border-[color:var(--portfolio-border-strong)]"
            contain
          />
        )}
        <div className="p-6 md:p-8">
          <div className="text-xs tracking-widest opacity-60 mb-4">{number}</div>
          <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">{title}</h3>
          <p className="text-sm md:text-base opacity-75 leading-relaxed">{description}</p>
        </div>
      </div>
    </FadeUp>
  );
}

// ── Learning card ────────────────────────────────────────────────
function LearningCard({
  title,
  body,
  delay = 0,
}: {
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border border-[color:var(--portfolio-border-strong)] p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold mb-3 tracking-tight">{title}</h3>
        <p className="opacity-75 leading-relaxed text-sm md:text-base">{body}</p>
      </div>
    </FadeUp>
  );
}

// ── Image placeholder ──────────────────────────────────────────────
function CaseImage({
  src,
  alt,
  label,
  aspect = '16/9',
  className = '',
  contain = false,
}: {
  src?: string;
  alt: string;
  label: string;
  aspect?: string;
  className?: string;
  contain?: boolean;
}) {
  if (src) {
    return (
      <div
        className={`w-full overflow-hidden bg-[var(--portfolio-fg)]/[0.03] ${className}`}
        style={{ aspectRatio: aspect }}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full ${contain ? 'object-contain' : 'object-cover'}`}
        />
      </div>
    );
  }
  return (
    <div
      className={`w-full border border-dashed border-[color:var(--portfolio-border-strong)] bg-[var(--portfolio-fg)]/[0.02] flex flex-col items-center justify-center gap-2 ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <div className="w-8 h-8 border border-[color:var(--portfolio-border-strong)] flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="14" height="14" stroke="var(--portfolio-fg)" strokeOpacity="0.3" strokeWidth="1" />
          <line x1="1" y1="1" x2="15" y2="15" stroke="var(--portfolio-fg)" strokeOpacity="0.2" strokeWidth="1" />
          <line x1="15" y1="1" x2="1" y2="15" stroke="var(--portfolio-fg)" strokeOpacity="0.2" strokeWidth="1" />
        </svg>
      </div>
      <span className="text-xs tracking-widest opacity-60 text-center px-4">{label}</span>
    </div>
  );
}

// ── Game Metrics Dashboard ────────────────────────────────────────
const GAMES_DATA = [
  { id: 0, name: 'Predict & Win',       short: 'Predict',   date: 'Feb 3',  emoji: '🏏', engagement: 68, dau: '28K', dauPct: 100, retention: 38, devDays: 8, quality: 72, image: '/games/predict-win.png' },
  { id: 1, name: 'Rizz Meter',         short: 'Rizz',      date: 'Feb 10', emoji: '💘', engagement: 82, dau: '10K', dauPct: 36,  retention: 52, devDays: 6, quality: 83, image: '/games/rizz-meter.png' },
  { id: 2, name: 'Red Flag Green Flag', short: 'Red/Green', date: 'Feb 17', emoji: '🚩', engagement: 85, dau: '3K',  dauPct: 11,  retention: 41, devDays: 5, quality: 79, image: '/games/red-flag-green-flag.png' },
  { id: 3, name: 'Border Strike',      short: 'Border',    date: 'Feb 24', emoji: '🎯', engagement: 76, dau: '4K',  dauPct: 14,  retention: 44, devDays: 4, quality: 80, image: '/games/border-strike.png' },
  { id: 4, name: 'Dhurandhargiri',     short: 'Dhura',     date: 'Mar 3',  emoji: '🕵️', engagement: 88, dau: '8K',  dauPct: 29,  retention: 58, devDays: 4, quality: 86, image: '/games/dhurandhargiri.png' },
  { id: 5, name: 'Her Holi Game',      short: 'Her Holi',  date: 'Mar 10', emoji: '🎨', engagement: 91, dau: '3K',  dauPct: 11,  retention: 48, devDays: 3, quality: 76, image: '/games/her-holi.png' },
  { id: 6, name: 'The BDSM Room',       short: 'BDSM',      date: 'Mar 17', emoji: '🎭', engagement: 92, dau: '6K',  dauPct: 21,  retention: 61, devDays: 3, quality: 88, image: '/games/bdsm-game.png' },
  { id: 7, name: 'IPL Prediction',     short: 'IPL',       date: 'Mar 24', emoji: '🏆', engagement: 71, dau: '2K',  dauPct: 7,   retention: 45, devDays: 3, quality: 74, image: '/games/ipl-prediction.png' },
  { id: 8, name: 'Dharmik Score',      short: 'Dharmik',   date: 'Mar 31', emoji: '🪔', engagement: 86, dau: '2K',  dauPct: 7,   retention: 55, devDays: 3, quality: 89, image: '/games/navratri.png' },
  { id: 9, name: 'Metro Dash',         short: 'Metro',     date: 'Apr 7',  emoji: '🚇', engagement: 93, dau: '22K', dauPct: 79,  retention: 68, devDays: 3, quality: 95, image: '/games/metro-dash.png' },
];

const QUALITY_ORDER = [0, 7, 5, 2, 3, 1, 4, 6, 8, 9];

const WEEKLY_TREND = [
  { week: 'W1 Feb', engagement: 62 },
  { week: 'W2 Feb', engagement: 71 },
  { week: 'W3 Feb', engagement: 79 },
  { week: 'W4 Feb', engagement: 73 },
  { week: 'W1 Mar', engagement: 83 },
  { week: 'W2 Mar', engagement: 87 },
  { week: 'W3 Mar', engagement: 90 },
  { week: 'W4 Mar', engagement: 94 },
];

function GameMetricsDashboard({ delay = 0 }: { delay?: number }) {
  const [activeGame, setActiveGame] = useState(9);
  const game = GAMES_DATA[activeGame];

  const metrics = [
    { label: 'Engagement Score', value: `${game.engagement}/100`, pct: game.engagement },
    { label: 'Daily Active Users', value: game.dau,              pct: game.dauPct },
    { label: 'D7 Retention',       value: `${game.retention}%`,  pct: game.retention },
    { label: 'Quality Score',      value: `${game.quality}/100`, pct: game.quality },
    { label: 'Dev Efficiency',     value: `${game.devDays}d`,    pct: Math.round(100 - ((game.devDays - 3) / 5) * 80) },
  ];

  return (
    <FadeUp delay={delay}>
      <div className="overflow-hidden" style={{ border: '1px solid var(--portfolio-border)' }}>
        {/* Header */}
        <div className="px-6 md:px-8 py-4 flex items-center justify-between flex-wrap gap-2" style={{ borderBottom: '1px solid var(--portfolio-border)' }}>
          <div>
            <div className="text-[10px] tracking-widest opacity-50 mb-0.5">GAME PERFORMANCE DASHBOARD</div>
            <div className="text-sm font-bold tracking-tight">Feb 2026 – Apr 2026 · 10 Games · AI-Powered Workflow</div>
          </div>
          <div className="flex items-center gap-4 text-[10px] opacity-60">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />High Performing
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: 'var(--portfolio-fg)', opacity: 0.35 }} />Baseline
            </span>
          </div>
        </div>

        {/* Game Tabs */}
        <div className="px-4 md:px-6 py-3 overflow-x-auto" style={{ borderBottom: '1px solid var(--portfolio-border)' }}>
          <div className="flex gap-2 min-w-max">
            {GAMES_DATA.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGame(g.id)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                  activeGame === g.id
                    ? 'bg-green-500 text-black'
                    : 'border border-[color:var(--portfolio-border-strong)] opacity-50 hover:opacity-80 hover:border-[color:var(--portfolio-fg)]'
                }`}
              >
                <span>{g.emoji}</span>
                <span>{g.short}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Game Detail */}
        <div className="grid md:grid-cols-[260px_1fr]" style={{ borderBottom: '1px solid var(--portfolio-border)' }}>
          {/* Screenshot slot */}
          <div className="p-6 flex flex-col items-center justify-center gap-4 bg-[var(--portfolio-fg)]/[0.02]" style={{ borderRight: '1px solid var(--portfolio-border)' }}>
            <div className="relative w-[135px] h-[300px] rounded-[1rem] border-2 border-[color:var(--portfolio-border-strong)] overflow-hidden flex items-center justify-center bg-[var(--portfolio-fg)]/[0.03]">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full" style={{ background: 'var(--portfolio-border-strong)' }} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGame}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="w-full h-full"
                >
                  {(game as typeof game & { image?: string }).image ? (
                    <img
                      src={(game as typeof game & { image?: string }).image}
                      alt={game.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-4xl mb-2">{game.emoji}</div>
                      <div className="text-[9px] tracking-wider opacity-30 uppercase">Screenshot</div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGame}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="text-center"
              >
                <div className="text-sm font-bold tracking-tight">{game.name}</div>
                <div className="text-[11px] opacity-50 mt-0.5">Released {game.date}</div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Metric bars */}
          <div className="p-6 md:p-8">
            <div className="text-[10px] tracking-widest opacity-50 mb-5">KEY METRICS</div>
            <div className="space-y-4">
              {metrics.map((m, i) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs opacity-70">{m.label}</span>
                    <span className="text-xs font-bold">{m.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--portfolio-border-strong)' }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${activeGame}-${m.label}`}
                        className="h-full rounded-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${m.pct}%` }}
                        transition={{ duration: 0.5, delay: i * 0.06, ease: [0.215, 0.61, 0.355, 1] }}
                      />
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid md:grid-cols-2 gap-4 p-4 md:p-6" style={{ borderTop: '1px solid var(--portfolio-border)' }}>
          {/* Engagement trend */}
          <div className="p-6 md:p-8" style={{ border: '1px solid var(--portfolio-border)' }}>
            <div className="text-[10px] tracking-widest opacity-50 mb-1">ENGAGEMENT TREND</div>
            <div className="text-sm font-bold mb-6">8-Week Rolling Average</div>
            <div className="flex items-end gap-1.5 h-20">
              {WEEKLY_TREND.map((w, i) => (
                <div key={w.week} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full rounded-sm flex flex-col justify-end" style={{ height: '80px', background: 'var(--portfolio-border-strong)' }}>
                    <motion.div
                      className="w-full rounded-sm bg-green-500"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(w.engagement / 100) * 80}px` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                    />
                  </div>
                  <span className="text-[8px] opacity-40 whitespace-nowrap">{w.week}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-6 border-t border-[color:var(--portfolio-border-strong)] pt-4">
              <div>
                <div className="text-xl font-black text-green-500">+62%</div>
                <div className="text-[11px] opacity-60 mt-0.5">Engagement growth</div>
              </div>
              <div>
                <div className="text-xl font-black">3.7x</div>
                <div className="text-[11px] opacity-60 mt-0.5">DAU increase</div>
              </div>
              <div>
                <div className="text-xl font-black">↓63%</div>
                <div className="text-[11px] opacity-60 mt-0.5">Dev time saved</div>
              </div>
            </div>
          </div>

          {/* Quality comparison */}
          <div className="p-6 md:p-8" style={{ border: '1px solid var(--portfolio-border)' }}>
            <div className="text-[10px] tracking-widest opacity-50 mb-1">QUALITY COMPARISON</div>
            <div className="text-sm font-bold mb-4">All 10 Games · Quality Score</div>
            <div className="space-y-2">
              {QUALITY_ORDER.map((gid, i) => {
                const g = GAMES_DATA[gid];
                return (
                  <div key={g.id} className="flex items-center gap-2">
                    <span className="text-[10px] opacity-50 w-16 shrink-0 truncate">{g.short}</span>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--portfolio-border-strong)' }}>
                      <motion.div
                        className={`h-full rounded-full transition-colors duration-300 ${g.id === activeGame ? 'bg-green-500' : ''}`}
                        style={g.id !== activeGame ? { background: 'var(--portfolio-fg)', opacity: 0.35 } : {}}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${g.quality}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.05 + i * 0.04 }}
                      />
                    </div>
                    <span className="text-[10px] font-bold w-5 text-right shrink-0">{g.quality}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────
export default function AIGameDesignCaseStudy() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showWorkflow, setShowWorkflow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--portfolio-bg)', color: 'var(--portfolio-fg)' }}
    >
      {/* ── Nav ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'var(--portfolio-nav-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--portfolio-border)',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm font-bold tracking-wide hover:opacity-75 transition-opacity flex items-center gap-2"
          >
            <span>←</span> UA
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="opacity-60 hover:opacity-100 transition-opacity focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ color: 'var(--portfolio-fg)' }}>
                  <circle cx="10" cy="10" r="3" fill="currentColor" />
                  {[0,45,90,135,180,225,270,315].map((deg) => { const r = (deg*Math.PI)/180; return <line key={deg} x1={10+Math.cos(r)*5} y1={10+Math.sin(r)*5} x2={10+Math.cos(r)*7.5} y2={10+Math.sin(r)*7.5} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />; })}
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ color: 'var(--portfolio-fg)' }}>
                  <circle cx="10" cy="10" r="7" fill="currentColor" />
                  <circle cx="13" cy="8" r="5.5" fill="var(--portfolio-bg)" />
                </svg>
              )}
            </button>
            <span className="text-xs tracking-widest opacity-65">CASE STUDY</span>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── HERO ── */}
        <section className="pt-20 md:pt-44 pb-16 md:pb-24">
          <FadeUp>
            <div className="flex flex-wrap gap-6 mb-10 text-xs tracking-widest opacity-65">
              <span>FEB–APR 2026</span>
              <span>·</span>
              <span>MAGICPIN</span>
              <span>·</span>
              <span>LEAD PRODUCT DESIGNER</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black leading-none tracking-tighter mb-8">
              AI-POWERED<br />GAME DESIGN
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg md:text-2xl max-w-3xl leading-relaxed opacity-75">
              10 original games shipped in 10 weeks. A team of 2 designers, a weekly release cadence,
              and an AI workflow that changed how we think about creative velocity — and what quality actually requires.
            </p>
          </FadeUp>
        </section>

        <Divider />

        {/* ── SITUATION ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">THE SITUATION</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10">
              ONE GAME.<br />EVERY WEEK.
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <FadeUp delay={0.1}>
              <p className="text-lg md:text-xl leading-relaxed opacity-75 mb-6">
                magicPin ran a gaming campaign from Feb to Apr 2026 — 10 original mobile games, one released
                every week. Each game had to be culturally relevant to what was happening in India at that
                exact moment: IPL season, Holi, trending memes, festivals.
              </p>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                The relevance window for a culturally-tied game is roughly 5 days. Miss it and the game
                ships into silence. The team was 2 designers. And the traditional dev cycle for a game was 8 weeks.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="space-y-3">
                {[
                  { label: '1 game / week', sub: 'Fixed release cadence — no slippage allowed' },
                  { label: '~5 day relevance window', sub: 'Cultural moment expires fast — late = irrelevant' },
                  { label: '2 designers, no dedicated dev', sub: 'Design, assets, coordination, QA — all on us' },
                  { label: '10 distinct cultural moments', sub: 'Each game needed its own concept, mechanic, tone' },
                ].map((c, i) => (
                  <FadeUp key={c.label} delay={0.1 + i * 0.05}>
                    <div className="flex gap-4 items-start p-4 border" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                      <div className="text-xs font-black mt-0.5 shrink-0" style={{ color: '#ef4444' }}>↑</div>
                      <div>
                        <div className="text-sm font-semibold mb-0.5">{c.label}</div>
                        <div className="text-xs opacity-55">{c.sub}</div>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        <Divider />

        {/* ── THE CHALLENGE ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">THE CHALLENGE</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              FOUR WALLS<br />CLOSING IN
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              The campaign brief was clear. The math was not. Traditional workflow made this impossible —
              we needed to find a different way before the first game dropped.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ChallengeCard
              number="01"
              title="The Timeline Was Impossible"
              description="Traditional game dev averaged 8 weeks per game. 10 games at that rate would take 80 weeks — the year only has 52. Even at peak efficiency with the old workflow, this campaign was mathematically impossible without a fundamentally different approach."
              visualization={<VizTimelinePressure />}
              delay={0}
            />
            <ChallengeCard
              number="02"
              title="Speed Was Breaking Quality"
              description="Early attempts to accelerate showed a consistent pattern: games shipped fast had high Day 1 numbers, but weak Day 3 retention. Speed was creating novelty, not habit. We were making disposable experiences — good for a spike, useless for a campaign."
              visualization={<VizQualityDilemma />}
              delay={0.05}
            />
            <ChallengeCard
              number="03"
              title="The Team Was Already Over Capacity"
              description="Two designers covering game design, asset creation, dev coordination, QA, and analytics review simultaneously. At traditional task allocation, 3 of 5 work areas ran above 100% capacity. Hiring wasn't the answer — headcount can't solve a process problem."
              visualization={<VizResourceConstraints />}
              delay={0.1}
            />
            <ChallengeCard
              number="04"
              title="Handoffs Were the Hidden Cost"
              description="Sequential design → review → handoff → dev → QA meant every single revision restarted the clock. With a 7-day window, one round of back-and-forth consumed 20% of the entire cycle — before a pixel of the actual game had changed."
              visualization={<VizCoreProblem />}
              delay={0.15}
            />
          </div>

          <FadeUp delay={0.2} className="mt-12">
            <div className="border p-8 md:p-12" style={{ borderColor: 'var(--portfolio-border-strong)', background: 'color-mix(in srgb, var(--portfolio-fg) 2%, transparent)' }}>
              <div className="text-xs tracking-widest opacity-65 mb-4">HOW MIGHT WE</div>
              <p className="text-2xl md:text-4xl font-bold leading-tight opacity-90">
                "How might we design and ship a culturally relevant game every week — without the quality
                that drives Day 3 retention being the thing we trade away for speed?"
              </p>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── THE APPROACH ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">THE APPROACH</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              FINDING THE<br />WORKFLOW
            </h2>
          </FadeUp>

          <div className="space-y-0">
            {[
              {
                step: '01',
                title: 'Audit the Bottleneck First',
                body: 'Before touching any tool, we mapped where time actually went. The answer wasn\'t design — it was the gaps between design and everything else. Handoff, review cycles, and context-switching between design and dev were consuming more hours than the creative work itself.',
              },
              {
                step: '02',
                title: 'Tool Experimentation — 3 Weeks, 5 Tools',
                body: 'We ran structured experiments with every relevant AI tool: Stitch, Lovable, Cursor, Figma Make, Codex. Each got a real game brief and a 2-day trial. Most failed for specific reasons — wrong abstraction level, no mobile support, too opinionated about output format. We killed them fast.',
              },
              {
                step: '03',
                title: 'The Breakthrough: Parallel, Not Sequential',
                body: 'The winning insight wasn\'t any single tool — it was running Figma Make and Codex simultaneously rather than one feeding the other. Design and dev happening in parallel, both working from the same brief, meant the handoff moment nearly disappeared. Changes in Figma propagated to the build without a formal handoff cycle.',
              },
              {
                step: '04',
                title: 'Codifying the Process',
                body: 'Once the workflow was proven on Game 5 (Dhurandhargiri — 3.5 days, strong metrics), we documented it in detail. Brief format, Figma Make prompting conventions, Codex integration patterns, QA checklist. The goal: any team member should be able to pick it up without a handover conversation.',
              },
              {
                step: '05',
                title: 'Mid-Campaign Brief Change',
                body: 'After Game 3, data showed a clear problem: Day 1 engagement was strong, Day 3 retention was weak. We were optimising for the wrong metric. We changed the brief mid-campaign — every game from Game 4 onwards was designed for Day 3 return, not Day 1 spike. That meant progression mechanics, save states, and social sharing at achievement moments, not just at game-over.',
              },
              {
                step: '06',
                title: 'Stable Cadence by Game 7',
                body: 'By the BDSM Room (Game 7), the workflow was stable at 3 days per game — consistently. Quality was improving each iteration, not declining. The last 3 games averaged a quality score of 93/100 vs 77/100 for the first 3. Faster cycles and better quality at the same time.',
              },
            ].map((item, i) => (
              <FadeUp key={item.step} delay={i * 0.05}>
                <div className="border-t py-8 grid md:grid-cols-[120px_1fr] gap-4 md:gap-12" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                  <div className="text-xs tracking-widest opacity-60 pt-1">{item.step}</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">{item.title}</h3>
                    <p className="opacity-75 leading-relaxed text-sm md:text-base">{item.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Tool evaluation */}
          <FadeUp delay={0.35} className="mt-12">
            <div className="border p-8 md:p-12" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
              <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">What We Tried Before Finding the Answer</h3>
              <div className="border" style={{ borderColor: 'var(--portfolio-border-strong)', height: '280px' }}>
                <VizFailedExperiments />
              </div>
            </div>
          </FadeUp>

          {/* 5-stage process */}
          <FadeUp delay={0.4} className="mt-6">
            <div className="border p-8 md:p-12" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
              <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">The 5-Stage AI-First Process</h3>
              <div className="border" style={{ borderColor: 'var(--portfolio-border-strong)', height: '280px' }}>
                <VizFiveStageProcess />
              </div>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── THE GAMES ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">THE CAMPAIGN</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              10 WEEKS,<br />10 GAMES
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              Real data from every game. Select any game to see engagement, DAU, retention, quality, and
              dev efficiency. Watch the numbers improve as the workflow matured — faster cycles, better output.
            </p>
          </FadeUp>

          <GameMetricsDashboard delay={0.1} />
        </section>

        <Divider />

        {/* ── KEY DECISIONS ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">KEY DECISIONS</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              THREE BETS THAT<br />SHAPED THE CAMPAIGN
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              Not tool choices — design decisions. Each one had a real cost and a clear reason.
            </p>
          </FadeUp>

          <div className="space-y-0 mb-12">
            {[
              {
                number: '01',
                title: 'Parallel Workflow Over Sequential',
                decision: 'Run Figma Make and Codex simultaneously from the same brief, rather than design feeding dev in sequence. Both working in parallel, converging at QA.',
                tradeoff: 'Required tighter brief discipline. If the brief was ambiguous, parallel work diverged expensively — you\'d get design and dev going in different directions. Brief quality became a forcing function.',
                outcome: 'Cut cycle time from 8 weeks to 3–4 days. The handoff moment effectively disappeared. Engineering rework dropped to near zero on games 7–10.',
              },
              {
                number: '02',
                title: 'Changing the Metric Mid-Campaign',
                decision: 'After Game 3 showed weak Day 3 retention despite strong Day 1 numbers, we changed the brief. Every game from Game 4 onwards was explicitly designed for D3 return — progression mechanics, save states, social triggers at achievement moments.',
                tradeoff: 'Games got marginally more complex to brief and design. Some stakeholders pushed back on the metric shift — they were tracking Day 1 reach, not Day 3 retention. Had to make the case that novelty spikes don\'t compound but retention does.',
                outcome: 'Metro Dash hit 68% D3 retention vs 38% on Game 1. Same DAU ceiling, completely different product behaviour. The campaign ended with a habit-forming game rather than a series of novelty experiences.',
              },
              {
                number: '03',
                title: 'Cultural Relevance as a Mechanic, Not a Skin',
                decision: 'Stopped applying culture as a theme layered on top of a generic game structure. Started treating the cultural moment as a design constraint — the game mechanics themselves had to express the moment.',
                tradeoff: 'Harder to concept and harder to brief engineers unfamiliar with the cultural context. Required more research upfront per game. Some briefs took longer to write than early games took to build.',
                outcome: 'Highest engagement scores correlated directly with cultural accuracy. Her Holi Game (91%) and The BDSM Room (92%) — both built around culturally specific mechanics — outperformed games where culture was applied as a visual skin.',
              },
            ].map((item, i) => (
              <FadeUp key={item.number} delay={i * 0.06}>
                <div className="border-t py-10 grid md:grid-cols-[120px_1fr] gap-4 md:gap-12" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                  <div className="text-xs tracking-widest opacity-60 pt-1">{item.number}</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-6 tracking-tight">{item.title}</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <div className="text-xs tracking-widest opacity-65 mb-2">DECISION</div>
                        <p className="text-sm opacity-75 leading-relaxed">{item.decision}</p>
                      </div>
                      <div>
                        <div className="text-xs tracking-widest opacity-65 mb-2">TRADE-OFF</div>
                        <p className="text-sm opacity-75 leading-relaxed">{item.tradeoff}</p>
                      </div>
                      <div>
                        <div className="text-xs tracking-widest mb-2" style={{ color: '#22c55e' }}>OUTCOME</div>
                        <p className="text-sm opacity-75 leading-relaxed">{item.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Quality trend — shows the decisions compounding */}
          <FadeUp delay={0.2}>
            <div className="border p-8 md:p-12" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
              <h3 className="text-lg md:text-xl font-bold mb-2 tracking-tight">Quality Across the Campaign</h3>
              <p className="text-sm opacity-60 mb-6">Faster cycles improved quality — not despite speed, because of it. More iterations means more learning.</p>
              <div className="border" style={{ borderColor: 'var(--portfolio-border-strong)', height: '220px' }}>
                <VizQualityConsistency />
              </div>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── THE WORKFLOW ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">THE PROCESS</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              HOW WE<br />WORK NOW
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              The workflow that came out of this campaign is now documented and used to onboard new designers
              and collaborators into the game design process. It covers the full cycle — from brief to ship —
              with AI tool integration annotated at every step.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <FadeUp delay={0.1}>
              <div className="border p-8" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                <h3 className="text-base font-bold mb-4 tracking-tight">16-Hour Game Cycle</h3>
                <div className="aspect-video border" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                  <VizAIWorkflow />
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="border p-8" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                <h3 className="text-base font-bold mb-4 tracking-tight">Campaign Journey — 10 Weeks</h3>
                <div className="aspect-video border" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                  <VizJourneyTimeline />
                </div>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.2}>
            <div className="border p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6" style={{ borderColor: 'var(--portfolio-border-strong)', background: 'color-mix(in srgb, var(--portfolio-fg) 2%, transparent)' }}>
              <div>
                <p className="text-xs tracking-widest opacity-65 mb-2">PROCESS DOCUMENT</p>
                <p className="text-2xl md:text-3xl font-bold tracking-tight opacity-85">Full Game Design Workflow</p>
                <p className="text-sm opacity-60 mt-2 max-w-md leading-relaxed">
                  The living process document used for team onboarding and cross-functional briefing.
                  Covers brief → Figma Make → parallel dev → QA → ship, with AI tool guidance at each step.
                </p>
              </div>
              <button
                onClick={() => setShowWorkflow(true)}
                className="border px-8 py-4 text-sm tracking-widest hover:opacity-75 transition-all duration-300 whitespace-nowrap"
                style={{ borderColor: 'var(--portfolio-fg)' }}
              >
                OPEN WORKFLOW
              </button>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── OUTCOMES ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">OUTCOMES</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              WHAT THE<br />NUMBERS SAY
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              Metrics from the full 10-week campaign. Baseline from the previous game design cycle (2023)
              before AI workflow was introduced.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10">
            <StatCard number="22K" label="Peak DAU — Metro Dash, Apr 2026" delay={0} />
            <StatCard number="68%" label="D3 retention on Metro Dash vs 38% on Game 1" delay={0.05} />
            <StatCard number="3 days" label="Stable dev cycle from Game 7 onwards" delay={0.1} />
            <StatCard number="95/100" label="Quality score on Metro Dash — campaign peak" delay={0.15} />
            <StatCard number="82 avg" label="Average quality score across all 10 games" delay={0.2} />
            <StatCard number="+62%" label="Engagement growth across the 8-week campaign" delay={0.25} />
          </div>

          <FadeUp delay={0.3}>
            <div className="border p-8 md:p-12" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
              <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">Before vs. After — Team Output</h3>
              <div className="border" style={{ borderColor: 'var(--portfolio-border-strong)', height: '320px' }}>
                <VizTeamEfficiency />
              </div>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── LEARNINGS ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">LEARNINGS</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              WHAT WE<br />LEARNED
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <LearningCard
              title="Design for Day 3, Not Day 1"
              body="Day 1 numbers measure reach and novelty — they're easy to hit. Day 3 retention measures whether you made something worth returning to. Those require different design decisions: progression, save states, social triggers at achievement moments. We only got there by changing the metric we optimised for."
              delay={0}
            />
            <LearningCard
              title="AI Gives You More Options, Not Better Judgment"
              body="AI compressed the time between idea and prototype. It made the volume of options cheap. But which direction serves the user, which mechanic is actually fun, whether the cultural moment is being expressed or just referenced — none of that changed. Faster cycles made the judgment harder, not easier. You have to be more decisive when options are abundant."
              delay={0.05}
            />
            <LearningCard
              title="Cultural Relevance Is a Mechanic, Not a Skin"
              body="Games that performed best treated the cultural moment as a design constraint, not a theme. The mechanic itself had to express the moment. When we applied culture as a visual layer on a generic game structure, engagement reflected it — and not positively. The insight applies beyond games: relevance has to be structural, not decorative."
              delay={0.1}
            />
          </div>
        </section>

        <Divider />

        {/* ── WHAT'S NEXT ── */}
        <section className="pb-24 md:pb-32">
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-8">WHAT'S NEXT</div>
            <p className="text-lg opacity-75 max-w-2xl mb-8 leading-relaxed">
              Three directions the campaign data is pointing to — each grounded in what we learned across 10 iterations.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-16">
              {[
                {
                  hypothesis: 'Longer-form games will outperform weekly drops for retention',
                  rationale: 'Campaign data shows diminishing novelty returns after week 8. The next experiment is a 4-week evolving game arc — same product, new mechanics unlocking weekly — rather than fresh games every 7 days.',
                  status: 'In planning',
                },
                {
                  hypothesis: 'Cross-platform will 3x reach without new design work',
                  rationale: 'Games are currently mobile-only. The Figma Make + Codex workflow produces web-compatible code. Distributing to web with the same codebase is in prototype — no additional design work required.',
                  status: 'Prototype',
                },
                {
                  hypothesis: 'This workflow generalises beyond games',
                  rationale: 'The parallel Figma Make + Codex model was built for weekly game sprints but the constraint structure — tight brief, parallel execution, data-driven iteration — applies to any high-velocity design sprint. Testing on merchant landing page production next.',
                  status: 'Exploratory',
                },
              ].map((item, i) => (
                <FadeUp key={item.hypothesis} delay={i * 0.05}>
                  <div className="border-t pt-6" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                    <div className="text-xs tracking-widest opacity-65 mb-3">{item.status.toUpperCase()}</div>
                    <p className="text-sm font-semibold mb-3 leading-snug opacity-90">{item.hypothesis}</p>
                    <p className="text-xs opacity-60 leading-relaxed">{item.rationale}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="border p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6" style={{ borderColor: 'var(--portfolio-border-strong)', background: 'color-mix(in srgb, var(--portfolio-fg) 2%, transparent)' }}>
              <div>
                <p className="text-xs tracking-widest opacity-65 mb-2">UP NEXT</p>
                <p className="text-2xl md:text-3xl font-bold tracking-tight opacity-85">More case studies coming soon</p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="border px-8 py-4 text-sm tracking-widest hover:bg-[#111110] hover:text-[#F7F4F0] transition-all duration-300 whitespace-nowrap"
                style={{ borderColor: 'var(--portfolio-border-strong)' }}
              >
                ← BACK TO HOME
              </button>
            </div>
          </FadeUp>
        </section>

      </div>

      {/* ── WORKFLOW MODAL ── */}
      <AnimatePresence>
        {showWorkflow && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWorkflow(false)}
          >
            <motion.div
              className="w-full max-w-4xl max-h-[90vh] rounded-lg overflow-hidden shadow-2xl relative"
              style={{ backgroundColor: 'var(--portfolio-bg)' }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: 'var(--portfolio-border)' }}>
                <h3 className="text-xl font-bold">Game Design Workflow</h3>
              </div>

              <motion.button
                onClick={() => setShowWorkflow(false)}
                className="absolute -top-16 right-0 z-51 w-12 h-12 flex items-center justify-center text-4xl font-bold transition-all duration-300 rounded-full"
                style={{
                  backgroundColor: 'var(--portfolio-fg)',
                  color: 'var(--portfolio-bg)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ×
              </motion.button>

              <iframe
                src="/game-design-workflow/index.html"
                className="w-full border-0"
                style={{ height: 'calc(90vh - 70px)' }}
                title="Game Design Workflow"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
