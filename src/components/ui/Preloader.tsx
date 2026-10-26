"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Atom, Braces, Code2, Layers, Sparkles, Wind } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

const CUBE_SIZE = 96;
const HALF = CUBE_SIZE / 2;

const faces = [
  { icon: Code2, transform: `rotateY(0deg) translateZ(${HALF}px)` },
  { icon: Braces, transform: `rotateY(90deg) translateZ(${HALF}px)` },
  { icon: Layers, transform: `rotateY(180deg) translateZ(${HALF}px)` },
  { icon: Atom, transform: `rotateY(270deg) translateZ(${HALF}px)` },
  { icon: Wind, transform: `rotateX(90deg) translateZ(${HALF}px)` },
  { icon: Sparkles, transform: `rotateX(-90deg) translateZ(${HALF}px)` },
];

export default function Preloader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  // Progress counter 0 -> 100
  useEffect(() => {
    const duration = reduceMotion ? 600 : 2600;
    const start = performance.now();
    let raf = 0;
    let closeTimer: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        closeTimer = setTimeout(() => setVisible(false), 350);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(closeTimer);
    };
  }, [reduceMotion]);

  // Lock scroll while loading
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading portfolio"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-sunken overflow-hidden"
        >
          {/* Background glow + grid */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle 420px at 50% 45%, rgb(var(--accent-rgb)/0.14), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse 60% 50% at 50% 45%, #000 20%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 50% at 50% 45%, #000 20%, transparent 75%)",
            }}
          />

          {/* 3D scene */}
          <div
            className="relative flex items-center justify-center w-64 h-64"
            style={{ perspective: 800 }}
          >
            {/* Orbit ring 1 */}
            <div
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d", transform: "rotateX(72deg)" }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full border border-accent/40"
              >
                <span className="absolute -top-1 left-1/2 w-2 h-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
              </motion.div>
            </div>

            {/* Orbit ring 2 */}
            <div
              className="absolute inset-4"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateY(72deg) rotateZ(30deg)",
              }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full border border-dashed border-fg/20"
              >
                <span className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 -translate-x-1/2 rounded-full bg-fg" />
              </motion.div>
            </div>

            {/* Rotating cube */}
            <motion.div
              initial={{ rotateX: -25, rotateY: 0, scale: 0.4, opacity: 0 }}
              animate={
                reduceMotion
                  ? { scale: 1, opacity: 1 }
                  : { rotateX: 335, rotateY: 360, scale: 1, opacity: 1 }
              }
              transition={{
                rotateX: { duration: 7, repeat: Infinity, ease: "linear" },
                rotateY: { duration: 7, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.5 },
              }}
              style={{
                width: CUBE_SIZE,
                height: CUBE_SIZE,
                transformStyle: "preserve-3d",
              }}
              className="relative"
            >
              {faces.map(({ icon: Icon, transform }, i) => (
                <div
                  key={i}
                  style={{ transform }}
                  className="absolute inset-0 flex items-center justify-center rounded-xl bg-surface/90 border border-accent/50 text-accent-fg shadow-[inset_0_0_24px_rgb(var(--accent-rgb)/0.15)]"
                >
                  <Icon className="w-9 h-9" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Name + progress */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mt-10 flex flex-col items-center gap-4"
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted">
              {personalInfo.name}
            </span>

            <div className="w-56 h-[2px] rounded-full bg-line-soft overflow-hidden">
              <div
                className="h-full bg-accent transition-[width] duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="text-xs font-mono text-accent-fg tabular-nums">
              {String(progress).padStart(3, "0")}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}