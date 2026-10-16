"use client";

import { useEffect, useRef } from "react";
import { partners } from "@/lib/content";

/* Hero band + blue dotted play mark, matching the contact page hero.
   The mark's translate is nudged so its dots land on the field's 8px
   lattice — blue dots are 4px vs grey centres at +4px, so centres align,
   not box edges. Never more than one tile of shift. */
export function PartnersHero() {
  const bandRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const logo = logoRef.current;
    const row = rowRef.current;
    if (!band || !logo || !row) return;

    const mod = (n: number) => ((n % 8) + 8) % 8;
    const snap = () => {
      const bandBox = band.getBoundingClientRect();
      const logoBox = logo.getBoundingClientRect();
      logo.style.translate = `${-mod(logoBox.left - bandBox.left - 2)}px ${-mod(logoBox.top - bandBox.top - 2)}px`;
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
    <section className="relative min-h-[120px] overflow-hidden pt-3">
      <div
        ref={bandRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[20px] top-[27px]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d9dce3 1.2px, transparent 1.6px)",
          backgroundSize: "8px 8px",
        }}
      />

      <div ref={rowRef} className="relative flex items-center py-1.5">
        <h1 className="bg-white pl-2 pr-4 text-[clamp(2.5rem,8vw,4.6rem)] font-bold uppercase leading-none tracking-[-0.03em]">
          {partners.title}
        </h1>
        <div
          ref={logoRef}
          aria-hidden="true"
          className="grid shrink-0 grid-cols-[repeat(4,4px)] gap-[4px] self-center"
        >
          {Array.from({ length: 28 }).map((_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const blue = row >= col && row <= 6 - col;
            return (
              <span
                key={i}
                className={`h-1 w-1 rounded-full ${blue ? "bg-primary" : ""}`}
              />
            );
          })}
        </div>
      </div>

      <p className="relative mb-3.5 ml-auto mt-7 max-w-[235px] bg-white px-2.5 py-1.5 text-right text-[0.8rem] leading-[1.35] text-[#1a1a1a] max-sm:mt-5 max-sm:max-w-none">
        {partners.lede}
      </p>
    </section>
  );
}
