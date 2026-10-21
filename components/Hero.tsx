"use client";

import { getImageProps } from "next/image";
import { useEffect, useState } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { hero } from "@/lib/content";

/* Art-directed hero art: the portrait crop below sm, the landscape
   rendition everywhere else, one optimized rendition set per art — plus a
   dark-mode rendition pair. The backdrop is a client livewatch on <html>'s
   theme class so only the active artwork is downloaded and toggling swaps
   it live. In dark the mobile readability wash uses the page navy so the
   text keeps contrast on the dark art. */
const common = {
  alt: "Glossy blue 3D glass tiles array",
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
      <Reveal>
        {/* Paper: panel 1667x788 @ r30, centered with ~31px insets. From md up the
            panel is aspect-locked to the drawing (2.12:1, a wide rectangle) and
            never grows past 84% of the viewport height, so the CTA stays in view. */}
        <div className="relative h-[73svh] min-h-[420px] overflow-hidden rounded-[30px] md:aspect-[1667/788] md:h-auto md:max-h-[84svh]">
          {dark ? (
            <picture className="absolute inset-0">
              <source media="(max-width: 639px)" srcSet={mobileDarkProps.srcSet} />
              <img
                {...desktopDarkProps}
                alt={common.alt}
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
          ) : (
            <picture className="absolute inset-0">
              <source media="(max-width: 639px)" srcSet={mobileProps.srcSet} />
              <img
                {...desktopProps}
                alt={common.alt}
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
          )}

          {/* readability gradient on small screens */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent lg:hidden dark:from-[#0f0f0f]/90 dark:via-[#0f0f0f]/40"
            aria-hidden="true"
          />
          <div className="relative flex h-full flex-col items-start px-6 pt-12 sm:px-[50px] sm:pt-16 lg:px-[60px] lg:pt-[96px]">
            <h1 className="text-display font-bold tracking-tight text-ink">
              Technology that moves
              <span className="block text-primary">business forward</span>
            </h1>
            <p className="mt-4 max-w-[380px] text-small font-semibold text-body md:mt-6 lg:max-w-[min(692px,41.5vw)]">
              {hero.subtext}
            </p>
            <PrimaryButton
              href="/"
              className="mt-5 h-[36px] gap-2 px-[22px] text-small md:mt-8 md:h-[42px] md:gap-3 md:px-[30px] lg:h-[54px] lg:px-[34px]"
            >
              {hero.cta}
              <ArrowUpRight className="h-2.5 w-2.5 lg:h-3.5 lg:w-3.5" />
            </PrimaryButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
