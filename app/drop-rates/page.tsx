import Link from 'next/link';
import { DataNote, PageHero, RetentionPanel } from '../components';
import { byUrl } from '../data';

const entry = byUrl('/drop-rates/')!;

export const metadata = {
  title: entry.title,
  description: entry.description,
};

export default function DropRatesPage() {
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
