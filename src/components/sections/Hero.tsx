"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Atom,
  Braces,
  Download,
  Eye,
  Layers,
  Mail,
  MapPin,
  Sparkles,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { personalInfo, socialLinks } from "@/data/portfolioData";
import { scrollToSection } from "@/utils/scrollToSection";
import {
  fadeInUp,
  headlineContainer,
  headlineWord,
  transitionConfig,
} from "@/utils/motion";

/* ---------- Floating 3D chip ---------- */
function FloatingChip({
  icon: Icon,
  label,
  className,
  z,
  delay,
  duration,
  reduceMotion,
}: {
  icon: LucideIcon;
  label: string;
  className: string;
  z: number;
  delay: number;
  duration: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      style={{ z }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        reduceMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, y: [0, -12, 0] }
      }
      transition={{
        opacity: { duration: 0.5, delay: 0.9 + delay },
        scale: { duration: 0.5, delay: 0.9 + delay },
        y: { duration, delay, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`absolute hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-2/90 backdrop-blur-md border border-line shadow-xl shadow-black/40 text-[11px] font-mono text-fg ${className}`}
    >
      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-accent/15 text-accent-fg">
        <Icon className="w-3.5 h-3.5" />
      </span>
      {label}
    </motion.div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  /* ---------- Resume button state ---------- */
  const [resumeNote, setResumeNote] = useState(false);

  const handleResumeMissing = () => {
    setResumeNote(true);
    setTimeout(() => setResumeNote(false), 2500);
  };

  /* ---------- Section mouse: ambient light + parallax orbs ---------- */
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
    [lx, ly, reduceMotion],
  );

  /* ---------- 3D tilt card ---------- */
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

  const headlineWords = [
    { text: "Turning", highlight: false },
    { text: "ideas", highlight: false },
    { text: "into", highlight: false },
    { text: "digital", highlight: true },
    { text: "experiences.", highlight: true },
  ];

  return (
    <section
      id="hero"
      onMouseMove={handleSectionMove}
      className="relative min-h-[94vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 px-6 md:px-12 max-w-6xl mx-auto w-full overflow-hidden"
    >
      <div aria-hidden className="bg-aurora absolute inset-0 pointer-events-none -z-10" />

      {/* Background: cursor light */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none -z-10 opacity-50 sm:opacity-80"
        style={{ background: ambient }}
      />

      {/* Background: faint grid, fades out at the edges */}
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
        className="absolute top-1/4 -right-24 w-96 h-96 bg-accent/8 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        aria-hidden
        style={{ x: orb2X, y: orb2Y }}
        className="absolute -top-12 left-1/3 w-72 h-72 bg-line/30 rounded-full blur-2xl pointer-events-none -z-10"
      />

      {/* Main grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center py-6 sm:py-8">
        {/* Left: text */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Status row */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="flex flex-wrap items-center gap-3 mb-6"
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

          {/* Name */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="mb-4"
          >
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-muted">
              Personal Portfolio of
            </span>
            <h2 className="text-2xl sm:text-3xl text-fg tracking-tight mt-0.5">
              <span className="font-bold">{personalInfo.name}</span>
            </h2>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-fg leading-[1.08] mb-6 sm:mb-8 flex flex-wrap gap-x-3.5 sm:gap-x-4 gap-y-1"
          >
            {headlineWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-0.5">
                <motion.span
                  variants={headlineWord}
                  className={`inline-block ${
                    word.highlight
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-fg to-accent"
                      : "text-fg"
                  }`}
                >
                  {word.text}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="text-base sm:text-lg text-muted max-w-xl leading-relaxed mb-8 sm:mb-10 font-normal"
          >
            {personalInfo.supportingText}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.65}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <Link
              href="#projects"
              onClick={(e) => scrollToSection(e, "#projects")}
              className="group relative inline-flex items-center gap-2.5 bg-accent hover:bg-accent-hover text-on-accent font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-full transition-all duration-300 active:scale-95 shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <Link
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="group relative inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-4 text-fg border border-line hover:border-accent/60 text-xs font-semibold uppercase tracking-wider px-6 py-4 rounded-full transition-all duration-300 active:scale-95 hover:-translate-y-0.5"
            >
              <span>Let&apos;s Connect</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all" />
            </Link>

            {/* Resume: download + view */}
            {personalInfo.resumeUrl ? (
              <div className="inline-flex items-stretch rounded-full bg-surface-2 border border-line hover:border-accent/60 transition-colors duration-300 overflow-hidden">
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="group inline-flex items-center gap-2 pl-6 pr-4 py-4 text-xs font-semibold uppercase tracking-wider text-fg hover:text-accent-fg hover:bg-surface-4 transition-colors active:scale-95"
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
                  className="inline-flex items-center px-4 border-l border-line text-muted hover:text-accent-fg hover:bg-surface-4 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleResumeMissing}
                className="group inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-4 text-fg border border-line hover:border-accent/60 text-xs font-semibold uppercase tracking-wider px-6 py-4 rounded-full transition-all duration-300 active:scale-95 hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4 text-accent-fg" />
                <span>{resumeNote ? "Coming soon" : "Resume"}</span>
              </button>
            )}

            <div className="flex items-center gap-1.5 pl-2 sm:border-l sm:border-line/80">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target={social.iconName === "mail" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={`${social.platform} profile`}
                  title={social.platform}
                  className="p-3 rounded-full text-muted hover:text-accent-fg hover:bg-line/50 transition-all duration-200 hover:scale-110"
                >
                  {social.iconName === "github" ? (
                    <GithubIcon className="w-4 h-4" />
                  ) : social.iconName === "linkedin" ? (
                    <LinkedinIcon className="w-4 h-4" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: 3D portrait scene */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.35,
              ease: transitionConfig.easeEditorial,
            }}
            className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[370px]"
            style={{ perspective: 1100 }}
          >
            {/* Tilt layer */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleCardMove}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={handleCardLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Back layer: soft aura */}
              <div
                aria-hidden
                style={{ transform: "translateZ(-60px)" }}
                className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-accent/30 via-accent/10 to-transparent blur-2xl opacity-80 pointer-events-none"
              />

              {/* Back layer: rotating dashed ring */}
              {!reduceMotion && (
                <motion.div
                  aria-hidden
                  style={{ z: -30 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-8 rounded-full border border-dashed border-accent/25 pointer-events-none"
                />
              )}

              {/* Main frame */}
              <div className="relative p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl bg-surface border border-line hover:border-accent/50 shadow-2xl shadow-black/50 transition-colors duration-300">
                <div className="absolute top-3.5 right-3.5 z-10 w-2 h-2 rounded-full bg-accent opacity-80" />

                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[3/4] bg-sunken">
                  <Image
                    src="/Assits/profile images/profile image.jpg"
                    alt="Portrait of Borshon Roy, Web Developer"
                    width={450}
                    height={600}
                    priority
                    className="w-full h-full object-cover object-top"
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 370px"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-canvas/70 to-transparent pointer-events-none" />

                  {/* Glare that follows the cursor */}
                  {!reduceMotion && (
                    <motion.div
                      aria-hidden
                      style={{ background: glare, opacity: hovering ? 1 : 0 }}
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay"
                    />
                  )}
                </div>

                {/* Floating name plate */}
                <div
                  style={{ transform: "translateZ(40px)" }}
                  className="mt-3 px-3.5 py-2.5 rounded-xl bg-canvas/95 border border-line/90 flex items-center justify-between text-[11px] font-mono shadow-lg shadow-black/40"
                >
                  <span className="text-muted flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    {personalInfo.name}
                  </span>
                  <span className="text-fg font-sans font-semibold">
                    {personalInfo.title}
                  </span>
                </div>
              </div>

              {/* Floating tech chips at different depths */}
              <FloatingChip
                icon={Layers}
                label="Next.js"
                z={90}
                delay={0}
                duration={4.2}
                reduceMotion={reduceMotion}
                className="-left-8 top-10"
              />
              <FloatingChip
                icon={Braces}
                label="TypeScript"
                z={70}
                delay={0.6}
                duration={5}
                reduceMotion={reduceMotion}
                className="-right-8 top-1/3"
              />
              <FloatingChip
                icon={Wind}
                label="Tailwind"
                z={110}
                delay={1.1}
                duration={4.6}
                reduceMotion={reduceMotion}
                className="-left-10 bottom-28"
              />
              <FloatingChip
                icon={Atom}
                label="React"
                z={80}
                delay={0.3}
                duration={5.4}
                reduceMotion={reduceMotion}
                className="-right-6 bottom-12"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0.8}
        className="pt-8 sm:pt-12 flex flex-col sm:flex-row sm:items-center justify-between border-t border-line/60 gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg border border-line bg-surface-2 flex items-center justify-center text-accent-fg">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs font-mono text-muted">
            <span className="text-fg block font-sans font-medium">
              Crafted with precision
            </span>
            Next.js App Router &bull; TypeScript &bull; Motion
          </div>
        </div>

        <Link
          href="#about"
          onClick={(e) => scrollToSection(e, "#about")}
          className="group inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-accent-fg transition-colors"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-accent-fg" />
        </Link>
      </motion.div>
    </section>
  );
}