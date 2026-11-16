import Image from "next/image";
import { ArrowDown, ArrowUpRight, MapPin, Rocket, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";
import { CapabilityStack } from "@/components/about/CapabilityStack";
import { BODY, FOCUS, FramedPage, PAD, SECTION, TwoTone } from "@/components/ui/framed";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { about, type PromiseIcon } from "@/lib/about";

/* About Us on the shared frame (components/ui/framed), a sibling of
   /careers and /responsibility: a wide (landscape) hero with the text
   running across the page and the team photo as a banner under it, then
   the mission and foundation with the promise as three outcomes, the five
   capability layers as a pinned walkthrough on a dark band
   (components/about/CapabilityStack), and the next steps. Copy is data in
   lib/about.ts. */

const PROMISE_ICONS: Record<PromiseIcon, LucideIcon> = {
  rocket: Rocket,
  shield: ShieldCheck,
  trend: TrendingUp,
};

const LABEL = "text-small font-semibold text-link";

export default function AboutPage() {
  const { hero, mission, foundation, promise, capabilities, nextStep } = about;

  return (
    <FramedPage>
      {/* Hero: the text spans the page width, the photo is a wide banner below */}
      <section className={`${PAD} pb-14 pt-14 sm:pb-20 sm:pt-20 lg:pt-24`}>
        <h1 className="max-w-[22ch] text-balance font-display text-display font-bold leading-[1.02] tracking-[-0.03em] text-ink">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-[72ch] text-pretty text-lead leading-[1.45] tracking-[-0.01em] text-body sm:mt-8">{hero.body}</p>
        {/* phones: one full-width button, the secondary link centred under it */}
        <div className="mt-8 flex flex-col gap-2 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
          <PrimaryButton href={hero.primary.href} className="min-h-12 gap-2 px-6 text-small sm:min-h-11 lg:min-h-[52px] lg:px-7">
            {hero.primary.label}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </PrimaryButton>
          <a
            href={hero.secondary.href}
            className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm px-1 text-small font-semibold text-ink transition-colors hover:text-link ${FOCUS}`}
          >
            <span className="link-underline-sweep">{hero.secondary.label}</span>
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <figure className="relative mt-10 sm:mt-14">
          <Image
            src={hero.photo.src}
            alt={hero.photo.alt}
            width={hero.photo.width}
            height={hero.photo.height}
            priority
            sizes="(min-width: 2000px) 1900px, 95vw"
            className="aspect-[4/3] h-auto w-full rounded-3xl object-cover sm:aspect-[2/1] lg:aspect-[21/9]"
          />
          <figcaption className="absolute bottom-3 left-3 flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-line bg-card/95 py-2 pl-2 pr-3.5 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.35)] backdrop-blur-sm sm:bottom-5 sm:left-5 sm:gap-3 sm:py-2.5 sm:pl-2.5 sm:pr-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-link sm:h-9 sm:w-9">
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-small font-semibold text-ink">{hero.place.title}</span>
              <span className="block text-small text-body">{hero.place.detail}</span>
            </span>
          </figcaption>
        </figure>
      </section>

      {/* Mission and foundation side by side, then the promise as three outcomes */}
      <section className={SECTION}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
          {[mission, foundation].map((block) => (
            <div key={block.title}>
              <h2 className={LABEL}>{block.title}</h2>
              <div className="mt-4">
                <TwoTone as="p" lead={block.statement} />
              </div>
              <p className={`mt-4 max-w-[60ch] text-pretty ${BODY}`}>{block.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 sm:mt-16">
          <h2 className={LABEL}>{promise.title}</h2>
          <ul className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {promise.items.map((item) => {
              const Icon = PROMISE_ICONS[item.icon];
              return (
                <li key={item.title} className="flex items-center gap-4 bg-page p-5 sm:p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-link">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-small font-semibold text-ink">{item.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Capabilities: five layers, text and photo, on a dark band */}
      <section id="capabilities" aria-labelledby="capabilities-heading" className="scroll-mt-20 bg-band text-white">
        <div className={`${PAD} pb-12 pt-16 sm:pb-16 sm:pt-24 lg:pb-4`}>
          <h2
            id="capabilities-heading"
            className="max-w-[24ch] text-balance font-display text-title font-bold leading-[1.05] tracking-[-0.03em] text-white"
          >
            {capabilities.title}
          </h2>
        </div>
        <CapabilityStack />
      </section>

      {/* Next steps, each opening the contact form */}
      <section aria-labelledby="next-heading" className={SECTION}>
        <TwoTone id="next-heading" lead={nextStep.title} />
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {nextStep.items.map((item) => (
            <li key={item.title} className="flex bg-page">
              <a
                href={item.href}
                className={`group flex w-full flex-col gap-2 p-6 transition-colors hover:bg-card sm:p-7 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary`}
              >
                <span className="flex items-start justify-between gap-4 text-small font-semibold text-ink">
                  {item.title}
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-link transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className={BODY}>{item.body}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </FramedPage>
  );
}
