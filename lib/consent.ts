/* Cookie consent, browser side. The visitor's choice lives in one
   first-party cookie (essential, so it needs no consent itself) and every
   reader goes through this module:

     hasConsent("analytics")  - gate any analytics or marketing script on it

   Readers subscribe through useSyncExternalStore, so the banner, the dialog
   and any future script loader stay in step without a context provider. */

export type ConsentCategory = "analytics" | "preferences" | "marketing";

export type Consent = { version: number; at: string } & Record<ConsentCategory, boolean>;

/* Bump when the categories or the policy change materially: older choices
   then no longer count and the banner asks again. */
const VERSION = 1;
const COOKIE = "ew_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // ask again after six months
const CHANGE = "ew:consent-change";

let cachedRaw: string | null | undefined;
let cachedValue: Consent | null = null;

function readRaw(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function parse(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<Consent>;
    if (value.version !== VERSION) return null;
    return {
      version: VERSION,
      at: String(value.at ?? ""),
      analytics: value.analytics === true,
      preferences: value.preferences === true,
      marketing: value.marketing === true,
    };
  } catch {
    return null;
  }
}

/* Stable between calls while the cookie is unchanged, as
   useSyncExternalStore requires. */
export function getConsent(): Consent | null {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = parse(raw);
  }
  return cachedValue;
}

/* undefined on the server: the choice is unknown until the browser reads it */
export const getServerConsent = (): Consent | null | undefined => undefined;

export function saveConsent(choice: Record<ConsentCategory, boolean>) {
  const value: Consent = { version: VERSION, at: new Date().toISOString(), ...choice };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(CHANGE));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CHANGE, onChange);
  return () => window.removeEventListener(CHANGE, onChange);
}

export function hasConsent(category: ConsentCategory): boolean {
  return getConsent()?.[category] === true;
}
