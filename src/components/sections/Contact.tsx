"use client";

import React, { useState } from "react";
import { personalInfo, socialLinks } from "@/data/portfolioData";
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { defaultViewport } from "@/utils/motion";

const EMAIL = "borshonroy73@gmail.com";

const WHATSAPP_MESSAGE =
  "Hi Borshon, I found your portfolio and would like to talk.";

/* ---------- Animation variants ---------- */
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  // WhatsApp link: number theke +, space, - muche shudhu digit rakhe
  const whatsappDigits = personalInfo.whatsapp?.replace(/\D/g, "") ?? "";
  const whatsappHref = whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : "";

  /* ---------- Cursor-following glow ---------- */
  const glowX = useMotionValue(-500);
  const glowY = useMotionValue(-500);
  const glowBackground = useMotionTemplate`radial-gradient(450px circle at ${glowX}px ${glowY}px, rgb(var(--accent-rgb)/0.14), transparent 65%)`;

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  /* ---------- Magnetic button ---------- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 15 });
  const sy = useSpring(my, { stiffness: 200, damping: 15 });

  const handleMagnetMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };

  const handleMagnetLeave = () => {
    mx.set(0);
    my.set(0);
  };

  /* ---------- Copy email (safe) ---------- */
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-24 sm:py-32 px-6 md:px-12 max-w-6xl mx-auto w-full"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={container}
        onMouseMove={handleCardMove}
        className="theme-inverse relative rounded-3xl bg-surface border border-line p-8 ..."
      >
        {/* Static ambient glow */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        {/* Cursor-following glow */}
        {!reduceMotion && (
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: glowBackground }}
          />
        )}

        <div className="relative z-10 max-w-3xl">
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-2 mb-6">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-accent-fg font-semibold">
              04 // Get In Touch
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={item}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-fg leading-[1.1] mb-6"
          >
            Have an idea?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fg via-accent to-accent block sm:inline">
              Let&apos;s build something meaningful.
            </span>
          </motion.h2>

          {/* Supporting copy */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-muted leading-relaxed mb-10 max-w-2xl font-normal"
          >
            Whether you are looking for a dedicated web developer for your team, have an
            open-source project to collaborate on, or just want to discuss modern frontend
            architecture—my inbox is always open.
          </motion.p>

          {/* Action bar */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8"
          >
            {/* Magnetic email button */}
            <motion.a
              href={`mailto:${EMAIL}`}
              style={{ x: sx, y: sy }}
              onMouseMove={handleMagnetMove}
              onMouseLeave={handleMagnetLeave}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-hover text-on-accent font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-colors duration-300 shadow-xl shadow-accent/25 hover:shadow-accent/40"
            >
              <Mail className="w-4 h-4" />
              <span>Send an Email</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>

            {/* Copy email button */}
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address to clipboard"
              className="inline-flex items-center justify-center gap-2 bg-surface-3 hover:bg-surface-4 text-fg border border-line hover:border-accent/50 px-6 py-4 rounded-full text-xs font-mono transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "check" : "copy"}
                  initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-accent-fg" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted" />
                  )}
                </motion.span>
              </AnimatePresence>
              <span className={copied ? "text-accent-fg font-medium" : ""}>
                {copied ? "Copied to Clipboard!" : EMAIL}
              </span>
            </button>
          </motion.div>

          {/* Phone + WhatsApp */}
          {(personalInfo.phone || whatsappHref) && (
            <motion.div
              variants={item}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12"
            >
              {personalInfo.phone && (
                <a
                  href={`tel:${personalInfo.phone.replace(/[\s-]/g, "")}`}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-surface-2 border border-line hover:border-accent/50 transition-colors"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-3 border border-line-strong text-accent-fg group-hover:bg-accent group-hover:text-on-accent group-hover:border-accent transition-colors">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[11px] font-mono text-muted">Phone</span>
                    <span className="text-sm font-mono text-fg">
                      {personalInfo.phone}
                    </span>
                  </span>
                </a>
              )}

              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with me on WhatsApp"
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-surface-2 border border-line hover:border-accent/50 transition-colors"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-3 border border-line-strong text-accent-fg group-hover:bg-accent group-hover:text-on-accent group-hover:border-accent transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[11px] font-mono text-muted">WhatsApp</span>
                    <span className="text-sm font-mono text-fg inline-flex items-center gap-1.5">
                      Chat on WhatsApp
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </span>
                </a>
              )}
            </motion.div>
          )}

          {/* Direct channels */}
          <motion.div
            variants={item}
            className="pt-8 border-t border-line/80 flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-muted"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-accent-fg" />
              <span>Response time: Usually within 24–48 hours</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target={social.iconName === "mail" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-fg hover:text-accent-fg transition-all hover:scale-105"
                >
                  {social.iconName === "github" ? (
                    <GithubIcon className="w-4 h-4" />
                  ) : social.iconName === "linkedin" ? (
                    <LinkedinIcon className="w-4 h-4" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                  <span>{social.platform}</span>
                  <ArrowUpRight className="w-3 h-3 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-fg" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}