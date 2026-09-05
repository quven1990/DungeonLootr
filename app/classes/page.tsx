import Link from 'next/link';
import { ClassTable, DataNote, PageHero, RetentionPanel } from '../components';
import { byUrl } from '../data';

const entry = byUrl('/classes/')!;

export const metadata = {
  title: entry.title,
  description: entry.description,
};

export default function ClassesPage() {
  return (
    <main>
      <PageHero entry={entry} />
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>How unlocks work</h2>
            <ul className="check-list">
              <li>Class spins: rarity bands such as Epic (~20%), Legendary (~8%), Celestial (~0.5%), Exotic (~0.05%).</li>
              <li>Boss Rush / Forge: Cursed King, Honored One, Anti Magic via Floor 40+ Class Items or 50 matching fragments.</li>
              <li>Checklist / quest unlocks: Unrestricted, Awakened Devil EX, Jetstream (NPC quest).</li>
              <li>Rare dungeon drops: Dreadlord via Underworld Glaive (~1%).</li>
            </ul>
            <p>
              Use the <Link href="/tools/class-finder/">Class Finder</Link> to filter by tier and mode before opening an unlock guide.
            </p>
          </section>
          <ClassTable />
          <DataNote />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title="Dungeon Lootr classes"
            videoQuery="Dungeon Lootr all classes tier list Roblox"
            toolHref="/tools/class-finder/"
            toolLabel="Use Class Finder"
          />
          <div className="content-panel">
            <h3>Confidence labels</h3>
            <p>probable = multiple community guides agree. unverified = obtain method not confirmed yet (for example Shadow Vagrant / Streamline).</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
