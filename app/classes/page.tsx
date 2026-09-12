import { Breadcrumbs } from '../Breadcrumbs';
import { DataNote, RetentionPanel } from '../components';
import { PageStatus } from '../PageStatus';
import { ClassFinder } from '../tools/ClassFinder';
import {
  UPDATE_1_CLASS_SLUGS,
  WIKI_PAGE_UPDATED,
  byUrl,
  classBySlug,
  classes,
} from '../data';
import { pageMetadata } from '../seo';
import Link from '../native-link';

const entry = byUrl('/classes')!;

export const metadata = pageMetadata(
  { title: entry.title, description: entry.description, intent: 'classes' },
  '/classes',
);

export default function ClassesPage() {
  const updateClasses = UPDATE_1_CLASS_SLUGS.map((slug) => classBySlug(slug)).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );

  return (
    <main>
      <section className="site-shell page-hero">
        <Breadcrumbs items={[{ name: 'Classes' }]} currentPath="/classes" />
        <h1>{entry.h1}</h1>
        <PageStatus updatedAt={WIKI_PAGE_UPDATED} verifiedForUpdate1={false} />
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{entry.opening}</p>
          <div className="hero-actions">
            <Link href="/update-1">UPDATE 1 Guide</Link>
            <Link className="secondary" href="/class-tier-list">
              Tier List
            </Link>
          </div>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>UPDATE 1 Classes</h2>
            <p>
              These four Exotic names are the current search winners. Open the entity page for obtain status — rates and
              skills stay Unknown until verified.
            </p>
            <div className="class-card-list" aria-label="UPDATE 1 classes">
              {updateClasses.map((item) => (
                <Link className="class-card" href={`/classes/${item.slug}`} key={item.slug}>
                  <div className="class-card-top">
                    <strong>{item.name}</strong>
                    <span className="status-pill">{item.rarity}</span>
                  </div>
                  <div className="class-card-meta">
                    <span>{item.mode}</span>
                    <span>{item.bestFor}</span>
                    <span>Obtain: see class page (conflicting reports)</span>
                  </div>
                </Link>
              ))}
            </div>
            <p style={{ marginTop: 12 }}>
              Also see <Link href="/guides/how-to-get-cursed-king">How to Get Cursed King</Link> for the strongest older
              unlock query on this wiki.
            </p>
          </section>
          <section className="content-panel">
            <h2>How unlocks work</h2>
            <ul className="check-list">
              <li>Class spins: Rare (~70%), Epic (~20%), Legendary (~8%), Mythic (~2%), Celestial (~0.5%). Exotic spin odds still disagree across guides.</li>
              <li>Boss Rush / Forge: Cursed King, Honored One, Anti Magic via Floor 40+ Class Items or 50 matching fragments.</li>
              <li>Checklist / quest unlocks: Unrestricted, Awakened Devil EX, Jetstream.</li>
              <li>UPDATE 1: Spell Breaker, Cryomancer, Coyote, Dark Professor — Exotic names confirmed; shops/rates not.</li>
            </ul>
          </section>
          <ClassFinder classes={classes} heading="Other classes / full directory" />
          <p>
            Compare ranked kits on the <Link href="/class-tier-list">tier list</Link>. Names without a full profile stay
            listing-only and do not get empty class pages.
          </p>
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
            <h3>Hub job</h3>
            <p>
              This page routes players to entity pages. It is not the primary ranking target for “Spell Breaker dungeon
              lootr” style queries.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
