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

export function breadcrumbJsonLd(items: Crumb[]) {
  const withHome = items[0]?.name === 'Home' ? items : [{ name: 'Home', href: '/' }, ...items];
  // Google requires `item` on every ListItem except the last. Keep no-href
  // intermediates in the visible nav, but omit them from JSON-LD so GSC does
  // not flag "Missing field item (in itemListElement)".
  const schemaItems = withHome.filter((item, index) => {
    const isLast = index === withHome.length - 1;
    return isLast || Boolean(item.href);
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaItems.map((item, index) => {
      const isLast = index === schemaItems.length - 1;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        ...(!isLast && item.href ? { item: hrefToUrl(item.href) } : {}),
      };
    }),
  };
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const withHome = items[0]?.href === '/' ? items : [{ name: 'Home', href: '/' }, ...items];
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
