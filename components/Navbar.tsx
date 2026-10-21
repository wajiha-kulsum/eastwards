"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, navServices } from "@/lib/content";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-page">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[60px] w-full max-w-[1720px] items-center justify-between px-6 sm:px-10 sm:h-[68px] lg:h-[72px] lg:px-[5.35%]"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center text-small font-bold tracking-[-0.5px] text-ink"
        >
          eastwards
          <svg
            aria-hidden="true"
            viewBox="0 0 12 18"
            className="ml-[2px] h-[16px] w-[11px] lg:h-[18px] lg:w-[12px]"
            fill="none"
          >
            <path d="M0 0L12 9L0 18V0Z" fill="#2868FF" />
          </svg>
        </Link>

        {/* Desktop navigation */}
        <NavigationMenu viewport={false} className="hidden md:block">
          <NavigationMenuList className="items-center gap-7 sm:gap-8 lg:gap-9">
            {navLinks.map((item) =>
              item.label === "Services" ? (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuTrigger className="h-auto px-0 py-0 text-ink hover:text-primary data-popup-open:text-primary [&>svg:last-child]:hidden">
                    {/* Label wears the exact sibling-link classes so the
                        button base styling can't shift size/weight/tracking;
                        chevron follows currentColor so it tints with the
                        text on hover/open */}
                    <span className="inline-flex items-center text-small font-medium tracking-[0.1px] text-ink transition-colors group-hover/navigation-menu-trigger:text-primary group-data-popup-open/navigation-menu-trigger:text-primary lg:tracking-[0.02em]">
                      {item.label}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="ml-1 h-3 w-3 shrink-0 transition-transform duration-300 group-data-popup-open/navigation-menu-trigger:rotate-180 group-data-open/navigation-menu-trigger:rotate-180"
                      >
                        <path
                          d="M7 4.5L12.5 10L7 15.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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
                            <span className="pointer-events-none py-2 text-small font-normal text-ink transition-colors group-hover/row:text-primary">
                              {service.label}
                            </span>
                          ) : (
                            <NavigationMenuLink
                              href={service.href}
                              className="py-2 text-small font-normal text-ink transition-colors hover:text-primary group-hover/row:text-primary"
                            >
                              {service.label}
                            </NavigationMenuLink>
                          )}
                          {service.detail || service.items ? (
                            <>
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 20 20"
                                fill="none"
                                className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover/row:translate-x-0.5"
                              >
                                <path
                                  d="M7 4.5L12.5 10L7 15.5"
                                  stroke="#2868FF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="invisible absolute left-full top-0 z-10 pl-3 opacity-0 transition-opacity duration-200 group-hover/row:visible group-hover/row:opacity-100 focus-within:visible focus-within:opacity-100">
                                {service.items ? (
                                <div className="min-w-[280px] rounded-2xl border border-line bg-card p-3 shadow-xl">
                                  <div className="flex flex-col">
                                    {service.items.map((item) => (
                                      <NavigationMenuLink
                                        key={item.label}
                                        href={item.href}
                                        className="px-3 py-2 text-small font-normal text-ink transition-colors hover:text-primary"
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
                                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg text-small font-medium text-primary transition-colors hover:text-[#1555ed]"
                                  >
                                    Contact us
                                    <svg
                                      aria-hidden="true"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      className="h-3 w-3"
                                    >
                                      <path
                                        d="M7 4.5L12.5 10L7 15.5"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
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
                      className="text-small font-medium tracking-[0.1px] text-ink transition-colors hover:text-primary lg:tracking-[0.02em]"
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
        <div className="flex shrink-0 items-center gap-3">
          <ThemeToggle />

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink md:hidden"
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

      {/* Mobile dropdown (kept from previous navbar, the spec above is desktop-only) */}
      {open && (
        <div className="absolute inset-x-4 top-[64px] z-20 rounded-2xl border border-line bg-card p-6 shadow-xl md:hidden">
          <ul className="space-y-4">
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-small font-medium text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
