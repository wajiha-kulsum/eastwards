"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";

/* Phone number with every country and its flag (react-phone-number-input,
   built on Google's libphonenumber). The flags are bundled SVGs, so no
   request leaves the site. The country list is a native select, so it
   works with the keyboard, screen readers and phone pickers.

   The visible field shows the number as typed with its calling code; the
   form posts `name` as one international number (+6591234567) through a
   hidden input. Look in .phone-field (app/globals.css). */
export function PhoneField({
  id,
  name,
  invalid,
  describedBy,
  onChange,
}: {
  id: string;
  name: string;
  invalid?: boolean;
  describedBy?: string;
  onChange?: () => void;
}) {
  const [value, setValue] = useState<string | undefined>();

  return (
    <>
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry="SG"
        flags={flags}
        value={value}
        onChange={(next) => {
          setValue(next);
          onChange?.();
        }}
        className="phone-field"
        numberInputProps={{
          id,
          autoComplete: "tel",
          maxLength: 24,
          "aria-invalid": invalid || undefined,
          "aria-describedby": describedBy,
        }}
      />
      <input type="hidden" name={name} value={value ?? ""} />
    </>
  );
}
