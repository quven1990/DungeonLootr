import type { Metadata } from 'next';
import Link from './native-link';
import { FeaturedVideo } from './components';
import { classBySlug, CONTENT_LAST_CHECKED } from './data';
import { pageMetadata } from './seo';

export const metadata: Metadata = pageMetadata(
  {
    title: 'Dungeon Lootr Wiki - Best Classes, Builds, Boss Rush & Codes',
    description:
      'Fast answers for Dungeon Lootr: class tier list, unlock routes, Boss Rush drops, working codes, and a drop-chance calculator.',
    intent: 'home',
  },
  '/',
);

const popular = [
  ['Class Tier List', '/class-tier-list', 'Selected classes by Boss Rush, dungeon clear, solo value, and investment.'],
  ['Cursed King Unlock', '/guides/how-to-get-cursed-king', 'Suggested route, requirements, and what to farm next.'],
  ['Drop Calculator', '/tools/drop-chance-calculator', 'Estimate attempts for rare class items, fragments, and boss drops.'],
  ['Boss Rush Guide', '/boss-rush', 'Floor breakpoints, reward planning, and pushing strategy.'],
];

const featuredSlugs = [
  'cursed-king',
  'sinister-trigger',
  'honored-one',
  'unrestricted',
  'awakened-devil-ex',
  'dreadlord',
] as const;

const featuredClasses = featuredSlugs
  .map((slug) => classBySlug(slug))
  .filter((item): item is NonNullable<typeof item> => Boolean(item));

const guides = [
  ['How to Get Cursed King', '/guides/how-to-get-cursed-king', 'Floor 40+ Class Item or 50 Sukuna fragments.'],
  ['How to Get Jetstream', '/guides/how-to-get-jetstream', 'Azure Devil quest, Devil Hearts, Exotic armor, 200K coins.'],
  ['How to Get Unrestricted', '/guides/how-to-get-unrestricted', 'Checklist: level, coins, Honored One, Heavenly Fragments.'],
  ['Heavenly Fragments', '/guides/heavenly-fragments', '~5% Challenge Mode bosses every 10 waves.'],
];

export default function Home() {
  return (
    <main>
      <section className="hero-stage">
        <div className="site-shell hero-grid">
          <div className="eyebrow">Dungeon Lootr Wiki</div>
          <div className="hero-copy">
            <div>
              <p className="breadcrumb">Home / Fast answers / Current routes</p>
              <h1>Dungeon Lootr Wiki: Best Classes, Builds, Boss Rush & Codes</h1>
              <p className="serp-opening">
                Need a main class, an unlock route, or a drop farm plan? Start here - then jump to the tier list, Boss Rush guide, or drop calculator.
              </p>
              <div className="hero-stat-row" aria-label="Site highlights">
                <span>Working codes</span>
                <span>Tracked class unlocks</span>
                <span>Drop math tool</span>
              </div>
            </div>
            <div className="quick-answer">
              <span className="label">Quick Answer</span>
              <p>
                Pick a class, open its unlock route, then run drop math before a long farm. Start with Cursed King, Boss Rush floors, or the calculator.
              </p>
              <div className="hero-actions">
                <Link href="/classes">Browse Classes</Link>
                <Link href="/tools/drop-chance-calculator" className="secondary">Open Drop Calculator</Link>
              </div>
            </div>
          </div>
          <aside className="hero-panel" aria-label="Recently verified">
            <div className="panel-title">Community snapshot</div>
            <dl>
              <div><dt>Patch</dt><dd>Community snapshot</dd></div>
              <div><dt>Priority</dt><dd>Boss Rush routes</dd></div>
              <div><dt>Last checked</dt><dd>{CONTENT_LAST_CHECKED}</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <FeaturedVideo
        title="Dungeon Lootr Wiki"
        videoQuery="Dungeon Lootr beginner guide codes progression Roblox"
      />

      <section className="site-shell search-band" aria-label="Popular shortcuts">
        <div className="search-box" role="navigation" aria-label="Jump links">
          <Link href="/codes">Codes</Link>
          <span aria-hidden="true">·</span>
          <Link href="/class-tier-list">Tier List</Link>
          <span aria-hidden="true">·</span>
          <Link href="/boss-rush">Boss Rush</Link>
          <span aria-hidden="true">·</span>
          <Link href="/tools/class-finder">Class Finder</Link>
          <span aria-hidden="true">·</span>
          <Link href="/tools/drop-chance-calculator">Calculator</Link>
        </div>
        <div className="status-pill">Codes updated</div>
        <div className="status-pill">Boss Rush routes</div>
        <div className="status-pill">Drop math tool</div>
      </section>

      <section className="site-shell section-grid">
        <div className="section-heading">
          <p className="eyebrow">Popular today</p>
          <h2>Answer-first routes</h2>
        </div>
        <div className="card-grid four">
          {popular.map(([title, href, text]) => (
            <Link className="intent-card" href={href} key={href}>
              <span>{title}</span>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-shell section-grid">
        <div className="section-heading">
          <p className="eyebrow">Classes</p>
          <h2>Current class database</h2>
        </div>
        <div className="table-wrap desktop-table">
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Rarity</th>
                <th>Obtain</th>
                <th>Best mode</th>
              </tr>
            </thead>
            <tbody>
              {featuredClasses.map((item) => (
                <tr key={item.slug}>
                  <td><Link href={`/classes/${item.slug}`}>{item.name}</Link></td>
                  <td>
                    <span className="rarity">{item.rarity}</span>
                    {item.rarityConflictNote ? ' · pending' : ''}
                  </td>
                  <td>{item.obtain}</td>
                  <td>{item.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="class-card-list mobile-cards" aria-label="Current class database">
          {featuredClasses.map((item) => (
            <Link className="class-card" href={`/classes/${item.slug}`} key={item.slug}>
              <div className="class-card-top">
                <strong>{item.name}</strong>
                <span className="rarity">{item.rarity}{item.rarityConflictNote ? ' · pending' : ''}</span>
              </div>
              <div className="class-card-meta">
                <span>Obtain: {item.obtain}</span>
                <span>Best mode: {item.mode}</span>
              </div>
            </Link>
          ))}
        </div>
        <p>
          <Link className="primary-action" href="/classes">Browse full class directory</Link>
        </p>
      </section>

      <section className="site-shell section-grid">
        <div className="section-heading">
          <p className="eyebrow">Unlock guides</p>
          <h2>Pick the next farm</h2>
        </div>
        <div className="card-grid four">
          {guides.map(([title, href, text]) => (
            <Link className="intent-card" href={href} key={href}>
              <span>{title}</span>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-shell section-grid">
        <div className="section-heading">
          <p className="eyebrow">Tools</p>
          <h2>Plan before grinding</h2>
        </div>
        <div className="tool-preview content-panel">
          <p className="codes-meta">Drop chance calculator</p>
          <strong>Estimate attempts to 50% / 90% / 95% / 99%</strong>
          <p>Use it for boss drops, class items, fragments, and any community-reported rare-rate estimate.</p>
          <Link href="/tools/drop-chance-calculator">Calculate your runs</Link>
        </div>
      </section>
    </main>
  );
}
