"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, Eye, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import {
  BrandIcon,
  brandFor,
  brandSurface,
} from "@/components/ui/BrandIcon";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { personalInfo, projects, socialLinks } from "@/data/portfolioData";
import type { SocialLink } from "@/types/portfolio";
import { scrollToSection } from "@/utils/scrollToSection";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* =====================================================================
   Preloader shesh na hole Hero animate kore na
   ===================================================================== */
type IntroWindow = Window & { __preloaderDone?: boolean };

const subscribeIntro = (cb: () => void) => {
  window.addEventListener("preloader:done", cb);
  return () => window.removeEventListener("preloader:done", cb);
};
const introSnapshot = () => Boolean((window as IntroWindow).__preloaderDone);

function useIntroReady() {
  const done = useSyncExternalStore(subscribeIntro, introSnapshot, () => false);
  const [forced, setForced] = useState(false);

  // Safety: kono karone event na ashle 7 sec pore ei ready hobe
  useEffect(() => {
    const t = setTimeout(() => setForced(true), 7000);
    return () => clearTimeout(t);
  }, []);

  return done || forced;
}

/* =====================================================================
   Data
   ===================================================================== */
const ROLES = [
  "Full-Stack Developer",
  "React & Next.js Builder",
  "API & Database Design",
  "Always Learning",
];

const HEADLINE = [
  { text: "Turning", accent: false, underline: false },
  { text: "ideas", accent: false, underline: false },
  { text: "into", accent: false, underline: false },
  { text: "digital", accent: true, underline: false },
  { text: "experiences.", accent: true, underline: true },
];

// Marquee e shudhu asol tech (concept skill na)
const TECH = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Mongoose",
  "Better Auth",
  "Git",
  "GitHub",
];

const LIVE_COUNT = projects.filter((p) => p.liveUrl).length;

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: EASE },
  }),
};

/* =====================================================================
   Rotating role
   ===================================================================== */
