import type { Metadata } from "next";
import BlogShowcase from "@/components/BlogShowcase";
import { ServicePathsIndex } from "@/components/ServicePaths";
import ServiceHero from "@/components/services/ServiceHero";
import { features } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

/* Services index: the page every "Services" gateway lands on, and the hub
   that links all service pages in one crawlable list. Services are grouped
   into the three buying paths from lib/service-groups: build, operate,
   secure. */

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description: features.body,
  path: "/services",
});

export default function ServicesIndexRoute() {
  return (
    <main id="main" className="bg-page text-ink">
      <div className="mx-auto max-w-[1720px] px-6 pt-3 sm:px-10 lg:px-[5.35%]">
        <ServiceHero title="Services" lede={features.body} />

        <section className="mt-10 sm:mt-14 lg:mt-16">
          <ServicePathsIndex />
        </section>
      </div>

      <BlogShowcase />
    </main>
  );
}
