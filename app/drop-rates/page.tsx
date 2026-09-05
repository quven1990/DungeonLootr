import Link from 'next/link';
import { DataNote, PageHero, RetentionPanel } from '../components';
import { byUrl } from '../data';

export const metadata = {
  title: 'Dungeon Lootr Drop Rates - Boss, Class Item & Fragment Chances',
  description: 'Check Dungeon Lootr drop rates for boss loot, class items, fragments, and rare materials, with last-checked patch dates and farming notes.',
};

export default function DropRatesPage() {
  const entry = byUrl('/drop-rates/')!;
  return (
    <main>
      <PageHero entry={entry} cta={<div className="hero-actions"><Link href="/tools/drop-chance-calculator/">Open Drop Calculator</Link></div>} />
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>Drop tracking table</h2>
            <p>Exact official rates are not published for every source. Use this page as the verified-rate index and mark community estimates clearly before scaling item pages.</p>
          </section>
          <DataNote />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title="drop rates"
            videoQuery="Dungeon Lootr drop rates boss drops Roblox"
          />
          <div className="content-panel">
            <h3>Best next action</h3>
            <p>For any rate estimate, calculate 50%, 90%, 95%, and 99% run targets before choosing a farm.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
