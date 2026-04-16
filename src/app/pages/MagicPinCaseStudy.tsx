import { useEffect } from 'react';
import { motion } from 'motion/react';
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

// ── Impact metrics visualization ───────────────────────────────
function ImpactMetricsDisplay({
  delay = 0,
}: {
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border p-6 md:p-8" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
        <h3 className="text-lg md:text-xl font-bold mb-8 tracking-tight">Impact Distribution Across Metrics</h3>
        <div className="space-y-6">
          {[
            { label: 'AOV Increase', value: 32, unit: '%' },
            { label: 'Category Selection', value: 80, unit: '%' },
            { label: 'Personalized Conversion', value: 65, unit: '%' },
            { label: 'Onboarding', value: 50, unit: '%' },
            { label: 'DAU Growth', value: 30, unit: '%' },
            { label: 'Retention', value: 12, unit: '%' },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-sm font-bold text-green-500">+{item.value}{item.unit}</span>
              </div>
              <motion.div
                className="h-2 rounded-full"
                style={{ background: 'var(--portfolio-border-strong)' }}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.05 }}
              >
                <div className="h-full rounded-full bg-green-500" style={{ width: `${(item.value / 80) * 100}%` }} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeUp>
  );
}

// ── Section divider ───────────────────────────────────────────────
function Divider() {
  return <div className="w-full h-[1px] my-16 md:my-24" style={{ background: 'var(--portfolio-border-strong)' }} />;
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
      <div className="h-full border p-6 md:p-8 transition-colors duration-500" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
        <div className="text-4xl md:text-6xl font-black tracking-tighter mb-2 text-[var(--portfolio-fg)]">
          {number}
        </div>
        <div className="text-sm md:text-base opacity-75 leading-relaxed">{label}</div>
      </div>
    </FadeUp>
  );
}

