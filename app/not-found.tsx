import Link from './native-link';
import { notFoundMetadata } from './seo';

export const metadata = notFoundMetadata;

const links = [
  ['Home', '/'],
  ['Class tier list', '/class-tier-list'],
  ['All classes', '/classes'],
  ['Boss Rush guide', '/boss-rush'],
  ['Working codes', '/codes'],
  ['Drop calculator', '/tools/drop-chance-calculator'],
] as const;

export default function NotFound() {
  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / 404</p>
        <h1>Page not found</h1>
        <div className="quick-answer wide">
          <span className="label">404</span>
          <p>This URL is not on Dungeon Lootr Wiki. Use a link below, or start from the homepage.</p>
        </div>
      </section>
      <section className="site-shell content-grid">
        <section className="content-panel">
          <h2>Useful pages</h2>
          <ul className="check-list">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
