import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Ban,
  Check,
  Clock,
  Info,
  Landmark,
  ShieldCheck,
  SlidersHorizontal,
  ToggleRight,
  UserCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import { LegalToc } from "@/components/legal/LegalToc";
import { RichText } from "@/components/legal/RichText";
import { legalDocs, type LegalBlock, type LegalDoc, type LegalIcon, type LegalListItem } from "@/lib/legal";

/* One layout for Terms, Privacy and Cookies. Top to bottom: the hero card
   (title, intro, photo), three "at a glance" cards, then the document beside
   its sticky table of contents, and links to the other policies. Copy is
   data in lib/legal.ts. */

const ICONS: Record<LegalIcon, LucideIcon> = {
  landmark: Landmark,
  info: Info,
  shield: ShieldCheck,
  ban: Ban,
  user: UserCheck,
  clock: Clock,
  sliders: SlidersHorizontal,
  toggle: ToggleRight,
};

const BODY = "text-small leading-[1.7] text-body";

function ListItem({ item }: { item: LegalListItem }) {
  if (typeof item === "string") return <RichText text={item} />;
  return (
    <>
      <strong className="font-semibold text-ink">{item.term}:</strong> <RichText text={item.text} />
    </>
  );
}

function List({ block }: { block: Extract<LegalBlock, { kind: "list" }> }) {
  if (block.tone) {
    const allow = block.tone === "allow";
    const Mark = allow ? Check : X;
    return (
      <div className="rounded-2xl border border-line bg-card p-5">
        {block.lead ? <p className="text-small font-semibold text-ink">{block.lead}</p> : null}
        <ul className={`space-y-3 ${block.lead ? "mt-3" : ""}`}>
          {block.items.map((item, i) => (
            <li key={i} className={`flex gap-3 ${BODY}`}>
              <span
                aria-hidden="true"
                className={`mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full ${allow ? "bg-primary/10 text-link" : "bg-destructive/10 text-destructive"}`}
              >
                <Mark className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>
                <span className="sr-only">{allow ? "Allowed: " : "Not allowed: "}</span>
                <ListItem item={item} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {block.lead ? <p className="text-small font-semibold text-ink">{block.lead}</p> : null}
      <ul className="mt-1 space-y-3">
        {block.items.map((item, i) => (
          <li key={i} className={`relative pl-5 ${BODY}`}>
            <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-primary" />
            <ListItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Table({ block }: { block: Extract<LegalBlock, { kind: "table" }> }) {
  const [, ...columns] = block.head;
  return (
    <>
      {/* From 768: a real table */}
      <div className="mt-5 hidden overflow-hidden rounded-2xl border border-line md:block">
        <table className="w-full border-collapse text-left text-small">
          <caption className="sr-only">{block.caption}</caption>
          <thead className="bg-surface">
            <tr>
              {block.head.map((cell) => (
                <th key={cell} scope="col" className="px-4 py-3 font-semibold text-ink">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map(([name, ...cells]) => (
              <tr key={name} className="border-t border-line align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-ink">
                  {name}
                </th>
                {cells.map((cell, i) => (
                  <td key={i} className="px-4 py-3 leading-[1.6] text-body">
                    {i === 1 ? <NecessityBadge value={cell} /> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phones: one card per row, a four-column table won't fit */}
      <ul className="mt-5 space-y-3 md:hidden">
        {block.rows.map(([name, ...cells]) => (
          <li key={name} className="rounded-2xl border border-line bg-card p-4">
            <p className="flex flex-wrap items-center justify-between gap-2 text-small font-semibold text-ink">
              {name}
              <NecessityBadge value={cells[1]} />
            </p>
            <dl className="mt-2 space-y-1 text-small">
              {columns.map((label, i) =>
                i === 1 ? null : (
                  <div key={label}>
                    <dt className="sr-only">{label}</dt>
                    <dd className={i === 0 ? "leading-[1.6] text-body" : "text-body"}>
                      {i === 2 ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          {cells[i]}
                        </span>
                      ) : (
                        cells[i]
                      )}
                    </dd>
                  </div>
                )
              )}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

function NecessityBadge({ value }: { value: string }) {
  const required = value === "Mandatory";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-small font-medium ${required ? "bg-primary text-white" : "bg-surface text-body ring-1 ring-inset ring-line-strong"}`}
    >
      {value}
    </span>
  );
}

function Contact({ block }: { block: Extract<LegalBlock, { kind: "contact" }> }) {
  return (
    <dl className="mt-5 grid gap-x-8 gap-y-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-2 sm:p-6">
      {block.items.map((item) => (
        <div key={item.label} className={item.href ? "" : "sm:col-span-2"}>
          <dt className="text-small text-body">{item.label}</dt>
          <dd className="mt-0.5 text-small font-medium text-ink">
            {item.href ? (
              <a href={item.href} className="break-all rounded-sm text-link underline-offset-[3px] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {item.value}
              </a>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* Consecutive allow/deny lists ("You may" / "You must not") sit side by side */
function groupBlocks(blocks: readonly LegalBlock[]) {
  const groups: LegalBlock[][] = [];
  for (const block of blocks) {
    const prev = groups.at(-1);
    const toned = block.kind === "list" && block.tone;
    if (toned && prev && prev[0].kind === "list" && prev[0].tone) prev.push(block);
    else groups.push([block]);
  }
  return groups;
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p className={`mt-4 ${BODY}`}>
          {block.lead ? <strong className="font-semibold text-ink">{block.lead} </strong> : null}
          <RichText text={block.text} />
        </p>
      );
    case "list":
      return <List block={block} />;
    case "table":
      return <Table block={block} />;
    case "note":
      return (
        <p className={`mt-5 flex gap-3 rounded-xl bg-surface px-4 py-3 ${BODY}`}>
          <Info className="mt-[3px] h-4 w-4 shrink-0 text-link" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-ink">Note: </strong>
            {block.text}
          </span>
        </p>
      );
    case "contact":
      return <Contact block={block} />;
  }
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const toc = doc.sections.map((section, i) => ({
    id: section.id,
    label: doc.numbered ? `${i + 1}. ${section.title}` : section.title,
  }));
  const related = legalDocs.filter((other) => other.path !== doc.path);

  return (
    <main id="main" className="flex-1 bg-page text-ink">
      <div className="mx-auto max-w-[1720px] px-6 pb-20 pt-3 sm:px-10 lg:px-[5.35%]">
        {/* Hero card */}
        <header className="relative overflow-hidden rounded-[24px] border border-line bg-surface sm:rounded-[30px] print:border-0 print:bg-transparent">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_75%_at_80%_50%,color-mix(in_srgb,var(--color-primary)_14%,transparent),transparent)] print:hidden"
          />
          <div className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 lg:p-14">
            <div>
              <p className="text-small font-semibold text-link">Legal</p>
              <h1 className="mt-3 text-balance font-display text-display font-bold uppercase leading-[0.95] tracking-[-0.03em] text-ink">
                {doc.title}
              </h1>
              {doc.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-6 max-w-[62ch] text-pretty text-small leading-[1.7] text-body">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-line-strong lg:aspect-[4/3] print:hidden">
              <Image
                src={doc.image.src}
                alt={doc.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, calc(100vw - 48px)"
                className="object-cover"
              />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
            </div>
          </div>
        </header>

        {/* At a glance */}
        <section aria-labelledby="glance-heading" className="mt-10 print:hidden">
          <h2 id="glance-heading" className="text-small font-semibold text-ink">
            At a glance
          </h2>
          <ul className="mt-4 grid grid-cols-1 border-l border-t border-line sm:grid-cols-3">
            {doc.highlights.map((highlight) => {
              const Icon = ICONS[highlight.icon];
              return (
                <li key={highlight.title} className="border-b border-r border-line p-5 sm:p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-link">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-small font-semibold text-ink">{highlight.title}</h3>
                  <p className="mt-1 text-small leading-[1.6] text-body">{highlight.text}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          <aside>
            <LegalToc items={toc} title="On this page" />
          </aside>

          <article className="min-w-0 max-w-[780px]">
            <div className="space-y-10">
            {doc.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="scroll-mt-28 border-t border-line pt-8 first:border-t-0 first:pt-0"
              >
                <h2 id={`${section.id}-heading`} className="text-lead font-medium tracking-[-0.02em] text-ink">
                  {doc.numbered ? <span className="mr-3 tabular-nums text-link">{i + 1}.</span> : null}
                  {section.title}
                </h2>
                {groupBlocks(section.blocks).map((group, g) =>
                  group.length > 1 ? (
                    <div key={g} className="mt-5 grid gap-4 sm:grid-cols-2">
                      {group.map((block, b) => (
                        <Block key={b} block={block} />
                      ))}
                    </div>
                  ) : (
                    <div key={g} className={group[0].kind === "list" && group[0].tone ? "mt-5" : ""}>
                      <Block block={group[0]} />
                    </div>
                  )
                )}
              </section>
            ))}
            </div>

            {/* Related policies */}
            <nav aria-labelledby="related-heading" className="mt-16 border-t border-line pt-8 print:hidden">
              <h2 id="related-heading" className="text-small font-semibold text-ink">
                Related policies
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((other) => (
                  <li key={other.path}>
                    <Link
                      href={other.path}
                      className="group flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-line bg-card px-5 py-4 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <span className="text-small font-semibold text-ink group-hover:text-link">{other.title}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-body transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-link" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </article>
        </div>
      </div>
    </main>
  );
}
