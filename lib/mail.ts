/* Shared by the form endpoints (app/api/contact, app/api/careers). Server
   only: it reads environment variables. */

export { EMAIL_SHAPE } from "@/lib/validation";

// Sender is env-driven so the forms can be tested with Resend's test address
// before eastwards.co is verified.
export const MAIL_FROM = process.env.CONTACT_FROM ?? "Eastwards Consulting <no-reply@eastwards.co>";

// Keep visitor text out of email headers such as the subject
export const oneLine = (value: string, max = 160) => value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
