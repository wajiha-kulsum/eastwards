/* A small per-visitor limit for the form endpoints: at most `limit` sends
   per `windowMs` from one IP address, per form. It lives in this server
   process's memory, which suits the single Node process the site runs as
   on Hostinger; behind several instances it would need a shared store.
   Every allowed send costs us an email, so this caps how fast anyone can
   spend the Resend quota or fill an inbox. */

const hits = new Map<string, number[]>();
const MAX_KEYS = 10_000;

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

/* true when the request may go ahead (and is counted), false when over */
export function allowRequest(request: Request, form: string, limit: number, windowMs: number) {
  const now = Date.now();
  const key = `${form}:${clientIp(request)}`;
  const recent = (hits.get(key) ?? []).filter((at) => now - at < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);

  // keep memory bounded: drop the oldest keys once there are too many
  if (hits.size > MAX_KEYS) {
    for (const old of [...hits.keys()].slice(0, hits.size - MAX_KEYS)) hits.delete(old);
  }
  return true;
}

export const tooManyRequests = (retryAfterSeconds: number) =>
  Response.json({ ok: false, error: "rate-limited" }, { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } });
