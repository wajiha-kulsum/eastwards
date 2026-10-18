import Image from "next/image";
import { PlayTriangle } from "@/components/ui/icons";
import { coreValues } from "@/lib/content";

export function CoreValues() {
  return (
    <section className="mx-auto mt-14 max-w-[1720px] px-6 sm:px-10 md:mt-16 lg:px-[5.35%]">
      <div className="flex items-center gap-1 border-b border-line-strong pb-2 text-xs font-medium text-ink">
        {coreValues.kicker} <PlayTriangle className="h-2 w-2 text-primary" />
      </div>

      <p className="mt-9 max-w-[540px] text-[22px] font-semibold leading-[23px] tracking-tight text-body">
        <span className="text-statement">
          Heavyweight experience, new approach. Eastwards brings 20+ years of IT
          engineering and product design expertise together.
        </span>{" "}
        To help teams untangle complex tech, modernize their systems, and build
        for what’s next.
      </p>

      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {coreValues.values.map((value) => (
          <li
            key={value.label}
            className="flex min-h-[310px] flex-col rounded-[24px] bg-surface p-[18px]"
          >
            <div className="relative grid flex-1 place-items-center">
              <Image
                src={value.image}
                alt={value.alt}
                width={220}
                height={150}
                className="h-[150px] w-auto object-contain drop-shadow-sm"
              />
            </div>
            <p className="text-[13px] font-medium text-primary">/ {value.label} /</p>
            <p className="mt-1 max-w-[210px] text-[14px] font-semibold leading-4 text-ink">
              {value.caption}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
