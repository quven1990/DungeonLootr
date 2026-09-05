import type { Metadata } from 'next';
import type { Serp } from './data';

/** Canonical paths match live Worker behavior: no trailing slash. */
export function pageMetadata(
  serp: Serp,
  path: string,
  options?: { index?: boolean; image?: string },
): Metadata {
  const canonical = path === '/' ? '/' : path.replace(/\/$/, '') || '/';
  const index = options?.index !== false;
  return {
    title: serp.title,
    description: serp.description,
    alternates: { canonical },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: serp.title,
      description: serp.description,
      url: canonical,
      ...(options?.image ? { images: [options.image] } : {}),
    },
    twitter: {
      title: serp.title,
      description: serp.description,
    },
  };
}
