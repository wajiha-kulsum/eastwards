import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { CareerForm } from "@/components/careers/CareerForm";
import { GRID_BG, PaperPlane, ReasonArt, TileChart } from "@/components/careers/Graphics";
import { JobAlerts } from "@/components/careers/JobAlerts";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { careers, CAREERS_EMAIL, GENERAL_APPLICATION, type Opening } from "@/lib/careers";
import { footer } from "@/lib/content";

/* Careers page in the attio.com/careers manner, on the site's own tokens:
   the page sits in a frame with hairline rails down both sides and a rule
   between sections; headings are two-tone (an ink lead, then grey); the hero
   carries a tile chart rising like growth; reasons sit in a hairline grid
   with small line drawings and hatched gutters; then open positions as
   numbered rows, the application, job alerts and where to follow along.
   Copy is data in lib/careers.ts. */

const PAD = "px-6 sm:px-10 lg:px-16 xl:px-24";
const SECTION = `border-t border-line ${PAD} py-16 sm:py-24`;
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const BODY = "text-small leading-[1.7] text-body";
const CHIP = "inline-flex items-center rounded-lg border border-line-strong bg-card px-3 py-1 text-small font-medium text-ink";
const HATCH =
  "bg-[repeating-linear-gradient(135deg,var(--color-line)_0_1px,transparent_1px_9px)]";

function TwoTone({ id, lead, rest, as: Tag = "h2" }: { id?: string; lead: string; rest?: string; as?: "h2" | "p" }) {
  return (
    <Tag id={id} className="max-w-[34ch] text-balance text-lead font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
      {lead}
      {rest ? <span className="text-body"> {rest}</span> : null}
    </Tag>
  );
}

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

const SOCIAL_ICONS = { LinkedIn: LinkedinIcon, YouTube: YoutubeIcon, Instagram: InstagramIcon } as const;

