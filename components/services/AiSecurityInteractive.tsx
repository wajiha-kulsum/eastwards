"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useInView, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { ArrowDown, Ban, Check, EyeOff, Pause, RotateCcw } from "lucide-react";
import { ArrowMark } from "@/components/ui/ArrowMark";
import { FOCUS, TINT, TINT_HOVER } from "@/components/ui/framed";
import { aiSecurity } from "@/lib/ai-security";

/* The AI Security page's interactive pieces. Each one shows how the service
   works rather than decorating it: the agent run plays step by step and
   leaves the held refund for the visitor to approve or decline, the attack
   map pins and walks, as the page scrolls, through where an agent gets
   attacked and what stops it, the
   service columns light a lifecycle line, and the report page links each finding to
   its cell on the heatmap. Under reduced motion everything
   shows at once and nothing cycles on its own. */

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const SOFT_SHADOW = "shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--color-ink)_45%,transparent)]";

/* ---------- Agent run ---------- */

type Status = "Allowed" | "Redacted" | "Blocked" | "Held" | "Approved" | "Declined";

const STATUS: Record<Status, { Icon: typeof Check; tone: string; badge: string }> = {
  Allowed: { Icon: Check, tone: "text-body", badge: "bg-page text-body" },
  Redacted: { Icon: EyeOff, tone: "text-ink", badge: "bg-page text-link" },
  Blocked: { Icon: Ban, tone: "text-ink", badge: "bg-page text-link" },
  Held: { Icon: Pause, tone: "text-ink", badge: "bg-primary text-white" },
  Approved: { Icon: Check, tone: "text-ink", badge: "bg-primary text-white" },
  Declined: { Icon: Ban, tone: "text-ink", badge: "bg-ink text-page" },
};

