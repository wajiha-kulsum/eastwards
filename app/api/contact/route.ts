import { NextResponse } from "next/server";

// Placeholder for the real contact hookup — the form shows its success path
// as soon as this replies 2xx. Wire the email/CRM call here.
export async function POST() {
  return NextResponse.json({ ok: true });
}
