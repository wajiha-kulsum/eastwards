import type { Metadata } from "next";
import DotHero from "@/components/DotHero";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ArrowUpRight } from "@/components/ui/icons";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us — Eastwards Consulting",
  description: about.lede,
};

export default function AboutPage() {
  return (
    <main id="main" className="bg-white text-black">
      <div className="mx-auto max-w-[1720px] px-6 pb-16 pt-3 sm:px-10 lg:px-[5.35%]">
        <DotHero title={about.title} lede={about.lede} />

        {/* Who we are */}
        <section className="mt-9">
          <p className="max-w-[720px] text-[clamp(17px,3.6vw,26px)] font-medium leading-[1.3] tracking-[-0.03em] text-ink">
            {about.intro}
          </p>

          {/* Promise: three blue-tinted pills + jump to contact */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <p className="text-[13px] font-semibold text-[#4a4a4a]">
              {about.promise.label} —
            </p>
            {about.promise.points.map((point) => (
              <p
                key={point}
                className="rounded-full bg-[#e9efff] px-3.5 py-1.5 text-[12px] font-medium text-[#2869ff]"
              >
                {point}
              </p>
            ))}
            <a
              href={about.promise.cta.href}
              className="text-[12px] font-semibold text-[#2869ff] underline-offset-4 transition hover:underline"
            >
              {about.promise.cta.label}
            </a>
          </div>
        </section>

        {/* Mission + Foundation */}
        <section className="mt-14 sm:mt-16">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {[about.mission, about.foundation].map((block) => (
              <div
                key={block.title}
                className="flex min-h-[220px] flex-col rounded-[23px] border border-[#e9e9e9] bg-[#fafafa] p-6 sm:p-7"
              >
                <h2 className="text-[22px] font-semibold tracking-[-0.04em]">
                  {block.title}
                </h2>
                <p className="mt-2 text-[14px] leading-[1.55] text-[#7a7a7a]">
                  {block.body}
                </p>
                <a
                  href={block.link.href}
                  className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-[#2869ff]"
                >
                  {block.link.label}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Comprehensive Digital Solutions — three groups of three */}
        <section id="solutions" className="mt-14 sm:mt-16">
          <h2 className="text-[25px] font-medium leading-tight tracking-[-0.055em] sm:text-[27px]">
            {about.solutions.title}
          </h2>

          <div className="mt-5 rounded-[23px] border border-[#ededed] bg-[#fafafa] p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {about.solutions.groups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-[15px] font-semibold text-ink">
                    {group.title}
                  </h3>
                  <div className="mt-4 grid gap-4">
                    {group.items.map((item) => (
                      <div key={item.title}>
                        <p className="text-[13px] font-semibold text-[#292929]">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[12px] leading-[1.5] text-[#7a7a7a]">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our approach */}
        <section className="mt-14 sm:mt-16">
          <h2 className="text-[25px] font-medium leading-tight tracking-[-0.055em] sm:text-[27px]">
            {about.approach.title}
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {about.approach.points.map((point) => (
              <div
                key={point.title}
                className="rounded-[23px] border border-[#e9e9e9] bg-[#fafafa] p-5 sm:p-6"
              >
                <h3 className="text-[16px] font-semibold tracking-[-0.04em] text-ink">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-[1.5] text-[#7a7a7a]">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why organizations choose — solid blue moment */}
        <section className="mt-14 sm:mt-16">
          <div className="rounded-[23px] bg-[#4868ff] p-6 text-white sm:p-8">
            <h2 className="max-w-[640px] text-[25px] font-medium leading-tight tracking-[-0.055em] sm:text-[27px]">
              {about.why.title}
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {about.why.points.map((point) => (
                <div
                  key={point.title}
                  className="rounded-[16px] bg-white/10 p-4"
                >
                  <h3 className="text-[14px] font-semibold text-white">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-[12px] leading-[1.5] text-white/85">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Take the next step */}
        <section className="mt-14 sm:mt-16">
          <div className="rounded-[23px] border border-[#e9e9e9] bg-[#fafafa] p-6 sm:p-8">
            <h2 className="text-[25px] font-medium leading-tight tracking-[-0.055em] sm:text-[27px]">
              {about.next.title}
            </h2>
            <p className="mt-3 max-w-[640px] text-[clamp(15px,2.4vw,18px)] font-medium text-ink">
              {about.next.lead}
            </p>
            <p className="mt-1 max-w-[640px] text-[14px] leading-[1.55] text-[#7a7a7a]">
              {about.next.body}
            </p>
            <PrimaryButton
              href={about.next.cta.href}
              className="mt-6 h-9 gap-2 px-5 text-[12px]"
            >
              {about.next.cta.label}
              <ArrowUpRight className="h-2.5 w-2.5" />
            </PrimaryButton>
          </div>
        </section>
      </div>
    </main>
  );
}
