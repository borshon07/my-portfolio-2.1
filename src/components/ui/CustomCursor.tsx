"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";

const emptySubscribe = () => () => {};

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, summary, [data-cursor]";

const IDLE_SIZE = 22;
const SNAP_PADDING = 8;

// Head-er pichone trail blob gulo (boro theke choto)
const TRAIL = [
  { size: 18, stiffness: 260, damping: 26 },
  { size: 15, stiffness: 200, damping: 25 },
  { size: 12, stiffness: 150, damping: 24 },
  { size: 9, stiffness: 110, damping: 23 },
  { size: 6, stiffness: 80, damping: 22 },
];

type Mode = "idle" | "snap" | "grow";

/* ---------- Trail blob ---------- */
function TrailBlob({
  x,
  y,
  size,
  stiffness,
  damping,
  visible,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  size: number;
  stiffness: number;
  damping: number;
  visible: boolean;
}) {
  const sx = useSpring(x, { stiffness, damping, mass: 0.6 });
  const sy = useSpring(y, { stiffness, damping, mass: 0.6 });
  const left = useTransform(sx, (v) => v - size / 2);
  const top = useTransform(sy, (v) => v - size / 2);

  // Window-e dhukle blob gulo kone theke ure ashbe na, sorasori jump korbe
  useEffect(() => {
    if (visible) {
      sx.jump(x.get());
      sy.jump(y.get());
    }
  }, [visible, sx, sy, x, y]);

  return (
    <motion.div
      className="absolute top-0 left-0 rounded-full bg-accent"
      style={{ width: size, height: size, x: left, y: top }}
    />
  );
}

