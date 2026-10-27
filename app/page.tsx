import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CoreValues } from "@/components/CoreValues";
import BlogShowcase from "@/components/BlogShowcase";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <Features />
      <CoreValues />
      <BlogShowcase />
    </main>
  );
}
