import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';

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

// ── Timeline comparison chart ───────────────────────────────────
function TimelineComparison({
  delay = 0,
}: {
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border border-black/15 p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold mb-8 tracking-tight">Development Cycle Compression</h3>
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-sm font-medium whitespace-nowrap">Traditional</span>
              <motion.div
                className="h-3 rounded-full bg-red-500/30 flex-1"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="h-full rounded-full bg-red-500" />
              </motion.div>
              <span className="text-sm font-bold whitespace-nowrap">2 months</span>
            </div>
            <p className="text-xs opacity-60 ml-[calc(120px)]">Design → Dev → Test → Launch</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-sm font-medium whitespace-nowrap">With AI</span>
              <motion.div
                className="h-3 rounded-full bg-green-500/30 flex-1"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="h-full rounded-full bg-green-500" style={{ width: '15%' }} />
              </motion.div>
              <span className="text-sm font-bold whitespace-nowrap">3-4 days</span>
            </div>
            <p className="text-xs opacity-60 ml-[calc(120px)]">Parallel Figma + Codex workflow</p>
          </motion.div>

          <div className="border-t border-black/15 pt-4 text-center">
            <div className="text-3xl font-black text-green-500">80% Reduction</div>
            <p className="text-xs opacity-60 mt-2">From 60 days to 3-4 days per game</p>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

// ── Engagement metrics visualization ────────────────────────────
function EngagementMetrics({
  delay = 0,
}: {
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border border-black/15 p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold mb-8 tracking-tight">Engagement Impact Across Cohorts</h3>
        <div className="space-y-4">
          {[
            { cohort: 'New Users', before: 2.1, after: 21, icon: '👤' },
            { cohort: 'Active Players', before: 4.5, after: 45, icon: '🎮' },
            { cohort: 'Long-term Retention', before: 8.2, after: 82, icon: '📈' },
          ].map((item, i) => (
            <motion.div key={item.cohort} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-bold flex-1">{item.cohort}</span>
                <div className="flex gap-4">
                  <span className="text-xs opacity-60">Before: {item.before}%</span>
                  <span className="text-xs font-bold text-green-500">After: {item.after}%</span>
                </div>
              </div>
              <motion.div
                className="h-2 rounded-full bg-black/10"
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.after / 100) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: (i + 1) * 0.1 }}
              >
                <div className="h-full rounded-full bg-green-500" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeUp>
  );
}

// ── Impact transformation hero (before/after visual) ────────────────
function ImpactTransformationHero({
  delay = 0,
}: {
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border border-black/15 overflow-hidden">
        {/* Main comparison grid */}
        <div className="grid md:grid-cols-2 divide-x divide-black/15">
          {/* BEFORE */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-red-500/5 to-transparent">
            <div className="text-xs tracking-widest opacity-60 mb-6 uppercase">Before AI Integration</div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay }}
                className="flex items-start gap-4"
              >
                <div className="text-3xl">⏱️</div>
                <div className="flex-1">
                  <div className="text-4xl font-black text-red-500/60 mb-2">60</div>
                  <p className="text-sm opacity-75">Days to launch one game</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="text-3xl">🎮</div>
                <div className="flex-1">
                  <div className="text-lg font-black text-red-500/60 mb-2">~0.5 games/month</div>
                  <p className="text-xs opacity-75">~1 every 2 months</p>
                  <div className="flex gap-1 mt-2">
                    {[1].map((i) => (
                      <div key={i} className="w-6 h-6 bg-red-500/30 rounded" />
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="text-3xl">🔗</div>
                <div className="flex-1">
                  <div className="text-4xl font-black text-red-500/60 mb-2">Sequential</div>
                  <p className="text-sm opacity-75">Design → Dev → Test (bottlenecks)</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="text-3xl">😫</div>
                <div className="flex-1">
                  <div className="text-4xl font-black text-red-500/60 mb-2">Burnout</div>
                  <p className="text-sm opacity-75">Manual iteration, repetitive work</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="text-3xl">⚠️</div>
                <div className="flex-1">
                  <div className="text-4xl font-black text-red-500/60 mb-2">Risk</div>
                  <p className="text-sm opacity-75">Long feedback loops, high failure rate</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* AFTER */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-green-500/5 to-transparent">
            <div className="text-xs tracking-widest opacity-60 mb-6 uppercase">After AI Integration</div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="text-3xl">⚡</div>
                <div className="flex-1">
                  <div className="text-4xl font-black text-green-500 mb-2">3-4</div>
                  <p className="text-sm opacity-75">Days to launch one game</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="text-3xl">🎯</div>
                <div className="flex-1">
                  <div className="text-lg font-black text-green-500 mb-2">5+ games/month</div>
                  <p className="text-xs opacity-75">60+ per year from team</p>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: delay + 0.3 + i * 0.08 }}
                        className="w-6 h-6 bg-green-500/40 rounded"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="text-3xl">🔀</div>
                <div className="flex-1">
                  <div className="text-4xl font-black text-green-500 mb-2">Parallel</div>
                  <p className="text-sm opacity-75">Figma Make + Codex work simultaneously</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="text-3xl">🔥</div>
                <div className="flex-1">
                  <div className="text-4xl font-black text-green-500 mb-2">Energized</div>
                  <p className="text-sm opacity-75">AI handles grunt work, team focuses on creativity</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.6 }}
                className="flex items-start gap-4"
              >
                <div className="text-3xl">📊</div>
                <div className="flex-1">
                  <div className="text-4xl font-black text-green-500 mb-2">Data-Driven</div>
                  <p className="text-sm opacity-75">Fast iteration = rapid user feedback loops</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Impact summary footer */}
        <div className="border-t border-black/15 p-8 md:p-12 bg-gradient-to-r from-green-500/5 via-transparent to-transparent">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.6 }}
              className="text-center"
            >
              <div className="text-4xl mb-3">🚀</div>
              <div className="text-5xl font-black text-green-500 mb-2">95%</div>
              <p className="text-sm opacity-75">Faster time to market</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.7 }}
              className="text-center"
            >
              <div className="text-4xl mb-3">📈</div>
              <div className="text-5xl font-black text-green-500 mb-2">10x</div>
              <p className="text-sm opacity-75">More output from same team</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.8 }}
              className="text-center"
            >
              <div className="text-4xl mb-3">🌌</div>
              <div className="text-5xl font-black text-green-500 mb-2">∞</div>
              <p className="text-sm opacity-75">Scalability potential unlocked</p>
            </motion.div>
          </div>
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
  imageUrl,
  delay = 0,
}: {
  number: string;
  title: string;
  description: string;
  imageUrl?: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border border-black/15 hover:border-black/20 transition-colors duration-500 overflow-hidden">
        <CaseImage
          src={imageUrl}
          alt={`${title}`}
          label={`INSERT: ${title.toUpperCase()} SCREENSHOT`}
          aspect="16/9"
          className="border-b border-black/15"
          contain
        />
        <div className="p-6 md:p-8">
          <div className="text-xs tracking-widest opacity-60 mb-4">{number}</div>
          <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">{title}</h3>
          <p className="text-sm md:text-base opacity-75 leading-relaxed">{description}</p>
        </div>
      </div>
    </FadeUp>
  );
}

