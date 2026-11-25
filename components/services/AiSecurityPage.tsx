import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, Download } from "lucide-react";
import {
  BODY,
  FOCUS,
  FramedPage,
  PAD,
  TINT,
  TINT_HOVER,
  TwoTone,
} from "@/components/ui/framed";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ArrowMark } from "@/components/ui/ArrowMark";
import { BlurFade } from "@/components/ui/blur-fade";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { TextAnimate } from "@/components/ui/text-animate";
import { PillarNav } from "@/components/responsibility/PillarNav";
import {
  AgentTrace,
  AttackMap,
  LifecycleCards,
  ReportSheet,
} from "./AiSecurityInteractive";
import { JsonLd } from "@/components/SeoJsonLd";
import { aiSecurity } from "@/lib/ai-security";

/* /services/ai-security, on the frame Careers and Responsibility share. One
   orchestrated entrance (the hero) and otherwise motion only where it
   explains something: the agent run the visitor can step into, the attack
   map, the lifecycle bar and the report sheet. Sections are open layouts
   rather than boxes, so the few panels left (the run, the Quick-Scan band,
   the report) read as objects. Blue marks what a control did and the
   actions. Copy is data in lib/ai-security.ts. */

const DISPLAY_H2 =
  "max-w-[22ch] text-balance font-display text-[clamp(30px,3.2vw,48px)] font-bold leading-[1.06] tracking-[-0.03em] text-ink";

const ARROW_NUDGE =
  "h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5";

