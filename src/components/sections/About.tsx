"use client";

import React, { useEffect, useRef, useState } from "react";
import { personalInfo, projects, skillCategories } from "@/data/portfolioData";
import {
  Atom,
  BookOpen,
  Code2,
  Database,
  GraduationCap,
  Layers,
  Puzzle,
  Rocket,
  Search,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { defaultViewport, fadeInUp } from "@/utils/motion";
import { BrandIcon, brandFor, brandSurface } from "@/components/ui/BrandIcon";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* =====================================================================
   Content (apnar text)
   ===================================================================== */

const intro =
  "I'm a Full-Stack Web Developer passionate about building modern, scalable, and user-focused web applications. My work focuses on connecting intuitive frontend experiences with reliable backend systems to create meaningful digital products.";

const foundation =
  "My technical foundation includes JavaScript, TypeScript, React, Next.js, Tailwind CSS, Node.js, Express.js, MongoDB, Mongoose, and Better Auth. Beyond coding, I'm interested in API and database design, client-server architecture, AI-driven engineering workflows, and the overall product development process.";

const education = {
  degree: "Diploma in Computer Science & Technology",
  institute: "Dinajpur Government Polytechnic Institute",
  status: "Currently pursuing",
  text: "Where I continue to develop my technical knowledge and problem-solving abilities.",
};

const interests = [
  "API & database design",
  "Client-server architecture",
  "AI-driven engineering workflows",
  "Product development",
];

const belief = {
  quote: "I believe great software comes from more than writing code.",
  body: "It requires understanding problems, designing thoughtful solutions, and continuously learning as technology evolves. My goal is to grow as a software engineer, build practical solutions to real-world problems, and contribute to products that deliver meaningful value.",
  closing:
    "I'm always exploring new technologies, refining my engineering skills, and turning ideas into functional digital experiences.",
};

const principles: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Search,
    title: "Understand the problem",
    text: "Great software starts with knowing what actually needs solving.",
  },
  {
    icon: Puzzle,
    title: "Design thoughtful solutions",
    text: "Connecting frontend, backend and data into something reliable.",
  },
  {
    icon: BookOpen,
    title: "Keep learning",
    text: "Technology keeps evolving, so I keep exploring and refining my skills.",
  },
  {
    icon: Users,
    title: "Build for people",
    text: "Turning ideas into functional, user-focused digital experiences.",
  },
];

// Journey: project ar skill theke neya. Apnar moto bodlate paren.
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
    step: "Backend & data",
    title: "Node.js, Express & MongoDB",
    text: "Moved to the server side: Node.js and Express, MongoDB with Mongoose, and secure authentication with Better Auth.",
  },
  {
    icon: Rocket,
    step: "Now",
    title: "Product thinking",
    text: "Designing APIs and data models, thinking in whole products, and studying for my Diploma while building.",
  },
];

/* Stats real data theke ashe, kono number banano na */
const SKILL_COUNT = new Set(
  skillCategories.flatMap((c) => c.skills.map((s) => s.name))
).size;

const STATS = [
  { value: projects.length, label: "Projects built" },
  { value: projects.filter((p) => p.liveUrl).length, label: "Live demos" },
  { value: SKILL_COUNT, label: "Skills" },
];

/* =====================================================================
   3D tech cube (drag kore ghurano jay)
   ===================================================================== */
const CUBE = 112;
const HALF = CUBE / 2;
const CUBE_FACES = [
  `rotateY(0deg) translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(270deg) translateZ(${HALF}px)`,
  `rotateX(90deg) translateZ(${HALF}px)`,
  `rotateX(-90deg) translateZ(${HALF}px)`,
];
const CORE_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB",
];

