/* Form rules shared by the browser and the API routes, so the two can't
   disagree. Client-safe: no environment variables or server-only imports. */

// Loose on purpose: the confirmation email is the real check
export const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmail = (value: string) => EMAIL_SHAPE.test(value);

export function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/* Lower-cased extension when it is one of `allowed`, otherwise null */
export function allowedExtension<T extends string>(name: string, allowed: readonly T[]): T | null {
  const ext = name.toLowerCase().split(".").pop() ?? "";
  return (allowed as readonly string[]).includes(ext) ? (ext as T) : null;
}