function RoleSwap({ reduceMotion }: { reduceMotion: boolean | null }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2600);
    return () => clearInterval(t);
  }, [reduceMotion]);

  return (
    <span className="relative inline-block h-5 min-w-[13rem] overflow-hidden align-bottom">
      <AnimatePresence initial={false}>
        <motion.span
          key={ROLES[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="absolute left-0 top-0 whitespace-nowrap"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* =====================================================================
   Magnetic wrapper
   ===================================================================== */
function Magnetic({
  children,
  strength = 0.28,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* =====================================================================
   Floating 3D chip (asol brand logo)
   ===================================================================== */
function FloatingChip({
  name,
  className,
  z,
  delay,
  duration,
  ready,
  reduceMotion,
}: {
  name: string;
  className: string;
  z: number;
  delay: number;
  duration: number;
  ready: boolean;
  reduceMotion: boolean | null;
}) {
  const brand = brandFor(name);

  return (
    <motion.div
      style={{ z }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: ready ? 0.9 + delay : 0 }}
      className={`absolute hidden sm:block ${className}`}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2.5 rounded-xl border border-line bg-surface/90 py-1.5 pl-1.5 pr-3 font-mono text-[11px] text-fg shadow-xl shadow-black/30 backdrop-blur-md"
      >
        <span
          style={brandSurface(brand)}
          className="flex h-7 w-7 items-center justify-center rounded-lg border"
        >
          <BrandIcon brand={brand} className="h-4 w-4" />
        </span>
        {name}
      </motion.div>
    </motion.div>
  );
}

/* =====================================================================
   Social button
   GitHub / LinkedIn: notun tab e khole.
   Email: copy hoy + mail app kholar chesta kore (mail app na thakleo kaj kore).
   ===================================================================== */
function SocialButton({ social }: { social: SocialLink }) {
  const isMail = social.iconName === "mail";
  const email = isMail ? social.url.replace(/^mailto:/i, "") : "";
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    if (!isMail) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked, mailto abar-o khulte chesta korbe */
    }
  };

  const label = isMail ? "Email" : social.platform;

  return (
    <a
      href={social.url}
      target={isMail ? undefined : "_blank"}
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={isMail ? `Email ${email}` : `${social.platform} profile`}
      className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface-2 text-fg transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-on-accent active:scale-95"
    >
      {social.iconName === "github" ? (
        <GithubIcon className="h-4 w-4" />
      ) : social.iconName === "linkedin" ? (
        <LinkedinIcon className="h-4 w-4" />
      ) : (
        <Mail className="h-4 w-4" />
      )}

      <span
        className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-canvas/95 px-2 py-1 text-[10px] font-mono text-fg transition-opacity duration-200 ${
          copied ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {copied ? "Email copied" : label}
      </span>
    </a>
  );
}

/* =====================================================================
   Hero
   ===================================================================== */
export default function Hero() {
  const reduceMotion = useReducedMotion();
  const ready = useIntroReady();
  const state = ready ? "visible" : "hidden";

  const sectionRef = useRef<HTMLElement>(null);

  /* ---------- Resume button (PDF na thakle) ---------- */
  const [resumeNote, setResumeNote] = useState(false);
  const handleResumeMissing = () => {
    setResumeNote(true);
    setTimeout(() => setResumeNote(false), 2500);
  };

  /* ---------- Scroll parallax ---------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  /* ---------- Mouse: ambient light + parallax orbs ---------- */
  const lx = useMotionValue(50);
  const ly = useMotionValue(50);
  const ambient = useMotionTemplate`radial-gradient(circle 520px at ${lx}% ${ly}%, rgb(var(--accent-rgb)/0.14), transparent 75%)`;

  const slx = useSpring(lx, { stiffness: 60, damping: 20 });
  const sly = useSpring(ly, { stiffness: 60, damping: 20 });
  const orb1X = useTransform(slx, [0, 100], [-40, 40]);
  const orb1Y = useTransform(sly, [0, 100], [-30, 30]);
  const orb2X = useTransform(slx, [0, 100], [30, -30]);
  const orb2Y = useTransform(sly, [0, 100], [20, -20]);

  const handleSectionMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      lx.set(((e.clientX - rect.left) / rect.width) * 100);
      ly.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [lx, ly, reduceMotion]
  );

  /* ---------- 3D tilt portrait ---------- */
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 16, mass: 0.5 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 16, mass: 0.5 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.16), transparent 55%)`;

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 18);
    rx.set((0.5 - py) * 18);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const handleCardLeave = () => {
    rx.set(0);
    ry.set(0);
    setHovering(false);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleSectionMove}
      className="relative min-h-[94vh] flex flex-col justify-between pt-28 sm:pt-32 pb-10 px-6 md:px-12 max-w-6xl mx-auto w-full overflow-hidden"
    >
      {/* Background: cursor light */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none -z-10 opacity-50 sm:opacity-80"
        style={{ background: ambient }}
      />

      {/* Background: faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 60% 45%, #000 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 60% 45%, #000 20%, transparent 75%)",
        }}
      />

      {/* Background: parallax orbs */}
      <motion.div
        aria-hidden
        style={{ x: orb1X, y: orb1Y }}
        className="absolute top-1/4 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        aria-hidden
        style={{ x: orb2X, y: orb2Y }}
        className="absolute -top-12 left-1/3 w-72 h-72 bg-line/40 rounded-full blur-2xl pointer-events-none -z-10"
      />

      {/* Main grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center py-6 sm:py-8">
        {/* Left: text */}
        <motion.div
          style={reduceMotion ? undefined : { y: textY, opacity: textOpacity }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Status row */}
          <motion.div
            variants={rise}
            custom={0.05}
            initial="hidden"
            animate={state}
            className="flex flex-wrap items-center gap-3 mb-7"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-surface-2 border border-line text-accent-fg shadow-sm">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-accent" />
              </span>
              {personalInfo.eyebrow}
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted">
              <MapPin className="w-3.5 h-3.5 text-accent-fg" />
              {personalInfo.location}
            </span>

            {personalInfo.isAvailableForWork && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-fg px-3 py-1 rounded-full bg-accent/10 border border-accent/30">
                Open to work
              </span>
            )}
          </motion.div>

          {/* Name + rotating role */}
          <motion.div
            variants={rise}
            custom={0.15}
            initial="hidden"
            animate={state}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-5"
          >
            <span className="text-xl sm:text-2xl font-semibold tracking-tight text-fg">
              {personalInfo.name}
            </span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            <span className="text-sm font-mono text-accent-fg">
              <RoleSwap reduceMotion={reduceMotion} />
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl 2xl:text-7xl font-extrabold tracking-tight leading-[1.04] mb-6 sm:mb-8 flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-0">
            {HEADLINE.map((w, i) => (
              <span key={w.text} className="relative inline-block">
                <span className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em]">
                  <motion.span
                    initial={{ y: "115%" }}
                    animate={{ y: ready ? "0%" : "115%" }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.85, delay: 0.25 + i * 0.09, ease: EASE }
                    }
                    className={`inline-block ${
                      w.accent
                        ? "font-display italic font-normal text-[1.08em] text-accent-fg"
                        : "text-fg"
                    }`}
                  >
                    {w.text}
                  </motion.span>
                </span>

                {w.underline && (
                  <svg
                    aria-hidden
                    viewBox="0 0 300 10"
                    preserveAspectRatio="none"
                    className="absolute left-0 right-0 -bottom-2 h-2.5 w-full text-accent"
                  >
                    <motion.path
                      d="M2 7 C 50 1, 110 11, 170 4 S 230 8, 298 3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: ready ? 1 : 0 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 1, delay: 1.35, ease: EASE }
                      }
                    />
                  </svg>
                )}
              </span>
            ))}
          </h1>

          {/* Supporting copy */}
          <motion.p
            variants={rise}
            custom={0.7}
            initial="hidden"
            animate={state}
            className="text-base sm:text-lg text-muted max-w-xl leading-relaxed mb-8 sm:mb-10"
          >
            {personalInfo.supportingText}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={rise}
            custom={0.85}
            initial="hidden"
            animate={state}
            className="flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <Magnetic>
              <Link
                href="#projects"
                onClick={(e) => scrollToSection(e, "#projects")}
                className="group inline-flex items-center gap-2.5 bg-accent hover:bg-accent-hover text-on-accent font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-full transition-colors duration-300 active:scale-95 shadow-lg shadow-accent/25"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Magnetic>

            <Magnetic strength={0.2}>
              <Link
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="group inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-3 text-fg border border-line hover:border-accent/60 text-xs font-semibold uppercase tracking-wider px-6 py-4 rounded-full transition-colors duration-300 active:scale-95"
              >
                <span>Let&apos;s Connect</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all" />
              </Link>
            </Magnetic>

            {/* Resume */}
            {personalInfo.resumeUrl ? (
              <div className="inline-flex items-stretch rounded-full bg-surface-2 border border-line hover:border-accent/60 transition-colors duration-300 overflow-hidden">
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="group inline-flex items-center gap-2 pl-6 pr-4 py-4 text-xs font-semibold uppercase tracking-wider text-fg hover:text-accent-fg hover:bg-surface-3 transition-colors active:scale-95"
                >
                  <Download className="w-4 h-4 text-accent-fg transition-transform duration-300 group-hover:translate-y-0.5" />
                  <span>Resume</span>
                </a>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View resume in a new tab"
                  title="View resume"
                  className="inline-flex items-center px-4 border-l border-line text-muted hover:text-accent-fg hover:bg-surface-3 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleResumeMissing}
                className="group inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-3 text-fg border border-line hover:border-accent/60 text-xs font-semibold uppercase tracking-wider px-6 py-4 rounded-full transition-all duration-300 active:scale-95"
              >
                <Download className="w-4 h-4 text-accent-fg" />
                <span>{resumeNote ? "Coming soon" : "Resume"}</span>
              </button>
            )}
          </motion.div>

          {/* Social links (alada row) */}
          <motion.div
            variants={rise}
            custom={1}
            initial="hidden"
            animate={state}
            className="relative z-20 mt-7 flex items-center gap-3"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted">
              Find me on
            </span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <SocialButton key={social.platform} social={social} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: 3D portrait */}
        <motion.div
          style={reduceMotion ? undefined : { y: cardY }}
          className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={
              ready
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.94, y: 30 }
            }
            transition={{ duration: 0.9, delay: ready ? 0.3 : 0, ease: EASE }}
            className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[370px]"
            style={{ perspective: 1100 }}
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleCardMove}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={handleCardLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Aura */}
              <div
                aria-hidden
                style={{ transform: "translateZ(-60px)" }}
                className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-accent/30 via-accent/10 to-transparent blur-2xl opacity-80 pointer-events-none"
              />

              {/* Rotating dashed ring */}
              {!reduceMotion && (
                <motion.div
                  aria-hidden
                  style={{ z: -30 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 rounded-full border border-dashed border-accent/25 pointer-events-none"
                />
              )}

              {/* Frame */}
              <div className="relative p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl bg-surface border border-line hover:border-accent/50 shadow-2xl shadow-black/40 transition-colors duration-300">
                <div className="absolute top-3.5 right-3.5 z-10 w-2 h-2 rounded-full bg-accent opacity-80" />

                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[3/4] bg-sunken">
                  <Image
                    src="/Assits/profile images/profile image.jpg"
                    alt={`Portrait of ${personalInfo.name}, ${personalInfo.title}`}
                    width={450}
                    height={600}
                    priority
                    className="w-full h-full object-cover object-top"
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 370px"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                  {!reduceMotion && (
                    <motion.div
                      aria-hidden
                      style={{ background: glare, opacity: hovering ? 1 : 0 }}
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay"
                    />
                  )}
                </div>

                <div
                  style={{ transform: "translateZ(40px)" }}
                  className="mt-3 px-3.5 py-2.5 rounded-xl bg-canvas/95 border border-line/90 flex items-center justify-between gap-3 text-[11px] font-mono shadow-lg shadow-black/30"
                >
                  <span className="text-muted flex items-center gap-2 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    {personalInfo.name}
                  </span>
                  <span className="text-fg font-sans font-semibold text-right">
                    {personalInfo.title}
                  </span>
                </div>
              </div>

              {/* Chips: frontend + backend + database */}
              <FloatingChip
                name="Next.js"
                z={90}
                delay={0}
                duration={4.2}
                ready={ready}
                reduceMotion={reduceMotion}
                className="-left-8 top-10"
              />
              <FloatingChip
                name="TypeScript"
                z={70}
                delay={0.6}
                duration={5}
                ready={ready}
                reduceMotion={reduceMotion}
                className="-right-8 top-1/3"
              />
              <FloatingChip
                name="Node.js"
                z={110}
                delay={1.1}
                duration={4.6}
                ready={ready}
                reduceMotion={reduceMotion}
                className="-left-10 bottom-28"
              />
              <FloatingChip
                name="MongoDB"
                z={80}
                delay={0.3}
                duration={5.4}
                ready={ready}
                reduceMotion={reduceMotion}
                className="-right-6 bottom-12"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom: marquee + scroll cue */}
      <motion.div
        variants={rise}
        custom={1.1}
        initial="hidden"
        animate={state}
        className="pt-8 sm:pt-10 border-t border-line/60 flex flex-col gap-6"
      >
        <div
          className="marquee relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          <div className="marquee-track flex w-max">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-10 pr-10"
              >
                {TECH.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-10 whitespace-nowrap text-sm font-mono uppercase tracking-widest text-muted"
                  >
                    {name}
                    <span className="h-1 w-1 rounded-full bg-accent" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Link
            href="#projects"
            onClick={(e) => scrollToSection(e, "#projects")}
            className="group inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-accent-fg transition-colors"
          >
            <span>
              {projects.length} projects · {LIVE_COUNT} live demos
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            href="#about"
            onClick={(e) => scrollToSection(e, "#about")}
            className="group inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted hover:text-accent-fg transition-colors"
          >
            <span className="relative flex h-8 w-5 justify-center overflow-hidden rounded-full border border-line-strong group-hover:border-accent/60 transition-colors">
              <motion.span
                animate={
                  reduceMotion ? undefined : { y: [0, 12], opacity: [1, 0] }
                }
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="mt-1.5 h-1.5 w-0.5 rounded-full bg-accent"
              />
            </span>
            <span className="hidden sm:inline">Scroll</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}