import type { Metadata } from "next";
import Link from "next/link";
import BlogShowcase from "@/components/BlogShowcase";
import ServiceHero from "@/components/services/ServiceHero";
import { features, servicePages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

/* Services index: the page every "Services" gateway (nav, hero and features
   CTAs) lands on, and the hub that links all service pages in one crawlable
   list. Copy is existing approved copy — the lede is the Features statement. */

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description: features.body,
  path: "/services",
});

const COLUMNS = 3;

export default function ServicesIndexRoute() {
  // Complete the hairline rectangle when the last row is partial, same
  // recipe as the service pages' card grids.
  const fillers = COLUMNS - (servicePages.length % COLUMNS);
  return (
    <main id="main" className="bg-page text-ink">
      <div className="mx-auto max-w-[1720px] px-6 pt-3 sm:px-10 lg:px-[5.35%]">
        <ServiceHero title="Services" lede={features.body} />

        <section className="mt-10 sm:mt-14 lg:mt-16">
          <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group border-b border-r border-line p-6 transition-colors hover:border-line-strong sm:p-8"
              >
                <h2 className="text-lead font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-primary">
                  {service.title}
                </h2>
                <p className="mt-2 max-w-[420px] text-small leading-[1.6] text-body">
                  {service.lede}
                </p>
              </Link>
            ))}
            {fillers < COLUMNS
              ? Array.from({ length: fillers }).map((_, i) => (
                  <div
                    key={`filler-${i}`}
                    aria-hidden="true"
                    className="hidden border-b border-r border-line lg:block"
                  />
                ))
              : null}
          </div>
        </section>
      </div>

      <BlogShowcase />
    </main>
  );
}
