import { Resend } from "resend";
import { EMAIL_SHAPE, MAIL_FROM as FROM, oneLine } from "@/lib/mail";
import { allowRequest, tooManyRequests } from "@/lib/rate-limit";

/* CSR enquiry endpoint, separate from Contact Us and Careers: the same rules
   as the form, then one email through Resend to CSR_EMAIL_TO. The recipient
   only comes from the environment, so a missing variable fails loudly (503)
   instead of mailing the wrong team. */

// name -> [required, max length]
const fields = {
  name: [true, 120],
  email: [true, 254],
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
  if (entry.email && !errors.email && !EMAIL_SHAPE.test(entry.email)) errors.email = "invalid";

  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  const to = process.env.CSR_EMAIL_TO;
  const resendKey = process.env.RESEND_API_KEY;
  if (!to || !resendKey) {
    console.error("[csr] CSR_EMAIL_TO or RESEND_API_KEY is not set, message rejected");
    return Response.json({ ok: false }, { status: 503 });
  }

  // Counted only once valid, so fixing a typo never uses up an attempt
  if (!allowRequest(request, "csr", 5, 10 * 60_000)) return tooManyRequests(600);

  const receivedAt = new Date().toISOString();
  try {
    const { error } = await new Resend(resendKey).emails.send({
      from: FROM,
      to,
      replyTo: entry.email,
      subject: oneLine(`CSR enquiry - ${entry.name}`),
      text: [
        "New CSR enquiry from the Eastwards website.",
        "",
        `Name: ${entry.name}`,
        `Email: ${entry.email}`,
        `Received: ${receivedAt}`,
        "",
        "Message:",
        entry.message,
        "",
        "Reply to this email to answer the sender directly.",
      ].join("\n"),
    });
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("[csr] email delivery failed", error);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
