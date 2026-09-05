import type { MetadataRoute } from 'next';
import { classes, guides, seoEntries } from './data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dungeon-lootr-wiki.light-char-8947.chatgpt.site';
  const urls = [
    '/',
    ...seoEntries.map((entry) => entry.url),
    ...classes.map((item) => `/classes/${item.slug}/`),
    ...classes.map((item) => `/builds/${item.slug}/`),
    ...guides.map((item) => `/guides/${item.slug}/`),
    '/guides/best-aspect-by-class/',
  ];

  return urls.map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date('2026-09-05'),
    changeFrequency: url === '/' ? 'daily' : 'weekly',
    priority: url === '/' ? 1 : 0.8,
  }));
}
