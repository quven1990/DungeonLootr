import { Breadcrumbs } from '../Breadcrumbs';
import { DataNote, RetentionPanel } from '../components';
import { PageStatus } from '../PageStatus';
import { ClassFinder } from '../tools/ClassFinder';
import { WIKI_PAGE_UPDATED, byUrl, classes } from '../data';
import { pageMetadata } from '../seo';
import Link from '../native-link';

const entry = byUrl('/classes')!;

export const metadata = pageMetadata(
  { title: entry.title, description: entry.description, intent: 'classes' },
  '/classes',
);

export default function ClassesPage() {
  return (
    <main>
      <section className="site-shell page-hero">
        <Breadcrumbs items={[{ name: 'Classes' }]} />
        <h1>{entry.h1}</h1>
        <PageStatus updatedAt={WIKI_PAGE_UPDATED} verifiedForUpdate1={false} />
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{entry.opening}</p>
          <div className="hero-actions">
            <Link href="/update-1">View UPDATE 1 Guide</Link>
            <Link className="secondary" href="/class-tier-list">
              Open Tier List
            </Link>
          </div>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>How unlocks work</h2>
            <ul className="check-list">
              <li>Class spins: community rarity bands such as Rare (~70%), Epic (~20%), Legendary (~8%), Mythic (~2%), Celestial (~0.5%). Exotic spin odds still disagree across guides.</li>
              <li>Boss Rush / Forge: Cursed King, Honored One, Anti Magic via Floor 40+ Class Items or 50 matching fragments.</li>
              <li>Checklist / quest unlocks: Unrestricted, Awakened Devil EX, Jetstream.</li>
              <li>UPDATE 1: Spell Breaker, Cryomancer, Coyote, Dark Professor. Exotic names are confirmed; exact shops and drop rates are not.</li>
            </ul>
            <p>
              Names without a full profile stay in this directory and do not get empty class pages. Filter with the
              tools below, or open the standalone <Link href="/tools/class-finder">Class Finder</Link>.
            </p>
          </section>
          <ClassFinder classes={classes} heading="Class directory" />
          <DataNote />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title="Dungeon Lootr classes"
            videoQuery="Dungeon Lootr all classes tier list Roblox"
            toolHref="/tools/class-finder"
            toolLabel="Use Class Finder"
          />
          <div className="content-panel">
            <h3>About the roster size</h3>
            <p>
              Public lists land around 33 names after UPDATE 1. This directory includes confirmed names from those lists.
              A row with no link means we have the name, not a full verified profile.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
