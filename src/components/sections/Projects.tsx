"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { projects } from "@/data/portfolioData";
import type { Project } from "@/types/portfolio";
import { ArrowUpRight, ExternalLink, FolderGit2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import ProjectVisual from "@/components/ui/ProjectVisual";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { defaultViewport, fadeInUp } from "@/utils/motion";

/* ---------- One project row ---------- */
function ProjectRow({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const reduceMotion = useReducedMotion();
  const rowRef = useRef<HTMLElement>(null);
  const flip = index % 2 === 1;
  const detailsHref = `/projects/${project.id}`;

  /* Scroll-linked 3D reveal */
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "center center"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 20, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 90, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 1 : 0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);

  /* Hover tilt on the image */
  const frameRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const tiltX = useSpring(rx, { stiffness: 140, damping: 16, mass: 0.6 });
  const tiltY = useSpring(ry, { stiffness: 140, damping: 16, mass: 0.6 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const chips = project.technologies.slice(0, 3);

  return (
    <motion.article
      ref={rowRef}
      style={{
        opacity,
        y,
        scale,
        rotateX,
        transformPerspective: 1400,
        transformOrigin: "center bottom",
      }}
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
    >
      {/* Big outline number */}
      <span
        aria-hidden
        style={{ WebkitTextStroke: "1px var(--line-strong)" }}
        className={`pointer-events-none select-none absolute -top-10 sm:-top-14 text-[6rem] sm:text-[9rem] leading-none font-extrabold text-transparent ${
          flip ? "right-0 lg:left-auto lg:right-4" : "left-0 lg:left-4"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Image side */}
      <div
        className={`relative lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
        style={{ perspective: 1200 }}
      >
        <motion.div
          ref={frameRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
          className="group relative"
        >
          {/* Glow behind */}
          <div
            aria-hidden
            style={{ transform: "translateZ(-50px)" }}
            className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-accent/25 via-accent/5 to-transparent blur-2xl pointer-events-none"
          />

          <Link
            href={detailsHref}
            aria-label={`View ${project.title} details`}
            className="relative block overflow-hidden rounded-2xl bg-surface border border-line group-hover:border-accent/60 transition-colors duration-300 shadow-2xl shadow-black/40"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-surface-2 border-b border-line-soft">
              <span className="w-2.5 h-2.5 rounded-full bg-line-strong group-hover:bg-accent transition-colors duration-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-line-strong group-hover:bg-accent/60 transition-colors duration-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-line-strong group-hover:bg-accent/30 transition-colors duration-700" />
              <span className="ml-3 hidden sm:block flex-1 truncate text-[10px] font-mono text-muted px-3 py-1 rounded-md bg-surface-3">
                {project.liveUrl
                  ? project.liveUrl.replace(/^https?:\/\//, "")
                  : project.id}
              </span>
            </div>

            <div className="relative overflow-hidden">
              <ProjectVisual
                project={project}
                className="aspect-[16/10] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 720px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </Link>

          {/* Floating tech chips */}
          {chips.map((tech, i) => (
            <motion.span
              key={tech}
              style={{ z: 70 + i * 25 }}
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{
                duration: 4 + i,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`absolute hidden sm:inline-flex items-center px-3 py-1.5 rounded-xl bg-surface/90 backdrop-blur-md border border-line text-[11px] font-mono text-fg shadow-xl shadow-black/30 ${
                i === 0
                  ? "-top-4 -left-4"
                  : i === 1
                    ? "top-1/3 -right-5"
                    : "-bottom-4 left-10"
              }`}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Details side */}
      <div className="lg:col-span-5 flex flex-col">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-mono text-accent-fg uppercase tracking-widest font-semibold">
            {project.eyebrow || "Web Application"}
          </span>
          {project.liveUrl && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full bg-surface-3 border border-line text-fg">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-accent" />
              </span>
              Live
            </span>
          )}
          <span className="text-[10px] font-mono text-muted px-2 py-1 rounded bg-surface-3">
            {project.year}
          </span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-extrabold text-fg tracking-tight leading-[1.1] mb-4">
          <Link href={detailsHref} className="hover:text-accent-fg transition-colors">
            {project.title}
          </Link>
        </h3>

        <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-surface-3 text-fg/90 border border-line hover:border-accent/50 hover:text-accent-fg transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={detailsHref}
            className="group/cta inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-on-accent text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-[0_4px_0_var(--accent-deep)] hover:shadow-[0_3px_0_var(--accent-deep)] hover:translate-y-px active:shadow-[0_0_0_var(--accent-deep)] active:translate-y-1 transition-all duration-150"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code`}
              title="Source code"
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-surface-2 border border-line text-muted hover:text-accent-fg hover:border-accent/50 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              title="Live demo"
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-surface-2 border border-line text-muted hover:text-accent-fg hover:border-accent/50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <span className="mt-6 text-xs font-mono text-muted/70 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </motion.article>
  );
}

/* ---------- Section ---------- */
export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 py-24 sm:py-32 px-6 md:px-12 max-w-6xl mx-auto w-full"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="flex flex-col md:flex-row md:items-end justify-between border-b border-line/80 pb-8 mb-20 sm:mb-24 gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-accent-fg uppercase tracking-widest font-semibold">
              03 // Selected Work
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
            Featured Projects
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-muted max-w-xs md:text-right">
          Real web applications, built end to end. Open one for the full story.
        </p>
      </motion.div>

      <div className="flex flex-col gap-28 sm:gap-36">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="mt-28 p-6 sm:p-7 rounded-2xl bg-surface-2 border border-line flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
      >
        <div className="flex items-center gap-3 text-sm text-muted">
          <FolderGit2 className="w-5 h-5 text-accent-fg shrink-0" />
          <span>
            More experimental builds, logic practices, and repositories are on
            GitHub.
          </span>
        </div>
        <a
          href="https://github.com/borshon07"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-fg hover:text-accent-fg px-5 py-2.5 rounded-xl bg-surface-3 hover:bg-surface-4 border border-line hover:border-accent/50 transition-all shrink-0 active:scale-95 shadow-sm"
        >
          <span>Explore GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>
    </section>
  );
}