"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/* Eased wheel scrolling for the About page only (the client asked for a
   smoother feel on this long page). Native scrolling stays underneath, so
   the pinned capability walkthrough and the sticky header work as before.
   Skipped entirely when the visitor prefers reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.12 });
    return () => lenis.destroy();
  }, []);
  return null;
}
