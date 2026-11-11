import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Big ideas deserve a clear path to execution. Tell us about your goals and challenges, and a member of the Eastwards team will reach out within one business day.",
  path: "/contact",
});

export default function ContactRoute() {
  return <ContactPage />;
}
