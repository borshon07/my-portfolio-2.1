"use client";

import React, { useState } from "react";
import {
  Atom,
  Braces,
  Brain,
  Code,
  Database,
  GitBranch,
  Layers,
  Network,
  Plug,
  Puzzle,
  Rocket,
  Server,
  ShieldCheck,
  Smartphone,
  Wind,
  Webhook,
  type LucideIcon,
} from "lucide-react";

/* =====================================================================
   Logo ashe cdn.simpleicons.org theke.
   slugs: ekta na ele porer ta try kore, shob fail hole lucide icon dekhay.
   color: tile er glow ar border er jonno.
   mono: kalo logo, dark mode e shada hoye jay.
   iconColor: CDN er default rong beshi aandhar hole nijer rong
   ===================================================================== */
export type Brand = {
  match: RegExp;
  slugs: string[];
  color: string;
  mono?: boolean;
  iconColor?: string;
  fallback: LucideIcon;
};

// Order gurutwopurno: mongoose age mongo, github age git
const BRANDS: Brand[] = [
  { match: /^react$/i, slugs: ["react"], color: "#61DAFB", fallback: Atom },
  { match: /^next\.?js/i, slugs: ["nextdotjs"], color: "var(--fg)", mono: true, fallback: Layers },
  { match: /javascript/i, slugs: ["javascript"], color: "#F7DF1E", fallback: Braces },
  { match: /typescript/i, slugs: ["typescript"], color: "#3178C6", fallback: Braces },
  { match: /tailwind/i, slugs: ["tailwindcss"], color: "#06B6D4", fallback: Wind },
  { match: /^node/i, slugs: ["nodedotjs"], color: "#5FA04E", fallback: Server },
  { match: /^express/i, slugs: ["express"], color: "var(--fg)", mono: true, fallback: Server },
  { match: /better ?auth/i, slugs: [], color: "#10B981", fallback: ShieldCheck },
  { match: /mongoose/i, slugs: ["mongoose"], color: "#D64545", iconColor: "D64545", fallback: Database },
  { match: /mongodb/i, slugs: ["mongodb"], color: "#47A248", fallback: Database },
  { match: /github/i, slugs: ["github"], color: "var(--fg)", mono: true, fallback: GitBranch },
  { match: /^git$/i, slugs: ["git"], color: "#F05032", fallback: GitBranch },

  // Concept skill: brand logo nai, tai rongin icon
  { match: /responsive/i, slugs: [], color: "#22D3EE", fallback: Smartphone },
  { match: /rest api/i, slugs: [], color: "#F97316", fallback: Webhook },
  { match: /api design/i, slugs: [], color: "#A855F7", fallback: Plug },
  { match: /database design/i, slugs: [], color: "#14B8A6", fallback: Database },
  { match: /client-server/i, slugs: [], color: "#6366F1", fallback: Network },
  { match: /full-stack/i, slugs: [], color: "#EC4899", fallback: Layers },
  { match: /ai mindset/i, slugs: [], color: "#8B5CF6", fallback: Brain },
  { match: /product/i, slugs: [], color: "#F43F5E", fallback: Rocket },
  { match: /problem/i, slugs: [], color: "#EAB308", fallback: Puzzle },
];

const DEFAULT_BRAND: Brand = {
  match: /./,
  slugs: [],
  color: "var(--accent)",
  fallback: Code,
};

export const brandFor = (name: string): Brand =>
  BRANDS.find((b) => b.match.test(name)) ?? DEFAULT_BRAND;

/* Tile er background ar border (brand er rong theke) */
export function brandSurface(brand: Brand): React.CSSProperties {
  return {
    "--brand": brand.color,
    background:
      "linear-gradient(145deg, color-mix(in srgb, var(--brand) 22%, var(--surface)), var(--surface-3))",
    borderColor: "color-mix(in srgb, var(--brand) 45%, var(--line))",
  } as React.CSSProperties;
}

/* Logo (CDN fail korle lucide fallback) */
export function BrandIcon({
  brand,
  className = "h-6 w-6",
}: {
  brand: Brand;
  className?: string;
}) {
  const [attempt, setAttempt] = useState(0);
  const slug = brand.slugs[attempt];
  const Fallback = brand.fallback;

  if (!slug) {
    return <Fallback className={className} style={{ color: brand.color }} />;
  }

  const src = `https://cdn.simpleicons.org/${slug}${
    brand.iconColor ? `/${brand.iconColor}` : ""
  }`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={slug}
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setAttempt((a) => a + 1)}
      className={`${className} select-none ${brand.mono ? "dark:invert" : ""}`}
    />
  );
}