"use client";

import { useEffect, useRef, type Ref } from "react";
import DotField from "@/components/ui/DotField";
import TextBlur from "@/components/ui/TextBlur";

/* The dot-field hero shared by Contact, Partners, About and the service
   pages. Geometry is locked so switching pages feels consistent: the dot
   field (DotField) runs behind the copy, every text block wears the shared
   TextBlur chip, and the 4x7 logo triangle flows inline right after the
   title text (hugging it with no empty lane) before the snap shifts it a
   few pixels onto the field's 10px lattice. Only the title and lede text
   vary between pages. */

const DOT_PITCH = 10; // 5px dot + 5px gap, same as DotField

/* Blue play-triangle on the logo's 4x7 grid. The cells are 10px tiles, the
   exact geometry of the field, and a blue cell paints the same dot recipe
   the field uses (1.6px dot at the tile center) in blue. Snapped onto the
   field's lattice, each blue dot sits precisely on an existing field dot:
   the older dot turns blue, nothing new is added. Empty cells draw nothing,
   so the field's grey dots continue through the gaps. */
function DotMark({ markRef }: { markRef: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={markRef}
      aria-hidden="true"
      className="pointer-events-none relative inline-grid shrink-0 align-middle ml-[4px] grid grid-cols-[repeat(4,10px)] grid-rows-[repeat(7,10px)]"
    >
      {Array.from({ length: 28 }).map((_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const blue = row >= col && row <= 6 - col;
        return (
          <span
            key={i}
            className={
              blue
                ? "bg-[radial-gradient(circle,#2868ff_1.6px,transparent_1.9px)]"
                : ""
            }
          />
        );
      })}
    </div>
  );
}

export default function DotHero({ title, lede }: { title: string; lede: string }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const mark = markRef.current;
    const chip = chipRef.current;
    if (!field || !mark || !chip) return;

    // Both grids are 10px lattices with the dot at the tile center, so the
    // mark only needs shifting by the negative remainder of its offset
    // against the field: every blue dot then lands exactly on a field dot.
    // Translate is zeroed before measuring so it never feeds back in, and
    // whole-pitch shifts pull the mark back left so it never drifts off the
    // title text: measured on the chip's widest wrapped line.
    const mod = (n: number) => ((n % DOT_PITCH) + DOT_PITCH) % DOT_PITCH;
    let chipRight = NaN;
    const snap = () => {
      mark.style.translate = "0px 0px";
      const fieldBox = field.getBoundingClientRect();
      const markBox = mark.getBoundingClientRect();
      let dx = mod(fieldBox.left - markBox.left);
      for (const rect of chip.getClientRects()) {
        if (rect.right > chipRight) chipRight = rect.right;
      }
      if (!Number.isNaN(chipRight)) {
        const gap = markBox.left + dx - chipRight;
        const pitches = Math.ceil((gap - 12) / DOT_PITCH);
        if (pitches > 0) dx -= pitches * DOT_PITCH;
      }
      mark.style.translate = `${dx}px 0px`;
    };

    snap();
    const watch = new ResizeObserver(snap);
    watch.observe(field);
    window.addEventListener("resize", snap);
    return () => {
      watch.disconnect();
      window.removeEventListener("resize", snap);
    };
  }, []);

  return (
    <section className="relative flex min-h-[160px] flex-col overflow-hidden pt-2 sm:min-h-[190px] lg:min-h-[210px]">
      <DotField className="bottom-[12px] top-[22px]" fieldRef={fieldRef} />

      <div className="relative z-10 py-1">
        <h1 className="font-display text-[clamp(2.75rem,5.5vw,5.5rem)] font-bold uppercase leading-none tracking-[-0.03em] text-black">
          <TextBlur spanRef={chipRef}>{title}</TextBlur>
          <DotMark markRef={markRef} />
        </h1>
      </div>

      {/* Supporting copy - pinned to bottom right across all sub-pages */}
      <div className="relative z-10 mt-auto flex justify-end pb-2">
        <p className="max-w-[420px] text-right text-[14px] font-normal leading-[1.3] text-[#111111] sm:text-[16px] md:text-[18px] lg:text-[20px]">
          <TextBlur>{lede}</TextBlur>
        </p>
      </div>
    </section>
  );
}
