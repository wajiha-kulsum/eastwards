import { Fragment } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Bot,
  Building2,
  CloudCog,
  Code2,
  GraduationCap,
  HeartHandshake,
  LockKeyhole,
  Mail,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { PillarsFigure } from "@/components/responsibility/Graphics";
import { PillarNav } from "@/components/responsibility/PillarNav";
import { BODY, CHIP, FOCUS, FramedPage, GRID_BG, HATCH, PAD, SECTION, TwoTone } from "@/components/ui/framed";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { CSR_EMAIL, responsibility, type ItemIcon } from "@/lib/responsibility";

/* Responsibility (CSR) page, a sibling of /careers on the shared frame
   (components/ui/framed): hero with the four-pillars figure, a numbered
   overview of the pillars, then a sticky pillar bar over one section per
   pillar (photo or drawing, commitments with icons in a hairline grid
   between hatched gutters), the closing statement and quote, and the CSR
   contact band. Copy is data in lib/responsibility.ts. */

const ITEM_ICONS: Record<ItemIcon, LucideIcon> = {
  cloud: CloudCog,
  code: Code2,
  building: Building2,
  mentor: GraduationCap,
  book: BookOpen,
  handshake: HeartHandshake,
  ai: Bot,
  lock: LockKeyhole,
  users: Users,
  growth: TrendingUp,
};

const number = (index: number) => String(index + 1).padStart(2, "0");
const withoutStop = (title: string) => title.replace(/\.$/, "");

/* Display-size titles: a hyphenated compound ("Purpose-Driven") never
   breaks at its hyphen across two lines */
const keepCompounds = (text: string) =>
  text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 ? " " : null}
      {word.includes("-") ? <span className="whitespace-nowrap">{word}</span> : word}
    </Fragment>
  ));

