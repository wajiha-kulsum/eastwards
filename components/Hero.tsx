import { getImageProps } from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { hero } from "@/lib/content";

/* Art-directed hero art: the portrait crop below sm, the landscape
   rendition everywhere else — one optimized rendition set per art. */
const common = { alt: "Glossy blue 3D glass tiles array", sizes: "(max-width: 639px) calc(100vw - 48px), calc(100vw - 152px)" };
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

export function Hero() {
  return (
    <section className="relative mx-auto max-w-[1720px] px-3 pt-3 sm:px-[25px] sm:pt-6">
      <Reveal className="absolute inset-0">
        <picture className="absolute inset-0">
          <source media="(max-width: 639px)" srcSet={mobileProps.srcSet} />
          <img
            {...desktopProps}
            alt={common.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </picture>

        {/* readability gradient on small screens */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent lg:hidden"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col items-start px-6 pt-12 sm:px-10 sm:pt-16 md:pt-16 lg:px-[5.35%] lg:pt-[72px]">
          <h1 className="text-[40px] font-bold leading-[1.05] tracking-tight text-ink md:text-[52px]">
            Technology that moves
            <span className="block text-primary">business forward</span>
          </h1>
          <p className="mt-4 max-w-[380px] text-[15px] font-semibold leading-[1.15] text-body md:mt-6">
            {hero.subtext}
          </p>
          <PrimaryButton
            href="/"
            className="mt-5 h-[36px] gap-2 px-[22px] text-[12px] md:mt-8 md:h-[42px] md:gap-3 md:px-[30px] md:text-[14px]"
          >
            {hero.cta}
            <ArrowUpRight className="h-2.5 w-2.5" />
          </PrimaryButton>
        </div>
      </Reveal>
    </section>
  );
}
