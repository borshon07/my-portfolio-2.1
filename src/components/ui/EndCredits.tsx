"use client";

import React, { useRef } from "react";
import { Film } from "lucide-react";
import { useInView } from "motion/react";
import { personalInfo, projects, skillCategories, socialLinks } from "@/data/portfolioData";

type CreditGroup = { role: string; names: string[] };

const GROUPS: CreditGroup[] = [
  { role: "Written, directed & developed by", names: [personalInfo.name] },
  ...skillCategories.map((c) => ({
    role: `Cast · ${c.category}`,
    names: c.skills.map((s) =>
      s.level === "Learning" ? `${s.name} (learning)` : s.name
    ),
  })),
  {
    role: "Featured productions",
    names: projects.map((p) => `${p.title} (${p.year})`),
  },
  { role: "Filmed on location", names: [personalInfo.location] },
  {
    role: "Find the director",
    names: socialLinks
      .filter((s) => s.iconName !== "mail")
      .map((s) => `${s.platform}: ${s.url.replace(/^https?:\/\/(www\.)?/, "")}`),
  },
];

function CreditsList({ hidden }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden}
      className={`flex flex-col items-center gap-10 px-6 pb-16 pt-[22rem] text-center motion-reduce:pt-8 ${
        hidden ? "motion-reduce:hidden" : ""
      }`}
    >
      {GROUPS.map((g) => (
        <div key={g.role} className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent-fg">
            {g.role}
          </span>
          {g.names.map((n) => (
            <span key={n} className="text-lg font-light text-fg sm:text-xl">
              {n}
            </span>
          ))}
        </div>
      ))}

      <div className="flex flex-col items-center gap-2 pt-6">
        <span className="text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
          Thank you for watching.
        </span>
        <span className="text-xs font-mono text-muted">
          © {personalInfo.name}
        </span>
      </div>
    </div>
  );
}

export default function EndCredits() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-accent-fg">
          <Film className="h-3.5 w-3.5" />
          End credits
        </span>
        <span className="hidden text-[11px] font-mono text-muted sm:inline">
          Hover to pause
        </span>
      </div>

      <div
        ref={ref}
        className="credits-wrap relative h-[22rem] overflow-hidden rounded-2xl border border-line-soft bg-sunken/60 motion-reduce:overflow-y-auto"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
        }}
      >
        <div className={`credits-roll ${inView ? "" : "credits-paused"}`}>
          <CreditsList />
          <CreditsList hidden />
        </div>
      </div>
    </div>
  );
}