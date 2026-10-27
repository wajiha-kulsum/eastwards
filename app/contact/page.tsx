import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Ready to move forward? Have a challenge you're trying to solve or a technology initiative you're planning? Get in touch with Eastwards Consulting.",
  path: "/contact",
});

export default function ContactRoute() {
  return <ContactPage />;
}
