import { contact } from "@/lib/content";

/* Design dot field: 5px dots on a 10px pitch, thinning out towards the right. */
const DOT_FIELD =
  "bg-[radial-gradient(circle,#d9d9d9_2.5px,transparent_3px)] [background-size:10px_10px] [mask-image:linear-gradient(to_right,#000_55%,transparent_95%)]";

/* Hero accent, straight from the design: 12 × 8 dots on a 10px pitch. The
   first column is solid blue, the second is blue through its middle four
   rows, and the bottom four cells of the last column are left empty. */
function ContactDotGrid() {
  return (
    <div
      aria-hidden="true"
      className="hidden shrink-0 grid-cols-[repeat(12,5px)] gap-[5px] self-center sm:grid"
    >
      {Array.from({ length: 96 }).map((_, i) => {
        const col = i % 12;
        const row = Math.floor(i / 12);
        const blue = col === 0 || (col === 1 && row >= 1 && row <= 4);

        return (
          <span
            key={i}
            className={`h-[5px] w-[5px] rounded-full ${
              col === 11 && row >= 4
                ? ""
                : blue
                  ? "bg-[#236FFB]"
                  : "bg-[#D9D9D9]"
            }`}
          />
        );
      })}
    </div>
  );
}

export function ContactHero() {
  return (
    <section className="relative mx-auto max-w-[1720px] px-4 pt-10 sm:px-[25px] lg:pt-14">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        {/* Title + dot matrix graphic, with the field running on to its right */}
        <div className="flex min-w-0 flex-1 items-center gap-[14px]">
          <h1 className="text-[48px] font-bold leading-[1.05] tracking-tight text-black sm:text-[60px] md:text-[72px] lg:text-[96px] lg:leading-[116px]">
            {contact.title}
          </h1>
          <ContactDotGrid />
          <span
            aria-hidden="true"
            className={`hidden h-20 min-w-0 flex-1 self-center md:block ${DOT_FIELD}`}
          />
        </div>

        {/* Right-aligned subtitle note */}
        <p className="max-w-[415px] text-[15px] leading-[1.4] text-black sm:text-[17px] md:text-right">
          {contact.subtitle}
        </p>
      </div>

      {/* Second dot band, tucked under the headline row */}
      <span
        aria-hidden="true"
        className={`mt-11 hidden h-[70px] w-full md:block ${DOT_FIELD}`}
      />
    </section>
  );
}
