import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dungeonlootr.top'),
  title: 'Dungeon Lootr Wiki - Best Classes, Builds, Boss Rush & Codes',
  description:
    'Fast answers for Dungeon Lootr: class tier list, unlock routes, Boss Rush drops, working codes, and a drop-chance calculator.',
  openGraph: {
    title: 'Dungeon Lootr Wiki - Best Classes, Builds, Boss Rush & Codes',
    description:
      'Fast answers for Dungeon Lootr: class tier list, unlock routes, Boss Rush drops, working codes, and a drop-chance calculator.',
    images: ['/images/dungeon-lootr-hero.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dungeon Lootr Wiki - Best Classes, Builds, Boss Rush & Codes',
    description:
      'Fast answers for Dungeon Lootr: class tier list, unlock routes, Boss Rush drops, working codes, and a drop-chance calculator.',
    images: ['/images/dungeon-lootr-hero.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
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
