import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  redirects: async () => [
    // No services index yet; all href="/services" gateways (nav items, hero
    // and features CTAs) land on the flagship service instead of a 404.
    { source: "/services", destination: "/services/application-services", permanent: false },
  ],
};

export default nextConfig;
