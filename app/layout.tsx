import type { Metadata, Viewport } from 'next';
import { Analytics } from './analytics';
import Link from './native-link';
import { JsonLd, websiteJsonLd } from './jsonld';
import { SiteNav } from './SiteNav';
import { FeedbackRoot, SoundToggle } from './FeedbackRoot';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dungeonlootr.top'),
    title: {
      default: 'Dungeon Lootr Wiki [UPDATE 1] – Classes, Tier List, Codes & Guides',
      template: '%s',
    },
    description:
      'Find Dungeon Lootr UPDATE 1 classes, tier lists, working codes, unlock guides, Boss Rush routes and drop tools, updated for September 2026.',
  // Do not set a sitewide canonical here — 404 and missing routes must not inherit homepage `/`.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Dungeon Lootr Wiki [UPDATE 1] – Classes, Tier List, Codes & Guides',
    description:
      'Find Dungeon Lootr UPDATE 1 classes, tier lists, working codes, unlock guides, Boss Rush routes and drop tools, updated for September 2026.',
    images: ['/images/dungeon-lootr-hero.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dungeon Lootr Wiki [UPDATE 1] – Classes, Tier List, Codes & Guides',
    description:
      'Find Dungeon Lootr UPDATE 1 classes, tier lists, working codes, unlock guides, Boss Rush routes and drop tools, updated for September 2026.',
    images: ['/images/dungeon-lootr-hero.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <FeedbackRoot />
        <SiteNav />
        {children}
        <JsonLd data={websiteJsonLd()} />
        <footer className="site-footer">
          <div className="site-shell footer">
            <div className="footer-meta">
              <span>Unofficial Dungeon Lootr fan wiki. Community-reported fields are marked on-page.</span>
              <SoundToggle />
            </div>
            <div className="footer-links">
              <Link href="/update-1">UPDATE 1</Link>
              <Link href="/classes">Classes</Link>
              <Link href="/class-tier-list">Tier List</Link>
              <Link href="/boss-rush">Boss Rush</Link>
              <Link href="/codes">Codes</Link>
              <Link href="/updatelog">Update Log</Link>
              <Link href="/tools/drop-chance-calculator">Calculator</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
