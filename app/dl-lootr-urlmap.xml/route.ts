import { buildUrlMapXml } from '../sitemap-data';

export async function GET() {
  return new Response(buildUrlMapXml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
