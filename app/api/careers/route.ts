import { Resend } from "resend";
import { careers, CAREERS_EMAIL, CV_RULES, GENERAL_APPLICATION } from "@/lib/careers";
import { contact } from "@/lib/content";
import { EMAIL_SHAPE, MAIL_FROM, oneLine } from "@/lib/mail";
import { allowRequest, tooManyRequests } from "@/lib/rate-limit";
import { allowedExtension, isHttpUrl } from "@/lib/validation";

/* Careers application endpoint (multipart/form-data). Same rules as the
   form, then one email to the talent team with the CV attached and a short
   confirmation to the applicant. The CV is checked by size, extension and
   its contents, so a renamed file of another type is refused. Nothing is
   stored on the server. Sends are rate limited per visitor, and the
   confirmation carries no text the applicant typed, so the form can't be
   used to email messages to strangers from our domain. */

const CAREERS_TO = process.env.CAREERS_EMAIL_TO ?? CAREERS_EMAIL;

// Whole request: the CV plus the text fields, with room to spare
const MAX_REQUEST_BYTES = CV_RULES.maxBytes + 512 * 1024;

const allowedAreas = new Set<string>(careers.form.areas);
const allowedPositions = new Set<string>([GENERAL_APPLICATION, ...careers.positions.openings.map((o) => o.title)]);
const allowedCodes = new Set<string>(contact.form.phoneCodes.map((p) => p.code));

// name -> [required, max length]
const fields = {
  firstName: [true, 80],
  lastName: [true, 80],
  email: [true, 254],
  phone: [false, 40],
  location: [false, 120],
  link: [false, 300],
  message: [false, 3000],
} as const;

type Errors = Record<string, "missing" | "invalid" | "too-large">;

/* File signatures: PDF "%PDF", DOCX is a ZIP "PK\x03\x04", DOC is OLE2 */
const SIGNATURES: Record<(typeof CV_RULES.extensions)[number], number[]> = {
  pdf: [0x25, 0x50, 0x44, 0x46],
  docx: [0x50, 0x4b, 0x03, 0x04],
  doc: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1],
};

/* A DOCX must also contain Word's main part, so other ZIP files (archives,
   spreadsheets) renamed to .docx are refused */
function looksLike(ext: keyof typeof SIGNATURES, bytes: Buffer) {
  if (!SIGNATURES[ext].every((byte, i) => bytes[i] === byte)) return false;
  return ext !== "docx" || bytes.includes("word/document.xml");
}

// ASCII-only, so mail clients show a sane attachment name
const safe = (value: string) => value.normalize("NFKD").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "") || "Applicant";

export async function POST(request: Request) {
  // Size first, from the declared length. A body with no declared length
  // (chunked) is refused, so formData() never buffers an unbounded upload;
  // browsers always declare it for a FormData fetch.
  const declared = Number(request.headers.get("content-length"));
  if (!Number.isFinite(declared) || declared <= 0) {
    return Response.json({ ok: false }, { status: 411 });
  }
  if (declared > MAX_REQUEST_BYTES) {
    return Response.json({ ok: false, errors: { cv: "too-large" } }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Bots fill the hidden field, people never see it: pretend it worked
  const trap = form.get("website");
  if (typeof trap === "string" && trap !== "") return Response.json({ ok: true });

  const text = (name: string) => {
    const value = form.get(name);
    return typeof value === "string" ? value.trim() : "";
  };
  const entry: Record<string, string> = {};
  const errors: Errors = {};

  for (const [name, [required, max]] of Object.entries(fields)) {
    const value = text(name);
    entry[name] = value;
    if (!value && required) errors[name] = "missing";
    else if (value.length > max) errors[name] = "invalid";
  }
  if (entry.email && !errors.email && !EMAIL_SHAPE.test(entry.email)) errors.email = "invalid";
  if (entry.link && !errors.link && !isHttpUrl(entry.link)) errors.link = "invalid";

  const area = text("area");
  if (!allowedAreas.has(area)) errors.area = area ? "invalid" : "missing";

  const position = text("position") || GENERAL_APPLICATION;
  if (!allowedPositions.has(position)) errors.position = "invalid";

  const phoneCode = text("phoneCode");
  if (entry.phone && phoneCode && !allowedCodes.has(phoneCode)) errors.phoneCode = "invalid";

  if (!form.get("consent")) errors.consent = "missing";

  const cv = form.get("cv");
  let attachment: { filename: string; content: Buffer } | null = null;
  if (!(cv instanceof File) || cv.size === 0) {
    errors.cv = "missing";
  } else if (cv.size > CV_RULES.maxBytes) {
    errors.cv = "too-large";
  } else {
    const ext = allowedExtension(cv.name, CV_RULES.extensions);
    const bytes = Buffer.from(await cv.arrayBuffer());
    if (!ext || !looksLike(ext, bytes)) {
      errors.cv = "invalid";
    } else {
      attachment = { filename: `${safe(entry.lastName)}-${safe(entry.firstName)}-CV.${ext}`, content: bytes };
    }
  }

  if (Object.keys(errors).length || !attachment) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  // Counted only once valid, so fixing a typo never uses up an attempt
  if (!allowRequest(request, "careers", 3, 10 * 60_000)) return tooManyRequests(600);

  const fullName = `${entry.firstName} ${entry.lastName}`.trim();
  const phone = entry.phone && `${phoneCode} ${entry.phone}`.trim();
  const receivedAt = new Date().toISOString();

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    // Never fake a send in production: the form then offers the email fallback
    if (process.env.NODE_ENV === "production") {
      console.error("[careers] RESEND_API_KEY is not set, application rejected");
      return Response.json({ ok: false }, { status: 503 });
    }
    console.info("[careers] no delivery configured, logging instead:", {
      ...entry,
      phone,
      area,
      position,
      cv: attachment.filename,
      receivedAt,
    });
    return Response.json({ ok: true });
  }

  const resend = new Resend(resendKey);
  const teamText = [
    "New application from the Eastwards careers page.",
    "",
    `Name: ${fullName}`,
    `Email: ${entry.email}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    ...(entry.location ? [`Location: ${entry.location}`] : []),
    ...(entry.link ? [`LinkedIn / portfolio: ${entry.link}`] : []),
    `Position: ${position}`,
    `Area of interest: ${area}`,
    `CV: ${attachment.filename} (attached)`,
    "Consent to process application: yes",
    `Received: ${receivedAt}`,
    ...(entry.message ? ["", "Introduction:", entry.message] : []),
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: CAREERS_TO,
      replyTo: entry.email,
      subject: oneLine(`Application: ${position} (${area}) - ${fullName}`),
      text: teamText,
      attachments: [attachment],
    });
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("[careers] email delivery failed", error);
    return Response.json({ ok: false }, { status: 502 });
  }

  // The application is delivered; the confirmation is best effort. The SDK
  // returns failures as `error` instead of throwing, so check it to log them.
  try {
    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: entry.email,
      replyTo: CAREERS_TO,
      subject: "We received your application - Eastwards Consulting",
      text: [
        // no applicant-typed text here: see the note at the top
        "Hello,",
        "",
        `Thank you for applying to Eastwards (${position}, ${area}). We received your application and CV.`,
        "",
        "Our talent acquisition team reviews every application and will contact you if there is a match.",
        "",
        `Questions in the meantime? Reply to this email or write to ${CAREERS_TO}.`,
        "",
        "Eastwards Consulting Pte Ltd",
      ].join("\n"),
    });
    if (error) console.error("[careers] confirmation failed", error);
  } catch (error) {
    console.error("[careers] confirmation failed", error);
  }

  return Response.json({ ok: true });
}
