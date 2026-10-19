"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight } from "@/components/ui/icons";
import { features } from "@/lib/content";

const CARD_W = 300;
const GAP = 14;
const DOTS = 9;
const START_FRACTION = 0.465; // first card aligns to the copy-column line
const DRIFT_DELAY_MS = 2500; // auto-scroll starts after a short pause

function DotMatrix() {
  /* radial-gradient dot grid strip, exactly like the reference format */
  return (
    <i
      aria-hidden="true"
      className="hidden h-11 w-3 shrink-0 sm:block sm:bg-[radial-gradient(circle,#d4d4d4_1px,transparent_1.2px)] sm:[background-size:5px_5px]"
    />
  );
}

function CardCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const drift = useMotionValue(0);
  const [metrics, setMetrics] = useState({ start: 0, travel: 0 });
  const [active, setActive] = useState(2);
  const { scrollYProgress: progress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });

  const cards = features.services;
  const setWidth = cards.length * (CARD_W + GAP);

  // re-measure on resize: start anchor + how far one full set must travel
  useEffect(() => {
    let throttle = false;
    const measure = () => {
      if (throttle) return;
      throttle = true;
      setTimeout(() => {
        throttle = false;
        setMetrics({
          start: window.innerWidth * START_FRACTION,
          travel: setWidth,
        });
      }, 150);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [setWidth]);

  // gentle auto-drift right-to-left, beginning after the delay. Runs only
  // while the carousel is on screen — RGlobal rAF loops keep the smooth
  // scroll from ever resting.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const startedAt = performance.now();
    let last = 0;
    let raf = 0;
    let inView = true;

    const tick = (t: number) => {
      const dt = last ? Math.min(t - last, 50) : 16;
      last = t;
      if (inView && !paused.current && t - startedAt > DRIFT_DELAY_MS) {
        drift.set(drift.get() - (0.5 * dt) / 16.67);
      }
      raf = inView ? requestAnimationFrame(tick) : 0;
    };
    raf = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      last = 0;
      if (inView && raf === 0) raf = requestAnimationFrame(tick);
    });
    if (wrapRef.current) observer.observe(wrapRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [drift]);

  // One repeated set starts at the copy-column anchor; earlier cards fill left.
  // Wrap into one set width so all four copies keep covering the strip.
  const x = useTransform([progress, drift], ([p, d]: number[]) => {
    if (typeof window === "undefined") return -metrics.start;
    const raw = metrics.start - p * metrics.travel - d;
    const m = raw % setWidth;
    return m > 0 ? m - setWidth : m;
  });

  useMotionValueEvent(progress, "change", (p) => {
    const idx = Math.min(DOTS - 1, Math.floor(p * DOTS));
    setActive(idx);
  });

  return (
    <div>
      {/* dots left-aligned with the copy column, directly above the cards */}
      <div
        className="mb-5 flex gap-[5px] pl-6 sm:pl-[46.5%]"
        aria-hidden="true"
      >
        {Array.from({ length: DOTS }, (_, i) => (
          <i
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === active ? "bg-ink" : "bg-line-strong"
            }`}
          />
        ))}
      </div>

      {/* full-bleed scroll-driven track, first card anchored mid-screen */}
      <div ref={wrapRef} className="overflow-hidden pb-2">
        <motion.div
          ref={trackRef}
          style={{ x, gap: GAP }}
          className="flex will-change-transform"
        >
          {[...cards, ...cards, ...cards, ...cards].map((service, i) => (
            <a
              key={i}
              href="#"
              draggable={false}
              tabIndex={i >= cards.length ? -1 : undefined}
              className="shrink-0 rounded-[26px] border border-line bg-surface p-[6px] transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{ width: CARD_W }}
            >
              <div className="relative h-[192px] overflow-hidden rounded-[20px] bg-slate-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="300px"
                  draggable={false}
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-3 px-3 py-[14px] text-[19px] font-semibold text-statement">
                {service.title}
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section
      className="mx-auto mt-14 max-w-[1720px] px-6 sm:px-10 md:mt-16 lg:px-[5.35%]"
    >
      <div className="grid gap-8 md:grid-cols-[46.5%_1fr]">
        <h2 className="text-2xl font-semibold leading-8 tracking-tight text-ink sm:text-[28px]">
          For crafting truly
          <span className="block text-[22px] font-bold text-primary sm:text-[25px]">
            prominent IT solutions
          </span>
        </h2>

        <div>
          <SectionLabel className="text-[15px] sm:text-[16px]">{features.label}</SectionLabel>
          <div className="relative mt-2 flex max-w-[500px] gap-4">
            <DotMatrix />
            <p className="text-[15px] font-medium leading-[1.4] text-statement sm:text-[17px]">
              {features.body}
            </p>
          </div>
          <PrimaryButton
            href="#"
            className="mt-5 h-10 gap-2 px-7 text-[14px]"
          >
            {features.cta}
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path d="M3 6l5 5 5-5" />
            </svg>
          </PrimaryButton>
        </div>
      </div>

      {/* full-bleed scroll-driven carousel — escapes the container padding */}
      <div className="relative left-1/2 mt-9 w-screen -translate-x-1/2">
        <CardCarousel />
      </div>
    </section>
  );
}
