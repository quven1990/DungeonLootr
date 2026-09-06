/**
 * Submit indexable URLs to IndexNow (Bing and partners).
 *
 * Usage:
 *   node scripts/indexnow.mjs
 *   node scripts/indexnow.mjs --url https://dungeonlootr.top/codes
 *   node scripts/indexnow.mjs --sitemap https://dungeonlootr.top/dl-lootr-urlmap.xml
 */
const HOST = 'dungeonlootr.top';
const KEY = '644b691f58654ef8a1c2d4fbf027d607';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const DEFAULT_SITEMAP = `https://${HOST}/dl-lootr-urlmap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

function parseArgs(argv) {
  const urls = [];
  let sitemap = DEFAULT_SITEMAP;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--sitemap') {
      sitemap = argv[++i];
    } else if (arg === '--url') {
      urls.push(argv[++i]);
    } else if (arg === '--help' || arg === '-h') {
      console.log(`Usage: node scripts/indexnow.mjs [--sitemap URL] [--url URL]...`);
      process.exit(0);
    }
  }
  return { urls, sitemap };
}

async function fetchSitemapUrls(sitemapUrl) {
  const res = await fetch(sitemapUrl, {
    headers: { 'user-agent': 'DungeonLootr-IndexNow/1.0' },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap ${sitemapUrl}: ${res.status}`);
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1].trim());
  return [...new Set(urls)].filter((url) => {
    try {
      return new URL(url).hostname === HOST;
    } catch {
      return false;
    }
  });
}

async function verifyKeyFile() {
  const res = await fetch(KEY_LOCATION, {
    headers: { 'user-agent': 'DungeonLootr-IndexNow/1.0' },
  });
  const body = (await res.text()).trim();
  if (!res.ok) {
    throw new Error(`Key file not reachable at ${KEY_LOCATION} (HTTP ${res.status})`);
  }
  if (body !== KEY) {
    throw new Error(`Key file content mismatch at ${KEY_LOCATION}`);
  }
}

async function submit(urlList) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  return { status: res.status, text };
}

async function main() {
  const { urls: cliUrls, sitemap } = parseArgs(process.argv.slice(2));
  console.log(`Verifying IndexNow key at ${KEY_LOCATION}...`);
  await verifyKeyFile();
  console.log('Key file OK.');

  const urlList = cliUrls.length ? [...new Set(cliUrls)] : await fetchSitemapUrls(sitemap);
  if (!urlList.length) {
    throw new Error('No URLs to submit.');
  }

  console.log(`Submitting ${urlList.length} URL(s) to ${ENDPOINT}...`);
  const { status, text } = await submit(urlList);
  // IndexNow: 200 OK, 202 Accepted are success; 204 also seen as success for some endpoints.
  if (status === 200 || status === 202 || status === 204) {
    console.log(`IndexNow success: HTTP ${status}${text ? ` ${text}` : ''}`);
    console.log(`Sample: ${urlList.slice(0, 5).join(', ')}${urlList.length > 5 ? ' ...' : ''}`);
    return;
  }
  console.error(`IndexNow failed: HTTP ${status}${text ? `\n${text}` : ''}`);
  process.exit(1);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
