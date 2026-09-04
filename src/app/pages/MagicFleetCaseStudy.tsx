import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useTheme } from '../context/ThemeContext';
import { SectionNavigator, NavSection } from '../components/SectionNavigator';

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
      <div className="p-6 md:p-8" style={{ border: '1px solid var(--portfolio-border)' }}>
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
      <div className="p-6 md:p-8" style={{ border: '1px solid var(--portfolio-border)' }}>
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
  return <div className="w-full h-[1px] my-16 md:my-24" style={{ background: 'var(--portfolio-border)' }} />;
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
      <div className="h-full p-6 md:p-8 transition-colors duration-500" style={{ border: '1px solid var(--portfolio-border)' }}>
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
  delay = 0,
}: {
  number: string;
  title: string;
  description: string;
  impact: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="transition-colors duration-500" style={{ border: '1px solid var(--portfolio-border)' }}>
        <div className="p-6 md:p-8">
          <div className="text-xs tracking-widest opacity-60 mb-4">{number}</div>
          <h3 className="text-xl md:text-2xl font-bold mb-6 tracking-tight">{title}</h3>
          <div className="space-y-4">
            <div>
              <div className="text-xs tracking-widest opacity-65 mb-2">THE PROBLEM</div>
              <p className="text-sm md:text-base opacity-75 leading-relaxed">{description}</p>
            </div>
            <div className="w-full h-[1px]" style={{ background: 'var(--portfolio-border)' }} />
            <div>
              <div className="text-xs tracking-widest opacity-65 mb-2">HOW WE SOLVED IT</div>
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
      <div className="pt-8" style={{ borderTop: '1px solid var(--portfolio-border)' }}>
        <div className="text-xs tracking-widest opacity-60 mb-3">USER ROLE</div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{role}</h3>
        <p className="opacity-75 leading-relaxed mb-6 text-sm md:text-base">{description}</p>
        <div className="p-4 border-l-2" style={{ background: 'color-mix(in srgb, var(--portfolio-fg) 5%, transparent)', borderColor: 'color-mix(in srgb, var(--portfolio-fg) 35%, transparent)' }}>
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
      <div className="p-6 md:p-8" style={{ border: '1px solid var(--portfolio-border)' }}>
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
      <div className="transition-colors duration-500 overflow-hidden" style={{ border: '1px solid var(--portfolio-border)' }}>
        <div className="px-5 pt-2 pb-1 md:px-6 md:pt-3 md:pb-1">
          <div className="text-xs tracking-widest opacity-60 mb-4">{number}</div>
          <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">{title}</h3>
          <p className="text-sm md:text-base opacity-75 leading-relaxed mb-4">{description}</p>
          <div className="p-4 border-l-2" style={{ background: 'color-mix(in srgb, var(--portfolio-fg) 5%, transparent)', borderColor: 'color-mix(in srgb, var(--portfolio-fg) 35%, transparent)' }}>
            <div className="text-xs tracking-widest opacity-65 mb-2">INSIGHT</div>
            <p className="text-sm opacity-75 leading-relaxed italic">"{insight}"</p>
          </div>
        </div>
        {imageUrl ? (
          <div style={{ overflow: 'hidden', borderTop: '1px solid var(--portfolio-border)' }}>
            <img
              src={imageUrl}
              alt={`Feature ${number}: ${title}`}
              className="w-full h-auto block"
              style={{ marginTop: '-120px', marginBottom: '-120px' }}
            />
          </div>
        ) : (
          <CaseImage
            src={undefined}
            alt={`Feature ${number}: ${title}`}
            label={`FEATURE SCREENSHOT — ${title.toUpperCase()} (export from Figma)`}
            aspect="16/9"
            className=""
            style={{ borderTop: '1px solid var(--portfolio-border)' }}
          />
        )}
      </div>
    </FadeUp>
  );
}

// ── Inline Visualizations ────────────────────────────────────────

