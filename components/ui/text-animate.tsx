// Text Animate from Blank by Craftwork
// Copyright (c) 2026 Craftwork. Craftwork License, use in your projects, no resale: https://craftwork.design/license#components
// Source: https://github.com/craftwork-design/blank-new (f6d6614), via craftwork.design

// Adapted from Magic UI (MIT, © Magic UI) — https://magicui.design/docs/components/text-animate
"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type MotionProps,
  type Target,
  type Variants,
} from "motion/react";

import { cn } from "@/lib/utils";

type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const;

type MotionElementType = keyof typeof motionElements;

const transition = { duration: 0.4, ease: [0.23, 1, 0.32, 1] } as const;
const blur = "blur(6px)";
/** Where every property a preset moves comes to rest. */
const rest = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };

/** A `hidden → show → exit` triple for one segment; `exit` mirrors `hidden` by default. */
function preset(hidden: Target, exit: Target = hidden): Variants {
  const keys = Object.keys(hidden) as (keyof typeof rest)[];
  const show = Object.fromEntries(keys.map((key) => [key, rest[key]]));
  return {
    hidden,
    show: { ...show, transition },
    exit: { ...exit, transition },
  };
}

const presets: Record<AnimationVariant, Variants> = {
  fadeIn: preset({ opacity: 0, y: 8 }),
  blurIn: preset({ opacity: 0, filter: blur }),
  blurInUp: preset({ opacity: 0, filter: blur, y: 8 }),
  blurInDown: preset({ opacity: 0, filter: blur, y: -8 }),
  slideUp: preset({ opacity: 0, y: 12 }, { opacity: 0, y: -12 }),
  slideDown: preset({ opacity: 0, y: -12 }, { opacity: 0, y: 12 }),
  slideLeft: preset({ opacity: 0, x: 12 }, { opacity: 0, x: -12 }),
  slideRight: preset({ opacity: 0, x: -12 }, { opacity: 0, x: 12 }),
  scaleUp: preset({ opacity: 0, scale: 0.9 }),
  scaleDown: preset({ opacity: 0, scale: 1.1 }),
};

/**
 * Reduced motion keeps the same `hidden` state, so server and client markup
 * match, and jumps to `show` without a transition.
 */
function instant(variants: Variants): Variants {
  const show = variants.show;
  return typeof show === "object"
    ? { ...variants, show: { ...show, transition: { duration: 0 } } }
    : variants;
}

function split(text: string, by: AnimationType) {
  switch (by) {
    case "word":
      return text.split(/(\s+)/);
    case "character":
      return Array.from(text);
    case "line":
      return text.split("\n");
    default:
      return [text];
  }
}

/**
 * Reveals a string by text, word, character or line, with one of ten
 * presets. Screen readers get the whole string once; the animated segments
 * are hidden from them. By default it plays when scrolled into view; with
 * reduced motion the text is simply there.
 */
function TextAnimate({
  children,
  as = "p",
  by = "word",
  animation = "fadeIn",
  variants,
  delay = 0,
  duration = 0.3,
  startOnView = true,
  once = false,
  accessible = true,
  id,
  className,
  segmentClassName,
  ...props
}: Omit<MotionProps, "children"> & {
  /** The text to animate. */
  children: string;
  /** The element to render. */
  as?: MotionElementType;
  /** How to split the text into segments. */
  by?: AnimationType;
  /** The preset to use. */
  animation?: AnimationVariant;
  /** Custom `hidden`/`show`/`exit` variants for a segment; wins over `animation`. */
  variants?: Variants;
  /** Seconds before the first segment starts. */
  delay?: number;
  /** Seconds the stagger spreads across all segments. */
  duration?: number;
  /** Wait until the element scrolls into view. */
  startOnView?: boolean;
  /** Animate only the first time it comes into view. */
  once?: boolean;
  /** Give screen readers the full string and hide the segments from them. */
  accessible?: boolean;
  className?: string;
  /** Eastwards: an id for the element, so a section can be labelled by its heading. */
  id?: string;
  /** Classes for every segment. */
  segmentClassName?: string;
}) {
  const reduceMotion = useReducedMotion();
  const Component = motionElements[as];
  const segments = split(children, by);
  const stagger = reduceMotion ? 0 : duration / segments.length;

  const container: Variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: reduceMotion ? 0 : delay,
        staggerChildren: stagger,
      },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: stagger, staggerDirection: -1 },
    },
  };
  const presetVariants = variants ?? presets[animation];
  const item = reduceMotion ? instant(presetVariants) : presetVariants;
  const play = reduceMotion || !startOnView;

  return (
    <Component
      id={id}
      data-slot="text-animate"
      data-by={by}
      initial="hidden"
      animate={play ? "show" : undefined}
      whileInView={play ? undefined : "show"}
      viewport={{ once }}
      exit="exit"
      variants={container}
      className={cn("whitespace-pre-wrap", className)}
      {...props}
    >
      {accessible && <span className="sr-only">{children}</span>}
      {segments.map((segment, i) =>
        // Eastwards: spaces between words stay plain text, so a line never
        // starts with a space held open by an inline-block
        by === "word" && /^\s+$/.test(segment) ? (
          segment
        ) : (
          <motion.span
            key={`${by}-${i}-${segment}`}
            data-slot="text-animate-segment"
            variants={item}
            aria-hidden={accessible || undefined}
            className={cn(
              "inline-block whitespace-pre in-data-[by=line]:block in-data-[by=line]:whitespace-pre-wrap",
              segmentClassName,
            )}
          >
            {segment}
          </motion.span>
        ),
      )}
    </Component>
  );
}

export { TextAnimate };
