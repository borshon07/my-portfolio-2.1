"use client";

import React, { useRef } from "react";
import { personalInfo } from "@/data/portfolioData";
import { Terminal, Code2, Compass } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { defaultViewport, fadeInUp, transitionConfig } from "@/utils/motion";

/* ---------- Reusable 3D tilt card ---------- */
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
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,120,73,0.16), transparent 55%)`;

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
    // Outer layer: scroll entrance + perspective
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
      {/* Inner layer: tilt */}
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

export default function About() {
  const reduceMotion = useReducedMotion();

  const principles = [
    {
      icon: Code2,
      title: "Clean Semantic Code",
      text: "Prioritizing maintainable, accessible structure with semantic HTML, modern TypeScript, and clear component architecture.",
    },
    {
      icon: Compass,
      title: "Design-Driven Engineering",
      text: "Bridging the gap between visual craftsmanship and technical performance with purposeful spacing, typography, and contrast.",
    },
    {
      icon: Terminal,
      title: "Continuous Evolution",
      text: "Actively building hands-on projects, learning modern full-stack workflows, and refining problem-solving patterns every day.",
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 px-6 md:px-12 max-w-6xl mx-auto w-full">
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#303030]/80 pb-8 mb-16 gap-6 relative"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-[#FF7849] uppercase tracking-widest font-semibold">
              01 // Profile &amp; Purpose
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
            About My Craft
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[#A39E93] max-w-xs md:text-right">
          Building thoughtful web interfaces with a focus on usability &amp; clarity.
        </p>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* 3D flip-up reveal for the statement + bio */}
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
            <h3 className="text-xl sm:text-2xl font-light text-[#F4F0E8] leading-relaxed">
              <span className="font-semibold text-[#FF7849]">{personalInfo.name}</span> is a web
              developer passionate about translating digital concepts into engaging, highly
              functional web realities.
            </h3>

            <div className="space-y-4 text-base text-[#A39E93] leading-relaxed font-normal">
              {personalInfo.bioParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Info tiles (3D tilt) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#303030]/60 text-xs font-mono">
            <TiltCard
              intensity={14}
              delay={0}
              className="h-full bg-[#181818] p-4 rounded-xl border border-[#303030]/80 hover:border-[#FF7849]/40 transition-colors"
            >
              <span className="text-[#A39E93] block mb-1">LOCATION</span>
              <span
                style={{ transform: "translateZ(24px)" }}
                className="block text-[#F4F0E8] font-medium"
              >
                {personalInfo.location}
              </span>
            </TiltCard>

            <TiltCard
              intensity={14}
              delay={0.08}
              className="h-full bg-[#181818] p-4 rounded-xl border border-[#303030]/80 hover:border-[#FF7849]/40 transition-colors"
            >
              <span className="text-[#A39E93] block mb-1">ROLE</span>
              <span
                style={{ transform: "translateZ(24px)" }}
                className="block text-[#F4F0E8] font-medium"
              >
                {personalInfo.title}
              </span>
            </TiltCard>

            <div className="col-span-2 sm:col-span-1">
              <TiltCard
                intensity={14}
                delay={0.16}
                className="h-full bg-[#181818] p-4 rounded-xl border border-[#303030]/80 hover:border-[#FF7849]/40 transition-colors"
              >
                <span className="text-[#A39E93] block mb-1">STATUS</span>
                <span
                  style={{ transform: "translateZ(24px)" }}
                  className="text-[#FF7849] font-medium flex items-center gap-1.5"
                >
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-[#FF7849] opacity-75 animate-ping" />
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#FF7849]" />
                  </span>
                  {personalInfo.isAvailableForWork ? "Available for work" : "Currently busy"}
                </span>
              </TiltCard>
            </div>
          </div>
        </div>

        {/* Right column: principle cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="text-xs font-mono text-[#A39E93] uppercase tracking-wider mb-2">
            Engineering Values
          </div>

          {principles.map((item, index) => {
            const Icon = item.icon;
            return (
              <TiltCard
                key={item.title}
                intensity={9}
                delay={index * 0.12}
                className="p-5 sm:p-6 rounded-2xl bg-[#181818] border border-[#303030] hover:border-[#FF7849]/60 transition-colors duration-300 shadow-lg shadow-black/20"
              >
                {/* Hover wash */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF7849]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="relative">
                  <div className="flex items-center gap-3.5 mb-2.5">
                    {/* Icon pops out in 3D */}
                    <div
                      style={{ transform: "translateZ(45px)" }}
                      className="w-9 h-9 rounded-xl bg-[#262626] border border-[#3a3a3a] flex items-center justify-center text-[#FF7849] shadow-lg shadow-black/40 group-hover:bg-[#FF7849] group-hover:text-[#141414] group-hover:border-[#FF7849] transition-colors duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4
                      style={{ transform: "translateZ(28px)" }}
                      className="text-base font-semibold text-[#F4F0E8] group-hover:text-[#FF7849] transition-colors"
                    >
                      {item.title}
                    </h4>
                  </div>
                  <p
                    style={{ transform: "translateZ(12px)" }}
                    className="text-xs text-[#A39E93] leading-relaxed pl-12 font-normal"
                  >
                    {item.text}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}