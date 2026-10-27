import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/services/ServicePage";
import { JsonLd } from "@/components/SeoJsonLd";
import { features, servicePages } from "@/lib/content";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

const services = servicePages;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return pageMetadata({
    title: service ? service.title : "Services",
    description: service ? service.lede : features.body,
    path: service ? `/services/${service.slug}` : "/services",
  });
}

export default async function ServiceRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.lede,
          url: `${SITE_URL}/services/${service.slug}`,
          provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }}
      />
      <ServicePage service={service} />
    </>
  );
}