function StackCube() {
  const reduceMotion = useReducedMotion();
  const rotY = useMotionValue(28);
  const rotX = useMotionValue(-22);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useAnimationFrame((_, delta) => {
    if (reduceMotion || dragging.current) return;
    rotY.set(rotY.get() + delta * 0.022);
  });

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    rotY.set(rotY.get() + (e.clientX - last.current.x) * 0.6);
    rotX.set(
      Math.max(-70, Math.min(70, rotX.get() - (e.clientY - last.current.y) * 0.4))
    );
    last.current = { x: e.clientX, y: e.clientY };
  };

  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative mb-8 overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-lg shadow-black/10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 200px at 50% 55%, rgb(var(--accent-rgb)/0.16), transparent 70%)",
        }}
      />

      <div className="relative flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-widest text-muted">
          Core stack
        </span>
        <span className="text-[11px] font-mono text-muted">Drag to rotate</span>
      </div>

      <div
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        style={{ perspective: 900, touchAction: "pan-y" }}
        className="relative flex h-60 items-center justify-center"
      >
        <motion.div
          style={{
            width: CUBE,
            height: CUBE,
            rotateX: rotX,
            rotateY: rotY,
            transformStyle: "preserve-3d",
          }}
          className="relative"
        >
          {CORE_STACK.map((name, i) => {
            const brand = brandFor(name);
            return (
              <div
                key={name}
                style={{
                  ...brandSurface(brand),
                  width: CUBE,
                  height: CUBE,
                  transform: CUBE_FACES[i],
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border shadow-[inset_0_0_30px_rgba(255,255,255,0.06)]"
              >
                <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/25 via-transparent to-transparent" />
                <BrandIcon brand={brand} className="relative h-11 w-11" />
                <span className="relative text-[10px] font-mono text-fg">
                  {name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* =====================================================================
   Scroll korle shobdo-e-shobdo jele othe
   ===================================================================== */
function RevealWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  );
}

function ScrollReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });

  if (reduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(start + 1 / words.length + 0.08, 1);
        return (
          <RevealWord
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}

/* =====================================================================
   Count-up number
   ===================================================================== */
function CountUp({ to }: { to: number }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {reduceMotion ? to : n}
    </span>
  );
}

/* =====================================================================
   Journey timeline (scroll korle line ankhe)
   ===================================================================== */
function Journey() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="absolute bottom-5 left-[19px] top-5 w-px bg-line"
      />
      <motion.div
        aria-hidden
        style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
        className="absolute bottom-5 left-[19px] top-5 w-px origin-top bg-gradient-to-b from-accent to-accent/40"
      />

      <ol className="flex flex-col gap-5">
        {journey.map((item, index) => {
          const Icon = item.icon;
          const isNow = index === journey.length - 1;

          return (
            <li key={item.title} className="relative pl-14">
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={defaultViewport}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute left-0 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-accent/50 bg-surface text-accent-fg"
              >
                {isNow && (
                  <span className="absolute inset-0 animate-ping rounded-xl bg-accent/20" />
                )}
                <Icon className="relative h-4 w-4" />
              </motion.span>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <div className="rounded-2xl border border-line bg-surface p-5 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50">
                  <span className="mb-1 block text-[10px] font-mono uppercase tracking-wider text-accent-fg">
                    {item.step}
                  </span>
                  <h4 className="mb-1.5 text-base font-semibold text-fg">
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
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
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
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
          if (e.currentTarget.matches(":focus-visible")) setFlipped(true);
        }}
        onBlur={() => setFlipped(false)}
        onClick={(e) => {
          const type = (e.nativeEvent as PointerEvent).pointerType;
          if (type !== "mouse") setFlipped((v) => !v);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((v) => !v);
          }
        }}
        className="relative h-44 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 110, damping: 16 }
          }
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-full w-full"
        >
          {/* Front */}
          <div
            style={face}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-surface px-4 text-center shadow-lg shadow-black/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface-3 text-accent-fg">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-base font-semibold text-fg">{title}</span>
          </div>

          {/* Back */}
          <div
            style={{ ...face, transform: "rotateY(180deg)" }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-accent/50 bg-tint px-5 text-center shadow-lg shadow-accent/10"
          >
            <Icon className="h-4 w-4 text-accent-fg" />
            <p className="text-xs leading-relaxed text-fg/85">{text}</p>
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
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32 md:px-12"
    >
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="relative mb-16 flex flex-col justify-between gap-6 border-b border-line/80 pb-8 md:flex-row md:items-end"
      >
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent-fg">
              01 // Profile &amp; Purpose
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[1px] w-12 origin-left bg-accent"
            />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-fg sm:text-5xl md:text-6xl">
            About Me
          </h2>
        </div>
        <p className="max-w-xs text-xs font-mono text-muted sm:text-sm md:text-right">
          Who I am, how I think, and what I&apos;m building toward.
        </p>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: story */}
        <div className="flex flex-col gap-9 lg:col-span-7">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-4 block text-xs font-mono uppercase tracking-[0.25em] text-muted"
            >
              Hi, I&apos;m {personalInfo.name}
            </motion.span>

            <motion.h3
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-display text-3xl leading-[1.12] text-fg sm:text-4xl md:text-5xl"
            >
              Connecting{" "}
              <span className="italic text-accent-fg">intuitive frontends</span>{" "}
              with{" "}
              <span className="italic text-accent-fg">reliable backends.</span>
            </motion.h3>
          </div>

          <div className="flex flex-col gap-5">
            <ScrollReveal
              text={intro}
              className="text-lg leading-relaxed text-fg sm:text-xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-base leading-relaxed text-muted"
            >
              {foundation}
            </motion.p>
          </div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, ease: EASE }}
            className="group flex gap-4 rounded-2xl border border-line bg-surface p-5 shadow-lg shadow-black/10 transition-colors duration-300 hover:border-accent/50 sm:p-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-3 text-accent-fg transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="mb-1 block text-[10px] font-mono uppercase tracking-wider text-muted">
                Education
              </span>
              <h4 className="text-base font-semibold text-fg sm:text-lg">
                {education.degree}
              </h4>
              <p className="mt-0.5 text-sm text-muted">{education.institute}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                {education.text}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] font-mono text-accent-fg">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {education.status}
              </span>
            </div>
          </motion.div>

          {/* Stats (real data) */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="rounded-2xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-accent/50 sm:p-5"
              >
                <div className="font-display text-4xl text-fg sm:text-5xl">
                  <CountUp to={stat.value} />
                </div>
                <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted sm:text-[11px]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interests */}
          <div className="border-t border-line-soft pt-6">
            <div className="mb-4 text-xs font-mono uppercase tracking-wider text-muted">
              What I&apos;m interested in
            </div>
            <div className="flex flex-wrap gap-2.5">
              {interests.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-3 px-3.5 py-2 text-xs font-mono text-fg transition-colors hover:border-accent/50 hover:text-accent-fg"
                >
                  <Sparkles className="h-3 w-3 text-accent-fg" />
                  {item}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Info tiles */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono sm:grid-cols-3">
            {[
              { label: "LOCATION", value: personalInfo.location, live: false },
              { label: "ROLE", value: personalInfo.title, live: false },
              {
                label: "STATUS",
                value: personalInfo.isAvailableForWork
                  ? "Open to opportunities"
                  : "Currently busy",
                live: personalInfo.isAvailableForWork,
              },
            ].map((tile, i) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className={`rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/40 ${
                  i === 2 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <span className="mb-1 block text-muted">{tile.label}</span>
                <span
                  className={`flex items-center gap-1.5 font-medium ${
                    tile.live ? "text-accent-fg" : "text-fg"
                  }`}
                >
                  {tile.live && (
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                  )}
                  {tile.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: 3D cube + journey */}
        <div className="lg:col-span-5">
          <StackCube />

          <div className="mb-6 text-xs font-mono uppercase tracking-wider text-muted">
            My programming journey
          </div>
          <Journey />
        </div>
      </div>

      {/* How I work */}
      <div className="mt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"
        >
          <h3 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
            How I work
          </h3>
          <span className="text-xs font-mono text-muted">
            Hover or tap a card to flip it
          </span>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {principles.map((p, i) => (
            <FlipCard
              key={p.title}
              icon={p.icon}
              title={p.title}
              text={p.text}
              index={i}
            />
          ))}
        </div>

        {/* Belief + goal */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-6 rounded-2xl border border-line bg-surface p-6 shadow-xl shadow-black/10 transition-colors duration-300 hover:border-accent/50 sm:p-10"
        >
          <p className="max-w-3xl font-display text-3xl italic leading-snug text-fg sm:text-4xl">
            <span className="text-accent-fg">&ldquo;</span>
            {belief.quote}
            <span className="text-accent-fg">&rdquo;</span>
          </p>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            {belief.body}
          </p>
          <p className="mt-5 max-w-3xl border-t border-line-soft pt-5 text-xs font-mono leading-relaxed text-muted">
            {belief.closing}
          </p>
        </motion.div>
      </div>
    </section>
  );
}