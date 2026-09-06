import type { Metadata } from 'next';
import type { Serp } from './data';

/** Soft-404 safe: unique title, noindex, never canonicalize to homepage. */
export const notFoundMetadata: Metadata = {
  title: 'Page not found - Dungeon Lootr Wiki',
  description: 'This page does not exist. Browse classes, tier list, Boss Rush, codes, or the drop calculator instead.',
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Page not found - Dungeon Lootr Wiki',
    description: 'This page does not exist on Dungeon Lootr Wiki.',
  },
  twitter: {
    title: 'Page not found - Dungeon Lootr Wiki',
    description: 'This page does not exist on Dungeon Lootr Wiki.',
  },
};

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
