"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/* Inertial smooth scrolling, wheel input glides instead of stepping.
   Also pins every load to the top: browser scroll restoration is switched
   off so refreshing or coming back never lands mid-page.
   Skipped entirely for users who prefer reduced motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // The browser replays the previous scroll offset on reload/back AFTER
    // our reset runs - taking over restores every visit to the top.
    history.scrollRestoration = "manual";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // anchors: true routes hash links (#main, #solutions) through Lenis so
    // native jumps no longer fight its internal scroll target.
    const lenis = new Lenis({ lerp: 0.09, anchors: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis keeps its own scroll target across client-side navigations;
  // sync it to the top or the next page opens mid-scroll and snaps back.
  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return <>{children}</>;
}
