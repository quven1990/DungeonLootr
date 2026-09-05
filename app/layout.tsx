import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dungeon Lootr Wiki - Classes, Builds, Boss Rush, Drops & Guides',
  description:
    'Dungeon Lootr guides for classes, builds, Boss Rush, drops, unlocks, Aspects, codes, and the latest update - built for fast answers, not filler.',
  openGraph: {
    title: 'Dungeon Lootr Wiki - Classes, Builds, Boss Rush, Drops & Guides',
    description:
      'Fast Dungeon Lootr answers, class routes, drop tools, Boss Rush planning, and build recommendations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dungeon Lootr Wiki',
    description: 'Answer-first Dungeon Lootr guides, tools, and data.',
  },
};

const navItems = [
  ['Classes', '/classes/'],
  ['Tier List', '/class-tier-list/'],
  ['Boss Rush', '/boss-rush/'],
  ['Drops', '/drop-rates/'],
  ['Tools', '/tools/drop-chance-calculator/'],
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-nav">
          <nav className="nav-inner" aria-label="Main navigation">
            <Link href="/" className="brand" aria-label="Dungeon Lootr home">
              <span className="brand-mark">DL</span>
              <span>Dungeon Lootr</span>
            </Link>
            <div className="nav-links">
              {navItems.map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <div className="site-shell footer">
            <span>Dungeon Lootr data hub. Community-tested fields are marked on-page.</span>
            <Link href="/tools/drop-chance-calculator/">Open calculator</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
