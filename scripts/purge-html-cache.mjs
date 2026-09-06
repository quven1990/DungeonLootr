/**
 * Safe Cloudflare cache purge after deploy.
 *
 * DO NOT use purge_everything here.
 * Hashed /_next/static/* CSS/JS are immutable; purging them (or everything)
 * while HTML is mid-refresh can leave the browser on HTML that points at
 * deleted chunk hashes → "site has no styles".
 *
 * This script only purges HTML/document URLs from the live sitemap (+ a few
 * fixed pages), so visitors pick up new HTML that references the new hashes.
 *
 * Env:
 *   CLOUDFLARE_API_TOKEN  (Zone.Cache Purge + Zone.Read)
 *   CLOUDFLARE_ZONE_ID    (dungeonlootr.top zone)
 * Optional:
 *   INDEXNOW_SITEMAP / --sitemap
 */
const HOST = 'dungeonlootr.top';
const DEFAULT_SITEMAP = `https://${HOST}/dl-lootr-urlmap.xml`;
const EXTRA_PATHS = ['/', '/updatelog', '/privacy', '/terms', '/robots.txt', '/dl-lootr-urlmap.xml'];

function parseArgs(argv) {
  let sitemap = process.env.INDEXNOW_SITEMAP || DEFAULT_SITEMAP;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--sitemap') sitemap = argv[++i];
  }
  return { sitemap };
}

function isPurgeSafeUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname !== HOST) return false;
    // Never purge fingerprinted build assets.
    if (u.pathname.startsWith('/_next/static/')) return false;
    if (/\.(css|js|map|woff2?|ttf|png|jpe?g|gif|webp|svg|ico)$/i.test(u.pathname)) return false;
    return true;
  } catch {
    return false;
  }
}

async function fetchSitemapUrls(sitemapUrl) {
  const res = await fetch(sitemapUrl, { headers: { 'user-agent': 'DungeonLootr-CachePurge/1.0' } });
  if (!res.ok) throw new Error(`Failed to fetch sitemap ${sitemapUrl}: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1].trim());
}

async function purgeFiles(zoneId, token, files) {
  // Cloudflare free/pro: max 30 URLs per request.
  const chunkSize = 30;
  for (let i = 0; i < files.length; i += chunkSize) {
    const chunk = files.slice(i, i + chunkSize);
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ files: chunk }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(`Purge failed (${res.status}): ${JSON.stringify(data.errors || data)}`);
    }
    console.log(`Purged ${chunk.length} HTML URL(s) [${i + 1}-${i + chunk.length}/${files.length}]`);
  }
}

async function main() {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  if (!token || !zoneId) {
    console.warn('Skip cache purge: set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID');
    process.exit(0);
  }

  const { sitemap } = parseArgs(process.argv.slice(2));
  const fromSitemap = await fetchSitemapUrls(sitemap);
  const urls = [...new Set([...EXTRA_PATHS.map((p) => `https://${HOST}${p === '/' ? '/' : p}`), ...fromSitemap])].filter(
    isPurgeSafeUrl,
  );

  if (!urls.length) throw new Error('No safe HTML URLs to purge');
  console.log(`Safe HTML purge for ${urls.length} URL(s) on zone ${zoneId} (not purge_everything)...`);
  await purgeFiles(zoneId, token, urls);
  console.log('HTML cache purge OK. Immutable /_next/static assets were left untouched.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
