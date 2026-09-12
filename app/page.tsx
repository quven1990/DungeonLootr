import type { Metadata } from 'next';
import Link from './native-link';
import { FeaturedVideo } from './components';
import {
  UPDATE_1_CLASS_SLUGS,
  UPDATE_1_RELEASED,
  WIKI_PAGE_UPDATED,
  classBySlug,
  codesLastVerifiedAt,
  dungeonLootrCodes,
} from './data';
import { formatDisplayDate, monthYear } from './format-date';
import { pageMetadata } from './seo';

export const metadata: Metadata = pageMetadata(
  {
    title: 'Dungeon Lootr Wiki [UPDATE 1] – Classes, Tier List, Codes & Guides',
    description:
      'Find Dungeon Lootr UPDATE 1 classes, tier lists, working codes, unlock guides, Boss Rush routes and drop tools, updated for September 2026.',
    intent: 'home',
  },
  '/',
);

const popular = [
  ['UPDATE 1 Guide', '/update-1', 'New Exotic classes, codes, and what is still unconfirmed after September 7.'],
  ['Class directory', '/classes', 'Full roster after UPDATE 1, including spin, Boss Rush, Forge, and quest unlocks.'],
  ['Tier list', '/class-tier-list', 'Ranked classes by use case. UPDATE 1 names stay unrated until the kits are verified.'],
  ['Working codes', '/codes', 'Copy active codes, including UPDATE1, from the last reconciled list.'],
];

const guides = [
  ['How to Get Cursed King', '/guides/how-to-get-cursed-king', 'Floor 40+ Class Item or 50 Sukuna fragments.'],
  ['How to Get Jetstream', '/guides/how-to-get-jetstream', 'Azure Devil quest, Devil Hearts, Exotic armor, 200K coins.'],
  ['How to Get Unrestricted', '/guides/how-to-get-unrestricted', 'Checklist: level, coins, Honored One, Heavenly Fragments.'],
  ['Boss Rush floors', '/boss-rush', 'Floor 40 Class Items and Floor 100 fragment crafts.'],
];

export default function Home() {
  const updateClasses = UPDATE_1_CLASS_SLUGS.map((slug) => classBySlug(slug)).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );
  const updateCode = dungeonLootrCodes.find((item) => item.code === 'UPDATE1' && item.status === 'active');

  return (
    <main>
      <section className="hero-stage">
        <div className="site-shell hero-grid">
          <div className="eyebrow">Dungeon Lootr Wiki</div>
          <div className="hero-copy">
            <div>
              <h1>Dungeon Lootr Wiki – UPDATE 1 Classes, Codes & Guides</h1>
              <p className="page-updated">
                Updated for UPDATE 1 · {monthYear(UPDATE_1_RELEASED)} · Page updated {formatDisplayDate(WIKI_PAGE_UPDATED)}
              </p>
              <p className="serp-opening">
                Dungeon Lootr UPDATE 1 is live. Use this wiki to check the latest classes, tier list, working codes, Boss
                Rush routes, unlock guides and farming tools.
              </p>
            </div>
            <div className="quick-answer">
              <span className="label">Start here</span>
              <p>
                Four new Exotic classes landed on {formatDisplayDate(UPDATE_1_RELEASED)}: Spell Breaker, Cryomancer,
                Coyote, and Dark Professor. Older ranked classes and Boss Rush unlocks are still documented below.
              </p>
              <div className="hero-actions">
                <Link href="/update-1">See UPDATE 1 Changes</Link>
                <Link href="/classes" className="secondary">
                  View All Classes
                </Link>
              </div>
            </div>
          </div>
          <aside className="hero-panel" aria-label="UPDATE 1 snapshot">
            <div className="panel-title">UPDATE 1</div>
            <dl>
              <div>
                <dt>Released</dt>
                <dd>{formatDisplayDate(UPDATE_1_RELEASED)}</dd>
              </div>
              <div>
                <dt>New classes</dt>
                <dd>4 Exotic</dd>
              </div>
              <div>
                <dt>Codes checked</dt>
                <dd>{formatDisplayDate(codesLastVerifiedAt)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="site-shell section-grid">
        <div className="section-heading">
          <p className="eyebrow">Latest update</p>
          <h2>Dungeon Lootr UPDATE 1</h2>
        </div>
        <div className="content-panel">
          <p>
            Released {formatDisplayDate(UPDATE_1_RELEASED)}. Public coverage agrees on four new Exotic classes. Unlock
            recipes still conflict across community guides, so this wiki does not invent shop prices or drop rates.
          </p>
          <div className="card-grid four">
            {updateClasses.map((item) => (
              <Link className="intent-card" href={`/classes/${item.slug}`} key={item.slug}>
                <span>{item.name}</span>
                <p>{item.bestFor}</p>
              </Link>
            ))}
          </div>
          {updateCode ? (
            <p className="codes-meta">
              Latest highlighted code: <Link href="/codes">{updateCode.code}</Link> — {updateCode.reward}
            </p>
          ) : null}
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link href="/update-1">View UPDATE 1 Guide</Link>
            <Link className="secondary" href="/codes">
              Latest Codes
            </Link>
          </div>
        </div>
      </section>

      <FeaturedVideo title="Dungeon Lootr Wiki" videoQuery="Dungeon Lootr beginner guide codes progression Roblox" />

      <section className="site-shell search-band" aria-label="Popular shortcuts">
        <div className="search-box" role="navigation" aria-label="Jump links">
          <Link href="/update-1">UPDATE 1</Link>
          <span aria-hidden="true">·</span>
          <Link href="/classes">Classes</Link>
          <span aria-hidden="true">·</span>
          <Link href="/drop-rates">Drop Rates</Link>
          <span aria-hidden="true">·</span>
          <Link href="/boss-rush">Boss Rush</Link>
          <span aria-hidden="true">·</span>
          <Link href="/guides/how-to-get-cursed-king">Cursed King</Link>
          <span aria-hidden="true">·</span>
          <Link href="/codes">Codes</Link>
        </div>
      </section>

      <section className="site-shell section-grid">
        <div className="section-heading">
          <p className="eyebrow">Core pages</p>
          <h2>Classes, ranks, codes, Boss Rush</h2>
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
          <p className="eyebrow">Unlock guides</p>
          <h2>Documented farms that still matter</h2>
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
          <h2>Drop math and class filters</h2>
        </div>
        <div className="tool-preview content-panel">
          <p className="codes-meta">Drop chance calculator + Class Finder</p>
          <strong>Estimate attempts, then filter the roster without inventing drop rates.</strong>
          <p>
            The calculator uses real independent-trial math. Class Finder can surface UPDATE 1 names, but it will not
            auto-recommend them until unlocks are confirmed.
          </p>
          <Link href="/tools/drop-chance-calculator">Open Drop Calculator</Link>
          {' · '}
          <Link href="/tools/class-finder">Open Class Finder</Link>
        </div>
      </section>
    </main>
  );
}