// ── Feature card ──────────────────────────────────────────────────
function FeatureCard({
  number,
  title,
  description,
  imageUrl,
  delay = 0,
}: {
  number: string;
  title: string;
  description: string;
  imageUrl?: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div className="border border-black/15 hover:border-black/20 transition-colors duration-500 overflow-hidden">
        <CaseImage
          src={imageUrl}
          alt={`${title}`}
          label={`INSERT: ${title.toUpperCase()}`}
          aspect="16/9"
          className="border-b border-black/15"
          contain
        />
        <div className="p-6 md:p-8">
          <div className="text-xs tracking-widest opacity-60 mb-4">{number}</div>
          <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">{title}</h3>
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
      <div className="border border-black/15 p-6 md:p-8">
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

// ── Image placeholders ─────────────────────────────────────────────
const IMG: Record<string, string | undefined> = {
  heroMockup: undefined, // INSERT: Hero mockup showing AI game design workflow
  timeline: undefined, // INSERT: Timeline showing 2 months → 2 weeks → 3-4 days
  beforeAfter: undefined, // INSERT: Before and after comparison of game design speed
  engagement: undefined, // INSERT: Engagement metrics chart (10x increase)
  workflow: undefined, // INSERT: AI workflow diagram (Figma Make + Codex integration)
  gameExamples: undefined, // INSERT: Screenshots of games created with new workflow
  metrics: undefined, // INSERT: Detailed metrics dashboard
  figmaScreen: undefined, // INSERT: Figma design interface screenshot
  codexIntegration: undefined, // INSERT: Codex integration example
};

// ── MAIN PAGE ────────────────────────────────────────────────────
export default function AIGameDesignCaseStudy() {
  const navigate = useNavigate();
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
          <span className="text-xs tracking-widest opacity-65">CASE STUDY</span>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── HERO ── */}
        <section className="pt-36 md:pt-44 pb-16 md:pb-24">
          <FadeUp>
            <div className="flex flex-wrap gap-6 mb-10 text-xs tracking-widest opacity-65">
              <span>2026</span>
              <span>·</span>
              <span>GAME DESIGN & AI INTEGRATION</span>
              <span>·</span>
              <span>PRODUCT INNOVATION</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black leading-none tracking-tighter mb-8">
              AI-POWERED<br />GAME DESIGN
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg md:text-2xl max-w-3xl leading-relaxed opacity-75">
              How we reduced game development time by 80% while increasing user engagement 10x
              by integrating AI tools into our design and development workflow.
            </p>
          </FadeUp>
        </section>

        {/* ── HERO IMPACT TRANSFORMATION ── */}
        <FadeUp>
          <ImpactTransformationHero delay={0.3} />
        </FadeUp>

        <Divider />

        {/* ── IMPACT METRICS ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">IMPACT</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              THE NUMBERS THAT<br />CHANGED EVERYTHING
            </h2>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <StatCard number="80%" label="Reduction in development time (2 months → 3-4 days)" delay={0} />
            <StatCard number="10x" label="Increase in user engagement metrics" delay={0.05} />
            <StatCard number="4x" label="Faster iteration cycles with AI design tools" delay={0.1} />
            <StatCard number="2" label="Designers now handling production for entire studio" delay={0.15} />
            <StatCard number="95%" label="Maintained quality despite dramatic speed increase" delay={0.2} />
            <StatCard number="∞" label="Scalability potential with AI-first workflow" delay={0.25} />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <TimelineComparison delay={0.3} />
            <EngagementMetrics delay={0.4} />
          </div>

          <FadeUp delay={0.5} className="mt-10">
            <CaseImage
              src={IMG.metrics}
              alt="Detailed metrics dashboard"
              label="INSERT: Comprehensive metrics dashboard showing game-by-game performance, engagement trends over time, and quality metrics (retention, DAU, engagement score)"
              aspect="16/9"
            />
          </FadeUp>
        </section>

        <Divider />

        {/* ── THE CHALLENGE ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">THE CHALLENGE</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              SPEED VS. QUALITY:<br />THE IMPOSSIBLE TRADE-OFF
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mb-12 leading-relaxed">
              Traditional game design forced an uncomfortable choice: deliver fast or deliver well.
              We needed both.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ChallengeCard
              number="01"
              title="Timeline Pressure"
              description="Traditional development cycles ranged from 1-2 months per game, yet user engagement metrics showed that fresh, high-quality games were critical to business performance. Management demanded more games, faster."
              imageUrl={IMG.timeline}
              delay={0}
            />
            <ChallengeCard
              number="02"
              title="Quality Compromise"
              description="When the team pushed to deliver faster, quality suffered. Designs became less polished, interactions less intuitive, and user engagement plateaued. We were cutting corners just to meet timelines."
              imageUrl={IMG.beforeAfter}
              delay={0.05}
            />
            <ChallengeCard
              number="03"
              title="Resource Constraints"
              description="A small design and engineering team was burning out trying to handle all the workload. Hiring alone wouldn't solve the problem—we needed a fundamentally different approach."
              imageUrl={IMG.workflow}
              delay={0.1}
            />
            <ChallengeCard
              number="04"
              title="The Core Problem"
              description="Manual design iteration and handoffs between design and development were the bottlenecks. Every change required redesign, developer re-implementation, and testing. Speed and quality were locked in opposition."
              imageUrl={IMG.figmaScreen}
              delay={0.15}
            />
          </div>

          {/* GOAL */}
          <FadeUp delay={0.2} className="mt-12">
            <div className="border border-black/20 p-8 md:p-12 bg-black/[0.02]">
              <div className="text-xs tracking-widest opacity-65 mb-4">THE GOAL</div>
              <p className="text-2xl md:text-4xl font-bold leading-tight opacity-90">
                Deliver high-quality, engaging games faster—without cutting corners, without burning out the team, and without sacrificing the user experience that drives business value.
              </p>
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── THE TURNING POINT ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">TRANSFORMATION</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              WHEN AI BECAME<br />THE ANSWER
            </h2>
          </FadeUp>

          <div className="space-y-0">
            {[
              {
                step: '01',
                title: 'Experimentation Phase',
                body: 'We started experimenting with various AI tools—Stitch, Lovable, Codex. Some worked well, others didn\'t. But we learned that AI wasn\'t a magic bullet; it was a tool that required strategic integration into our workflow.',
              },
              {
                step: '02',
                title: 'Strategic Pivot',
                body: 'The turning point came when we realized the real power wasn\'t in any single AI tool, but in combining them strategically. Figma Make for design acceleration + Codex for intelligent development could compress the entire cycle.',
              },
              {
                step: '03',
                title: 'Workflow Redesign',
                body: 'We fundamentally redesigned how the team worked. Instead of sequential design → development → testing, we created a parallel workflow where AI assisted at every stage simultaneously.',
              },
              {
                step: '04',
                title: 'Early Wins',
                body: 'Our first few games using the new workflow showed immediate promise. Development time dropped to 2 weeks. Engagement metrics climbed. The team was energized, not exhausted.',
              },
              {
                step: '05',
                title: 'Iteration & Refinement',
                body: 'We continued optimizing the workflow. Some games didn\'t perform as expected, but we iterated quickly. Within months, we had reduced the cycle from 2 months to just 3-4 days.',
              },
              {
                step: '06',
                title: 'Scaling the Model',
                body: 'The workflow became our standard. Just two designers now manage production for the entire studio. Quality remains high. Engagement keeps climbing. The model scales.',
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

          {/* Transformation Journey Visualization */}
          <FadeUp delay={0.35} className="mt-12">
            <div className="border border-black/15 p-8 md:p-12">
              <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">Transformation Timeline with Milestones</h3>
              <p className="text-sm opacity-75 mb-4">DESIGN SCREEN PLACEHOLDER</p>
              <CaseImage
                src={undefined}
                alt="Transformation journey timeline"
                label="INSERT: Timeline showing before/after with key milestones (Experimentation → Strategic Pivot → Workflow Redesign → Early Wins → Scaling) with key metrics at each stage"
                aspect="16/9"
              />
            </div>
          </FadeUp>
        </section>

        <Divider />

        {/* ── INTERACTIVE WORKFLOW ── */}
        <section className="pb-24">
          <FadeUp>
            <div className="border border-black/15 p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/[0.02]">
              <div>
                <p className="text-xs tracking-widest opacity-65 mb-2">INTERACTIVE</p>
                <p className="text-2xl md:text-3xl font-bold tracking-tight opacity-85">Explore the Game Design Workflow</p>
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

        {/* ── THE AI-DRIVEN WORKFLOW ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">METHODOLOGY</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              HOW THE<br />WORKFLOW WORKS
            </h2>
          </FadeUp>

          <FadeUp delay={0.1} className="mb-12">
            <CaseImage
              src={IMG.workflow}
              alt="AI Workflow Diagram"
              label="INSERT: AI workflow diagram showing Figma Make → Codex integration with parallel design/dev streams, automated QA, and analytics feedback loop"
              aspect="16/9"
            />
          </FadeUp>

          {/* Workflow Process Visualization */}
          <FadeUp delay={0.15} className="mb-12">
            <div className="border border-black/15 p-8 md:p-12">
              <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">Complete Workflow Process</h3>
              <p className="text-sm opacity-75 mb-4">DESIGN SCREEN PLACEHOLDER</p>
              <CaseImage
                src={undefined}
                alt="Complete workflow process"
                label="INSERT: Visual workflow showing 5 stages (Figma Make Integration → Parallel Design & Dev → Rapid Prototyping → AI-Assisted QA → Continuous Iteration) with timelines and key outputs"
                aspect="16/9"
              />
            </div>
          </FadeUp>

          <div className="space-y-6">
            {[
              {
                title: 'Figma Make Integration',
                body: 'Designers now use AI-powered Figma Make to generate game assets, UI components, and level layouts in real-time. What used to take hours of manual creation now happens in minutes. Predictive design suggestions accelerate iteration.',
              },
              {
                title: 'Parallel Design & Development',
                body: 'Instead of waiting for final designs, developers use Codex to generate functional code scaffolds directly from design files. Changes in Figma automatically propagate. The design-to-code handoff disappears.',
              },
              {
                title: 'Rapid Prototyping',
                body: 'Initial game prototypes can be created and tested in 2-3 days instead of weeks. High-fidelity mockups become interactive experiences almost immediately, allowing for faster user feedback and iteration.',
              },
              {
                title: 'AI-Assisted QA',
                body: 'Automated testing catches bugs faster. Engagement analytics feed back into the design loop in real-time, showing exactly what parts of each game drive user engagement.',
              },
              {
                title: 'Continuous Iteration',
                body: 'With such a short cycle, we can release, measure, iterate, and re-release in days instead of months. Continuous improvement becomes the default.',
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

        {/* ── RESULTS & IMPACT ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">OUTCOMES</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              WHAT CHANGED<br />IN PRACTICE
            </h2>
          </FadeUp>

          {/* Game Performance Dashboard */}
          <FadeUp delay={0.05} className="mb-12">
            <div className="border border-black/15 p-8 md:p-12">
              <h3 className="text-lg md:text-xl font-bold mb-6 tracking-tight">Game-by-Game Performance Metrics</h3>
              <p className="text-sm opacity-75 mb-4">DESIGN SCREEN PLACEHOLDER</p>
              <CaseImage
                src={undefined}
                alt="Game performance dashboard"
                label="INSERT: Dashboard showing each game with engagement score, DAU, retention rate, development time, and quality metrics (bugs, player feedback score)"
                aspect="16/9"
              />
            </div>
          </FadeUp>

          <div className="grid gap-6">
            <FeatureCard
              number="01"
              title="Speed: 2 Months → 3-4 Days"
              description="The most dramatic change. What took 60+ days in the old workflow now takes 3-4 days. This 95% time reduction came without sacrificing quality—in fact, quality improved."
              imageUrl={IMG.timeline}
              delay={0}
            />

            <FeatureCard
              number="02"
              title="Engagement: 10x Increase"
              description="More games + higher quality = massively higher engagement. User metrics show 10x increase in overall engagement compared to the pre-AI period. Games now launch, iterate, and improve at the speed of user feedback."
              imageUrl={IMG.engagement}
              delay={0.05}
            />

            <FeatureCard
              number="03"
              title="Team Efficiency: 2 Designers, Full Studio"
              description="A lean team of two designers now manages game production for the entire studio. The AI tools handle the repetitive, time-consuming work. Designers focus on strategy, innovation, and user experience."
              imageUrl={IMG.gameExamples}
              delay={0.1}
            />

            <FeatureCard
              number="04"
              title="Quality Consistency"
              description="Counter-intuitively, faster development led to better quality. AI tools eliminated bottlenecks and enabled more iteration cycles. Every game is more polished than before."
              imageUrl={IMG.figmaScreen}
              delay={0.15}
            />

            <FeatureCard
              number="05"
              title="Failed Experiments → Learning"
              description="Not every game succeeded. A couple underperformed. But because the cycle is so fast, we iterate quickly, learn what works, and move on. Failure is now a feature of continuous improvement, not a setback."
              imageUrl={IMG.codexIntegration}
              delay={0.2}
            />
          </div>
        </section>

        <Divider />

        {/* ── LEARNINGS ── */}
        <section>
          <FadeUp>
            <div className="text-xs tracking-widest opacity-65 mb-4">KEY INSIGHTS</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
              WHAT WE<br />LEARNED
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <LearningCard
              title="AI is a Force Multiplier, Not a Replacement"
              body="AI didn't replace designers or developers. It amplified their capabilities, removing drudgery and enabling higher-order creative thinking."
              delay={0}
            />
            <LearningCard
              title="Integration Matters More Than Individual Tools"
              body="No single AI tool was the game-changer. The magic came from strategic integration—Figma Make + Codex + analytics working in concert."
              delay={0.05}
            />
            <LearningCard
              title="Speed Enables Quality"
              body="Counter-intuitive insight: faster cycles don't reduce quality. They improve it. More iterations = better outcomes. Longer cycles entrench bad decisions."
              delay={0.1}
            />
            <LearningCard
              title="Workflow Redesign > Tool Selection"
              body="Adopting AI was less about picking the right tools and more about fundamentally rethinking how the team worked together."
              delay={0.15}
            />
            <LearningCard
              title="Data Drives Iteration"
              body="With rapid release cycles, engagement data became our best designer. We now design based on user behavior, not assumptions."
              delay={0.2}
            />
            <LearningCard
              title="Team Morale Improves With Automation"
              body="Removing repetitive work energized the team. Designers are excited again—they focus on strategy, not grunt work."
              delay={0.25}
            />
          </div>
        </section>

        <Divider />

        {/* ── CONCLUSION ── */}
        <section className="pb-24 md:pb-32">
          <FadeUp>
            <div className="border border-black/20 p-8 md:p-12 bg-black/[0.02]">
              <div className="text-xs tracking-widest opacity-65 mb-4">REFLECTION</div>
              <p className="text-2xl md:text-3xl font-bold leading-tight opacity-85 mb-6">
                This journey proved that AI isn't about replacing human creativity—it's about amplifying it.
              </p>
              <p className="text-lg md:text-xl leading-relaxed opacity-75">
                By thoughtfully integrating AI into our workflow, we didn't just make games faster. We made better games, with a happier team, serving more engaged users. The future of game design isn't "AI versus humans." It's humans empowered by AI, working at the speed of thought.
              </p>
            </div>
          </FadeUp>
        </section>

        {/* ── NEXT SECTION ── */}
        <section className="pb-24 md:pb-32">
          <FadeUp delay={0.1}>
            <div className="border border-black/15 p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/[0.02]">
              <div>
                <p className="text-xs tracking-widest opacity-65 mb-2">WHAT'S NEXT</p>
                <p className="text-2xl md:text-3xl font-bold tracking-tight opacity-85">More games. More insights. More scale.</p>
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
              {/* Header with title */}
              <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: 'var(--portfolio-border)' }}>
                <h3 className="text-xl font-bold">Game Design Workflow</h3>
              </div>

              {/* Floating close button outside */}
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

              {/* Workflow content */}
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
