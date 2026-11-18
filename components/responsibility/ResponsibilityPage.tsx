import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PillarRings } from "./PillarRings";
import { PillarNav } from "@/components/responsibility/PillarNav";
import { BODY, FOCUS, FramedPage, PAD, TINT, TINT_HOVER, TwoTone } from "@/components/ui/framed";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ArrowMark } from "@/components/ui/ArrowMark";
import { BlurFade } from "@/components/ui/blur-fade";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextAnimate } from "@/components/ui/text-animate";
import { responsibility } from "@/lib/responsibility";
import { CsrForm } from "./CsrForm";

/* Responsibility (CSR) page, a sibling of /careers on the shared frame
   (components/ui/framed): hero with the four pillars as photo tiles, an
   overview of the pillars, then a sticky pillar bar over one section per
   pillar (photo, then its commitments as cards marked with the logo's
   outlined arrow), the closing statement lit word by word as it scrolls,
   the quote, and the CSR contact band with three turning 3D models. No numbering, no borders. Motion
   matches About and Careers: the headline rises word by word, cards and
   photos ease in with a short stagger, cards lift on hover. All of it is
   off under reduced motion. Copy is data in lib/responsibility.ts. */

const withoutStop = (title: string) => title.replace(/\.$/, "");

export default function ResponsibilityPage() {
  const { hero, index, pillars, closing, contact } = responsibility;

  return (
    <FramedPage>
      <ScrollProgress />
      {/* Hero */}
      <section className={`grid items-start gap-8 ${PAD} pb-4 pt-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pb-8`}>
        <div className="max-w-[760px]">
          <h1 className="reveal-fallback text-balance font-display text-display font-bold leading-[1.02] tracking-[-0.03em] text-ink">
            <TextAnimate as="span" by="word" animation="blurInUp" startOnView={false} once duration={0.35} delay={0.05}>
              {hero.title}
            </TextAnimate>
            <TextAnimate
              as="span"
              by="word"
              animation="blurInUp"
              startOnView={false}
              once
              duration={0.4}
              delay={0.35}
              className="mt-4 block text-lead font-semibold leading-[1.2] tracking-[-0.02em] text-primary"
            >
              {hero.highlight}
            </TextAnimate>
          </h1>
          <BlurFade delay={0.6} className="reveal-fallback">
            <p className="mt-7 max-w-[60ch] text-pretty text-small leading-[1.7] text-body">{hero.lede}</p>
            <p className={`mt-4 max-w-[60ch] ${BODY}`}>{hero.framework}</p>
            {/* the two actions as a pair: one filled, one on the soft tint, same height */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PrimaryButton href="#partner" className="group min-h-12 gap-2 px-7 text-small lg:min-h-[52px]">
                {hero.primary}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </PrimaryButton>
              <a
                href="#pillars"
                className={`group inline-flex min-h-12 items-center gap-2 rounded-full px-7 text-small font-semibold text-ink transition-colors duration-200 lg:min-h-[52px] ${TINT} ${TINT_HOVER} ${FOCUS}`}
              >
                {hero.secondary}
                <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </div>
          </BlurFade>
        </div>
        {/* The four pillars at a glance: one photo each, a shortcut to its
            section. Phones skip it; the overview below shows the same. */}
        <ul aria-label={index.label} className="hidden grid-cols-2 gap-3 lg:grid">
          {pillars.map((pillar, i) => (
            <li key={pillar.id} className={i % 2 === 1 ? "translate-y-5" : undefined}>
              <BlurFade delay={0.25 + i * 0.1} direction="up" offset={14} className="reveal-fallback">
              <a
                href={`#${pillar.id}`}
                className={`group relative block aspect-[5/4] overflow-hidden rounded-2xl bg-line-strong transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1 ${FOCUS}`}
              >
                <Image
                  src={pillar.image.src}
                  alt=""
                  fill
                  priority={i < 2}
                  sizes="(min-width: 1720px) 300px, 20vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2 text-small font-semibold text-white">
                  <span className="underline-on-group-hover">{pillar.short}</span>
                  <ArrowDown
                    className="h-4 w-4 -translate-y-1 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
              </a>
              </BlurFade>
            </li>
          ))}
        </ul>
      </section>

      {/* Pillar index: four cards that jump to their sections */}
      <section id="pillars" aria-labelledby="pillars-heading" className="scroll-mt-24 pb-6 pt-8 sm:pb-8 sm:pt-10">
        <div className={PAD}>
          <BlurFade inView>
            <TwoTone id="pillars-heading" lead={index.label} rest={index.lede} />
          </BlurFade>
        </div>
        <ul className={`mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${PAD}`}>
          {pillars.map((pillar, i) => (
            <li key={pillar.id}>
              <BlurFade inView delay={i * 0.08} className="h-full">
              <a
                href={`#${pillar.id}`}
                className={`group flex h-full flex-col overflow-hidden rounded-2xl transition-[background-color,transform] duration-300 ease-out motion-safe:hover:-translate-y-1 ${TINT} ${TINT_HOVER} ${FOCUS}`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-line-strong">
                  {/* decorative here: the section below carries the description */}
                  <Image
                    src={pillar.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, calc(100vw - 48px)"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
                  />
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="text-small font-semibold text-ink group-hover:text-link">
                    <span className="underline-on-group-hover">{withoutStop(pillar.title)}</span>
                  </span>
                  <span className="mt-2 line-clamp-2 text-small leading-[1.6] text-body">{pillar.intro}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-small font-semibold text-link">
                    Read more
                    <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
                  </span>
                </span>
              </a>
              </BlurFade>
            </li>
          ))}
        </ul>
      </section>

      {/* The pillars, under a sticky bar that marks the one being read */}
      <div>
        <PillarNav label={responsibility.nav} items={pillars.map((pillar) => ({ id: pillar.id, label: pillar.short }))} />
        {pillars.map((pillar, i) => {
          // photo and text swap sides on alternate pillars, for rhythm
          const flip = i % 2 === 1;
          return (
            <section
              key={pillar.id}
              id={pillar.id}
              aria-labelledby={`${pillar.id}-heading`}
              className="scroll-mt-40 py-6 sm:py-8"
            >
              {/* one block per pillar: heading, intro and commitments in one column,
                  the photo stretched to the same height beside it, so neither side
                  is left half empty */}
              <div className={`grid gap-6 ${PAD} lg:grid-cols-2 lg:gap-10`}>
                <div className={flip ? "lg:order-2" : undefined}>
                  <BlurFade inView>
                    <p className="text-small font-semibold text-link">{pillar.short}</p>
                    {/* larger than the shared two-tone heading, so the text holds its own beside the photo */}
                    <h2
                      id={`${pillar.id}-heading`}
                      className="mt-3 max-w-[20ch] text-balance font-display text-[clamp(28px,3vw,44px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink"
                    >
                      {pillar.title}
                      {pillar.subtitle ? <span className="text-body"> {pillar.subtitle}</span> : null}
                    </h2>
                    <p className={`mt-4 max-w-[60ch] ${BODY}`}>{pillar.intro}</p>
                  </BlurFade>
                  <ul className="mt-6 grid gap-2">
                    {pillar.items.map((item, j) => (
                      <li key={item.term}>
                        <BlurFade inView delay={0.05 + j * 0.06}>
                          {/* the logo's outlined arrow marks each commitment and fills on hover */}
                          <div
                            className={`group flex gap-4 rounded-2xl p-5 transition-[background-color,transform] duration-300 ease-out motion-safe:hover:translate-x-1 ${TINT} ${TINT_HOVER}`}
                          >
                            <ArrowMark className="mt-1 h-5 w-auto shrink-0 text-primary transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                            <div>
                              <h3 className="text-small font-semibold text-ink">{item.term}</h3>
                              <p className="mt-1 text-small leading-[1.6] text-body">{item.body}</p>
                            </div>
                          </div>
                        </BlurFade>
                      </li>
                    ))}
                  </ul>
                </div>
                <BlurFade
                  inView
                  delay={0.1}
                  className="group relative aspect-[3/2] overflow-hidden rounded-3xl bg-line-strong lg:aspect-auto lg:min-h-full"
                >
                  <Image
                    src={pillar.image.src}
                    alt={pillar.image.alt}
                    fill
                    sizes="(min-width: 1720px) 680px, (min-width: 1024px) 45vw, calc(100vw - 48px)"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                </BlurFade>
              </div>
            </section>
          );
        })}
      </div>

      {/* Moving forward together */}
      {/* statement and quote side by side on wide screens, so the close reads as one block */}
      <section
        aria-labelledby="closing-heading"
        className={`grid gap-8 ${PAD} pb-10 pt-8 sm:pb-12 sm:pt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-12`}
      >
        <h2 id="closing-heading" className="sr-only">
          {closing.title}
        </h2>
        <ScrollReveal
          lead={closing.title}
          rest={closing.statement}
          className="max-w-[30ch] text-balance font-display text-[clamp(28px,3.4vw,48px)] font-bold leading-[1.1] tracking-[-0.03em]"
        />
        <BlurFade inView>
        <figure className="relative pl-6 sm:pl-8">
          {/* a short blue bar marks the quote, instead of a border */}
          <span aria-hidden="true" className="absolute bottom-1 left-0 top-1 w-1 rounded-full bg-primary" />
          <blockquote className="text-balance text-lead font-medium leading-[1.3] tracking-[-0.02em] text-ink">
            <span aria-hidden="true" className="text-link">
              “
            </span>
            {closing.quote}
            <span aria-hidden="true" className="text-link">
              ”
            </span>
          </blockquote>
          <figcaption className="mt-5 text-small font-medium text-body">{closing.attribution}</figcaption>
        </figure>
        </BlurFade>
      </section>

      {/* Contact */}
      {/* Partner with us: the four pillars as interlocking rings on the left; the invitation and a short CSR form on the right.
          The model leans toward the cursor. */}
      <section
        id="partner"
        aria-labelledby="csr-contact-heading"
        className={`grid scroll-mt-24 items-center gap-8 ${PAD} py-10 sm:py-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 ${TINT}`}
      >
        <div aria-hidden="true" className="mx-auto hidden aspect-square w-full max-w-[440px] lg:block">
          <PillarRings className="h-full w-full" />
        </div>
        <div>
          <BlurFade inView>
            <TwoTone id="csr-contact-heading" lead={contact.title} rest={contact.lede} />
          </BlurFade>
          <BlurFade inView delay={0.1} className="mt-8">
            <CsrForm />
          </BlurFade>
        </div>
      </section>
    </FramedPage>
  );
}
