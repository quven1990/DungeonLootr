import type { MetadataRoute } from 'next';
import { URL_MAP_PATH } from './sitemap-data';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://dungeonlootr.top${URL_MAP_PATH}`,
  };
}
