"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
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

  /* Nudge the blue play mark onto the grey field's 8px lattice so every blue
     dot lands exactly on a grey one and covers it — never more than one tile
     of shift. Observes the band and the heading row (never the mark itself:
     translate moves its box, which would re-trigger the observer forever). */
  const bandRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const logo = logoRef.current;
    const row = rowRef.current;
    if (!band || !logo || !row) return;

    const mod = (n: number) => ((n % 8) + 8) % 8;
    /* Blue dots are 4px: their centres sit 2px inside the mark's box while
       grey centres sit 4px inside a tile, so align centres, not box edges.
       At 4px the blue fully covers the grey beneath — no fringe. */
    const DOT_DELTA = 2;
    const snap = () => {
      const bandBox = band.getBoundingClientRect();
      const logoBox = logo.getBoundingClientRect();
      logo.style.translate = `${-mod(logoBox.left - bandBox.left - DOT_DELTA)}px ${-mod(logoBox.top - bandBox.top - DOT_DELTA)}px`;
    };

    snap();
    const watch = new ResizeObserver(snap);
    watch.observe(band);
    watch.observe(row);
    window.addEventListener("resize", snap);
    return () => {
      watch.disconnect();
      window.removeEventListener("resize", snap);
    };
  }, []);

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
    <main className="flex-1 bg-white text-black">
      <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-3 sm:px-10 lg:px-[5.35%]">
        {/* Hero — grey dot field behind the heading */}
        <section className="relative min-h-[120px] overflow-hidden pt-3">
          <div
            ref={bandRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[20px] top-[27px]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #d9dce3 1.2px, transparent 1.6px)",
              backgroundSize: "8px 8px",
            }}
          />

          {/* Heading + blue dotted play mark echoing the eastwards logo */}
          <div ref={rowRef} className="relative flex items-center py-1.5">
            <h1 className="bg-white pl-2 pr-4 text-[clamp(2.5rem,8vw,4.6rem)] font-bold uppercase leading-none tracking-[-0.03em]">
              {contact.title}
            </h1>
            <div
              ref={logoRef}
              aria-hidden="true"
              className="grid shrink-0 grid-cols-[repeat(4,4px)] gap-[4px] self-center"
            >
              {Array.from({ length: 28 }).map((_, i) => {
                const col = i % 4;
                const row = Math.floor(i / 4);
                const blue = row >= col && row <= 6 - col;
                return (
                  <span
                    key={i}
                    className={`h-1 w-1 rounded-full ${
                      blue ? "bg-[#2869ff]" : ""
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Supporting copy */}
          <p className="relative mb-3.5 ml-auto mt-7 max-w-[235px] bg-white px-2.5 py-1.5 text-right text-[0.8rem] leading-[1.35] text-[#1a1a1a] max-sm:mt-5 max-sm:max-w-none">
            {contact.subtitle}
          </p>
        </section>

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
            className="flex flex-col rounded-[24px] border border-[#e9e9e9] bg-[#fafafa] p-3 sm:p-3.5"
          >
            <div className="flex-1 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1 block text-[11px] font-medium tracking-tight"
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
                  className="h-[28px] w-full rounded-[9px] border border-transparent bg-[#ededed] px-3 text-[11px] outline-none transition placeholder:text-[#858585] focus:border-[#2869ff] focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1 block text-[11px] font-medium tracking-tight"
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
                  className="h-[28px] w-full rounded-[9px] border border-transparent bg-[#ededed] px-3 text-[11px] outline-none transition placeholder:text-[#858585] focus:border-[#2869ff] focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-[11px] font-medium tracking-tight"
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
                  className="h-[28px] w-full rounded-[9px] border border-transparent bg-[#ededed] px-3 text-[11px] outline-none transition placeholder:text-[#858585] focus:border-[#2869ff] focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-1 block text-[11px] font-medium tracking-tight"
                >
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Company Name"
                  className="h-[28px] w-full rounded-[9px] border border-transparent bg-[#ededed] px-3 text-[11px] outline-none transition placeholder:text-[#858585] focus:border-[#2869ff] focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-1 block text-[11px] font-medium tracking-tight"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Your Message Here"
                  required
                  className="min-h-[64px] w-full resize-y rounded-[9px] border border-transparent bg-[#ededed] px-3 py-2.5 text-[11px] outline-none transition placeholder:text-[#858585] focus:border-[#2869ff] focus:bg-white"
                />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p
                role="status"
                aria-live="polite"
                className="max-w-[250px] text-xs text-neutral-600"
              >
                {status}
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="ml-auto inline-flex min-h-[36px] items-center gap-2 rounded-full bg-[#4a4a4a] px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
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
