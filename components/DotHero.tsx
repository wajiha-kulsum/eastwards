import DotField from "@/components/ui/DotField";

/* The dot-field hero shared by Contact, Partners, About and the service
   pages. Geometry is locked so switching pages feels consistent: the dot
   field (DotField) runs behind the copy, and the title and lede each sit on
   a blurred white layer painted underneath the text, so the copy dissolves
   into the field without any wash over the glyphs. Only the title and lede
   text vary between pages. */

export default function DotHero({ title, lede }: { title: string; lede: string }) {
  return (
    <section className="relative flex min-h-[160px] flex-col overflow-hidden pt-2 sm:min-h-[190px] lg:min-h-[210px]">
      <DotField className="bottom-[12px] top-[22px]" />

      <h1 className="relative z-10 w-fit py-1 font-display text-[clamp(2.75rem,5.5vw,5.5rem)] font-bold uppercase leading-none tracking-[-0.03em] text-black">
        {/* white blur layer sits under the words; the text paints above it,
            so the wash can never overlap the glyphs */}
        <span
          aria-hidden="true"
          className="absolute -inset-x-2 -inset-y-1 rounded-[24px] bg-white blur-[14px]"
        />
        <span className="relative">{title}</span>
      </h1>

      {/* Supporting copy - pinned to bottom right across all sub-pages */}
      <div className="relative z-10 mt-auto flex justify-end pb-2">
        <p className="relative max-w-[420px] text-right text-[14px] font-normal leading-[1.3] text-[#111111] sm:text-[16px] md:text-[18px] lg:text-[20px]">
          <span
            aria-hidden="true"
            className="absolute -inset-x-3 -inset-y-1 rounded-[20px] bg-white blur-[12px]"
          />
          <span className="relative">{lede}</span>
        </p>
      </div>
    </section>
  );
}