export default function ResponsibilityPage() {
  const { hero, index, pillars, closing, contact } = responsibility;

  return (
    <FramedPage>
      {/* Hero */}
      <section className={`grid items-center gap-10 ${PAD} pb-14 pt-14 sm:pb-20 sm:pt-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pt-28`}>
        <div className="max-w-[760px]">
          <span className={CHIP}>{hero.label}</span>
          <h1 className="mt-6 text-balance font-display text-display font-bold leading-[1.02] tracking-[-0.03em] text-ink">
            {keepCompounds(hero.title)}
            <span className="mt-4 block text-lead font-semibold leading-[1.2] tracking-[-0.02em] text-primary">{hero.highlight}</span>
          </h1>
          <p className="mt-6 max-w-[58ch] text-pretty text-small leading-[1.6] text-ink/80">{hero.lede}</p>
          <p className={`mt-4 max-w-[58ch] ${BODY}`}>{hero.framework}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PrimaryButton href={`mailto:${CSR_EMAIL}`} className="min-h-11 gap-2 px-6 text-small lg:min-h-[52px] lg:px-7">
              {hero.primary}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </PrimaryButton>
            <a
              href="#pillars"
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-sm px-1 text-small font-semibold text-ink transition-colors hover:text-link ${FOCUS}`}
            >
              {hero.secondary}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        {/* The four pillars at a glance: one photo each, a shortcut to its
            section. Phones skip it; the overview below shows the same. */}
        <ul aria-label={index.label} className="hidden grid-cols-2 gap-3 lg:grid">
          {pillars.map((pillar, i) => (
            <li key={pillar.id} className={i % 2 === 1 ? "translate-y-8" : undefined}>
              <a
                href={`#${pillar.id}`}
                className={`group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-line-strong ${FOCUS}`}
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
                <span className="absolute inset-x-4 bottom-4 flex items-center gap-2 text-small font-semibold text-white">
                  <span className="tabular-nums text-white/70">{number(i)}</span>
                  <span className="underline-on-group-hover">{pillar.short}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Pillar index: four numbered cells that jump to their sections */}
      <section id="pillars" aria-labelledby="pillars-heading" className="scroll-mt-24 border-t border-line pt-16 sm:pt-24">
        <div className={PAD}>
          <TwoTone id="pillars-heading" lead={index.label} rest={index.lede} />
        </div>
        <ul className="mt-10 grid gap-px border-t border-line bg-line sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <li key={pillar.id} className="bg-page">
              <a href={`#${pillar.id}`} className={`group flex h-full flex-col transition-colors hover:bg-surface ${FOCUS}`}>
                <span className="relative block aspect-[4/3] overflow-hidden border-b border-line bg-line-strong">
                  {/* decorative here: the section below carries the description */}
                  <Image
                    src={pillar.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, calc(100vw - 48px)"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                  <span className={`${CHIP} absolute left-4 top-4 tabular-nums shadow-sm`}>{number(i)}</span>
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
              className="scroll-mt-40 border-b border-line py-16 last:border-b-0 sm:py-24"
            >
              <div className={`grid gap-8 ${PAD} lg:grid-cols-2 lg:items-center lg:gap-16`}>
                <div className={flip ? "lg:order-2" : undefined}>
                  <p className="flex items-center gap-3 text-small font-semibold text-link">
                    <span className={`${CHIP} tabular-nums`}>{number(i)}</span>
                    {pillar.short}
                  </p>
                  <div className="mt-5">
                    <TwoTone id={`${pillar.id}-heading`} lead={pillar.title} rest={pillar.subtitle} />
                  </div>
                  <p className={`mt-4 max-w-[56ch] ${BODY}`}>{pillar.intro}</p>
                </div>
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-line-strong">
                  <Image
                    src={pillar.image.src}
                    alt={pillar.image.alt}
                    fill
                    sizes="(min-width: 1720px) 680px, (min-width: 1024px) 42vw, calc(100vw - 48px)"
                    className="object-cover"
                  />
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
                </div>
              </div>

              <div className="mt-10 grid border-y border-line sm:mt-14 lg:grid-cols-[4rem_minmax(0,1fr)_4rem] xl:grid-cols-[6rem_minmax(0,1fr)_6rem]">
                <div aria-hidden="true" className={`hidden border-r border-line lg:block ${HATCH}`} />
                <ul className={`grid gap-px bg-line ${pillar.items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                  {pillar.items.map((item) => {
                    const Icon = ITEM_ICONS[item.icon];
                    return (
                      <li key={item.term} className="bg-page p-6 sm:p-8">
                        <span className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong bg-surface text-link">
                          <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <h3 className="mt-5 text-small font-semibold text-ink">{item.term}</h3>
                        <p className={`mt-2 ${BODY}`}>{item.body}</p>
                      </li>
                    );
                  })}
                </ul>
                <div aria-hidden="true" className={`hidden border-l border-line lg:block ${HATCH}`} />
              </div>
            </section>
          );
        })}
      </div>

      {/* Moving forward together */}
      <section aria-labelledby="closing-heading" className={SECTION}>
        <TwoTone id="closing-heading" lead={closing.title} rest={closing.statement} />
        <figure className="mt-12 max-w-[920px] border-t border-line pt-10 sm:mt-16">
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
      </section>

      {/* Contact */}
      <section aria-labelledby="csr-contact-heading" className="grid border-t border-line bg-surface lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)]">
        <div className={`${PAD} py-14 sm:py-20`}>
          <TwoTone id="csr-contact-heading" lead={contact.title} rest={contact.lede} />
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <PrimaryButton href={`mailto:${CSR_EMAIL}`} className="min-h-11 gap-2 px-6 text-small lg:min-h-[52px] lg:px-7">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {contact.button}
            </PrimaryButton>
            <span className="inline-flex items-center gap-2">
              <a href={`mailto:${CSR_EMAIL}`} className={`link-underline-sweep rounded-sm text-small font-semibold text-ink ${FOCUS}`}>
                {CSR_EMAIL}
              </a>
              <CopyEmail email={CSR_EMAIL} label={contact.copy.label} done={contact.copy.done} tone="light" />
            </span>
          </div>
        </div>
        <div aria-hidden="true" className="relative hidden place-items-center border-l border-line p-10 lg:grid">
          <span className={`absolute inset-0 ${GRID_BG}`} />
          {/* four pillars, one mindset */}
          <PillarsFigure labels={pillars.map((pillar) => pillar.short)} className="relative h-auto w-full max-w-[420px]" />
        </div>
      </section>
    </FramedPage>
  );
}
