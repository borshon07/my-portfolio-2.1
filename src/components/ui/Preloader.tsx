"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { personalInfo } from "@/data/portfolioData";

/* =====================================================================
   EDIT: lekha ar timing ekhane bodlano jay
   ===================================================================== */

const GREETINGS = [
  { text: "Hello", lang: "en" },
  { text: "হ্যালো", lang: "bn" },
  { text: "Hola", lang: "es" },
  { text: "こんにちは", lang: "ja" },
  { text: "Bonjour", lang: "fr" },
];

const TAGLINE = "Don't be afraid. It's only a portfolio.";

const GREET_START = 700; // koto ms pore greeting shuru
const GREET_MS = 430; // prottek greeting koto ms thake
const NAME_HOLD = 1500; // naam koto ms dekha jay
const TOTAL = GREET_START + GREETINGS.length * GREET_MS + NAME_HOLD;

const BALLOON_RED = "#d6202a";

/* Naam ke word e bhag kora, jate choto screen e akkhor bhenge na jay */
const NAME_WORDS = personalInfo.name.split(" ").map((word, i, all) => ({
  word,
  start: all.slice(0, i).join("").length,
}));

/* Brishtir phota (deterministic, tai server ar client e same) */
const DROPS = Array.from({ length: 34 }, (_, i) => ({
  left: (i * 53) % 100,
  delay: ((i * 17) % 10) / 10,
  duration: 0.75 + ((i * 29) % 7) / 10,
  height: 38 + ((i * 13) % 5) * 12,
  opacity: 0.1 + ((i * 7) % 5) * 0.04,
}));

