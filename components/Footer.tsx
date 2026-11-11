import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { contact, footer, nav } from "@/lib/content";
import { serviceLinks, type ServiceLink } from "@/lib/service-groups";

/* Black footer band on the site's lane (1720px cap, 5.35% lanes): company
   details, the service groups the header menu uses, company links, then the
   legal row. Phones stack the details above two link columns; from 1024 the
   details sit beside the links. Every link goes somewhere real. */

const LINK_CLASS =
  "link-underline-sweep rounded-sm text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const SOCIAL_ICONS = {
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  LinkedIn: LinkedinIcon,
} as const;

function FooterLink({ link }: { link: ServiceLink }) {
  return (
    <li>
      {link.href.startsWith("/") ? (
        <Link href={link.href} className={LINK_CLASS}>
          {link.label}
        </Link>
      ) : (
        <a href={link.href} className={LINK_CLASS}>
          {link.label}
        </a>
      )}
      {/* a plain space, not a margin, so a wrapped tag starts flush left */}
      {link.enquire && <> <span className="whitespace-nowrap text-white/55">{nav.enquire}</span></>}
    </li>
  );
}

function Group({ title, links }: { title: string; links: readonly ServiceLink[] }) {
  return (
    <div>
      <h2 className="text-small font-semibold text-white">{title}</h2>
      <ul className="mt-3 space-y-2 text-pretty">
        {links.map((link) => (
          <FooterLink key={link.href} link={link} />
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { location } = contact;
  const phone = contact.call.phones[0].number;
  const email = contact.directChannels.channels[0].email;
  const [build, operate, secure] = serviceLinks;

  return (
    <footer className="mt-16 border-t border-transparent bg-band text-small text-white dark:border-line">
      <div className="mx-auto w-full max-w-[1720px] px-6 pb-10 pt-14 sm:px-10 lg:px-[5.35%] lg:pt-16">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,3fr)] lg:gap-x-12">
          <div>
            <Logo className="text-white" />
            <p className="mt-3 max-w-[300px] text-balance text-white/70">{footer.tagline}</p>
            <address className="mt-8 not-italic text-white/70">
              <span className="block font-medium text-white">{location.title}</span>
              {/* three short lines, so "Road" never wraps alone */}
              <span className="block">{location.building}</span>
              <span className="block">{location.street}</span>
              <span className="block">{location.postalCode}</span>
            </address>
            <ul className="mt-4 space-y-1">
              <li>
                <a href={`mailto:${email}`} className={LINK_CLASS}>
                  {email}
                </a>
              </li>
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className={LINK_CLASS}>
                  {phone}
                </a>
              </li>
            </ul>

            <ul aria-label="Social media" className="mt-5 space-y-2">
              {footer.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.label];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Eastwards on ${social.label} (opens in a new tab)`}
                      className={LINK_CLASS}
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

          {/* Secure and govern has the longest names, so its column is
              widest. Phones: one column, the company links last. */}
          <nav aria-label="Footer" className="grid grid-cols-1 gap-y-10 sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1.15fr)_minmax(0,0.7fr)] sm:gap-x-10">
            <Group title={secure.label} links={secure.links} />
            <div className="space-y-10">
              <Group title={build.label} links={build.links} />
              <Group title={operate.label} links={operate.links} />
            </div>
            <Group title={footer.company.title} links={footer.company.items} />
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
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
