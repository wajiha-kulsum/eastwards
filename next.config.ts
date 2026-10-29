import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  redirects: async () => [
    // Both hosts serve the site; keep one indexable. (The host's edge
    // redirect could do this, but keeping it in the repo keeps it portable.)
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.eastwards.co" }],
      destination: "https://eastwards.co/:path*",
      permanent: true,
    },
  ],
};

export default nextConfig;
