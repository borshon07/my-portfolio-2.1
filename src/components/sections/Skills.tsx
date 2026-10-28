"use client";

import React, { useRef, useState } from "react";
import { skillCategories } from "@/data/portfolioData";
import {
  Code,
  Cpu,
  Database,
  Layout,
  Server,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { defaultViewport, fadeInUp, transitionConfig } from "@/utils/motion";
import { BrandIcon, brandFor, brandSurface } from "@/components/ui/BrandIcon";

type SkillGroup = (typeof skillCategories)[number];
type Skill = SkillGroup["skills"][number];

const categoryIcons: Record<string, LucideIcon> = {
  "Frontend Development": Layout,
  "Backend Development": Server,
  "Database & API Engineering": Database,
  "Software Engineering": Cpu,
  "Tools & Workflow": Wrench,
};

// Filter tab e choto naam
const shortLabel: Record<string, string> = {
  "Frontend Development": "Frontend",
  "Backend Development": "Backend",
  "Database & API Engineering": "Data & API",
  "Software Engineering": "Engineering",
  "Tools & Workflow": "Tools",
};

/* ---------- Ekta skill chip: 3D tile + naam ---------- */
function SkillChip({ skill, index }: { skill: Skill; index: number }) {
  const reduceMotion = useReducedMotion();
  const brand = brandFor(skill.name);
  const isLearning = skill.level === "Learning";

  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 220, damping: 18, mass: 0.4 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 22);
    rx.set((0.5 - py) * 22);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const dark = "color-mix(in srgb, var(--brand) 40%, #000)";

  const tileStyle: React.CSSProperties = {
    ...brandSurface(brand),
    transformStyle: "preserve-3d",
    boxShadow: [
      `0 1px 0 ${dark}`,
      `0 2px 0 ${dark}`,
      `0 3px 0 ${dark}`,
      `0 4px 0 ${dark}`,
      "0 12px 18px -6px color-mix(in srgb, var(--brand) 55%, transparent)",
    ].join(", "),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 + index * 0.04 }}
      style={{ perspective: 700 }}
      className="max-w-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group/chip relative inline-flex max-w-full cursor-default items-center gap-3 rounded-2xl border py-2 pl-2.5 pr-4 transition-colors duration-200 ${
          isLearning
            ? "border-dashed border-line-strong bg-surface-2 hover:border-accent/60"
            : "border-line bg-surface-2 hover:border-accent/60"
        }`}
      >
        {/* Brand glow (hover e) */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover/chip:opacity-100"
          style={
            {
              "--brand": brand.color,
              background: "color-mix(in srgb, var(--brand) 32%, transparent)",
            } as React.CSSProperties
          }
        />

        {/* 3D tile */}
        <span
          style={tileStyle}
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 ease-out [transform:translateZ(16px)] group-hover/chip:[transform:translateZ(30px)_rotateX(10deg)_rotateY(-14deg)_translateY(-2px)] motion-reduce:transition-none"
        >
          {/* Glossy shine */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 via-transparent to-transparent"
          />

          {/* Logo pop out kore */}
          <span
            aria-hidden
            className="relative flex items-center justify-center"
            style={
              {
                transform: "translateZ(12px)",
                "--brand": brand.color,
                filter:
                  "drop-shadow(0 4px 5px color-mix(in srgb, var(--brand) 55%, rgba(0,0,0,0.35)))",
              } as React.CSSProperties
            }
          >
            <BrandIcon brand={brand} />
          </span>
        </span>

        <span
          style={{ transform: "translateZ(6px)" }}
          className="flex min-w-0 flex-col items-start gap-1"
        >
          <span className="break-words text-xs font-mono text-fg">
            {skill.name}
          </span>
          {isLearning && (
            <span className="inline-flex items-center gap-1 rounded bg-accent/15 px-1.5 py-0.5 font-sans text-[9px] font-medium uppercase text-accent-fg">
              <Sparkles className="h-2.5 w-2.5" />
              Learning
            </span>
          )}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Ekta category card ---------- */
function SkillCard({
  group,
  index,
  wide,
}: {
  group: SkillGroup;
  index: number;
  wide: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const CategoryIcon = categoryIcons[group.category] ?? Code;

  // Cursor spotlight
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${x}px ${y}px, rgb(var(--accent-rgb)/0.11), transparent 65%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      layout
      initial={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 40, rotateX: 14, scale: 0.97 }
      }
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: transitionConfig.easeEditorial,
      }}
      style={{ transformPerspective: 1100, transformOrigin: "center bottom" }}
      onMouseMove={handleMove}
      className={`group relative flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-xl shadow-black/20 transition-colors duration-300 hover:border-accent/50 sm:p-8 ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      {/* Top accent line */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Cursor spotlight */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}

      {/* Big faded background icon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      >
        <CategoryIcon className="absolute -bottom-6 -right-6 h-36 w-36 text-fg opacity-[0.03] transition-all duration-500 group-hover:rotate-6 group-hover:opacity-[0.06]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <div className="shrink-0 rounded-xl border border-line bg-surface-3 p-3 text-accent-fg transition-all duration-300 group-hover:rotate-6 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
            <CategoryIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-fg sm:text-xl">
              {group.category}
            </h3>
            <span className="text-[11px] font-mono text-muted">
              {group.skills.length} skills
            </span>
          </div>
        </div>

        <p className="mb-7 max-w-lg text-xs leading-relaxed text-muted sm:text-[13px]">
          {group.description}
        </p>

        {/* Chips */}
        <div className="flex flex-wrap gap-x-3 gap-y-4">
          {group.skills.map((skill, i) => (
            <SkillChip key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Section ---------- */
export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", ...skillCategories.map((c) => c.category)];

  const displayed =
    activeTab === "All"
      ? skillCategories
      : skillCategories.filter((c) => c.category === activeTab);

  const countFor = (category: string) =>
    category === "All"
      ? skillCategories.reduce((sum, c) => sum + c.skills.length, 0)
      : (skillCategories.find((c) => c.category === category)?.skills.length ??
        0);

  return (
    <section
      id="skills"
      className="scroll-mt-24 mx-auto w-full max-w-6xl px-6 py-24 sm:py-32 md:px-12"
    >
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="mb-10 flex flex-col justify-between gap-6 border-b border-line/80 pb-8 md:flex-row md:items-end"
      >
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent-fg">
              02 // Technical Capabilities
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
            Skills &amp; Expertise
          </h2>
        </div>
        <p className="max-w-xs text-xs font-mono text-muted sm:text-sm md:text-right">
          What I build with, and how I think about building.
        </p>
      </motion.div>

      {/* Category filter */}
      <div
        role="tablist"
        aria-label="Filter skills by category"
        className="mb-10 flex w-fit max-w-full flex-nowrap gap-1.5 overflow-x-auto rounded-full border border-line bg-canvas p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => {
          const isActive = activeTab === category;
          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(category)}
              className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-mono transition-colors duration-200 ${
                isActive
                  ? "font-bold text-on-accent"
                  : "text-muted hover:text-fg"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="skills-active-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-accent shadow-md shadow-accent/25"
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-1.5">
                {shortLabel[category] ?? category}
                <span
                  className={`rounded-full px-1.5 text-[10px] ${
                    isActive ? "bg-black/15" : "bg-surface-3"
                  }`}
                >
                  {countFor(category)}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills grid: prothom card (Frontend) duita column jure boro */}
      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {displayed.map((group, i) => (
            <SkillCard
              key={group.category}
              group={group}
              index={i}
              wide={
                displayed.length === 1 ||
                (i === 0 && displayed.length === skillCategories.length)
              }
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}