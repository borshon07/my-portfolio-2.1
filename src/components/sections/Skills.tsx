"use client";

import React, { useState } from "react";
import { skillCategories } from "@/data/portfolioData";
import {
  Atom,
  Braces,
  Bug,
  Code,
  Component,
  Database,
  FileCode,
  GitBranch,
  Layers,
  Layout,
  Package,
  Palette,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Triangle,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { defaultViewport, fadeInUp, transitionConfig } from "@/utils/motion";

type SkillGroup = (typeof skillCategories)[number];

/* ---------- Icon maps ---------- */
const skillIcons: { match: RegExp; icon: LucideIcon }[] = [
  { match: /javascript|typescript/i, icon: Braces },
  { match: /html/i, icon: FileCode },
  { match: /tailwind/i, icon: Wind },
  { match: /heroui|daisy/i, icon: Component },
  { match: /motion/i, icon: Zap },
  { match: /css/i, icon: Palette },
  { match: /react/i, icon: Atom },
  { match: /next/i, icon: Layers },
  { match: /responsive/i, icon: Smartphone },
  { match: /auth/i, icon: ShieldCheck },
  { match: /mongo/i, icon: Database },
  { match: /node/i, icon: Server },
  { match: /vercel/i, icon: Triangle },
  { match: /git/i, icon: GitBranch },
  { match: /vs code/i, icon: Code },
  { match: /npm|package/i, icon: Package },
  { match: /devtools|chrome/i, icon: Bug },
];

const getSkillIcon = (name: string): LucideIcon =>
  skillIcons.find((s) => s.match.test(name))?.icon ?? Code;

const categoryIcons: Record<string, LucideIcon> = {
  Languages: Braces,
  Frontend: Layout,
  Frameworks: Layers,
  Tools: Wrench,
};

/* ---------- Single category card ---------- */
function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const reduceMotion = useReducedMotion();
  const CategoryIcon = categoryIcons[group.category] ?? Code;

  const activeCount = group.skills.filter((s) => s.level !== "Learning").length;
  const learningCount = group.skills.length - activeCount;
  const activePercent = Math.round((activeCount / group.skills.length) * 100);

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
      initial={{ opacity: 0, y: 25, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: transitionConfig.easeEditorial,
      }}
      onMouseMove={handleMove}
      className="group relative p-6 sm:p-8 rounded-2xl bg-surface border border-line hover:border-accent/50 transition-colors duration-300 flex flex-col justify-between overflow-hidden shadow-xl shadow-black/20"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Cursor spotlight */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlight }}
        />
      )}

      {/* Big faded background icon */}
      <CategoryIcon
        aria-hidden
        className="absolute -bottom-6 -right-6 w-36 h-36 text-fg opacity-[0.025] group-hover:opacity-[0.05] group-hover:rotate-6 transition-all duration-500 pointer-events-none"
      />

      <div className="relative z-10">
        {/* Card header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-surface-3 border border-line-strong text-accent-fg group-hover:bg-accent group-hover:text-on-accent group-hover:border-accent group-hover:rotate-6 transition-all duration-300 shrink-0">
              <CategoryIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-fg tracking-tight">
                {group.category}
              </h3>
              <span className="text-[11px] font-mono text-muted">
                {group.skills.length} tools
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-[13px] text-muted mb-6 leading-relaxed font-normal max-w-md">
          {group.description}
        </p>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-2.5">
          {group.skills.map((skill, i) => {
            const isLearning = skill.level === "Learning";
            const SkillIcon = getSkillIcon(skill.name);

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
                className={`inline-flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-xl text-xs font-mono border cursor-default transition-colors duration-200 ${
                  isLearning
                    ? "bg-surface-2 border-dashed border-line-strong text-fg/75 hover:border-accent/60"
                    : "bg-surface-3 border-line-strong text-fg hover:border-accent hover:bg-surface-4"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-lg ${
                    isLearning
                      ? "bg-accent/10 text-accent-fg/80"
                      : "bg-accent/15 text-accent-fg"
                  }`}
                >
                  <SkillIcon className="w-3.5 h-3.5" />
                </span>
                <span>{skill.name}</span>
                {isLearning && (
                  <span className="inline-flex items-center gap-1 text-[9px] uppercase px-1.5 py-0.5 rounded bg-accent/15 text-accent-fg font-sans font-medium">
                    <Sparkles className="w-2.5 h-2.5" />
                    Learning
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer: real stats from data */}
      <div className="relative z-10 mt-8 pt-4 border-t border-line/60">
        <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-2.5">
          <span>
            <span className="text-fg font-semibold">{activeCount}</span> active
          </span>
          {learningCount > 0 && (
            <span>
              <span className="text-accent-fg font-semibold">{learningCount}</span> learning
            </span>
          )}
        </div>
        <div className="h-1 w-full rounded-full bg-line-soft overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${activePercent}%` }}
            viewport={defaultViewport}
            transition={{ duration: 0.9, delay: 0.3, ease: transitionConfig.easeEditorial }}
            className="h-full rounded-full bg-gradient-to-r from-accent/70 to-accent"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Section ---------- */
export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", ...skillCategories.map((c) => c.category)];

  const displayedCategories =
    activeTab === "All"
      ? skillCategories
      : skillCategories.filter((c) => c.category === activeTab);

  const countFor = (category: string) =>
    category === "All"
      ? skillCategories.reduce((sum, c) => sum + c.skills.length, 0)
      : skillCategories.find((c) => c.category === category)?.skills.length ?? 0;

  return (
    <section id="skills" className="py-24 sm:py-32 px-6 md:px-12 max-w-6xl mx-auto w-full">
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="flex flex-col md:flex-row md:items-end justify-between border-b border-line/80 pb-8 mb-12 gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-accent-fg uppercase tracking-widest font-semibold">
              02 // Technical Capabilities
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
            Skills &amp; Tooling
          </h2>
        </div>

        {/* Category filter with sliding pill */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="flex flex-nowrap gap-1.5 p-1.5 rounded-full bg-canvas border border-line max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => {
            const isActive = activeTab === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(category)}
                className={`shrink-0 whitespace-nowrap relative px-4 py-2 rounded-full text-xs font-mono transition-colors duration-200 ${
                  isActive ? "text-on-accent font-bold" : "text-muted hover:text-fg"
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
                  {category}
                  <span
                    className={`text-[10px] px-1.5 rounded-full ${
                      isActive ? "bg-canvas/15" : "bg-surface-3"
                    }`}
                  >
                    {countFor(category)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Skills grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {displayedCategories.map((group, groupIdx) => (
            <SkillCard key={group.category} group={group} index={groupIdx} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}