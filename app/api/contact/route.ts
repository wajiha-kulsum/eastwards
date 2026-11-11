import { Resend } from "resend";
import { contact } from "@/lib/content";
import { EMAIL_SHAPE, MAIL_FROM as FROM, oneLine } from "@/lib/mail";
import { allowRequest, tooManyRequests } from "@/lib/rate-limit";

/* Contact form endpoint: the same rules as the form, then delivery by email
   through Resend to contact@eastwards.co. A JSON webhook can still take a
   copy (CONTACT_WEBHOOK_URL), and the visitor gets a short acknowledgement.
   Sends are rate limited per visitor, and the acknowledgement carries no
   text the visitor typed, so it can't be used to email strangers. */

const { requirements, phoneCodes } = contact.form;
const allowedRequirements = new Set<string>(requirements);
const allowedCodes = new Set<string>(phoneCodes.map((p) => p.code));

const CONTACT_TO = process.env.CONTACT_EMAIL_TO ?? "contact@eastwards.co";

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

async function deliverWebhook(url: string, message: unknown) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[contact] webhook delivery failed", response.status);
    }
  } catch (error) {
    console.error("[contact] webhook delivery failed", error);
  }
}

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
  if (entry.email && !errors.email && !EMAIL_SHAPE.test(entry.email)) errors.email = "invalid";

  const requirement = text("requirement");
  if (!allowedRequirements.has(requirement)) errors.requirement = requirement ? "invalid" : "missing";

  const phoneCode = text("phoneCode");
  if (phoneCode && !allowedCodes.has(phoneCode)) errors.phoneCode = "invalid";

  if (!input.smsConsent) errors.smsConsent = "missing";

  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  // Counted only once valid, so fixing a typo never uses up an attempt
  if (!allowRequest(request, "contact", 5, 10 * 60_000)) return tooManyRequests(600);

  const message = {
    ...entry,
    phone: entry.phone && `${phoneCode} ${entry.phone}`,
    requirement,
    smsConsent: true,
    receivedAt: new Date().toISOString(),
  };

  const resendKey = process.env.RESEND_API_KEY;
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const fullName = `${entry.firstName} ${entry.lastName}`.trim();

  if (resendKey) {
    const resend = new Resend(resendKey);
    const teamText = [
      "New enquiry from the Eastwards website.",
      "",
      `Name: ${fullName}`,
      `Email: ${entry.email}`,
      ...(entry.company ? [`Company: ${entry.company}`] : []),
      ...(entry.jobTitle ? [`Job title: ${entry.jobTitle}`] : []),
      ...(message.phone ? [`Phone: ${message.phone}`] : []),
      `Requirement: ${requirement}`,
      "Consent to contact: yes",
      `Received: ${message.receivedAt}`,
      "",
      "Message:",
      entry.message,
    ].join("\n");

    try {
      const { error } = await resend.emails.send({
        from: FROM,
        to: CONTACT_TO,
        replyTo: entry.email,
        subject: oneLine(`New enquiry: ${requirement} - ${fullName}`),
        text: teamText,
      });
      if (error) throw new Error(error.message);
    } catch (error) {
      console.error("[contact] email delivery failed", error);
      return Response.json({ ok: false }, { status: 502 });
    }

    // The enquiry is delivered; the acknowledgement is best effort. The SDK
    // returns failures as `error` instead of throwing, so check it to log them.
    try {
      const { error } = await resend.emails.send({
        from: FROM,
        to: entry.email,
        replyTo: CONTACT_TO,
        subject: "We received your message - Eastwards Consulting",
        text: [
          // no visitor-typed text here: see the note at the top
          "Hello,",
          "",
          "Thank you for contacting Eastwards. We received your message and a member of our team will reply within one business day.",
          "",
          `For anything urgent, call ${contact.call.phones[0].number} or email ${CONTACT_TO}.`,
          "",
          "Eastwards Consulting Pte Ltd",
        ].join("\n"),
      });
      if (error) console.error("[contact] auto-reply failed", error);
    } catch (error) {
      console.error("[contact] auto-reply failed", error);
    }

    if (webhook) await deliverWebhook(webhook, message);
    return Response.json({ ok: true });
  }

  if (webhook) {
    const delivered = await fetch(webhook, {
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

  // Never fake a send in production, the form then offers the email fallback
  if (process.env.NODE_ENV === "production") {
    console.error(
      "[contact] RESEND_API_KEY and CONTACT_WEBHOOK_URL are not set, message rejected"
    );
    return Response.json({ ok: false }, { status: 503 });
  }
  console.info("[contact] no delivery configured, logging instead:", message);
  return Response.json({ ok: true });
}
