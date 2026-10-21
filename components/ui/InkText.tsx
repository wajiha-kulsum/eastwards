"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/* Text-heavy copy starts white and turns to ink the first time it scrolls
   into view; the color animates on this element and everything below
   inherits it, so children carry only size/weight classes, never their own
   color. Reduced-motion users read it black immediately (mirrors Reveal). */
type InkTextProps = {
  children: ReactNode;
  className?: string;
  as?: "p" | "ul" | "div";
};

export function InkText({ children, className, as = "p" }: InkTextProps) {
  const reduce = useReducedMotion();
  const Tag = { p: motion.p, div: motion.div, ul: motion.ul }[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { color: "#FFFFFF" }}
      whileInView={{ color: "#1E1E1E" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </Tag>
  );
}
