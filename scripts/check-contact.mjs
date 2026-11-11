// Contact API check. Run against `npm run dev`: node scripts/check-contact.mjs [baseUrl]
import assert from "node:assert/strict";

const url = `${process.argv[2] ?? "http://localhost:3000"}/api/contact`;
const post = async (body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  return { status: res.status, json: await res.json() };
};
const valid = {
  firstName: "Wei Ling",
  lastName: "Tan",
  email: "weiling@rivergate.sg",
  company: "Rivergate Logistics",
  phoneCode: "+65",
  phone: "6123 4567",
  requirement: "Cybersecurity",
  message: "IAM refresh for about 400 staff.",
  smsConsent: "on",
};

const empty = await post({});
assert.equal(empty.status, 400);
assert.deepEqual(empty.json.errors, {
  firstName: "missing",
  lastName: "missing",
  email: "missing",
  message: "missing",
  requirement: "missing",
  smsConsent: "missing",
});

assert.deepEqual((await post({ ...valid, requirement: "Not a service" })).json.errors, { requirement: "invalid" });
assert.deepEqual((await post({ ...valid, email: "a@b" })).json.errors, { email: "invalid" });
assert.deepEqual((await post({ ...valid, phoneCode: "+999" })).json.errors, { phoneCode: "invalid" });
assert.deepEqual((await post({ ...valid, firstName: "x".repeat(81) })).json.errors, { firstName: "invalid" });
assert.deepEqual((await post({ ...valid, smsConsent: undefined })).json.errors, { smsConsent: "missing" });
assert.equal((await post("not json")).status, 400);
assert.equal((await post({ website: "bot.example" })).status, 200); // honeypot: silently dropped

// 200 in dev (logged) or with CONTACT_WEBHOOK_URL set; 503 in production without it
assert.ok([200, 503].includes((await post(valid)).status));

console.log("contact API checks passed");
