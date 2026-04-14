import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { useTheme } from './context/ThemeContext';
import {
  ScrollProgress,
  SplitTextReveal,
  MagneticButton,
  TextScramble,
  CursorImage,
  Marquee,
  StaggeredReveal,
  AnimatedSection,
  WipeLink,
  ParallaxText,
  LineReveal,
} from './components/interactions';
import {
  useIsMobile,
  MomentumTilt,
  ElasticSection,
  TapRevealImage,
  SectionCounter,
  TouchRipple,
  ScrollBlur,
} from './components/mobile-interactions';
import { HeaderNameAnimation } from './components/HeaderNameAnimation';

const SECTIONS = ['hero', 'work', 'press', 'recommendations', 'about', 'contact'];

// ─── PRESS ARTICLES ────────────────────────────────────────────
const PRESS_ARTICLES = [
  {
    publication: 'Business Standard',
    headline: 'magicpin revenue triples to ₹870 cr in FY24, becomes 3rd largest food app',
    date: 'Feb 2025',
    url: 'https://www.business-standard.com/companies/start-ups/magicpin-revenue-triples-to-rs-870-cr-in-fy24-becomes-3rd-largest-food-app-125021101256_1.html',
    tag: 'Growth',
  },
  {
    publication: 'Inc42',
    headline: "ONDC's Secret Sauce: Why Zomato-Backed magicpin Is The Silent Winner",
    date: '2024',
    url: 'https://inc42.com/features/amidst-ondc-swiggy-zomato-war-magicpin-is-the-silent-winner/',
    tag: 'Strategy',
  },
  {
    publication: 'Inc42',
    headline: 'magicpin Launches magicNOW — a 15-Minute Food Delivery Service',
    date: 'Dec 2024',
    url: 'https://inc42.com/buzz/magicpin-launches-15-minute-food-delivery-service/',
    tag: 'Product',
  },
  {
    publication: 'Entrackr',
    headline: 'Magicpin becomes largest food delivery seller app on ONDC',
    date: 'Oct 2024',
    url: 'https://entrackr.com/2024/10/magicpin-becomes-largest-food-delivery-seller-app-on-ondc/',
    tag: 'Milestone',
  },
  {
    publication: 'YourStory',
    headline: 'Hyperlocal startup magicpin is delivering over 3 lakh orders a month on ONDC',
    date: 'May 2023',
    url: 'https://yourstory.com/2023/05/magicpin-scales-up-to-more-than-3-lakhs-delivery-ondc',
    tag: 'Milestone',
  },
  {
    publication: 'Business Today',
    headline: 'magicpin launches 45-min pharmacy delivery service for hyperlocal retail',
    date: 'Jun 2022',
    url: 'https://www.businesstoday.in/latest/corporate/story/e-commerce-platform-magicpin-launches-45-min-pharmacy-delivery-service-336004-2022-06-01',
    tag: 'Product',
  },
];

// ─── RECOMMENDATIONS ───────────────────────────────────────────
const RECOMMENDATIONS = [
  {
    quote:
      "Working with Umang has been an incredible experience. His ability to turn complex business challenges into user-friendly, intuitive designs is exceptional. I've seen him lead major projects with a rare mix of strategic thinking and hands-on design skills. He truly elevates the product experience in ways that others can't.",
    name: 'Anuj Kumar',
    title: 'Sr. Director Engineering',
    company: 'magicpin',
  },
  {
    quote:
      "Collaborating with Umang was genuinely a one-of-a-kind experience. He brings a unique combination of empathy for users, a deep understanding of data, and an eye for exceptional design. It's not just about shipping screens for him; it's about shifting the way a product thinks and works. I haven't seen that level of impact in many designers.",
    name: 'Harsh Bahrey',
    title: 'Sr. Product Manager',
    company: 'Skillsoft',
  },
  {
    quote:
      "Umang's leadership and guidance during my time working with him were truly valuable. He doesn't just focus on the final design; he takes the time to understand the problem, helping bring clarity to the design process. His expertise and direction made a real difference, and I feel fortunate to have had him as a mentor.",
    name: 'Samakshi Goel',
    title: 'Product Designer',
    company: 'Loqbox',
  },
  {
    quote:
      "I had the opportunity to work with Umang at magicpin on some key product experiences. What I really appreciated about him was his ability to bring clarity to complex problems and turn them into simple, intuitive solutions. He struck a great balance between user needs and business goals. He's easy to collaborate with, asks thoughtful questions (sometimes one too many 😄), and takes strong ownership of his work, making him a great partner in our fast paced work culture.",
    name: 'Manish Chaudhary',
    title: 'Co Founder & CEO',
    company: 'Flexprice',
  },
];

// ─── IMPACT HERO PREVIEW (shown on hover for first project) ──────
function ImpactHeroPreview() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 md:px-12 py-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-0">
        {/* BEFORE */}
        <div className="pr-0 md:pr-8" style={{ borderRight: 'var(--portfolio-border) 1px solid' }}>
          <div className="text-xs tracking-widest opacity-40 mb-4 uppercase">Before</div>
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <span className="text-lg">⏱️</span>
              <div className="flex-1">
                <div className="text-2xl font-black text-red-500/60">60</div>
                <p className="text-[10px] opacity-60">Days</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg">🎮</span>
              <div className="flex-1">
                <div className="text-sm font-black text-red-500/60">~0.5/mo</div>
                <p className="text-[10px] opacity-60">Output</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg">😫</span>
              <div className="flex-1">
                <div className="text-sm font-black text-red-500/60">Burnout</div>
              </div>
            </div>
          </div>
        </div>

        {/* AFTER */}
        <div className="pl-0 md:pl-8 pt-8 md:pt-0">
          <div className="text-xs tracking-widest opacity-40 mb-4 uppercase">After</div>
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <span className="text-lg">⚡</span>
              <div className="flex-1">
                <div className="text-2xl font-black text-green-500">3-4</div>
                <p className="text-[10px] opacity-60">Days</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg">🎯</span>
              <div className="flex-1">
                <div className="text-sm font-black text-green-500">5+/mo</div>
                <p className="text-[10px] opacity-60">Output</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg">🔥</span>
              <div className="flex-1">
                <div className="text-sm font-black text-green-500">Energized</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact metrics */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6" style={{ borderTop: '1px solid var(--portfolio-border)' }}>
        <div className="text-center">
          <div className="text-2xl font-black text-green-500">95%</div>
          <p className="text-[10px] opacity-60 mt-1">Faster</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-green-500">10x</div>
          <p className="text-[10px] opacity-60 mt-1">More</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-green-500">∞</div>
          <p className="text-[10px] opacity-60 mt-1">Scale</p>
        </div>
      </div>
    </div>
  );
}