function VizFleetImpactMetrics() {
  const metrics = [
    { label: 'On-time Delivery', before: 68, after: 83, beforeLabel: '68%', afterLabel: '83%', delta: '+22%' },
    { label: 'Cost per Order (CPO)', before: 68, after: 54, beforeLabel: '₹68', afterLabel: '₹54', delta: '-21%' },
    { label: 'Rider Retention', before: 32, after: 48, beforeLabel: '32%', afterLabel: '48%', delta: '+50%' },
    { label: 'Issue Resolution', before: 100, after: 35, beforeLabel: '120 min', afterLabel: '42 min', delta: '-65%' },
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
              <div className="text-[8px] opacity-65 w-10 text-right">{m.beforeLabel}</div>
              <div className="text-[8px] opacity-55">→</div>
              <div className="flex-1 h-2 rounded-sm overflow-hidden" style={{ background: 'var(--portfolio-border-strong)' }}>
                <div className="h-full rounded-sm bg-green-500" style={{ width: `${m.after}%` }} />
              </div>
              <div className="text-[8px] font-bold w-10" style={{ color: '#22c55e' }}>{m.afterLabel}</div>
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
  return (
    <div className="w-full py-8 px-6 flex flex-col items-center gap-6">
      {/* Pyramid SVG */}
      <svg viewBox="0 0 480 222" className="w-full max-w-lg" aria-hidden="true">
        {/* CRITICAL — top/narrowest */}
        <path d="M 158,2 L 322,2 L 370,70 L 110,70 Z" fill="#ef4444" />
        <text x="240" y="26" textAnchor="middle" fill="white" fontSize="11" fontWeight="900" letterSpacing="3">CRITICAL</text>
        <text x="240" y="45" textAnchor="middle" fill="white" fontSize="8.5" opacity="0.9">Active orders · Live GPS · Alerts</text>
        <text x="240" y="61" textAnchor="middle" fill="white" fontSize="7.5" opacity="0.65">Always visible · no scroll</text>

        {/* IMPORTANT — middle */}
        <path d="M 107,74 L 373,74 L 421,142 L 59,142 Z" fill="#f59e0b" />
        <text x="240" y="98" textAnchor="middle" fill="white" fontSize="11" fontWeight="900" letterSpacing="3">IMPORTANT</text>
        <text x="240" y="117" textAnchor="middle" fill="white" fontSize="8.5" opacity="0.9">Earnings · Schedule · Zone heatmap</text>
        <text x="240" y="133" textAnchor="middle" fill="white" fontSize="7.5" opacity="0.65">Above the fold · 1 tap away</text>

        {/* CONTEXTUAL — bottom/widest */}
        <path d="M 56,146 L 424,146 L 476,214 L 4,214 Z" style={{ fill: 'var(--portfolio-border-strong)' }} />
        <text x="240" y="170" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="900" letterSpacing="3" opacity="0.85">CONTEXTUAL</text>
        <text x="240" y="189" textAnchor="middle" fill="currentColor" fontSize="8.5" opacity="0.65">Order history · Stats · Support · Settings</text>
        <text x="240" y="205" textAnchor="middle" fill="currentColor" fontSize="7.5" opacity="0.45">Scroll to access · 2+ taps</text>
      </svg>

      {/* Legend row */}
      <div className="flex items-center gap-6 flex-wrap justify-center">
        {[
          { color: '#ef4444', label: 'Critical' },
          { color: '#f59e0b', label: 'Important' },
          { color: 'var(--portfolio-border-strong)', label: 'Contextual' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: color }} />
            <span className="text-[10px] opacity-60 tracking-wide">{label}</span>
          </div>
        ))}
        <span className="text-[10px] opacity-40">·</span>
        <span className="text-[10px] opacity-50 tracking-wide">Priority = screen real estate</span>
      </div>
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
              <div className="text-[8px] opacity-65 mt-0.5 leading-tight">{n.sub}</div>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex flex-col items-center gap-1">
                <div className="text-[8px] opacity-65">GPS + Status</div>
                <div className="text-sm opacity-65">⟶</div>
                <div className="text-[8px] opacity-65">Processed metrics</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 text-[9px] opacity-65 text-center">Async sync every 30s · Offline-first · Conflict resolution on reconnect</div>
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
                <div key={s} className="text-[8px] opacity-70 flex items-start gap-1">
                  <span className="opacity-65 shrink-0">·</span>{s}
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
        className={`w-full overflow-hidden ${className}`} style={{ background: 'color-mix(in srgb, var(--portfolio-fg) 3%, transparent)' }}
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
      className={`w-full flex flex-col items-center justify-center gap-2 ${className}`} style={{ border: '1px dashed color-mix(in srgb, var(--portfolio-fg) 20%, transparent)', background: 'color-mix(in srgb, var(--portfolio-fg) 2%, transparent)' }}
      style={{ aspectRatio: aspect }}
    >
      <div className="w-8 h-8 flex items-center justify-center" style={{ border: '1px solid color-mix(in srgb, var(--portfolio-fg) 20%, transparent)' }}>
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

  const sections: NavSection[] = [
    { id: 'cs-context',    label: 'Context'    },
    { id: 'cs-discovery',  label: 'Discovery'  },
    { id: 'cs-craft',      label: 'Craft'      },
    { id: 'cs-impact',     label: 'Impact'     },
    { id: 'cs-system',     label: 'System'     },
    { id: 'cs-reflection', label: 'Reflection' },
  ];

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

      <SectionNavigator sections={sections} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── HERO ── */}
        <section className="pt-20 md:pt-44 pb-16 md:pb-24">
          <FadeUp>
            <div className="flex flex-wrap gap-6 mb-10 text-xs tracking-widest opacity-65">
              <span>2024 — 2025</span>
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
              I designed MagicFleet from scratch — a purpose-built, in-house fleet platform that returned control over cost, reliability, and the rider relationship to MagicPin. Now live across 7 major metros, handling 50% of all food delivery orders on the platform.
            </p>
          </FadeUp>
        </section>

        {/* ── HERO MOCKUP: 4 PHONE SCREENS ── */}
        <section className="mb-12 md:mb-20 overflow-x-auto md:overflow-visible">
          <div
            className="flex items-start justify-center gap-5 md:gap-8 py-12 md:py-20 px-6"
            style={{ minWidth: '680px' }}
          >
            {[
              { src: '/case-studies/magicfleet/Orders.png',   alt: 'Active Orders screen', label: 'ACTIVE ORDERS' },
              { src: '/case-studies/magicfleet/Ledger.png',   alt: 'Ledger screen',         label: 'LEDGER'        },
              { src: '/case-studies/magicfleet/Earnings.png', alt: 'Earnings screen',       label: 'EARNINGS'      },
              { src: '/case-studies/magicfleet/Profile.png',  alt: 'Profile screen',        label: 'PROFILE'       },
            ].map((screen) => (
              <div
                key={screen.src}
                className="flex-shrink-0 flex flex-col items-center gap-4 transition-transform duration-200 ease-out hover:-translate-y-3.5"
                style={{ width: 'clamp(150px, 20vw, 240px)' }}
              >
                <img
                  src={screen.src}
                  alt={screen.alt}
                  className="w-full h-auto rounded-[20px]"
                  style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.2)' }}
                />
                <span className="text-[10px] tracking-widest opacity-65">{screen.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── BEAT 1: WHY THIS EXISTED ── */}
        <section id="cs-context">
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">CONTEXT</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10">
              WHY WE BUILT<br />THIS FROM SCRATCH
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-lg md:text-xl leading-relaxed opacity-75 max-w-3xl mb-16">
              MagicPin was scaling food delivery but had no control over it. Every order ran through third-party logistics providers — surge pricing we absorbed but couldn't predict, geographic coverage that gated our expansion, rider behaviour we couldn't influence, and delivery data we didn't own. The decision to build an in-house fleet platform wasn't a product bet. It was a strategic necessity.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ border: '1px solid var(--portfolio-border)' }}>

              {/* 01 — Surge pricing */}
              <div className="p-8 flex flex-col" style={{ borderRight: '1px solid var(--portfolio-border)', borderBottom: '1px solid var(--portfolio-border)' }}>
                <div className="text-[10px] tracking-widest opacity-65 mb-6">01 — COST CONTROL</div>
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
                  <div className="flex justify-between text-[9px] opacity-60 mb-4">
                    <span>6am</span>
                    <span>↑ Peak hours</span>
                    <span>10pm</span>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--portfolio-fg)', opacity: 0.25 }} />
                      <span className="text-[9px] opacity-65">3PL: surge cost absorbed by us</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#ef4444', opacity: 0.7 }} />
                      <span className="text-[9px] opacity-65">Peak: uncontrolled spike</span>
                    </div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--portfolio-border)' }} className="pt-5">
                  <p className="text-sm font-bold mb-2 tracking-tight">Surge pricing was a cost we fully absorbed</p>
                  <p className="text-xs leading-relaxed" style={{ opacity: 0.55 }}>With MagicFleet, we define the surge amount, control its duration, and choose whether to pass it to the customer or use it as a lever to attract more riders during peak hours.</p>
                </div>
              </div>

              {/* 02 — Routes */}
              <div className="p-8 flex flex-col" style={{ borderBottom: '1px solid var(--portfolio-border)' }}>
                <div className="text-[10px] tracking-widest opacity-65 mb-6">02 — ROUTE & RIDER CONTROL</div>
                <div className="flex-1 flex flex-col justify-center mb-6" style={{ minHeight: '120px' }}>
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <div className="text-[9px] opacity-65 mb-3">Before — rider's route</div>
                      <svg viewBox="0 0 100 48" className="w-full" style={{ height: '64px' }}>
                        <circle cx="12" cy="24" r="4" fill="#ef4444" opacity="0.7" />
                        <path d="M16,24 Q28,8 40,24 Q52,40 64,24 Q76,8 88,24" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeDasharray="4,2" opacity="0.55" />
                        <circle cx="88" cy="24" r="4" fill="#ef4444" opacity="0.7" />
                        <text x="50" y="44" fontSize="7" fill="currentColor" opacity="0.35" textAnchor="middle">longer · costlier</text>
                      </svg>
                    </div>
                    <div>
                      <div className="text-[9px] opacity-65 mb-3">After — optimised route</div>
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
                <div className="text-[10px] tracking-widest opacity-65 mb-6">03 — GEOGRAPHIC EXPANSION</div>
                <div className="flex-1 flex flex-col justify-center mb-6" style={{ minHeight: '120px' }}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-[9px] opacity-65 mb-2">3PL coverage</div>
                      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
                        {[1,1,0,0,0, 1,1,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0].map((a, i) => (
                          <div key={i} className="rounded-sm" style={{ aspectRatio: '1', background: a ? 'var(--portfolio-fg)' : 'var(--portfolio-border-strong)', opacity: a ? 0.3 : 0.1 }} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] opacity-65 mb-2">MagicFleet zones</div>
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
                <div className="text-[10px] tracking-widest opacity-65 mb-6">04 — RIDER ACCOUNTABILITY</div>
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

          <FadeUp delay={0.3} className="mt-12">
            <div className="grid md:grid-cols-3 gap-8 pt-12" style={{ borderTop: '1px solid var(--portfolio-border)' }}>
              <div>
                <div className="text-5xl md:text-6xl font-black text-[var(--portfolio-fg)] mb-2 tracking-tighter">300K+</div>
                <p className="text-sm md:text-base opacity-75">Registered riders on the platform</p>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-black text-[var(--portfolio-fg)] mb-2 tracking-tighter">50%</div>
                <p className="text-sm md:text-base opacity-75">Of all food delivery orders on MagicPin now run on MagicFleet</p>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-black text-[var(--portfolio-fg)] mb-2 tracking-tighter">7</div>
                <p className="text-sm md:text-base opacity-75">Major metros — Delhi NCR, Bengaluru, Pune, Hyderabad, Chennai, Kolkata, Mumbai</p>
              </div>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── BEAT 2: THE REAL PROBLEM ── */}
        <section id="cs-discovery">
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">DISCOVERY</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10">
              THE REAL<br />PROBLEM
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-lg md:text-xl leading-relaxed opacity-75 max-w-3xl mb-4">
              The brief was fleet management — dashboards for managers, cost controls, zone levers. But research kept pointing to riders. A manager can see the fleet, set zones, track payouts — but they can't make a rider move to a high-demand zone or accept a delivery. Only the rider can do that.
            </p>
            <p className="text-lg md:text-xl leading-relaxed opacity-75 max-w-3xl mb-16">
              So the design problem shifted — from building a fleet management tool to building something a rider on a bike, between drops, would actually reach for.
            </p>
          </FadeUp>

          {/* ── Competitor comparison ── */}
          <FadeUp delay={0.2} className="mb-16">
            <div className="text-xs tracking-widest opacity-65 mb-6">THE STRATEGIC UNLOCK</div>
            <div className="grid md:grid-cols-2 gap-0" style={{ border: '1px solid var(--portfolio-border)' }}>

              {/* Competitor side */}
              <div className="p-8" style={{ borderRight: '1px solid var(--portfolio-border)' }}>
                <div className="text-[10px] tracking-widest opacity-50 mb-5">INDUSTRY APPROACH</div>

                {/* Visual: grid of individual rider dots */}
                <div className="mb-6">
                  <div className="text-[9px] opacity-55 mb-3">1 activation = 1 rider</div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 rounded-full border flex items-center justify-center text-[8px]"
                          style={{ borderColor: 'var(--portfolio-border-strong)', opacity: 0.5 }}>
                          🛵
                        </div>
                        <div className="w-3 h-[1px]" style={{ background: 'var(--portfolio-fg)', opacity: 0.15 }} />
                        <div className="w-2 h-2 rounded-sm" style={{ background: '#ef4444', opacity: 0.4 }} />
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-1 opacity-40">
                      <div className="text-[10px] opacity-60">···</div>
                    </div>
                  </div>
                  <div className="text-[9px] opacity-45 italic">Each rider required a separate acquisition event</div>
                </div>

                <div style={{ borderTop: '1px solid var(--portfolio-border)' }} className="pt-5 space-y-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="opacity-55">App built for</span>
                    <span className="font-bold opacity-75">Riders only</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="opacity-55">Onboarding unit</span>
                    <span className="font-bold opacity-75">1 individual rider</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="opacity-55">Activation cost</span>
                    <span className="font-bold" style={{ color: '#ef4444' }}>High — per rider</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="opacity-55">To onboard 1,000 riders</span>
                    <span className="font-bold opacity-75">1,000 activations</span>
                  </div>
                </div>
              </div>

              {/* Our approach */}
              <div className="p-8">
                <div className="text-[10px] tracking-widest opacity-50 mb-5">OUR APPROACH</div>

                {/* Visual: manager nodes each connecting to rider clusters */}
                <div className="mb-6">
                  <div className="text-[9px] opacity-55 mb-3">1 manager = 100–2,000 riders</div>
                  <div className="space-y-3 mb-3">
                    {[
                      { riders: 8, label: '2,000 riders' },
                      { riders: 5, label: '500 riders'   },
                      { riders: 3, label: '100 riders'   },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center gap-3">
                        {/* Manager node */}
                        <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[9px] shrink-0 font-bold"
                          style={{ borderColor: '#22c55e', color: '#22c55e' }}>
                          M
                        </div>
                        {/* Arrow */}
                        <div className="text-[10px] opacity-40">→</div>
                        {/* Rider dots */}
                        <div className="flex items-center gap-1 flex-wrap">
                          {Array.from({ length: row.riders }).map((_, j) => (
                            <div key={j} className="w-5 h-5 rounded-full flex items-center justify-center text-[7px]"
                              style={{ background: 'var(--portfolio-border-strong)', opacity: 0.7 }}>
                              🛵
                            </div>
                          ))}
                          <span className="text-[8px] opacity-50 ml-1">{row.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-[9px] opacity-45 italic">One manager onboards their entire existing fleet</div>
                </div>

                <div style={{ borderTop: '1px solid var(--portfolio-border)' }} className="pt-5 space-y-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="opacity-55">App built for</span>
                    <span className="font-bold opacity-75">Riders + Managers</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="opacity-55">Onboarding unit</span>
                    <span className="font-bold opacity-75">Fleet (via manager)</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="opacity-55">Activation cost</span>
                    <span className="font-bold" style={{ color: '#22c55e' }}>Low — per fleet</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="opacity-55">To onboard 1,000 riders</span>
                    <span className="font-bold" style={{ color: '#22c55e' }}>2–10 manager relationships</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Callout stat */}
            <div className="mt-4 p-6" style={{ background: 'color-mix(in srgb, var(--portfolio-fg) 3%, transparent)', border: '1px solid var(--portfolio-border)' }}>
              <p className="text-sm md:text-base opacity-75 leading-relaxed">
                Riders aren't exclusive to any one platform — they work across Swiggy, Zomato, and others simultaneously, picking up orders wherever demand is that day. Some operate independently. Others are part of organized fleets, associated with a manager who allocates work, handles payouts, and coordinates schedules.
                <br /><br />
                That second group was the unlock. For riders who did have a manager, <strong className="opacity-100" style={{ color: 'var(--portfolio-fg)' }}>the trust relationship already existed</strong> — riders follow their manager's direction. A manager could tell their fleet: "MagicFleet orders are live, pick them up." And they would. We didn't need to build that trust from scratch. One manager relationship brought in hundreds of already-working riders at a fraction of the cost of acquiring them one by one.
              </p>
            </div>
          </FadeUp>

          {/* Personas */}
          <div className="grid md:grid-cols-2 gap-0 md:gap-8 mb-12">
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

          {/* User screens */}
          <FadeUp delay={0.15} className="mb-16">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] tracking-widest opacity-55 mb-3">FLEET MANAGER — APP SCREENS</div>
                <img
                  src="/case-studies/magicfleet/manager-screens.png"
                  alt="Fleet Manager app screens"
                  className="w-full rounded-lg object-contain"
                />
              </div>
              <div>
                <div className="text-[10px] tracking-widest opacity-55 mb-3">DELIVERY RIDER — APP SCREENS</div>
                <img
                  src="/case-studies/magicfleet/rider-screens.png"
                  alt="Delivery Rider app screens"
                  className="w-full rounded-lg object-contain"
                />
              </div>
            </div>
          </FadeUp>

          {/* What this meant for design */}
          <FadeUp delay={0.2}>
            <div className="text-xs tracking-widest opacity-65 mb-6">WHAT THIS MEANT FOR DESIGN</div>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ChallengeCard
              number="01"
              title="Onboarding Riders at Scale"
              description="We needed to grow rider supply fast across 7 metros simultaneously. Document verification, KYC, vehicle checks — done manually, this would bottleneck growth before it started."
              impact="Streamlined in-app onboarding flow for managers — step-by-step registration, document upload, instant status tracking. What took days dropped to a single guided session."
              delay={0}
            />
            <ChallengeCard
              number="02"
              title="Helping Riders Earn More Per Day"
              description="A rider earning more per day is a rider who stays. But riders had no visibility into where demand was highest or how to stack more orders into a single trip. They were flying blind."
              impact="Built surge zone maps, demand hour indicators, and multi-order trip support directly into the rider home screen. Orders per rider per month went from ~15 to ~28."
              delay={0.05}
            />
            <ChallengeCard
              number="03"
              title="Making Performance & Financials Legible"
              description="Riders couldn't see how their earnings were broken down or why their performance score changed. Without visibility, they had no way to improve — and no reason to trust the platform enough to stay."
              impact="Transparent earnings ledger (base pay, surge, bonuses, deductions — line by line) and a clear performance dashboard. Rider retention improved from 32% to 48%."
              delay={0.1}
            />
            <ChallengeCard
              number="04"
              title="Faster Support When Deliveries Go Wrong"
              description="When an issue arose, riders had to call a support number and wait. Every minute on hold was a delivery stalled and a rider frustrated."
              impact="In-app issue reporting with categorised types, photo evidence, and real-time status. Issue resolution time dropped from ~120 minutes to ~42 minutes."
              delay={0.15}
            />
          </div>
        </section>

        <Divider />

        {/* ── BEAT 3: THE CRAFT ── */}
        <section id="cs-craft">
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">CRAFT</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              HOW WE<br />DESIGNED IT
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-lg md:text-xl leading-relaxed opacity-75 max-w-3xl mb-16">
              One platform. Two very different users with opposite contexts. Fleet managers want aggregation and control. Riders want speed, clarity, and to not think. Every design decision had to work for both.
            </p>
          </FadeUp>

          {/* 3 Principles */}
          <div className="space-y-0 mb-16">
            {[
              {
                step: '01',
                title: 'Decision-First Design',
                body: 'Every screen was designed around a decision the user needed to make — not data they might want to see. We asked: what does this person need to act? Then we gave them exactly that. Hierarchy over completeness.',
              },
              {
                step: '02',
                title: 'Progressive Disclosure',
                body: 'Show the critical few at first glance. Drill down for detail. Riders on a bike have 3 seconds of attention between drops — the most important thing had to be unmissable, everything else had to be one tap away.',
              },
              {
                step: '03',
                title: 'Offline-First',
                body: 'Poor connectivity is the default for a rider on the road, not an edge case. The app had to feel fully functional even when sync was delayed. Data loads in the background; the interface never blocks.',
              },
            ].map((item, i) => (
              <FadeUp key={item.step} delay={i * 0.05}>
                <div className="py-8 grid md:grid-cols-[120px_1fr] gap-4 md:gap-12" style={{ borderTop: '1px solid var(--portfolio-border)' }}>
                  <div className="text-xs tracking-widest opacity-60 pt-1">{item.step}</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">{item.title}</h3>
                    <p className="opacity-75 leading-relaxed text-sm md:text-base">{item.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Information Hierarchy */}
          <FadeUp delay={0.2} className="mb-16">
            <div className="p-8 md:p-12" style={{ border: '1px solid var(--portfolio-border)', background: 'color-mix(in srgb, var(--portfolio-fg) 2%, transparent)' }}>
              <div className="text-xs tracking-widest opacity-65 mb-2">INFORMATION HIERARCHY MODEL</div>
              <p className="text-sm opacity-60 mb-6 max-w-xl">The pyramid defined what earned screen real estate. Critical = always visible. Important = above the fold. Contextual = one tap away. Nothing was placed without a reason.</p>
              <VizInfoHierarchy />
            </div>
          </FadeUp>

          {/* Feature cards — craft paired with screens */}
          <div className="grid gap-11">
            <FeatureCard
              number="01"
              title="Live GPS Tracking & Analytics"
              description="Real-time rider location with contextual analytics — not just where riders are, but what they're doing and predictive ETA for next deliveries. Managers see the fleet at a glance; riders see only what affects their next decision."
              insight="Context changes everything. Raw GPS coordinates are meaningless without understanding what the rider is actually doing."
              imageUrl="/case-studies/magicfleet/gps-tracking-screens.png"
              delay={0}
            />
            <FeatureCard
              number="02"
              title="Rider Earnings & Incentives"
              description="A transparent earnings dashboard showing real-time earnings, bonus structure, and performance feedback — broken down line by line. Riders who understand their earnings have a reason to improve them."
              insight="Transparency is a feature. When riders could see exactly what they earned and why, retention went from 32% to 48%."
              imageUrl="/case-studies/magicfleet/rider-earnings-screens.png"
              delay={0.1}
            />
            <FeatureCard
              number="03"
              title="Incident Reporting & Resolution"
              description="Low-friction in-app issue reporting with categorised problem types, photo evidence, and real-time status updates. Designed to handle 80% of cases without any human intervention."
              insight="Automating the routine freed up the team to focus on what actually needed judgment. Resolution time dropped from 120 to 42 minutes."
              imageUrl="/case-studies/magicfleet/incident-reporting-screens.png"
              delay={0.1}
            />
            <FeatureCard
              number="04"
              title="Rider Mobile App"
              description="Lightweight, offline-friendly, designed for one-handed use in motion. Current order, route, earnings, performance, feedback — in that priority order. Every extra tap had to be justified."
              insight="If it works for a rider checking his phone at a red light with one hand, it works everywhere. Design up from the hardest context."
              imageUrl="/case-studies/magicfleet/rider-mobile-app-screens.png"
              delay={0.2}
            />
          </div>
        </section>

        <Divider />

        {/* ── BEAT 4: WHAT SHIPPED & WHAT CHANGED ── */}
        <section id="cs-impact">
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">IMPACT</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              WHAT SHIPPED<br />& WHAT CHANGED
            </h2>
          </FadeUp>

          <div style={{ border: '1px solid var(--portfolio-border)' }}>
            {[
              {
                label: 'On-Time Delivery',
                context: 'Orders delivered within the promised window',
                before: '68%', after: '83%', delta: '+22%',
                barBefore: 68, barAfter: 83,
                note: '~1 in 3 late deliveries eliminated',
              },
              {
                label: 'Cost Per Order (CPO)',
                context: 'Fully-loaded cost per completed order',
                before: '₹68', after: '₹54', delta: '−21%',
                barBefore: 68, barAfter: 54,
                note: 'Surge control · route optimisation · multi-drop trips',
              },
              {
                label: 'Rider Retention',
                context: 'Riders still active 3 months after onboarding',
                before: '32%', after: '48%', delta: '+50%',
                barBefore: 32, barAfter: 48,
                note: 'Earnings transparency + performance feedback loop',
              },
              {
                label: 'Orders per Rider / Month',
                context: 'Orders completed per active rider monthly',
                before: '~15', after: '~28', delta: '+87%',
                barBefore: 38, barAfter: 70,
                note: 'Multi-drop routing · demand zone direction',
              },
              {
                label: 'Issue Resolution Time',
                context: 'Time from issue reported to resolved',
                before: '~120 min', after: '~42 min', delta: '−65%',
                barBefore: 100, barAfter: 35,
                note: 'In-app reporting replaced phone-based escalation',
              },
              {
                label: 'High Demand Zone Fulfilment',
                context: 'Orders fulfilled in designated high-demand zones',
                before: '36%', after: '74%', delta: '+106%',
                barBefore: 36, barAfter: 74,
                note: 'Zone incentives + surge levers directed rider supply',
              },
            ].map((m, i) => (
              <FadeUp key={m.label} delay={i * 0.05}>
                <div
                  className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-12 px-8 py-7 items-center"
                  style={{ borderBottom: i < 5 ? '1px solid var(--portfolio-border)' : undefined }}
                >
                  <div>
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-xs tracking-widest opacity-55">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-base md:text-lg font-bold tracking-tight">{m.label}</span>
                    </div>
                    <p className="text-sm opacity-60 mb-4 leading-snug">{m.context}</p>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--portfolio-border-strong)', opacity: 0.2 }}>
                        <div className="h-full rounded-full" style={{ width: `${m.barBefore}%`, background: 'var(--portfolio-fg)', opacity: 0.4 }} />
                      </div>
                      <span className="text-xs opacity-55 shrink-0 w-6">→</span>
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--portfolio-border-strong)', opacity: 0.2 }}>
                        <div className="h-full rounded-full" style={{ width: `${m.barAfter}%`, background: '#22c55e', opacity: 0.8 }} />
                      </div>
                    </div>
                    <p className="text-xs opacity-65 italic">{m.note}</p>
                  </div>
                  <div className="flex items-center gap-5 md:gap-8 shrink-0">
                    <div className="text-center">
                      <div className="text-[10px] tracking-widest opacity-60 mb-1.5">BEFORE</div>
                      <div className="text-2xl md:text-3xl font-black tracking-tight opacity-55">{m.before}</div>
                    </div>
                    <div className="text-xl opacity-45 font-light">→</div>
                    <div className="text-center">
                      <div className="text-[10px] tracking-widest opacity-65 mb-1.5">AFTER</div>
                      <div className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: '#22c55e' }}>{m.after}</div>
                    </div>
                    <div className="text-center pl-5 md:pl-8" style={{ borderLeft: '1px solid var(--portfolio-border)' }}>
                      <div className="text-[10px] tracking-widest opacity-65 mb-1.5">CHANGE</div>
                      <div className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: '#22c55e' }}>{m.delta}</div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── BEAT 5: HOW THE SYSTEM WORKS ── */}
        <section id="cs-system">
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">SYSTEM</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10">
              HOW THE SYSTEM<br />WORKS
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-lg md:text-xl leading-relaxed opacity-75 max-w-3xl mb-12">
              One codebase, one app — role determined at login. Riders get a lightweight, action-focused interface; managers get a fleet-level view. All order assignment and routing is automated in the backend — neither user sees or controls it directly. Built for eventual consistency, so the system always converges to the correct state even when connectivity drops.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <FadeUp delay={0.1}>
              <div className="border" style={{ borderColor: 'var(--portfolio-border-strong)', height: '220px' }}>
                <VizDataFlow />
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="border" style={{ borderColor: 'var(--portfolio-border-strong)', height: '220px' }}>
                <VizUserGroups />
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.2}>
            <div className="border" style={{ borderColor: 'var(--portfolio-border-strong)', height: '240px' }}>
              <VizPaymentSystem />
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── BEAT 6: WHAT THIS TAUGHT ME ── */}
        <section id="cs-reflection" className="pb-24 md:pb-32">
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">REFLECTION</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              WHAT THIS<br />TAUGHT ME
            </h2>
          </FadeUp>

          <div className="space-y-0 mb-16">
            {[
              {
                title: 'Offline is the default, not the edge case.',
                body: 'Riders are on the road. Poor connectivity is their normal state, not an exception. Designing offline-first from the beginning — not retrofitting it later — is what made the app feel reliable. A system that breaks when connectivity drops is a broken system.',
              },
              {
                title: 'Transparency is a behavioral lever.',
                body: 'When riders could see their earnings broken down line by line and their performance in real time, they improved. They made better decisions about when to be online, where to go, what to accept. Visibility changed behavior more than any incentive structure we designed.',
              },
              {
                title: "The most important design decision I made wasn't a screen.",
                body: 'Building in-house at all — owning the fleet data, the cost structure, the rider relationship — was what made everything else possible. Understanding why a product exists, the business constraint it solves, is what separates work that looks good from work that actually matters.',
              },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div className="py-10 grid md:grid-cols-[1fr_2fr] gap-4 md:gap-16" style={{ borderTop: '1px solid var(--portfolio-border)' }}>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight leading-snug opacity-90">{item.title}</h3>
                  <p className="opacity-75 leading-relaxed text-sm md:text-base">{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div className="p-8 md:p-12" style={{ border: '1px solid var(--portfolio-border-strong)', background: 'color-mix(in srgb, var(--portfolio-fg) 2%, transparent)' }}>
              <p className="text-2xl md:text-3xl font-bold leading-tight opacity-85">
                "The best design decision on MagicFleet wasn't a screen or an interaction — it was the decision to build at all."
              </p>
            </div>
          </FadeUp>
        </section>

        {/* ── FOOTER ── */}
        <section className="pb-24 md:pb-32">
          <FadeUp delay={0.1}>
            <div className="p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6" style={{ border: '1px solid var(--portfolio-border)', background: 'color-mix(in srgb, var(--portfolio-fg) 2%, transparent)' }}>
              <div>
                <p className="text-xs tracking-widest opacity-65 mb-2">CASE STUDIES</p>
                <p className="text-2xl md:text-3xl font-bold tracking-tight opacity-85">More work coming soon</p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 text-sm tracking-widest transition-all duration-300 whitespace-nowrap" style={{ border: '1px solid color-mix(in srgb, var(--portfolio-fg) 30%, transparent)' }} onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--portfolio-fg)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--portfolio-bg)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = ''; (e.currentTarget as HTMLButtonElement).style.color = ''; }}
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
