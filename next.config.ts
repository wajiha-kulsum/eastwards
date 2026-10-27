import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  redirects: async () => [
    // Both hosts serve the site; keep one indexable. (A Vercel domain-level
    // redirect would do this at the edge — this keeps it in the repo.)
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.eastwards.co" }],
      destination: "https://eastwards.co/:path*",
      permanent: true,
    },
  ],
};

export default nextConfig;
