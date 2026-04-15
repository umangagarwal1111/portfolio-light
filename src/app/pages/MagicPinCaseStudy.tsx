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
      <div className="border border-black/15 p-6 md:p-8">
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
                className="h-2 rounded-full bg-green-500/20"
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
      <div className="border border-black/15 hover:border-black/20 transition-colors duration-500 overflow-hidden">
        {/* Screenshot evidence */}
        <CaseImage
          src={imageUrl}
          alt={`Problem ${number}: ${title}`}
          label={`BEFORE — ${title.toUpperCase()} (export from Figma node 47:${number === '01' ? '1263' : number === '02' ? '4485' : number === '03' ? '5287' : '6088'})`}
          aspect="3/2"
          className="border-b border-black/15"
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

// ── Archetype card ───────────────────────────────────────────────
function ArchetypeCard({
  name,
  description,
  todo,
  delay = 0,
}: {
  name: string;
  description: string;
  todo: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border-t border-black/15 pt-8">
        <div className="text-xs tracking-widest opacity-60 mb-3">USER ARCHETYPE</div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{name}</h3>
        <p className="opacity-75 leading-relaxed mb-6 text-sm md:text-base">{description}</p>
        <div className="bg-black/[0.04] p-4 border-l-2 border-black/30">
          <div className="text-xs tracking-widest opacity-65 mb-2">TO DO</div>
          <p className="text-sm opacity-75 leading-relaxed italic">"{todo}"</p>
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
      <div className="mt-4 text-[9px] opacity-40 text-center">Each phase built on the previous · Metrics compounded over 4 quarters</div>
    </div>
  );
}

function VizDesignProcess() {
  const steps = [
    { label: 'Design Sprint', duration: '2 weeks', output: 'Problem definition + HMW' },
    { label: 'User Flows', duration: '1 week', output: 'End-to-end user journeys' },
    { label: 'Sketching', duration: '1 week', output: 'Low-fi concepts × 20+' },
    { label: 'Early Design', duration: '2 weeks', output: 'Mid-fi wireframes' },
    { label: 'Iteration', duration: 'Ongoing', output: '3 rounds of feedback' },
    { label: 'Usability Testing', duration: '1 week', output: '12 user sessions' },
    { label: 'Phased Release', duration: '4 quarters', output: 'Staged rollout' },
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
    </div>
  );
}

