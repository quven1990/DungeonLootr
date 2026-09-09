'use client';

import { useEffect, useId, useState } from 'react';
import Link from './native-link';

const navItems = [
  ['UPDATE 1', '/update-1'],
  ['Classes', '/classes'],
  ['Tier List', '/class-tier-list'],
  ['Boss Rush', '/boss-rush'],
  ['Codes', '/codes'],
  ['Tools', '/tools/drop-chance-calculator'],
] as const;

function normalizePath(path: string) {
  if (!path) return '/';
  const cleaned = path.replace(/\/+$/, '');
  return cleaned || '/';
}

function isActive(pathname: string, href: string) {
  if (href.startsWith('/tools')) return pathname.startsWith('/tools');
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [pathname, setPathname] = useState('/');
  const panelId = useId();

  useEffect(() => {
    setPathname(normalizePath(window.location.pathname));
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-drawer-open', open);
    return () => document.body.classList.remove('nav-drawer-open');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="site-nav">
        <nav className="nav-inner" aria-label="Main navigation">
          <Link href="/" className="brand" aria-label="Dungeon Lootr home">
            <span className="brand-mark">DL</span>
            <span className="brand-text">Dungeon Lootr</span>
          </Link>

          <div className="nav-links nav-links-desktop">
            {navItems.map(([label, href]) => (
              <Link
                href={href}
                key={href}
                className={isActive(pathname, href) ? 'is-active' : undefined}
                aria-current={isActive(pathname, href) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className={`menu-toggle${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-toggle-bars" aria-hidden="true" />
            <span className="menu-toggle-text">{open ? 'Close' : 'Menu'}</span>
          </button>
        </nav>
      </header>

      {/* Keep fixed overlays outside .site-nav — backdrop-filter creates a containing block. */}
      <div
        className={`nav-backdrop${open ? ' is-open' : ''}`}
        hidden={!open}
        onClick={() => setOpen(false)}
      />

      <div
        id={panelId}
        className={`nav-drawer${open ? ' is-open' : ''}`}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="nav-drawer-head">
          <p className="nav-drawer-label">Navigate</p>
          <button
            type="button"
            className="nav-drawer-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
        <div className="nav-drawer-links">
          {navItems.map(([label, href]) => (
            <Link
              href={href}
              key={href}
              className={isActive(pathname, href) ? 'is-active' : undefined}
              aria-current={isActive(pathname, href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
