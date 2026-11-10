"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, navServices } from "@/lib/content";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Logo lockup: a little larger at the top of the page, back to normal
     once the page scrolls. Transform-only, so nothing reflows. Re-synced on
     route change because navigation resets the scroll. */
  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 10);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, [pathname]);

  /* The nav's own 20-viewBox chevron: trigger + contact arrows carry the
      text color, the flyout row arrows pin the brand blue. */
  const Chevron = ({
    className,
    stroke = "currentColor",
  }: {
    className?: string;
    stroke?: string;
  }) => (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M7 4.5L12.5 10L7 15.5"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-page transition-colors duration-300 ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="flex h-[60px] w-full items-center gap-7 px-[48px] sm:h-[68px] sm:gap-8 lg:h-[72px] lg:gap-9"
      >
        {/* Logo */}
        <Link
          href="/"
          className={`flex shrink-0 origin-left items-center rounded-sm text-small font-bold tracking-[-0.5px] text-ink transition-transform duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
            scrolled ? "scale-100" : "scale-[1.25]"
          }`}
        >
          Eastwards
          <Image
            src="/images/logo.svg"
            alt=""
            aria-hidden="true"
            width={27}
            height={32}
            className="ml-2 h-[16px] w-auto lg:h-[18px]"
          />
        </Link>

        {/* Desktop navigation */}
        <NavigationMenu viewport={false} className="ml-auto hidden md:block">
          <NavigationMenuList className="items-center gap-7 sm:gap-8 lg:gap-9">
            {navLinks.map((item) =>
              item.label === "Services" ? (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuTrigger className="h-auto rounded-sm px-0 py-0 text-ink hover:text-link focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary data-popup-open:text-link [&>svg:last-child]:hidden">
                    {/* Label wears the exact sibling-link classes so the
                        button base styling can't shift size/weight/tracking;
                        chevron follows currentColor so it tints with the
                        text on hover/open */}
                    <span
                      className={`inline-flex items-center text-small font-medium tracking-[0.1px] transition-colors group-hover/navigation-menu-trigger:text-link group-data-popup-open/navigation-menu-trigger:text-link lg:tracking-[0.02em] ${
                        pathname.startsWith("/services") ? "text-link" : "text-ink"
                      }`}
                    >
                      {item.label}
                      <Chevron className="ml-1 h-3 w-3 shrink-0 transition-transform duration-300 group-data-popup-open/navigation-menu-trigger:rotate-180 group-data-open/navigation-menu-trigger:rotate-180" />
                    </span>
                  </NavigationMenuTrigger>
                  {/* Dark two-column panel driven by .nav-services-panel
                      (globals), unlayered CSS outranks the group-variant
                      utilities in the shadcn content defaults. Rows for
                      items with `detail` carry a blue chevron and reveal a
                      sideways flyout (hover the row to its right edge - the
                      12px pl on the flyout keeps the hover bridge gapless). */}
                  <NavigationMenuContent className="nav-services-panel">
                    {navServices.map((service) => (
                        <div
                          key={service.label}
                          className="group/row relative flex items-center justify-between gap-6 px-3"
                        >
                          {/* Category hub rows (carry `items`) are hover-only:
                              text, not a link - the flyout's children are the
                              clickable targets. Plain rows stay links. */}
                          {service.items ? (
                            <span className="pointer-events-none py-2 text-small font-normal text-ink transition-colors group-hover/row:text-link">
                              {service.label}
                            </span>
                          ) : (
                            <NavigationMenuLink
                              href={service.href}
                              className="py-2 text-small font-normal text-ink transition-colors hover:text-link group-hover/row:text-link"
                            >
                              {service.label}
                            </NavigationMenuLink>
                          )}
                          {service.detail || service.items ? (
                            <>
                              <Chevron
                                className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover/row:translate-x-0.5"
                                stroke="#2868FF"
                              />
                              <div className="invisible absolute left-full top-0 z-10 pl-3 opacity-0 transition-opacity duration-200 group-hover/row:visible group-hover/row:opacity-100 focus-within:visible focus-within:opacity-100">
                                {service.items ? (
                                <div className="min-w-[280px] rounded-2xl border border-line bg-card p-3 shadow-xl">
                                  <div className="flex flex-col">
                                    {service.items.map((item) => (
                                      <NavigationMenuLink
                                        key={item.label}
                                        href={item.href}
                                        className="px-3 py-2 text-small font-normal text-ink transition-colors hover:text-link"
                                      >
                                        {item.label}
                                      </NavigationMenuLink>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <div className="w-max max-w-[280px] rounded-2xl border border-line bg-card p-5 shadow-xl">
                                  <p className="text-small font-medium text-ink">
                                    {service.detail?.title}
                                  </p>
                                  <p className="mt-2 text-small text-body">
                                    {service.detail?.body}
                                  </p>
                                  <NavigationMenuLink
                                    href="/contact"
                                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg text-small font-medium text-link transition-opacity hover:opacity-70"
                                  >
                                    Contact us
                                    <Chevron className="h-3 w-3" />
                                  </NavigationMenuLink>
                                </div>
                              )}
                              </div>
                            </>
                          ) : (
                            <span className="w-3 shrink-0" aria-hidden="true" />
                          )}
                        </div>
                      ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`link-underline-sweep rounded-sm text-small font-medium tracking-[0.1px] transition-colors hover:text-link focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:tracking-[0.02em] ${
                        pathname === item.href ? "text-link" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Theme toggle + mobile menu toggle */}
        <div className="ml-auto flex shrink-0 items-center gap-3 md:ml-0">
          <ThemeSwitch />

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4"
              aria-hidden="true"
            >
              {open ? (
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown; Services expands into the same navServices rows
          the desktop panel uses (one flat level, category labels muted). */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-4 top-[60px] z-20 max-h-[calc(100dvh-76px)] overflow-y-auto rounded-2xl border border-line bg-card p-6 shadow-xl sm:top-[68px] md:hidden"
        >
          <ul className="space-y-4">
            {navLinks.map((item) =>
              item.label === "Services" ? (
                <li key={item.label}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    aria-expanded={servicesOpen}
                    className={`flex min-h-11 w-full items-center gap-1 rounded-sm text-small font-medium transition-colors hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      pathname.startsWith("/services") ? "text-link" : "text-ink"
                    }`}
                  >
                    {item.label}
                    <Chevron
                      className={`h-3 w-3 transition-transform duration-200${
                        servicesOpen ? " rotate-90" : ""
                      }`}
                    />
                  </button>
                  {servicesOpen && (
                    <ul className="mt-3 space-y-2.5 border-l border-line pl-3">
                      {navServices.map((service) =>
                        service.items ? (
                          <li key={service.label}>
                            <p className="py-2 text-small text-body">
                              {service.label}
                            </p>
                            <ul className="ml-3 space-y-2.5">
                              {service.items.map((child) => (
                                <li key={child.label}>
                                  <Link
                                    href={child.href}
                                    onClick={() => {
                                      setOpen(false);
                                      setServicesOpen(false);
                                    }}
                                    className={`block py-2.5 text-small font-medium transition-colors hover:text-link ${
                                      pathname === child.href ? "text-link" : "text-ink"
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ) : (
                          <li key={service.label}>
                            <Link
                              href={service.href}
                              onClick={() => {
                                setOpen(false);
                                setServicesOpen(false);
                              }}
                              className="block py-1 text-small font-medium text-ink"
                            >
                              {service.label}
                            </Link>
                          </li>
                        ),
                      )}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`block min-h-11 rounded-sm py-2.5 text-small font-medium transition-colors hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      pathname === item.href ? "text-link" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
