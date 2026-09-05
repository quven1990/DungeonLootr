import type { MetadataRoute } from 'next';
import { bossRushPages, classes, comparisons, guides, hubPages, isIndexableClass, seoEntries, toolPages } from './data';

function clean(path: string) {
  if (path === '/') return 'https://dungeonlootr.top';
  return `https://dungeonlootr.top${path.replace(/\/$/, '')}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const indexableClasses = classes.filter(isIndexableClass);
  const urls = [
    '/',
    ...seoEntries.map((entry) => entry.url),
    ...hubPages.map((page) => `/${page.slug}`),
    ...indexableClasses.map((item) => `/classes/${item.slug}`),
    ...indexableClasses.map((item) => `/builds/${item.slug}`),
    ...guides.map((item) => `/guides/${item.slug}`),
    ...bossRushPages.map((page) => `/boss-rush/${page.slug}`),
    ...comparisons.map((page) => `/comparisons/${page.slug}`),
    ...toolPages.map((page) => `/tools/${page.slug}`),
    '/guides/best-aspect-by-class',
  ];

  return urls.map((url) => ({
    url: clean(url),
    lastModified: new Date('2026-09-06'),
    changeFrequency: url === '/' ? 'daily' : 'weekly',
    priority: url === '/' ? 1 : 0.8,
  }));
}
