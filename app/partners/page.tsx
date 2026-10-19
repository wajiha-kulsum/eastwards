import type { Metadata } from "next";
import DotHero from "@/components/DotHero";
import { ArrowUpRight, PlayTriangle } from "@/components/ui/icons";
import { partners } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partners | Eastwards Consulting",
  description: partners.lede,
};

export default function PartnersPage() {
  return (
    <main id="main" className="bg-white text-black">
      <div className="mx-auto max-w-[1720px] px-6 pb-16 pt-3 sm:px-10 lg:px-[5.35%]">
        <DotHero title={partners.title} lede={partners.lede} />

        {/* Ecosystem intro */}
        <section className="mt-9">
          <p className="max-w-[700px] text-[clamp(17px,3.6vw,26px)] font-medium leading-[1.25] tracking-[-0.03em] text-ink">
            {partners.intro}
          </p>
          <p className="mt-5 max-w-[640px] text-[15px] leading-[1.6] text-[#7a7a7a]">
            {partners.ecosystem}
          </p>
        </section>

        {/* Why partnerships matter, three core advantages */}
        <section className="mt-14 sm:mt-16">
          <h2 className="text-[25px] font-medium leading-tight tracking-[-0.055em] sm:text-[27px]">
            {partners.why.title}
          </h2>
          <p className="mt-1 max-w-[640px] text-[14px] leading-relaxed text-[#7a7a7a] sm:text-[15px]">
            {partners.why.subtitle}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {partners.why.advantages.map((advantage, index) =>
              index === 1 ? (
                /* Blue moment: the middle card echoes the location card */
                <div
                  key={advantage.title}
                  className="flex min-h-[220px] flex-col rounded-[23px] bg-[#4868ff] p-6 text-white sm:p-7"
                >
                  <p className="text-[14px] font-semibold text-white/80">02</p>
                  <h3 className="mb-2 mt-4 text-[18px] font-semibold tracking-[-0.04em]">
                    {advantage.title}
                  </h3>
                  <p className="text-[14px] leading-[1.45] text-white/95">
                    {advantage.body}
                  </p>
                </div>
              ) : (
                <div
                  key={advantage.title}
                  className="min-h-[220px] rounded-[23px] border border-[#e9e9e9] bg-[#fafafa] p-6 sm:p-7"
                >
                  <p className="text-[14px] font-semibold text-[#2869ff]">
                    0{index + 1}
                  </p>
                  <h3 className="mb-2 mt-4 text-[18px] font-semibold tracking-[-0.04em]">
                    {advantage.title}
                  </h3>
                  <p className="text-[14px] leading-[1.45] text-[#7a7a7a]">
                    {advantage.body}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* Join the network, solid blue close */}
        <section className="mt-14 sm:mt-16">
          <div className="rounded-[23px] bg-[#4868ff] p-6 text-white sm:p-8">
            <h2 className="max-w-[640px] text-[25px] font-medium leading-tight tracking-[-0.055em] sm:text-[27px]">
              {partners.join.title}
            </h2>
            <p className="mt-2 max-w-[640px] text-[14px] leading-relaxed text-white/90 sm:text-[15px]">
              {partners.join.subtitle}
            </p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-3 sm:gap-6">
              {partners.join.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-[14px] text-white/95"
                >
                  <PlayTriangle className="mt-1 h-2 w-2 shrink-0 fill-white text-white" />
                  {point}
                </li>
              ))}
            </ul>

            <a
              href={partners.join.href}
              className="mt-7 inline-flex min-h-[36px] items-center gap-2 rounded-full border border-white/70 px-5 py-2 text-[12px] font-semibold text-white transition hover:bg-white/10"
            >
              {partners.join.cta}
              <ArrowUpRight className="h-3 w-3 shrink-0" />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