export default function AiSecurityPage() {
  const { hero, band, nav, risk, pillars, why, quickScan, faq } = aiSecurity;

  return (
    <FramedPage>
      <ScrollProgress />

      {/* Hero, as on About: the photo first with the logo arrow and headline
          on it (bottom left), then the case and both actions below it, then
          the agent run across the full width */}
      <section className={`${PAD} pb-14 pt-2 lg:pt-4`}>
        <div className="relative overflow-hidden rounded-3xl bg-ink">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            priority
            sizes="(min-width: 2000px) 1900px, 95vw"
            className="about-hero-settle aspect-[4/5] h-auto w-full object-cover object-[72%_50%] sm:aspect-[3/2] lg:aspect-[12/5]"
          />
          {/* scrim behind the headline: from the bottom on phones, from the bottom-left corner on wide screens */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:bg-gradient-to-tr lg:from-black/80 lg:via-black/25 lg:to-transparent"
          />
          <div className="absolute inset-x-5 bottom-6 flex flex-col items-start sm:inset-x-8 sm:bottom-8 lg:inset-x-12 lg:bottom-12 lg:right-auto">
            <BlurFade className="reveal-fallback">
              <ArrowMark className="h-9 w-auto text-primary sm:h-11 lg:h-14 [&_path]:fill-current" />
            </BlurFade>
            <h1 className="reveal-fallback mt-5 font-display text-display font-bold leading-[1.02] tracking-[-0.03em] text-white lg:mt-7 lg:text-[clamp(56px,5.4vw,104px)]">
              <TextAnimate
                as="span"
                by="word"
                animation="blurInUp"
                startOnView={false}
                once
                duration={0.35}
                delay={0.1}
                className="block"
              >
                {hero.title}
              </TextAnimate>
              {/* the brand blue, lifted so it holds its contrast on the dark photo */}
              <TextAnimate
                as="span"
                by="word"
                animation="blurInUp"
                startOnView={false}
                once
                duration={0.4}
                delay={0.35}
                className="block text-[color-mix(in_oklab,var(--color-primary)_62%,white)]"
              >
                {hero.highlight}
              </TextAnimate>
            </h1>
          </div>
        </div>

        {/* the case and both actions on the left, the frameworks we map to on the right */}
        <BlurFade
          delay={0.45}
          className="reveal-fallback mt-8 grid gap-6 sm:mt-10 lg:grid-cols-12 lg:items-end lg:gap-10"
        >
          <div className="lg:col-span-7">
            <p className="max-w-[56ch] text-pretty text-[clamp(18px,1.5vw,22px)] leading-[1.55] text-ink">
              {hero.lede}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <PrimaryButton
                href={hero.primary.href}
                className="group min-h-12 gap-2 px-6 text-small active:scale-[0.97]"
              >
                {hero.primary.label}
                <ArrowUpRight className={ARROW_NUDGE} aria-hidden="true" />
              </PrimaryButton>
              <a
                href={hero.secondary.href}
                className={`group inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-small font-semibold text-ink transition-[background-color,transform] duration-200 active:scale-[0.97] ${TINT} ${TINT_HOVER} ${FOCUS}`}
              >
                {hero.secondary.label}
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
          <p className="max-w-[48ch] text-pretty text-[15px] leading-[1.6] text-body lg:col-span-5 lg:pb-3">
            {hero.frameworks}
          </p>
        </BlurFade>
        <BlurFade
          delay={0.3}
          direction="up"
          offset={14}
          className="reveal-fallback mt-10 lg:mt-12"
        >
          <AgentTrace />
        </BlurFade>
      </section>

      {/* One photo and one plain statement */}
      <section
        aria-labelledby="band-heading"
        className={`grid items-center gap-8 ${PAD} pb-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14`}
      >
        <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl bg-line-strong lg:aspect-[16/9]">
          <Image
            src={band.image.src}
            alt={band.image.alt}
            fill
            sizes="(min-width: 1024px) 58vw, calc(100vw - 48px)"
            className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
        <div>
          <h2 id="band-heading" className={DISPLAY_H2}>
            {band.statement}
          </h2>
          <p className={`mt-5 max-w-[46ch] ${BODY}`}>{band.body}</p>
        </div>
      </section>

      <div className="mt-6">
        <PillarNav label={nav.label} items={nav.items} action={nav.action} />

        {/* The risk: the case, then where an agent gets attacked */}
        <section
          id="risk"
          aria-labelledby="risk-heading"
          className={`scroll-mt-12 ${PAD} py-12 sm:py-16`}
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <h2 id="risk-heading" className={DISPLAY_H2}>
              {risk.lead}
              <span className="text-body"> {risk.rest}</span>
            </h2>
            <div className="lg:pt-2">
              {risk.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className={`mb-4 max-w-[58ch] ${BODY}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-10 sm:mt-12">
            <AttackMap />
          </div>
        </section>

        {/* The four services, along the lifecycle */}
        <section
          id="services"
          aria-labelledby="pillars-heading"
          className="scroll-mt-12 py-12 sm:py-16"
        >
          <div className={PAD}>
            <TwoTone
              id="pillars-heading"
              lead={pillars.lead}
              rest={pillars.rest}
            />
          </div>
          <div className={`mt-8 ${PAD}`}>
            <LifecycleCards
              items={pillars.items}
              outcomeLabel={pillars.outcomeLabel}
            />
          </div>
        </section>

        {/* Why Eastwards, beside the Singapore skyline */}
        <section
          id="why"
          aria-labelledby="why-heading"
          className={`grid scroll-mt-12 gap-8 ${PAD} py-12 sm:py-16 lg:grid-cols-2 lg:gap-14`}
        >
          <div className="group relative min-h-[340px] overflow-hidden rounded-3xl bg-line-strong lg:min-h-full">
            <Image
              src={why.image.src}
              alt={why.image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, calc(100vw - 48px)"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
            />
            <p className="absolute inset-x-6 bottom-6 max-w-[34ch] text-balance text-small font-semibold leading-[1.35] text-white sm:inset-x-8 sm:bottom-8">
              {why.image.caption}
            </p>
          </div>
          <div className="lg:py-4">
            <h2 id="why-heading" className={DISPLAY_H2}>
              {why.lead}
              <span className="text-body"> {why.rest}</span>
            </h2>
            <p className={`mt-5 max-w-[56ch] ${BODY}`}>{why.body}</p>
            <ul className="mt-9 grid gap-7">
              {why.items.map((item) => (
                <li key={item.title} className="group flex gap-4">
                  <ArrowMark className="mt-1 h-5 w-auto shrink-0 text-primary transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                  <div>
                    <h3 className="text-small font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1 max-w-[54ch] text-[16px] leading-[1.6] text-body">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href={why.link.href}
              className={`group mt-9 inline-flex items-center gap-1.5 rounded-sm text-small font-semibold text-link ${FOCUS}`}
            >
              <span className="underline-offset-4 group-hover:underline">
                {why.link.label}
              </span>
              <ArrowUpRight className={ARROW_NUDGE} aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* The Quick-Scan: the offer beside a sample page of its report, sized
            to fit one screen under the header and section bar */}
        <section
          id="quick-scan"
          aria-labelledby="quick-scan-heading"
          className={`mt-4 grid scroll-mt-12 items-center gap-10 overflow-hidden rounded-3xl ${PAD} py-10 sm:mx-6 sm:px-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:py-6 lg:gap-12 lg:px-12 ${TINT}`}
        >
          <div>
            <h2
              id="quick-scan-heading"
              className={`${DISPLAY_H2} lg:text-[clamp(30px,2.8vw,48px)]`}
            >
              {quickScan.title}
            </h2>
            <p className={`mt-3 max-w-[46ch] ${BODY}`}>{quickScan.body}</p>
            <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
              {quickScan.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[13px] text-body">{fact.label}</dt>
                  <dd className="mt-0.5 text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <h3 className="mt-5 text-[15px] font-semibold text-ink">
              {quickScan.deliverablesLabel}
            </h3>
            <ul className="mt-2.5 grid gap-1.5">
              {quickScan.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white"
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-[15px] leading-[1.45] text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <PrimaryButton
                href={quickScan.primary.href}
                className="group min-h-12 gap-2 px-7 text-small active:scale-[0.97]"
              >
                {quickScan.primary.label}
                <ArrowUpRight className={ARROW_NUDGE} aria-hidden="true" />
              </PrimaryButton>
              <a
                href={quickScan.whitepaper.href}
                download
                className={`group inline-flex min-h-12 items-center gap-2 rounded-full bg-page px-6 text-small font-semibold text-ink ring-1 ring-inset ring-line-strong transition-[box-shadow,transform] duration-200 hover:ring-ink/40 active:scale-[0.97] ${FOCUS}`}
              >
                {quickScan.whitepaper.label}
                <Download
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
          <ReportSheet />
        </section>

        {/* The questions buyers ask before booking, beside one last way in */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className={`grid scroll-mt-12 gap-10 ${PAD} py-12 sm:py-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14`}
        >
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }}
          />
          <div className="lg:sticky lg:top-40 lg:self-start">
            <h2 id="faq-heading" className={DISPLAY_H2}>
              {faq.lead}
              <span className="text-body"> {faq.rest}</span>
            </h2>
            <PrimaryButton
              href={faq.cta.href}
              className="group mt-8 min-h-12 gap-2 px-7 text-small active:scale-[0.97]"
            >
              {faq.cta.label}
              <ArrowUpRight className={ARROW_NUDGE} aria-hidden="true" />
            </PrimaryButton>
            <p className="mt-4 max-w-[40ch] text-[15px] leading-[1.6] text-body">
              {faq.ctaNote}
            </p>
          </div>
          {/* native disclosure: works without scripts and with the keyboard */}
          <div className="grid gap-2">
            {faq.items.map((item, i) => (
              <details
                key={item.q}
                open={i === 0}
                className={`group rounded-2xl transition-colors duration-200 open:bg-[color-mix(in_oklab,var(--color-ink)_4%,var(--color-page))] ${TINT_HOVER}`}
              >
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl px-5 py-4 text-small font-semibold text-ink sm:px-6 [&::-webkit-details-marker]:hidden ${FOCUS}`}
                >
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-page text-link transition-transform duration-300 group-open:rotate-45"
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className={`max-w-[62ch] px-5 pb-5 sm:px-6 ${BODY}`}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </FramedPage>
  );
}
