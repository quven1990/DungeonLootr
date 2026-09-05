import Link from 'next/link';
import { ClassTable, DataNote, PageHero, RetentionPanel } from '../components';
import { byUrl, classes } from '../data';

const entry = byUrl('/class-tier-list/')!;

export const metadata = {
  title: entry.title,
  description: entry.description,
};

export default function TierPage() {
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
          <RetentionPanel
            title="class tier list"
            videoQuery="Dungeon Lootr class tier list best classes Roblox"
            toolHref="/tools/class-finder/"
            toolLabel="Find your class"
          />
          <div className="content-panel">
            <h3>Mode-based verdict</h3>
            <p>Boss Rush favors consistency and survivability, while dungeon clearing rewards burst windows and mobility.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
