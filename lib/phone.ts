import { parsePhoneNumberFromString } from "libphonenumber-js/min";

/* Phone numbers for the contact and careers forms. The form sends the
   number in international form (+6591234567, from components/ui/PhoneField);
   the browser and the API check it with the same libphonenumber rules.

   Returns the number formatted for the team's email ("+65 9123 4567"), or
   null when it isn't a real number for its country. */
export function formatPhone(raw: string): string | null {
  const parsed = parsePhoneNumberFromString(raw.trim());
  return parsed?.isValid() ? parsed.formatInternational() : null;
}

export const PHONE_INVALID = "Enter a valid phone number for the country you picked.";