// ─── COPY EMAIL BUTTON ─────────────────────────────────────────
function CopyEmailButton({ email, isMobile }: { email: string; isMobile: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sizeClasses = isMobile ? "text-xl" : "text-3xl md:text-5xl lg:text-6xl";

  return (
    <motion.button
      onClick={handleCopy}
      className={`${sizeClasses} font-bold opacity-40 hover:opacity-100 transition-opacity flex-shrink-0 bg-none border-none p-0 cursor-pointer`}
      whileHover={{ x: isMobile ? 4 : 8 }}
      transition={{ duration: 0.3 }}
    >
      {copied ? (
        <motion.span
          key="checked"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          ✓
        </motion.span>
      ) : (
        <motion.span
          key="copy"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          ⧉
        </motion.span>
      )}
    </motion.button>
  );
}

// ─── CV MODAL DIALOG ───────────────────────────────────────────
function CVModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Umang_Agarwal_CV.pdf';
    link.download = 'Umang_Agarwal_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-4xl rounded-lg overflow-hidden"
            style={{ maxHeight: '90vh', backgroundColor: 'var(--portfolio-bg)', borderColor: 'var(--portfolio-border)', borderWidth: '1px' }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid var(--portfolio-border)' }}>
              <h3 className="text-lg md:text-xl font-bold">Resume</h3>
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded text-sm font-bold tracking-widest transition-colors"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    borderColor: 'var(--portfolio-border)',
                    borderWidth: '1px',
                    color: 'var(--portfolio-fg)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ⧉ DOWNLOAD
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className="text-2xl opacity-40 hover:opacity-100 transition-opacity flex-shrink-0 bg-none border-none p-0 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="w-full" style={{ maxHeight: 'calc(90vh - 80px)', overflowY: 'auto' }}>
              <iframe
                src="/Umang_Agarwal_CV.pdf"
                className="w-full"
                style={{ height: '1200px' }}
                title="Umang Agarwal CV"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── MOBILE PROJECT ITEM ───────────────────────────────────────
function MobileProjectItem({
  title,
  yearDisplay,
  description,
  imageUrl,
  index,
  slug,
  isUnlocked,
  onPasswordRequired,
}: {
  title: string;
  yearDisplay: string;
  description: string;
  imageUrl: string;
  index: number;
  slug?: string;
  isUnlocked?: boolean;
  onPasswordRequired?: () => void;
}) {
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!slug || !isUnlocked) {
      onPasswordRequired?.();
      return;
    }
    navigate(slug);
  };

  return (
    <TouchRipple enabled>
      <motion.div
        className="relative py-10 cursor-pointer"
        style={{ borderBottom: '1px solid var(--portfolio-border-strong)' }}
        onClick={handleClick}
        // y removed: animating upward while the user scrolls down is an
        // opposing-motion pattern that reads as scroll resistance on mobile.
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
      >
        {/* Project number watermark */}
        <span className="absolute right-2 top-6 text-6xl font-black opacity-[0.04] select-none">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative z-10 flex items-start justify-between gap-4">
          <h3 className="text-3xl font-bold leading-none tracking-tight flex-1">
            {title}
          </h3>
          <span className="text-lg font-normal opacity-50">{yearDisplay}</span>
        </div>

        <p className="relative z-10 mt-3 text-base leading-relaxed opacity-50">
          {description}
        </p>

        {/* Tap hint */}
        <motion.span
          className="relative z-10 mt-3 inline-block text-xs tracking-widest"
          animate={{ opacity: showImage ? 0 : 0.3 }}
        >
          TAP TO PREVIEW
        </motion.span>

        {/* Tap-to-reveal image */}
        <TapRevealImage
          imageUrl={imageUrl}
          isVisible={showImage}
          onDismiss={() => setShowImage(false)}
        />
      </motion.div>
    </TouchRipple>
  );
}

