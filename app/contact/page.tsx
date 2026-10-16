import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us — Eastwards Consulting",
  description:
    "Ready to move forward? Have a challenge you're trying to solve or a technology initiative you're planning? Get in touch with Eastwards Consulting.",
};

export default function ContactRoute() {
  return (
    <>
      <Navbar />
      <ContactPage />
    </>
  );
}
