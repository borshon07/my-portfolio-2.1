import type React from "react";
import { scrollToSection } from "@/utils/scrollToSection";

export const PENDING_KEY = "pending-section";

/* Home e thakle smooth scroll.
   Onno page e (jemon /projects/...) thakle section er naam mone rekhe home e jay,
   tarpor Navbar oi section e scroll kore. */
export function goToSection(
  e: React.MouseEvent<HTMLElement>,
  href: string,
  isHome: boolean,
  push: (url: string) => void
) {
  if (isHome) {
    scrollToSection(e, href);
    return;
  }

  e.preventDefault();
  try {
    sessionStorage.setItem(PENDING_KEY, href.slice(1));
  } catch {
    /* storage blocked, tahole shudhu home e jabe */
  }
  push("/");
}