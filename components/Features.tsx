import { SECTION_LANE } from "@/components/ui/lane";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServicePathsHome } from "@/components/ServicePaths";
import { features } from "@/lib/content";

/* Home service band: the statement, then three buying paths instead of a
   drifting carousel. Every service is reachable without horizontal panning,
   and each path opens on the services index. */

function DotMatrix() {
  /* radial-gradient dot grid strip, exactly like the reference format */
  return (
    <i
      aria-hidden="true"
      className="hidden h-11 w-3 shrink-0 sm:block sm:bg-[radial-gradient(circle,var(--color-line-strong)_1px,transparent_1.2px)] sm:[background-size:5px_5px]"
    />
  );
}

export function Features() {
  return (
    <section className={SECTION_LANE}>
      <div className="grid gap-6 xl:grid-cols-[46.5%_1fr] xl:gap-8">
        <h2 className="max-w-[18ch] text-title font-semibold leading-[1.1] tracking-tight text-ink">
          Modernize, secure, and support your IT.
        </h2>

        <div>
          <SectionLabel>{features.label}</SectionLabel>
          <div className="relative mt-2 flex max-w-[500px] gap-4">
            <DotMatrix />
            <p className="text-small font-medium text-statement">
              {features.body}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 sm:mt-12">
        <ServicePathsHome />
      </div>
    </section>
  );
}