// ─── DESKTOP PROJECT ITEM ───────────────────────────────────────
function DesktopProjectItem({
  title,
  yearDisplay,
  description,
  imageUrl,
  index,
  slug,
  isUnlocked,
  onPasswordRequired,
  isFirstProject,
}: {
  title: string;
  yearDisplay: string;
  description: string;
  imageUrl: string;
  index: number;
  slug?: string;
  isUnlocked?: boolean;
  onPasswordRequired?: () => void;
  isFirstProject?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!slug || !isUnlocked) {
      onPasswordRequired?.();
      return;
    }
    navigate(slug);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative py-12 md:py-16 group cursor-pointer"
      style={{ borderBottom: '1px solid var(--portfolio-border-strong)' }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      <motion.div
        className="absolute inset-0 bg-black/[0.03]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
        <TextScramble
          text={title}
          as="h3"
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight transition-all duration-500 group-hover:tracking-normal flex-1"
        />
        <motion.span
          className="text-xl md:text-2xl font-normal opacity-50 group-hover:opacity-100 transition-opacity duration-500"
          animate={{ x: isHovered ? -10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {yearDisplay}
        </motion.span>
      </div>

      <motion.p
        className="relative z-10 mt-4 md:mt-6 text-lg md:text-xl leading-relaxed max-w-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"
        animate={{ x: isHovered ? 20 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {description}
      </motion.p>

      {slug && (
        <motion.span
          className="relative z-10 mt-4 inline-block text-xs tracking-widest opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          animate={{ x: isHovered ? 20 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          VIEW CASE STUDY →
        </motion.span>
      )}

      <motion.span className="absolute right-0 bottom-4 text-8xl md:text-9xl font-black opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700 select-none hidden md:block">
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      {isFirstProject && isHovered ? (
        <motion.div
          ref={containerRef}
          className="fixed pointer-events-none z-40 rounded-lg"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            width: '420px',
            aspectRatio: '1',
            borderColor: 'var(--portfolio-border)',
            borderWidth: '1px',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <ImpactHeroPreview />
        </motion.div>
      ) : (
        <CursorImage
          imageUrl={imageUrl}
          isVisible={isHovered}
          containerRef={containerRef}
        />
      )}
    </motion.div>
  );
}

// ─── PASSWORD DIALOG ────────────────────────────────────────────
function PasswordDialog({
  isOpen,
  onClose,
  onSubmit,
  projectTitle,
  error,
  input,
  onInputChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  projectTitle: string;
  error: boolean;
  input: string;
  onInputChange: (val: string) => void;
}) {
  // 'password' | 'request' | 'sent' | 'error'
  const [view, setView] = useState<'password' | 'request' | 'sent' | 'reqerror'>('password');
  const [reqEmail, setReqEmail] = useState('');
  const [reqEmailError, setReqEmailError] = useState('');
  const [reqLoading, setReqLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      onInputChange('');
      setView('password');
      setReqEmail('');
      setReqEmailError('');
    }
  }, [isOpen, onInputChange]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSubmit();
    if (e.key === 'Escape') onClose();
  };

  const handleRequestAccess = async () => {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!reqEmail || !emailRe.test(reqEmail)) {
      setReqEmailError('Please enter a valid email address.');
      return;
    }
    setReqEmailError('');
    setReqLoading(true);
    try {
      const res = await fetch('/api/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: reqEmail, caseStudy: projectTitle }),
      });
      if (res.ok) {
        setView('sent');
      } else {
        const data = await res.json().catch(() => ({}));
        setReqEmailError(data.error || 'Something went wrong. Please try again.');
        setView('reqerror');
      }
    } catch {
      setView('reqerror');
    } finally {
      setReqLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div
              className="rounded-lg p-8 backdrop-blur-xl"
              style={{
                backgroundColor: 'var(--portfolio-bg)',
                borderColor: 'var(--portfolio-border)',
                borderWidth: '1px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>

                {/* ── Password view ── */}
                {view === 'password' && (
                  <motion.div key="password" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--portfolio-fg)' }}>Access Required</h2>
                    <p className="text-sm mb-6" style={{ color: 'var(--portfolio-muted)' }}>
                      This project is password protected. Enter the password to view.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs tracking-widest mb-2 block" style={{ color: 'var(--portfolio-muted)' }}>PASSWORD</label>
                        <input
                          type="password"
                          value={input}
                          onChange={(e) => onInputChange(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder="Enter password"
                          style={{
                            backgroundColor: 'var(--portfolio-bg)',
                            borderColor: error ? '#ef5350' : 'var(--portfolio-border)',
                            borderWidth: '1px',
                            color: 'var(--portfolio-fg)',
                          }}
                          className="w-full rounded px-4 py-3 placeholder:opacity-50 focus:outline-none transition-colors"
                          autoFocus
                        />
                        {error && <p className="text-red-400 text-xs mt-2">Incorrect password. Try again.</p>}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={onClose}
                          className="flex-1 px-4 py-3 rounded text-sm font-medium transition-colors"
                          style={{ backgroundColor: 'rgba(0,0,0,0.05)', borderColor: 'var(--portfolio-border)', borderWidth: '1px', color: 'var(--portfolio-fg)' }}
                        >Cancel</button>
                        <button
                          onClick={onSubmit}
                          className="flex-1 px-4 py-3 rounded text-sm font-bold"
                          style={{ backgroundColor: 'var(--portfolio-fg)', color: 'var(--portfolio-bg)' }}
                        >Unlock</button>
                      </div>

                      {/* Request access CTA */}
                      <div className="pt-2 text-center" style={{ borderTop: '1px solid var(--portfolio-border)', marginTop: '8px', paddingTop: '16px' }}>
                        <p className="text-xs mb-2" style={{ color: 'var(--portfolio-muted)' }}>Don't have the password?</p>
                        <button
                          onClick={() => setView('request')}
                          className="text-xs font-semibold tracking-wide underline underline-offset-2 transition-opacity hover:opacity-70"
                          style={{ color: 'var(--portfolio-fg)' }}
                        >
                          Request Access →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Request access form ── */}
                {view === 'request' && (
                  <motion.div key="request" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    <button onClick={() => setView('password')} className="text-xs opacity-50 hover:opacity-80 mb-5 flex items-center gap-1" style={{ color: 'var(--portfolio-fg)' }}>
                      ← Back
                    </button>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--portfolio-fg)' }}>Request Access</h2>
                    <p className="text-sm mb-6" style={{ color: 'var(--portfolio-muted)' }}>
                      Enter your email and I'll review your request and share the password if approved.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs tracking-widest mb-2 block" style={{ color: 'var(--portfolio-muted)' }}>YOUR EMAIL</label>
                        <input
                          type="email"
                          value={reqEmail}
                          onChange={(e) => { setReqEmail(e.target.value); setReqEmailError(''); }}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleRequestAccess(); if (e.key === 'Escape') onClose(); }}
                          placeholder="you@company.com"
                          style={{
                            backgroundColor: 'var(--portfolio-bg)',
                            borderColor: reqEmailError ? '#ef5350' : 'var(--portfolio-border)',
                            borderWidth: '1px',
                            color: 'var(--portfolio-fg)',
                          }}
                          className="w-full rounded px-4 py-3 placeholder:opacity-50 focus:outline-none transition-colors"
                          autoFocus
                        />
                        {reqEmailError && <p className="text-red-400 text-xs mt-2">{reqEmailError}</p>}
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={onClose}
                          className="flex-1 px-4 py-3 rounded text-sm font-medium"
                          style={{ backgroundColor: 'rgba(0,0,0,0.05)', borderColor: 'var(--portfolio-border)', borderWidth: '1px', color: 'var(--portfolio-fg)' }}
                        >Cancel</button>
                        <button
                          onClick={handleRequestAccess}
                          disabled={reqLoading}
                          className="flex-1 px-4 py-3 rounded text-sm font-bold transition-opacity disabled:opacity-60"
                          style={{ backgroundColor: 'var(--portfolio-fg)', color: 'var(--portfolio-bg)' }}
                        >
                          {reqLoading ? 'Sending…' : 'Submit Request'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Sent confirmation ── */}
                {view === 'sent' && (
                  <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="text-center py-4">
                    <div className="text-4xl mb-4">✓</div>
                    <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--portfolio-fg)' }}>Request Sent</h2>
                    <p className="text-sm mb-6" style={{ color: 'var(--portfolio-muted)' }}>
                      I'll review your request and send the password to <strong style={{ color: 'var(--portfolio-fg)' }}>{reqEmail}</strong> if approved.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 rounded text-sm font-bold"
                      style={{ backgroundColor: 'var(--portfolio-fg)', color: 'var(--portfolio-bg)' }}
                    >Done</button>
                  </motion.div>
                )}

                {/* ── Error state ── */}
                {view === 'reqerror' && (
                  <motion.div key="reqerror" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }} className="text-center py-4">
                    <div className="text-4xl mb-4">✕</div>
                    <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--portfolio-fg)' }}>Something went wrong</h2>
                    <p className="text-sm mb-6" style={{ color: 'var(--portfolio-muted)' }}>{reqEmailError || 'Please try again or email me directly at me@umangagarwal.in'}</p>
                    <div className="flex gap-3 justify-center">
                      <button onClick={() => setView('request')} className="px-5 py-2.5 rounded text-sm font-medium" style={{ borderColor: 'var(--portfolio-border)', borderWidth: '1px', color: 'var(--portfolio-fg)' }}>Try Again</button>
                      <button onClick={onClose} className="px-5 py-2.5 rounded text-sm font-bold" style={{ backgroundColor: 'var(--portfolio-fg)', color: 'var(--portfolio-bg)' }}>Close</button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const activeSectionRef = useRef('hero');
  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useTheme();
  const heroRef = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.5], [1, 0.95]);
  // heroY parallax disabled on mobile — 3D parallax has no payoff on touch
  // and causes the SCROLL indicator to overlap content below the hero.
  const heroY = useTransform(heroScroll, [0, 1], isMobile ? [0, 0] : [0, 150]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            if (section !== activeSectionRef.current) {
              activeSectionRef.current = section;
              setActiveSection(section);
            }
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const allProjects = [
    {
      title: 'AI-POWERED GAME DESIGN',
      year: 2026,
      yearDisplay: '2026',
      description:
        'Reduced game development time by 80% while increasing user engagement 10x by integrating AI tools into our design and development workflow.',
      imageUrl:
        'https://images.unsplash.com/photo-1538481143235-a9d28b46f77f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      slug: '/work/ai-game-design',
      password: 'OPENWORK11',
    },
    {
      title: 'magicFleet: A fleet management application',
      year: 2025,
      yearDisplay: '2025',
      description:
        'Led the design of a fleet management platform orchestrating 100k+ delivery riders. Built real-time visibility, intelligent shift scheduling, and rider engagement systems. +22% on-time delivery, -18% cost per delivery.',
      imageUrl:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      slug: '/work/magicfleet',
      password: 'OPENWORK11',
    },
    {
      title: 'MAGICPIN APP REVAMP',
      year: 2023,
      yearDisplay: '2023—2024',
      description:
        'Led the largest UX overhaul in magicPin history — redesigning the full ordering and discovery experience for millions of Indian users. Delivered +32% AOV, +65% conversion on personalised sections, and a design system of 150+ components.',
      imageUrl:
        'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6ff125a5-edd3-496f-89d4-062e47fb9897',
      slug: '/work/magicpin',
      password: 'OPENWORK11',
    },
  ].sort((a, b) => b.year - a.year);

  const [unlockedProjects, setUnlockedProjects] = useState<string[]>([]);
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [selectedProjectForPassword, setSelectedProjectForPassword] = useState<typeof allProjects[0] | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [cvModalOpen, setCVModalOpen] = useState(false);

  const projects = showMoreProjects ? allProjects : allProjects.slice(0, 3);

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: 'Inter, sans-serif',
        backgroundColor: 'var(--portfolio-bg)',
        color: 'var(--portfolio-fg)',
      }}
    >
      <style>{`
        body {
          background: var(--portfolio-bg);
          /* overflow-x: clip instead of hidden — on iOS Safari, overflow: hidden on
             body/html converts the document from native-scroll to a scroll-container.
             The gesture negotiation at direction change then freezes for one touch.
             clip achieves the same visual result without creating a scroll container. */
          overflow-x: clip;
        }
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>

      {!isMobile && <ScrollProgress />}

      {/* ── Fixed Navigation ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'var(--portfolio-nav-bg)',
          // backdrop-filter on a position:fixed element forces a full GPU compositing
          // re-blend on every scroll frame. On iOS, this blocks gesture re-registration
          // at direction change (causes the freeze+jump). Disable on mobile — the
          // nav-bg CSS var already has enough opacity to stay readable without blur.
          backdropFilter: isMobile ? undefined : 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: isMobile ? undefined : 'blur(16px) saturate(180%)',
          borderBottom: '1px solid var(--portfolio-border)',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.215, 0.61, 0.355, 1],
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-6 flex justify-between items-center">
          <HeaderNameAnimation onClick={() => scrollToSection('hero')} />
          <div className="flex items-center gap-4 md:gap-10 text-xs md:text-sm">
            {['work', 'about', 'contact'].map((section) => (
              <MagneticButton
                key={section}
                onClick={() => scrollToSection(section)}
                className={`hover:opacity-70 transition-all duration-300 ${
                  activeSection === section ? 'opacity-100' : 'opacity-60'
                }`}
              >
                <span className="relative">
                  {section.toUpperCase()}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[1px]"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: activeSection === section ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0, background: 'var(--portfolio-fg)' }}
                  />
                </span>
              </MagneticButton>
            ))}

            {/* ── Theme Toggle ── */}
            <motion.button
              onClick={toggleTheme}
              className="relative focus:outline-none opacity-60 hover:opacity-100 transition-opacity duration-300"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.15 }}
            >
              {/* Pill track — compact on mobile (icon only), full on desktop (icon + label) */}
              <div
                className={`relative ${isMobile ? 'w-[34px] h-6' : 'w-20 h-7'} rounded-full border transition-colors duration-300`}
                style={{
                  background: theme === 'dark' ? 'var(--portfolio-fg)' : 'transparent',
                  borderColor: 'var(--portfolio-fg)',
                }}
              >
                {/* Sliding icon dot */}
                <motion.div
                  className={`absolute inset-y-0 my-auto ${isMobile ? 'w-[20px] h-[20px]' : 'w-[22px] h-[22px]'} rounded-full flex items-center justify-center overflow-hidden`}
                  style={{ background: theme === 'dark' ? 'var(--portfolio-bg)' : 'var(--portfolio-fg)' }}
                  animate={{ left: theme === 'dark'
                    ? isMobile ? 'calc(100% - 22px)' : 'calc(100% - 25px)'
                    : '2px'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  {/* Sun / Moon icon — rotates in/out on theme change */}
                  <AnimatePresence mode="wait" initial={false}>
                    {theme === 'light' ? (
                      <motion.svg
                        key="sun"
                        viewBox="0 0 20 20"
                        width="13"
                        height="13"
                        fill="none"
                        style={{ color: 'var(--portfolio-bg)' }}
                        initial={{ opacity: 0, scale: 0.4, rotate: -60 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.4, rotate: 60 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        <circle cx="10" cy="10" r="3" fill="currentColor" />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                          const rad = (deg * Math.PI) / 180;
                          return (
                            <line
                              key={deg}
                              x1={10 + Math.cos(rad) * 5}  y1={10 + Math.sin(rad) * 5}
                              x2={10 + Math.cos(rad) * 7.5} y2={10 + Math.sin(rad) * 7.5}
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                            />
                          );
                        })}
                      </motion.svg>
                    ) : (
                      <motion.svg
                        key="moon"
                        viewBox="0 0 20 20"
                        width="13"
                        height="13"
                        fill="none"
                        style={{ color: 'var(--portfolio-fg)' }}
                        initial={{ opacity: 0, scale: 0.4, rotate: 60 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.4, rotate: -60 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        <circle cx="10" cy="10" r="7" fill="currentColor" />
                        <circle cx="13" cy="8" r="5.5" fill="var(--portfolio-bg)" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Text label — desktop only; hidden on mobile to keep pill compact */}
                {!isMobile && <AnimatePresence mode="wait" initial={false}>
                  {theme === 'light' ? (
                    /* Light mode: icon is LEFT → label "DARK" on the RIGHT */
                    <motion.span
                      key="label-dark"
                      className="absolute inset-y-0 right-[9px] flex items-center text-[8px] font-bold tracking-widest pointer-events-none"
                      style={{ color: 'var(--portfolio-fg)' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      DARK
                    </motion.span>
                  ) : (
                    /* Dark mode: icon is RIGHT → label "LIGHT" on the LEFT */
                    <motion.span
                      key="label-light"
                      className="absolute inset-y-0 left-[9px] flex items-center text-[8px] font-bold tracking-widest pointer-events-none"
                      style={{ color: 'var(--portfolio-bg)' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      LIGHT
                    </motion.span>
                  )}
                </AnimatePresence>}
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO SECTION ── */}
      {/* MomentumTilt disabled: perspective + rotateX 3D context on mobile GPU
          causes scroll jank and doesn't add perceptible value on touch. */}
      <MomentumTilt enabled={false}>
        <section
          id="hero"
          ref={heroRef}
          className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 pt-28 md:pt-32 pb-6"
        >
          <motion.div
            className="max-w-7xl w-full flex-1 flex flex-col justify-center"
            style={isMobile ? undefined : { opacity: heroOpacity, scale: heroScale, y: heroY }}
          >
            <motion.span
              className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 text-[20rem] md:text-[30rem] font-black opacity-[0.02] select-none leading-none pointer-events-none hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.02, scale: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              UA
            </motion.span>

            {/* ScrollBlur disabled on mobile: the continuous RAF loop + CSS filter
                forces GPU compositing layer updates that block iOS from registering
                the next scroll gesture — causing the direction-change jerk. */}
            <ScrollBlur enabled={false}>
              {/* Mobile: split into two groups with a line separator */}
              <div className="md:hidden">
                <SplitTextReveal
                  text={"UMANG\nAGARWAL"}
                  as="h1"
                  className="text-[3.2rem] leading-[0.9] font-black tracking-tighter"
                  delay={0.3}
                />
                <motion.div
                  className="w-16 h-[4px] my-6"
                  style={{ background: 'var(--portfolio-fg)', originX: 0 }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
                />
                <SplitTextReveal
                  text={"PRODUCT\nDESIGN LEADER\nWITH A\nbuilder's MINDSET"}
                  as="h1"
                  className="text-[1.6rem] leading-[0.9] font-black tracking-tighter"
                  delay={0.8}
                  styledWords={{ "builder's": "font-['Playfair_Display'] italic font-normal tracking-normal" }}
                />
              </div>
              {/* Desktop: name → separator line → subtitle, mirroring mobile layout */}
              <div className="hidden md:block">
                <SplitTextReveal
                  text={"UMANG\nAGARWAL"}
                  as="h1"
                  className="text-8xl lg:text-9xl font-black leading-none tracking-tighter"
                  delay={0.3}
                />
                {/* Separator — same pattern as mobile, scaled up for desktop */}
                <motion.div
                  className="w-24 h-[5px] my-8"
                  style={{ background: 'var(--portfolio-fg)', originX: 0 }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
                />
                <SplitTextReveal
                  text={"PRODUCT DESIGN LEADER\nWITH A builder's MINDSET"}
                  as="h1"
                  className="text-4xl lg:text-[4.5rem] font-black leading-none tracking-tighter"
                  delay={0.8}
                  styledWords={{ "builder's": "font-['Playfair_Display'] italic font-normal tracking-normal" }}
                />
              </div>
            </ScrollBlur>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8, ease: 'easeOut' }}
              className="mt-8 md:mt-12"
            >
              <p className="text-base md:text-xl max-w-2xl leading-relaxed opacity-80">
                I'm a product design leader with 6+ years of experience building consumer products across hyperlocal commerce and B2B platforms. I focus on understanding what users actually need, and turning that into simple, thoughtful experiences that drive real business outcomes. My work spans the full journey from onboarding to checkout to retention always with an eye on what moves the needle.
              </p>
            </motion.div>
          </motion.div>

          {/* SCROLL indicator — hidden on mobile: touch scroll is self-evident,
              and the element overlaps content due to heroY parallax offset */}
          <motion.div
            className="hidden md:flex items-center gap-3 mt-4 mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <motion.div
              className="w-[1px] h-16 origin-top"
              style={{ background: 'var(--portfolio-fg)' }}
              animate={{ scaleY: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <span
              className="text-xs tracking-widest"
              style={{ writingMode: 'vertical-lr' }}
            >
              SCROLL
            </span>
          </motion.div>
        </section>
      </MomentumTilt>

      {/* ── MARQUEE BANNER ── */}
      <div className="py-4 md:py-6" style={{ borderTop: '1px solid var(--portfolio-border)', borderBottom: '1px solid var(--portfolio-border)' }}>
        <Marquee
          text="PRODUCT DESIGN · UX STRATEGY · INTERACTION DESIGN · DESIGN SYSTEMS · USER RESEARCH · PROTOTYPING ·"
          className="text-2xl md:text-4xl font-bold tracking-tight opacity-20"
          speed={25}
        />
      </div>

      {/* ── WORK SECTION ── */}
      {isMobile ? (
        <ElasticSection
          id="work"
          className="py-20 px-6"
          enabled
        >
          <div className="max-w-7xl mx-auto">
            <SplitTextReveal
              text="SELECTED WORK"
              as="h2"
              className="text-5xl font-black tracking-tighter mb-4"
            />
            <LineReveal className="mb-16" />

            <div className="space-y-0">
              {projects.map((project, index) => (
                <MobileProjectItem
                  key={project.title}
                  {...project}
                  index={index}
                  slug={project.slug}
                  isUnlocked={unlockedProjects.includes(project.title)}
                  onPasswordRequired={() => {
                    setSelectedProjectForPassword(project);
                    setPasswordDialogOpen(true);
                  }}
                />
              ))}
            </div>
            {allProjects.length > 3 && !showMoreProjects && (
              <motion.button
                onClick={() => setShowMoreProjects(true)}
                className="mt-16 px-8 py-4 rounded text-sm font-bold tracking-widest transition-colors w-full md:w-auto"
                style={{
                  borderColor: 'var(--portfolio-border-strong)',
                  borderWidth: '1px',
                  color: 'var(--portfolio-fg)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                VIEW MORE WORK
              </motion.button>
            )}
          </div>
        </ElasticSection>
      ) : (
        <AnimatedSection
          id="work"
          className="min-h-screen py-24 md:py-32 px-6 md:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <ParallaxText speed={0.15}>
              <SplitTextReveal
                text="SELECTED WORK"
                as="h2"
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4"
              />
            </ParallaxText>
            <LineReveal className="mb-16 md:mb-24" />

            <div className="space-y-0">
              {projects.map((project, index) => (
                <DesktopProjectItem
                  key={project.title}
                  {...project}
                  index={index}
                  slug={project.slug}
                  isUnlocked={unlockedProjects.includes(project.title)}
                  onPasswordRequired={() => {
                    setSelectedProjectForPassword(project);
                    setPasswordDialogOpen(true);
                  }}
                  isFirstProject={index === 0}
                />
              ))}
            </div>
            {allProjects.length > 3 && !showMoreProjects && (
              <motion.button
                onClick={() => setShowMoreProjects(true)}
                className="mt-16 px-8 py-4 rounded text-sm font-bold tracking-widest transition-colors w-full md:w-auto"
                style={{
                  borderColor: 'var(--portfolio-border-strong)',
                  borderWidth: '1px',
                  color: 'var(--portfolio-fg)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                VIEW MORE WORK
              </motion.button>
            )}
          </div>
        </AnimatedSection>
      )}

      {/* ── MARQUEE BANNER 2 ── */}
      <div className="py-4 md:py-6" style={{ borderTop: '1px solid var(--portfolio-border)', borderBottom: '1px solid var(--portfolio-border)' }}>
        <Marquee
          text="AVAILABLE FOR FREELANCE · LET'S COLLABORATE · OPEN TO OPPORTUNITIES ·"
          className="text-2xl md:text-4xl font-bold tracking-tight opacity-20"
          speed={30}
        />
      </div>

      {/* ── IN THE PRESS SECTION – HIDDEN FOR NOW ── */}
      {false && (
        <>
      {isMobile ? (
        <ElasticSection
          id="press"
          className="py-20 px-6"
          enabled
        >
          <div className="max-w-7xl mx-auto">
            <SplitTextReveal
              text="IN THE PRESS"
              as="h2"
              className="text-5xl font-black tracking-tighter mb-4"
            />
            <LineReveal className="mb-12" />

            <StaggeredReveal className="space-y-0">
              {PRESS_ARTICLES.map((article, i) => (
                <motion.a
                  key={i}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                >
                  <div
                    className="py-6 flex flex-col gap-3"
                    style={{ borderBottom: '1px solid var(--portfolio-border)' }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm"
                        style={{
                          background: 'var(--portfolio-border)',
                          color: 'var(--portfolio-fg)',
                        }}
                      >
                        {article.tag}
                      </span>
                      <span className="text-xs opacity-40 tracking-widest">{article.date}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p
                          className="text-[10px] uppercase tracking-widest opacity-40 mb-2"
                        >
                          {article.publication}
                        </p>
                        <p className="text-base font-semibold leading-snug group-hover:opacity-70 transition-opacity">
                          {article.headline}
                        </p>
                      </div>
                      <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 mt-1 flex-shrink-0">
                        →
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </StaggeredReveal>
          </div>
        </ElasticSection>
      ) : (
        <AnimatedSection
          id="press"
          className="py-24 md:py-32 px-6 md:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <ParallaxText speed={0.15}>
              <SplitTextReveal
                text="IN THE PRESS"
                as="h2"
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4"
              />
            </ParallaxText>
            <LineReveal className="mb-16 md:mb-24" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {PRESS_ARTICLES.map((article, i) => (
                <motion.a
                  key={i}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <div
                    className="p-8 h-full flex flex-col justify-between gap-6 hover:opacity-70 transition-opacity duration-300"
                    style={{
                      borderBottom: '1px solid var(--portfolio-border)',
                      borderRight: i % 2 === 0 ? '1px solid var(--portfolio-border)' : 'none',
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-widest opacity-40 mb-3">
                          {article.publication}
                        </p>
                        <p className="text-lg font-bold leading-snug tracking-tight">
                          {article.headline}
                        </p>
                      </div>
                      <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 mt-1 flex-shrink-0 text-lg">
                        →
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm"
                        style={{
                          background: 'var(--portfolio-border)',
                          color: 'var(--portfolio-fg)',
                        }}
                      >
                        {article.tag}
                      </span>
                      <span className="text-xs opacity-40 tracking-widest">{article.date}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}
        </>
      )}

      {/* ── RECOMMENDATIONS SECTION (HORIZONTAL CAROUSEL) ── */}
      {isMobile ? (
        <ElasticSection
          id="recommendations"
          className="py-20 px-6"
          enabled
        >
          <div className="max-w-7xl mx-auto">
            <SplitTextReveal
              text="WHAT PEOPLE SAY"
              as="h2"
              className="text-5xl font-black tracking-tighter mb-12"
            />
            <LineReveal className="mb-12" />

            <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
              <motion.div
                className="flex gap-6 w-max"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {RECOMMENDATIONS.map((rec, i) => (
                  <motion.div
                    key={i}
                    className="flex-shrink-0 w-96 flex flex-col gap-6 p-6 rounded-lg"
                    style={{ borderColor: 'var(--portfolio-border)', borderWidth: '1px' }}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                    <span className="text-5xl font-black leading-none opacity-10 select-none">
                      "
                    </span>
                    <p className="text-base leading-relaxed opacity-80 italic flex-1">
                      {rec.quote}
                    </p>
                    <div className="pt-4" style={{ borderTop: '1px solid var(--portfolio-border)' }}>
                      <p className="font-bold tracking-tight">{rec.name}</p>
                      <p className="text-sm opacity-40 tracking-wide mt-1">
                        {rec.title} · {rec.company}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </ElasticSection>
      ) : (
        <AnimatedSection
          id="recommendations"
          className="py-24 md:py-32 px-6 md:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <ParallaxText speed={0.15}>
              <SplitTextReveal
                text="WHAT PEOPLE SAY"
                as="h2"
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4"
              />
            </ParallaxText>
            <LineReveal className="mb-16 md:mb-24" />

            <div className="overflow-x-auto scrollbar-hide -mx-12 px-12">
              <motion.div
                className="flex gap-8 w-max"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {RECOMMENDATIONS.map((rec, i) => (
                  <motion.div
                    key={i}
                    className="flex-shrink-0 w-[520px] flex flex-col gap-6 p-12 rounded-lg transition-colors duration-300"
                    style={{ borderColor: 'var(--portfolio-border)', borderWidth: '1px' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--portfolio-border-strong)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--portfolio-border)'}
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                  >
                    <span className="text-8xl font-black leading-none opacity-10 select-none -mb-4">
                      "
                    </span>
                    <p className="text-lg leading-relaxed opacity-80 italic flex-1">
                      {rec.quote}
                    </p>
                    <div className="pt-4" style={{ borderTop: '1px solid var(--portfolio-border)' }}>
                      <p className="font-bold tracking-tight">{rec.name}</p>
                      <p className="text-sm opacity-40 tracking-wide mt-1">
                        {rec.title} · {rec.company}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <p className="text-xs opacity-30 mt-8 text-center">
              Scroll to see more testimonials →
            </p>
          </div>
        </AnimatedSection>
      )}

      {/* ── ABOUT SECTION ── */}
      {isMobile ? (
        <ElasticSection
          id="about"
          className="py-20 px-6"
          enabled
        >
          <div className="max-w-7xl mx-auto">
            <SplitTextReveal
              text="ABOUT"
              as="h2"
              className="text-5xl font-black tracking-tighter mb-4"
            />
            <LineReveal className="mb-12" />

            <StaggeredReveal className="max-w-4xl space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight">
                  FROM LEATHER DESIGN TO PRODUCT DESIGN
                </h3>
                <p className="text-lg leading-relaxed opacity-80">
                  My journey began in structural thinking, designing physical products before designing experiences. That physical product mindset shaped how I approach product design. Intentionality in every detail, managing complex requirements, and thinking in systems, building with purpose and always considering the full picture. Over 6+ years, I've evolved from designing interfaces to designing entire product ecosystems. Every decision is structural. Every detail matters.
                </p>
              </div>

              <div className="pt-8">
                <LineReveal className="mb-8" />
                <h3 className="text-3xl font-bold mb-6 tracking-tight">
                  AI DRIVEN DESIGN
                </h3>
                <p className="text-lg leading-relaxed opacity-80">
                  Great design today isn't about working harder, it's about working smarter. I believe the next wave of product design will be fundamentally shaped by AI, not as a replacement for designers, but as an amplifier. I'm actively integrating AI tools into my design workflow and building frameworks for how design teams can leverage AI to move faster without sacrificing craft. The designers who embrace this shift will define the next decade of product.
                </p>
              </div>

              <div className="pt-8">
                <LineReveal className="mb-8" />
                <h3 className="text-3xl font-bold mb-6 tracking-tight">
                  BEYOND THE SCREEN
                </h3>
                <p className="text-lg leading-relaxed opacity-80">
                  When I'm not designing products, you'll find me taking a walk—I'm seeking inspiration through physical experiences. I'm fascinated by how humans explore and experience the world. I believe the best designers are curious observers, understanding behavior, psychology, and human needs beyond just digital touchpoints.
                </p>
              </div>
            </StaggeredReveal>
          </div>
        </ElasticSection>
      ) : (
        <AnimatedSection
          id="about"
          className="py-24 md:py-32 px-6 md:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <ParallaxText speed={0.15}>
              <SplitTextReveal
                text="ABOUT"
                as="h2"
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4"
              />
            </ParallaxText>
            <LineReveal className="mb-12 md:mb-16" />

            <div className="max-w-4xl space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                  FROM LEATHER DESIGN TO PRODUCT DESIGN
                </h3>
                <p className="text-lg md:text-xl leading-relaxed opacity-80">
                  My journey began in structural thinking, designing physical products before designing experiences. That physical product mindset shaped how I approach product design. Intentionality in every detail, managing complex requirements, and thinking in systems, building with purpose and always considering the full picture. Over 6+ years, I've evolved from designing interfaces to designing entire product ecosystems. Every decision is structural. Every detail matters.
                </p>
              </motion.div>

              <div className="pt-8">
                <LineReveal className="mb-8" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                    AI DRIVEN DESIGN
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed opacity-80">
                    Great design today isn't about working harder, it's about working smarter. I believe the next wave of product design will be fundamentally shaped by AI, not as a replacement for designers, but as an amplifier. I'm actively integrating AI tools into my design workflow and building frameworks for how design teams can leverage AI to move faster without sacrificing craft. The designers who embrace this shift will define the next decade of product.
                  </p>
                </motion.div>
              </div>

              <div className="pt-8">
                <LineReveal className="mb-8" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                    BEYOND THE SCREEN
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed opacity-80">
                    When I'm not designing products, you'll find me taking a walk—I'm seeking inspiration through physical experiences. I'm fascinated by how humans explore and experience the world. I believe the best designers are curious observers, understanding behavior, psychology, and human needs beyond just digital touchpoints.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* ── CONTACT SECTION ── */}
      {isMobile ? (
        <ElasticSection
          id="contact"
          className="py-20 px-6"
          enabled
        >
          <div className="max-w-7xl mx-auto w-full">
            <SplitTextReveal
              text="LET'S BUILD together"
              as="h2"
              className="text-5xl font-black tracking-tighter mb-4 leading-tight"
              styledWords={{ "together": "font-['Playfair_Display'] italic font-normal tracking-normal" }}
            />
            <LineReveal className="mb-12" />

            <StaggeredReveal className="space-y-6">
              <div>
                <motion.p
                  className="text-sm uppercase tracking-widest opacity-40 mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.4 }}
                  viewport={{ once: true }}
                >
                  EMAIL
                </motion.p>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold break-all">
                    ME@UMANGAGARWAL.IN
                  </span>
                  <CopyEmailButton email="me@umangagarwal.in" isMobile={true} />
                </div>
              </div>

              <div className="pt-6">
                <LineReveal className="mb-6" />
                <motion.p
                  className="text-sm uppercase tracking-widest opacity-40 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.4 }}
                  viewport={{ once: true }}
                >
                  CONNECT
                </motion.p>
                <div className="flex flex-col gap-6">
                  <WipeLink
                    href="https://www.linkedin.com/in/umang-agarwal-"
                    className="text-xl font-bold hover:opacity-70 transition-opacity"
                    external
                  >
                    LINKEDIN
                    <span className="inline-block ml-2">&rarr;</span>
                  </WipeLink>
                  <WipeLink
                    href="https://www.instagram.com/this_is_umg/"
                    className="text-xl font-bold hover:opacity-70 transition-opacity"
                    external
                  >
                    INSTAGRAM
                    <span className="inline-block ml-2">&rarr;</span>
                  </WipeLink>
                </div>
              </div>
            </StaggeredReveal>

            <motion.div
              className="mt-24 pt-12 flex flex-col justify-between items-start gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <LineReveal className="w-full absolute top-0 left-0" />
              <p className="text-sm opacity-40">
                &copy; 2026 Umang Agarwal. All rights reserved.
              </p>
              <p className="text-sm opacity-40">
                DESIGNED &amp; DEVELOPED WITH PRECISION
              </p>
            </motion.div>
          </div>
        </ElasticSection>
      ) : (
        <AnimatedSection
          id="contact"
          className="min-h-screen py-24 md:py-32 px-6 md:px-12 flex items-center"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-start justify-between gap-6 md:gap-12 mb-8">
              <ParallaxText speed={0.15}>
                <SplitTextReveal
                  text="LET'S BUILD together"
                  as="h2"
                  className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight"
                  styledWords={{ "together": "font-['Playfair_Display'] italic font-normal tracking-normal" }}
                />
              </ParallaxText>
              <motion.button
                onClick={() => setCVModalOpen(true)}
                className="px-4 md:px-6 py-2 md:py-3 rounded text-xs md:text-sm font-bold tracking-widest transition-colors flex-shrink-0 mt-2"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  borderColor: 'var(--portfolio-border)',
                  borderWidth: '1px',
                  color: 'var(--portfolio-fg)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                ⇩ RESUME
              </motion.button>
            </div>
            <LineReveal className="mb-12 md:mb-16" />

            <StaggeredReveal className="space-y-6 md:space-y-8">
              <div>
                <motion.p
                  className="text-sm md:text-base uppercase tracking-widest opacity-40 mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.4 }}
                  viewport={{ once: true }}
                >
                  EMAIL
                </motion.p>
                <div className="flex items-center gap-6">
                  <span className="text-3xl md:text-5xl lg:text-6xl font-bold break-all">
                    ME@UMANGAGARWAL.IN
                  </span>
                  <CopyEmailButton email="me@umangagarwal.in" isMobile={false} />
                </div>
              </div>

              <div className="pt-6">
                <LineReveal className="mb-6" />
                <motion.p
                  className="text-sm md:text-base uppercase tracking-widest opacity-40 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.4 }}
                  viewport={{ once: true }}
                >
                  CONNECT
                </motion.p>
                <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                  <WipeLink
                    href="https://www.linkedin.com/in/umang-agarwal-"
                    className="text-2xl md:text-3xl font-bold hover:opacity-70 transition-opacity"
                    external
                  >
                    LINKEDIN
                    <motion.span
                      className="inline-block ml-2"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      &rarr;
                    </motion.span>
                  </WipeLink>
                  <WipeLink
                    href="https://www.instagram.com/this_is_umg/"
                    className="text-2xl md:text-3xl font-bold hover:opacity-70 transition-opacity"
                    external
                  >
                    INSTAGRAM
                    <motion.span
                      className="inline-block ml-2"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      &rarr;
                    </motion.span>
                  </WipeLink>
                </div>
              </div>
            </StaggeredReveal>

            <motion.div
              className="mt-24 md:mt-32 pt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <LineReveal className="w-full absolute top-0 left-0" />
              <p className="text-sm opacity-40">
                &copy; 2026 Umang Agarwal. All rights reserved.
              </p>
              <p className="text-sm opacity-40">
                DESIGNED &amp; DEVELOPED WITH PRECISION
              </p>
            </motion.div>
          </div>
        </AnimatedSection>
      )}

      {/* ── PASSWORD DIALOG ── */}
      <PasswordDialog
        isOpen={passwordDialogOpen}
        onClose={() => {
          setPasswordDialogOpen(false);
          setPasswordInput('');
          setPasswordError(false);
        }}
        onSubmit={() => {
          if (
            selectedProjectForPassword &&
            passwordInput === selectedProjectForPassword.password
          ) {
            setUnlockedProjects([...unlockedProjects, selectedProjectForPassword.title]);
            setPasswordDialogOpen(false);
            setPasswordInput('');
            setPasswordError(false);

            // Navigate to the project if it has a slug
            if (selectedProjectForPassword.slug) {
              window.setTimeout(() => {
                window.location.href = selectedProjectForPassword.slug!;
              }, 300);
            }
          } else {
            setPasswordError(true);
          }
        }}
        projectTitle={selectedProjectForPassword?.title || ''}
        error={passwordError}
        input={passwordInput}
        onInputChange={setPasswordInput}
      />

      {/* ── CV MODAL ── */}
      <CVModal isOpen={cvModalOpen} onClose={() => setCVModalOpen(false)} />
    </div>
  );
}