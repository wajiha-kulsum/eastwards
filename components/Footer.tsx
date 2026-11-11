import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FooterCta } from "@/components/FooterCta";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { contact, footer, nav } from "@/lib/content";
import { serviceLinks, type ServiceLink } from "@/lib/service-groups";

/* Black footer band on the site's lane (1720px cap, 5.35% lanes), top to
   bottom: the closing call to action (not on the homepage), the brand row
   with the socials, the link groups the header menu uses, the contact strip
   (Singapore HQ, both phone lines, email), then the legal row.
   The link groups sit full width so no service name wraps from 1280: four
   content-sized columns spread across the lane. Below 640 each group folds
   into an accordion, so the footer stays about a screen tall on phones.
   Every link goes somewhere real. */

/* py-1 lifts every link past the 24px target minimum (padding on an inline
   link still counts toward its hit area); the sweep underline is drawn on
   the content box, so it stays right under the text on every line. */
const LINK_CLASS =
  "link-underline-sweep rounded-sm py-1 text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
/* Phone rows: 44px tall touch targets. No sweep underline here, it would
   sit under the padding instead of the text. */
const ROW_CLASS = `inline-flex min-h-11 items-center rounded-sm text-white/70 transition-colors hover:text-white ${FOCUS_RING}`;

const SOCIAL_ICONS = {
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  LinkedIn: LinkedinIcon,
} as const;

function FooterLink({ link, row = false }: { link: ServiceLink; row?: boolean }) {
  const className = row ? ROW_CLASS : LINK_CLASS;
  const label = (
    <>
      {link.label}
      {link.enquire && <span className="sr-only">, {nav.enquire.toLowerCase()}</span>}
    </>
  );
  return (
    <li className={row ? "flex items-center" : undefined}>
      {link.href.startsWith("/") ? (
        <Link href={link.href} className={className}>
          {label}
        </Link>
      ) : (
        <a href={link.href} className={className}>
          {label}
        </a>
      )}
      {/* a tag, not part of the name: services without a page open the form */}
      {link.enquire && (
        <span
          aria-hidden="true"
          className="ml-2 inline-block whitespace-nowrap rounded-sm border border-white/20 px-1.5 align-middle text-small leading-tight text-white/60"
        >
          {nav.enquire}
        </span>
      )}
    </li>
  );
}

type Group = { id: string; title: string; links: readonly ServiceLink[] };

/* From 640: open columns, every heading on one row */
function OpenGroup({ group }: { group: Group }) {
  return (
    <div className="min-w-0">
      <h2 className="text-small font-semibold text-white">{group.title}</h2>
      <ul className="mt-3 space-y-1 text-pretty">
        {group.links.map((link) => (
          <FooterLink key={link.href} link={link} />
        ))}
      </ul>
    </div>
  );
}

/* Below 640: the mobile menu's accordion, rows tall enough to tap */
function FoldedGroup({ group }: { group: Group }) {
  return (
    <details className="group border-b border-white/10">
      <summary
        className={`flex min-h-14 cursor-pointer list-none items-center justify-between rounded-sm font-semibold text-white [&::-webkit-details-marker]:hidden ${FOCUS_RING}`}
      >
        {group.title}
        <ChevronDown
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-white/70 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>
      <ul className="pb-4">
        {group.links.map((link) => (
          <FooterLink key={link.href} link={link} row />
        ))}
      </ul>
    </details>
  );
}

export function Footer() {
  const { location, call } = contact;
  const email = contact.directChannels.channels[0].email;
  const [build, operate, secure] = serviceLinks;
  const groups: Group[] = [
    { id: secure.id, title: secure.label, links: secure.links },
    { id: build.id, title: build.label, links: build.links },
    { id: operate.id, title: operate.label, links: operate.links },
    { id: "company", title: footer.company.title, links: footer.company.items },
  ];

  return (
    <footer className="mt-16 border-t border-transparent bg-band text-small text-white dark:border-line print:hidden">
      <div className="mx-auto w-full max-w-[1720px] px-6 pb-10 pt-14 sm:px-10 lg:px-[5.35%] lg:pt-16">
        <FooterCta />

        {/* Brand row: logo and tagline, socials opposite from 1024 */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Logo className="text-white" />
            <p className="mt-3 max-w-[300px] text-balance text-white/70">{footer.tagline}</p>
          </div>
          <ul aria-label="Social media" className="flex flex-wrap gap-x-6">
            {footer.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.label];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Eastwards on ${social.label} (opens in a new tab)`}
                    className={`${ROW_CLASS} sm:min-h-8`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Icon className="h-[18px] w-[18px] shrink-0" />
                      {social.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Footer" className="mt-8 sm:mt-10 lg:mt-12">
          <div className="border-t border-white/10 sm:hidden">
            {groups.map((group) => (
              <FoldedGroup key={group.id} group={group} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-10 max-sm:hidden xl:grid-cols-[repeat(4,max-content)] xl:justify-between">
            {groups.map((group) => (
              <OpenGroup key={group.id} group={group} />
            ))}
          </div>
        </nav>

        {/* Contact strip: where we are, both phone lines, the main inbox */}
        <div className="mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 max-sm:border-t-0 max-sm:pt-0 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:mt-14 lg:grid-cols-3 lg:gap-10">
          <div>
            <h2 className="font-semibold text-white">{location.title}</h2>
            <address className="mt-2 not-italic text-white/70">
              {/* three short lines, so "Road" never wraps alone */}
              <span className="block">{location.building}</span>
              <span className="block">
                {location.street}, {location.unit}
              </span>
              <span className="block">{location.postalCode}</span>
            </address>
          </div>
          <div>
            <h2 className="font-semibold text-white">{footer.reach.call}</h2>
            <ul className="mt-1">
              {call.phones.map((phone) => (
                <li key={phone.number} className="flex flex-wrap items-baseline gap-x-3">
                  <a href={`tel:${phone.number.replace(/\s/g, "")}`} className={LINK_CLASS}>
                    {phone.number}
                  </a>
                  <span className="text-white/60">{phone.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-white">{footer.reach.email}</h2>
            <a href={`mailto:${email}`} className={`${LINK_CLASS} mt-1`}>
              {email}
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-white/60 lg:flex-row lg:items-center lg:justify-between">
          <p>{footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-1">
            {footer.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={LINK_CLASS}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
