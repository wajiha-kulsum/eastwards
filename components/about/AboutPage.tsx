import Image from "next/image";
import { ArrowDown, ArrowUpRight, MapPin, Rocket, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";
import { CapabilityStack } from "@/components/about/CapabilityStack";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { BODY, CHIP, FOCUS, FramedPage, PAD, SECTION, TwoTone } from "@/components/ui/framed";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { about, type PromiseIcon } from "@/lib/about";
import { contact } from "@/lib/content";

/* About Us on the shared frame (components/ui/framed), a sibling of
   /careers and /responsibility: hero with the team photo, who we are with
   the promise as three outcomes, the five capability layers as a vertical
   stack on a dark band (components/about/CapabilityStack), then the direct
   department lines. Copy is data in lib/about.ts. */

const PROMISE_ICONS: Record<PromiseIcon, LucideIcon> = {
  rocket: Rocket,
  shield: ShieldCheck,
  trend: TrendingUp,
};

export default function AboutPage() {
  const { hero, intro, capabilities, channels } = about;

  return (
    <FramedPage>
      {/* Hero */}
      <section className={`grid items-center gap-10 ${PAD} pb-14 pt-14 sm:pb-20 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:pt-24`}>
        <div className="max-w-[640px]">
          <span className={CHIP}>{hero.label}</span>
          <h1 className="mt-6 text-balance font-display text-display font-bold leading-[1.02] tracking-[-0.03em] text-ink">
            {hero.lead}
          </h1>
          <p className="mt-5 max-w-[44ch] text-pretty text-lead leading-[1.35] tracking-[-0.01em] text-body">{hero.rest}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PrimaryButton href={hero.primary.href} className="min-h-11 gap-2 px-6 text-small lg:min-h-[52px] lg:px-7">
              {hero.primary.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </PrimaryButton>
            <a
              href={hero.secondary.href}
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-sm px-1 text-small font-semibold text-ink transition-colors hover:text-link ${FOCUS}`}
            >
              <span className="link-underline-sweep">{hero.secondary.label}</span>
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        <figure className="relative">
          <Image
            src={hero.photo.src}
            alt={hero.photo.alt}
            width={hero.photo.width}
            height={hero.photo.height}
            priority
            sizes="(min-width: 1720px) 760px, (min-width: 1024px) 46vw, calc(100vw - 48px)"
            className="aspect-[4/3] h-auto w-full rounded-3xl object-cover"
          />
          <figcaption className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-line bg-card/95 py-2.5 pl-2.5 pr-4 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.35)] backdrop-blur-sm sm:bottom-5 sm:left-5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-link">
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-small font-semibold text-ink">{hero.place.title}</span>
              <span className="block text-small text-body">{hero.place.detail}</span>
            </span>
          </figcaption>
        </figure>
      </section>

      {/* Who we are, and the promise as three outcomes */}
      <section aria-labelledby="intro-heading" className={SECTION}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <TwoTone id="intro-heading" lead={intro.title} />
          <p className={`max-w-[60ch] text-pretty ${BODY} lg:pt-1`}>{intro.body}</p>
        </div>
        <div className="mt-12 sm:mt-16">
          <h3 className="text-small font-semibold text-ink">{intro.promiseTitle}</h3>
          <ul className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {intro.promise.map((item) => {
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

      {/* Capabilities: five layers stacking on a dark band */}
      <section id="capabilities" aria-labelledby="capabilities-heading" className="scroll-mt-20 bg-band text-white">
        <div className={`${PAD} pb-12 pt-16 sm:pb-16 sm:pt-24 lg:pb-4`}>
          <h2
            id="capabilities-heading"
            className="max-w-[24ch] text-balance font-display text-title font-bold leading-[1.05] tracking-[-0.03em] text-white"
          >
            {capabilities.title}
          </h2>
          <p className="mt-4 max-w-[52ch] text-small leading-[1.6] text-white/60">{capabilities.lede}</p>
        </div>
        <CapabilityStack />
      </section>

      {/* Direct department lines */}
      <section aria-labelledby="channels-heading" className={SECTION}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <TwoTone id="channels-heading" lead={channels.title} />
            <p className={`mt-4 max-w-[40ch] ${BODY}`}>{channels.lede}</p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {contact.directChannels.channels.map((channel) => (
              <li key={channel.email} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4 sm:py-5">
                <span className="text-small text-body">{channel.department}</span>
                <span className="flex items-center gap-3">
                  <a
                    href={`mailto:${channel.email}`}
                    className={`rounded-sm text-small font-semibold text-ink transition-colors hover:text-link ${FOCUS}`}
                  >
                    <span className="link-underline-sweep">{channel.email}</span>
                  </a>
                  <CopyEmail email={channel.email} label={channels.copy.label} done={channels.copy.done} tone="light" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </FramedPage>
  );
}
