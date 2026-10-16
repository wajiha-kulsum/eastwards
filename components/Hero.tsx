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
export function Hero() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pt-3 sm:px-10 lg:px-[5.35%]">
      <Reveal>
        {/* navbar (68px) + hero panel = exactly one viewport */}
        <div className="relative h-[calc(100svh-88px)] min-h-[420px] overflow-hidden rounded-[28px]">
          <Image
            src={hero.image}
            alt="Glossy blue 3D glass tiles array"
            fill
            priority
            sizes="(min-width: 1440px) 1406px, 100vw"
            className="object-cover object-[72%_center] lg:object-center"
          />
          {/* readability gradient on small screens */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent lg:hidden"
            aria-hidden="true"
          />
          <div className="relative flex h-full flex-col items-start px-6 pt-12 sm:px-10 sm:pt-16 md:px-[33px] md:pt-16 lg:pt-[72px]">
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
        </div>
      </Reveal>
    </div>
  );
}
