import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacy } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: privacy.title,
  description: privacy.description,
  path: privacy.path,
});

export default function PrivacyRoute() {
  return <LegalPage doc={privacy} />;
}
