import { contact } from "@/lib/content";

function ContactDotGrid() {
  return (
    <div
      aria-hidden="true"
      className="hidden grid-cols-4 gap-1.5 self-center sm:grid"
    >
      {Array.from({ length: 32 }).map((_, i) => {
        const col = i % 4;
        const isBlue = col === 0 || (col === 1 && (i % 8 < 4));
        return (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${
              isBlue ? "bg-primary" : "bg-[#D1D5DB]"
            }`}
          />
        );
      })}
    </div>
  );
}

export function ContactHero() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-4 pt-10 sm:px-8 md:px-[17px] lg:pt-14">
      {/* Subtle background dot matrix texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-0 -z-10 h-64 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-70"
      />

      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        {/* Title + Dot Matrix Graphic */}
        <div className="flex items-center gap-4">
          <h1 className="font-display text-5xl font-bold tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[96px] lg:leading-[116px]">
            {contact.title}
          </h1>
          <ContactDotGrid />
        </div>

        {/* Right-aligned subtitle note */}
        <p className="max-w-[415px] text-[15px] font-normal leading-6 text-black sm:text-[17px] md:text-right lg:text-[20px]">
          {contact.subtitle}
        </p>
      </div>
    </section>
  );
}
