import { ClassTable, DataNote, PageHero, RetentionPanel } from '../components';
import { byUrl } from '../data';

export const metadata = {
  title: 'Dungeon Lootr Classes - All Classes, Rarities & How to Unlock Them',
  description: 'Browse Dungeon Lootr classes by rarity and unlock method, including Boss Rush drops, Forge routes, strengths, builds, and current patch notes.',
};

export default function ClassesPage() {
  const entry = byUrl('/classes/')!;
  return (
    <main>
      <PageHero entry={entry} />
      <section className="site-shell content-grid">
        <div className="article-stack">
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
            <h3>Filters to add next</h3>
            <p>Rarity, obtain method, best mode, and confidence are already structured for the next expansion pass.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