export default function CustomCursor() {
  const isFinePointer = useSyncExternalStore(
    emptySubscribe,
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [pressed, setPressed] = useState(false);

  // Raw mouse position (center dot er jonno)
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Blob er target (mouse ba snap kora element)
  const targetX = useMotionValue(-200);
  const targetY = useMotionValue(-200);
  const targetW = useMotionValue(IDLE_SIZE);
  const targetH = useMotionValue(IDLE_SIZE);
  const targetR = useMotionValue(IDLE_SIZE / 2);

  // Head spring
  const sx = useSpring(targetX, { stiffness: 520, damping: 38, mass: 0.6 });
  const sy = useSpring(targetY, { stiffness: 520, damping: 38, mass: 0.6 });
  const sw = useSpring(targetW, { stiffness: 300, damping: 28 });
  const sh = useSpring(targetH, { stiffness: 300, damping: 28 });
  const sr = useSpring(targetR, { stiffness: 300, damping: 28 });

  const headX = useTransform([sx, sw], ([x, w]: number[]) => x - w / 2);
  const headY = useTransform([sy, sh], ([y, h]: number[]) => y - h / 2);

  // Speed onujayi liquid er moto stretch / squash
  const vx = useVelocity(sx);
  const vy = useVelocity(sy);
  const rawStretchX = useTransform([vx, vy], ([a, b]: number[]) => {
    const fx = Math.min(Math.abs(a) / 3000, 0.55);
    const fy = Math.min(Math.abs(b) / 3000, 0.55);
    return 1 + fx - fy * 0.45;
  });
  const rawStretchY = useTransform([vx, vy], ([a, b]: number[]) => {
    const fx = Math.min(Math.abs(a) / 3000, 0.55);
    const fy = Math.min(Math.abs(b) / 3000, 0.55);
    return 1 + fy - fx * 0.45;
  });
  const stretchX = useSpring(rawStretchX, { stiffness: 400, damping: 30 });
  const stretchY = useSpring(rawStretchY, { stiffness: 400, damping: 30 });

  // Center dot
  const dotX = useTransform(mouseX, (v) => v - 2);
  const dotY = useTransform(mouseY, (v) => v - 2);

  const snapEl = useRef<HTMLElement | null>(null);
  const snapRadius = useRef(0);
  const modeRef = useRef<Mode>("idle");

  // Native cursor hide (globals.css e kichu likhte hobe na)
  useEffect(() => {
    if (!isFinePointer) return;
    const style = document.createElement("style");
    style.setAttribute("data-liquid-cursor", "");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);
    return () => style.remove();
  }, [isFinePointer]);

  // Window-e dhukle head o sorasori jump kore
  useEffect(() => {
    if (isVisible) {
      sx.jump(targetX.get());
      sy.jump(targetY.get());
    }
  }, [isVisible, sx, sy, targetX, targetY]);

  useEffect(() => {
    if (!isFinePointer) return;

    const mouse = { x: -200, y: -200 };

    const applyMode = (next: Mode) => {
      if (modeRef.current !== next) {
        modeRef.current = next;
        setMode(next);
      }
    };

    const updateTarget = () => {
      const el = snapEl.current;

      if (el && el.isConnected && modeRef.current === "snap") {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const w = r.width + SNAP_PADDING * 2;
        const h = r.height + SNAP_PADDING * 2;

        // Element-er center-e boshe, mouse er dike halka tane (magnetic)
        targetX.set(cx + (mouse.x - cx) * 0.12);
        targetY.set(cy + (mouse.y - cy) * 0.12);
        targetW.set(w);
        targetH.set(h);
        targetR.set(
          Math.min(snapRadius.current + SNAP_PADDING, Math.min(w, h) / 2)
        );
        return;
      }

      targetX.set(mouse.x);
      targetY.set(mouse.y);

      if (modeRef.current === "grow") {
        targetW.set(54);
        targetH.set(54);
        targetR.set(27);
      } else {
        targetW.set(IDLE_SIZE);
        targetH.set(IDLE_SIZE);
        targetR.set(IDLE_SIZE / 2);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      updateTarget();
      setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>(INTERACTIVE) ?? null;

      if (!el) {
        snapEl.current = null;
        applyMode("idle");
        updateTarget();
        return;
      }

      const r = el.getBoundingClientRect();
      const tooBig = r.width > 420 || r.height > 160;

      if (tooBig) {
        snapEl.current = null;
        applyMode("grow");
      } else {
        snapEl.current = el;
        snapRadius.current =
          parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
        applyMode("snap");
      }
      updateTarget();
    };

    const handleScroll = () => updateTarget();
    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [isFinePointer, mouseX, mouseY, targetX, targetY, targetW, targetH, targetR]);

  if (!isFinePointer) return null;

  const gooOpacity = mode === "snap" ? 0.2 : mode === "grow" ? 0.5 : 1;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200] transition-opacity duration-200"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Gooey filter definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter
            id="liquid-goo"
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            />
          </filter>
        </defs>
      </svg>

      {/* Liquid layer: trail + head ek sathe merge hoy */}
      <motion.div
        className="absolute inset-0"
        style={{ filter: "url(#liquid-goo)" }}
        animate={{ opacity: gooOpacity }}
        transition={{ duration: 0.25 }}
      >
        {TRAIL.map((t, i) => (
          <TrailBlob
            key={i}
            x={targetX}
            y={targetY}
            size={t.size}
            stiffness={t.stiffness}
            damping={t.damping}
            visible={isVisible}
          />
        ))}

        <motion.div
          className="absolute top-0 left-0 bg-accent"
          style={{
            x: headX,
            y: headY,
            width: sw,
            height: sh,
            borderRadius: sr,
            scaleX: stretchX,
            scaleY: stretchY,
          }}
          animate={{ scale: pressed ? 0.78 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </motion.div>

      {/* Crisp outline: snap korle element er chardike ring */}
      <motion.div
        className="absolute top-0 left-0 border border-accent/70"
        style={{
          x: headX,
          y: headY,
          width: sw,
          height: sh,
          borderRadius: sr,
        }}
        animate={{ opacity: mode === "snap" ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Precise center dot */}
      <motion.div
        className="absolute top-0 left-0 w-1 h-1 rounded-full bg-fg"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: mode === "idle" ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}