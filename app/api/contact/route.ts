import { contact } from "@/lib/content";

/* Contact form endpoint: the same rules as the form, then delivery to a
   webhook. Any JSON webhook works (Power Automate, Zapier, Make, HubSpot,
   Slack): set CONTACT_WEBHOOK_URL on the host. */

const { requirements, phoneCodes } = contact.form;
const allowedRequirements = new Set<string>(requirements);
const allowedCodes = new Set<string>(phoneCodes.map((p) => p.code));
const emailShape = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// name -> [required, max length]
const fields = {
  firstName: [true, 80],
  lastName: [true, 80],
  email: [true, 254],
  company: [false, 160],
  jobTitle: [false, 120],
  phone: [false, 40],
  message: [true, 5000],
} as const;

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ ok: false }, { status: 400 });
  }
  const input = body as Record<string, unknown>;

  // Bots fill the hidden field, people never see it: pretend it worked
  if (typeof input.website === "string" && input.website !== "") {
    return Response.json({ ok: true });
  }

  const text = (name: string) => (typeof input[name] === "string" ? (input[name] as string).trim() : "");
  const entry: Record<string, string> = {};
  const errors: Record<string, "missing" | "invalid"> = {};

  for (const [name, [required, max]] of Object.entries(fields)) {
    const value = text(name);
    entry[name] = value;
    if (!value && required) errors[name] = "missing";
    else if (value.length > max) errors[name] = "invalid";
  }
  if (entry.email && !errors.email && !emailShape.test(entry.email)) errors.email = "invalid";

  const requirement = text("requirement");
  if (!allowedRequirements.has(requirement)) errors.requirement = requirement ? "invalid" : "missing";

  const phoneCode = text("phoneCode");
  if (phoneCode && !allowedCodes.has(phoneCode)) errors.phoneCode = "invalid";

  if (!input.smsConsent) errors.smsConsent = "missing";

  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  const message = {
    ...entry,
    phone: entry.phone && `${phoneCode} ${entry.phone}`,
    requirement,
    smsConsent: true,
    receivedAt: new Date().toISOString(),
  };

  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) {
    // Never fake a send in production, the form then offers the email fallback
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] CONTACT_WEBHOOK_URL is not set, message rejected");
      return Response.json({ ok: false }, { status: 503 });
    }
    console.info("[contact] CONTACT_WEBHOOK_URL is not set, logging instead:", message);
    return Response.json({ ok: true });
  }

  const delivered = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
    signal: AbortSignal.timeout(10_000),
  }).then(
    (response) => response.ok,
    () => false
  );

  if (!delivered) {
    console.error("[contact] webhook delivery failed");
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
