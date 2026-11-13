import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import PageShell from "@/components/ui/PageShell";
import { ContactForm } from "@/components/contact/ContactForm";
import { DotMap } from "@/components/contact/DotMap";
import { contact } from "@/lib/content";

/* Contact page, laid out wide (after entersoftsecurity.com/contact): the
   first screen is the heading, intro, next steps and direct lines on the
   left with the form beside them, then one black band with the team
   addresses, the dot map and the Singapore office. */
export function ContactPage() {
  const { intro, next, ways, location, call, directChannels, form } = contact;
  const lastStep = next.steps.length - 1;
  const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const link = `link-underline-sweep rounded-sm font-medium text-ink transition-colors hover:text-link ${focusRing}`;

  return (
    <PageShell pb="pb-16" wide>
      {/* Phones read heading, form, next steps, direct lines. From 1024 the
          form sits beside the other three, level with the heading. */}
      <section
        aria-labelledby="contact-heading"
        className="grid grid-cols-1 gap-8 pt-8 sm:pt-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.2fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_auto_1fr] lg:gap-x-12 lg:pt-10 xl:gap-x-16"
      >
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="text-small font-semibold text-link">{contact.title}</p>
          <h1
            id="contact-heading"
            className="mt-3 max-w-[16ch] text-balance font-display text-title font-bold leading-[1.05] tracking-[-0.03em] text-ink"
          >
            {intro.title}
          </h1>
          {intro.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-4 max-w-[60ch] text-pretty text-small leading-[1.6] text-body">
              {paragraph}
            </p>
          ))}
        </div>

        <div id="contact-form" className="min-w-0 scroll-mt-24 lg:col-start-2 lg:row-span-3 lg:row-start-1">
          <ContactForm />
        </div>

        <div className="rounded-3xl bg-primary p-6 text-white sm:p-7 lg:col-start-1 lg:row-start-2">
          <h2 className="text-small font-semibold">{next.title}</h2>
          {/* one row from 640, the steps read left to right */}
          <ol className="mt-5 grid gap-5 sm:grid-cols-3 sm:gap-4">
            {next.steps.map((step, index) => (
              <li key={step} className="relative flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
                {index < lastStep && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-5 left-[15.5px] top-9 w-px bg-white/40 sm:bottom-auto sm:left-10 sm:right-1 sm:top-4 sm:h-px sm:w-auto"
                  />
                )}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-small font-semibold tabular-nums ring-1 ring-inset ring-white/60">
                  {index + 1}
                </span>
                <span className="text-pretty text-small font-semibold">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Direct lines, for visitors who'd rather not use the form */}
        <div className="lg:col-start-1 lg:row-start-3">
          <h2 className="text-small font-semibold text-ink">{ways.label}</h2>
          <dl className="mt-3 divide-y divide-line border-y border-line text-small">
            <div className="flex items-center gap-4 py-3">
              <dt className="flex w-24 shrink-0 items-center gap-2.5 text-body">
                <Mail className="h-4 w-4 text-link" aria-hidden="true" />
                {ways.email}
              </dt>
              <dd className="min-w-0">
                <a href={`mailto:${form.inbox}`} className={link}>
                  {form.inbox}
                </a>
              </dd>
            </div>
            <div className="flex items-start gap-4 py-3">
              <dt className="flex w-24 shrink-0 items-center gap-2.5 text-body">
                <Phone className="h-4 w-4 text-link" aria-hidden="true" />
                {ways.call}
              </dt>
              <dd className="space-y-1">
                {call.phones.map((phone) => (
                  <span key={phone.number} className="block">
                    <a href={`tel:${phone.number.replace(/\s/g, "")}`} className={link}>
                      {phone.number}
                    </a>
                    <span className="block text-body sm:inline"> {phone.label}</span>
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex items-center gap-4 py-3">
              <dt className="flex w-24 shrink-0 items-center gap-2.5 text-body">
                <MapPin className="h-4 w-4 text-link" aria-hidden="true" />
                {ways.visit}
              </dt>
              <dd>
                <a href="#headquarters" className={link}>
                  {location.building}, {location.street}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Teams and headquarters, the page's one black band */}
      <section id="teams" aria-labelledby="teams-heading" className="mt-14 rounded-3xl bg-band p-6 text-small text-white sm:mt-16 sm:p-8 lg:p-10 dark:ring-1 dark:ring-inset dark:ring-line">
        {/* side by side from 1280, below that the directory needs the full width */}
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] xl:items-center xl:gap-16">
          <div>
            <h2 id="teams-heading" className="text-lead font-medium tracking-[-0.02em]">
              {directChannels.title}
            </h2>
            <p className="mt-2 max-w-[48ch] text-pretty text-white/70">{directChannels.subtitle}</p>
            <dl className="mt-6">
              {[...directChannels.channels, directChannels.legal].map((channel) => (
                <div
                  key={channel.email}
                  className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-white/10 py-3 sm:py-4"
                >
                  <dt className="font-semibold">{channel.department}</dt>
                  <dd>
                    <a href={`mailto:${channel.email}`} className={`link-underline-sweep rounded-sm font-medium text-white ${focusRing}`}>
                      {channel.email}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="w-full max-w-[560px] xl:max-w-none">
            <DotMap label={location.mapLabel} />
          </div>
        </div>

        {/* headquarters runs the full width, under both columns, and opens
            with a photo of the district the office is in. Stacked on phones,
            photo beside the details from 768, one row from 1280. */}
        <div id="headquarters" className="mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 md:grid-cols-[240px_minmax(0,1fr)] md:items-center md:gap-x-10">
          {/* placeholder tone sampled from the photo */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/10">
            <Image src={location.photo.src} alt={location.photo.alt} fill sizes="(min-width: 768px) 240px, 100vw" className="object-cover" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] xl:items-center xl:gap-10">
            <div>
              <h3 className="font-semibold">{location.visit.title}</h3>
              <p className="mt-2 max-w-[44ch] text-pretty text-white/75">{location.visit.body}</p>
              <address className="mt-3 not-italic text-white/75">
                {location.company}
                <span className="block">
                  {location.street}, {location.unit} {location.building}
                </span>
                <span className="block">{location.postalCode}</span>
              </address>
            </div>
            <ul className="flex flex-wrap gap-x-10 gap-y-3 xl:block xl:space-y-3">
              {call.phones.map((phone) => (
                <li key={phone.number}>
                  <span className="block text-white/65">{phone.label}</span>
                  <a href={`tel:${phone.number.replace(/\s/g, "")}`} className={`link-underline-sweep rounded-sm font-medium text-white ${focusRing}`}>
                    {phone.number}
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <a
                href={location.directions.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 font-semibold text-white ring-1 ring-inset ring-white/40 transition-colors hover:bg-white/10 ${focusRing}`}
              >
                {location.directions.label}
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
