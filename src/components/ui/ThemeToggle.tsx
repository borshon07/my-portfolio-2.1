"use client";

import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked, theme still changes for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className={`group relative w-10 h-10 rounded-full text-fg hover:text-accent-fg hover:bg-line/50 transition-colors ${className}`}
    >
      <span className="absolute inset-0 flex items-center justify-center [perspective:300px]">
        <span className="relative block w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none [transform-style:preserve-3d] [transform:rotateY(180deg)] dark:[transform:rotateY(0deg)] group-active:scale-90">
          {/* Dark mode e Sun dekhay (click korle light hobe) */}
          <span className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]">
            <Sun className="w-5 h-5" />
          </span>
          {/* Light mode e Moon dekhay (click korle dark hobe) */}
          <span className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <Moon className="w-5 h-5" />
          </span>
        </span>
      </span>
    </button>
  );
}