import ServiceHero from "@/components/services/ServiceHero";
import BlogShowcase from "@/components/BlogShowcase";
import { LABEL_CHIP } from "@/components/services/label-chip";
import { InkText } from "@/components/ui/InkText";
import type { ServiceBlock, ServicePageContent } from "@/lib/content";

/* Sub-page renderer for /services/[slug]. The mock's look applied to the
   shared system: centered dot-field hero with one CTA (ServiceHero), statement
   lead, then blocks grouped into hairline-ruled sections — continuing blocks
   (same kind, no heading) merge into the previous section so copy flows as
   one document. Cards render as the mock's hairline grid: outer hairline
   rectangle, internal 1px dividers, boxed number chips, square corners, no
   card backgrounds. The blog showcase renders after the lane div so its
   width matches the homepage exactly. */

type ProseBlock = Extract<ServiceBlock, { kind: "prose" }>;
type BulletsBlock = Extract<ServiceBlock, { kind: "bullets" }>;
type CardsBlock = Extract<ServiceBlock, { kind: "cards" }>;
type PanelsBlock = Extract<ServiceBlock, { kind: "panels" }>;

/* Every section heading on the page wears exactly this style, the
   statement-heading recipe: lead size, medium, tightened, ink. */
const HEADING_STYLE =
  "max-w-[720px] text-lead font-medium tracking-[-0.02em] text-ink";

function SectionHeading({ heading }: { heading?: string }) {
  return heading ? <h2 className={HEADING_STYLE}>{heading}</h2> : null;
}

function Prose({ block }: { block: ProseBlock }) {
  return (
    <div>
      <SectionHeading heading={block.heading} />
      <div className={block.heading ? "mt-3" : ""}>
        {block.paragraphs.map((paragraph) => (
          <InkText
            key={paragraph.slice(0, 32)}
            as="p"
            className="mt-3 max-w-[720px] text-small leading-[1.6]"
          >
            {paragraph}
          </InkText>
        ))}
      </div>
    </div>
  );
}

function Bullets({ block }: { block: BulletsBlock }) {
  return (
    <div>
      <SectionHeading heading={block.heading} />
      <InkText
        as="ul"
        className={`grid max-w-[860px] gap-x-10 gap-y-3 sm:grid-cols-2 ${
          block.heading ? "mt-5" : ""
        }`}
      >
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
            />
            <span className="text-small">{item}</span>
          </li>
        ))}
      </InkText>
    </div>
  );
}

/* Hairline grid: the container draws top and left edges, every cell draws
   its own right and bottom edge — that combination yields a 1px line on
   every internal and outer edge with no doubles, at any column count. */
const CARDS_COL_CLASS: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2 lg:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

function Cards({ block }: { block: CardsBlock }) {
  const cols = block.columns ?? 3;
  // Complete the hairline rectangle when the last lg row is partial;
  // smaller breakpoints re-flow so they keep plain flow borders.
  const fillers = cols - (block.items.length % cols);
  return (
    <div>
      <SectionHeading heading={block.heading} />
      <div
        className={`grid grid-cols-1 border-l border-t border-line ${
          block.heading ? "mt-6" : ""
        } ${CARDS_COL_CLASS[cols as 2 | 3 | 4]}`}
      >
        {block.items.map((item) => (
          <div
            key={item.title}
            className="border-b border-r border-line p-6 transition-colors hover:border-line-strong sm:p-8"
          >
            {item.n ? <span className={LABEL_CHIP}>{item.n}</span> : null}
            <h3
              className={`text-small font-semibold text-ink ${
                item.n ? "mt-4" : ""
              }`}
            >
              {item.title}
            </h3>
            <p className="mt-2 text-small leading-[1.6] text-body">
              {item.body}
            </p>
          </div>
        ))}
        {fillers < cols
          ? Array.from({ length: fillers }).map((_, i) => (
              <div
                key={`filler-${i}`}
                aria-hidden="true"
                className="hidden border-b border-r border-line lg:block"
              />
            ))
          : null}
      </div>
    </div>
  );
}

function Panels({ block }: { block: PanelsBlock }) {
  return (
    <div>
      <SectionHeading heading={block.heading} />
      <div
        className={`grid gap-x-10 gap-y-10 lg:grid-cols-2 ${
          block.heading ? "mt-6" : ""
        }`}
      >
        {block.groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-lead font-semibold tracking-[-0.02em] text-ink">
              {group.title}
            </h3>
            {group.body ? (
              <p className="mt-1.5 max-w-[520px] text-small leading-[1.6] text-body">
                {group.body}
              </p>
            ) : null}
            <div className="mt-5 grid gap-4">
              {group.items.map((item) => (
                <div key={item.title}>
                  <h3 className="text-small font-semibold text-ink">
                    {item.title}
                  </h3>
                  {item.body ? (
                    <InkText as="p" className="mt-0.5 text-small leading-[1.6]">
                      {item.body}
                    </InkText>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Block({ block }: { block: ServiceBlock }) {
  switch (block.kind) {
    case "lead":
      // the lead block is rendered as the page statement after the hero
      return null;
    case "prose":
      return <Prose block={block} />;
    case "bullets":
      return <Bullets block={block} />;
    case "cards":
      return <Cards block={block} />;
    case "panels":
      return <Panels block={block} />;
  }
}

/* Group blocks into hairline-ruled sections: a block opens a new section
   unless it continues the previous one — same kind, no heading, and not a
   boxed display kind (cards/panels always own their section). This keeps
   headingless prose/bullets flowing as one document. */
function intoSections(blocks: ServiceBlock[]): ServiceBlock[][] {
  const sections: ServiceBlock[][] = [];
  for (const block of blocks) {
    const current = sections[sections.length - 1];
    const prev = current ? current[current.length - 1] : undefined;
    const continues =
      current != null &&
      prev != null &&
      block.kind !== "lead" &&
      prev.kind !== "lead" &&
      block.kind === prev.kind &&
      block.kind !== "cards" &&
      block.kind !== "panels" &&
      !("heading" in block ? block.heading : false);
    if (continues && current) {
      current.push(block);
    } else {
      sections.push([block]);
    }
  }
  return sections;
}

export default function ServicePage({ service }: { service: ServicePageContent }) {
  const [lead, ...rest] = service.blocks;
  return (
    <main id="main" className="bg-page text-ink">
      <div className="mx-auto max-w-[1720px] px-6 pt-3 sm:px-10 lg:px-[5.35%]">
        <ServiceHero title={service.title} lede={service.lede} />

        {lead?.kind === "lead" ? (
          <section className="mt-10">
            <InkText as="p" className="max-w-[900px] font-medium tracking-[-0.03em]">
              {lead.body}
            </InkText>
          </section>
        ) : null}

        <div className="mt-10 flex flex-col gap-10 sm:mt-14 sm:gap-12 lg:mt-16 lg:gap-14">
          {intoSections(rest).map((group, index) => (
            <section
              key={index}
              className="border-t border-line pt-8 sm:pt-10 lg:pt-11"
            >
              <div className="flex flex-col gap-8 sm:gap-9 lg:gap-10">
                {group.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Related Blogs, the common blog showcase, rendered outside the lane
          div so it carries the exact homepage width, not a nested lane */}
      <BlogShowcase />
    </main>
  );
}
