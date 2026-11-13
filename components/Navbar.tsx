"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore, type ComponentProps } from "react";
import { Dialog } from "radix-ui";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { Logo } from "@/components/ui/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { contact, nav } from "@/lib/content";
import { serviceLinks } from "@/lib/service-groups";
import { cn } from "@/lib/utils";

/* Header: logo, then (from 1024) the Services menu and the page links, then
   the theme switch and the one solid Contact Us pill. Below 1024 a menu
   button opens a full-screen sheet with the same links. */

// outline-solid undoes the outline-none baked into the shadcn menu parts
const focusRing =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const isCurrent = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

// Logo lockup: a little larger at the top of the page, back to normal once
// the page scrolls (transform only, nothing reflows); the hairline under the
// bar appears at the same moment
const subscribeScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};
const readScrolled = () => window.scrollY > 10;
const serverScrolled = () => false;

const logoScale = (scrolled: boolean) =>
  cn(
    "origin-left text-ink transition-transform duration-200 ease-out",
    scrolled ? "scale-100" : "scale-[1.25]"
  );

/* The nav's own 20-viewBox chevron, tinted by the text colour */
function Chevron({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M7 4.5L12.5 10L7 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ContactButton({ current, className, ...props }: { current: boolean } & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href={nav.cta.href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-primary px-5 text-small font-semibold text-white transition-[filter] duration-200 hover:brightness-110 active:brightness-95",
        focusRing,
        className
      )}
      {...props}
    >
      {nav.cta.label}
    </Link>
  );
}

