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
    <FadeUp delay={delay}>
      <div className="border border-black/15 p-6 md:p-8 hover:border-black/30 transition-colors duration-500">
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
  heroMockup: undefined, // INSERT: Hero mockup with dashboard, rider app, dispatch console
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
              Designed & built from scratch, an in-house last-mile fleet management platform that reduced third-party logistics dependency and scaled to 20K monthly active riders.
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
            <CaseImage
              src={IMG.impactMetrics}
              alt="Impact metrics breakdown"
              label="INSERT: Detailed impact metrics dashboard with time-series charts showing before/after operational performance"
              aspect="16/9"
            />
          </FadeUp>
        </section>

        <Divider />

        {/* ── CONTEXT ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">CONTEXT</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10">
              THE SCALE OF<br />LOGISTICS
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-12">
            <FadeUp delay={0.1}>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                magicFleet is Magicpin's internal fleet management platform, built to orchestrate tens of
                thousands of delivery riders across India's major cities. It handles rider onboarding,
                real-time GPS tracking, shift scheduling, performance management, payments, and compliance
                at a massive scale — managing millions of deliveries every month.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                The platform powers three critical user groups: fleet managers who oversee regional operations,
                dispatchers who manage real-time assignment and routing, and riders who execute deliveries.
                Each user group has fundamentally different needs, but all must work together in real-time to
                ensure operational success.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.3} className="mt-12 pt-12 border-t border-black/15">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-5xl md:text-6xl font-black text-[var(--portfolio-fg)] mb-2 tracking-tighter">100k+</div>
                <p className="text-sm md:text-base opacity-75">Active delivery riders across cities</p>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-black text-[var(--portfolio-fg)] mb-2 tracking-tighter">15+</div>
                <p className="text-sm md:text-base opacity-75">Major cities with operations</p>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-black text-[var(--portfolio-fg)] mb-2 tracking-tighter">Millions</div>
                <p className="text-sm md:text-base opacity-75">Deliveries coordinated monthly</p>
              </div>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── THE CHALLENGE ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">THE CHALLENGE</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              OPERATIONAL CHAOS<br />AT SCALE
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              Real-time logistics is inherently chaotic. Managing 100k+ riders requires visibility,
              decisiveness, and the ability to respond instantly to changing conditions.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ChallengeCard
              number="01"
              title="Data Overload"
              description="Fleet managers faced overwhelming amounts of real-time data with no clear hierarchy or priority. GPS coordinates, rider status, delivery progress, metrics — all equally emphasized, making decisions harder, not easier."
              impact="Without clear data prioritization, managers made slower decisions, missed critical issues, and couldn't respond quickly to operational problems."
              imageUrl={IMG.dashboardOverview}
              delay={0}
            />
            <ChallengeCard
              number="02"
              title="Real-Time Visibility Gaps"
              description="Live tracking existed but lacked context — where riders were didn't matter if you couldn't understand why they were there or what they were doing. Historical data and current state weren't connected."
              impact="Dispatchers couldn't make intelligent routing decisions, leading to inefficient assignments and longer delivery times."
              imageUrl={IMG.liveTracking}
              delay={0.05}
            />
            <ChallengeCard
              number="03"
              title="Multi-Role UX Complexity"
              description="Each user group (managers, dispatchers, riders) had different workflows, but were using scattered tools. Workflows weren't integrated, causing friction and context switching."
              impact="Operational efficiency suffered as teams wasted time switching between systems instead of focusing on deliveries."
              imageUrl={IMG.shifScheduling}
              delay={0.1}
            />
            <ChallengeCard
              number="04"
              title="Offline & Connectivity Constraints"
              description="Riders often worked in areas with poor connectivity. The system couldn't sync data reliably, causing failed deliveries to go unreported and creating blind spots for managers."
              impact="Lost visibility into delivery status meant operational decisions were made with incomplete information, reducing reliability."
              imageUrl={IMG.incidentReporting}
              delay={0.15}
            />
          </div>

          {/* HMW */}
          <FadeUp delay={0.2} className="mt-12">
            <div className="border border-black/20 p-8 md:p-12 bg-black/[0.02]">
              <div className="text-xs tracking-widest opacity-65 mb-4">CORE QUESTION</div>
              <p className="text-2xl md:text-4xl font-bold leading-tight opacity-90">
                "How can we give fleet managers and dispatchers the real-time visibility and decision-making
                tools they need to orchestrate 100k+ riders reliably and efficiently?"
              </p>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── GOALS ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">DESIGN GOALS</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              DESIGNING FOR<br />RELIABILITY
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Real-Time Decision Support',
                body: 'Provide managers and dispatchers with the most critical information first — sorted by relevance and urgency, not volume. Enable decisions in seconds, not minutes.',
              },
              {
                title: 'Multi-Role Integration',
                body: 'Connect workflows across managers, dispatchers, and riders. What one role does should directly impact the others, eliminating context switching and information silos.',
              },
              {
                title: 'Offline-First Architecture',
                body: 'Design for the reality of poor connectivity. Critical data should sync reliably, and the system should function offline, syncing when connectivity returns.',
              },
              {
                title: 'Scalable Data Visualization',
                body: 'As scale grows, visualizations must grow with it. Show individual rider status when needed, aggregate to fleet-level insights when necessary.',
              },
              {
                title: 'Incident Management & Recovery',
                body: 'Build systems that surface issues early and provide rapid response tools. When incidents happen, ensure recovery is fast and well-coordinated.',
              },
              {
                title: 'Rider Empowerment',
                body: 'Riders are not just executors — give them visibility into their performance, earnings, and feedback. Better-informed riders perform better and stay longer.',
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
            <div className="text-xs tracking-widest opacity-65 mb-4">USER RESEARCH</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              THREE USER<br />ARCHETYPES
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              magicFleet serves three distinct user groups, each with different workflows, constraints, and needs.
              Each one requires a tailored experience, but all three must work in seamless concert.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-0 md:gap-8">
            <UserPersonaCard
              role="Fleet Manager"
              description="Responsible for 5k–15k riders across a city. Needs regional overview, performance analytics, and the ability to identify and resolve operational issues."
              painPoint="I need to see the health of my entire fleet at a glance — on-time rates, incident count, driver churn — so I can spot problems before they cascade."
              delay={0}
            />
            <UserPersonaCard
              role="Dispatcher"
              description="Manages real-time assignment and routing for 500–1000 active riders. Works under pressure to optimize assignments for speed and cost."
              painPoint="Give me the right rider for the right delivery, right now. I need to see availability, location, current load, and historical performance instantly."
              delay={0.1}
            />
            <UserPersonaCard
              role="Delivery Rider"
              description="The frontline of operations. Executes deliveries, manages their schedule, and tracks earnings. Often works in poor connectivity areas with limited mobile data."
              painPoint="I want to know what I'm earning, when my next delivery is, and how I'm performing. Keep it simple — I'm on the move, not in an office."
              delay={0.2}
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
              <p className="text-sm opacity-75 mb-4">DESIGN SCREEN PLACEHOLDER</p>
              <CaseImage
                src={undefined}
                alt="Information hierarchy diagram"
                label="INSERT: Visual diagram showing information hierarchy (Critical → Important → Contextual) with dashboard mockup examples"
                aspect="16/9"
              />
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
              title="Fleet Manager Dashboard"
              description="A comprehensive operational dashboard that gives fleet managers instant visibility into regional performance. Shows real-time metrics, alerts, and drill-down capability into specific issues."
              insight="Reduce decision time from 15 minutes to under 60 seconds by showing only the metrics that matter for immediate action."
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
                magicFleet operates as an integrated ecosystem. Real-time rider location data flows into the central
                dashboard, enabling dispatchers to make instant assignment decisions. Those assignments update rider
                apps instantly (when connectivity allows) or queue for sync when offline. Performance metrics aggregate
                at the fleet level, alerting managers to issues before they become critical.
              </p>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                The system is built for <strong className="text-[var(--portfolio-fg)] opacity-100">eventual consistency</strong> — accepting
                that not all data will be immediately synchronized, but ensuring that the system converges to the
                correct state. This is essential for reliability in poor connectivity environments.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <CaseImage
                src={IMG.systemArchitecture}
                alt="magicFleet System Architecture"
                label="INSERT: Data flow diagram showing Riders → Central Hub → Manager Dashboard with sync queues and offline storage"
                aspect="1/1"
              />
            </FadeUp>
          </div>

          {/* Platform Overview Infographic */}
          <FadeUp delay={0.3} className="mt-12">
            <div className="border border-black/15 p-8 md:p-12">
              <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">Platform Ecosystem Overview</h3>
              <p className="text-sm opacity-75 mb-4">DESIGN SCREEN PLACEHOLDER</p>
              <CaseImage
                src={undefined}
                alt="Platform ecosystem diagram"
                label="INSERT: Diagram showing 3 user groups (Manager/Dispatcher/Rider) with their core screens and data flows between them"
                aspect="16/9"
              />
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
            <CaseImage
              src={IMG.paymentSystem}
              alt="Payment and Incentives Dashboard"
              label="INSERT: Payment system and incentive dashboard"
              aspect="16/9"
            />
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
              title="Simplify for the Busy User"
              body="Dispatchers have 5 seconds to make a decision. Managers check the dashboard between meetings. Riders check phones while riding. Every screen must answer one question clearly."
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
              title="The Middle Role is Critical"
              body="Dispatchers bridge managers and riders. Optimize for them first — if dispatchers have the tools they need, riders and managers benefit. Neglect them, and the whole system breaks."
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
                Building systems at scale is fundamentally different from building consumer products. The constraints are tighter, the stakes are higher, and the impact is more immediate.
              </p>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                magicFleet taught me that good design in logistics isn't about making things pretty — it's about
                making 100,000 people more efficient, more informed, and ultimately more successful. Every small
                decision compounds across millions of transactions. Design with that weight in mind.
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
