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
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: withHome.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: hrefToUrl(item.href) } : {}),
    })),
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
