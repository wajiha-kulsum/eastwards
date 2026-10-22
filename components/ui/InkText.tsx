"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

/* Token literals matching globals.css --color-ink / --color-page in both
   themes; motion can't read Tailwind color tokens at animation time. */
const INK = { light: "#1E1E1E", dark: "#F2F2F2" } as const;
const PAGE = { light: "#FFFFFF", dark: "#0F0F0F" } as const;

/* Text-heavy copy starts in the page color and turns to ink the first time
   it scrolls into view; the color animates on this element and everything
   below inherits it, so children carry only size/weight classes, never
   their own color. Values track the active theme: a watch on <html>'s
   class re-targets on mid-session toggles (same pattern as Hero).
   Reduced-motion users read it inked immediately (mirrors Reveal). */
type InkTextProps = {
  children: ReactNode;
  className?: string;
  as?: "p" | "ul" | "div";
};

export function InkText({ children, className, as = "p" }: InkTextProps) {
  const reduce = useReducedMotion();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains("dark"));
    sync();
    const watch = new MutationObserver(sync);
    watch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => watch.disconnect();
  }, []);

  const Tag = { p: motion.p, div: motion.div, ul: motion.ul }[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { color: dark ? PAGE.dark : PAGE.light }}
      whileInView={{ color: dark ? INK.dark : INK.light }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </Tag>
  );
}
