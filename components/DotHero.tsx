import DotField from "@/components/ui/DotField";

/* The dot-field hero shared by Contact, Partners, About and the service
   pages. Geometry is locked so switching pages feels consistent: the dot
   field (DotField) runs behind the copy, and the title and lede each carry
   an inline white backing with a feathered shadow so the text dissolves
   into the field. The backing sits on spans, so it hugs the words instead
   of stretching over the full column. Only the title and lede text vary
   between pages. */

export default function DotHero({ title, lede }: { title: string; lede: string }) {
  return (
    <section className="relative flex min-h-[160px] flex-col overflow-hidden pt-2 sm:min-h-[190px] lg:min-h-[210px]">
      <DotField className="bottom-[12px] top-[22px]" />

      <h1 className="relative z-10 py-1 font-display text-[clamp(2.75rem,5.5vw,5.5rem)] font-bold uppercase leading-none tracking-[-0.03em] text-black">
        {/* backing lives on the span so it hugs the words, not the column */}
        <span className="bg-white px-2 shadow-[0_0_30px_20px_#fff] [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
          {title}
        </span>
      </h1>

      {/* Supporting copy - pinned to bottom right across all sub-pages */}
      <div className="relative z-10 mt-auto flex justify-end pb-2">
        <p className="max-w-[420px] text-right text-[14px] font-normal leading-[1.3] text-[#111111] sm:text-[16px] md:text-[18px] lg:text-[20px]">
          <span className="bg-white px-2 py-1 shadow-[0_0_24px_16px_#fff] [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
            {lede}
          </span>
        </p>
      </div>
    </section>
  );
}
