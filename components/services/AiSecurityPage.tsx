import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import {
  BODY,
  CHIP,
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
  const { hero, band, nav, risk, pillars, why, quickScan } = aiSecurity;

  return (
    <FramedPage>
      <ScrollProgress />

      {/* Hero, in landscape: the headline and its case side by side, then the
          agent run across the full width beneath them */}
      <section className={`${PAD} pb-14 pt-2 lg:pt-6`}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-14">
          <div>
            <BlurFade className="reveal-fallback">
              <span className={CHIP}>{hero.tag}</span>
            </BlurFade>
            {/* sized to its column so each line of the headline stays on one line */}
            <h1 className="reveal-fallback mt-6 font-display text-display font-bold leading-[1.02] tracking-[-0.03em] text-ink lg:text-[clamp(56px,5.4vw,104px)]">
              <TextAnimate
                as="span"
                by="word"
                animation="blurInUp"
                startOnView={false}
                once
                duration={0.35}
                delay={0.05}
                className="block"
              >
                {hero.title}
              </TextAnimate>
              <TextAnimate
                as="span"
                by="word"
                animation="blurInUp"
                startOnView={false}
                once
                duration={0.4}
                delay={0.3}
                className="block text-primary"
              >
                {hero.highlight}
              </TextAnimate>
            </h1>
          </div>
          <BlurFade delay={0.6} className="reveal-fallback lg:pb-2">
            <p className="max-w-[52ch] text-pretty text-small leading-[1.65] text-ink">
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
          </BlurFade>
        </div>
        <BlurFade
          delay={0.3}
          direction="up"
          offset={14}
          className="reveal-fallback mt-10 lg:mt-12"
        >
          <AgentTrace />
        </BlurFade>
        <BlurFade delay={0.7} className="reveal-fallback">
          <p className="mt-6 max-w-[100ch] text-pretty text-[15px] leading-[1.6] text-body">
            {hero.frameworks}
          </p>
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
        <PillarNav label={nav.label} items={nav.items} />

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
            <span className={`${CHIP} bg-page`}>{quickScan.tag}</span>
            <h2
              id="quick-scan-heading"
              className={`mt-3 ${DISPLAY_H2} lg:text-[clamp(30px,2.8vw,48px)]`}
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
            <PrimaryButton
              href={quickScan.primary.href}
              className="group mt-6 min-h-12 gap-2 px-7 text-small active:scale-[0.97]"
            >
              {quickScan.primary.label}
              <ArrowUpRight className={ARROW_NUDGE} aria-hidden="true" />
            </PrimaryButton>
          </div>
          <ReportSheet />
        </section>
      </div>
    </FramedPage>
  );
}
