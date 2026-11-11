import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { terms } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: terms.title,
  description: terms.description,
  path: terms.path,
});

export default function TermsRoute() {
  return <LegalPage doc={terms} />;
}
