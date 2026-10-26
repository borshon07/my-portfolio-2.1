"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Onno page (jemon /projects/...) theke "/#about" e ele
   page load hoye gele oi section e scroll kore, tarpor URL theke # muche dey. */
export default function HashScroller() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const id = window.location.hash.slice(1);
    if (!id) return;

    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      const el = document.getElementById(id);

      if (el) {
        clearInterval(timer);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(
          history.state,
          "",
          window.location.pathname + window.location.search
        );
      } else if (tries > 30) {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [pathname]);

  return null;
}