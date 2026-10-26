"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ExternalLink,
  Layers,
  Puzzle,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import ProjectVisual from "@/components/ui/ProjectVisual";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import type { Project } from "@/types/portfolio";
import { defaultViewport, fadeInUp } from "@/utils/motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeInUp}
      className="p-6 sm:p-8 rounded-2xl bg-surface border border-line shadow-xl shadow-black/20"
    >
      <h2 className="flex items-center gap-3 text-lg sm:text-xl font-semibold text-fg tracking-tight mb-5">
        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface-3 border border-line-strong text-accent-fg">
          <Icon className="w-4 h-4" />
        </span>
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

export default function ProjectDetail({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project;
  next: Project;
}) {
  const reduceMotion = useReducedMotion();

  /* 3D tilt on the hero image */
  const frameRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 120, damping: 16, mass: 0.6 });
  const rotateY = useSpring(ry, { stiffness: 120, damping: 16, mass: 0.6 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 8);
    rx.set((0.5 - py) * 8);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const hasNav = prev.id !== project.id;

  return (
    <main className="pt-28 sm:pt-36 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="visible">
        <motion.div variants={item}>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-accent-fg transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>All projects</span>
          </Link>
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-mono text-accent-fg uppercase tracking-widest font-semibold">
            {project.eyebrow || "Web Application"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted px-2.5 py-1 rounded-lg bg-surface-3 border border-line">
            <Calendar className="w-3 h-3 text-accent-fg" />
            {project.year}
          </span>
          {project.featured && (
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent/15 text-accent-fg border border-accent/35">
              Featured
            </span>
          )}
        </motion.div>

        <motion.h1
          variants={item}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-fg leading-[1.1] mb-5"
        >
          {project.title}
        </motion.h1>

        <motion.p
          variants={item}
          className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mb-8"
        >
          {project.tagline}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center gap-3 mb-12">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-on-accent text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-[0_4px_0_var(--accent-deep)] hover:shadow-[0_3px_0_var(--accent-deep)] hover:translate-y-px active:shadow-[0_0_0_var(--accent-deep)] active:translate-y-1 transition-all duration-150"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <span
              aria-disabled
              className="inline-flex items-center gap-2 text-xs font-mono px-6 py-3.5 rounded-full bg-surface-2 border border-dashed border-line-strong text-muted cursor-not-allowed"
            >
              <ExternalLink className="w-4 h-4" />
              Live link coming soon
            </span>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-4 text-fg border border-line hover:border-accent/60 text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-full transition-colors active:scale-95"
            >
              <GithubIcon className="w-4 h-4 text-accent-fg" />
              <span>GitHub Repository</span>
            </a>
          )}
        </motion.div>

        {/* Hero image (3D tilt) */}
        <motion.div variants={item} style={{ perspective: 1200 }} className="mb-14">
          <motion.div
            ref={frameRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            <div
              aria-hidden
              style={{ transform: "translateZ(-40px)" }}
              className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-accent/20 via-accent/5 to-transparent blur-2xl pointer-events-none"
            />
            <div className="relative p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl bg-surface border border-line shadow-2xl shadow-black/50">
              <ProjectVisual
                project={project}
                priority
                className="aspect-[16/9] rounded-xl sm:rounded-2xl"
                sizes="(max-width: 1152px) 100vw, 1100px"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Block icon={Layers} title="Overview">
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {project.description}
            </p>
          </Block>

          <Block icon={Puzzle} title="Challenges faced">
            <ul className="flex flex-col gap-4">
              {project.challenges.map((challenge) => (
                <li key={challenge} className="flex gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span className="text-sm sm:text-base text-muted leading-relaxed">
                    {challenge}
                  </span>
                </li>
              ))}
            </ul>
          </Block>

          <Block icon={Rocket} title="Improvements & future plans">
            <ul className="flex flex-col gap-4">
              {project.improvements.map((idea) => (
                <li key={idea} className="flex gap-3">
                  <ArrowRight className="mt-1 w-4 h-4 text-accent-fg shrink-0" />
                  <span className="text-sm sm:text-base text-muted leading-relaxed">
                    {idea}
                  </span>
                </li>
              ))}
            </ul>
          </Block>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-surface border border-line shadow-xl shadow-black/20"
          >
            <h2 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
              Tech stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-surface-3 text-fg/90 border border-line hover:border-accent/50 hover:text-accent-fg transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-surface border border-line shadow-xl shadow-black/20"
          >
            <h2 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
              Links
            </h2>
            <div className="flex flex-col gap-2 text-sm">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-surface-3 border border-line text-fg hover:border-accent/50 hover:text-accent-fg transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-accent-fg" />
                    Live project
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : (
                <div className="px-4 py-3 rounded-xl border border-dashed border-line-strong text-xs font-mono text-muted">
                  Live link coming soon
                </div>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-surface-3 border border-line text-fg hover:border-accent/50 hover:text-accent-fg transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 text-accent-fg" />
                    GitHub repository
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </motion.div>
        </aside>
      </div>

      {/* Previous / next project */}
      {hasNav && (
        <motion.nav
          aria-label="More projects"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 pt-10 border-t border-line/80"
        >
          <Link
            href={`/projects/${prev.id}`}
            className="group p-5 rounded-2xl bg-surface border border-line hover:border-accent/50 transition-colors"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-mono text-muted mb-2">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              Previous project
            </span>
            <span className="block text-base font-semibold text-fg group-hover:text-accent-fg transition-colors">
              {prev.title}
            </span>
          </Link>

          <Link
            href={`/projects/${next.id}`}
            className="group p-5 rounded-2xl bg-surface border border-line hover:border-accent/50 transition-colors sm:text-right"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-mono text-muted mb-2 sm:flex-row-reverse">
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              Next project
            </span>
            <span className="block text-base font-semibold text-fg group-hover:text-accent-fg transition-colors">
              {next.title}
            </span>
          </Link>
        </motion.nav>
      )}
    </main>
  );
}