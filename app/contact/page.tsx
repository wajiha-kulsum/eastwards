import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { ContactHero } from "@/components/contact/ContactHero";
import { LocationCards } from "@/components/contact/LocationCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { DirectChannels } from "@/components/contact/DirectChannels";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us — Eastwards Consulting",
  description:
    "Ready to move forward? Have a challenge you're trying to solve or a technology initiative you're planning? Get in touch with Eastwards Consulting.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-neutral-800 antialiased">
      <Navbar />
      <main className="flex-1">
        <ContactHero />

        {/* Two-column interaction section: Location Cards & Form */}
        <section className="mx-auto mt-12 max-w-[1440px] px-4 md:mt-16 md:px-[17px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <LocationCards />
            <ContactForm />
          </div>
        </section>

        <DirectChannels />
      </main>
      <Footer />
    </div>
  );
}
