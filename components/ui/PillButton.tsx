"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ReactNode } from "react";

type PillButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
};

const variantStyles = {
  primary: "bg-primary text-white hover:brightness-105",
  outline: "border border-primary bg-white text-primary hover:bg-primary/5",
} as const;

/* Pill CTA with the "flow button" effect, tuned subtle:
   slow gradient drift along the border, static soft glow, no movement. */
export function PillButton({
  children,
  href = "#",
  variant = "primary",
  className = "",
}: PillButtonProps) {
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const tween = gsap.to(ring, { rotation: 360, duration: 14, ease: "none", repeat: -1 });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <a
      href={href}
      className={`relative inline-flex h-[52px] items-center overflow-hidden rounded-full p-[1.5px] text-[16px] font-semibold shadow-[0_0_14px_rgba(35,111,251,0.18)] transition-colors duration-200 lg:h-[60px] ${className}`}
    >
      {/* slow gradient drift ring, clipped to the pill shape */}
      <span
        ref={ringRef}
        aria-hidden="true"
        className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,#2868ff_80deg,#b9d1ff_120deg,transparent_170deg,transparent_200deg,#2868ff_280deg,#b9d1ff_320deg,transparent_370deg)]"
      />
      {/* static soft glow */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-primary/30 opacity-50 blur-md"
      />
      <span
        className={`relative z-10 flex h-full w-full items-center gap-3 rounded-full px-7 transition-colors duration-200 lg:px-8 ${variantStyles[variant]}`}
      >
        {children}
      </span>
    </a>
  );
}
