"use client";

import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

/* A statement whose words light up one by one as it scrolls through the
   viewport (the scroll-scrubbed reveal GSAP is known for, built on the
   installed motion library). Two-tone like the site's headings: the lead
   ends in ink, the rest in grey. Reduced motion shows it lit; without
   scripts the noscript style in the framed page lights it. */

function Word({ progress, range, className, children }: { progress: MotionValue<number>; range: [number, number]; className: string; children: string }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={className}>
      {children}
    </motion.span>
  );
}

export function ScrollReveal({ lead, rest, className }: { lead: string; rest?: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = [
    ...lead.split(" ").map((word) => ({ word, tone: "text-ink" })),
    ...(rest ? rest.split(" ").map((word) => ({ word, tone: "text-body" })) : []),
  ];

  return (
    <p ref={ref} data-slot="scroll-reveal" className={className}>
      {words.map(({ word, tone }, i) => (
        <Fragment key={i}>
          {reduce ? (
            <span className={tone}>{word}</span>
          ) : (
            <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} className={tone}>
              {word}
            </Word>
          )}{" "}
        </Fragment>
      ))}
    </p>
  );
}