export default function CareersPage() {
  const { hero, photo, facts, statement, why, values, positions, apply, alerts, updates } = careers;
  const groups = positionGroups(positions.openings);
  const socials = new Map<string, string>(footer.socials.map((s) => [s.label, s.href]));

  return (
    <main id="main" className="flex-1 bg-page text-ink">
      <div className="mx-auto max-w-[1720px] px-6 pt-3 sm:px-10 lg:px-[5.35%]">
        <div className="border-x border-line">
          {/* Hero: copy top left, tile chart rising bottom right */}
          <section className={`relative flex flex-col overflow-hidden ${PAD} pb-10 pt-14 sm:pt-20 lg:min-h-[720px] lg:pt-28`}>
            <div className="relative z-10 max-w-[760px]">
              <span className={CHIP}>{hero.label}</span>
              <h1 className="mt-6 text-balance font-display text-display font-bold leading-[1.02] tracking-[-0.03em] text-ink">
                {hero.title} <span className="text-primary">{hero.highlight}</span>
              </h1>
              <p className="mt-6 max-w-[56ch] text-pretty text-small leading-[1.6] text-ink/80">{hero.lede}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <PrimaryButton href="#apply" className="min-h-11 gap-2 px-6 text-small lg:min-h-[52px] lg:px-7">
                  {hero.primary}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </PrimaryButton>
                <a
                  href="#positions"
                  className={`inline-flex min-h-11 items-center gap-1.5 rounded-sm px-1 text-small font-semibold text-ink transition-colors hover:text-link ${FOCUS}`}
                >
                  {hero.secondary}
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_30%)] lg:absolute lg:bottom-20 lg:right-0 lg:mt-0 lg:w-[58%] xl:w-[54%]">
              <TileChart className="h-auto w-full" />
            </div>

            <p className="relative z-10 mt-6 text-small text-body lg:mt-auto">{hero.caption}</p>
          </section>

          {/* Team photo and three facts */}
          <section className={`border-t border-line ${PAD} py-10 sm:py-14`}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-line-strong sm:aspect-[16/8] lg:aspect-[21/9]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1720px) 1400px, (min-width: 1024px) 80vw, calc(100vw - 48px)"
                className="object-cover object-[50%_35%]"
              />
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {facts.map((fact) => (
                <li key={fact.value} className="bg-page p-5 sm:p-6">
                  <p className="font-display text-title font-bold leading-none tracking-[-0.03em] text-ink">{fact.value}</p>
                  <p className="mt-3 max-w-[32ch] text-small leading-[1.5] text-body">{fact.label}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Statement */}
          <section className={SECTION}>
            <TwoTone as="p" lead={statement.lead} rest={statement.rest} />
          </section>

          {/* Why join: hairline grid, line drawings, hatched gutters */}
          <section aria-labelledby="why-heading" className="border-t border-line py-16 sm:py-24">
            <div className={PAD}>
              <TwoTone id="why-heading" lead={why.label} rest={why.lede} />
            </div>
            <div className="mt-10 grid border-y border-line sm:mt-14 lg:grid-cols-[4rem_minmax(0,1fr)_4rem] xl:grid-cols-[6rem_minmax(0,1fr)_6rem]">
              <div aria-hidden="true" className={`hidden border-r border-line lg:block ${HATCH}`} />
              <ul className="grid gap-px bg-line md:grid-cols-2">
                {why.items.map((item) => (
                  <li key={item.title} className="flex flex-col bg-page sm:flex-row">
                    <div className="relative grid h-36 shrink-0 place-items-center border-b border-line sm:h-auto sm:w-40 sm:border-b-0 sm:border-r">
                      <div aria-hidden="true" className={`absolute inset-0 ${GRID_BG}`} />
                      <div className="relative">
                        <ReasonArt icon={item.icon} />
                      </div>
                    </div>
                    <div className="p-6 sm:p-8">
                      <h3 className="text-small font-semibold text-ink">{item.title}</h3>
                      <p className={`mt-2 ${BODY}`}>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div aria-hidden="true" className={`hidden border-l border-line lg:block ${HATCH}`} />
            </div>
          </section>

          {/* Values */}
          <section aria-labelledby="values-heading" className={SECTION}>
            <TwoTone id="values-heading" lead={values.label} rest={values.lede} />
            <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-14 md:grid-cols-3">
              {values.items.map((value, index) => (
                <li key={value.title} className="bg-page p-6 sm:p-8">
                  <span className={`${CHIP} tabular-nums`}>{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 text-small font-semibold text-ink">{value.title}</h3>
                  <p className={`mt-2 ${BODY}`}>{value.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Open positions */}
          <section id="positions" aria-labelledby="positions-heading" className={`scroll-mt-24 ${SECTION}`}>
            <TwoTone id="positions-heading" lead={positions.title} rest={positions.intro} />
            {positions.openings.length === 0 ? (
              <p className="mt-6 inline-flex rounded-lg border border-line bg-surface px-4 py-2.5 text-small text-body">
                {positions.empty}
              </p>
            ) : null}

            <div className="mt-10 space-y-8 sm:mt-14">
              {groups.map(([team, rows]) => (
                <div key={team} className="overflow-hidden rounded-2xl border border-line">
                  <h3 className="flex items-baseline gap-2 border-b border-line bg-surface px-5 py-3.5 text-small font-semibold text-ink sm:px-6">
                    {team}
                    <span className="text-small font-normal tabular-nums text-body">{rows.length}</span>
                  </h3>
                  <ul className="divide-y divide-line">
                    {rows.map((row, index) => (
                      <li key={row.key}>
                        <a
                          href={row.href}
                          className={`group grid min-h-16 grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-3 px-5 py-4 transition-colors hover:bg-surface sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,auto)_auto] sm:px-6 ${FOCUS}`}
                        >
                          <span className="text-small tabular-nums text-body">{String(index + 1).padStart(2, "0")}</span>
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

                <div className="mt-10 border-t border-line pt-6">
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
          <section aria-labelledby="alerts-heading" className="grid border-t border-line bg-surface lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
            <div className={`${PAD} py-14 sm:py-20`}>
              <TwoTone id="alerts-heading" lead={alerts.title} rest={alerts.lede} />
              <JobAlerts />
            </div>
            <div className="relative hidden min-h-[260px] place-items-center border-l border-line lg:grid">
              <div aria-hidden="true" className={`absolute inset-0 ${GRID_BG}`} />
              <PaperPlane className="relative h-auto w-[78%] max-w-[360px]" />
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
                      className={`group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-line-strong hover:bg-surface ${FOCUS}`}
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
        </div>
      </div>
    </main>
  );
}
