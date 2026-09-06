import Link from '../native-link';
import { PageHero, NextSteps, RelatedLinks, RetentionPanel } from '../components';
import { byUrl } from '../data';
import { bossRushClusterLinks } from '../related';
import { pageMetadata } from '../seo';

const entry = byUrl('/boss-rush')!;

export const metadata = pageMetadata(
  { title: entry.title, description: entry.description, intent: 'boss-rush' },
  '/boss-rush',
);

export default function BossRushPage() {
  return (
    <main>
      <PageHero entry={entry} cta={<div className="hero-actions"><Link href="/class-tier-list">See best classes</Link></div>} />
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>How Boss Rush unlocks work</h2>
            <ol>
              <li>Reach level 67+ and enter Boss Rush (dungeons are the fastest EXP route).</li>
              <li>From Floor 40+, Class Items for Cursed King, Honored One, and Anti Magic can drop. Higher floors improve odds.</li>
              <li>Or pick Sukuna / Gojo / Asta as the lobby boss, clear Floor 100 for 8–18 fragments, and craft at the Forge with 50 fragments.</li>
              <li>Wrong boss in the lobby means wrong fragments - always confirm before you start.</li>
            </ol>
          </section>
          <section className="content-panel">
            <h2>Priority floors</h2>
            <ul className="check-list">
              <li><Link href="/boss-rush/floor-40">Floor 40+</Link> — Class Item drop breakpoint</li>
              <li><Link href="/boss-rush/floor-100">Floor 100</Link> — fragment farm for Forge crafts</li>
              <li><Link href="/boss-rush/drops">Boss Rush drops index</Link> — both loops in one place</li>
            </ul>
          </section>
          <section className="content-panel">
            <h2>Which boss for which class</h2>
            <ul>
              <li>Sukuna → Cursed King</li>
              <li>Gojo → Honored One</li>
              <li>Asta → Anti Magic</li>
            </ul>
          </section>
          <RelatedLinks title="Related pages" links={bossRushClusterLinks('/boss-rush')} />
          <NextSteps links={[
            ['Still farming? Calculate your drop chance', '/tools/drop-chance-calculator'],
            ['Compare class tiers', '/class-tier-list'],
            ['Cursed King unlock', '/guides/how-to-get-cursed-king'],
            ['Working codes', '/codes'],
          ]} />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title="Boss Rush"
            videoQuery="Dungeon Lootr Boss Rush Roblox clear guide"
          />
          <div className="content-panel">
            <h3>Last checked</h3>
            <p>2026-09-05. Floor-specific drops should be verified after each update.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
