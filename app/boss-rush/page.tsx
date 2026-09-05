import Link from 'next/link';
import { PageHero, NextSteps, RetentionPanel } from '../components';
import { byUrl } from '../data';

const entry = byUrl('/boss-rush/')!;

export const metadata = {
  title: entry.title,
  description: entry.description,
};

export default function BossRushPage() {
  return (
    <main>
      <PageHero entry={entry} cta={<div className="hero-actions"><Link href="/class-tier-list/">See best classes</Link></div>} />
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>How to use Boss Rush</h2>
            <p>Push only when your clear rate stays consistent. If a floor becomes slow, farm the previous stable breakpoint until your class, Aspect, and stats can carry the next push.</p>
          </section>
          <section className="content-panel">
            <h2>Priority rewards</h2>
            <ul>
              <li>Class unlock materials and fragments.</li>
              <li>Rare drops that feed Forge or shrine paths.</li>
              <li>Progression currency needed for late-game unlock chains.</li>
            </ul>
          </section>
          <NextSteps links={[['Still farming? Calculate your drop chance', '/tools/drop-chance-calculator/'], ['Compare top classes', '/class-tier-list/']]} />
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
