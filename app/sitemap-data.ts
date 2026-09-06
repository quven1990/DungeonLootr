import { bossRushPages, classes, comparisons, demotedHubSlugs, guides, hubPages, isIndexableBuild, isIndexableClass, seoEntries, toolPages } from './data';

const SITE = 'https://dungeonlootr.top';

function clean(path: string) {
  if (path === '/') return SITE;
  return `${SITE}${path.replace(/\/$/, '')}`;
}

/** Custom public URL map path (not /sitemap.xml). */
export const URL_MAP_PATH = '/dl-lootr-urlmap.xml';

/** Per-path lastmod overrides when content actually changed. */
const LASTMOD_BY_PATH: Record<string, string> = {
  '/': '2026-09-06',
  '/codes': '2026-09-06',
  '/updatelog': '2026-09-06',
};

const DEFAULT_LASTMOD = '2026-09-06';

export function getIndexableUrls() {
  const indexableClasses = classes.filter(isIndexableClass);
  const indexableBuilds = classes.filter(isIndexableBuild);
  return [
    '/',
    '/updatelog',
    ...seoEntries.map((entry) => entry.url),
    ...hubPages.filter((page) => !demotedHubSlugs.has(page.slug)).map((page) => `/${page.slug}`),
    ...indexableClasses.map((item) => `/classes/${item.slug}`),
    ...indexableBuilds.map((item) => `/builds/${item.slug}`),
    ...guides.map((item) => `/guides/${item.slug}`),
    ...bossRushPages.map((page) => `/boss-rush/${page.slug}`),
    ...comparisons.map((page) => `/comparisons/${page.slug}`),
    ...toolPages.map((page) => `/tools/${page.slug}`),
    '/guides/best-aspect-by-class',
  ];
}

export function buildUrlMapXml() {
  const urls = getIndexableUrls();
  const body = urls
    .map((path) => {
      const loc = clean(path);
      const lastmod = LASTMOD_BY_PATH[path] ?? DEFAULT_LASTMOD;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}
