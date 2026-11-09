"use client";

import { useTheme } from "next-themes";
import SwitchButton from "@/components/kokonutui/switch-button";

/* Navbar switch, the kokonutui docs' own wiring: next-themes owns the
   `dark` class and storage, the button only reports the resolved theme and
   sends the next one back. */
export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <SwitchButton
      onThemeChange={setTheme}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
