import type { MetadataRoute } from 'next';
import { bossRushPages, classes, comparisons, guides, hubPages, seoEntries, toolPages } from './data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dungeonlootr.top';
  const urls = [
    '/',
    ...seoEntries.map((entry) => entry.url),
    ...hubPages.map((page) => `/${page.slug}/`),
    ...classes.map((item) => `/classes/${item.slug}/`),
    ...classes.map((item) => `/builds/${item.slug}/`),
    ...guides.map((item) => `/guides/${item.slug}/`),
    ...bossRushPages.map((page) => `/boss-rush/${page.slug}/`),
    ...comparisons.map((page) => `/comparisons/${page.slug}/`),
    ...toolPages.map((page) => `/tools/${page.slug}/`),
    '/guides/best-aspect-by-class/',
  ];

  return urls.map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date('2026-09-05'),
    changeFrequency: url === '/' ? 'daily' : 'weekly',
    priority: url === '/' ? 1 : 0.8,
  }));
}
