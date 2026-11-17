// Number Ticker from Blank by Craftwork
// Copyright (c) 2026 Craftwork. Craftwork License, use in your projects, no resale: https://craftwork.design/license#components
// Source: https://github.com/craftwork-design/blank-new (f6d6614), via craftwork.design

// Adapted from Magic UI (MIT, © Magic UI) — https://magicui.design/docs/components/number-ticker
"use client";

import * as React from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Counts from `startValue` to `value` on a spring when it scrolls into view.
 * Digits are tabular, so the width holds while it counts. With reduced
 * motion it shows `value` at once.
 */
function NumberTicker({
  value,
  startValue = 0,
  delay = 0,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & { value: number; startValue?: number; delay?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(startValue);
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const inView = useInView(ref, { once: true, margin: "0px" });

  React.useEffect(() => {
    if (reduceMotion) {
      if (ref.current) ref.current.textContent = String(value);
      return;
    }
    if (!inView) return;
    const timer = setTimeout(() => motionValue.set(value), delay * 1000);
    return () => clearTimeout(timer);
  }, [reduceMotion, inView, delay, value, motionValue]);

  // Writes straight to the DOM: a re-render per spring frame is wasted work.
  React.useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) ref.current.textContent = String(Math.round(latest));
      }),
    [spring]
  );

  return (
    <span ref={ref} data-slot="number-ticker" className={cn("inline-block tabular-nums", className)} {...props}>
      {startValue}
    </span>
  );
}

export { NumberTicker };
