import Link from 'next/link';
import { ClassTable, DataNote, PageHero } from '../components';
import { byUrl, classes } from '../data';

export const metadata = {
  title: 'Dungeon Lootr Class Tier List - Best Classes After the Latest Update',
  description: 'See the best Dungeon Lootr classes ranked for Boss Rush, dungeon clearing, mobility, and endgame value, with patch-aware recommendations.',
};

export default function TierPage() {
  const entry = byUrl('/class-tier-list/')!;
  const top = classes.slice(0, 5);
  return (
    <main>
      <PageHero entry={entry} cta={<div className="hero-actions"><Link href="/tools/drop-chance-calculator/">Plan a farm</Link></div>} />
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>Current endgame shortlist</h2>
            <ol>
              {top.map((item) => (
                <li key={item.slug}>{item.name}: strongest when built for {item.mode.toLowerCase()}.</li>
              ))}
            </ol>
          </section>
          <ClassTable />
          <DataNote />
        </div>
        <aside className="side-rail">
          <div className="content-panel">
            <h3>Mode-based verdict</h3>
            <p>Boss Rush favors consistency and survivability, while dungeon clearing rewards burst windows and mobility.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
