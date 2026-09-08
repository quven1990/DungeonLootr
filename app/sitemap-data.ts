import { bossRushPages, classes, comparisons, demotedHubSlugs, guides, hubPages, isIndexableBuild, isIndexableClass, seoEntries, toolPages } from './data';

const SITE = 'https://dungeonlootr.top';

function clean(path: string) {
  if (path === '/') return SITE;
  return `${SITE}${path.replace(/\/$/, '')}`;
}

/** Custom public URL map path (not /sitemap.xml). */
export const URL_MAP_PATH = '/dl-lootr-urlmap.xml';

/** Only bump lastmod when that URL's substance changed. */
const LASTMOD_BY_PATH: Record<string, string> = {
  '/codes': '2026-09-06',
  '/classes/cursed-king': '2026-09-09',
  '/guides/how-to-get-cursed-king': '2026-09-09',
  '/updatelog': '2026-09-09',
};

const BATCH_LASTMOD = '2026-09-07';
const DEFAULT_LASTMOD = '2026-09-06';

function lastmodFor(path: string) {
  if (LASTMOD_BY_PATH[path]) return LASTMOD_BY_PATH[path];
  if (
    path === '/' ||
    path === '/updatelog' ||
    path === '/classes' ||
    path === '/class-tier-list' ||
    path === '/tools/drop-chance-calculator' ||
    path === '/tools/class-finder' ||
    path === '/tools/aspect-matcher' ||
    path === '/guides/best-aspect-by-class' ||
    path === '/progression-guide' ||
    path.startsWith('/classes/') ||
    path.startsWith('/guides/') ||
    path.startsWith('/builds/')
  ) {
    return BATCH_LASTMOD;
  }
  return DEFAULT_LASTMOD;
}

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
      const lastmod = lastmodFor(path);
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
