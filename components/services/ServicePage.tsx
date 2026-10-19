import DotHero from "@/components/DotHero";
import BlogShowcase from "@/components/BlogShowcase";
import type { ServiceBlock, ServicePageContent } from "@/lib/content";

/* Sub-page renderer for /services/[slug]. Same lane system and visual
   language as the About page: dot-matrix hero, big statement lead, then
   the page body as generic blocks. The blog showcase is shared. */

function Prose({
  heading,
  paragraphs,
}: {
  heading?: string;
  paragraphs: string[];
}) {
  return (
    <section>
      {heading ? (
        <h2 className="max-w-[720px] text-[25px] font-medium leading-tight tracking-[-0.055em] text-ink sm:text-[27px]">
          {heading}
        </h2>
      ) : null}
      <div className="mt-3">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="mt-3 max-w-[720px] text-[14px] leading-[1.55] text-[#7a7a7a]"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

function Bullets({ heading, items }: { heading: string; items: string[] }) {
  return (
    <section>
      <h2 className="max-w-[720px] text-[25px] font-medium leading-tight tracking-[-0.055em] text-ink sm:text-[27px]">
        {heading}
      </h2>
      <ul className="mt-4 grid max-w-[860px] gap-x-10 gap-y-2.5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
            />
            <span className="text-[14px] leading-[1.55] text-[#7a7a7a]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Cards({
  heading,
  columns = 3,
  items,
}: {
  heading?: string;
  columns?: 2 | 3 | 4;
  items: { n?: string; title: string; body: string }[];
}) {
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <section>
      {heading ? (
        <h2 className="max-w-[720px] text-[25px] font-medium leading-tight tracking-[-0.055em] text-ink sm:text-[27px]">
          {heading}
        </h2>
      ) : null}
      <div className="mt-5 rounded-[23px] border border-[#ededed] bg-[#fafafa] p-6 sm:p-8">
        <div className={`grid grid-cols-1 gap-x-8 gap-y-7 ${cols}`}>
          {items.map((item) => (
            <div key={item.title}>
              {item.n ? (
                <p className="text-[13px] font-semibold text-[#2869ff]">
                  {item.n}
                </p>
              ) : null}
              <p
                className={`text-[15px] font-semibold text-[#292929] ${
                  item.n ? "mt-1" : ""
                }`}
              >
                {item.title}
              </p>
              <p className="mt-1 text-[13px] leading-[1.55] text-[#7a7a7a]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Panels({
  heading,
  groups,
}: {
  heading?: string;
  groups: {
    title: string;
    body?: string;
    items: { title: string; body: string }[];
  }[];
}) {
  return (
    <section>
      {heading ? (
        <h2 className="max-w-[720px] text-[25px] font-medium leading-tight tracking-[-0.055em] text-ink sm:text-[27px]">
          {heading}
        </h2>
      ) : null}
      <div className="mt-5 rounded-[23px] border border-[#ededed] bg-[#fafafa] p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-[15px] font-semibold text-ink">
                {group.title}
              </h3>
              {group.body ? (
                <p className="mt-1 text-[12px] leading-[1.5] text-[#8a8a8a]">
                  {group.body}
                </p>
              ) : null}
              <div className="mt-4 grid gap-4">
                {group.items.map((item) => (
                  <div key={item.title}>
                    <p className="text-[13px] font-semibold text-[#292929]">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[12px] leading-[1.5] text-[#7a7a7a]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Block({ block }: { block: ServiceBlock }) {
  switch (block.kind) {
    case "prose":
      return <Prose heading={block.heading} paragraphs={block.paragraphs} />;
    case "bullets":
      return <Bullets heading={block.heading} items={block.items} />;
    case "cards":
      return (
        <Cards
          heading={block.heading}
          columns={block.columns}
          items={block.items}
        />
      );
    case "panels":
      return (
        <Panels heading={block.heading} groups={block.groups} />
      );
  }
}

export default function ServicePage({ service }: { service: ServicePageContent }) {
  const [lead, ...rest] = service.blocks;
  return (
    <main id="main" className="bg-white text-black">
      <div className="mx-auto max-w-[1720px] px-6 pb-16 pt-3 sm:px-10 lg:px-[5.35%]">
        <DotHero title={service.title} lede={service.lede} />

        {lead.kind === "lead" ? (
          <section className="mt-9">
            <p className="max-w-[720px] text-[clamp(17px,3.6vw,26px)] font-medium leading-[1.3] tracking-[-0.03em] text-ink">
              {lead.body}
            </p>
          </section>
        ) : null}

        <div className="mt-9 flex flex-col gap-12 sm:gap-14">
          {rest.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>

        {/* Related Blogs — the common blog showcase shared by every service page */}
        <BlogShowcase />
      </div>
    </main>
  );
}
