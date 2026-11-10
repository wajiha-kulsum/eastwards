"use client";

import { getImageProps } from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { hero } from "@/lib/content";

/* Art-directed hero art: the portrait crop below sm, the landscape
   rendition everywhere else, one optimized rendition set per art — plus a
   dark-mode rendition pair. The backdrop is a client livewatch on <html>'s
   theme class so only the active artwork is downloaded and toggling swaps
   it live. In dark the mobile readability wash uses the page navy so the
   text keeps contrast on the dark art. */
const common = {
  alt: "",
  sizes: "(max-width: 639px) calc(100vw - 24px), min(calc(100vw - 50px), 1670px)",
};
const { props: mobileProps } = getImageProps({
  ...common,
  width: 941,
  height: 1672,
  quality: 75,
  src: hero.mobileImage,
});
const { props: desktopProps } = getImageProps({
  ...common,
  width: 1672,
  height: 941,
  quality: 80,
  src: "/images/hero-tiles.png",
});
const { props: mobileDarkProps } = getImageProps({
  ...common,
  width: 914,
  height: 1742,
  quality: 75,
  src: "/images/hero-mobile-darkmode.png",
});
const { props: desktopDarkProps } = getImageProps({
  ...common,
  width: 1695,
  height: 933,
  quality: 80,
  src: "/images/hero-tiles-darkmode.png",
});

export function Hero() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains("dark"));
    sync();
    const watch = new MutationObserver(sync);
    watch.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => watch.disconnect();
  }, []);

  return (
    <section className="relative mx-auto max-w-[1720px] px-3 pt-3 sm:px-[25px] sm:pt-6">
      {/* Keep hero content visible immediately. The artwork is deliberately
          bright and still; a reveal animation made the text look washed out
          in captures and delayed the page's most important information. */}
      <div className="relative h-[68svh] min-h-[500px] overflow-hidden rounded-[24px] sm:rounded-[30px] md:aspect-auto md:h-auto md:min-h-[560px] md:max-h-none xl:aspect-[1667/788] xl:min-h-0 xl:max-h-[84svh]">
          {/* both renditions pick by theme; one <picture> renders either */}
          {(() => {
            const mobile = dark ? mobileDarkProps : mobileProps;
            const desktop = dark ? desktopDarkProps : desktopProps;
            return (
              <picture className="absolute inset-0">
                <source media="(max-width: 639px)" srcSet={mobile.srcSet} />
                <img
                  {...desktop}
                  alt=""
                  fetchPriority="high"
                  loading="eager"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </picture>
            );
          })()}

          {/* readability gradient on small screens */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent dark:from-page/95 dark:via-page/70"
            aria-hidden="true"
          />
          <div className="relative flex h-full flex-col items-start px-6 pt-10 sm:px-[50px] sm:pt-14 md:pt-16 lg:px-[60px] lg:pt-[72px] xl:pt-[88px]">
            <p className="mb-3 text-small font-medium text-ink sm:mb-4">
              <span className="text-body">/</span> IT solutions{" "}
              <span className="text-body">/</span>
            </p>
            <h1 className="max-w-[950px] text-balance text-display font-bold leading-[1.04] tracking-tight text-ink md:text-[64px] xl:text-display">
              Technology that moves
              <span className="block text-primary">business forward</span>
            </h1>
            <p className="mt-4 max-w-[540px] text-pretty text-small font-medium text-ink/80 md:mt-5 lg:max-w-[min(600px,41.5vw)]">
              {hero.subtext}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 md:mt-7">
              <PrimaryButton
                href="/services"
                className="min-h-11 gap-2 px-6 text-small lg:min-h-[52px] lg:px-7"
              >
                {hero.cta}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </PrimaryButton>
              <a
                href="/contact"
                className="inline-flex min-h-11 items-center px-1 text-small font-semibold text-ink transition-colors hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Talk to our team
              </a>
            </div>
          </div>
      </div>
    </section>
  );
}