function ServicesMenu({ pathname }: { pathname: string }) {
  const [build, operate, secure] = serviceLinks;
  const column = (groups: typeof serviceLinks) => (
    <div className="space-y-5">
      {groups.map((group) => (
        <div key={group.id}>
          <p className="px-3 pb-1.5 text-small font-medium text-body">{group.label}</p>
          <ul>
            {group.links.map((link) => (
              <li key={link.href}>
                {/* classes go on NavigationMenuLink so cn merges them over
                    its defaults; asChild alone would only concatenate */}
                <NavigationMenuLink
                  asChild
                  active={isCurrent(pathname, link.href)}
                  className="justify-between gap-6 rounded-[10px] px-3 py-1.5 text-small text-ink transition-colors duration-150 in-data-[slot=navigation-menu-content]:rounded-[10px] hover:bg-surface hover:text-link focus:bg-surface data-active:bg-transparent data-active:font-medium data-active:text-link"
                >
                  <Link href={link.href}>
                    {link.label}
                    {link.enquire && <span className="text-small font-normal text-body">{nav.enquire}</span>}
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <NavigationMenuItem className="static">
      <NavigationMenuTrigger
        className={cn(
          "h-auto rounded-sm px-0 py-0 text-small font-medium tracking-[0.02em] hover:bg-transparent hover:text-link focus:bg-transparent data-open:bg-transparent data-open:text-link data-open:hover:bg-transparent data-open:focus:bg-transparent [&>svg:last-child]:hidden",
          pathname.startsWith("/services") ? "text-link" : "text-ink",
          focusRing
        )}
      >
        {nav.services}
        <Chevron className="ml-1 h-3 w-3 shrink-0 rotate-90 transition-transform duration-300 group-data-open/navigation-menu-trigger:-rotate-90" />
      </NavigationMenuTrigger>
      {/* Look and placement in .nav-services-panel (globals) */}
      <NavigationMenuContent className="nav-services-panel">
        {column([build, operate])}
        {column([secure])}
        <div className="col-span-2 mt-3 border-t border-line px-3 pt-3">
          <NavigationMenuLink
            asChild
            active={pathname === nav.allServices.href}
            className="inline-flex gap-1.5 rounded-sm p-0 text-small font-medium text-link hover:bg-transparent focus:bg-transparent data-active:bg-transparent"
          >
            <Link href={nav.allServices.href}>
              {nav.allServices.label}
              <Chevron className="h-3 w-3" />
            </Link>
          </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

/* About: a short panel under its trigger, one row per page with a line on
   what's there. Same trigger and panel look as Services. */
function AboutMenu({ pathname }: { pathname: string }) {
  const current = nav.about.items.some((item) => isCurrent(pathname, item.href));

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "h-auto rounded-sm px-0 py-0 text-small font-medium tracking-[0.02em] hover:bg-transparent hover:text-link focus:bg-transparent data-open:bg-transparent data-open:text-link data-open:hover:bg-transparent data-open:focus:bg-transparent [&>svg:last-child]:hidden",
          current ? "text-link" : "text-ink",
          focusRing
        )}
      >
        {nav.about.label}
        <Chevron className="ml-1 h-3 w-3 shrink-0 rotate-90 transition-transform duration-300 group-data-open/navigation-menu-trigger:-rotate-90" />
      </NavigationMenuTrigger>
      <NavigationMenuContent className="nav-services-panel nav-about-panel">
        <ul>
          {nav.about.items.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink
                asChild
                active={isCurrent(pathname, item.href)}
                className="group/about block rounded-[10px] px-3 py-2.5 text-small transition-colors duration-150 in-data-[slot=navigation-menu-content]:rounded-[10px] hover:bg-surface focus:bg-surface data-active:bg-transparent"
              >
                <Link href={item.href}>
                  <span className="block font-medium text-ink transition-colors duration-150 group-hover/about:text-link group-data-active/about:text-link">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block font-normal text-body">{item.description}</span>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

/* Below 1024 the menu is a full-screen sheet with its own copy of the header
   bar. Keyed on the path so any navigation (back button included) closes it.
   Radix handles focus, Escape and the scroll lock (through the overlay). */
function MobileMenu({ pathname, scrolled }: { pathname: string; scrolled: boolean }) {
  const phone = contact.call.phones[0].number;
  const email = contact.directChannels.channels[0].email;
  const row = cn("flex min-h-11 items-center rounded-sm text-ink aria-[current=page]:text-link", focusRing);

  return (
    <Dialog.Root key={pathname}>
      <Dialog.Trigger
        aria-label={nav.menu.open}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-surface lg:hidden",
          focusRing
        )}
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
          <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* invisible, but Radix applies the scroll lock through the overlay */}
        <Dialog.Overlay className="fixed inset-0 z-[60]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-page text-ink data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-200 motion-reduce:animate-none"
        >
          <Dialog.Title className="sr-only">{nav.menu.title}</Dialog.Title>
          <div className="flex h-[60px] shrink-0 items-center gap-3 border-b border-line px-6 sm:h-[68px] sm:px-[48px]">
            {/* same size as the bar's logo, so opening the menu doesn't jump */}
            <Dialog.Close asChild>
              <Logo className={logoScale(scrolled)} />
            </Dialog.Close>
            <div className="ml-auto flex items-center gap-3">
              <ThemeSwitch />
              <Dialog.Close
                aria-label={nav.menu.close}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-surface",
                  focusRing
                )}
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </Dialog.Close>
            </div>
          </div>

          <nav aria-label="Main" className="px-6 pt-2 sm:px-[48px]">
            <Dialog.Close asChild>
              <Link
                href={nav.home.href}
                aria-current={pathname === nav.home.href ? "page" : undefined}
                className={cn(row, "min-h-14 border-b border-line text-lead font-medium")}
              >
                {nav.home.label}
              </Link>
            </Dialog.Close>
            <details className="group border-b border-line" open={pathname.startsWith("/services") || undefined}>
              <summary
                className={cn(
                  "flex min-h-14 cursor-pointer list-none items-center justify-between rounded-sm text-lead font-medium [&::-webkit-details-marker]:hidden",
                  pathname.startsWith("/services") ? "text-link" : "text-ink",
                  focusRing
                )}
              >
                {nav.services}
                <Chevron className="h-4 w-4 rotate-90 transition-transform duration-200 group-open:-rotate-90 motion-reduce:transition-none" />
              </summary>
              <div className="space-y-6 pb-6">
                {serviceLinks.map((group) => (
                  <div key={group.id}>
                    <p className="text-small font-medium text-body">{group.label}</p>
                    <ul className="mt-1">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Dialog.Close asChild>
                            <Link
                              href={link.href}
                              aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                              className={cn(row, "justify-between gap-4 text-small")}
                            >
                              {link.label}
                              {link.enquire && <span className="text-small text-body">{nav.enquire}</span>}
                            </Link>
                          </Dialog.Close>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Dialog.Close asChild>
                  <Link
                    href={nav.allServices.href}
                    aria-current={pathname === nav.allServices.href ? "page" : undefined}
                    className={cn(row, "w-fit gap-1.5 text-small font-medium text-link")}
                  >
                    {nav.allServices.label}
                    <Chevron className="h-3 w-3" />
                  </Link>
                </Dialog.Close>
              </div>
            </details>
            {nav.links.map((link) => (
              <Dialog.Close asChild key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                  className={cn(row, "min-h-14 border-b border-line text-lead font-medium")}
                >
                  {link.label}
                </Link>
              </Dialog.Close>
            ))}
            <details
              className="group border-b border-line"
              open={nav.about.items.some((item) => isCurrent(pathname, item.href)) || undefined}
            >
              <summary
                className={cn(
                  "flex min-h-14 cursor-pointer list-none items-center justify-between rounded-sm text-lead font-medium [&::-webkit-details-marker]:hidden",
                  nav.about.items.some((item) => isCurrent(pathname, item.href)) ? "text-link" : "text-ink",
                  focusRing
                )}
              >
                {nav.about.label}
                <Chevron className="h-4 w-4 rotate-90 transition-transform duration-200 group-open:-rotate-90 motion-reduce:transition-none" />
              </summary>
              <ul className="pb-4">
                {nav.about.items.map((item) => (
                  <li key={item.href}>
                    <Dialog.Close asChild>
                      <Link
                        href={item.href}
                        aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                        className={cn(row, "flex-col items-start justify-center py-2 text-small")}
                      >
                        <span className="font-medium">{item.label}</span>
                        <span className="text-body">{item.description}</span>
                      </Link>
                    </Dialog.Close>
                  </li>
                ))}
              </ul>
            </details>
          </nav>

          <div className="mt-auto space-y-5 px-6 pb-10 sm:px-[48px] pt-8">
            <Dialog.Close asChild>
              <ContactButton current={pathname === nav.cta.href} className="w-full" />
            </Dialog.Close>
            <div className="space-y-1 text-small">
              <a href={`mailto:${email}`} className={cn("block w-fit rounded-sm font-medium text-ink", focusRing)}>
                {email}
              </a>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className={cn("block w-fit rounded-sm text-body", focusRing)}>
                {phone}
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeScroll, readScrolled, serverScrolled);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-page transition-colors duration-300 print:hidden",
        scrolled ? "border-line" : "border-transparent"
      )}
    >
      {/* a div, not a nav: Radix NavigationMenu renders the "Main" nav landmark */}
      {/* phones: 24px, the same gutter as page content and the footer */}
      <div className="flex h-[60px] w-full items-center gap-7 px-6 sm:h-[68px] sm:px-[48px] sm:gap-8 lg:h-[72px] lg:gap-9">
        <Logo className={logoScale(scrolled)} />

        <NavigationMenu viewport={false} className="ml-auto hidden lg:flex">
          <NavigationMenuList className="items-center gap-9">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                active={pathname === nav.home.href}
                className={cn(
                  "link-underline-sweep rounded-sm p-0 text-small font-medium tracking-[0.02em] text-ink transition-colors hover:bg-transparent hover:text-link focus:bg-transparent data-active:bg-transparent data-active:text-link",
                  focusRing
                )}
              >
                <Link href={nav.home.href}>{nav.home.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <ServicesMenu pathname={pathname} />
            {nav.links.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  active={isCurrent(pathname, link.href)}
                  className={cn(
                    "link-underline-sweep rounded-sm p-0 text-small font-medium tracking-[0.02em] text-ink transition-colors hover:bg-transparent hover:text-link focus:bg-transparent data-active:bg-transparent data-active:text-link",
                    focusRing
                  )}
                >
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <AboutMenu pathname={pathname} />
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-0">
          <ThemeSwitch />
          <ContactButton current={pathname === nav.cta.href} className="max-sm:hidden" />
          <MobileMenu pathname={pathname} scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
}
