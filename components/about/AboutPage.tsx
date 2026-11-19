import Image from "next/image";
import { CapabilityStack } from "@/components/about/CapabilityStack";
import { SmoothScroll } from "@/components/about/SmoothScroll";
import { ArrowMark } from "@/components/ui/ArrowMark";
import { BlurFade } from "@/components/ui/blur-fade";
import { BODY, FOCUS, PAD } from "@/components/ui/framed";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { TextAnimate } from "@/components/ui/text-animate";
import { about } from "@/lib/about";

/* About Us, set as an editorial
   page rather than a kit of cards: the team photo with the headline on it,
   the intro as a large statement, mission and foundation as rows, the
   capability layers as a pinned walkthrough on a dark band
   (components/about/CapabilityStack), why clients choose Eastwards as a
   mosaic of reasons around one photo, the approach beside a photo of the
   work, and the next steps as links beside a photo. No icon tiles or small
   blue labels: the client found them generic. The only graphic mark is
   the logo's own arrow. No borders either (the client asked for them
   gone): no frame rails, no section rules; groups are held by spacing and
   a faint tinted surface. Motion: the reading-progress hairline, the
   headline's word-by-word entrance, photos easing in from a blur, and
   eased wheel scrolling (Craftwork's Blank components and Lenis), all off
   under reduced motion. Micro-interactions: the hero photo settles in,
   section headings rise word by word, cards and rows arrive in a short
   stagger, and on hover the logo's outlined arrow fills and nudges forward.
   Reveals sit on wrappers and hovers on the card, so the two never fight.
   Copy is data in lib/about.ts. */

// A section on the page: spacing alone separates it from the next
const SECTION = `${PAD} py-8 sm:py-12`;
// A faint surface for grouped content, 4% ink over the page so it works in both themes
const TINT = "bg-[color-mix(in_oklab,var(--color-ink)_4%,var(--color-page))]";
const TINT_HOVER = "hover:bg-[color-mix(in_oklab,var(--color-ink)_8%,var(--color-page))]";

// Section headings share one display style; the colour comes from the band they sit on
const H2 = "max-w-[20ch] text-balance font-display text-title font-bold leading-[1.05] tracking-[-0.03em]";
// The name of a block in the side column of a row (Mission, Our Foundation, Our promise)
const ROW_NAME = "text-small font-semibold text-ink";
// A title one step under the section heading: the reasons and the next steps
const TILE_TITLE = "text-balance font-display text-xl font-semibold leading-[1.2] tracking-[-0.015em] text-ink sm:text-2xl";
// A large statement: the document's key sentences
const STATEMENT = "text-pretty text-lead font-medium leading-[1.3] tracking-[-0.015em] text-ink";

/* Keeps hyphenated words (outcome-driven, future-ready) whole, so a large
   statement never ends a line on "outcome-" */
function keepHyphenated(text: string) {
  return text.split(/(\S+-\S+)/).map((part, i) =>
    i % 2 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    )
  );
}

/* A section heading that rises word by word the first time it comes into view */
function Heading({ id, className, children }: { id: string; className: string; children: string }) {
  return (
    <TextAnimate as="h2" id={id} by="word" animation="blurInUp" duration={0.45} once className={className}>
      {children}
    </TextAnimate>
  );
}

// A card on the tinted surface, deepening and lifting slightly on hover
const CARD = `group h-full rounded-2xl ${TINT} ${TINT_HOVER} transition-[background-color,transform] duration-300 ease-out motion-safe:hover:-translate-y-0.5`;

/* The arrow from the Eastwards logo, used wherever the page points onward */
function LogoArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 27 32" aria-hidden="true" className={className}>
      <path d="M27 15.5885L0 31.1769L0 0L27 15.5885Z" fill="currentColor" />
    </svg>
  );
}

