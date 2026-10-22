import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/content";

/* Static routes + every service page; Insights posts ship only when the
   article routes exist (they are 404 placeholders today). */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/partners", "/contact"].map((path) => ({
    url: `https://eastwards.co${path}`,
    lastModified: new Date(),
  }));
  const services = servicePages.map((service) => ({
    url: `https://eastwards.co/services/${service.slug}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...services];
}
