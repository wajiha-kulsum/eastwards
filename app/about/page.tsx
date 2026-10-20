import type { Metadata } from "next";
import Image from "next/image";
import DirectChannels from "@/components/DirectChannels";
import AboutSolutions from "@/components/AboutSolutions";
import DotHero from "@/components/DotHero";
import { about } from "@/lib/content";
import { PlayTriangle } from "@/components/ui/icons";

/* Built to the approved About Us artboard: two-column banner with the
   photo kept at its own shape, 60px banner headline with the blue
   highlight, solutions list set in from 45.4%, and the milestone rail
   hairline running through 23px markers (37px 40% halo on the active
   one) with 35/42 labels hanging 19px under the line. */

export const metadata: Metadata = {
  title: "About Us | Eastwards Consulting",
  description: about.lede,
};

export default function AboutPage() {
  return (
    <main id="main" className="bg-white text-black">
      <div className="mx-auto max-w-[1720px] px-6 pb-20 pt-3 sm:px-10 lg:px-[5.35%]">
        {/* The whole hero + banner owns the first screen: hero pinned top,
            banner pinned to its bottom edge. Height subtracts the in-flow
            navbar (60/68/72) and the wrapper's pt-3. */}
        <div className="flex min-h-[calc(100svh-72px)] flex-col justify-between pb-6 sm:min-h-[calc(100svh-80px)] lg:min-h-[calc(100svh-84px)] lg:pb-8">
        <DotHero title={about.title} lede={about.lede} />

        {/* Banner: copy left, photo right at its natural shape (no crop) */}
        <section className="mt-6 grid grid-cols-1 items-start gap-y-8 sm:mt-8 lg:grid-cols-[42%_1fr] lg:gap-x-[5.6%]">
          <div>
            <p className="text-copy font-medium text-primary">
              {about.banner.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-title font-medium tracking-[-0.02em] text-[#252525]">
              {about.banner.line}
              <span className="flex items-center gap-[0.17em]">
                <PlayTriangle className="h-[0.79em] w-[0.92em] shrink-0 text-primary" />
                <span>
                  {about.banner.follow}{" "}
                  <span className="bg-[#2AB0FC]">{about.banner.highlight}</span>
                </span>
              </span>
            </h2>
            <p className="mt-6 whitespace-pre-line text-copy text-statement">
              {about.banner.body}
            </p>
          </div>
          <Image
            src="/images/people.jpg"
            alt={about.banner.alt}
            width={1594}
            height={1054}
            priority
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), 48vw"
            className="h-auto w-full rounded-[24px] md:rounded-[40px]"
          />
        </section>
        </div>

        {/* Screen two: pinned solutions carousel + advancing milestone rail. */}
        <AboutSolutions />

        <DirectChannels />
      </div>
    </main>
  );
}