function VizBeforeAfterScreens() {
  const screens = [
    { name: 'Shop Page', before: 'Generic feed, no personalization', after: 'Personalized sections, +32% AOV' },
    { name: 'Deals Tab', before: 'Flat list, hard to scan', after: 'Categorized + proximity sort, +65% CVR' },
    { name: 'Merchant Page', before: 'Dense info, low trust signals', after: 'Structured hierarchy, +25% voucher use' },
    { name: 'Transaction History', before: 'Table view, no context', after: 'Timeline view with savings highlights' },
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

// Image sources — drop exported files into public/case-studies/magicpin/
// and uncomment each line. Export nodes from Figma file eOlrNDmrH4DhyApKv9f3mD
const IMG: Record<string, string | undefined> = {
  heroFinalDesigns: '/magicpin-revamp-hero.png',
  problem1:         undefined, // node 47:1263 → problem1.jpg
  problem2:         undefined, // node 47:4485 → problem2.jpg
  problem3:         undefined, // node 47:5287 → problem3.jpg
  problem4:         undefined, // node 47:6088 → problem4.jpg
  impact:           undefined, // node 48:6957 → impact.jpg
  hmw:              undefined, // node 47:6888 → hmw.jpg
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

        {/* ── IMPACT METRICS ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">IMPACT</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              NUMBERS THAT<br />MOVED THE NEEDLE
            </h2>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <StatCard number="+32%" label="Increase in average order value (AOV)" delay={0} />
            <StatCard number="+80%" label="Increase in category selection on app launch" delay={0.05} />
            <StatCard number="+65%" label="Conversion on personalised sections & widgets" delay={0.1} />
            <StatCard number="+50%" label="Increase in user onboarding" delay={0.15} />
            <StatCard number="+30%" label="Increase in daily active users (DAU)" delay={0.2} />
            <StatCard number="+12%" label="Increase in retention rate" delay={0.25} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <StatCard number="+50%" label="SMS permission rate" delay={0.3} />
            <StatCard number="+32%" label="magicPay conversions" delay={0.35} />
            <StatCard number="+25%" label="Voucher redemptions" delay={0.4} />
          </div>

          <div className="mt-10">
            <ImpactMetricsDisplay delay={0.45} />
          </div>

          {/* Impact breakdown visualization */}
          <FadeUp delay={0.5} className="mt-10">
            <div className="aspect-video border" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
              <VizPhasedMetrics />
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
                magicPin is a customer-centric hyperlocal marketplace, linking retailers to customers
                in a way that revolutionises commerce and helps consumers save. By connecting
                retailers big and small with customers, magicPin creates value for all in the hyperlocal
                retail ecosystem.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                This revamp is one of the largest projects at magicPin since 2020. I led the design
                as Senior Product Designer, collaborating with multiple product designers and product
                managers throughout the project spanning from Jan 2022 to present.
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
              SINCE 2015, THE APP<br />EXPERIENCE HADN'T CHANGED.
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              Four core problems were holding back growth and user experience.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ProblemCard
              number="01"
              title="No Relevancy"
              sample="The app showed non-veg items as cross-sell even to users who had only ever ordered veg — every session felt impersonal."
              impact="Irrelevant content directly reduced conversion. Users left faster, spent less."
              imageUrl={IMG.problem1}
              delay={0}
            />
            <ProblemCard
              number="02"
              title="No Defined Journey"
              sample="Multiple CTAs existed for a single action — users could trigger an Earn transaction in too many ways."
              impact="Without a clear journey, users got lost and the app missed chances to build habitual behaviour."
              imageUrl={IMG.problem2}
              delay={0.05}
            />
            <ProblemCard
              number="03"
              title="Weak Brand Perception"
              sample="App messaging gave users the impression of low quality. Voucher codes like 'ZXCVBNMASDF' — no brand voice, no emotional connect."
              impact="A product without strong branding is just another app. Trust and desirability suffered."
              imageUrl={IMG.problem3}
              delay={0.1}
            />
            <ProblemCard
              number="04"
              title="Inconsistent Experience"
              sample="Design components looked different across pages. When one broke, it caused misbehaviour across the entire app."
              impact="Without a mature design system, the team was always building on shaky foundations."
              imageUrl={IMG.problem4}
              delay={0.15}
            />
          </div>

          {/* HMW */}
          <FadeUp delay={0.2} className="mt-12">
            <div className="border border-black/20 p-8 md:p-12 bg-black/[0.02]">
              <div className="text-xs tracking-widest opacity-65 mb-4">HOW MIGHT WE</div>
              <p className="text-2xl md:text-4xl font-bold leading-tight opacity-90">
                "How can we improve our app experience to help customers save more in their
                day-to-day expenses?"
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
              },
              {
                title: 'Increase Relevant Content',
                body: 'Work with analytics and engineering to build a recommendation engine based on past purchase behaviour, activities, and interests.',
              },
              {
                title: 'Consistent Consumer Experience',
                body: 'Build a proper design system to reduce technical debt and deliver a consistent experience across every touchpoint.',
              },
              {
                title: 'Strengthen Value Proposition',
                body: 'Go beyond just savings. Build a habit-forming shopping experience while strengthening product discovery on the app.',
              },
              {
                title: 'Operational Efficiency',
                body: 'Build scalable design components that work across all flows, enabling faster design and development at scale.',
              },
            ].map((goal, i) => (
              <FadeUp key={goal.title} delay={i * 0.05}>
                <div className="border-t border-black/15 pt-6 pb-2">
                  <h3 className="text-lg md:text-xl font-bold mb-2 tracking-tight">{goal.title}</h3>
                  <p className="opacity-75 leading-relaxed text-sm md:text-base">{goal.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── USERS ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">RESEARCH</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              WHO WE<br />DESIGNED FOR
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              Before starting, we collected existing behaviour and purchase data and ran a series of customer interviews.
              We defined 3 user archetypes mapped to their jobs-to-be-done.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-0 md:gap-8">
            <ArchetypeCard
              name="The Daily Diner"
              description="An early adopter seeking convenience. A power magicPay user who values instant cash savings when going out."
              todo="During my visit to restaurants and cafes with my friends, I want to pay through my mobile while I save extra on every deal."
              delay={0}
            />
            <ArchetypeCard
              name="The Picky Saver"
              description="A habitual magicPin voucher user who spends more time looking for a deal than doing the actual shopping."
              todo="When she wants to go shopping, she would spend more time browsing offers than time spent purchasing the product."
              delay={0.1}
            />
            <ArchetypeCard
              name="The Experimental Foodie"
              description="More spontaneous and open to trying new places and foods. Discovery is the whole point."
              todo="When she doesn't know what to eat, she likes to browse and explore new restaurants and dishes to experience with friends."
              delay={0.2}
            />
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
                body: 'We ran design sprints to facilitate collaboration across all departments — product designers, PMs, creatives, and tech. The purpose was to align everyone on the same goal: to improve customer experience by solving user problems as quickly and effectively as possible.',
              },
              {
                step: '02',
                title: 'User Flows',
                body: 'We mapped user journeys on the app with the core idea of making it easier for users to convert, transact, and engage. Each flow was documented with expected changes listed against each screen.',
              },
              {
                step: '03',
                title: 'Sketching & Ideation',
                body: 'Sketched out multiple user flows to visualise ideas quickly. The main focus was generating as many ideas as possible and filtering afterwards. Early sketches covered the category page, product page, merchant page, and more.',
              },
              {
                step: '04',
                title: 'Early Designs & Iteration',
                body: 'Many rounds of mid-fidelity and high-fidelity design. Reasons for iteration included business perspective changes, roadmap shifts, new product introductions, and the impact of the pandemic. The Shop Page, Deals Tab, Collection, and Merchant Page all went through extensive iteration.',
              },
              {
                step: '05',
                title: 'Usability Testing',
                body: 'We validated designs with real users — all conducted in-house and sometimes over video calls. We tested with 10+ users at a time in a controlled environment, iterating based on findings before moving to final designs.',
              },
              {
                step: '06',
                title: 'Phased Releases',
                body: 'As one of the largest projects at magicPin, we released the new designs in phases. This let both designers and developers manage expected and unexpected issues as we shipped new products — reducing risk at each release.',
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

          {/* Design Process Visualization */}
          <FadeUp delay={0.35} className="mt-12">
            <div className="border border-black/15 p-8 md:p-12">
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
                magicDS (magic Design System) is a scalable design system that saves time and reduces
                technical debt over time. It solves the problem of inconsistent components and user experience
                across the entire app.
              </p>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                magicDS consists of <strong className="text-[var(--portfolio-fg)] opacity-100">150+ components</strong> with
                properly defined typography styles, icons, and colours. Everything in the app is made up of
                these modular components — giving a consistent UI across all screens. The system continues
                to mature and evolve as the product grows.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="grid grid-cols-3 gap-4">
                {['150+\nComponents', 'Defined\nTypography', 'Consistent\nColours', 'Scalable\nIcons', 'Modular\nSystem', 'Reduced\nTech Debt'].map((item) => (
                  <div key={item} className="border border-black/15 p-4 text-center">
                    <p className="text-xs opacity-75 whitespace-pre-line leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Design System Components Showcase */}
          <FadeUp delay={0.3}>
            <div className="border border-black/15 p-8 md:p-12">
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
            <div className="text-xs tracking-widest opacity-65 mb-4">FINAL DESIGNS</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              KEY DESIGN<br />DECISIONS
            </h2>
          </FadeUp>

          {/* Final designs showcase */}
          <FadeUp delay={0.05} className="mb-12">
            <CaseImage
              src={IMG.heroFinalDesigns}
              alt="magicPin final designs — Shop, Magic9, Deals, Merchant pages"
              label="FINAL DESIGNS — Personalized Shop Page · Magic9 · Offers Tab · Merchant Page (export from Figma node 82:2537)"
              aspect="16/7"
              contain
            />
          </FadeUp>

          {/* Key Design Screens - Individual showcases */}
          <FadeUp delay={0.1} className="mb-12">
            <div className="border border-black/15 p-8 md:p-12">
              <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">Core Screen Redesigns</h3>
              <div className="aspect-video border" style={{ borderColor: 'var(--portfolio-border-strong)' }}>
                <VizBeforeAfterScreens />
              </div>
            </div>
          </FadeUp>

          <div className="space-y-6">
            {[
              {
                title: 'Personalised Shop Page',
                body: 'The shop page was redesigned to be personalised for each user — content, recommendations, and layout adapt to individual behaviour and purchase history. Multiple design directions were explored; the final version balanced personalisation with scalability.',
              },
              {
                title: 'Optimised Offers Tab',
                body: 'The old "Redeem" tab was replaced with the "Offers" tab — enabling users to discover new merchant collections, products, and events. Instead of asking users which category they want to explore, we ask what they want to do. Personalised offers are surfaced automatically.',
              },
              {
                title: 'Scalable Collection Pages',
                body: 'Collection pages show recommended offers, deals, or merchants. Designed to be scalable enough for the operations team to create customised collection pages based on user data — reducing manual labour and making it easier for users to browse related content.',
              },
              {
                title: 'Unified Merchant Page',
                body: 'With multiple transaction types per merchant (vouchers, product ordering), a single scalable merchant page was designed to handle both. One page for all offers, deals, and product catalogue — reducing confusion and increasing conversion.',
              },
              {
                title: 'Delightful Microcopy & Illustrations',
                body: 'Simple, conversational copy and 3D illustrations were introduced throughout — especially in empty states, error screens, and loading moments. These are often overlooked, but they form stronger connections with users and reinforce brand personality.',
              },
              {
                title: 'Transaction History & Bookmarks',
                body: 'Users can now see monthly and lifetime savings in one place, track any transaction, and claim rewards. Bookmarks allow saving favourite items, brands, or events — all in one organised place.',
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
              title="Adapt to Changing Behaviour"
              body="Stay grounded and focused on the goal, but account for changes in product that match the evolving behaviour of customers. Rigidity kills good products."
              delay={0}
            />
            <LearningCard
              title="Products Don't Exist in a Vacuum"
              body="A major UX revamp affected internal processes — search tagging, operations tooling, and more. Without collaborating with those teams and evolving their tools too, the revamp would have been beautiful but broken."
              delay={0.05}
            />
            <LearningCard
              title="Take It in Phases"
              body="Break complicated designs into small, manageable tasks. This makes it easier for both designers and developers to handle expected and unexpected issues — and ship with confidence."
              delay={0.1}
            />
          </div>
        </section>

        <Divider />

        {/* ── FOOTER / NEXT ── */}
        <section className="pb-24 md:pb-32">
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-8">WHAT'S NEXT</div>
            <div className="grid md:grid-cols-3 gap-4 text-sm opacity-75 mb-16">
              <div className="border-t border-black/15 pt-4">Bug fixes — post-launch, issues are inevitable at this scale.</div>
              <div className="border-t border-black/15 pt-4">Post-launch optimisation using actionable data insights to continue designing better experiences.</div>
              <div className="border-t border-black/15 pt-4">Continue following the roadmap and sticking to brand guidelines as the design system matures.</div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="border border-black/15 p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/[0.02]">
              <div>
                <p className="text-xs tracking-widest opacity-65 mb-2">UP NEXT</p>
                <p className="text-2xl md:text-3xl font-bold tracking-tight opacity-85">More case studies coming soon</p>
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