/* ---------- Rain ---------- */
function Rain() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ transform: "rotate(-8deg) scale(1.2)" }}
    >
      {DROPS.map((d, i) => (
        <motion.span
          key={i}
          className="absolute top-0 w-px rounded-full bg-gradient-to-b from-transparent to-[#b8cde6]"
          style={{ left: `${d.left}%`, height: d.height, opacity: d.opacity }}
          initial={{ y: "-20vh" }}
          animate={{ y: "120vh" }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Glowing eye (drain er vitor theke) ---------- */
function Eye({ delay }: { delay: number }) {
  return (
    <motion.span
      className="block w-5 h-3 rounded-[50%] bg-accent"
      style={{ boxShadow: "0 0 18px 5px rgb(var(--accent-rgb) / 0.75)" }}
      initial={{ opacity: 0, scaleY: 1 }}
      animate={{ opacity: 1, scaleY: [1, 0.08, 1, 1] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scaleY: {
          duration: 2.6,
          delay: delay + 0.9,
          repeat: Infinity,
          times: [0, 0.07, 0.14, 1],
          ease: "easeInOut",
        },
      }}
    />
  );
}

/* ---------- Storm drain ---------- */
function StormDrain() {
  return (
    <div
      aria-hidden
      className="absolute left-1/2 -translate-x-1/2 bottom-[16%] w-[min(80vw,400px)]"
    >
      {/* Vitor theke lal alo ber hoy */}
      <div
        className="absolute -inset-x-10 -top-8 -bottom-8 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 70%, rgba(214,32,42,0.35), transparent 65%)",
        }}
      />

      <div className="relative h-[72px] overflow-hidden rounded-t-lg border border-line-strong bg-black">
        <div className="absolute inset-0 flex items-center justify-center gap-10">
          <Eye delay={0.3} />
          <Eye delay={0.42} />
        </div>

        {/* Grate er rod */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #05070a 0 11px, transparent 11px 30px)",
          }}
        />
      </div>

      {/* Curb */}
      <div className="h-3 rounded-b-sm bg-surface-2 border-x border-b border-line-strong" />
    </div>
  );
}

/* ---------- Red balloon ---------- */
function Balloon() {
  return (
    <svg
      viewBox="0 0 80 190"
      className="w-[clamp(46px,9vw,76px)] h-auto"
      style={{ filter: "drop-shadow(0 0 20px rgba(214,32,42,0.5))" }}
    >
      <defs>
        <radialGradient id="preloader-balloon" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ff5a5f" />
          <stop offset="45%" stopColor={BALLOON_RED} />
          <stop offset="100%" stopColor="#6e0a12" />
        </radialGradient>
      </defs>

      {/* String */}
      <path
        d="M40 118 C 32 134, 49 150, 39 168 S 43 184, 40 190"
        fill="none"
        stroke="rgba(235,235,240,0.55)"
        strokeWidth="1.2"
      />

      {/* Body */}
      <path
        d="M40 4 C 62 4, 76 24, 76 48 C 76 76, 56 100, 40 108 C 24 100, 4 76, 4 48 C 4 24, 18 4, 40 4 Z"
        fill="url(#preloader-balloon)"
      />

      {/* Knot */}
      <path d="M40 106 L33 119 Q40 114 47 119 Z" fill="#8f0f18" />

      {/* Highlight */}
      <ellipse
        cx="26"
        cy="30"
        rx="8"
        ry="15"
        fill="rgba(255,255,255,0.35)"
        transform="rotate(25 26 30)"
      />
    </svg>
  );
}

export default function Preloader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(-1); // -1 = shuru, 0..n-1 = greeting, n = naam

  const rafRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
    (window as Window & { __preloaderDone?: boolean }).__preloaderDone = true;
    window.dispatchEvent(new Event("preloader:done"));
  }, []);

  /* ---------- Timeline ---------- */
  useEffect(() => {
    // Reduced motion: shudhu naam dekhiye ektu pore bondho
    if (reduceMotion) {
      const t1 = setTimeout(() => {
        setStep(GREETINGS.length);
        setProgress(100);
      }, 50);
      const t2 = setTimeout(finish, 1100);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    const start = performance.now();
    let lastPct = -1;
    let lastStep = -2;

    const tick = (now: number) => {
      const elapsed = now - start;

      const pct = Math.round(Math.min(elapsed / TOTAL, 1) * 100);
      if (pct !== lastPct) {
        lastPct = pct;
        setProgress(pct);
      }

      const s =
        elapsed < GREET_START
          ? -1
          : Math.min(
              Math.floor((elapsed - GREET_START) / GREET_MS),
              GREETINGS.length,
            );
      if (s !== lastStep) {
        lastStep = s;
        setStep(s);
      }

      if (elapsed < TOTAL) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        timerRef.current = setTimeout(finish, 350);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reduceMotion, finish]);

  /* ---------- Loading cholar somoy scroll lock ---------- */
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const greeting =
    step >= 0 && step < GREETINGS.length ? GREETINGS[step] : null;
  const named = step >= GREETINGS.length;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading portfolio"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="theme-inverse fixed inset-0 z-[100] overflow-hidden bg-sunken"
        >
          {/* Rain */}
          {!reduceMotion && <Rain />}

          {/* Balloon: drain er pichon theke uthe ashe */}
          {!reduceMotion && (
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-[17%] flex justify-center pointer-events-none"
            >
              <motion.div
                initial={{ y: "22vh", opacity: 0 }}
                animate={{ y: "-125vh", opacity: 1 }}
                transition={{
                  y: { duration: 3.5, delay: 0.9, ease: [0.45, 0, 0.55, 1] },
                  opacity: { duration: 0.15, delay: 0.9 },
                }}
              >
                <motion.div
                  animate={{
                    x: [0, 16, -12, 10, -6, 0],
                    rotate: [-3, 4, -4, 3, -2, 0],
                  }}
                  transition={{ duration: 3.5, delay: 0.9, ease: "easeInOut" }}
                >
                  <Balloon />
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* Storm drain + chokh */}
          <StormDrain />

          {/* Vignette */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 55%, transparent 25%, rgba(0,0,0,0.78) 100%)",
            }}
          />

          {/* Light flicker (halka, kom bar) */}
          {!reduceMotion && (
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-black pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.45, 0, 0.3, 0, 0] }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                times: [0, 0.3, 0.32, 0.36, 0.38, 0.42, 1],
              }}
            />
          )}

          {/* Greeting / Naam */}
          <div className="absolute inset-x-0 top-[18%] min-h-[9rem] flex flex-col items-center px-6 text-center">
            {greeting && (
              <motion.span
                key={greeting.text}
                lang={greeting.lang}
                initial={{ opacity: 0, y: 14, skewX: -8 }}
                animate={{
                  opacity: [0, 1, 0.55, 1],
                  y: 0,
                  skewX: 0,
                  x: [-7, 5, -3, 0],
                  textShadow: [
                    "4px 0 rgba(214,32,42,0.9), -4px 0 rgba(90,200,255,0.55)",
                    "-3px 0 rgba(214,32,42,0.8), 3px 0 rgba(90,200,255,0.45)",
                    "0 0 24px rgba(214,32,42,0.35)",
                  ],
                }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="block text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-fg"
              >
                {greeting.text}
              </motion.span>
            )}

            {named && (
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap justify-center gap-x-4 text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-fg">
                  {NAME_WORDS.map(({ word, start }) => (
                    <span
                      key={word + start}
                      className="inline-flex whitespace-nowrap"
                    >
                      {Array.from(word).map((ch, i) => (
                        <motion.span
                          key={i}
                          className="inline-block"
                          style={{ textShadow: "0 0 28px rgba(214,32,42,0.4)" }}
                          initial={
                            reduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: 40, scale: 1.5 }
                          }
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            delay: reduceMotion ? 0 : (start + i) * 0.045,
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {ch}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </div>

                {/* Lal scratch */}
                <motion.span
                  className="block h-[3px] w-40 origin-left rounded-full"
                  style={{ backgroundColor: BALLOON_RED }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                />

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="text-xs sm:text-sm font-mono text-muted"
                >
                  {TAGLINE}
                </motion.span>
              </div>
            )}
          </div>

          {/* Progress + skip */}
          <div className="absolute inset-x-0 bottom-[5%] flex flex-col items-center gap-2 px-6">
            <div className="w-56 h-[2px] rounded-full bg-line-soft overflow-hidden">
              <div
                className="h-full"
                style={{ width: `${progress}%`, backgroundColor: BALLOON_RED }}
              />
            </div>
            <span className="text-[11px] font-mono text-muted tabular-nums">
              {String(progress).padStart(3, "0")}%
            </span>
          </div>

          <button
            type="button"
            onClick={finish}
            className="absolute bottom-[5%] right-5 sm:right-8 text-[11px] font-mono uppercase tracking-widest text-muted hover:text-fg transition-colors"
          >
            Skip
          </button>

          {/* Naam ashar somoy ekbar light ektu jhapsha hoy */}
          {named && !reduceMotion && (
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-black pointer-events-none"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: [0.9, 0, 0.5, 0] }}
              transition={{ duration: 0.5 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
