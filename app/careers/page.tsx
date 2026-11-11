import type { Metadata } from "next";
import CareersPage from "@/components/careers/CareersPage";
import { careers } from "@/lib/careers";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: careers.title,
  description: careers.description,
  path: "/careers",
});

export default function CareersRoute() {
  return <CareersPage />;
}
