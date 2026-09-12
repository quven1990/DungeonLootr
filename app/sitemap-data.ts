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
  '/': '2026-09-12',
  '/update-1': '2026-09-12',
  '/classes': '2026-09-12',
  '/class-tier-list': '2026-09-09',
  '/codes': '2026-09-12',
  '/updatelog': '2026-09-12',
  '/drop-rates': '2026-09-12',
  '/boss-rush': '2026-09-12',
  '/tools/drop-chance-calculator': '2026-09-09',
  '/tools/class-finder': '2026-09-09',
  '/classes/cursed-king': '2026-09-12',
  '/classes/spell-breaker': '2026-09-12',
  '/classes/cryomancer': '2026-09-12',
  '/classes/coyote': '2026-09-12',
  '/classes/dark-professor': '2026-09-12',
  '/guides/how-to-get-cursed-king': '2026-09-12',
};

const BATCH_LASTMOD = '2026-09-07';
const DEFAULT_LASTMOD = '2026-09-06';

function lastmodFor(path: string) {
  if (LASTMOD_BY_PATH[path]) return LASTMOD_BY_PATH[path];
  if (
    path.startsWith('/classes/') ||
    path === '/tools/aspect-matcher' ||
    path === '/guides/best-aspect-by-class' ||
    path === '/progression-guide' ||
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
  const urls = [
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
  return [...new Set(urls)];
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
