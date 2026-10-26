"use client";

import React, { useRef, useState } from "react";
import { personalInfo } from "@/data/portfolioData";
import {
  Atom,
  BookOpen,
  Code2,
  Database,
  Gamepad2,
  Headphones,
  Layers,
  Palette,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { defaultViewport, fadeInUp, transitionConfig } from "@/utils/motion";

/* =====================================================================
   EDIT: apnar nijer kotha ekhane likhun
   ===================================================================== */

const bio = [
  "I'm a web developer intern in the making, currently studying for a Diploma in Computer Science & Technology. I enjoy turning ideas into clean, responsive interfaces that feel good to use.",
  "I learn by building. Every project I start is a chance to try something I haven't done before, from my first JavaScript exercises to a full-stack app with authentication and a database.",
  "I'm now looking for a web developer internship where I can learn from an experienced team and contribute to real products.",
];

const journey: {
  icon: LucideIcon;
  step: string;
  title: string;
  text: string;
}[] = [
  {
    icon: Code2,
    step: "Foundations",
    title: "HTML, CSS & JavaScript",
    text: "Started with the basics and practiced problem solving in a public JavaScript repository.",
  },
  {
    icon: Atom,
    step: "First app",
    title: "React & TypeScript",
    text: "Built DevStack Builder with React, TypeScript and Vite, learning components, state and toast feedback.",
  },
  {
    icon: Layers,
    step: "Leveling up",
    title: "Next.js & Tailwind",
    text: "Created FitLog, a workout tracker with filters, detail pages and saved exercises.",
  },
  {
    icon: Database,
    step: "Full-stack",
    title: "Auth & MongoDB",
    text: "Shipped BazarDor with Next.js App Router, Better Auth and MongoDB.",
  },
  {
    icon: Rocket,
    step: "Now",
    title: "Polish & animation",
    text: "Refining my craft with motion, 3D effects and this portfolio, while looking for an internship.",
  },
];

const enjoy = [
  "Responsive interfaces",
  "Animation & micro-interactions",
  "Next.js apps",
  "Problem solving",
];

// EDIT: hobby gulo apnar moto bodlan (icon + naam + chhoto lekha)
const hobbies: {
  icon: LucideIcon;
  title: string;
  text: string;
}[] = [
  {
    icon: Gamepad2,
    title: "Gaming",
    text: "A good way to unwind and a source of UI and game design ideas.",
  },
  {
    icon: Headphones,
    title: "Music",
    text: "Headphones on while coding keeps me focused for hours.",
  },
  {
    icon: BookOpen,
    title: "Reading",
    text: "Docs, blogs and books. I like learning something new every day.",
  },
  {
    icon: Palette,
    title: "Design",
    text: "I love studying great websites and figuring out why they feel right.",
  },
];

// EDIT: nijeke kemon bolben
const personality = {
  quote:
    "Curious by nature, detail-oriented by habit, and always building something.",
  traits: ["Curious", "Detail-oriented", "Consistent learner", "Team player"],
};

/* =====================================================================
   Reusable 3D tilt card
   ===================================================================== */
function TiltCard({
  children,
  className = "",
  intensity = 10,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 170, damping: 18, mass: 0.5 });
  const rotateY = useSpring(ry, { stiffness: 170, damping: 18, mass: 0.5 });

  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(var(--accent-rgb)/0.16), transparent 55%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * intensity * 2);
    rx.set((0.5 - py) * intensity * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{
        duration: 0.6,
        delay,
        ease: transitionConfig.easeEditorial,
      }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group relative ${className}`}
      >
        {!reduceMotion && (
          <motion.div
            aria-hidden
            style={{ background: glare }}
            className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
        {children}
      </motion.div>
    </motion.div>
  );
}

/* =====================================================================
   3D flip card
   Mouse: hover | Keyboard: Tab / Enter / Space | Touch: tap
   ===================================================================== */
function FlipCard({
  icon: Icon,
  title,
  text,
  index,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  const face: React.CSSProperties = {
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: transitionConfig.easeEditorial,
      }}
      style={{ perspective: 900 }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${title}. Press to ${flipped ? "hide" : "show"} details`}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setFlipped(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setFlipped(false);
        }}
        onFocus={(e) => {
          // Shudhu keyboard focus e flip hoy, tap e na
          if (e.currentTarget.matches(":focus-visible")) setFlipped(true);
        }}
        onBlur={() => setFlipped(false)}
        onClick={(e) => {
          // Mouse e hover-i flip kore, tai click e touch/pen e toggle hoy
          const type = (e.nativeEvent as PointerEvent).pointerType;
          if (type !== "mouse") setFlipped((v) => !v);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((v) => !v);
          }
        }}
        className="relative h-44 outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-2xl"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 110, damping: 16 }
          }
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full h-full"
        >
          {/* Front */}
          <div
            style={face}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-surface border border-line shadow-lg shadow-black/20"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface-3 border border-line-strong text-accent-fg">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-base font-semibold text-fg">
              {title}
            </span>
          </div>

          {/* Back */}
          <div
            style={{ ...face, transform: "rotateY(180deg)" }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center rounded-2xl bg-tint border border-accent/50 shadow-lg shadow-accent/10"
          >
            <Icon className="w-4 h-4 text-accent-fg" />
            <p className="text-xs text-fg/85 leading-relaxed">{text}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* =====================================================================
   Section
   ===================================================================== */
export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="scroll-mt-24 py-24 sm:py-32 px-6 md:px-12 max-w-6xl mx-auto w-full"
    >
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="flex flex-col md:flex-row md:items-end justify-between border-b border-line/80 pb-8 mb-16 gap-6 relative"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-accent-fg uppercase tracking-widest font-semibold">
              01 // Profile &amp; Purpose
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-12 h-[1px] bg-accent origin-left"
            />
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-fg">
            About Me
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-muted max-w-xs md:text-right">
          My journey, the work I enjoy, and who I am outside of code.
        </p>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left column: story */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* 3D flip-up reveal */}
          <motion.div
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, rotateX: -22, y: 40 }
            }
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.9, ease: transitionConfig.easeEditorial }}
            style={{ transformPerspective: 1200, transformOrigin: "top center" }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-xl sm:text-2xl font-light text-fg leading-relaxed">
              Hi, I&apos;m{" "}
              <span className="font-semibold text-accent-fg">
                {personalInfo.name}
              </span>
              , a {personalInfo.title.toLowerCase()} who learns by building real
              things.
            </h3>

            <div className="space-y-4 text-base text-muted leading-relaxed font-normal">
              {bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Work I enjoy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, ease: transitionConfig.easeEditorial }}
            className="pt-6 border-t border-line/60"
          >
            <div className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
              Work I enjoy
            </div>
            <div className="flex flex-wrap gap-2.5">
              {enjoy.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                  className="inline-flex items-center gap-2 text-xs font-mono px-3.5 py-2 rounded-xl bg-surface-3 text-fg border border-line hover:border-accent/50 hover:text-accent-fg transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-accent-fg" />
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Info tiles (3D tilt) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
            <TiltCard
              intensity={14}
              delay={0}
              className="h-full bg-surface p-4 rounded-xl border border-line/80 hover:border-accent/40 transition-colors"
            >
              <span className="text-muted block mb-1">LOCATION</span>
              <span
                style={{ transform: "translateZ(24px)" }}
                className="block text-fg font-medium"
              >
                {personalInfo.location}
              </span>
            </TiltCard>

            <TiltCard
              intensity={14}
              delay={0.08}
              className="h-full bg-surface p-4 rounded-xl border border-line/80 hover:border-accent/40 transition-colors"
            >
              <span className="text-muted block mb-1">ROLE</span>
              <span
                style={{ transform: "translateZ(24px)" }}
                className="block text-fg font-medium"
              >
                {personalInfo.title}
              </span>
            </TiltCard>

            <div className="col-span-2 sm:col-span-1">
              <TiltCard
                intensity={14}
                delay={0.16}
                className="h-full bg-surface p-4 rounded-xl border border-line/80 hover:border-accent/40 transition-colors"
              >
                <span className="text-muted block mb-1">STATUS</span>
                <span
                  style={{ transform: "translateZ(24px)" }}
                  className="text-accent-fg font-medium flex items-center gap-1.5"
                >
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-accent" />
                  </span>
                  {personalInfo.isAvailableForWork
                    ? "Open to internships"
                    : "Currently busy"}
                </span>
              </TiltCard>
            </div>
          </div>
        </div>

        {/* Right column: journey timeline */}
        <div className="lg:col-span-5">
          <div className="text-xs font-mono text-muted uppercase tracking-wider mb-6">
            My programming journey
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute left-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-accent/60 via-line to-transparent"
            />

            <div className="flex flex-col gap-4">
              {journey.map((item, index) => {
                const Icon = item.icon;
                const isNow = index === journey.length - 1;

                return (
                  <div key={item.title} className="relative pl-14">
                    {/* Timeline node */}
                    <span className="absolute left-0 top-5 flex items-center justify-center w-10 h-10 rounded-xl bg-surface border border-accent/50 text-accent-fg">
                      {isNow && (
                        <span className="absolute inset-0 rounded-xl bg-accent/20 animate-ping" />
                      )}
                      <Icon className="relative w-4 h-4" />
                    </span>

                    <TiltCard
                      intensity={8}
                      delay={index * 0.1}
                      className="p-5 rounded-2xl bg-surface border border-line hover:border-accent/60 transition-colors duration-300 shadow-lg shadow-black/20"
                    >
                      <div className="relative">
                        <span
                          style={{ transform: "translateZ(14px)" }}
                          className="block text-[10px] font-mono uppercase tracking-wider text-accent-fg mb-1"
                        >
                          {item.step}
                        </span>
                        <h4
                          style={{ transform: "translateZ(28px)" }}
                          className="text-base font-semibold text-fg mb-1.5 group-hover:text-accent-fg transition-colors"
                        >
                          {item.title}
                        </h4>
                        <p
                          style={{ transform: "translateZ(10px)" }}
                          className="text-xs text-muted leading-relaxed"
                        >
                          {item.text}
                        </p>
                      </div>
                    </TiltCard>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Beyond code */}
      <div className="mt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8"
        >
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-fg">
            Beyond the code
          </h3>
          <span className="text-xs font-mono text-muted">
            Hover or tap a card to flip it
          </span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {hobbies.map((hobby, i) => (
            <FlipCard
              key={hobby.title}
              icon={hobby.icon}
              title={hobby.title}
              text={hobby.text}
              index={i}
            />
          ))}
        </div>

        {/* Personality */}
        <TiltCard
          intensity={4}
          delay={0.1}
          className="mt-6 p-6 sm:p-8 rounded-2xl bg-surface border border-line hover:border-accent/50 transition-colors duration-300 shadow-xl shadow-black/20"
        >
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <p
              style={{ transform: "translateZ(24px)" }}
              className="text-lg sm:text-xl font-light text-fg leading-relaxed max-w-2xl"
            >
              <span className="text-accent-fg font-semibold">&ldquo;</span>
              {personality.quote}
              <span className="text-accent-fg font-semibold">&rdquo;</span>
            </p>

            <div
              style={{ transform: "translateZ(14px)" }}
              className="flex flex-wrap gap-2 lg:justify-end"
            >
              {personality.traits.map((trait) => (
                <span
                  key={trait}
                  className="text-xs font-mono px-3 py-1.5 rounded-full bg-accent/10 text-accent-fg border border-accent/30"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}