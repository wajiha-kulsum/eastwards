import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

/* Static routes + the services index + every service page. Insights posts
   ship only when the article routes exist (they are 404 placeholders today).
   No lastModified: a build-time date claims every page changed on every
   deploy and teaches crawlers to ignore the field. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/partners", "/contact", "/services"].map(
    (path) => ({ url: `${SITE_URL}${path}` })
  );
  const services = servicePages.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
  }));
  return [...staticRoutes, ...services];
}
