"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/content";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative w-full bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[60px] w-full max-w-[1720px] items-center justify-between px-6 sm:px-10 sm:h-[68px] lg:h-[72px] lg:px-[52px]"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center text-[16px] font-bold tracking-[-0.5px] text-[#111] lg:text-[18px]"
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
        <div className="hidden items-center gap-7 sm:gap-8 lg:gap-9 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-normal tracking-[0.1px] text-[#171717] transition-colors hover:text-[#2868ff] lg:text-[15px] lg:tracking-[0.02em]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Login button + mobile toggle */}
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/login"
            className="inline-flex h-8 items-center gap-3 rounded-full bg-[#2868ff] py-[3px] pl-[14px] pr-[4px] text-[13px] font-medium text-white transition-colors hover:bg-[#1555ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2868ff] lg:h-9 lg:pl-[16px] lg:pr-[5px] lg:text-[14px]"
          >
            Login
            <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white lg:h-[26px] lg:w-[26px]">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-[16px] w-[16px] lg:h-[17px] lg:w-[17px]"
                fill="none"
              >
                <path
                  d="M7 4.5L12.5 10L7 15.5"
                  stroke="#2868FF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e8e8e8] text-[#171717] md:hidden"
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

      {/* Mobile dropdown (kept from previous navbar — the spec above is desktop-only) */}
      {open && (
        <div className="absolute inset-x-4 top-[72px] z-20 rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-xl md:hidden">
          <ul className="space-y-4">
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-[15px] font-medium text-[#171717]"
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
