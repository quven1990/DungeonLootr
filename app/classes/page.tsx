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
