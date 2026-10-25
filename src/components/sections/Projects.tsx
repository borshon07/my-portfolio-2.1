"use client";

import React from "react";
import { projects } from "@/data/portfolioData";
import type { Project } from "@/types/portfolio";
import { ArrowUpRight, Code, ExternalLink, FolderGit2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { defaultViewport, fadeInUp, transitionConfig } from "@/utils/motion";

/* ---------- Single project card ---------- */
function ProjectCard({
  project,
  idx,
  isFullWidth,
}: {
  project: Project;
  idx: number;
  isFullWidth: boolean;
}) {
  const reduceMotion = useReducedMotion();

  // Cursor spotlight
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${x}px ${y}px, rgba(255,120,73,0.12), transparent 65%)`;

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={
        reduceMotion ? undefined : { y: -6, transition: { duration: 0.25 } }
      }
      viewport={defaultViewport}
      transition={{
        duration: 0.6,
        delay: (idx % 2) * 0.12,
        ease: transitionConfig.easeEditorial,
      }}
      onMouseMove={handleMove}
      className={`group relative flex flex-col rounded-2xl sm:rounded-3xl bg-[#181818] border border-[#303030] hover:border-[#FF7849]/60 transition-colors duration-300 overflow-hidden shadow-2xl shadow-black/30 ${
        isFullWidth ? "lg:col-span-2 lg:flex-row" : "lg:col-span-1"
      }`}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-20 bg-gradient-to-r from-transparent via-[#FF7849] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Cursor spotlight */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlight }}
        />
      )}

      {/* Visual / editor header */}
      <div
        className={`relative w-full bg-[#121212] border-b border-[#282828] p-5 sm:p-7 overflow-hidden ${
          isFullWidth ? "lg:w-[48%] lg:border-b-0 lg:border-r" : ""
        }`}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#222222]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#333333] group-hover:bg-[#FF7849] transition-colors duration-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#333333] group-hover:bg-[#FF7849]/60 transition-colors duration-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#333333] group-hover:bg-[#FF7849]/30 transition-colors duration-700" />
            <span className="ml-2 text-[10px] font-mono text-[#A39E93] hidden sm:inline">
              {project.id}.tsx
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#A39E93]">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-[#FF7849] opacity-75 animate-ping" />
                  <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#FF7849]" />
                </span>
                Live
              </span>
            )}
            {project.featured && (
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FF7849]/15 text-[#FF7849] border border-[#FF7849]/35">
                Featured
              </span>
            )}
            <span className="text-[10px] font-mono text-[#A39E93] px-2 py-0.5 rounded bg-[#202020]">
              {project.year}
            </span>
          </div>
        </div>

        {/* Preview panel */}
        <div className="relative p-6 sm:p-8 rounded-xl bg-[#161616] border border-[#2b2b2b] group-hover:border-[#FF7849]/40 transition-colors duration-300">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-[#FF7849] uppercase tracking-wider block mb-1.5 font-medium">
                {project.eyebrow || "Web Application"}
              </span>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F4F0E8] tracking-tight group-hover:text-[#FF7849] transition-colors duration-300">
                {project.title}
              </h4>
            </div>

            <div className="p-3 rounded-xl bg-[#222222] text-[#A39E93] group-hover:text-[#FF7849] group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shrink-0">
              <Code className="w-5 h-5" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#A39E93] mt-3 line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>
      </div>

      {/* Card body */}
      <div
        className={`p-6 sm:p-8 flex-1 flex flex-col justify-between ${
          isFullWidth ? "lg:w-[52%]" : ""
        }`}
      >
        <div>
          <p className="text-sm text-[#A39E93] leading-relaxed mb-6 font-normal">
            {project.description}
          </p>

          {/* Tech pills (staggered) */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.35, delay: 0.25 + i * 0.05 }}
                className="text-xs font-mono px-3 py-1 rounded-lg bg-[#202020] text-[#F4F0E8]/90 border border-[#2e2e2e] hover:border-[#FF7849]/50 hover:text-[#FF7849] transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="relative z-30 flex items-center justify-between pt-5 border-t border-[#303030]/70">
          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A39E93] hover:text-[#FF7849] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A39E93] hover:text-[#FF7849] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Preview</span>
              </a>
            )}
          </div>

          <a
            href={project.liveUrl || project.githubUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF7849] hover:text-[#ff6633] transition-colors"
          >
            <span>{project.liveUrl ? "Live Demo" : "GitHub Repo"}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Section ---------- */
export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 sm:py-32 px-6 md:px-12 max-w-6xl mx-auto w-full"
    >
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#303030]/80 pb-8 mb-16 gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-[#FF7849] uppercase tracking-widest font-semibold">
              03 // Selected Work
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-12 h-[1px] bg-[#FF7849] origin-left"
            />
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F4F0E8]">
            Featured Projects
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[#A39E93] max-w-xs md:text-right">
          Real web applications, tools, and platforms built with modern stacks.
        </p>
      </motion.div>

      {/* Projects grid: first card full width, rest in two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            idx={idx}
            isFullWidth={idx === 0}
          />
        ))}
      </div>

      {/* GitHub callout */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="mt-12 p-6 sm:p-7 rounded-2xl bg-[#171717] border border-[#303030] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
      >
        <div className="flex items-center gap-3 text-sm text-[#A39E93]">
          <FolderGit2 className="w-5 h-5 text-[#FF7849] shrink-0" />
          <span>
            More experimental builds, logic practices, and repositories are on
            GitHub.
          </span>
        </div>
        <a
          href="https://github.com/borshon07"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F4F0E8] hover:text-[#FF7849] px-5 py-2.5 rounded-xl bg-[#222222] hover:bg-[#282828] border border-[#303030] hover:border-[#FF7849]/50 transition-all shrink-0 active:scale-95 shadow-sm"
        >
          <span>Explore GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>
    </section>
  );
}