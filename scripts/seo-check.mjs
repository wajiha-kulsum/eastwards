/* Post-deploy SEO self-check: metadata, canonicals, structured data and dead
   links on the built site.

     node scripts/seo-check.mjs                       # against https://eastwards.co
     node scripts/seo-check.mjs http://localhost:3000 # against a local build

   Canonicals and the sitemap always point at the production host, so those are
   asserted against SITE even when crawling a local server.

   The www -> apex host redirect is not covered here: fetch() cannot spoof the
   Host header. Check it with:
     curl -s -o NUL -w "%{http_code} %{redirect_url}" -H "Host: www.eastwards.co" https://eastwards.co/services
*/
const BASE = process.argv[2] ?? "https://eastwards.co";
const SITE = "https://eastwards.co";

const pages = {
  "/": { title: "Eastwards Consulting | Technology that moves business forward" },
  "/about": { title: "About Us | Eastwards Consulting" },
  "/partners": { title: "Partnership | Eastwards Consulting" },
  "/contact": { title: "Contact Us | Eastwards Consulting" },
  "/services": { title: "Services | Eastwards Consulting" },
  "/services/cloud-security": { title: "Cloud Security | Eastwards Consulting" },
};

const results = [];
const check = (name, ok, detail = "") => results.push({ name, ok, detail });

const html = {};
for (const path of Object.keys(pages)) {
  const res = await fetch(BASE + path);
  html[path] = { status: res.status, body: await res.text() };
}

for (const [path, expect] of Object.entries(pages)) {
  const { status, body } = html[path];
  check(`${path} 200`, status === 200, `got ${status}`);

  const title = body.match(/<title>([^<]*)<\/title>/)?.[1];
  check(`${path} title`, title === expect.title, `got "${title}"`);

  const canonical = body.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  check(`${path} canonical`, canonical === `${SITE}${path === "/" ? "" : path}`, `got "${canonical}"`);

  check(`${path} og:title + og:image`, body.includes('property="og:title"') && body.includes('property="og:image"'));
  check(`${path} twitter card`, body.includes('name="twitter:card"'));
  check(`${path} Organization schema`, body.includes('"@type":"Organization"'));

  const blocks = [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let parsed = 0;
  for (const [, raw] of blocks) {
    try {
      JSON.parse(raw.replaceAll("\\u003c", "<"));
      parsed++;
    } catch (error) {
      check(`${path} JSON-LD parses`, false, String(error));
    }
  }
  check(`${path} JSON-LD parses`, parsed === blocks.length && parsed > 0, `${parsed}/${blocks.length} blocks`);
  check(`${path} no dead links`, !body.includes('href="#"') && !body.includes('href="/insights'));
}

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
check("sitemap has /services", sitemap.includes(`<loc>${SITE}/services</loc>`));
check("sitemap lists service pages", sitemap.includes(`<loc>${SITE}/services/`));
check("robots points at sitemap", (await (await fetch(`${BASE}/robots.txt`)).text()).includes(`${SITE}/sitemap.xml`));
check("og image serves a png", await fetch(`${BASE}/opengraph-image`).then((r) => r.ok && (r.headers.get("content-type") ?? "").includes("image/png")));
check("service page has Service schema", html["/services/cloud-security"].body.includes('"@type":"Service"'));
check("blog tiles are real images", html["/"].body.includes("object-cover"));

/* Every internal link reachable from these pages must resolve. */
const seen = new Set();
const queue = Object.keys(pages);
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await fetch(BASE + path);
  if (!res.ok) {
    check(`crawl ${path}`, false, `got ${res.status}`);
    continue;
  }
  for (const [, href] of (await res.text()).matchAll(/href="(\/[^"#?]*)"/g)) {
    if (!seen.has(href)) queue.push(href);
  }
}
check("no dead internal links", !results.some((r) => r.name.startsWith("crawl ")));

const failed = results.filter((r) => !r.ok);
for (const r of results) {
  console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.ok ? "" : `  -- ${r.detail}`}`);
}
console.log(`\n${results.length - failed.length}/${results.length} checks passed on ${BASE}`);
process.exit(failed.length ? 1 : 0);
