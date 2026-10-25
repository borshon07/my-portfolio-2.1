import { Variants } from "motion/react";

// Premium cinematic easing curves
export const transitionConfig = {
  easeEditorial: [0.22, 1, 0.36, 1] as const, // Smooth decelerate / cubic-bezier out-quint
  easeSpring: { type: "spring", stiffness: 350, damping: 28 },
  durationFast: 0.25,
  durationMedium: 0.5,
  durationSlow: 0.8,
  durationCinematic: 1.1,
};

// Fade up with custom easing
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: custom,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Word / Line clipping reveal for headlines
export const headlineContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

export const headlineWord: Variants = {
  hidden: {
    opacity: 0,
    y: "110%",
    rotateZ: 2,
  },
  visible: {
    opacity: 1,
    y: "0%",
    rotateZ: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Staggered card container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Image mask reveal
export const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.08,
    clipPath: "inset(10% 10% 10% 10% round 16px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Viewport trigger defaults
export const defaultViewport = {
  once: true,
  amount: 0.2,
  margin: "-50px",
};
