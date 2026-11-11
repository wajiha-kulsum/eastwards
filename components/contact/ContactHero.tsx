import Image from "next/image";
import { Clock, Mail, MapPin, MessageSquare, Users } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { contact } from "@/lib/content";

/* Contact page hero: a soft blue card in the homepage hero's language. Left,
   the title, the lede "Choose the way that works best for you" and the ways
   themselves as one row of shortcuts (form, inbox, team directory, office),
   so the promise in the lede is kept right under it. Right, the glass panels
   render (the material family of the homepage hero and the value cards)
   with two small cards floating over it: the reply time and the office.
   Every fact on those cards comes from lib/content; nothing is invented. */

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

function FloatCard({ Icon, title, detail, className }: { Icon: Icon; title: string; detail: string; className: string }) {
  return (
    <div
      className={`float-soft absolute flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 shadow-[0_12px_32px_-12px_rgb(40_104_255/0.35)] ${className}`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-white">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="text-small leading-tight">
        <span className="block font-semibold text-ink">{title}</span>
        <span className="block text-body">{detail}</span>
      </span>
    </div>
  );
}

export function ContactHero() {
  const { ways, hero, location } = contact;
  const links: { href: string; label: string; Icon: Icon }[] = [
    { href: "#contact-form", label: ways.form, Icon: MessageSquare },
    { href: `mailto:${contact.form.inbox}`, label: ways.email, Icon: Mail },
    { href: "#teams", label: ways.teams, Icon: Users },
    { href: "#headquarters", label: ways.visit, Icon: MapPin },
  ];

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-line bg-surface sm:rounded-[30px]">
      {/* brand-blue glow behind the artwork, drawn from the primary token */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_75%_at_78%_55%,color-mix(in_srgb,var(--color-primary)_16%,transparent),transparent)]"
      />

      <div className="relative grid items-center gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 lg:px-14 lg:py-14">
        <div>
          <h1 className="font-display text-display font-bold uppercase leading-none tracking-[-0.03em] text-ink">
            {contact.title}
          </h1>
          <p className="mt-5 max-w-[22ch] text-balance text-lead font-medium tracking-[-0.02em] text-body">
            {contact.subtitle}
          </p>

          <ul aria-label={ways.label} className="mt-8 flex flex-wrap gap-3">
            {links.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong bg-card px-4 text-small font-medium text-ink transition-colors hover:border-primary hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <Icon className="h-4 w-4 shrink-0 text-link" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* artwork: decorative, the cards repeat facts that the page states
            in full further down, so screen readers skip the whole block.
            From 640 only: on a phone the cards cover the render and the
            hero would take a whole screen before the form. */}
        <div aria-hidden="true" className="relative mx-auto hidden w-full max-w-[560px] sm:block">
          <Image
            src="/images/value-panels.png"
            alt=""
            width={1098}
            height={732}
            priority
            sizes="(min-width: 1024px) 560px, 90vw"
            className="h-auto w-full"
          />
          <FloatCard
            Icon={Clock}
            title={hero.reply.title}
            detail={hero.reply.detail}
            className="left-0 top-[8%] sm:-left-2"
          />
          <FloatCard
            Icon={MapPin}
            title={location.mapLabel}
            detail={hero.office.detail}
            className="bottom-[6%] right-0 [animation-delay:-3s] sm:right-2"
          />
        </div>
      </div>
    </section>
  );
}
