import { Resend } from "resend";
import { CAREERS_EMAIL } from "@/lib/careers";
import { EMAIL_SHAPE, MAIL_FROM } from "@/lib/mail";
import { allowRequest, tooManyRequests } from "@/lib/rate-limit";

/* Job alerts sign-up: one email to the talent team with the address, so
   they can write when a relevant role opens. Nothing is stored here; swap
   this for a mailing list (e.g. a Resend audience) when there is one. */

const CAREERS_TO = process.env.CAREERS_EMAIL_TO ?? CAREERS_EMAIL;

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ ok: false }, { status: 400 });
  }
  const input = body as Record<string, unknown>;

  // Bots fill the hidden field, people never see it: pretend it worked
  if (typeof input.website === "string" && input.website !== "") return Response.json({ ok: true });

  const email = typeof input.email === "string" ? input.email.trim() : "";
  if (!email || email.length > 254 || !EMAIL_SHAPE.test(email)) {
    return Response.json({ ok: false, errors: { email: email ? "invalid" : "missing" } }, { status: 400 });
  }

  // Each sign-up is an email to the team: a few per visitor per hour
  if (!allowRequest(request, "careers-alerts", 3, 60 * 60_000)) return tooManyRequests(3600);

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("[careers-alerts] RESEND_API_KEY is not set, sign-up rejected");
      return Response.json({ ok: false }, { status: 503 });
    }
    console.info("[careers-alerts] no delivery configured, logging instead:", email);
    return Response.json({ ok: true });
  }

  try {
    const { error } = await new Resend(resendKey).emails.send({
      from: MAIL_FROM,
      to: CAREERS_TO,
      replyTo: email,
      subject: "Job alerts sign-up",
      text: [
        "Someone asked to hear about new roles on the Eastwards careers page.",
        "",
        `Email: ${email}`,
        `Received: ${new Date().toISOString()}`,
        "",
        "Reply to this email to reach them when a relevant role opens.",
      ].join("\n"),
    });
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("[careers-alerts] email delivery failed", error);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
