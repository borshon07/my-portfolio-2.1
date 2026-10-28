"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { navItems, personalInfo, socialLinks } from "@/data/portfolioData";
import { ArrowUp, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { usePathname, useRouter } from "next/navigation";
import { goToSection } from "@/utils/goToSection";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { defaultViewport } from "@/utils/motion";

const emptySubscribe = () => () => {};

/* ---------- Mini 3D cube logo ---------- */
const CUBE_HALF = 10;
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
    <span className="relative inline-block w-5 h-5" style={{ perspective: 200 }}>
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
            className="absolute inset-0 rounded-[3px] border border-accent/80 bg-accent/20"
          />
        ))}
      </motion.span>
    </span>
  );
}

/* ---------- 3D flip label ---------- */
function FlipLabel({ label }: { label: string }) {
  return (
    <span className="relative block h-4 [perspective:400px]">
      <span className="relative block h-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateX(-90deg)]">
        <span className="block h-4 leading-4 [transform:translateZ(8px)] [backface-visibility:hidden]">
          {label}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block h-4 leading-4 text-accent-fg [transform:rotateX(90deg)_translateZ(8px)] [backface-visibility:hidden]"
        >
          {label}
        </span>
      </span>
    </span>
  );
}

/* ---------- Entrance variants ---------- */
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

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const resolve = (href: string) => (isHome ? href : `/${href}`);

  const handleNav = (e: React.MouseEvent<HTMLElement>, href: string) =>
    goToSection(e, href, isHome, (url) => router.push(url));

  const currentYear = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => 2026
  );

  return (
    <footer className="theme-inverse relative w-full bg-sunken border-t border-line/80 pt-20 pb-10 px-6 md:px-12 mt-12 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/8 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={container}
        className="relative max-w-6xl mx-auto flex flex-col gap-14"
      >
        {/* Row 1: call to action */}
        <motion.div
          variants={item}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-line-soft"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              {personalInfo.isAvailableForWork && (
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
                </span>
              )}
              <span className="text-xs font-mono text-accent-fg uppercase tracking-widest font-semibold">
                {personalInfo.isAvailableForWork
                  ? "Available for new projects"
                  : "Say hello"}
              </span>
            </div>
            <p className="text-2xl sm:text-3xl text-fg font-light leading-snug">
              Have a project in mind? Let&apos;s talk about how I can help bring it
              to life.
            </p>
          </div>

          <Link
            href={resolve("#contact")}
            onClick={(e) => handleNav(e, "#contact")}
            className="group self-start md:self-auto inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-on-accent text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-[0_4px_0_var(--accent-deep)] hover:shadow-[0_3px_0_var(--accent-deep)] hover:translate-y-px active:shadow-[0_0_0_var(--accent-deep)] active:translate-y-1 transition-all duration-150"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {/* Row 2: brand, nav, socials */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 md:grid-cols-12 gap-10"
        >
          <div className="md:col-span-5">
            <Link
              href={resolve("#hero")}
              onClick={(e) => handleNav(e, "#hero")}
              className="group inline-flex items-center gap-3 text-fg font-bold text-xl tracking-tight hover:text-accent-fg transition-colors"
            >
              <CubeLogo reduceMotion={reduceMotion} />
              <span>{personalInfo.name}</span>
            </Link>
            <p className="text-xs text-muted font-mono mt-3 max-w-sm leading-relaxed">
              Web Developer crafting responsive, clean, and thoughtful web
              interfaces.
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-xs font-mono text-muted">
              <MapPin className="w-3.5 h-3.5 text-accent-fg" />
              {personalInfo.location}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-[11px] font-mono text-muted/70 uppercase tracking-widest mb-4">
              Navigate
            </div>
            <nav className="flex flex-col gap-3">
              {navItems.map((navItem) => (
                <Link
                  key={navItem.href}
                  href={resolve(navItem.href)}
                  onClick={(e) => handleNav(e, navItem.href)}
                  className="group w-fit text-xs font-mono uppercase tracking-wider text-muted hover:text-fg transition-colors"
                >
                  <FlipLabel label={navItem.label} />
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4">
            <div className="text-[11px] font-mono text-muted/70 uppercase tracking-widest mb-4">
              Find me online
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target={social.iconName === "mail" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={`${social.platform} profile`}
                  title={social.platform}
                  className="group flex items-center justify-center w-11 h-11 rounded-xl bg-surface-2 border border-line text-muted shadow-[0_4px_0_var(--line-soft)] hover:text-on-accent hover:bg-accent hover:border-accent hover:shadow-[0_3px_0_var(--accent-deep)] hover:translate-y-px active:shadow-[0_0_0_var(--accent-deep)] active:translate-y-1 transition-all duration-150"
                >
                  {social.iconName === "github" ? (
                    <GithubIcon className="w-4 h-4" />
                  ) : social.iconName === "linkedin" ? (
                    <LinkedinIcon className="w-4 h-4" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Row 3: copyright + back to top */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-line-soft text-xs font-mono text-muted"
        >
          <div>
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </div>

          <Link
            href={resolve("#hero")}
            onClick={(e) => handleNav(e, "#hero")}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-line text-fg shadow-[0_4px_0_var(--line-soft)] hover:text-accent-fg hover:border-accent/50 hover:shadow-[0_3px_0_var(--line-soft)] hover:translate-y-px active:shadow-[0_0_0_var(--line-soft)] active:translate-y-1 transition-all duration-150"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-accent-fg transition-transform duration-200 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </motion.div>
    </footer>
  );
}