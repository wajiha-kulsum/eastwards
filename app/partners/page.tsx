import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { PartnersHero } from "@/components/partners/PartnersHero";
import { Reveal } from "@/components/ui/Reveal";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ArrowUpRight, PlayTriangle } from "@/components/ui/icons";
import { partners } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partners — Eastwards Consulting",
  description: partners.lede,
};

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto max-w-[1440px] px-4 md:px-[17px]">
          <PartnersHero />
        </div>

        {/* Who we build with — intro copy */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-[17px]">
          <Reveal>
            <p className="max-w-[700px] text-[clamp(17px,3.6vw,26px)] font-medium leading-[1.25] tracking-[-0.03em] text-ink">
              {partners.intro}
            </p>
            <p className="mt-5 max-w-[640px] text-[15px] leading-[1.6] text-body">
              {partners.ecosystem}
            </p>
          </Reveal>
        </section>

        {/* Why partnerships matter — three core advantages */}
        <section className="mx-auto mt-16 max-w-[1440px] px-4 md:mt-20 md:px-[17px]">
          <Reveal>
            <h2 className="text-2xl font-semibold leading-8 tracking-tight text-ink">
              {partners.why.title}
            </h2>
            <p className="mt-2 max-w-[640px] text-[14px] leading-[1.5] text-body">
              {partners.why.subtitle}
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {partners.why.advantages.map((advantage, index) => (
              <li
                key={advantage.title}
                className="flex min-h-[200px] flex-col rounded-[24px] bg-surface p-[18px]"
              >
                <p className="text-[13px] font-medium text-primary">
                  0{index + 1}
                </p>
                <h3 className="mt-6 max-w-[220px] text-[14px] font-semibold leading-4 text-ink">
                  {advantage.title}
                </h3>
                <p className="mt-1 max-w-[260px] text-[13px] leading-[1.5] text-body">
                  {advantage.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Join the network */}
        <section className="mx-auto mt-16 max-w-[1440px] px-4 md:mt-20 md:px-[17px]">
          <Reveal>
            <div className="rounded-[24px] bg-surface p-6 md:p-10">
              <h2 className="max-w-[640px] text-[22px] font-semibold leading-[1.3] tracking-[-0.03em] text-ink">
                {partners.join.title}
              </h2>
              <p className="mt-3 max-w-[640px] text-[14px] leading-[1.55] text-body">
                {partners.join.subtitle}
              </p>
              <ul className="mt-6 grid gap-x-8 gap-y-3 md:grid-cols-3">
                {partners.join.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-[13px] font-medium text-statement"
                  >
                    <PlayTriangle className="mt-0.5 h-2 w-2 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
              <PrimaryButton
                href={partners.join.href}
                className="mt-7 h-9 gap-2 px-5 text-[12px]"
              >
                {partners.join.cta}
                <ArrowUpRight className="h-2.5 w-2.5" />
              </PrimaryButton>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
