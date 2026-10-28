import React from "react";

function Sprockets() {
  return (
    <div aria-hidden className="flex items-center justify-between gap-2.5 px-4 py-2">
      {Array.from({ length: 24 }, (_, i) => (
        <span
          key={i}
          className="h-2 max-w-[14px] flex-1 rounded-[2px] bg-canvas/90"
        />
      ))}
    </div>
  );
}

/* Project screenshot ke film-strip frame e rakhe.
   Hover border er jonno parent e `group` class thaka lagbe. */
export default function FilmFrame({
  children,
  label,
  caption,
}: {
  children: React.ReactNode;
  label: string;
  caption?: string;
}) {
  return (
    <div className="relative rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/40 transition-colors duration-300 group-hover:border-accent/60">
      <Sprockets />

      <div className="px-3 sm:px-4">
        <div className="relative overflow-hidden rounded-md ring-1 ring-white/10">
          {children}
        </div>
      </div>

      <div className="flex items-center justify-between px-4 pb-1 pt-2.5 font-mono text-[10px] uppercase tracking-widest text-white/55">
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Rec · {label}
        </span>
        {caption && (
          <span className="hidden max-w-[55%] truncate normal-case tracking-normal sm:inline">
            {caption}
          </span>
        )}
      </div>

      <Sprockets />
    </div>
  );
}