// ── Problem card ─────────────────────────────────────────────────
function ProblemCard({
  number,
  title,
  sample,
  impact,
  imageUrl,
  delay = 0,
}: {
  number: string;
  title: string;
  sample: string;
  impact: string;
  imageUrl?: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border transition-colors duration-500 overflow-hidden" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
        {/* Screenshot evidence */}
        <CaseImage
          src={imageUrl}
          alt={`Problem ${number}: ${title}`}
          label={`BEFORE — ${title.toUpperCase()}`}
          aspect="3/2"
          className="border-b"
          contain
        />
        <div className="p-6 md:p-8">
          <div className="text-xs tracking-widest opacity-60 mb-4">{number}</div>
          <h3 className="text-xl md:text-2xl font-bold mb-6 tracking-tight">{title}</h3>
          <div className="space-y-4">
            <div>
              <div className="text-xs tracking-widest opacity-65 mb-2">SAMPLE</div>
              <p className="text-sm md:text-base opacity-75 leading-relaxed">{sample}</p>
            </div>
            <div className="w-full h-[1px]" style={{ background: 'var(--portfolio-border-strong)' }} />
            <div>
              <div className="text-xs tracking-widest opacity-65 mb-2">IMPACT</div>
              <p className="text-sm md:text-base opacity-75 leading-relaxed">{impact}</p>
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

// ── Archetype card ───────────────────────────────────────────────
function ArchetypeCard({
  name,
  description,
  todo,
  insight,
  delay = 0,
}: {
  name: string;
  description: string;
  todo: string;
  insight?: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border-t pt-8" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
        <div className="text-xs tracking-widest opacity-60 mb-3">USER ARCHETYPE</div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{name}</h3>
        <p className="opacity-75 leading-relaxed mb-6 text-sm md:text-base">{description}</p>
        <div className="p-4 border-l-2 mb-4" style={{ background: 'color-mix(in srgb, var(--portfolio-fg) 4%, transparent)', borderColor: 'var(--portfolio-border-strong)' }}>
          <div className="text-xs tracking-widest opacity-65 mb-2">JOB TO BE DONE</div>
          <p className="text-sm opacity-75 leading-relaxed italic">"{todo}"</p>
        </div>
        {insight && (
          <div className="text-xs opacity-60 leading-relaxed border-t pt-4" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
            <span className="tracking-widest opacity-80">KEY INSIGHT — </span>{insight}
          </div>
        )}
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
      <div className="border p-6 md:p-8" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
        <h3 className="text-lg md:text-xl font-bold mb-3 tracking-tight">{title}</h3>
        <p className="opacity-75 leading-relaxed text-sm md:text-base">{body}</p>
      </div>
    </FadeUp>
  );
}

// ── Inline Visualizations ────────────────────────────────────────

function VizPhasedMetrics() {
  const phases = [
    {
      label: 'Phase 1', subtitle: 'Foundation', period: 'Q1 2023',
      metrics: ['+12% AOV', '+20% Onboarding', '+8% Retention'],
      barPct: 35, color: 'var(--portfolio-fg)',
    },
    {
      label: 'Phase 2', subtitle: 'Personalization', period: 'Q2–Q3 2023',
      metrics: ['+22% AOV', '+50% DAU', '+45% Category selection'],
      barPct: 65, color: '#f59e0b',
    },
    {
      label: 'Phase 3', subtitle: 'Discovery', period: 'Q4 2023–Q1 2024',
      metrics: ['+32% AOV', '+65% Conversion', '+30% DAU'],
      barPct: 100, color: '#22c55e',
    },
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-6 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-6">PHASED IMPACT — AOV GROWTH ACROSS ROLLOUT</div>
      <div className="grid grid-cols-3 gap-4">
        {phases.map((p) => (
          <div key={p.label} className="border rounded p-4" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
            <div className="text-[8px] tracking-widest opacity-50 mb-1">{p.period}</div>
            <div className="text-[10px] font-black opacity-80">{p.label}</div>
            <div className="text-[9px] opacity-60 mb-3">{p.subtitle}</div>
            <div className="h-1.5 rounded-sm overflow-hidden mb-3" style={{ background: 'var(--portfolio-border-strong)' }}>
              <div className="h-full rounded-sm" style={{ width: `${p.barPct}%`, background: p.color, opacity: p.color.includes('var') ? 0.5 : 1 }} />
            </div>
            <div className="space-y-1">
              {p.metrics.map((m) => (
                <div key={m} className="text-[8px] opacity-70 flex items-center gap-1">
                  <span style={{ color: '#22c55e' }}>+</span>{m.replace('+', '')}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-[9px] opacity-40 text-center">Each phase built on the previous · Metrics compounded over 4 quarters · Baseline: Q4 2022</div>
    </div>
  );
}

function VizDesignProcess() {
  const steps = [
    { label: 'Design Sprint', duration: '2 weeks', output: 'Problem definition + HMW reframes' },
    { label: 'Behavioral Analysis', duration: '1 week', output: 'Session funnel + drop-off mapping' },
    { label: 'User Flows', duration: '1 week', output: 'End-to-end journeys, jobs-to-be-done' },
    { label: 'Sketching & Ideation', duration: '1 week', output: 'Low-fi concepts × 20+, 3 directions shortlisted' },
    { label: 'Early Design + Iteration', duration: 'Ongoing', output: 'Mid-fi → hi-fi, 3+ rounds per feature' },
    { label: 'Usability Testing', duration: '1 week', output: '10+ in-house user sessions per phase' },
    { label: 'Phased Release', duration: '4 quarters', output: 'Staged rollout — 1 key metric per phase' },
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-6 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-5">DESIGN METHODOLOGY — END-TO-END PROCESS</div>
      <div className="flex flex-col gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-start gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-5 h-5 rounded-full border flex items-center justify-center text-[7px] font-bold shrink-0" style={{ borderColor: i === steps.length - 1 ? '#22c55e' : 'var(--portfolio-border-strong)', color: i === steps.length - 1 ? '#22c55e' : undefined }}>
                {i + 1}
              </div>
              {i < steps.length - 1 && <div className="w-px flex-1 min-h-3" style={{ background: 'var(--portfolio-border)' }} />}
            </div>
            <div className="flex-1 pb-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-bold opacity-80">{s.label}</span>
                <span className="text-[8px] opacity-40">{s.duration}</span>
              </div>
              <div className="text-[8px] opacity-50 mt-0.5">{s.output}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VizComponentLibrary() {
  const typeScale = ['H1 / 48px Bold', 'H2 / 36px Bold', 'Body / 16px Regular', 'Caption / 12px Regular'];
  const colors = [
    { name: 'Primary', hex: '#FF5733' },
    { name: 'Secondary', hex: '#FF8C42' },
    { name: 'Neutral', hex: '#6B7280' },
    { name: 'Success', hex: '#22c55e' },
  ];
  const states = ['Default', 'Hover', 'Active', 'Disabled'];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-6 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-5">magicDS — COMPONENT LIBRARY OVERVIEW · 150+ COMPONENTS</div>
      <div className="grid grid-cols-3 gap-6">
        <div>
          <div className="text-[9px] tracking-widest opacity-50 mb-3">TYPE SCALE</div>
          <div className="space-y-2">
            {typeScale.map((t, i) => (
              <div key={t} className="flex items-center gap-2">
                <div className="shrink-0" style={{ fontSize: `${14 - i * 2}px`, fontWeight: i < 2 ? 700 : 400, opacity: 0.8 }}>{t.split(' / ')[0]}</div>
                <div className="text-[7px] opacity-40">{t.split(' / ')[1]}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[9px] tracking-widest opacity-50 mb-3">COLOR PALETTE</div>
          <div className="space-y-2">
            {colors.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-sm shrink-0" style={{ background: c.hex }} />
                <div className="text-[9px] opacity-70">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[9px] tracking-widest opacity-50 mb-3">BUTTON STATES</div>
          <div className="space-y-1.5">
            {states.map((s, i) => (
              <div key={s} className="border rounded px-2 py-1 text-center text-[8px]" style={{ borderColor: 'var(--portfolio-border-strong)', opacity: i === 3 ? 0.3 : 1, background: i === 2 ? 'var(--portfolio-border-strong)' : undefined }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
        {[['150+', 'Components'], ['40%', 'Faster handoff'], ['4→2', 'Review rounds']].map(([v, l]) => (
          <div key={l} className="text-center">
            <div className="text-[14px] font-black opacity-80" style={{ color: '#22c55e' }}>{v}</div>
            <div className="text-[8px] opacity-50 mt-0.5">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VizBeforeAfterScreens() {
  const screens = [
    { name: 'Shop Page', before: 'Generic feed, no personalization, avg 3.2s to first relevant item', after: 'Personalized sections, avg 0.8s to relevant item, +32% AOV' },
    { name: 'Offers Tab', before: '"Redeem" tab — category-first navigation, high bounce', after: 'Discovery-first — proximity + behaviour sort, +65% CVR' },
    { name: 'Merchant Page', before: 'Two separate pages for vouchers vs. ordering — user confusion', after: 'Unified page, scalable to all transaction types, +25% voucher use' },
    { name: 'Transaction History', before: 'Table view, no savings context, low engagement', after: 'Timeline view with cumulative savings, bookmarks, rewards' },
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-6 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-4">CORE SCREEN REDESIGNS — BEFORE vs. AFTER</div>
      <div className="grid grid-cols-2 gap-3">
        {screens.map((s) => (
          <div key={s.name} className="border rounded p-3" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
            <div className="text-[9px] font-bold mb-2 opacity-80">{s.name}</div>
            <div className="flex gap-2">
              <div className="flex-1 p-2 rounded-sm" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                <div className="text-[7px] tracking-widest mb-1" style={{ color: '#ef4444', opacity: 0.7 }}>BEFORE</div>
                <div className="text-[8px] opacity-60 leading-tight">{s.before}</div>
              </div>
              <div className="flex-1 p-2 rounded-sm" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <div className="text-[7px] tracking-widest mb-1" style={{ color: '#22c55e', opacity: 0.8 }}>AFTER</div>
                <div className="text-[8px] opacity-70 leading-tight">{s.after}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Image placeholder (swap src="" with actual path when ready) ──
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
        className={`w-full overflow-hidden ${className}`}
        style={{ aspectRatio: aspect, background: 'color-mix(in srgb, var(--portfolio-fg) 3%, transparent)' }}
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
      className={`w-full flex flex-col items-center justify-center gap-3 p-6 ${className}`}
      style={{ aspectRatio: aspect, border: '1px dashed var(--portfolio-border-strong)', background: 'color-mix(in srgb, var(--portfolio-fg) 2%, transparent)' }}
    >
      <div className="w-8 h-8 border flex items-center justify-center" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="14" height="14" stroke="var(--portfolio-fg)" strokeOpacity="0.3" strokeWidth="1" />
          <line x1="1" y1="1" x2="15" y2="15" stroke="var(--portfolio-fg)" strokeOpacity="0.2" strokeWidth="1" />
          <line x1="15" y1="1" x2="1" y2="15" stroke="var(--portfolio-fg)" strokeOpacity="0.2" strokeWidth="1" />
        </svg>
      </div>
      <span className="text-xs tracking-widest opacity-60 text-center max-w-sm leading-relaxed">{label}</span>
    </div>
  );
}

// Image sources — drop exported files into public/case-studies/magicpin/
// and uncomment each line. Export nodes from Figma file eOlrNDmrH4DhyApKv9f3mD
const IMG: Record<string, string | undefined> = {
  heroFinalDesigns: '/magicpin-revamp-hero.png',
  problem1:         undefined, // Figma node 47:1263 → Show cluttered home feed with non-relevant cross-sells highlighted
  problem2:         undefined, // Figma node 47:4485 → Show Earn tab with multiple conflicting CTAs
  problem3:         undefined, // Figma node 47:5287 → Show old voucher flow with generic code strings
  problem4:         undefined, // Figma node 47:6088 → Show inconsistent component usage across 2 screens side by side
  impact:           undefined, // Figma node 48:6957 → Summary dashboard view
  hmw:              undefined, // Figma node 47:6888 → HMW board from sprint
};

// ── MAIN PAGE ────────────────────────────────────────────────────
export default function MagicPinCaseStudy() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
              <span>JAN 2022 — PRESENT</span>
              <span>·</span>
              <span>ANDROID & iOS</span>
              <span>·</span>
              <span>SENIOR PRODUCT DESIGNER</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black leading-none tracking-tighter mb-8">
              MAGICPIN<br />APP REVAMP
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg md:text-2xl max-w-3xl leading-relaxed opacity-75">
              The largest UX overhaul in magicPin's history — redesigning the full ordering, discovery,
              and savings experience for millions of Indian users across a hyperlocal marketplace.
            </p>
          </FadeUp>
        </section>

        {/* ── HERO IMAGE — Final designs: 4-phone mockup ── */}
        <FadeUp>
          <CaseImage
            src={IMG.heroFinalDesigns}
            alt="magicPin App Revamp — Final Designs"
            label="FINAL DESIGNS — 4 phone mockups (export from Figma node 82:2537)"
            aspect="16/7"
            className="mb-6"
            contain
          />
        </FadeUp>

        <Divider />

        {/* ── SITUATION ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">THE SITUATION</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10">
              WHY THIS,<br />WHY NOW
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <FadeUp delay={0.1}>
              <p className="text-lg md:text-xl leading-relaxed opacity-75 mb-6">
                By 2021, magicPin's app had seen minimal UX changes since its founding in 2015. The navigation model,
                information architecture, and interaction patterns were unchanged — despite the product growing
                to cover food ordering, vouchers, events, and merchant discovery.
              </p>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                Session frequency data showed D3 churn increasing quarter-over-quarter. Category selection
                at launch — a proxy for navigation confidence — was declining. Users were landing on the app
                and not knowing where to go.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="space-y-4">
                {[
                  { signal: 'D3 churn increasing QoQ', context: 'Users not returning after first session' },
                  { signal: '↓ Category selection at launch', context: 'Navigation confidence declining' },
                  { signal: 'Multiple competing CTAs per flow', context: 'No clear path to conversion' },
                  { signal: '7 years without IA restructure', context: 'Product had outgrown its architecture' },
                ].map((s, i) => (
                  <FadeUp key={s.signal} delay={0.1 + i * 0.05}>
                    <div className="flex gap-4 items-start p-4 border" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                      <div className="text-xs font-bold mt-0.5" style={{ color: '#ef4444' }}>↑</div>
                      <div>
                        <div className="text-sm font-semibold mb-1">{s.signal}</div>
                        <div className="text-xs opacity-60">{s.context}</div>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* VIZ SLOT — Business situation trend chart */}
          <FadeUp delay={0.35}>
            <div className="border p-8 md:p-12" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
              <h3 className="text-lg md:text-xl font-bold mb-3 tracking-tight">Session Health Signals (Pre-Revamp)</h3>
              <div className="aspect-video flex flex-col items-center justify-center gap-3 p-6" style={{ border: '1px dashed var(--portfolio-border-strong)', background: 'color-mix(in srgb, var(--portfolio-fg) 2%, transparent)' }}>
                <div className="text-xs tracking-widest opacity-60">VIZ SLOT — SESSION HEALTH TREND CHART</div>
                <p className="text-[11px] opacity-50 text-center max-w-md leading-relaxed">
                  Line chart showing 6 quarters of data: D3 retention rate declining, category selection rate at launch declining,
                  session frequency flat. Annotate the "trigger point" (Q3 2021) when the decision to revamp was made.
                  Source: internal analytics dashboard — pull from product data.
                </p>
              </div>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── CONTEXT ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">CONTEXT</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10">
              WHAT IS<br />MAGICPIN?
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-12">
            <FadeUp delay={0.1}>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                magicPin is a customer-centric hyperlocal marketplace connecting retailers to customers
                in a way that revolutionises commerce and helps consumers save — across food, fashion,
                beauty, groceries, and events in their neighbourhood.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                I joined as Senior Product Designer in Jan 2022 and led design across this revamp from
                inception through phased rollout — collaborating with 3 product designers, 2 PMs, and
                engineering teams across Android and iOS.
              </p>
            </FadeUp>
          </div>
        </section>

        <Divider />

        {/* ── PROBLEM ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">THE PROBLEM</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              FOUR PROBLEMS<br />HOLDING BACK GROWTH.
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              We started with a structured audit of the existing app — behavioural data, support tickets,
              and heuristic evaluation. These four patterns showed up repeatedly.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ProblemCard
              number="01"
              title="No Relevancy"
              sample="The app showed non-veg items as cross-sell even to users who had only ever ordered veg. Every session felt like it was designed for someone else."
              impact="Irrelevant content directly reduced conversion. Users left faster, spent less, and didn't come back."
              imageUrl={IMG.problem1}
              delay={0}
            />
            <ProblemCard
              number="02"
              title="No Defined Journey"
              sample="Multiple CTAs existed for a single action. Users could trigger an Earn transaction in 4 different ways — none clearly primary."
              impact="Without a clear journey, users got lost. The app was building confusion instead of habit."
              imageUrl={IMG.problem2}
              delay={0.05}
            />
            <ProblemCard
              number="03"
              title="Weak Brand Perception"
              sample="Voucher codes like 'ZXCVBNMASDF' — no brand voice, no visual hierarchy, no emotional connection at moments that mattered most."
              impact="A product without a strong brand is just a utility. Trust and desirability both suffered."
              imageUrl={IMG.problem3}
              delay={0.1}
            />
            <ProblemCard
              number="04"
              title="Inconsistent Experience"
              sample="Design components looked different across pages. When one broke, it caused misbehaviour across the entire app — no shared foundation."
              impact="Without a mature design system, the team was always building on shaky ground."
              imageUrl={IMG.problem4}
              delay={0.15}
            />
          </div>

          {/* HMW */}
          <FadeUp delay={0.2} className="mt-12">
            <div className="border p-8 md:p-12" style={{ borderColor: 'var(--portfolio-border-strong)', background: 'color-mix(in srgb, var(--portfolio-fg) 2%, transparent)' }}>
              <div className="text-xs tracking-widest opacity-65 mb-4">HOW MIGHT WE</div>
              <p className="text-2xl md:text-4xl font-bold leading-tight opacity-90">
                "How might we redesign the discovery and ordering experience so that users find personally
                relevant content within seconds of opening the app — and feel compelled to come back within 3 days?"
              </p>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── GOALS ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">GOALS</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              WHAT SUCCESS<br />LOOKED LIKE
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Increase Retention',
                body: 'Optimise new user onboarding and make the journey smooth enough to drive repeat transactions — measured on D3 and D7 retention.',
                metric: 'D3 retention +12%',
              },
              {
                title: 'Surface Relevant Content',
                body: 'Work with analytics and engineering to build a recommendation engine on top of past purchase behaviour, activities, and location data.',
                metric: 'Category selection +80%',
              },
              {
                title: 'Consistent Experience',
                body: 'Build a mature design system to reduce technical debt and deliver a unified experience across every touchpoint in the app.',
                metric: 'DS components: 150+',
              },
              {
                title: 'Strengthen Value Proposition',
                body: 'Go beyond transactional savings. Build a discovery-led habit — so users open magicPin to explore, not just to redeem.',
                metric: 'Personalized CVR +65%',
              },
              {
                title: 'Operational Efficiency',
                body: 'Build scalable design components so the ops team could create collection pages and campaigns without custom design per instance.',
                metric: 'Handoff rounds: 4→2',
              },
            ].map((goal, i) => (
              <FadeUp key={goal.title} delay={i * 0.05}>
                <div className="border-t pt-6 pb-2" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight">{goal.title}</h3>
                    <span className="text-xs tracking-widest shrink-0 mt-1" style={{ color: '#22c55e' }}>{goal.metric}</span>
                  </div>
                  <p className="opacity-75 leading-relaxed text-sm md:text-base">{goal.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── RESEARCH ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">RESEARCH</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              WHO WE<br />DESIGNED FOR
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-4 leading-relaxed">
              We ran 12 user interviews, 6 intercept sessions at merchant locations, and analysed 2M+ sessions
              of existing behavioural data before writing a single design requirement.
            </p>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              The biggest reframe from research: <strong className="opacity-100 text-[var(--portfolio-fg)]">users weren't failing to transact — they were failing to discover.</strong> The drop-off happened before any purchase intent, not at checkout.
            </p>
          </FadeUp>

          {/* VIZ SLOT — Discovery funnel */}
          <FadeUp delay={0.1} className="mb-12">
            <div className="border p-8 md:p-12" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
              <h3 className="text-lg md:text-xl font-bold mb-3 tracking-tight">Where Users Were Dropping Off</h3>
              <div className="aspect-video flex flex-col items-center justify-center gap-3 p-6" style={{ border: '1px dashed var(--portfolio-border-strong)', background: 'color-mix(in srgb, var(--portfolio-fg) 2%, transparent)' }}>
                <div className="text-xs tracking-widest opacity-60">VIZ SLOT — USER FUNNEL: DISCOVERY TO TRANSACTION</div>
                <p className="text-[11px] opacity-50 text-center max-w-md leading-relaxed">
                  Funnel chart: App Open → Category Selection → Item View → Cart/Intent → Transaction.
                  Show the ~50% drop-off at "Category Selection" step vs. the ~15% drop-off at "Intent → Transaction."
                  This should visually prove the "discovery problem, not a checkout problem" insight.
                  Pull from Q3 2022 session data.
                </p>
              </div>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-0 md:gap-8">
            <ArchetypeCard
              name="The Daily Diner"
              description="An early adopter seeking convenience. A power magicPay user who values instant cash savings when going out."
              todo="During my visit to restaurants and cafes with my friends, I want to pay through my mobile while I save extra on every deal."
              insight="Opens app with intent — needs speed. Personalisation must cut time-to-relevant-merchant by 70%."
              delay={0}
            />
            <ArchetypeCard
              name="The Picky Saver"
              description="A habitual magicPin voucher user who spends more time looking for a deal than doing the actual shopping."
              todo="When she wants to go shopping, she spends more time browsing offers than the actual purchase — and often abandons without converting."
              insight="Browsing is the behaviour. Collections and discovery-first surfaces are the unlock — not faster checkout."
              delay={0.1}
            />
            <ArchetypeCard
              name="The Experimental Foodie"
              description="More spontaneous and open to trying new places. Discovery is the whole point — she opens the app to be surprised."
              todo="When she doesn't know what to eat, she likes to browse new restaurants and dishes to experience something different."
              insight="Editorial surfaces, location-aware recommendations, and social signals (reviews, trends) are her triggers."
              delay={0.2}
            />
          </div>
        </section>

        <Divider />

        {/* ── DESIGN PRINCIPLES ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">DESIGN PRINCIPLES</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              THE THREE BETS<br />WE MADE
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              Before touching screens, we aligned the team on three design principles that would govern
              every decision — from IA restructure to microinteraction choices.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                number: '01',
                title: 'Discovery Before Transaction',
                body: 'Surface personally relevant content before asking users to act. A user who finds what they want in under 10 seconds will transact — we don\'t need to optimise the checkout.',
                implication: 'Implication: Home feed is a discovery engine, not a menu.',
              },
              {
                number: '02',
                title: 'Confidence Over Completeness',
                body: 'Show less, show it well. Irrelevant content destroys trust faster than missing content. A curated, personalised surface beats an exhaustive one.',
                implication: 'Implication: Relevance scoring gates what surfaces — not category breadth.',
              },
              {
                number: '03',
                title: 'System First, Screen Second',
                body: 'Every component must work alone and in composition. A design system built alongside the revamp — not after — is the only way to ship at this scale without accumulating debt.',
                implication: 'Implication: No custom one-off components. Every new pattern enters the DS.',
              },
            ].map((p, i) => (
              <FadeUp key={p.number} delay={i * 0.08}>
                <div className="border p-6 md:p-8 h-full" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                  <div className="text-xs tracking-widest opacity-50 mb-4">{p.number}</div>
                  <h3 className="text-xl font-bold mb-4 tracking-tight">{p.title}</h3>
                  <p className="opacity-75 leading-relaxed text-sm mb-6">{p.body}</p>
                  <div className="border-t pt-4" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                    <p className="text-xs opacity-60 leading-relaxed italic">{p.implication}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── PROCESS ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">PROCESS</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              HOW WE<br />GOT THERE
            </h2>
          </FadeUp>

          <div className="space-y-0">
            {[
              {
                step: '01',
                title: 'Design Sprints',
                body: 'Ran cross-functional design sprints with product designers, PMs, creatives, and engineering leads. The goal was to align everyone on the problem — not the solution — before any screen was drawn. We ran 3 sprints: one for IA restructure, one for the Shop Page, one for the Design System scope.',
              },
              {
                step: '02',
                title: 'Behavioural Analysis + User Flows',
                body: 'Mapped drop-off points using session data before mapping any new user journey. Every flow started with the user\'s job-to-be-done, not the app\'s existing navigation. Core journeys redesigned: discovery → save → transact → return.',
              },
              {
                step: '03',
                title: 'Sketching & Ideation',
                body: 'Sketched 3 distinct directions for every major surface — Shop Page, Merchant Page, and Deals Tab. The brief was to make them genuinely different, not variations. This surfaced trade-offs that would have been invisible if we\'d jumped straight to hi-fi.',
              },
              {
                step: '04',
                title: 'Iteration Under Constraint',
                body: 'Multiple rounds of mid-fi and hi-fi across 18+ months. The pandemic shifted user behaviour mid-project; a new product (Magic9) was introduced mid-stream. We tracked every design change against the original principles to avoid scope drift.',
              },
              {
                step: '05',
                title: 'Usability Testing',
                body: 'Validated designs with real users — in-house and over video calls. 10+ users per round in a structured protocol. We ran separate sessions for the Shop Page redesign, Offers Tab navigation, and onboarding flow — not a single "all-at-once" test.',
              },
              {
                step: '06',
                title: 'Phased Releases',
                body: 'Proposed and designed the phasing strategy — each phase owned one key metric. Phase 1: onboarding + retention foundation. Phase 2: personalisation engine + Shop Page. Phase 3: discovery + Offers Tab restructure. This also meant engineering could validate at each step rather than big-bang regression.',
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

          {/* Design Process Visualization */}
          <FadeUp delay={0.35} className="mt-12">
            <div className="border p-8 md:p-12" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
              <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">Design Methodology Overview</h3>
              <div className="aspect-video border" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                <VizDesignProcess />
              </div>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── DESIGN SYSTEM ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">DESIGN SYSTEM</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              INTRODUCING<br />MAGICDS
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <FadeUp delay={0.1}>
              <p className="text-lg md:text-xl leading-relaxed opacity-75 mb-6">
                magicDS (magic Design System) was built in parallel with the revamp — not before, not after.
                That was a deliberate trade-off: slower start, but no design debt accumulation during the rollout.
              </p>
              <p className="text-lg md:text-xl leading-relaxed opacity-75 mb-6">
                The system now consists of <strong className="text-[var(--portfolio-fg)] opacity-100">150+ components</strong> with
                defined typography, iconography, and colour tokens. Every screen in the app is composed from
                these building blocks — the only exceptions require DS team approval.
              </p>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                We ran weekly DS review sessions where any team could request new components or pattern changes.
                Engineering reported a <strong className="text-[var(--portfolio-fg)] opacity-100">40% reduction in component implementation time</strong> by Q3 2023,
                and average design-to-dev feedback rounds dropped from 4 to 2.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="space-y-3">
                {[
                  { label: 'Components', value: '150+', note: 'Covering all app surfaces' },
                  { label: 'Design-to-dev rounds', value: '4 → 2', note: 'Average per feature, post-DS' },
                  { label: 'Implementation time', value: '−40%', note: 'Engineering self-report, Q3 2023' },
                  { label: 'Weekly DS reviews', value: 'Ongoing', note: 'Cross-team governance model' },
                  { label: 'Custom one-offs', value: '0', note: 'Every pattern enters the system' },
                ].map((item, i) => (
                  <FadeUp key={item.label} delay={0.1 + i * 0.04}>
                    <div className="flex items-center gap-4 p-4 border" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                      <div className="text-lg font-black min-w-[80px]" style={{ color: '#22c55e' }}>{item.value}</div>
                      <div>
                        <div className="text-sm font-semibold">{item.label}</div>
                        <div className="text-xs opacity-55">{item.note}</div>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Design System Components Showcase */}
          <FadeUp delay={0.3}>
            <div className="border p-8 md:p-12" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
              <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">magicDS Component Library</h3>
              <div className="aspect-video border" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                <VizComponentLibrary />
              </div>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── KEY DESIGN DECISIONS ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">KEY DESIGN DECISIONS</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              THREE DECISIONS<br />THAT SHAPED THE OUTCOME
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              Not design choices — design bets. Each one had a real cost and a real reason.
            </p>
          </FadeUp>

          {/* Final designs showcase */}
          <FadeUp delay={0.05} className="mb-12">
            <CaseImage
              src={IMG.heroFinalDesigns}
              alt="magicPin final designs — Shop, Magic9, Deals, Merchant pages"
              label="FINAL DESIGNS — Personalised Shop Page · Magic9 · Offers Tab · Merchant Page (export from Figma node 82:2537)"
              aspect="16/7"
              contain
            />
          </FadeUp>

          {/* Three deep decisions */}
          <div className="space-y-0 mb-12">
            {[
              {
                number: '01',
                title: 'The Shop Page Direction',
                decision: 'We explored 3 directions: editorial-led (curated by ops), algorithm-led (fully personalised), and a hybrid (algorithmic feed with editorial anchor sections). We chose hybrid.',
                tradeoff: 'Pure algorithm felt soulless and was hard to QA. Pure editorial didn\'t scale — ops couldn\'t curate millions of users\' feeds. Hybrid gave us personalisation while keeping the product team in control of key surface moments.',
                outcome: 'The Shop Page drove +32% AOV and +65% conversion on personalised widgets. The editorial anchors (e.g. "Near You", "Based on Your Orders") gave users a navigation framework they could trust.',
              },
              {
                number: '02',
                title: 'Building the Design System Mid-Project',
                decision: 'Engineering wanted to freeze designs for the first phase and build the DS later. We proposed building it in parallel and using a "debt register" to track any one-off patterns created during the sprint.',
                tradeoff: 'Risk: slower early-phase velocity, potential inconsistency during the build. Payoff: no accumulation of UI debt that would block future phases. The debt register made trade-offs visible and created accountability without blocking delivery.',
                outcome: 'By Phase 2, the DS was mature enough that the Shop Page redesign took 40% less time than Phase 1 equivalents. No major rework was needed to retrofit Phase 1 components.',
              },
              {
                number: '03',
                title: 'Unifying the Merchant Page',
                decision: 'The existing app had two separate pages for vouchers and product ordering on the same merchant — users had to know which to visit. We designed a single scalable Merchant Page that handled all transaction types.',
                tradeoff: 'Complexity risk: one page for all flows could become overwhelming. We validated with 3 rounds of usability testing, iterating the information hierarchy until the right transaction type surfaced automatically based on user context.',
                outcome: '+25% voucher redemptions. Reduced support tickets related to "I can\'t find the ordering option" by a measurable margin in the quarter post-launch.',
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

          {/* Core Screen Redesigns visualization */}
          <FadeUp delay={0.1}>
            <div className="border p-8 md:p-12" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
              <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">Core Screen Redesigns</h3>
              <div className="aspect-video border" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                <VizBeforeAfterScreens />
              </div>
            </div>
          </FadeUp>

          {/* VIZ SLOT — Individual screen deep-dives */}
          <FadeUp delay={0.15} className="mt-6">
            <div className="border p-8 md:p-12" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
              <h3 className="text-lg md:text-xl font-bold mb-3 tracking-tight">Screen-by-Screen Design Walkthroughs</h3>
              <div className="aspect-video flex flex-col items-center justify-center gap-3 p-6" style={{ border: '1px dashed var(--portfolio-border-strong)', background: 'color-mix(in srgb, var(--portfolio-fg) 2%, transparent)' }}>
                <div className="text-xs tracking-widest opacity-60">VIZ SLOT — ANNOTATED SCREEN DESIGNS</div>
                <p className="text-[11px] opacity-50 text-center max-w-lg leading-relaxed">
                  4-panel layout showing: (1) Shop Page final design with annotations on personalization zones,
                  (2) Offers Tab before/after IA restructure, (3) Unified Merchant Page with transaction type
                  logic annotated, (4) Magic9 module. Export from Figma node 82:2537 or create a dedicated
                  composition frame. Each panel should show the design + a 1-line rationale callout.
                </p>
              </div>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── IMPACT METRICS ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">IMPACT</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              NUMBERS THAT<br />MOVED THE NEEDLE
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              Baseline measured in Q4 2022 (pre-revamp). Metrics tracked at 90-day intervals after each phase.
              AOV and session metrics reflect the combined impact of design revamp and personalisation engine launch —
              isolating design contribution precisely isn't possible, but the correlation across phases is consistent.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <StatCard number="+32%" label="Increase in average order value (AOV)" delay={0} />
            <StatCard number="+80%" label="Increase in category selection on app launch" delay={0.05} />
            <StatCard number="+65%" label="Conversion on personalised sections & widgets" delay={0.1} />
            <StatCard number="+50%" label="Increase in user onboarding" delay={0.15} />
            <StatCard number="+30%" label="Increase in daily active users (DAU)" delay={0.2} />
            <StatCard number="+12%" label="Increase in D3 retention rate" delay={0.25} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <StatCard number="+50%" label="SMS permission rate" delay={0.3} />
            <StatCard number="+32%" label="magicPay conversions" delay={0.35} />
            <StatCard number="+25%" label="Voucher redemptions" delay={0.4} />
          </div>

          <div className="mt-10">
            <ImpactMetricsDisplay delay={0.45} />
          </div>

          {/* Phased impact breakdown visualization */}
          <FadeUp delay={0.5} className="mt-10">
            <div className="border p-8 md:p-12" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
              <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">Impact by Phase</h3>
              <div className="aspect-video border" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                <VizPhasedMetrics />
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
              title="Scope Clarity Is a Design Deliverable"
              body="The Merchant Page was redesigned 3 times before we aligned on the mental model. We should have run a jobs-to-be-done workshop at the start — not during the third iteration. Ambiguous scope costs more than slow research."
              delay={0}
            />
            <LearningCard
              title="A DS Built Alongside a Revamp Has Compounding Returns"
              body="Slower in Phase 1, but by Phase 2 the team moved materially faster. The debt register was the key tool — it made every shortcut visible and gave leadership the data to prioritise DS investment."
              delay={0.05}
            />
            <LearningCard
              title="Cross-Team Impact Is Non-Negotiable"
              body="The ops team's content tagging pipeline wasn't ready for personalised sections. Phase 2 shipped 6 weeks late as a result. Design touches more systems than the screen. Operational readiness needs to be part of sprint planning from week 1."
              delay={0.1}
            />
          </div>
        </section>

        <Divider />

        {/* ── FOOTER / NEXT ── */}
        <section className="pb-24 md:pb-32">
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-8">WHAT'S NEXT</div>
            <p className="text-lg opacity-75 max-w-2xl mb-8 leading-relaxed">
              Three strategic bets being tested post-revamp — each grounded in data from the first three phases.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-16">
              {[
                {
                  hypothesis: 'Social proof layers will increase D7 retention by 8–12%',
                  rationale: 'Session data shows users who view reviews transact 1.8× more. A friend-activity feed and local review surface is in pilot.',
                  status: 'In pilot',
                },
                {
                  hypothesis: 'Voice-first search will outperform text for Tier 2/3 users',
                  rationale: 'Qualitative research found low-literacy users abandon text search within 2 attempts. Voice prototype testing underway.',
                  status: 'Research phase',
                },
                {
                  hypothesis: 'magicDS is ready for multi-brand B2B use',
                  rationale: 'The token system and component architecture were designed to be rebrandable. Merchant-facing product is the next surface to validate this.',
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
    </div>
  );
}
