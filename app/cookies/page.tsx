import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { cookiePolicy } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: cookiePolicy.title,
  description: cookiePolicy.description,
  path: cookiePolicy.path,
});

export default function CookiesRoute() {
  return <LegalPage doc={cookiePolicy} />;
}
