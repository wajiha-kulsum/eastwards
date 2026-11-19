import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { CareerForm } from "@/components/careers/CareerForm";
import { PaperPlane, TileChart } from "@/components/careers/Graphics";
import { Wireframe3D } from "@/components/careers/Wireframe3D";
import { JobAlerts } from "@/components/careers/JobAlerts";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { ArrowMark } from "@/components/ui/ArrowMark";
import { BlurFade } from "@/components/ui/blur-fade";
import { BODY, FOCUS, FramedPage, GRID_BG, PAD, SECTION, TINT, TINT_HOVER, TwoTone } from "@/components/ui/framed";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextAnimate } from "@/components/ui/text-animate";
import { about } from "@/lib/about";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { careers, CAREERS_EMAIL, GENERAL_APPLICATION, type Opening } from "@/lib/careers";
import { footer } from "@/lib/content";

/* Careers page in the attio.com/careers manner, on the site's own tokens:
   no borders (the client asked for them gone, as on About): groups sit on a
   faint tinted surface and spacing separates sections; headings are two-tone
   (an ink lead, then grey); the hero keeps its tile chart rising like growth,
   now lit under the cursor; a slow strip names the work the teams do; the
   team photo runs as a wide landscape with the three facts under it;
   reasons are tinted cards with small line drawings; values carry the logo's
   outlined arrow; then open positions as plain rows (no numbering), the
   application, job alerts and where to follow along. Cards ease in with a
   short stagger and the years figure counts up (Craftwork's Blank Blur Fade
   and Number Ticker).
   Copy is data in lib/careers.ts; the frame pieces are components/ui/framed. */

type Row = { key: string; title: string; location: string; href: string };

function positionGroups(openings: readonly Opening[]) {
  const groups = new Map<string, Row[]>();
  for (const opening of openings) {
    const rows = groups.get(opening.team) ?? [];
    rows.push({
      key: opening.slug,
      title: opening.title,
      location: `${opening.location} · ${opening.type}`,
      href: `?position=${opening.slug}#apply`,
    });
    groups.set(opening.team, rows);
  }
  // general applications are always open, and always last
  groups.set(careers.positions.generalTeam, [
    { key: "general", title: GENERAL_APPLICATION, location: careers.positions.general.location, href: "#apply" },
  ]);
  return [...groups.entries()];
}

// The nine specialisations from the About document: the work the teams do
const SPECIALISATIONS = about.capabilities.layers.flatMap((layer) => layer.items.map((item) => item.title));

const SOCIAL_ICONS = { LinkedIn: LinkedinIcon, YouTube: YoutubeIcon, Instagram: InstagramIcon } as const;

