import type { Metadata } from "next";
import ResponsibilityPage from "@/components/responsibility/ResponsibilityPage";
import { pageMetadata } from "@/lib/seo";
import { responsibility } from "@/lib/responsibility";

export const metadata: Metadata = pageMetadata({
  title: responsibility.title,
  description: responsibility.description,
  path: "/responsibility",
});

export default function ResponsibilityRoute() {
  return <ResponsibilityPage />;
}
