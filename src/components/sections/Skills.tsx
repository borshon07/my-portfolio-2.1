"use client";

import React, { useRef, useState } from "react";
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
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { defaultViewport, fadeInUp, transitionConfig } from "@/utils/motion";

type SkillGroup = (typeof skillCategories)[number];
type Skill = SkillGroup["skills"][number];

/* =====================================================================
   Brand icons
   Logo ashe cdn.simpleicons.org theke, asol brand rong-e.
   slugs: ekta na ele porer ta try kore, shob fail hole lucide icon dekhay.
   color: shudhu 3D glow er jonno (icon er rong CDN nije dey).
   mono: kalo logo (Next.js, Vercel), dark mode e shada hoye jay.
   ===================================================================== */
type Brand = {
  match: RegExp;
  slugs: string[];
  color: string;
  mono?: boolean;
  fallback: LucideIcon;
};

const BRANDS: Brand[] = [
  { match: /javascript/i, slugs: ["javascript"], color: "#F7DF1E", fallback: Braces },
  { match: /typescript/i, slugs: ["typescript"], color: "#3178C6", fallback: Braces },
  { match: /html/i, slugs: ["html5"], color: "#E34F26", fallback: FileCode },
  { match: /tailwind/i, slugs: ["tailwindcss"], color: "#06B6D4", fallback: Wind },
  { match: /heroui|daisy/i, slugs: ["daisyui", "heroui"], color: "#5A0EF8", fallback: Component },
  { match: /motion/i, slugs: ["framer"], color: "#0055FF", fallback: Zap },
  { match: /css/i, slugs: ["css3", "css"], color: "#1572B6", fallback: Palette },
  { match: /react/i, slugs: ["react"], color: "#61DAFB", fallback: Atom },
  { match: /next/i, slugs: ["nextdotjs"], color: "var(--fg)", mono: true, fallback: Layers },
  { match: /responsive/i, slugs: [], color: "#22D3EE", fallback: Smartphone },
  { match: /auth/i, slugs: [], color: "#10B981", fallback: ShieldCheck },
  { match: /mongo/i, slugs: ["mongodb"], color: "#47A248", fallback: Database },
  { match: /node/i, slugs: ["nodedotjs"], color: "#5FA04E", fallback: Server },
  { match: /git/i, slugs: ["git"], color: "#F05032", fallback: GitBranch },
  { match: /vs ?code/i, slugs: ["visualstudiocode"], color: "#007ACC", fallback: Code },
  { match: /npm|package/i, slugs: ["npm"], color: "#CB3837", fallback: Package },
  { match: /vercel/i, slugs: ["vercel"], color: "var(--fg)", mono: true, fallback: Triangle },
  { match: /devtools|chrome/i, slugs: ["googlechrome"], color: "#4285F4", fallback: Bug },
];

const DEFAULT_BRAND: Brand = {
  match: /./,
  slugs: [],
  color: "var(--accent)",
  fallback: Code,
};

const brandFor = (name: string): Brand =>
  BRANDS.find((b) => b.match.test(name)) ?? DEFAULT_BRAND;

const categoryIcons: Record<string, LucideIcon> = {
  Languages: Braces,
  Frontend: Layout,
  Frameworks: Layers,
  Tools: Wrench,
};

/* ---------- Logo (CDN fail korle lucide fallback) ---------- */
function BrandIcon({ brand }: { brand: Brand }) {
  const [attempt, setAttempt] = useState(0);
  const slug = brand.slugs[attempt];
  const Fallback = brand.fallback;

  if (!slug) {
    return <Fallback className="h-6 w-6" style={{ color: brand.color }} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={slug}
      src={`https://cdn.simpleicons.org/${slug}`}
      alt=""
      width={24}
      height={24}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setAttempt((a) => a + 1)}
      className={`h-6 w-6 select-none ${brand.mono ? "dark:invert" : ""}`}
    />
  );
}

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

  const tileStyle = {
    "--brand": brand.color,
    transformStyle: "preserve-3d",
    background:
      "linear-gradient(145deg, color-mix(in srgb, var(--brand) 20%, var(--surface)), var(--surface-3))",
    borderColor: "color-mix(in srgb, var(--brand) 45%, var(--line))",
    boxShadow: [
      `0 1px 0 ${dark}`,
      `0 2px 0 ${dark}`,
      `0 3px 0 ${dark}`,
      `0 4px 0 ${dark}`,
      "0 12px 18px -6px color-mix(in srgb, var(--brand) 55%, transparent)",
    ].join(", "),
  } as React.CSSProperties;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 + index * 0.04 }}
      style={{ perspective: 700 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group/chip relative inline-flex cursor-default items-center gap-3 rounded-2xl border py-2 pl-2.5 pr-4 transition-colors duration-200 ${
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
            style={{
              transform: "translateZ(12px)",
              filter:
                "drop-shadow(0 4px 5px color-mix(in srgb, var(--brand) 55%, rgba(0,0,0,0.35)))",
              ...({ "--brand": brand.color } as React.CSSProperties),
            }}
          >
            <BrandIcon brand={brand} />
          </span>
        </span>

        <span
          style={{ transform: "translateZ(6px)" }}
          className="flex flex-col items-start gap-1"
        >
          <span className="text-xs font-mono text-fg">{skill.name}</span>
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
      className="group relative flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-xl shadow-black/20 transition-colors duration-300 hover:border-accent/50 sm:p-8"
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
              {group.skills.length} tools
            </span>
          </div>
        </div>

        <p className="mb-7 max-w-md text-xs leading-relaxed text-muted sm:text-[13px]">
          {group.description}
        </p>

        {/* Chips */}
        <div className="flex flex-wrap gap-x-3 gap-y-4">
          {group.skills.map((skill, i) => (
            <SkillChip key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>

      {/* Footer: real stats */}
      <div className="relative z-10 mt-8 border-t border-line/60 pt-4">
        <div className="mb-2.5 flex items-center justify-between text-[11px] font-mono text-muted">
          <span>
            <span className="font-semibold text-fg">{activeCount}</span> active
          </span>
          {learningCount > 0 && (
            <span>
              <span className="font-semibold text-accent-fg">
                {learningCount}
              </span>{" "}
              learning
            </span>
          )}
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-line-soft">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${activePercent}%` }}
            viewport={defaultViewport}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease: transitionConfig.easeEditorial,
            }}
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
        className="mb-12 flex flex-col justify-between gap-6 border-b border-line/80 pb-8 md:flex-row md:items-end"
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
            Skills &amp; Tooling
          </h2>
        </div>

        {/* Category filter (mobile e ek line, scroll kora jay) */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="flex max-w-full flex-nowrap gap-1.5 overflow-x-auto rounded-full border border-line bg-canvas p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  {category}
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
      </motion.div>

      {/* Skills grid */}
      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {displayedCategories.map((group, groupIdx) => (
            <SkillCard key={group.category} group={group} index={groupIdx} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}