"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "motion/react";
import { navItems, personalInfo } from "@/data/portfolioData";

/* ---------- Mini 3D cube logo ---------- */
const CUBE_HALF = 9;
const cubeFaces = [
  `rotateY(0deg) translateZ(${CUBE_HALF}px)`,
  `rotateY(90deg) translateZ(${CUBE_HALF}px)`,
  `rotateY(180deg) translateZ(${CUBE_HALF}px)`,
  `rotateY(270deg) translateZ(${CUBE_HALF}px)`,
  `rotateX(90deg) translateZ(${CUBE_HALF}px)`,
  `rotateX(-90deg) translateZ(${CUBE_HALF}px)`,
];

function CubeLogo({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <span className="relative inline-block w-[18px] h-[18px]" style={{ perspective: 200 }}>
      <motion.span
        className="absolute inset-0 block"
        style={{ transformStyle: "preserve-3d", rotateX: -25 }}
        animate={reduceMotion ? undefined : { rotateY: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      >
        {cubeFaces.map((transform, i) => (
          <span
            key={i}
            style={{ transform }}
            className="absolute inset-0 rounded-[3px] border border-[#FF7849]/80 bg-[#FF7849]/20"
          />
        ))}
      </motion.span>
    </span>
  );
}

/* ---------- 3D flip label for nav links ---------- */
function FlipLabel({
  label,
  isActive,
}: {
  label: string;
  isActive: boolean;
}) {
  return (
    <span className="relative block h-4 [perspective:400px]">
      <span className="relative block h-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateX(-90deg)]">
        <span className="block h-4 leading-4 [transform:translateZ(8px)] [backface-visibility:hidden]">
          {label}
        </span>
        <span
          aria-hidden
          className={`absolute inset-0 block h-4 leading-4 [transform:rotateX(90deg)_translateZ(8px)] [backface-visibility:hidden] ${
            isActive ? "" : "text-[#F4F0E8]"
          }`}
        >
          {label}
        </span>
      </span>
    </span>
  );
}

/* ---------- Mobile menu variants ---------- */
const menuContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const menuItem: Variants = {
  hidden: { opacity: 0, rotateX: -70, y: 24 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, rotateX: 40, y: -12, transition: { duration: 0.2 } },
};

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  /* ---------- Scroll progress ---------- */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  /* ---------- Scroll + active section ---------- */
  useEffect(() => {
    const sections = navItems.map((item) => item.href.replace("#", ""));

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const position = window.scrollY + 160;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && position >= el.offsetTop && position < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------- Lock scroll + Esc to close ---------- */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  /* ---------- 3D tilt on the navbar pill ---------- */
  const pillRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 140, damping: 18, mass: 0.5 });
  const rotateY = useSpring(ry, { stiffness: 140, damping: 18, mass: 0.5 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(260px circle at ${gx}% ${gy}%, rgba(255,120,73,0.14), transparent 65%)`;

  const handlePillMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !pillRef.current) return;
    const rect = pillRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 5);
    rx.set((0.5 - py) * 8);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const handlePillLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF7849] via-[#ff8e66] to-[#FF7849] z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Floating 3D navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-[padding] duration-300 ${
          scrolled ? "pt-2.5" : "pt-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12" style={{ perspective: 1200 }}>
          <motion.div
            ref={pillRef}
            onMouseMove={handlePillMove}
            onMouseLeave={handlePillLeave}
            style={{ rotateX, rotateY }}
            className={`pointer-events-auto relative flex items-center justify-between rounded-full border backdrop-blur-xl px-3 sm:px-4 transition-all duration-300 ${
              scrolled
                ? "py-2 bg-[#141414]/90 border-[#3a3a3a] shadow-2xl shadow-black/50"
                : "py-2.5 bg-[#161616]/60 border-[#303030]/80 shadow-lg shadow-black/20"
            }`}
          >
            {/* Cursor glare */}
            {!reduceMotion && (
              <motion.div
                aria-hidden
                style={{ background: glare }}
                className="absolute inset-0 rounded-full pointer-events-none"
              />
            )}

            {/* Brand */}
            <Link
              href="#hero"
              onClick={() => setIsOpen(false)}
              className="group relative flex items-center gap-3 pl-1 text-[#F4F0E8] transition-colors hover:text-[#FF7849]"
            >
              <CubeLogo reduceMotion={reduceMotion} />
              <span className="font-semibold tracking-tight text-sm sm:text-base">
                {personalInfo.name}
              </span>
              <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-widest text-[#A39E93] pl-3 border-l border-[#303030]">
                Dev
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav className="relative hidden md:flex items-center gap-1 rounded-full bg-[#1a1a1a]/80 border border-[#303030]/80 p-1">
              {navItems.map((item) => {
                const target = item.href.replace("#", "");
                const isActive = activeSection === target;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                      isActive
                        ? "text-[#141414] font-semibold"
                        : "text-[#A39E93] hover:text-[#F4F0E8]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 z-0 rounded-full bg-[#FF7849] shadow-md shadow-[#FF7849]/30"
                      />
                    )}
                    <span className="relative z-10 block">
                      <FlipLabel label={item.label} isActive={isActive} />
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="relative flex items-center gap-2">
              {/* 3D key-style CTA */}
              <Link
                href="#contact"
                className="group hidden md:inline-flex items-center gap-1.5 bg-[#FF7849] hover:bg-[#ff8559] text-[#141414] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-[0_4px_0_#b94a22] hover:shadow-[0_3px_0_#b94a22] hover:translate-y-px active:shadow-[0_0_0_#b94a22] active:translate-y-1 transition-all duration-150"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Mobile menu button (animated bars) */}
              <button
                onClick={() => setIsOpen((v) => !v)}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="md:hidden relative z-50 w-10 h-10 rounded-full text-[#F4F0E8] hover:text-[#FF7849] hover:bg-[#303030]/50 transition-colors"
              >
                <motion.span
                  aria-hidden
                  animate={{ y: isOpen ? 0 : -4, rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-1/2 top-1/2 -ml-2.5 -mt-px block h-[2px] w-5 rounded-full bg-current"
                />
                <motion.span
                  aria-hidden
                  animate={{ y: isOpen ? 0 : 4, rotate: isOpen ? -45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-1/2 top-1/2 -ml-2.5 -mt-px block h-[2px] w-5 rounded-full bg-current"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Mobile full-screen menu (outside the tilted pill so `fixed` works) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 bg-[#141414]/97 backdrop-blur-2xl px-6 pt-28 pb-10 flex flex-col justify-between overflow-y-auto"
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle 360px at 80% 20%, rgba(255,120,73,0.12), transparent 70%)",
              }}
            />

            <motion.nav
              variants={menuContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ perspective: 800 }}
              className="relative flex flex-col gap-3"
            >
              {navItems.map((item, i) => {
                const target = item.href.replace("#", "");
                const isActive = activeSection === target;

                return (
                  <motion.div
                    key={item.href}
                    variants={menuItem}
                    style={{ transformOrigin: "top center" }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between py-4 px-5 rounded-2xl border text-lg font-semibold tracking-tight transition-colors ${
                        isActive
                          ? "border-[#FF7849]/50 bg-[#FF7849]/10 text-[#FF7849]"
                          : "border-[#303030] bg-[#181818] text-[#F4F0E8] hover:border-[#FF7849]/40"
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-xs font-mono text-[#A39E93]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </span>
                      {isActive ? (
                        <span className="w-2 h-2 rounded-full bg-[#FF7849]" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-[#A39E93]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="relative flex flex-col gap-4 mt-8"
            >
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FF7849] text-[#141414] font-bold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-[0_4px_0_#b94a22] active:shadow-[0_0_0_#b94a22] active:translate-y-1 transition-all duration-150"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#A39E93] font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#FF7849]" />
                {personalInfo.location}
                {personalInfo.isAvailableForWork && " • Open for work"}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}