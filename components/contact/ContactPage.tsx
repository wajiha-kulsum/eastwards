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

  /* Phase-lock the grey dot field to the blue arrow's own 8px dot grid, so
     both read as one continuous grid. Re-snap on any layout change —
     a window resize is not the only thing that moves these elements. */
  const heroRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const arrow = arrowRef.current;
    const band = bandRef.current;
    const h1 = h1Ref.current;
    if (!hero || !arrow || !band || !h1) return;

    const mod = (n: number) => ((n % 8) + 8) % 8;
    const snap = () => {
      const heroBox = hero.getBoundingClientRect();
      const arrowBox = arrow.getBoundingClientRect();
      const h1Box = h1.getBoundingClientRect();
      /* Pin the band's top edge to the arrow's top edge: no grey row may
         render above the blue arrow's first dot row. */
      band.style.top = `${arrowBox.top - heroBox.top}px`;
      const bandTop = band.getBoundingClientRect().top - heroBox.top;
      const gx = mod(arrowBox.left - heroBox.left);
      hero.style.setProperty("--gx", `${gx}px`);
      hero.style.setProperty(
        "--gy",
        `${mod(arrowBox.top - heroBox.top - bandTop)}px`
      );
      /* The heading's white plate must not chop dots: widen it leftwards so
         its edge lands exactly between two columns of the dot lattice. */
      const punch = mod(h1Box.left - heroBox.left - gx);
      if (punch > 0.25) {
        h1.style.boxShadow = `${-punch}px 0 0 0 #fff`;
      } else {
        h1.style.boxShadow = "none";
      }
    };

    snap();
    const watch = new ResizeObserver(snap);
    watch.observe(hero);
    watch.observe(arrow);
    watch.observe(band);
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
        {/* Hero — grey dot field, phase-locked to the arrow's dot grid */}
        <section
          ref={heroRef}
          className="relative min-h-[120px] overflow-hidden pt-3"
        >
          <div
            ref={bandRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[20px] top-[27px]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #d9dce3 1.2px, transparent 1.6px)",
              backgroundSize: "8px 8px",
              backgroundPosition: "var(--gx, 0px) var(--gy, 0px)",
            }}
          />

          {/* Heading and blue dotted arrow */}
          <div className="relative flex items-center py-1.5">
            <h1
              ref={h1Ref}
              className="bg-white pl-2 pr-2 text-[clamp(2.5rem,8vw,4.6rem)] font-bold uppercase leading-none tracking-[-0.03em]"
            >
              {contact.title}
            </h1>

            <svg
              ref={arrowRef}
              aria-hidden="true"
              viewBox="0 0 24 56"
              className="h-14 w-6 shrink-0 fill-[#2869ff]"
            >
              <g>
                <circle cx="4" cy="4" r="1.5" />
                <circle cx="4" cy="12" r="1.5" />
                <circle cx="4" cy="20" r="1.5" />
                <circle cx="4" cy="28" r="1.5" />
                <circle cx="4" cy="36" r="1.5" />
                <circle cx="4" cy="44" r="1.5" />
                <circle cx="4" cy="52" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="20" r="1.5" />
                <circle cx="12" cy="28" r="1.5" />
                <circle cx="12" cy="36" r="1.5" />
                <circle cx="12" cy="44" r="1.5" />
                <circle cx="20" cy="20" r="1.5" />
                <circle cx="20" cy="28" r="1.5" />
                <circle cx="20" cy="36" r="1.5" />
              </g>
            </svg>
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
            <p className="relative mb-4 max-w-[600px] text-[clamp(19px,4.2vw,30px)] font-medium leading-[1.2] tracking-[-0.04em] text-ink">
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
            className="flex flex-col rounded-[24px] border border-[#e9e9e9] bg-[#fafafa] p-3.5 sm:p-4"
          >
            <div className="flex-1 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1 block text-[12px] font-medium tracking-tight"
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
                  className="h-[30px] w-full rounded-[9px] border border-transparent bg-[#ededed] px-3 text-[11px] outline-none transition placeholder:text-[#858585] focus:border-[#2869ff] focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1 block text-[12px] font-medium tracking-tight"
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
                  className="h-[30px] w-full rounded-[9px] border border-transparent bg-[#ededed] px-3 text-[11px] outline-none transition placeholder:text-[#858585] focus:border-[#2869ff] focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-[12px] font-medium tracking-tight"
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
                  className="h-[30px] w-full rounded-[9px] border border-transparent bg-[#ededed] px-3 text-[11px] outline-none transition placeholder:text-[#858585] focus:border-[#2869ff] focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-1 block text-[12px] font-medium tracking-tight"
                >
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Company Name"
                  className="h-[30px] w-full rounded-[9px] border border-transparent bg-[#ededed] px-3 text-[11px] outline-none transition placeholder:text-[#858585] focus:border-[#2869ff] focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-1 block text-[12px] font-medium tracking-tight"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Your Message Here"
                  required
                  className="min-h-[70px] w-full resize-y rounded-[9px] border border-transparent bg-[#ededed] px-3 py-2.5 text-[11px] outline-none transition placeholder:text-[#858585] focus:border-[#2869ff] focus:bg-white"
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
                className="ml-auto inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#4a4a4a] px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Message"}
                <ArrowUpRight size={15} />
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
