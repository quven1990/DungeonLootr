import { JsonLd } from './jsonld';
import Link from './native-link';

export type Crumb = {
  name: string;
  href?: string;
};

const SITE = 'https://dungeonlootr.top';

function hrefToUrl(href: string) {
  if (href === '/') return SITE;
  return `${SITE}${href.replace(/\/$/, '')}`;
}

/**
 * Google requires `item` on every ListItem except optionally the last.
 * We emit `item` for every crumb that has an href, including the current page,
 * so GSC does not flag missing field "item".
 * Intermediate crumbs without href stay visible in the nav but are omitted from JSON-LD.
 */
export function breadcrumbJsonLd(items: Crumb[]) {
  const withHome = items[0]?.name === 'Home' ? items : [{ name: 'Home', href: '/' }, ...items];
  const schemaItems = withHome.filter((item, index) => {
    const isLast = index === withHome.length - 1;
    return isLast || Boolean(item.href);
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: hrefToUrl(item.href) } : {}),
    })),
  };
}

export function Breadcrumbs({ items, currentPath }: { items: Crumb[]; currentPath?: string }) {
  const seeded = items[0]?.href === '/' ? items : [{ name: 'Home', href: '/' }, ...items];
  const withHome = seeded.map((item, index) => {
    const last = index === seeded.length - 1;
    if (last && !item.href && currentPath) return { ...item, href: currentPath };
    return item;
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(withHome)} />
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol>
          {withHome.map((item, index) => {
            const last = index === withHome.length - 1;
            return (
              <li key={`${item.name}-${index}`}>
                {last || !item.href ? (
                  <span aria-current={last ? 'page' : undefined}>{item.name}</span>
                ) : (
                  <Link href={item.href}>{item.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
