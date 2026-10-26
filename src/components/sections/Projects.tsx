"use client";

import React from "react";
import Link from "next/link";
import { projects } from "@/data/portfolioData";
import type { Project } from "@/types/portfolio";
import { ArrowUpRight, ExternalLink, FolderGit2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import ProjectVisual from "@/components/ui/ProjectVisual";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { defaultViewport, fadeInUp, transitionConfig } from "@/utils/motion";

/* ---------- Single project card ---------- */
function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${x}px ${y}px, rgba(255,120,73,0.12), transparent 65%)`;

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const detailsHref = `/projects/${project.id}`;
  const visibleTech = project.technologies.slice(0, 4);
  const extraTech = project.technologies.length - visibleTech.length;

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.25 } }}
      viewport={defaultViewport}
      transition={{
        duration: 0.6,
        delay: idx * 0.1,
        ease: transitionConfig.easeEditorial,
      }}
      onMouseMove={handleMove}
      className="group relative flex flex-col rounded-2xl bg-[#181818] border border-[#303030] hover:border-[#FF7849]/60 transition-colors duration-300 overflow-hidden shadow-2xl shadow-black/30"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] z-20 bg-gradient-to-r from-transparent via-[#FF7849] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlight }}
        />
      )}

      {/* Image */}
      <Link
        href={detailsHref}
        tabIndex={-1}
        aria-hidden
        className="relative block border-b border-[#282828]"
      >
        <ProjectVisual
          project={project}
          className="aspect-[16/10]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#141414]/85 backdrop-blur-sm border border-[#303030] text-[#F4F0E8]">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-[#FF7849] opacity-75 animate-ping" />
                  <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#FF7849]" />
                </span>
                Live
              </span>
            )}
            {project.featured && (
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FF7849]/15 text-[#FF7849] border border-[#FF7849]/35 backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono text-[#A39E93] px-2 py-1 rounded bg-[#141414]/85 backdrop-blur-sm">
            {project.year}
          </span>
        </div>
      </Link>

      {/* Body */}
      <div className="relative z-20 p-6 flex-1 flex flex-col">
        <span className="text-[11px] font-mono text-[#FF7849] uppercase tracking-wider mb-2">
          {project.eyebrow || "Web Application"}
        </span>

        <h3 className="text-xl font-bold text-[#F4F0E8] tracking-tight mb-2">
          <Link
            href={detailsHref}
            className="hover:text-[#FF7849] transition-colors"
          >
            {project.title}
          </Link>
        </h3>

        <p className="text-sm text-[#A39E93] leading-relaxed line-clamp-3 mb-5">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#202020] text-[#F4F0E8]/90 border border-[#2e2e2e] group-hover:border-[#3a3a3a] transition-colors"
            >
              {tech}
            </span>
          ))}
          {extraTech > 0 && (
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg text-[#A39E93]">
              +{extraTech}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-5 border-t border-[#303030]/70">
          <Link
            href={detailsHref}
            className="group/cta inline-flex items-center gap-2 bg-[#FF7849] hover:bg-[#ff8559] text-[#141414] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors active:scale-95"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
          </Link>

          <div className="flex items-center gap-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code`}
                title="Source code"
                className="p-2.5 rounded-full text-[#A39E93] hover:text-[#FF7849] hover:bg-[#303030]/50 transition-colors"
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
                className="p-2.5 rounded-full text-[#A39E93] hover:text-[#FF7849] hover:bg-[#303030]/50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
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
      className="scroll-mt-24 py-24 sm:py-32 px-6 md:px-12 max-w-6xl mx-auto w-full"
    >
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} idx={idx} />
        ))}
      </div>

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