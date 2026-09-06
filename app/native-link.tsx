import type { AnchorHTMLAttributes, ReactNode } from 'react';

/**
 * Native anchor shim for next/link.
 * vinext's client Link currently throws on click ("e is not a function"),
 * which prevents in-page navigation. Full document navigations still work.
 */
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  prefetch?: boolean | null;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  locale?: string | false;
  passHref?: boolean;
  legacyBehavior?: boolean;
  children?: ReactNode;
};

function normalizeHref(href: string) {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  if (href.length > 1 && href.endsWith('/')) return href.replace(/\/+$/, '');
  return href;
}

export default function Link({
  href,
  prefetch: _prefetch,
  replace: _replace,
  scroll: _scroll,
  shallow: _shallow,
  locale: _locale,
  passHref: _passHref,
  legacyBehavior: _legacyBehavior,
  children,
  ...rest
}: LinkProps) {
  return (
    <a href={normalizeHref(href)} {...rest}>
      {children}
    </a>
  );
}
