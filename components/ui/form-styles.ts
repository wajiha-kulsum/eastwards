/* Shared form furniture for the contact and careers forms: label and field
   styles in one place so the two forms can't drift apart. Borders use
   field-line, 3:1 against the card. */
export const LABEL_CLASS = "mb-1.5 block text-small font-medium tracking-tight text-ink";
export const OPTIONAL_CLASS = "font-normal text-body";
export const FIELD_CLASS =
  "rounded-xl border border-field-line bg-field px-3.5 text-small text-ink outline-none transition-colors placeholder:text-placeholder focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/20 aria-invalid:border-destructive aria-invalid:focus:border-destructive aria-invalid:focus:ring-destructive/20";
export const ERROR_CLASS = "mt-1 text-small text-destructive";
export const FORM_LINK_CLASS =
  "rounded-sm text-ink underline underline-offset-2 transition-colors hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
