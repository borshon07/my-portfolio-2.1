import type React from "react";

export function scrollToSection(
  e: React.MouseEvent<HTMLElement>,
  href: string
) {
  if (!href.startsWith("#")) return;

  const el = document.getElementById(href.slice(1));
  if (!el) return;

  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });

  // URL theke # muche dao, kintu Next.js er history state ta rekhe
  history.replaceState(
    history.state,
    "",
    window.location.pathname + window.location.search
  );
}