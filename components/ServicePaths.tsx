import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceGroups } from "@/lib/service-groups";

/* One component, two densities: the home band reads each path in a glance,
   the services index opens every path into its service rows. Grouping comes
   from lib/service-groups so both pages always agree. */

const LINK_CLASS =
  "group inline-flex items-center gap-1.5 text-small font-medium text-ink transition-colors hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const ARROW_CLASS =
  "h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5";
const FOCUS_CLASS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function ServicePathsHome() {
  return (
    <div>
      <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-3">
        {serviceGroups.map((group) => (
          <div
            key={group.id}
            className="flex min-w-0 flex-col border-b border-r border-line bg-page p-5 transition-colors duration-200 hover:bg-surface sm:p-6 lg:p-7"
          >
            <h3 className="text-lead font-semibold leading-tight tracking-[-0.02em] text-ink">
              {group.label}
            </h3>
            <p className="mt-2 max-w-[34ch] text-small leading-[1.55] text-body">
              {group.summary}
            </p>

            {/* The count keeps the three-row preview honest: Secure and govern
                has seven services, the card lists three of them. */}
            <p className="mt-5 border-t border-line pt-4 text-small text-body sm:mt-6">
              {group.services.length} services
            </p>
            <ul className="mt-1 space-y-1">
              {group.services.slice(0, 3).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className={`${LINK_CLASS} min-h-10`}
                  >
                    {service.title}
                    <ArrowUpRight className={ARROW_CLASS} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={`/services#${group.id}`}
              className={`mt-auto inline-flex min-h-11 items-center gap-1.5 pt-5 text-small font-semibold text-link transition-opacity duration-200 hover:opacity-70 sm:pt-6 ${FOCUS_CLASS}`}
            >
              Explore this path
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end sm:mt-7">
        <Link
          href="/services"
          className={`group inline-flex min-h-11 items-center gap-1.5 text-small font-semibold text-ink transition-colors hover:text-link ${FOCUS_CLASS}`}
        >
          View all services
          <ArrowUpRight className={ARROW_CLASS} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export function ServicePathsIndex() {
  return (
    <div className="flex flex-col gap-14 sm:gap-16">
      {serviceGroups.map((group) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-title`}
          className="scroll-mt-24"
        >
          <div className="grid grid-cols-1 gap-6 border-t border-line-strong pt-6 lg:grid-cols-[1fr_2.2fr] lg:gap-12">
            <div>
              <h2
                id={`${group.id}-title`}
                className="text-lead font-semibold tracking-[-0.02em] text-ink"
              >
                {group.label}
              </h2>
              <p className="mt-2 max-w-[360px] text-small leading-[1.6] text-body">
                {group.summary}
              </p>
              <p className="mt-4 text-small text-body">
                {group.services.length} services
              </p>
            </div>

            <ul className="border-t border-line">
              {group.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group -mx-4 grid min-w-0 grid-cols-1 gap-1 border-b border-line px-4 py-5 transition-colors hover:bg-surface focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:-mx-5 sm:grid-cols-[minmax(180px,240px)_minmax(0,1fr)_24px] sm:items-baseline sm:gap-6 sm:px-5"
                  >
                    <span className="text-small font-semibold text-ink transition-colors group-hover:text-link">
                      {service.title}
                    </span>
                    <span className="text-small leading-[1.55] text-body">
                      {service.lede}
                    </span>
                    <ArrowUpRight
                      className="hidden h-4 w-4 justify-self-end text-body transition-colors group-hover:text-link sm:block"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
