"use client";

import { useEffect, useRef } from "react";

/* The dot-field hero shared by Contact, Partners, and About.
   Geometry, dot matrix grid, spacing, and typography are 100% locked
   so switching between pages feels completely consistent: only the
   title and lede text vary. */

const DOT_PITCH = 10; // 10px grid pitch matching the Paper design (5px dot + 5px gap)

export default function DotHero({ title, lede }: { title: string; lede: string }) {
  const bandRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const logo = logoRef.current;
    const row = rowRef.current;
    if (!band || !logo || !row) return;

    const mod = (n: number) => ((n % DOT_PITCH) + DOT_PITCH) % DOT_PITCH;
    const snap = () => {
      const bandBox = band.getBoundingClientRect();
      const logoBox = logo.getBoundingClientRect();
      logo.style.translate = `${-mod(logoBox.left - bandBox.left)}px ${-mod(logoBox.top - bandBox.top)}px`;
    };

    snap();
    const watch = new ResizeObserver(snap);
    watch.observe(band);
    watch.observe(row);
    window.addEventListener("resize", snap);
    return () => {
      watch.disconnect();
      window.removeEventListener("resize", snap);
    };
  }, []);

  return (
    <section className="relative flex h-[220px] flex-col justify-between overflow-hidden pt-3 sm:h-[190px] lg:h-[210px]">
      {/* Background dot matrix field - 10px pitch with 5px light grey dots */}
      <div
        ref={bandRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[14px] top-[26px]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d9dce3 1.6px, transparent 1.9px)",
          backgroundSize: `${DOT_PITCH}px ${DOT_PITCH}px`,
        }}
      />

      {/* Title + Blue Dot Matrix Icon */}
      <div ref={rowRef} className="relative z-10 flex items-center py-1">
        <h1 className="bg-white pr-4 font-display text-[clamp(2.75rem,5.5vw,5.5rem)] font-bold uppercase leading-none tracking-[-0.03em] text-black">
          {title}
        </h1>

        {/* Play-triangle dot matrix icon: 4 columns x 7 rows on a 10px pitch */}
        <div
          ref={logoRef}
          aria-hidden="true"
          className="grid shrink-0 grid-cols-[repeat(4,5px)] gap-[5px] self-center"
        >
          {Array.from({ length: 28 }).map((_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const blue = row >= col && row <= 6 - col;
            return (
              <span
                key={i}
                className={`h-[5px] w-[5px] rounded-full transition-colors ${
                  blue ? "bg-[#2868ff]" : "bg-[#d9dce3]"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Supporting copy - pinned to bottom right across all sub-pages */}
      <div className="relative z-10 mt-auto flex justify-end pb-2">
        <p className="max-w-[420px] bg-white pl-4 pt-1 text-right text-[14px] font-normal leading-[1.3] text-[#111111] sm:text-[16px] md:text-[18px] lg:text-[20px]">
          {lede}
        </p>
      </div>
    </section>
  );
}
