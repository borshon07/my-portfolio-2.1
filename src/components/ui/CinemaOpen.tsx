"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/* Preloader shesh hole upor-niche kalo bar dhire soriye jay (cinema opening) */
export default function CinemaOpen() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const onDone = () => setOpen(true);
    window.addEventListener("preloader:done", onDone);

    // Safety: preloader kono karone na thakle bar atke thakbe na
    const fallback = setTimeout(() => setOpen(true), 9000);

    return () => {
      window.removeEventListener("preloader:done", onDone);
      clearTimeout(fallback);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setGone(true), 2600);
    return () => clearTimeout(t);
  }, [open]);

  if (reduceMotion || gone) return null;

  const transition = {
    duration: 1.4,
    delay: open ? 0.55 : 0,
    ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
  };

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        className="absolute inset-x-0 top-0 bg-black"
        initial={{ height: "15vh" }}
        animate={{ height: open ? 0 : "15vh" }}
        transition={transition}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-black"
        initial={{ height: "15vh" }}
        animate={{ height: open ? 0 : "15vh" }}
        transition={transition}
      />
    </div>
  );
}