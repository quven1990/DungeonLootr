import Link from 'next/link';
import { FeaturedVideo } from './components';

const popular = [
  ['Class Tier List', '/class-tier-list/', 'Best classes by Boss Rush, dungeon clear, solo value, and investment.'],
  ['Cursed King Unlock', '/guides/how-to-get-cursed-king/', 'Fastest route, requirements, and what to farm next.'],
  ['Drop Calculator', '/tools/drop-chance-calculator/', 'Estimate runs for rare class items, fragments, and boss drops.'],
  ['Boss Rush Guide', '/boss-rush/', 'Floor breakpoints, reward planning, and pushing strategy.'],
];

const classes = [
  { name: 'Cursed King', rarity: 'Mythic', obtain: 'Boss Rush / Forge', mode: 'Boss Rush', href: '/classes/cursed-king/' },
  { name: 'Sinister Trigger', rarity: 'Mythic', obtain: 'Late-game route', mode: 'Dungeon clear', href: '/classes/sinister-trigger/' },
  { name: 'Honored One', rarity: 'Mythic', obtain: 'Unlock chain', mode: 'Solo', href: '/classes/honored-one/' },
  { name: 'Unrestricted', rarity: 'Secret', obtain: 'Prerequisite chain', mode: 'Endgame', href: '/classes/unrestricted/' },
  { name: 'Awakened Devil EX', rarity: 'Secret', obtain: 'Rare material path', mode: 'Burst', href: '/classes/awakened-devil-ex/' },
  { name: 'Dreadlord', rarity: 'Legendary', obtain: 'Boss route', mode: 'Survival', href: '/classes/dreadlord/' },
];

const guides = [
  ['How to Get Cursed King', '/guides/how-to-get-cursed-king/', 'Boss Rush first, Forge as deterministic backup.'],
  ['How to Get Honored One', '/guides/how-to-get-honored-one/', 'Prerequisites, fragments, and route order.'],
  ['How to Get Unrestricted', '/guides/how-to-get-unrestricted/', 'Checklist for the late-game unlock chain.'],
  ['Heavenly Fragments', '/guides/heavenly-fragments/', 'Where they fit into class progression.'],
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
                <span>50 phase-one routes</span>
                <span>15 class targets</span>
                <span>Drop math tool</span>
              </div>
            </div>
            <div className="quick-answer">
              <span className="label">Quick Answer</span>
              <p>
                Start with the class directory if you are choosing a main, use the unlock guides when you already know your target, and open the drop calculator before committing to a long rare-item farm.
              </p>
              <div className="hero-actions">
                <Link href="/classes/">Browse Classes</Link>
                <Link href="/tools/drop-chance-calculator/" className="secondary">Open Drop Calculator</Link>
              </div>
            </div>
          </div>
          <aside className="hero-panel" aria-label="Recently verified">
            <div className="panel-title">Recently verified</div>
            <dl>
              <div><dt>Patch</dt><dd>Community-tested</dd></div>
              <div><dt>Priority</dt><dd>Boss Rush routes</dd></div>
              <div><dt>Last checked</dt><dd>2026-09-05</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <FeaturedVideo
        title="Dungeon Lootr Wiki"
        videoQuery="Dungeon Lootr beginner guide codes progression Roblox"
      />

      <section className="site-shell search-band" aria-label="Search shortcuts">
        <div className="search-box">Search classes, drops, aspects, guides...</div>
        <div className="status-pill">Data notes visible</div>
        <div className="status-pill">Tool-first pages</div>
        <div className="status-pill">Intent next steps</div>
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
              {classes.map((item) => (
                <tr key={item.name}>
                  <td><Link href={item.href}>{item.name}</Link></td>
                  <td><span className="rarity">{item.rarity}</span></td>
                  <td>{item.obtain}</td>
                  <td>{item.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="class-card-list mobile-cards" aria-label="Current class database">
          {classes.map((item) => (
            <Link className="class-card" href={item.href} key={item.name}>
              <div className="class-card-top">
                <strong>{item.name}</strong>
                <span className="rarity">{item.rarity}</span>
              </div>
              <div className="class-card-meta">
                <span>Obtain: {item.obtain}</span>
                <span>Best mode: {item.mode}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-shell split-section">
        <div>
          <p className="eyebrow">Unlock guides</p>
          <h2>Pick the next farm</h2>
          <div className="stack">
            {guides.map(([title, href, text]) => (
              <Link className="row-link" href={href} key={href}>
                <span>{title}</span>
                <small>{text}</small>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Tools</p>
          <h2>Plan before grinding</h2>
          <div className="tool-preview">
            <span className="label">Drop chance formula</span>
            <strong>P(at least once) = 1 - (1 - p)^n</strong>
            <p>Use it for boss drops, class items, fragments, and any community-tested rare-rate estimate.</p>
            <Link href="/tools/drop-chance-calculator/">Calculate your runs</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
