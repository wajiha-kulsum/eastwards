"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import DotHero from "@/components/DotHero";
import { contact } from "@/lib/content";

export function ContactPage() {
  // shortcut: duplicates lib/content.ts (directChannels/location/call) — keep
  // the two in sync or pick one source when the contact API lands
  const channels = [
    { title: "General Inquiries", email: "info@eastwards.co" },
    { title: "Business & Partnerships", email: "partners@eastwards.co" },
    { title: "Careers & Talent", email: "careers@eastwards.co" },
    { title: "Media & Press", email: "media@eastwards.co" },
  ];

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Do not show a success message until the backend confirms.
    try {
      setSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Unable to send your message.");
      }

      setStatus("Thank you! Your message has been sent.");
      form.reset();
    } catch {
      setStatus(
        "We couldn't send your message. Please email info@eastwards.co."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main id="main" className="flex-1 bg-white text-black">
      <div className="mx-auto max-w-[1720px] px-6 pb-16 pt-3 sm:px-10 lg:px-[5.35%]">
        {/* Hero — grey dot field behind the heading */}
        <DotHero title={contact.title} lede={contact.subtitle} />

        {/* Contact information + form */}
        <section className="mt-9 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.06fr]">
          {/* Left column — mirrors the form's padding so the top row of copy
              sits level with the form's first field; flex + mt-auto keeps the
              card row and the Send button finishing on the same line */}
          <div className="flex flex-col pt-4 sm:pt-5">
            <p className="mb-4 text-[15px] font-semibold tracking-[-0.04em] text-[#2869ff]">
              / get in touch /
            </p>

            {/* Question and pitch in one text block — same size and weight
                throughout, one break after the first question mark */}
            <p className="relative mb-4 max-w-[600px] text-[clamp(17px,3.6vw,26px)] font-medium leading-[1.2] tracking-[-0.04em] text-ink">
              {contact.headline.split("?")[0]}?
              <br />
              <span className="text-[#777777]">
                {contact.headline.split("?").slice(1).join("?").trim()}
              </span>
            </p>

            <div className="flex-1 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {/* Location card */}
              <article className="flex min-h-[190px] flex-col rounded-[23px] bg-[#4868ff] p-5 text-white sm:p-6">
                <MapPin
                  size={30}
                  strokeWidth={2.7}
                  fill="white"
                  className="mb-3 text-[#4868ff]"
                />

                <h3 className="mb-2 text-[18px] font-semibold tracking-[-0.04em]">
                  Our Location
                </h3>

                <address className="text-[14px] not-italic leading-[1.45] text-white/95">
                  Singapore Headquarters
                  <br />
                  Eastwards Consulting Pte Ltd
                  <br />
                  Chinatown Point
                  <br />
                  Singapore 059 413
                </address>
              </article>

              {/* Phone card */}
              <article className="min-h-[190px] rounded-[23px] border border-[#e9e9e9] bg-[#fafafa] p-5 sm:p-6">
                <Phone
                  size={24}
                  fill="#3971ff"
                  className="mb-3 text-[#3971ff]"
                />

                <h3 className="mb-2 text-[18px] font-semibold tracking-[-0.04em] text-[#2869ff]">
                  Call Us
                </h3>

                <div className="space-y-1 text-[14px] leading-relaxed text-[#858585]">
                  <a
                    href="tel:+6593756413513"
                    className="block transition hover:text-[#2869ff]"
                  >
                    +65 93756 413513
                  </a>
                  <a
                    href="tel:+919912596699"
                    className="block transition hover:text-[#2869ff]"
                  >
                    +91 99125 96699
                  </a>
                </div>
              </article>
            </div>
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="flex min-w-0 flex-col rounded-[24px] border border-[#e9e9e9] bg-[#fafafa] p-5 sm:p-6 lg:p-7"
          >
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:gap-y-5">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1.5 block text-[14px] font-medium tracking-tight text-ink"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="John"
                  required
                  className="h-12 w-full rounded-[12px] border border-transparent bg-[#ededed] px-3.5 text-[15px] text-ink outline-none transition placeholder:text-[#6b6b6b] focus:border-[#2869ff] focus:bg-white focus:ring-2 focus:ring-[#2869ff]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1.5 block text-[14px] font-medium tracking-tight text-ink"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Doe"
                  required
                  className="h-12 w-full rounded-[12px] border border-transparent bg-[#ededed] px-3.5 text-[15px] text-ink outline-none transition placeholder:text-[#6b6b6b] focus:border-[#2869ff] focus:bg-white focus:ring-2 focus:ring-[#2869ff]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[14px] font-medium tracking-tight text-ink"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="yourmail@gmail.com"
                  required
                  className="h-12 w-full rounded-[12px] border border-transparent bg-[#ededed] px-3.5 text-[15px] text-ink outline-none transition placeholder:text-[#6b6b6b] focus:border-[#2869ff] focus:bg-white focus:ring-2 focus:ring-[#2869ff]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-1.5 block text-[14px] font-medium tracking-tight text-ink"
                >
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Company Name"
                  className="h-12 w-full rounded-[12px] border border-transparent bg-[#ededed] px-3.5 text-[15px] text-ink outline-none transition placeholder:text-[#6b6b6b] focus:border-[#2869ff] focus:bg-white focus:ring-2 focus:ring-[#2869ff]/20"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-[14px] font-medium tracking-tight text-ink"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Your Message Here"
                  required
                  className="min-h-[140px] w-full resize-y rounded-[12px] border border-transparent bg-[#ededed] px-3.5 py-3 text-[15px] leading-relaxed text-ink outline-none transition placeholder:text-[#6b6b6b] focus:border-[#2869ff] focus:bg-white focus:ring-2 focus:ring-[#2869ff]/20"
                />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p
                role="status"
                aria-live="polite"
                className="max-w-[320px] text-sm leading-relaxed text-neutral-700"
              >
                {status}
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-full bg-[#2868ff] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1555ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2868ff] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Message"}
                <ArrowUpRight size={14} />
              </button>
            </div>
          </form>
        </section>

        {/* Direct channels */}
        <section className="mt-14 sm:mt-16">
          <h2 className="text-[25px] font-medium tracking-[-0.055em] sm:text-[27px]">
            Direct Channels
          </h2>

          <p className="mt-1 text-[14px] leading-relaxed text-[#7a7a7a] sm:text-[15px]">
            Need to reach a specific department? Use the direct lines below
            for a faster response.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-5 rounded-[9px] border border-[#ededed] bg-[#fafafa] px-5 py-7 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:py-8">
            {channels.map((channel) => (
              <div key={channel.email} className="min-w-0 text-center">
                <h3 className="mb-2 text-[14px] font-semibold text-[#4a4a4a]">
                  {channel.title}
                </h3>

                <a
                  href={`mailto:${channel.email}`}
                  className="inline-flex max-w-full items-center justify-center gap-2 text-[13px] text-[#292929] transition hover:text-[#2869ff] sm:text-[14px]"
                >
                  <Mail
                    size={18}
                    fill="#55585e"
                    className="shrink-0 text-white"
                  />
                  <span className="break-all">{channel.email}</span>
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