export default function AboutPage() {
  const { hero, mission, foundation, promise, capabilities, why, approach, nextStep } = about;

  return (
    <main id="main" className="flex-1 bg-page text-ink">
      {/* without scripts, nothing waits on an entrance animation */}
      <noscript>
        <style>{`[data-slot="blur-fade"],[data-slot="text-animate-segment"]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
      </noscript>
      <ScrollProgress />
      <SmoothScroll />
      <div className="mx-auto max-w-[2000px] sm:px-6">
        {/* Hero: the photo first, the arrow and headline on it (bottom left), the intro below */}
        <section className={`${PAD} pb-6 sm:pb-8`}>
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src={hero.photo.src}
              alt={hero.photo.alt}
              width={hero.photo.width}
              height={hero.photo.height}
              priority
              sizes="(min-width: 2000px) 1900px, 95vw"
              className="about-hero-settle aspect-[4/5] h-auto w-full object-cover sm:aspect-[3/2] lg:aspect-[2/1] 2xl:aspect-[21/9]"
            />
            {/* scrim behind the headline, bottom left: from the bottom on phones, from the bottom-left corner on wide screens */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent lg:bg-gradient-to-tr lg:from-black/75 lg:via-black/25 lg:to-transparent"
            />
            {/* the logo's arrow, then the headline under it, bottom left */}
            <div className="absolute inset-x-5 bottom-6 flex flex-col items-start sm:inset-x-8 sm:bottom-8 lg:inset-x-12 lg:bottom-12 lg:right-auto">
              <BlurFade className="reveal-fallback">
                <LogoArrow className="h-9 w-auto text-primary sm:h-11 lg:h-14" />
              </BlurFade>
              {/* 768-1279 keeps the title size: below 1280 the photo is too short for an 88px headline stacked under the arrow */}
              <TextAnimate
                as="h1"
                by="word"
                animation="blurInUp"
                startOnView={false}
                once
                duration={0.5}
                delay={0.1}
                className="reveal-fallback mt-5 font-display text-display font-bold leading-[1.02] tracking-[-0.03em] text-white md:text-title lg:mt-7 xl:text-display"
              >
                {hero.title}
              </TextAnimate>
            </div>
          </div>
          {/* the opening paragraph: its first sentence as the statement, the rest beside it */}
          <BlurFade delay={0.45} className="reveal-fallback mt-8 grid gap-4 sm:mt-10 lg:grid-cols-12 lg:gap-10">
            <p className={`${STATEMENT} lg:col-span-7`}>{keepHyphenated(hero.intro.lead)}</p>
            <p className={`${BODY} max-w-[52ch] text-pretty lg:col-span-4 lg:col-start-9 lg:self-end`}>{hero.intro.rest}</p>
          </BlurFade>
        </section>

        {/* Mission and foundation side by side (name, statement, detail), then the promise as one strip */}
        <section aria-label={`${mission.title} and ${foundation.title}`} className={SECTION}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            {[mission, foundation].map((block, i) => (
              <BlurFade key={block.title} inView delay={i * 0.08}>
                <h2 className={ROW_NAME}>{block.title}</h2>
                {/* a step under the intro statement while the two share a row, so neither runs long */}
                <p className={`${STATEMENT} mt-3 lg:text-2xl 2xl:text-lead`}>{keepHyphenated(block.statement)}</p>
                <p className={`${BODY} mt-4 max-w-[60ch] text-pretty`}>{block.body}</p>
              </BlurFade>
            ))}
          </div>
          <BlurFade
            inView
            delay={0.16}
            className={`mt-10 grid gap-5 rounded-2xl p-6 sm:p-8 lg:mt-14 lg:grid-cols-12 lg:items-center lg:gap-10 ${TINT}`}
          >
            <h2 className={`${ROW_NAME} lg:col-span-3`}>{promise.title}</h2>
            <ul className="grid gap-4 sm:grid-cols-3 sm:gap-6 lg:col-span-9">
              {promise.items.map((item) => (
                <li key={item.title} className="group flex items-center gap-3">
                  <ArrowMark className="h-5 w-auto shrink-0 text-primary transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                  <span className="text-balance font-display text-xl font-semibold leading-[1.2] tracking-[-0.015em] text-ink">
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </BlurFade>
        </section>

        {/* Capabilities: three layers, a photo per specialisation, on a dark band */}
        <section id="capabilities" aria-labelledby="capabilities-heading" className="bg-band text-white">
          <div className={`${PAD} pb-8 pt-12 sm:pb-10 sm:pt-16 lg:px-12 lg:pb-4 xl:px-16`}>
            <Heading id="capabilities-heading" className={`${H2} max-w-[24ch] text-white`}>
              {capabilities.title}
            </Heading>
          </div>
          <CapabilityStack />
        </section>

        {/* Why Eastwards: six cards after the client's sketch (arrow, heading, statement) */}
        <section aria-labelledby="why-heading" className={SECTION}>
          <Heading id="why-heading" className={`${H2} text-ink`}>
            {why.title}
          </Heading>
          <div className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
            {why.items.map((item, i) => (
                <BlurFade key={item.title} inView delay={i * 0.08}>
                  <div className={`${CARD} p-7 sm:p-8 lg:min-h-[240px]`}>
                    <ArrowMark className="h-7 w-auto text-primary transition-transform duration-300 ease-out group-hover:translate-x-1" />
                    <h3 className={`${TILE_TITLE} mt-6`}>{item.title}</h3>
                    <p className={`${BODY} mt-2 max-w-[40ch] text-pretty`}>{item.body}</p>
                  </div>
                </BlurFade>
            ))}
          </div>
        </section>

        {/* Our approach: a photo of the work beside the four principles */}
        <section aria-labelledby="approach-heading" className={SECTION}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            <BlurFade inView className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:sticky lg:top-28 lg:col-span-6 lg:self-start">
              <Image src={approach.image.src} alt={approach.image.alt} fill sizes="(min-width: 1024px) 48vw, 95vw" className="object-cover" />
            </BlurFade>
            <div className="lg:col-span-5 lg:col-start-8">
              <Heading id="approach-heading" className={`${H2} text-ink`}>
                {approach.title}
              </Heading>
              <ul className="mt-10 space-y-7">
                {approach.items.map((item, i) => (
                  <li key={item.title}>
                    <BlurFade inView delay={i * 0.08} className="group flex gap-4">
                      <ArrowMark className="mt-1 h-4 w-auto shrink-0 text-primary transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                      <div>
                        <h3 className="text-small font-semibold text-ink">{item.title}</h3>
                        <p className={`${BODY} mt-1.5 text-pretty`}>{item.body}</p>
                      </div>
                    </BlurFade>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Next steps: the three links on the left, a photo of a first conversation on the right (first on phones); each link opens the contact form */}
        <section aria-labelledby="next-heading" className={SECTION}>
          <Heading id="next-heading" className={`${H2} text-ink`}>
            {nextStep.title}
          </Heading>
          {/* group/next: hovering any link eases the photo in a touch, tying the two halves together */}
          <div className="group/next mt-10 grid gap-3 sm:mt-12 lg:grid-cols-12">
            <BlurFade inView className="relative min-h-[260px] overflow-hidden rounded-2xl sm:min-h-[360px] lg:order-2 lg:col-span-5 lg:min-h-0">
              <Image
                src={nextStep.image.src}
                alt={nextStep.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 95vw"
                className="object-cover transition-transform duration-700 ease-out motion-safe:group-has-[a:hover]/next:scale-[1.04]"
              />
            </BlurFade>
            <ul className="flex flex-col gap-3 lg:col-span-7">
              {nextStep.items.map((item, i) => (
                <li key={item.title} className="flex-1">
                  <BlurFade inView delay={0.08 + i * 0.08} className="h-full">
                    <a
                      href={item.href}
                      className={`group grid h-full grid-cols-[minmax(0,1fr)_auto] content-center items-center gap-x-6 gap-y-2 rounded-2xl px-6 py-7 transition-colors duration-200 sm:px-8 sm:py-8 ${TINT} ${TINT_HOVER} ${FOCUS}`}
                    >
                      <span className={`${TILE_TITLE} transition-transform duration-300 ease-out group-hover:translate-x-1`}>{item.title}</span>
                      <span className={`${BODY} col-start-1 row-start-2 max-w-[52ch] text-pretty`}>{keepHyphenated(item.body)}</span>
                      <span className="col-start-2 row-span-2 row-start-1 grid h-11 w-11 place-items-center rounded-full bg-page text-primary transition-[background-color,color,transform] duration-200 group-hover:bg-primary group-hover:text-white motion-safe:group-hover:scale-110">
                        <LogoArrow className="ml-0.5 h-3.5 w-auto transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  </BlurFade>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