export default function CareersPage() {
  const { hero, photo, facts, statement, why, values, positions, apply, alerts, updates } = careers;
  const groups = positionGroups(positions.openings);
  const socials = new Map<string, string>(footer.socials.map((s) => [s.label, s.href]));

  return (
    <FramedPage>
      <ScrollProgress />
      {/* Hero: copy left, centred against the tile chart rising bottom right
          (it lights up under the cursor); the headline rises word by word */}
      <section className={`relative flex flex-col overflow-hidden ${PAD} pb-10 lg:min-h-[720px] lg:pb-20`}>
        <div className="relative z-10 max-w-[760px]">
          <h1 className="reveal-fallback text-balance font-display text-display font-bold leading-[1.02] tracking-[-0.03em] text-ink">
            <TextAnimate as="span" by="word" animation="blurInUp" startOnView={false} once duration={0.4} delay={0.05}>
              {hero.title}
            </TextAnimate>{" "}
            <TextAnimate as="span" by="word" animation="blurInUp" startOnView={false} once duration={0.3} delay={0.4} className="text-primary">
              {hero.highlight}
            </TextAnimate>
          </h1>
          <BlurFade delay={0.6} className="reveal-fallback">
            <p className="mt-7 max-w-[54ch] text-pretty text-small leading-[1.7] text-body">{hero.lede}</p>
            {/* the two actions as a pair: one filled, one on the soft tint, same height */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PrimaryButton href="#apply" className="group min-h-12 gap-2 px-7 text-small lg:min-h-[52px]">
                {hero.primary}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </PrimaryButton>
              <a
                href="#positions"
                className={`group inline-flex min-h-12 items-center gap-2 rounded-full px-7 text-small font-semibold text-ink transition-colors duration-200 lg:min-h-[52px] ${TINT} ${TINT_HOVER} ${FOCUS}`}
              >
                {hero.secondary}
                <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </div>
            {/* the proof line sits with the copy, marked by three tiles from the chart */}
            <p className="mt-10 flex items-center gap-3 text-small text-body">
              <span aria-hidden="true" className="flex gap-1">
                <span className="h-2.5 w-2.5 rounded-[3px] bg-primary/30" />
                <span className="h-2.5 w-2.5 rounded-[3px] bg-primary/60" />
                <span className="h-2.5 w-2.5 rounded-[3px] bg-primary" />
              </span>
              {hero.caption}
            </p>
          </BlurFade>
        </div>

        <div className="relative mt-12 hidden [mask-image:linear-gradient(to_right,transparent,black_30%)] sm:block lg:absolute lg:bottom-20 lg:right-0 lg:mt-0 lg:w-[58%] lg:max-w-[920px] xl:w-[54%]">
          <TileChart className="h-auto w-full" />
        </div>

      </section>

      {/* What the teams work on: the specialisations, as a slow strip (pauses on hover) */}
      <section aria-label="What our teams work on" className="py-2">
        <Marquee pauseOnHover className="[--duration:60s] [--fade:6rem] [--gap:0.75rem]">
          {SPECIALISATIONS.map((name) => (
            <span
              key={name}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full px-5 text-small font-medium text-ink ${TINT}`}
            >
              <ArrowMark className="h-3 w-auto text-primary" />
              {name}
            </span>
          ))}
        </Marquee>
      </section>

      {/* The team photo as a wide landscape, the three facts under it */}
      <section className={`${PAD} py-10 sm:py-14`}>
        <BlurFade inView className="relative aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[16/8] lg:aspect-[21/9]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 2000px) 1900px, calc(100vw - 48px)"
            className="object-cover object-[50%_35%] transition-transform duration-[1.2s] ease-out hover:scale-[1.02]"
          />
        </BlurFade>
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {facts.map((fact, i) => {
            // a figure like "20+" counts up; words stay as they are
            const count = /^(\d+)(\+?)$/.exec(fact.value);
            return (
              <li key={fact.value}>
                <BlurFade inView delay={i * 0.08} className={`h-full rounded-2xl p-6 sm:p-7 ${TINT}`}>
                  <p className="font-display text-title font-bold leading-none tracking-[-0.03em] text-ink">
                    {count ? (
                      <>
                        <NumberTicker value={Number(count[1])} />
                        <span className="text-primary">{count[2]}</span>
                      </>
                    ) : (
                      fact.value
                    )}
                  </p>
                  <p className="mt-3 max-w-[32ch] text-small leading-[1.5] text-body">{fact.label}</p>
                </BlurFade>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Statement: large and wide; its words light up as it scrolls through */}
      <section className={SECTION}>
        <ScrollReveal
          lead={statement.lead}
          rest={statement.rest}
          className="max-w-[30ch] text-balance font-display text-[clamp(32px,4.4vw,64px)] font-bold leading-[1.08] tracking-[-0.03em]"
        />
      </section>

      {/* Why join: the heading pinned on the left while the four reasons pass on
          the right; each reason has a slowly turning 3D wireframe model */}
      <section aria-labelledby="why-heading" className={SECTION}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <BlurFade inView>
                <TwoTone id="why-heading" lead={why.label} rest={why.lede} />
              </BlurFade>
            </div>
          </div>
          <ul className="grid gap-3 lg:col-span-8">
            {why.items.map((item, i) => (
              <li key={item.title}>
                <BlurFade inView delay={0.05 * i} className="h-full">
                  <div
                    className={`group grid h-full gap-6 rounded-3xl p-6 transition-[background-color,transform] duration-300 ease-out motion-safe:hover:-translate-y-0.5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-8 sm:p-8 ${TINT} ${TINT_HOVER}`}
                  >
                    <div className="grid h-40 w-40 shrink-0 place-items-center rounded-2xl bg-page transition-[background-color] duration-500 ease-out group-hover:bg-[color-mix(in_oklab,var(--color-primary)_6%,var(--color-page))] sm:h-44 sm:w-44">
                      <Wireframe3D shape={item.icon} className="h-full w-full" />
                    </div>
                    <div>
                      <h3 className="text-balance font-display text-xl font-semibold leading-[1.2] tracking-[-0.015em] text-ink sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className={`mt-2 max-w-[60ch] text-pretty ${BODY}`}>{item.body}</p>
                    </div>
                  </div>
                </BlurFade>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className={SECTION}>
        <BlurFade inView>
          <TwoTone id="values-heading" lead={values.label} rest={values.lede} />
        </BlurFade>
        <ul className="mt-10 grid gap-3 sm:mt-14 md:grid-cols-3">
          {values.items.map((value, i) => (
            <li key={value.title}>
              <BlurFade inView delay={i * 0.08} className="h-full">
                <div
                  className={`group h-full overflow-hidden rounded-3xl transition-[background-color,transform] duration-300 ease-out motion-safe:hover:-translate-y-0.5 ${TINT} ${TINT_HOVER}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={value.image.src}
                      alt={value.image.alt}
                      fill
                      sizes="(min-width: 768px) 32vw, calc(100vw - 48px)"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                  <ArrowMark className="h-6 w-auto text-primary transition-transform duration-300 ease-out group-hover:translate-x-1" />
                  <h3 className="mt-5 text-small font-semibold text-ink">{value.title}</h3>
                  <p className={`mt-2 ${BODY}`}>{value.body}</p>
                  </div>
                </div>
              </BlurFade>
            </li>
          ))}
        </ul>
      </section>

      {/* Open positions */}
      <section id="positions" aria-labelledby="positions-heading" className={`scroll-mt-24 ${SECTION}`}>
        <BlurFade inView>
          <TwoTone id="positions-heading" lead={positions.title} rest={positions.intro} />
        </BlurFade>
        {positions.openings.length === 0 ? (
          <p className={`mt-6 inline-flex rounded-lg px-4 py-2.5 text-small text-body ${TINT}`}>
            {positions.empty}
          </p>
        ) : null}

        <div className="mt-10 space-y-8 sm:mt-14">
          {groups.map(([team, rows]) => (
            <div key={team} className={`overflow-hidden rounded-2xl ${TINT}`}>
              <h3 className="px-5 pb-1 pt-4 text-small font-semibold text-ink sm:px-6">{team}</h3>
              <ul className="p-2 pt-0">
                {rows.map((row) => (
                  <li key={row.key}>
                    <a
                      href={row.href}
                      className={`group grid min-h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 rounded-xl px-3 py-4 transition-colors hover:bg-page sm:grid-cols-[minmax(0,1fr)_minmax(0,auto)_auto] sm:px-4 ${FOCUS}`}
                    >
                      <span className="text-small font-semibold text-ink transition-colors group-hover:text-link">
                        {row.title}
                        <span className="block font-normal text-body sm:hidden">{row.location}</span>
                      </span>
                      <span className="hidden text-small text-body sm:block">{row.location}</span>
                      <span className="inline-flex items-center gap-1.5 text-small font-semibold text-link">
                        <span className="hidden md:inline">{positions.apply}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Apply */}
      <section id="apply" aria-labelledby="apply-heading" className={`scroll-mt-24 ${SECTION}`}>
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-14">
          <div>
            <TwoTone id="apply-heading" lead={`${apply.title}.`} rest={apply.lede} />

            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl bg-line-strong">
              <Image src={apply.photo.src} alt={apply.photo.alt} fill sizes="(min-width: 1280px) 36vw, calc(100vw - 48px)" className="object-cover" />
            </div>

            <h3 className="mt-10 text-small font-semibold text-ink">{apply.howTitle}</h3>
            <ol className="mt-4 space-y-5">
              {apply.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-small font-semibold tabular-nums text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-small font-semibold text-ink">{step.title}</p>
                    <p className={`mt-1 ${BODY}`}>
                      {step.body}
                      {"email" in step ? (
                        <>
                          {" "}
                          <a
                            href={`mailto:${step.email}`}
                            className={`inline-flex items-center gap-1 rounded-sm font-semibold text-link underline-offset-[3px] hover:underline ${FOCUS}`}
                          >
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            {step.email}
                          </a>
                          .
                        </>
                      ) : null}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <p className="flex gap-2 text-small leading-[1.6] text-body">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-link" aria-hidden="true" />
                <span>
                  <span className="block font-semibold text-ink">{apply.company}</span>
                  {apply.address}
                </span>
              </p>
              <p className={`mt-4 ${BODY}`}>{apply.eeo}</p>
            </div>
          </div>

          <div className="min-w-0">
            <CareerForm />
          </div>
        </div>
      </section>

      {/* Job alerts */}
      <section aria-labelledby="alerts-heading" className={`grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] ${TINT}`}>
        <div className={`${PAD} py-14 sm:py-20`}>
          <BlurFade inView>
            <TwoTone id="alerts-heading" lead={alerts.title} rest={alerts.lede} />
          </BlurFade>
          <JobAlerts />
        </div>
        <div className="relative hidden min-h-[260px] place-items-center lg:grid">
          <div aria-hidden="true" className={`absolute inset-0 ${GRID_BG}`} />
          <PaperPlane className="plane-drift relative h-auto w-[78%] max-w-[360px]" />
        </div>
      </section>

      {/* Keep up to date */}
      <section aria-labelledby="updates-heading" className={SECTION}>
        <h2 id="updates-heading" className="text-lead font-semibold tracking-[-0.02em] text-ink">
          {updates.title}
        </h2>
        <p className="mt-3 text-small text-body">{updates.lede}</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {updates.channels.map((channel) => {
            const isEmail = channel.id === "Email";
            const href = isEmail ? `mailto:${CAREERS_EMAIL}` : socials.get(channel.id);
            if (!href) return null;
            const Icon = isEmail ? Mail : SOCIAL_ICONS[channel.id as keyof typeof SOCIAL_ICONS];
            return (
              <li key={channel.id}>
                <a
                  href={href}
                  {...(isEmail ? {} : { target: "_blank", rel: "noreferrer" })}
                  className={`group flex h-full flex-col rounded-2xl p-6 transition-[background-color,transform] duration-300 ease-out motion-safe:hover:-translate-y-0.5 ${TINT} ${TINT_HOVER} ${FOCUS}`}
                >
                  <span className="flex items-center justify-between text-ink">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <ArrowUpRight className="h-4 w-4 text-body transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-link" aria-hidden="true" />
                  </span>
                  <span className="mt-6 text-small font-semibold text-ink">{channel.title}</span>
                  <span className="mt-1 text-small leading-[1.5] text-body">
                    {channel.text}
                    {isEmail ? <span className="mt-1 block font-medium text-link">{CAREERS_EMAIL}</span> : null}
                  </span>
                  {isEmail ? null : <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </FramedPage>
  );
}
