"use client";

import { useEffect, useState } from "react";

/* Dark/light switch in the navbar: one circular button, one click flips
   the theme. The icon shows the current mode - sun on light, moon on dark.
   2px-stroke SVGs keep the site's icon system. State lives on
   <html class="dark">; layout.tsx persists it. */
const SUN = (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    className="h-[16px] w-[16px] lg:h-[17px] lg:w-[17px]"
    aria-hidden="true"
  >
    <circle cx="10" cy="10" r="3.7" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M10 1.8v2.1M10 16.1v2.1M1.8 10h2.1M16.1 10h2.1M4.3 4.3l1.5 1.5M14.2 14.2l1.5 1.5M15.7 4.3l-1.5 1.5M5.8 14.2l-1.5 1.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const MOON = (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    className="h-[16px] w-[16px] lg:h-[17px] lg:w-[17px]"
    aria-hidden="true"
  >
    <path
      d="M16.1 12.1A6.6 6.6 0 0 1 7.9 3.9 6.7 6.7 0 1 0 16.1 12.1Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // `dark` lives on <html> and is set before paint by layout.tsx, so the
    // DOM class is the only hydration-safe source after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from an external system, not derived state
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage disabled: the toggle still works, it just won't persist
    }
  };

  return (
    <button
      type="button"
      aria-pressed={dark}
      aria-label="Toggle dark mode"
      onClick={toggle}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors duration-200 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {dark ? MOON : SUN}
    </button>
  );
}
