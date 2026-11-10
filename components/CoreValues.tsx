import Image from "next/image";
import { PlayTriangle } from "@/components/ui/icons";
import { SECTION_LANE } from "@/components/ui/lane";
import { coreValues } from "@/lib/content";

export function CoreValues() {
  return (
    <section className={SECTION_LANE}>
      <div className="flex items-center gap-2 border-b border-line-strong pb-2 text-small font-medium text-ink">
        <PlayTriangle className="h-2 w-2 text-link" aria-hidden="true" />
        {coreValues.kicker}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end md:gap-12">
        <h2 className="max-w-[14ch] text-title font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
          Technology shaped around your business.
        </h2>
        <p className="max-w-[62ch] text-small leading-[1.6] text-body">
          <span className="font-semibold text-ink">
            Heavyweight experience, new approach. Eastwards brings 20+ years of
            IT engineering and product design expertise together.
          </span>{" "}
          To help teams untangle complex tech, modernize their systems, and build
          for what’s next.
        </p>
      </div>

      <ul className="mt-8 grid grid-cols-1 border-l border-t border-line md:mt-10 md:grid-cols-3">
        {coreValues.values.map((value) => (
          <li
            key={value.label}
            className="flex min-h-[150px] flex-col border-b border-r border-line p-5 sm:p-6"
          >
            <p className="flex items-center gap-2 text-small font-semibold text-link">
              <PlayTriangle className="h-2.5 w-2.5" aria-hidden="true" />
              {value.label}
            </p>

            {/* The value's glass render: the same material family as the hero,
                so the section carries a visual without introducing a new one. */}
            <div className="relative mt-5 h-32 w-full sm:h-36 md:h-40">
              <Image
                src={value.image}
                alt=""
                fill
                sizes="(max-width: 767px) 80vw, 360px"
                className="object-contain"
              />
            </div>

            <h3 className="mt-auto max-w-[24ch] pt-5 text-small font-semibold leading-[1.45] text-ink">
              {value.caption}
            </h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
