import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";
import { about } from "@/lib/about";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: about.title,
  description: about.lede,
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
