import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // vinext streams async generateMetadata into <body> for normal UAs (incl. Googlebot).
  // Match all UAs so title/canonical/robots land in the initial <head> for SEO crawlers.
  // Metadata here is sync local lookups, so TTFB impact is negligible.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