export function AgentTrace() {
  const { trace } = aiSecurity;
  const total = trace.steps.length;
  const box = useRef<HTMLElement>(null);
  const inView = useInView(box, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [streamed, setStreamed] = useState(0);
  const [decision, setDecision] = useState<"approved" | "declined" | null>(null);
  const [run, setRun] = useState(0);

  // reveal the steps one by one, like a run streaming in
  useEffect(() => {
    if (!inView || reduce) return;
    const timers = trace.steps.map((_, i) => setTimeout(() => setStreamed(i + 1), 450 + i * 550));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce, run, trace.steps]);

  // under reduced motion the whole run shows at once
  const shown = reduce ? total : streamed;
  const filled = Math.max(0, shown - 1) / (total - 1);
  const replay = () => {
    setDecision(null);
    setStreamed(0);
    setRun((n) => n + 1);
  };

  return (
    <figure ref={box} className={`rounded-3xl p-5 sm:p-7 lg:p-8 ${TINT}`}>
      <figcaption className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-3">
          <span className="text-small font-semibold text-ink">{trace.title}</span>
          <span className="rounded-full bg-page px-2.5 py-0.5 text-[13px] font-medium text-body">{trace.tag}</span>
        </span>
        <span className="flex items-center gap-4">
          <span className="hidden items-center gap-2 text-[14px] text-body sm:flex">
            <ArrowMark className="h-3 w-auto shrink-0 text-primary" />
            {trace.footer}
          </span>
          {shown === total && decision ? (
            <button
              type="button"
              onClick={replay}
              className={`group inline-flex min-h-9 items-center gap-1.5 rounded-full bg-page px-3 text-[14px] font-medium text-ink transition-colors duration-200 hover:text-link ${FOCUS}`}
            >
              <RotateCcw className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-90" aria-hidden="true" />
              {trace.replay}
            </button>
          ) : null}
        </span>
      </figcaption>

      <ol aria-live="polite" className="relative mt-6 grid gap-1 lg:mt-8 lg:grid-cols-5 lg:gap-6">
        {/* the run's spine: down the left on phones, along the top on wide
            screens; it fills as steps arrive */}
        <span aria-hidden="true" className="absolute bottom-8 left-[17px] top-8 w-px bg-line-strong lg:bottom-auto lg:left-4 lg:right-[calc(20%-16px)] lg:top-4 lg:h-px lg:w-auto" />
        <span
          aria-hidden="true"
          className={`absolute left-[17px] top-8 w-px origin-top bg-primary transition-transform duration-500 lg:hidden ${EASE}`}
          style={{ height: "calc(100% - 64px)", transform: `scaleY(${filled})` }}
        />
        <span
          aria-hidden="true"
          className={`absolute left-4 right-[calc(20%-16px)] top-4 hidden h-px origin-left bg-primary transition-transform duration-500 lg:block ${EASE}`}
          style={{ transform: `scaleX(${filled})` }}
        />
        {trace.steps.map((step, i) => {
          const held = step.status === "Held";
          const status: Status = held && decision ? (decision === "approved" ? "Approved" : "Declined") : step.status;
          const note = held && decision ? trace[decision].note : step.note;
          const { Icon, tone, badge } = STATUS[status];
          const visible = i < shown;
          return (
            <li key={step.tool} className="relative">
              {/* until its step arrives, a step shows as a skeleton of itself */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 flex gap-3 py-2 transition-opacity duration-300 lg:flex-col lg:py-0 ${visible ? "opacity-0" : "opacity-100"}`}
              >
                <span className="h-8 w-8 shrink-0 rounded-full bg-line motion-safe:animate-pulse" />
                <span className="grid flex-1 content-start gap-2.5 pt-1.5 lg:pt-1">
                  <span className="h-3.5 w-1/2 rounded-full bg-line motion-safe:animate-pulse" />
                  <span className="h-3 w-4/5 rounded-full bg-line motion-safe:animate-pulse" />
                </span>
              </div>
              <div
                className={`flex gap-3 py-2 transition-[opacity,transform] duration-500 lg:flex-col lg:py-0 ${EASE} ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-[color-mix(in_oklab,var(--color-ink)_4%,var(--color-page))] transition-colors duration-300 ${badge}`}
                >
                  {held && !decision && visible ? (
                    <span className="absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-ping" />
                  ) : null}
                  <Icon className="relative h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`text-small font-semibold ${tone}`}>{status}</p>
                  <code className="mt-0.5 block font-mono text-[13px] text-body">{step.tool}</code>
                  <p className="mt-1.5 text-[15px] leading-[1.45] text-body">{note}</p>
                  {held && !decision ? (
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        disabled={!visible}
                        onClick={() => setDecision("approved")}
                        className={`inline-flex min-h-9 items-center rounded-full bg-primary px-4 text-[14px] font-semibold text-white transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.96] ${FOCUS}`}
                      >
                        {trace.approve}
                      </button>
                      <button
                        type="button"
                        disabled={!visible}
                        onClick={() => setDecision("declined")}
                        className={`inline-flex min-h-9 items-center rounded-full bg-page px-4 text-[14px] font-semibold text-ink transition-[color,transform] duration-150 hover:text-link active:scale-[0.96] ${FOCUS}`}
                      >
                        {trace.decline}
                      </button>
                    </div>
                  ) : null}
                  {/* same height as the buttons it replaces, so nothing around it moves */}
                  {held && decision ? (
                    <p className="mt-3 flex min-h-9 items-center gap-2 text-[14px] text-body">
                      <ArrowMark className="h-3 w-auto shrink-0 text-primary" />
                      {trace.logged}
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 flex items-center gap-2 text-[14px] text-body sm:hidden">
        <ArrowMark className="h-3 w-auto shrink-0 text-primary" />
        {trace.footer}
      </p>
      <p className="sr-only">{trace.caption}</p>
    </figure>
  );
}

/* ---------- Attack map ---------- */

// the map pins on screens this wide, under the header (72px) and the
// section bar (64px), and the page scroll walks it surface by surface
const WIDE = "(min-width: 1024px)";
const PIN_TOP = 136;
const subscribeWide = (onChange: () => void) => {
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

// six surfaces evenly round the agent, starting at the top
const AT = Array.from({ length: 6 }, (_, i) => {
  const a = (-90 + i * 60) * (Math.PI / 180);
  return { x: 50 + 38 * Math.cos(a), y: 50 + 38 * Math.sin(a) };
});

export function AttackMap() {
  const { map } = aiSecurity.risk;
  const n = map.surfaces.length;
  const wrap = useRef<HTMLDivElement>(null);
  // on wide screens the map pins under the header and the scroll walks it;
  // narrower screens have no room to pin, so there the visitor taps through
  const pinned = useSyncExternalStore(subscribeWide, () => window.matchMedia(WIDE).matches, () => false);
  const [progress, setProgress] = useState(0);
  const [picked, setPicked] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: [`start ${PIN_TOP}px`, "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  const position = progress * n;
  const active = pinned ? Math.min(n - 1, Math.floor(position)) : picked;
  // how far through the current surface the scroll is, for its timer segment
  const within = pinned ? Math.min(1, position - active) : 1;
  const surface = map.surfaces[active];

  const pick = (i: number) => {
    const el = wrap.current;
    if (!pinned || !el) return setPicked(i);
    // scroll to the start of that surface's stretch of the pinned section
    const top = el.getBoundingClientRect().top + window.scrollY - PIN_TOP;
    const travel = el.offsetHeight - (window.innerHeight - PIN_TOP);
    window.scrollTo({ top: top + ((i + 0.08) / n) * travel, behavior: "smooth" });
  };

  return (
    <div ref={wrap} data-attack-map className="relative lg:h-[300vh]">
      <div className="grid items-center gap-8 lg:sticky lg:top-[136px] lg:min-h-[calc(100vh-152px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        {/* the map: the agent in the middle, its six surfaces round it */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-[520px] sm:block lg:max-w-[min(520px,calc(100vh-210px))]">
          <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
            <circle cx="50" cy="50" r="38" className="fill-none stroke-line-strong" strokeWidth="0.25" strokeDasharray="0.8 1.2" />
            {AT.map((p, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                strokeWidth={i === active ? 0.6 : 0.3}
                strokeDasharray={i === active ? "1.5 1.5" : undefined}
                className={`transition-[stroke] duration-300 ${i === active ? "stroke-primary motion-safe:[animation:ew-flow_1.2s_linear_infinite]" : "stroke-line-strong"}`}
              />
            ))}
          </svg>
          <div className="absolute left-1/2 top-1/2 flex h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-ink text-center text-page">
            <ArrowMark className="h-5 w-auto text-primary [&_path]:fill-current" />
            <span className="mt-2 max-w-[10ch] text-[15px] font-semibold leading-tight">{map.center}</span>
          </div>
          {map.surfaces.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={i === active}
              onClick={() => pick(i)}
              style={{ left: `${AT[i].x}%`, top: `${AT[i].y}%` }}
              className={`absolute w-max max-w-[17ch] -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-2 text-center text-[15px] font-semibold leading-snug transition-[background-color,color,transform,box-shadow] duration-300 ${EASE} active:scale-[0.96] ${FOCUS} ${
                i === active ? `scale-105 bg-primary text-white ${SOFT_SHADOW}` : `${TINT} text-ink hover:text-link`
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* phones get the same six as a row of choices */}
        <div className="flex flex-wrap gap-2 sm:hidden">
          {map.surfaces.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={i === active}
              onClick={() => pick(i)}
              className={`rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors duration-200 ${FOCUS} ${
                i === active ? "bg-primary text-white" : `${TINT} text-ink`
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* what happens on the chosen surface, and what stops it */}
        <div aria-live="polite">
          <p className="text-[15px] font-semibold text-link">{map.label}</p>
          <div key={surface.id} className="motion-safe:animate-[ew-rise_0.45s_cubic-bezier(0.22,1,0.36,1)]">
            <h3 className="mt-3 font-display text-[clamp(26px,2.6vw,36px)] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
              {surface.label}
            </h3>
            <p className="mt-6 text-[14px] font-semibold text-body">{map.attackLabel}</p>
            <p className="mt-1.5 max-w-[48ch] text-pretty text-small leading-[1.6] text-ink">{surface.attack}</p>
            <p className="mt-6 text-[14px] font-semibold text-body">{map.controlLabel}</p>
            <p className="mt-1.5 flex max-w-[48ch] items-start gap-3 text-small leading-[1.6] text-ink">
              <span aria-hidden="true" className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <Check className="h-3.5 w-3.5" />
              </span>
              {surface.control}
            </p>
          </div>
          {/* one segment per surface: passed ones full, the current one filling
              as the scroll moves through it, so it is clear what scrolling does */}
          <div className="mt-8 flex items-center gap-3">
            <span className="text-[14px] tabular-nums text-body">
              {active + 1} of {n}
            </span>
            <span className="flex gap-1">
              {map.surfaces.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={s.label}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => pick(i)}
                  className={`group py-2 ${FOCUS}`}
                >
                  <span className="block h-1.5 w-7 overflow-hidden rounded-full bg-line-strong transition-colors group-hover:bg-body/40">
                    <span
                      className="block h-full origin-left rounded-full bg-primary"
                      style={{ transform: `scaleX(${i < active ? 1 : i === active ? Math.max(0.08, within) : 0})` }}
                    />
                  </span>
                </button>
              ))}
            </span>
            {pinned && active < n - 1 ? (
              <span className="ml-auto hidden items-center gap-2 text-[14px] text-body lg:inline-flex">
                {map.scrollHint}
                <ArrowDown className="h-4 w-4 motion-safe:animate-bounce" aria-hidden="true" />
              </span>
            ) : (
              <button
                type="button"
                onClick={() => pick((active + 1) % n)}
                className={`group ml-auto inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-[14px] font-semibold text-ink transition-colors duration-200 ${TINT} ${TINT_HOVER} ${FOCUS}`}
              >
                {active === n - 1 ? map.restart : map.next}
                <ArrowMark className="h-3 w-auto text-primary transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Lifecycle cards ---------- */

type Pillar = (typeof aiSecurity.pillars.items)[number];

/* Four soft cards whose top edges form one lifecycle bar: it lights card by
   card as the section comes into view, and hovering a card shows how far
   along the lifecycle that service sits. */
export function LifecycleCards({ items, outcomeLabel }: { items: readonly Pillar[]; outcomeLabel: string }) {
  const list = useRef<HTMLOListElement>(null);
  const inView = useInView(list, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();
  // how far along the lifecycle bar is lit: -1 none, 3 all four
  const [litStep, setLit] = useState(-1);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduce) return;
    const timers = items.map((_, i) => setTimeout(() => setLit(i), 250 + i * 320));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce, items]);

  const lit = reduce && inView ? items.length - 1 : litStep;
  const upTo = hover ?? lit;

  return (
    <ol ref={list} onMouseLeave={() => setHover(null)} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, i) => {
        const on = i <= upTo;
        const current = hover === i;
        return (
          <li
            key={item.n}
            tabIndex={0}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className={`group relative flex flex-col overflow-hidden rounded-2xl p-6 pt-8 transition-[background-color,transform] duration-300 ${EASE} motion-safe:hover:-translate-y-1 sm:p-7 sm:pt-9 xl:row-span-5 xl:grid xl:grid-rows-subgrid xl:gap-0 ${TINT} ${TINT_HOVER} ${FOCUS}`}
          >
            {/* one segment of the lifecycle bar that runs across the four card tops */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-line-strong">
              <span
                className={`block h-full origin-left bg-primary transition-transform duration-500 ${EASE} ${on ? "scale-x-100" : "scale-x-0"}`}
              />
            </span>
            <p className="flex items-center gap-2.5 text-[15px] font-semibold">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[14px] transition-colors duration-300 ${
                  current ? "bg-primary text-white" : "bg-page text-link"
                }`}
              >
                {item.n}
              </span>
              <span className="text-body">{item.stage}</span>
            </p>
            <h3 className="mt-4 text-balance text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink">{item.title}</h3>
            <p className="mt-3 text-[16px] leading-[1.6] text-body">{item.body}</p>
            <ul className="mt-6 grid content-start gap-3">
              {item.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <ArrowMark className="mt-[5px] h-3 w-auto shrink-0 text-primary" />
                  <span className="text-[16px] leading-[1.5] text-ink">{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-page px-4 py-3 text-[15px] leading-[1.45] xl:mt-7 xl:self-end">
              <span className="block text-[13px] font-semibold text-link">{outcomeLabel}</span>
              <span className="text-ink">{item.outcome}</span>
            </p>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- Report page with the heatmap ---------- */

type Band = "Low" | "Medium" | "High" | "Critical";
const BANDS: readonly Band[] = ["Low", "Medium", "High", "Critical"];

/* Risk-matrix bands for likelihood times impact (1 to 16), in muted tones
   mixed into the page colour so they sit right in both themes. Every band is
   also named in text, so colour is never the only signal. */
const bandOf = (score: number): Band => (score <= 2 ? "Low" : score <= 4 ? "Medium" : score <= 9 ? "High" : "Critical");
// light-dark() follows the color-scheme next-themes sets on <html>; dark mode
// mixes in more colour so the bands keep their contrast on the dark page
const mix = (c: string, light: number, dark: number) =>
  `light-dark(color-mix(in oklab, ${c} ${light}%, var(--color-page)), color-mix(in oklab, ${c} ${dark}%, var(--color-page)))`;
// faint tints so the matrix reads as a quiet grid and only the findings stand out
const BAND_FILL: Record<Band, string> = {
  Low: mix("var(--color-primary)", 7, 14),
  Medium: mix("#F2B13A", 24, 20),
  High: mix("#EE7A3A", 32, 27),
  Critical: mix("#E5484D", 44, 38),
};
// solid swatches for the legend and the severity labels
const BAND_DOT: Record<Band, string> = {
  Low: "color-mix(in oklab, var(--color-primary) 45%, var(--color-page))",
  Medium: "#E9A23B",
  High: "#E8743B",
  Critical: "#E5484D",
};

/* One page of a sample Quick-Scan report: the likelihood and impact
   matrix with each finding placed on it, and the findings with how bad each
   is and when to fix it. Pointing at a finding, in the table or
   on the matrix, marks the other and fades the rest. A sample, not client data. */
export function ReportSheet() {
  const { heatmap } = aiSecurity.quickScan;
  const [active, setActive] = useState<number | null>(null);
  const findings = heatmap.findings.map((f) => ({ ...f, band: bandOf(f.at[0] * f.at[1]) }));
  const findingAt = (likelihood: number, impact: number) =>
    findings.findIndex((f) => f.at[0] === likelihood && f.at[1] === impact);

  return (
    <figure
      className={`@container w-full rounded-2xl bg-page p-5 sm:p-7 ${SOFT_SHADOW} dark:shadow-none`}
      onMouseLeave={() => setActive(null)}
    >
      {/* report masthead */}
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <span className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">
          Eastwards
          <ArrowMark className="h-2.5 w-auto text-primary [&_path]:fill-current" />
          <span className="ml-1.5 font-normal text-body">{heatmap.document}</span>
        </span>
        <span className="text-[12px] font-medium text-body">{heatmap.tag}</span>
      </div>

      {/* matrix and findings side by side when the report has the room, stacked when not */}
      <div className="mt-5 grid gap-6 @[760px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @[760px]:gap-10">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <figcaption className="text-[15px] font-semibold text-ink">{heatmap.title}</figcaption>
            <ul className="flex flex-wrap gap-x-3 gap-y-1">
              {BANDS.map((band) => (
                <li key={band} className="flex items-center gap-1.5 text-[12px] text-body">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ backgroundColor: BAND_DOT[band] }} />
                  {band}
                </li>
              ))}
            </ul>
          </div>
          {/* likelihood up the side, impact along the bottom */}
          <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2.5">
            <div className="grid grid-rows-4 gap-1">
              {[...heatmap.likelihoodLevels].reverse().map((level) => (
                <span key={level} className="flex items-center justify-end text-right text-[11px] leading-tight text-body">
                  {level}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-4 grid-rows-4 gap-1">
              {[4, 3, 2, 1].flatMap((likelihood) =>
                [1, 2, 3, 4].map((impact) => {
                  const band = bandOf(likelihood * impact);
                  const finding = findingAt(likelihood, impact);
                  const dim = active !== null && finding !== active;
                  return (
                    <span
                      key={`${likelihood}-${impact}`}
                      title={`${heatmap.likelihoodLevels[likelihood - 1]} likelihood, ${heatmap.impactLevels[impact - 1].toLowerCase()} impact: ${band}`}
                      onMouseEnter={finding >= 0 ? () => setActive(finding) : undefined}
                      className={`flex h-9 items-center justify-center rounded-[5px] transition-opacity duration-300 ${dim ? "opacity-40" : "opacity-100"}`}
                      style={{ backgroundColor: BAND_FILL[band] }}
                    >
                      {finding >= 0 ? (
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-page transition-transform duration-300 ${EASE} ${
                            active === finding ? "scale-125" : ""
                          }`}
                        >
                          {finding + 1}
                        </span>
                      ) : null}
                    </span>
                  );
                }),
              )}
            </div>
            <span className="self-start text-right text-[11px] font-semibold text-body">{heatmap.likelihood}</span>
            <div className="mt-1.5 grid grid-cols-4 gap-1">
              {heatmap.impactLevels.map((level) => (
                <span key={level} className="text-center text-[11px] leading-tight text-body">
                  {level}
                </span>
              ))}
            </div>
            <span />
            <span className="mt-0.5 text-center text-[11px] font-semibold text-body">{heatmap.impact}</span>
          </div>
        </div>

        {/* the findings, worst first: what, how bad, and when to fix it */}
        <ol className="grid content-start gap-1 border-t border-line pt-4 @[760px]:border-l @[760px]:border-t-0 @[760px]:pl-10 @[760px]:pt-0">
          {findings.map((f, i) => (
            <li
              key={f.label}
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 rounded-lg px-2 py-2.5 transition-colors duration-200 ${FOCUS} ${active === i ? TINT : TINT_HOVER}`}
            >
              <span className="mt-px flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-page">{i + 1}</span>
              {/* title and severity share a line when there is room, else the severity wraps under */}
              <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-[14px] font-medium leading-[1.35] text-ink">{f.label}</p>
                <p className="flex items-center gap-3 text-[12px] text-body">
                  <span className="flex items-center gap-1.5">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ backgroundColor: BAND_DOT[f.band] }} />
                    {f.band}
                  </span>
                  <span>
                    {heatmap.priorityLabel} {f.priority.toLowerCase()}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
