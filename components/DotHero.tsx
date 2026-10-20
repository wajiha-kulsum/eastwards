"use client";

import { useEffect, useRef, type Ref } from "react";
import DotField from "@/components/ui/DotField";
import TextBlur from "@/components/ui/TextBlur";

/* The dot-field hero shared by Contact, Partners, About and the service
   pages. Geometry is locked so switching pages feels consistent: the dot
   field (DotField) runs behind the copy, every text block wears the shared
   TextBlur chip, and the 4x8 logo triangle sits at the end of the title,
   snapped onto the field's 10px pitch so it reads as part of layer 1.
   Only the title and lede text vary between pages. */

/* The logo's play triangle on a 4x8 grid: rows 1-2-3-4-4-3-2-1 dots wide. */
const isBlue = (col: number, row: number) => row >= col && row <= 7 - col;

/* The triangle's cells are 10px tiles, the exact geometry of the field, and
   a blue cell paints the field's dot recipe (1.6px dot at the tile center)
   in blue. The field is clipped out under every blue cell (see snap), so
   each blue dot takes the place of a grey one instead of sitting on it.
   Empty cells draw nothing and the field's greys continue through them. It
   stays opacity-0 until the first snap so it never paints off-lattice. */
function DotMark({ markRef }: { markRef: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={markRef}
      aria-hidden="true"
      className="pointer-events-none relative grid shrink-0 grid-cols-[repeat(4,10px)] grid-rows-[repeat(8,10px)] opacity-0"
    >
      {Array.from({ length: 32 }).map((_, i) => (
        <span
          key={i}
          className={
            isBlue(i % 4, Math.floor(i / 4))
              ? "bg-[radial-gradient(circle,#2868ff_1.6px,transparent_1.9px)]"
              : ""
          }
        />
      ))}
    </div>
  );
}

export default function DotHero({ title, lede }: { title: string; lede: string }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const ledeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const mark = markRef.current;
    const row = rowRef.current;
    const h1 = h1Ref.current;
    const ledeEl = ledeRef.current;
    if (!field || !mark || !row || !h1 || !ledeEl) return;

    // Both grids are 10px lattices with the dot at the tile center. The
    // triangle starts at the first field tile clear of the title chip, row 0
    // on the field's first row. It moves by left/top offsets, not translate:
    // a transform shifts the dots after the browser snaps them to pixels,
    // leaving a grey sliver beside every blue dot. The field is then clipped
    // (evenodd path) so it paints nothing left of the triangle on the
    // title's rows and nothing under the blue cells: the blue dots replace
    // those grey ones. Offsets are zeroed before measuring so they never
    // feed back in.
    const snap = () => {
      mark.style.left = mark.style.top = "0px";
      const fieldBox = field.getBoundingClientRect();
      const markBox = mark.getBoundingClientRect();
      const chipBox = (h1.firstElementChild ?? h1).getBoundingClientRect();
      const left = 10 * Math.ceil((chipBox.right - fieldBox.left) / 10);
      // The title owns every row its chip reaches (a dot starts 3.1px into its
      // tile), and at least the triangle's eight.
      const rows = Math.max(8, Math.ceil((chipBox.bottom - fieldBox.top - 3.1) / 10));
      mark.style.left = `${fieldBox.left + left - markBox.left}px`;
      mark.style.top = `${fieldBox.top - markBox.top}px`;
      // A dot spans 3.1-6.9px of its 10px tile. The field keeps only dots
      // that fit whole inside it, so its right and bottom edges never cut one.
      const width = 10 * Math.floor((fieldBox.width + 3.1) / 10);
      const height = 10 * Math.floor((fieldBox.height + 3.1) / 10);
      let path = `M0 0H${width}V${height}H0ZM0 0H${left}V${rows * 10}H0Z`;
      for (let i = 0; i < 32; i++) {
        if (isBlue(i % 4, Math.floor(i / 4))) {
          path += `M${left + (i % 4) * 10} ${Math.floor(i / 4) * 10}h10v10h-10Z`;
        }
      }
      // The lede's chips would slice the dots along their edges, so every
      // dot they touch goes whole: one room for all its lines, kept below the
      // title's rows because overlapping evenodd holes would cancel out.
      const ledeBox = (ledeEl.firstElementChild ?? ledeEl).getBoundingClientRect();
      const x0 = 10 * Math.floor((ledeBox.left - fieldBox.left + 3.1) / 10);
      const x1 = Math.min(width, 10 * Math.ceil((ledeBox.right - fieldBox.left - 3.1) / 10));
      const y0 = Math.max(rows * 10, 10 * Math.floor((ledeBox.top - fieldBox.top + 3.1) / 10));
      const y1 = Math.min(height, 10 * Math.ceil((ledeBox.bottom - fieldBox.top - 3.1) / 10));
      if (x1 > x0 && y1 > y0) path += `M${x0} ${y0}H${x1}V${y1}H${x0}Z`;
      field.style.clipPath = `path(evenodd, "${path}")`;
      // Same task as the offset and clip writes: the first paint with the
      // mark visible already has the grey under it gone.
      mark.style.opacity = "1";
    };

    snap();
    const watch = new ResizeObserver(snap);
    watch.observe(field);
    // A title font swap reflows the mark horizontally without resizing the
    // field or the row.
    watch.observe(h1);
    watch.observe(row);
    watch.observe(ledeEl);
    window.addEventListener("resize", snap);
    return () => {
      watch.disconnect();
      window.removeEventListener("resize", snap);
    };
  }, []);

  return (
    <section className="relative flex min-h-[160px] flex-col overflow-hidden pt-2 sm:min-h-[190px] lg:min-h-[210px]">
      <DotField className="bottom-[12px] top-[22px]" fieldRef={fieldRef} />

      {/* pb-2.5: pinning the triangle to the field's first row moves it up to
          10px below where the row lays it out, so the row reserves those 10px
          and the lede can never ride up into it on a short hero. */}
      <div ref={rowRef} className="relative z-10 flex items-center gap-3 pt-1 pb-2.5">
        <h1
          ref={h1Ref}
          className="min-w-0 font-display text-[clamp(2.75rem,5.5vw,5.5rem)] font-bold uppercase leading-none tracking-[-0.03em] text-black"
        >
          <TextBlur>{title}</TextBlur>
        </h1>
        <DotMark markRef={markRef} />
      </div>

      {/* Supporting copy - pinned to bottom right across all sub-pages */}
      <div className="relative z-10 mt-auto flex justify-end pb-2">
        <p ref={ledeRef} className="max-w-[420px] text-right text-[14px] font-normal leading-[1.3] text-[#111111] sm:text-[16px] md:text-[18px] lg:text-[20px]">
          <TextBlur>{lede}</TextBlur>
        </p>
      </div>
    </section>
  );
}
