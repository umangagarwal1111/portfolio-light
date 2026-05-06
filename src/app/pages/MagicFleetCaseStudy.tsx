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

// ── Interactive metric bar chart ──────────────────────────────────
function MetricBarChart({
  data,
  title,
  delay = 0,
}: {
  data: Array<{ label: string; value: number; unit: string; isNegative?: boolean }>;
  title: string;
  delay?: number;
}) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <FadeUp delay={delay}>
      <div className="border border-black/15 p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold mb-8 tracking-tight">{title}</h3>
        <div className="space-y-6">
          {data.map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="flex items-end justify-between gap-4 mb-2">
                <span className="text-sm font-medium">{item.label}</span>
                <span className={`text-sm font-bold ${item.isNegative ? 'text-red-500' : 'text-green-500'}`}>
                  {item.isNegative ? '-' : '+'}{item.value}{item.unit}
                </span>
              </div>
              <motion.div
                className={`h-2 rounded-full ${item.isNegative ? 'bg-red-500/20' : 'bg-green-500/20'}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.value / maxValue) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <div className={`h-full rounded-full ${item.isNegative ? 'bg-red-500' : 'bg-green-500'}`} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeUp>
  );
}

// ── Timeline visualization ────────────────────────────────────────
function TimelineChart({
  phases,
  delay = 0,
}: {
  phases: Array<{ label: string; duration: string; icon?: string }>;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border border-black/15 p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold mb-8 tracking-tight">Development Timeline</h3>
        <div className="flex items-center justify-between">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.label}
              className="flex flex-col items-center flex-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="w-12 h-12 rounded-full border-2 border-black/30 flex items-center justify-center mb-3 bg-black/[0.02]">
                <span className="text-xs font-bold">{i + 1}</span>
              </div>
              <p className="text-xs md:text-sm font-bold text-center mb-1">{phase.label}</p>
              <p className="text-xs opacity-60 text-center">{phase.duration}</p>
              {i < phases.length - 1 && (
                <motion.div
                  className="hidden md:block absolute w-12 h-[1px] bg-black/20 ml-20"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i + 1) * 0.15 }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </FadeUp>
  );
}

// ── Section divider ───────────────────────────────────────────────
function Divider() {
  return <div className="w-full h-[1px] bg-black/10 my-16 md:my-24" />;
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
      <div className="h-full border border-black/15 p-6 md:p-8 hover:border-black/30 transition-colors duration-500">
        <div className="text-4xl md:text-6xl font-black tracking-tighter mb-2 text-[var(--portfolio-fg)]">
          {number}
        </div>
        <div className="text-sm md:text-base opacity-75 leading-relaxed">{label}</div>
      </div>
    </FadeUp>
  );
}

// ── Challenge card ───────────────────────────────────────────────
function ChallengeCard({
  number,
  title,
  description,
  impact,
  imageUrl,
  delay = 0,
}: {
  number: string;
  title: string;
  description: string;
  impact: string;
  imageUrl?: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border border-black/15 hover:border-black/20 transition-colors duration-500 overflow-hidden">
        {/* Screenshot evidence */}
        <CaseImage
          src={imageUrl}
          alt={`Challenge ${number}: ${title}`}
          label={`SCREENSHOT — ${title.toUpperCase()} (export from Figma)`}
          aspect="3/2"
          className="border-b border-black/15"
          contain
        />
        <div className="p-6 md:p-8">
          <div className="text-xs tracking-widest opacity-60 mb-4">{number}</div>
          <h3 className="text-xl md:text-2xl font-bold mb-6 tracking-tight">{title}</h3>
          <div className="space-y-4">
            <div>
              <div className="text-xs tracking-widest opacity-65 mb-2">DESCRIPTION</div>
              <p className="text-sm md:text-base opacity-75 leading-relaxed">{description}</p>
            </div>
            <div className="w-full h-[1px] bg-black/10" />
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

// ── User persona card ─────────────────────────────────────────────
function UserPersonaCard({
  role,
  description,
  painPoint,
  delay = 0,
}: {
  role: string;
  description: string;
  painPoint: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border-t border-black/15 pt-8">
        <div className="text-xs tracking-widest opacity-60 mb-3">USER ROLE</div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{role}</h3>
        <p className="opacity-75 leading-relaxed mb-6 text-sm md:text-base">{description}</p>
        <div className="bg-black/[0.04] p-4 border-l-2 border-black/30">
          <div className="text-xs tracking-widest opacity-65 mb-2">PRIMARY NEED</div>
          <p className="text-sm opacity-75 leading-relaxed italic">"{painPoint}"</p>
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
      <div className="border border-black/15 p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold mb-3 tracking-tight">{title}</h3>
        <p className="opacity-75 leading-relaxed text-sm md:text-base">{body}</p>
      </div>
    </FadeUp>
  );
}

// ── Feature showcase card ─────────────────────────────────────────
function FeatureCard({
  number,
  title,
  description,
  insight,
  imageUrl,
  delay = 0,
}: {
  number: string;
  title: string;
  description: string;
  insight: string;
  imageUrl?: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border border-black/15 hover:border-black/20 transition-colors duration-500 overflow-hidden">
        <CaseImage
          src={imageUrl}
          alt={`Feature ${number}: ${title}`}
          label={`FEATURE SCREENSHOT — ${title.toUpperCase()} (export from Figma)`}
          aspect="4/3"
          className="border-b border-black/15"
          contain
        />
        <div className="p-6 md:p-8">
          <div className="text-xs tracking-widest opacity-60 mb-4">{number}</div>
          <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">{title}</h3>
          <p className="text-sm md:text-base opacity-75 leading-relaxed mb-4">{description}</p>
          <div className="bg-black/[0.04] p-4 border-l-2 border-black/30">
            <div className="text-xs tracking-widest opacity-65 mb-2">INSIGHT</div>
            <p className="text-sm opacity-75 leading-relaxed italic">"{insight}"</p>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

// ── Inline Visualizations ────────────────────────────────────────

function VizFleetImpactMetrics() {
  const metrics = [
    { label: 'On-time Delivery', before: 68, after: 83, unit: '%', delta: '+22%', good: true },
    { label: 'Cost per Delivery', before: 100, after: 82, unit: 'index', delta: '-18%', good: true },
    { label: 'Rider Satisfaction', before: 54, after: 71, unit: '%', delta: '+31%', good: true },
    { label: 'Incident Response', before: 48, after: 43, unit: 'min avg', delta: '-10%', good: true },
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-6 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-5">OPERATIONAL IMPACT — BEFORE vs. AFTER</div>
      <div className="space-y-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] opacity-70">{m.label}</span>
              <span className="text-[10px] font-bold" style={{ color: '#22c55e' }}>{m.delta}</span>
            </div>
            <div className="flex gap-1.5 items-center">
              <div className="flex-1 h-2 rounded-sm overflow-hidden" style={{ background: 'var(--portfolio-border-strong)' }}>
                <div className="h-full rounded-sm" style={{ width: `${m.before}%`, background: 'var(--portfolio-fg)', opacity: 0.25 }} />
              </div>
              <div className="text-[8px] opacity-40 w-8 text-right">{m.before}</div>
              <div className="text-[8px] opacity-30">→</div>
              <div className="flex-1 h-2 rounded-sm overflow-hidden" style={{ background: 'var(--portfolio-border-strong)' }}>
                <div className="h-full rounded-sm bg-green-500" style={{ width: `${m.after}%` }} />
              </div>
              <div className="text-[8px] font-bold w-8" style={{ color: '#22c55e' }}>{m.after}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t text-[9px] opacity-40" style={{ borderColor: 'var(--portfolio-border)' }}>
        Grey = Before · Green = After · Measured 6 months post-launch
      </div>
    </div>
  );
}

function VizInfoHierarchy() {
  const tiers = [
    { label: 'CRITICAL', items: 'Active orders · Live GPS · Alerts', width: '40%', color: '#ef4444' },
    { label: 'IMPORTANT', items: 'Earnings · Schedule · Zone heatmap', width: '65%', color: '#f59e0b' },
    { label: 'CONTEXTUAL', items: 'Order history · Stats · Support · Settings', width: '100%', color: 'var(--portfolio-border-strong)' },
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-6 flex flex-col justify-center items-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-6">INFORMATION HIERARCHY MODEL</div>
      <div className="w-full max-w-md flex flex-col items-center gap-2">
        {tiers.map((t) => (
          <div key={t.label} className="flex flex-col items-center gap-1" style={{ width: t.width }}>
            <div className="w-full rounded-sm py-3 px-4 text-center" style={{ background: t.color, opacity: t.color.includes('var') ? 1 : undefined }}>
              <div className="text-[9px] font-black tracking-widest" style={{ color: t.color === 'var(--portfolio-border-strong)' ? 'var(--portfolio-fg)' : '#fff', opacity: t.color.includes('var') ? 0.7 : 1 }}>{t.label}</div>
            </div>
            <div className="text-[8px] opacity-50 text-center">{t.items}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 text-[9px] opacity-40 text-center">Priority determines screen real estate · Critical = always visible, no scroll</div>
    </div>
  );
}

function VizDataFlow() {
  const nodes = [
    { label: 'Rider App', sub: 'Orders · earnings · status', icon: '🛵' },
    { label: 'Backend', sub: 'Auto-assign · sync · cache', icon: '⚙️' },
    { label: 'Manager App', sub: 'Same app · different view', icon: '👔' },
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-6 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-6">DATA FLOW ARCHITECTURE</div>
      <div className="flex items-center justify-center gap-3">
        {nodes.map((n, i) => (
          <div key={n.label} className="flex items-center gap-3">
            <div className="border rounded p-4 text-center flex-shrink-0" style={{ borderColor: 'var(--portfolio-border-strong)', minWidth: '110px' }}>
              <div className="text-xl mb-1">{n.icon}</div>
              <div className="text-[10px] font-bold opacity-80">{n.label}</div>
              <div className="text-[8px] opacity-50 mt-0.5 leading-tight">{n.sub}</div>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex flex-col items-center gap-1">
                <div className="text-[8px] opacity-40">GPS + Status</div>
                <div className="text-sm opacity-50">⟶</div>
                <div className="text-[8px] opacity-40">Processed metrics</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 text-[9px] opacity-40 text-center">Async sync every 30s · Offline-first · Conflict resolution on reconnect</div>
    </div>
  );
}

function VizUserGroups() {
  const groups = [
    {
      role: 'Fleet Manager', icon: '👔',
      screens: ['Rider onboarding & KYC', 'Fleet performance dashboard', 'Earnings & payout tracking', 'Compliance & document review'],
    },
    {
      role: 'Delivery Rider', icon: '🛵',
      screens: ['Active order view', 'Earnings & ledger', 'Surge zone map', 'Performance & ratings'],
    },
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-6 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-5">ONE APP · ROLE DECIDED AT LOGIN · ASSIGNMENT & ROUTING AUTOMATED IN BACKEND</div>
      <div className="grid grid-cols-2 gap-6">
        {groups.map((g) => (
          <div key={g.role} className="border rounded p-4" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
            <div className="text-xl mb-2">{g.icon}</div>
            <div className="text-[10px] font-bold mb-3 opacity-80">{g.role}</div>
            <div className="space-y-1">
              {g.screens.map((s) => (
                <div key={s} className="text-[8px] opacity-55 flex items-start gap-1">
                  <span className="opacity-40 shrink-0">·</span>{s}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VizPaymentSystem() {
  const components = [
    { label: 'Base Pay', pct: 55, amount: '₹180', color: 'var(--portfolio-fg)' },
    { label: 'Surge Bonus', pct: 20, amount: '₹66', color: '#f59e0b' },
    { label: 'Incentives', pct: 15, amount: '₹49', color: '#22c55e' },
    { label: 'Tips', pct: 10, amount: '₹33', color: '#3b82f6' },
  ];
  return (
    <div className="w-full h-full bg-[var(--portfolio-bg)] p-6 flex flex-col justify-center">
      <div className="text-[10px] tracking-widest opacity-60 mb-5">EARNINGS BREAKDOWN — SAMPLE DAILY EARNINGS ₹328</div>
      <div className="flex h-8 rounded-sm overflow-hidden mb-4 gap-0.5">
        {components.map((c) => (
          <div key={c.label} className="h-full flex items-center justify-center" style={{ width: `${c.pct}%`, background: c.color, opacity: c.color.includes('var') ? 0.3 : 0.8 }}>
            <span className="text-[8px] font-bold" style={{ color: 'var(--portfolio-fg)' }}>{c.pct}%</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {components.map((c) => (
          <div key={c.label} className="text-center">
            <div className="w-3 h-3 rounded-sm mx-auto mb-1" style={{ background: c.color, opacity: c.color.includes('var') ? 0.4 : 0.8 }} />
            <div className="text-[8px] opacity-60">{c.label}</div>
            <div className="text-[9px] font-bold opacity-80">{c.amount}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t text-[9px] opacity-40 text-center" style={{ borderColor: 'var(--portfolio-border)' }}>
        Real-time earnings visibility reduced payment disputes by 40%
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
        className={`w-full overflow-hidden bg-black/[0.03] ${className}`}
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
      className={`w-full border border-dashed border-black/20 bg-black/[0.02] flex flex-col items-center justify-center gap-2 ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <div className="w-8 h-8 border border-black/20 flex items-center justify-center">
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

// ── Image sources — export from Figma and drop into public/case-studies/magicfleet/ ──
const IMG: Record<string, string | undefined> = {
  heroMockup: undefined, // INSERT: Hero mockup with manager dashboard and rider app screens
  dashboardOverview: undefined, // INSERT: Fleet Manager Dashboard Overview
  liveTracking: undefined, // INSERT: Live GPS Tracking Screen
  riderApp: undefined, // INSERT: Rider App Interface
  riderEarnings: undefined, // INSERT: Rider Earnings & Incentives Screen
  incidentReporting: undefined, // INSERT: Incident Reporting Feature
  systemArchitecture: undefined, // INSERT: Data Flow & System Architecture Diagram
  shifScheduling: undefined, // INSERT: Shift Scheduling Interface
  paymentSystem: undefined, // INSERT: Payment & Incentives Dashboard
  impactMetrics: undefined, // INSERT: Impact metrics visualization with charts
};

// ── MAIN PAGE ────────────────────────────────────────────────────
export default function MagicFleetCaseStudy() {
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
              <span>2023 — 2024</span>
              <span>·</span>
              <span>WEB & MOBILE</span>
              <span>·</span>
              <span>LEAD PRODUCT DESIGNER</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="leading-none tracking-tighter mb-8">
              <div className="text-5xl md:text-8xl lg:text-[9rem] font-black">
                MAGICFLEET
              </div>
              <div className="text-3xl md:text-5xl lg:text-6xl font-black">
                A FLEET MANAGEMENT PLATFORM
              </div>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg md:text-2xl max-w-3xl leading-relaxed opacity-75">
              MagicPin's growth was being capped by third-party delivery providers — unpredictable pricing, availability gaps at peak hours, and zero control over the last-mile experience. MagicFleet was the answer: a purpose-built, in-house fleet management platform that returned control over cost, reliability, and the rider relationship. Now live across 7 major metros with 300K+ registered riders.
            </p>
          </FadeUp>
        </section>

        {/* ── HERO MOCKUP: 3D MOBILE SCREENS ── */}
        <section className="mb-12 md:mb-20">
          <div
            className="relative w-full flex items-center justify-center overflow-visible py-20"
            style={{
              perspective: '1200px',
            }}
          >
            {/* Mobile Mockups Container */}
            <div className="relative flex items-center justify-center px-0 w-full overflow-x-auto md:overflow-visible">
              {/* Mockup 1 - Rider Screen (Surge Hours) */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: 0.7 }}
                whileHover={{ scale: 1.08, y: -20 }}
                className="flex-shrink-0 relative cursor-pointer group"
                style={{
                  transformStyle: 'preserve-3d',
                  width: '560px',
                }}
              >
                <motion.img
                  src="https://www.figma.com/api/mcp/asset/02a5a244-e387-4505-97ac-f50331b6ff88"
                  alt="Rider App - Surge Hours"
                  className="w-full h-auto rounded-3xl transition-all duration-300"
                  whileHover={{ boxShadow: '0 50px 120px rgba(0, 0, 0, 0.4), 0 20px 40px rgba(0, 0, 0, 0.3)' }}
                  style={{
                    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2)',
                    clipPath: 'inset(0 18% 0 18%)',
                  }}
                />
              </motion.div>

              {/* Mockup 2 - Ledger Screen */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.7 }}
                whileHover={{ scale: 1.08, y: -20 }}
                className="flex-shrink-0 relative cursor-pointer group"
                style={{
                  transformStyle: 'preserve-3d',
                  width: '560px',
                  marginLeft: '-195px',
                }}
              >
                <motion.img
                  src="https://www.figma.com/api/mcp/asset/bae52dc3-e03b-45e8-9a44-877f659ba25b"
                  alt="Ledger App - Earnings Data"
                  className="w-full h-auto rounded-3xl transition-all duration-300"
                  whileHover={{ boxShadow: '0 50px 120px rgba(0, 0, 0, 0.4), 0 20px 40px rgba(0, 0, 0, 0.3)' }}
                  style={{
                    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2)',
                    clipPath: 'inset(0 18% 0 18%)',
                  }}
                />
              </motion.div>

              {/* Mockup 3 - Earnings Screen */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                whileHover={{ scale: 1.08, y: -20 }}
                className="flex-shrink-0 relative cursor-pointer group"
                style={{
                  transformStyle: 'preserve-3d',
                  width: '560px',
                  marginLeft: '-195px',
                }}
              >
                <motion.img
                  src="https://www.figma.com/api/mcp/asset/356b939a-4873-427b-b2b2-d398c95e8923"
                  alt="Earnings App - Withdrawal Options"
                  className="w-full h-auto rounded-3xl transition-all duration-300"
                  whileHover={{ boxShadow: '0 50px 120px rgba(0, 0, 0, 0.4), 0 20px 40px rgba(0, 0, 0, 0.3)' }}
                  style={{
                    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2)',
                    clipPath: 'inset(0 18% 0 18%)',
                  }}
                />
              </motion.div>

              {/* Mockup 4 - Profile Screen */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
                whileHover={{ scale: 1.08, y: -20 }}
                className="flex-shrink-0 relative cursor-pointer group"
                style={{
                  transformStyle: 'preserve-3d',
                  width: '560px',
                  marginLeft: '-195px',
                }}
              >
                <motion.img
                  src="https://www.figma.com/api/mcp/asset/85f2a276-eadb-4c74-a2ea-7b74d50f2196"
                  alt="Profile App - User Settings"
                  className="w-full h-auto rounded-3xl transition-all duration-300"
                  whileHover={{ boxShadow: '0 50px 120px rgba(0, 0, 0, 0.4), 0 20px 40px rgba(0, 0, 0, 0.3)' }}
                  style={{
                    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2)',
                    clipPath: 'inset(0 18% 0 18%)',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── THE SITUATION ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">THE SITUATION</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10">
              WHY WE BUILT<br />THIS FROM SCRATCH
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-12">
            <FadeUp delay={0.1}>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                MagicPin was scaling fast — but its delivery operations were entirely dependent on third-party logistics
                providers. That dependency came with compounding problems: surge pricing during peak hours ate into
                margins, availability gaps meant unfulfilled orders exactly when demand was highest, and competing
                platforms were being prioritised over MagicPin on the same provider networks.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                There was no delivery data ownership — no visibility into route efficiency, rider behaviour, or failure
                reasons. Geographic expansion was gated on whether a provider covered the area. And the last-mile
                experience, the moment customers judge MagicPin, was entirely outside our control. The decision to
                build an in-house fleet platform wasn't a product bet — it was a strategic necessity.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.3} className="mt-12 pt-12 border-t border-black/15">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ border: '1px solid var(--portfolio-border)' }}>

              {/* 01 — Surge pricing */}
              <div className="p-8 flex flex-col" style={{ borderRight: '1px solid var(--portfolio-border)', borderBottom: '1px solid var(--portfolio-border)' }}>
                <div className="text-[10px] tracking-widest opacity-50 mb-6">01 — COST CONTROL</div>
                {/* Viz */}
                <div className="flex-1 flex flex-col justify-center mb-6" style={{ minHeight: '120px' }}>
                  <div className="flex items-end gap-1.5 h-20 mb-2">
                    {[
                      { h: 28, surge: false },
                      { h: 38, surge: false },
                      { h: 48, surge: false },
                      { h: 82, surge: true },
                      { h: 96, surge: true },
                      { h: 88, surge: true },
                      { h: 62, surge: true },
                      { h: 44, surge: false },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end h-full">
                        <div className="w-full rounded-sm transition-all" style={{
                          height: `${bar.h}%`,
                          background: bar.surge ? '#ef4444' : 'var(--portfolio-fg)',
                          opacity: bar.surge ? 0.7 : 0.2,
                        }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] opacity-35 mb-4">
                    <span>6am</span>
                    <span>↑ Peak hours</span>
                    <span>10pm</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--portfolio-fg)', opacity: 0.25 }} />
                      <span className="text-[9px] opacity-45">3PL: surge cost absorbed by us</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#ef4444', opacity: 0.7 }} />
                      <span className="text-[9px] opacity-45">Peak: uncontrolled spike</span>
                    </div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--portfolio-border)' }} className="pt-5">
                  <p className="text-sm font-bold mb-2 tracking-tight">Surge pricing was a cost we fully absorbed</p>
                  <p className="text-xs leading-relaxed" style={{ opacity: 0.55 }}>With MagicFleet, we define the surge amount, control its duration, and choose whether to pass it to the customer or use it as a lever to attract more riders during peak hours.</p>
                </div>
              </div>

              {/* 02 — Routes & rider behaviour */}
              <div className="p-8 flex flex-col" style={{ borderBottom: '1px solid var(--portfolio-border)' }}>
                <div className="text-[10px] tracking-widest opacity-50 mb-6">02 — ROUTE & RIDER CONTROL</div>
                {/* Viz */}
                <div className="flex-1 flex flex-col justify-center mb-6" style={{ minHeight: '120px' }}>
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <div className="text-[9px] opacity-40 mb-3">Before — rider's route</div>
                      <svg viewBox="0 0 100 48" className="w-full" style={{ height: '64px' }}>
                        <circle cx="12" cy="24" r="4" fill="#ef4444" opacity="0.7" />
                        <path d="M16,24 Q28,8 40,24 Q52,40 64,24 Q76,8 88,24" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeDasharray="4,2" opacity="0.55" />
                        <circle cx="88" cy="24" r="4" fill="#ef4444" opacity="0.7" />
                        <text x="50" y="44" fontSize="7" fill="currentColor" opacity="0.35" textAnchor="middle">longer · costlier</text>
                      </svg>
                    </div>
                    <div>
                      <div className="text-[9px] opacity-40 mb-3">After — optimised route</div>
                      <svg viewBox="0 0 100 48" className="w-full" style={{ height: '64px' }}>
                        <circle cx="12" cy="28" r="4" fill="#22c55e" opacity="0.8" />
                        <line x1="16" y1="28" x2="50" y2="28" stroke="#22c55e" strokeWidth="1.5" opacity="0.7" />
                        <circle cx="50" cy="20" r="3.5" fill="#22c55e" opacity="0.5" />
                        <line x1="50" y1="28" x2="88" y2="28" stroke="#22c55e" strokeWidth="1.5" opacity="0.7" />
                        <circle cx="88" cy="28" r="4" fill="#22c55e" opacity="0.8" />
                        <text x="50" y="44" fontSize="7" fill="currentColor" opacity="0.35" textAnchor="middle">multi-drop · efficient</text>
                      </svg>
                    </div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--portfolio-border)' }} className="pt-5">
                  <p className="text-sm font-bold mb-2 tracking-tight">Longer routes = more money spent per order</p>
                  <p className="text-xs leading-relaxed" style={{ opacity: 0.55 }}>MagicFleet lets us suggest optimal routes, direct riders to high-demand zones, and enable multi-order pickups on a single trip — reducing cost per delivery while increasing rider earnings.</p>
                </div>
              </div>

              {/* 03 — Expansion */}
              <div className="p-8 flex flex-col" style={{ borderRight: '1px solid var(--portfolio-border)' }}>
                <div className="text-[10px] tracking-widest opacity-50 mb-6">03 — GEOGRAPHIC EXPANSION</div>
                {/* Viz */}
                <div className="flex-1 flex flex-col justify-center mb-6" style={{ minHeight: '120px' }}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-[9px] opacity-40 mb-2">3PL coverage</div>
                      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
                        {[1,1,0,0,0, 1,1,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0].map((a, i) => (
                          <div key={i} className="rounded-sm" style={{ aspectRatio: '1', background: a ? 'var(--portfolio-fg)' : 'var(--portfolio-border-strong)', opacity: a ? 0.3 : 0.1 }} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] opacity-40 mb-2">MagicFleet zones</div>
                      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
                        {[1,1,1,1,0, 1,1,1,1,1, 1,1,1,1,1, 0,1,1,1,1, 0,0,1,1,1].map((a, i) => (
                          <div key={i} className="rounded-sm" style={{ aspectRatio: '1', background: a ? '#22c55e' : 'var(--portfolio-border-strong)', opacity: a ? 0.55 : 0.08 }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--portfolio-border)' }} className="pt-5">
                  <p className="text-sm font-bold mb-2 tracking-tight">Expansion was gated on provider availability</p>
                  <p className="text-xs leading-relaxed" style={{ opacity: 0.55 }}>If a 3PL didn't cover a locality, we couldn't onboard merchants there. MagicFleet removed that ceiling — we create high-demand zones, offer location-based incentives, and direct riders wherever we want to grow.</p>
                </div>
              </div>

              {/* 04 — Rider accountability */}
              <div className="p-8 flex flex-col">
                <div className="text-[10px] tracking-widest opacity-50 mb-6">04 — RIDER ACCOUNTABILITY</div>
                {/* Viz */}
                <div className="flex-1 flex flex-col justify-center mb-6 space-y-2.5" style={{ minHeight: '120px' }}>
                  {[
                    { score: '100%', label: 'No verification needed', color: '#22c55e', w: '100%' },
                    { score: '95%',  label: 'Basic verification',      color: '#86efac', w: '72%'  },
                    { score: '90%',  label: 'Strict verification',     color: '#f59e0b', w: '50%'  },
                    { score: '<85%', label: 'Blacklisted · no orders', color: '#ef4444', w: '28%'  },
                  ].map((tier) => (
                    <div key={tier.score} className="flex items-center gap-3">
                      <div className="text-[9px] font-bold shrink-0 opacity-55" style={{ width: '32px' }}>{tier.score}</div>
                      <div className="flex-1 rounded-sm overflow-hidden" style={{ height: '10px', background: 'var(--portfolio-border-strong)', opacity: 0.18 }}>
                        <div className="h-full rounded-sm" style={{ width: tier.w, background: tier.color, opacity: 0.8 }} />
                      </div>
                      <div className="text-[9px] shrink-0 opacity-45" style={{ width: '140px' }}>{tier.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid var(--portfolio-border)' }} className="pt-5">
                  <p className="text-sm font-bold mb-2 tracking-tight">No control over how riders represented MagicPin</p>
                  <p className="text-xs leading-relaxed" style={{ opacity: 0.55 }}>MagicFleet introduced a performance scoring system — tiered OTP verification, instant penalties, account holds, and blacklisting for bad actors. Better riders get fewer friction points; worse riders get fewer orders.</p>
                </div>
              </div>

            </div>
          </FadeUp>

          <FadeUp delay={0.4} className="mt-12">
            <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-black/15">
              <div>
                <div className="text-5xl md:text-6xl font-black text-[var(--portfolio-fg)] mb-2 tracking-tighter">300K+</div>
                <p className="text-sm md:text-base opacity-75">Registered riders on the platform</p>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-black text-[var(--portfolio-fg)] mb-2 tracking-tighter">50K+</div>
                <p className="text-sm md:text-base opacity-75">Monthly active riders</p>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-black text-[var(--portfolio-fg)] mb-2 tracking-tighter">7</div>
                <p className="text-sm md:text-base opacity-75">Major metros — Delhi NCR, Bengaluru, Pune, Hyderabad, Chennai, Kolkata, Mumbai</p>
              </div>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── IMPACT METRICS ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">IMPACT</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              OPERATIONAL METRICS<br />THAT MATTER
            </h2>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <StatCard number="+22%" label="Improvement in on-time delivery rate" delay={0} />
            <StatCard number="-18%" label="Reduction in cost per delivery" delay={0.05} />
            <StatCard number="+31%" label="Improvement in rider retention" delay={0.1} />
            <StatCard number="+45%" label="Increase in ride allocation efficiency" delay={0.15} />
            <StatCard number="-12%" label="Reduction in incident response time" delay={0.2} />
            <StatCard number="+28%" label="Improvement in real-time visibility accuracy" delay={0.25} />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <MetricBarChart
              title="Key Performance Improvements"
              data={[
                { label: 'On-time Delivery', value: 22, unit: '%', isNegative: false },
                { label: 'Rider Retention', value: 31, unit: '%', isNegative: false },
                { label: 'Allocation Efficiency', value: 45, unit: '%', isNegative: false },
                { label: 'Visibility Accuracy', value: 28, unit: '%', isNegative: false },
              ]}
              delay={0.3}
            />
            <MetricBarChart
              title="Operational Cost Reductions"
              data={[
                { label: 'Cost per Delivery', value: 18, unit: '%', isNegative: true },
                { label: 'Incident Response Time', value: 12, unit: '%', isNegative: true },
              ]}
              delay={0.4}
            />
          </div>

          <FadeUp delay={0.5} className="mt-10">
            <div className="border" style={{ borderColor: 'var(--portfolio-border-strong)', height: '280px' }}>
              <VizFleetImpactMetrics />
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── THE CHALLENGE ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">THE CHALLENGE</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              BUILDING FOR A PROBLEM<br />THAT DIDN'T EXIST YET
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              There was no existing internal tool to build on. No benchmark to reference. We were designing
              a platform for operations that were simultaneously being built — which meant every design decision
              had to anticipate scale we hadn't yet reached.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ChallengeCard
              number="01"
              title="Data Without Clarity"
              description="Building in-house meant we now owned the data — GPS pings, delivery status, earnings, incidents, rider behaviour. But raw data at scale isn't insight. The challenge was deciding what to surface, to whom, and when — without overwhelming both users."
              impact="Too much information is the same as no information. The design had to impose a clear hierarchy on the data, or every screen would become noise."
              imageUrl={IMG.dashboardOverview}
              delay={0}
            />
            <ChallengeCard
              number="02"
              title="One App, Two Completely Different Experiences"
              description="Managers and riders log into the same app — but what they need from it is entirely different. A manager periodically checks fleet health and payouts on their phone. A rider is in the app multiple times a day, between deliveries, often on 2G."
              impact="The interface had to adapt by role at login — same codebase, same app, two distinct experiences — without creating a maintenance burden of two separate products."
              imageUrl={IMG.shifScheduling}
              delay={0.05}
            />
            <ChallengeCard
              number="03"
              title="Offline as the Default State"
              description="Riders operated in areas with poor or no connectivity. The app couldn't rely on live data syncing — yet managers needed accurate, up-to-date fleet analytics to make operational decisions."
              impact="An online-first design would break constantly in the field. The entire data architecture had to be rethought around offline-first operation with graceful background sync."
              imageUrl={IMG.incidentReporting}
              delay={0.1}
            />
            <ChallengeCard
              number="04"
              title="Rider Trust & Retention"
              description="Riders had no visibility into how their earnings were calculated, why orders came when they did, or how their performance was being judged. Lack of transparency created distrust and drove churn."
              impact="Without trust, rider retention was entirely dependent on pay rates. Giving riders visibility into their own data was a retention lever — but only if the UX made it effortless to understand."
              imageUrl={IMG.riderEarnings}
              delay={0.15}
            />
          </div>

          {/* HMW */}
          <FadeUp delay={0.2} className="mt-12">
            <div className="border border-black/20 p-8 md:p-12 bg-black/[0.02]">
              <div className="text-xs tracking-widest opacity-65 mb-4">CORE QUESTION</div>
              <p className="text-2xl md:text-4xl font-bold leading-tight opacity-90">
                "How do we build one app that adapts by role at login — giving managers fleet-level control
                and riders a simple, offline-tolerant experience — without building two separate products?"
              </p>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── USERS ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">USER RESEARCH</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              TWO USERS,<br />ONE PLATFORM
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              MagicFleet is a single mobile app with two interfaces. Your role — manager or rider — is
              determined at login, and the entire experience adapts accordingly. Managers onboard and oversee
              their team of riders. Riders are the primary users by volume. All order assignment and routing
              is handled automatically in the backend. Today, only riders are active on the platform.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-0 md:gap-8">
            <UserPersonaCard
              role="Fleet Manager"
              description="Uses the same app as riders but with a manager view unlocked at login. Onboards riders, monitors fleet performance, tracks payouts, and handles KYC. Lower interaction frequency — checks in periodically, not continuously."
              painPoint="I need to see who's active, how my fleet is performing, and whether payouts are going out correctly — all in one place, on my phone."
              delay={0}
            />
            <UserPersonaCard
              role="Delivery Rider"
              description="The primary user by volume. Receives auto-assigned orders via backend, tracks real-time earnings, views performance metrics, and manages availability. Mobile-only, frequently offline, multiple sessions per day."
              painPoint="Tell me what I'm earning, show me my next job, and don't make me tap more than twice to get there. I'm on a bike, not at a desk."
              delay={0.1}
            />
          </div>
        </section>

        <Divider />

        {/* ── DESIGN APPROACH ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">DESIGN APPROACH</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              THREE CORE<br />PRINCIPLES
            </h2>
          </FadeUp>

          <div className="space-y-0">
            {[
              {
                step: '01',
                title: 'Decision-First Design',
                body: 'Every interface was designed around decision-making, not data display. We asked: "What decision does this user need to make?" Then we provided exactly the information they needed — no more, no less. Hierarchy matters more than completeness.',
              },
              {
                step: '02',
                title: 'Progressive Disclosure',
                body: 'Instead of overwhelming screens, we used progressive disclosure. Show the critical few metrics at first. Provide drill-downs for detail. Let users go as deep as they need without forcing them to wade through irrelevant information.',
              },
              {
                step: '03',
                title: 'Real-Time Responsiveness',
                body: 'In logistics, speed is survival. Every interaction was optimized for instant feedback. No loading states longer than necessary. Data syncs in the background. Offline-first architecture means the app never feels broken.',
              },
            ].map((item, i) => (
              <FadeUp key={item.step} delay={i * 0.05}>
                <div className="border-t border-black/15 py-8 grid md:grid-cols-[120px_1fr] gap-4 md:gap-12">
                  <div className="text-xs tracking-widest opacity-60 pt-1">{item.step}</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">{item.title}</h3>
                    <p className="opacity-75 leading-relaxed text-sm md:text-base">{item.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Design Principle Visualization */}
          <FadeUp delay={0.2} className="mt-12">
            <div className="border border-black/15 p-8 md:p-12 bg-black/[0.02]">
              <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">Information Hierarchy Model</h3>
              <div className="border" style={{ borderColor: 'var(--portfolio-border-strong)', height: '240px' }}>
                <VizInfoHierarchy />
              </div>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── KEY FEATURES ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">CORE FEATURES</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              KEY PRODUCT<br />SOLUTIONS
            </h2>
          </FadeUp>

          <div className="grid gap-6">
            <FeatureCard
              number="01"
              title="Manager View — Fleet at a Glance"
              description="When a manager logs in, the same app surfaces a fleet-level view: registered riders, active count, collective performance, and payout status. Designed for periodic check-ins, not continuous monitoring."
              insight="Managers don't need a desktop dashboard — they need a mobile view that answers 'is everything okay?' in under 30 seconds."
              imageUrl={IMG.dashboardOverview}
              delay={0}
            />

            <FeatureCard
              number="02"
              title="Live GPS Tracking & Analytics"
              description="Real-time rider location tracking with contextual analytics. Not just where riders are, but what they're doing, how long they've been there, and predictive ETA for next deliveries."
              insight="Context changes everything. Raw GPS coordinates are meaningless without understanding what the rider is actually doing."
              imageUrl={IMG.liveTracking}
              delay={0.05}
            />

            <FeatureCard
              number="03"
              title="Intelligent Shift Scheduling"
              description="A scheduling system that lets managers create shifts with constraints (area, vehicle type, rider experience), then intelligently assigns riders based on availability, preference, and historical performance."
              insight="Predictive shift filling reduces 30-minute manual assignment down to 3 minutes, while improving rider satisfaction and retention."
              imageUrl={IMG.shifScheduling}
              delay={0.1}
            />

            <FeatureCard
              number="04"
              title="Rider Earnings & Incentives"
              description="A transparent earnings dashboard for riders showing real-time earnings, bonus structure, and performance feedback. Gamified incentives drive engagement and performance improvement."
              insight="Riders who see their earnings rise perform better. Transparency is a feature, not a detail."
              imageUrl={IMG.riderEarnings}
              delay={0.15}
            />

            <FeatureCard
              number="05"
              title="Incident Reporting & Resolution"
              description="A low-friction system for reporting delivery incidents (cancelled, delayed, damaged). Enables rapid issue escalation, category tracking, and automated resolution workflows."
              insight="Most incidents don't need manual intervention. Automate the 80% of routine issues so teams can focus on the 20% that need human judgment."
              imageUrl={IMG.incidentReporting}
              delay={0.2}
            />

            <FeatureCard
              number="06"
              title="Rider Mobile App"
              description="A lightweight, offline-friendly app for riders. Shows current assignment, route, earnings, performance, and feedback. Designed for low-data environments and quick interactions on the move."
              insight="Every extra second of load time on mobile means riders will switch apps. Offline-first isn't optional — it's essential."
              imageUrl={IMG.riderApp}
              delay={0.25}
            />
          </div>
        </section>

        <Divider />

        {/* ── SYSTEM THINKING ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">ARCHITECTURE</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              HOW THE SYSTEM<br />WORKS TOGETHER
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeUp delay={0.1}>
              <p className="text-lg md:text-xl leading-relaxed opacity-75 mb-6">
                MagicFleet is one app that adapts at login. Riders get a lightweight, action-focused interface —
                current order, earnings, performance. Managers get a fleet-level view of their registered riders —
                who's active, collective performance, payouts. All assignment and routing happens in the backend
                automatically; neither user sees or controls it. Data from rider activity flows up to the manager
                view in near real-time, with offline sync for connectivity gaps.
              </p>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                The system is built for <strong className="text-[var(--portfolio-fg)] opacity-100">eventual consistency</strong> — accepting
                that not all data will be immediately synchronized, but ensuring that the system converges to the
                correct state. This is essential for reliability in poor connectivity environments.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="border" style={{ borderColor: 'var(--portfolio-border-strong)', height: '200px' }}>
                <VizDataFlow />
              </div>
            </FadeUp>
          </div>

          {/* Platform Overview Infographic */}
          <FadeUp delay={0.3} className="mt-12">
            <div className="border border-black/15 p-8 md:p-12">
              <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">Platform Ecosystem Overview</h3>
              <div className="border" style={{ borderColor: 'var(--portfolio-border-strong)', height: '240px' }}>
                <VizUserGroups />
              </div>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── PAYMENT & INCENTIVES SYSTEM ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">MONETIZATION</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              PAYMENTS,<br />INCENTIVES & TRUST
            </h2>
          </FadeUp>

          <FadeUp delay={0.1} className="mb-12">
            <div className="border" style={{ borderColor: 'var(--portfolio-border-strong)', height: '240px' }}>
              <VizPaymentSystem />
            </div>
          </FadeUp>

          <div className="space-y-6">
            {[
              {
                title: 'Transparent Earnings',
                body: 'Every rider knows exactly how they earn. Per-delivery rates, bonuses, incentives — all clearly displayed. This transparency drives trust and encourages good behaviour.',
              },
              {
                title: 'Dynamic Incentive Structure',
                body: 'Incentives adapt based on operational needs. Need more deliveries in an area? Offer location-based bonuses. Trying to reduce cancellations? Reward completion rate. The system is flexible enough to respond to real-world needs.',
              },
              {
                title: 'Fast, Reliable Payouts',
                body: 'Riders get paid daily (or even same-shift in some markets). Fast payouts reduce churn and build trust. A rider who gets paid the day they work is more likely to return tomorrow.',
              },
              {
                title: 'Performance Visibility',
                body: 'Riders see their performance metrics in real-time — on-time rate, cancellation rate, customer ratings. This feedback loop drives continuous improvement.',
              },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.04}>
                <div className="border-t border-black/15 py-8 grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12">
                  <h3 className="text-lg md:text-xl font-bold tracking-tight">{item.title}</h3>
                  <p className="opacity-75 leading-relaxed text-sm md:text-base">{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
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
              title="Offline is Non-Negotiable"
              body="In logistics, poor connectivity is not an edge case — it's the default. Design for offline-first, sync opportunistically. A system that feels broken offline is a broken system."
              delay={0}
            />
            <LearningCard
              title="Design for the Hardest Context"
              body="Riders check their phones between deliveries — in motion, one hand, 3 seconds of attention. If the design works for them, it works for everyone. Design up from the hardest constraint, not down from the easiest."
              delay={0.05}
            />
            <LearningCard
              title="Transparency Drives Performance"
              body="When riders see their earnings, performance, and feedback — they improve. Transparency isn't a feature; it's a behavioural lever. Use it."
              delay={0.1}
            />
            <LearningCard
              title="Real-Time = Responsibility"
              body="Real-time visibility means real-time accountability. Be careful what you measure — you'll get what you incentivize. Data transparency without thoughtful incentive design backfires."
              delay={0.15}
            />
            <LearningCard
              title="Automation Shifts the Design Problem"
              body="When assignment and routing is automated, the design problem moves from 'how do I make the decision?' to 'how do I trust the decision?' Surfacing the logic behind auto-assignments reduced rider complaints more than any UI change."
              delay={0.2}
            />
            <LearningCard
              title="Scale Changes Design"
              body="What works for 100 riders breaks at 100k. Aggregations, sampling, and progressive disclosure become design requirements, not nice-to-haves."
              delay={0.25}
            />
          </div>
        </section>

        <Divider />

        {/* ── OUTCOMES ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">OUTCOMES</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              RESULTS &<br />NEXT STEPS
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-4 text-sm opacity-75 mb-12">
            <FadeUp delay={0} className="border-t border-black/15 pt-6">
              <div className="font-bold mb-2">Post-Launch Iteration</div>
              <p>Launched MVP and iterating based on real operational feedback. Early metrics are tracking ahead of projections.</p>
            </FadeUp>
            <FadeUp delay={0.05} className="border-t border-black/15 pt-6">
              <div className="font-bold mb-2">Scaling to More Cities</div>
              <p>Rolling out to additional cities, learning from regional differences in operations, rider behaviour, and connectivity patterns.</p>
            </FadeUp>
            <FadeUp delay={0.1} className="border-t border-black/15 pt-6">
              <div className="font-bold mb-2">Predictive Capabilities</div>
              <p>Building in predictive analytics — demand forecasting, churn prediction, optimal shift scheduling powered by ML models.</p>
            </FadeUp>
          </div>
        </section>

        <Divider />

        {/* ── CONCLUSION ── */}
        <section className="pb-24 md:pb-32">
          <FadeUp>
            <div className="border border-black/20 p-8 md:p-12 bg-black/[0.02]">
              <div className="text-xs tracking-widest opacity-65 mb-4">REFLECTION</div>
              <p className="text-2xl md:text-3xl font-bold leading-tight opacity-85 mb-6">
                The best design decision on MagicFleet wasn't a screen or an interaction — it was the decision to build at all.
              </p>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                Owning the fleet meant owning the data, the cost structure, and the rider relationship. The design work
                was only possible because the strategic call was made first. This taught me that as a designer, understanding
                why a product exists — the business constraint it solves, not just the user problem it addresses — is what
                separates work that looks good from work that actually matters.
              </p>
            </div>
          </FadeUp>
        </section>

        {/* ── FOOTER / NEXT ── */}
        <section className="pb-24 md:pb-32">
          <FadeUp delay={0.1}>
            <div className="border border-black/15 p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/[0.02]">
              <div>
                <p className="text-xs tracking-widest opacity-65 mb-2">CASE STUDIES</p>
                <p className="text-2xl md:text-3xl font-bold tracking-tight opacity-85">More work coming soon</p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="border border-black/30 px-8 py-4 text-sm tracking-widest hover:bg-[#111110] hover:text-[#F7F4F0] transition-all duration-300 whitespace-nowrap"
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
