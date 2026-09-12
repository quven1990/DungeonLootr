import Link from '../native-link';
import { Breadcrumbs } from '../Breadcrumbs';
import { NextSteps, RelatedLinks, RetentionPanel } from '../components';
import { PageStatus } from '../PageStatus';
import { WIKI_PAGE_UPDATED, byUrl } from '../data';
import { bossRushClusterLinks } from '../related';
import { pageMetadata } from '../seo';

const entry = byUrl('/boss-rush')!;

export const metadata = pageMetadata(
  { title: entry.title, description: entry.description, intent: 'boss-rush' },
  '/boss-rush',
);

export default function BossRushPage() {
  return (
    <main>
      <section className="site-shell page-hero">
        <Breadcrumbs items={[{ name: 'Boss Rush' }]} currentPath="/boss-rush" />
        <h1>{entry.h1}</h1>
        <PageStatus updatedAt={WIKI_PAGE_UPDATED} verifiedForUpdate1={false} />
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{entry.opening}</p>
          <div className="hero-actions">
            <Link href="/guides/how-to-get-cursed-king">Cursed King Unlock</Link>
            <Link className="secondary" href="/drop-rates">
              Drop Rates
            </Link>
          </div>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>What is Boss Rush?</h2>
            <p>
              Boss Rush is the endgame floor loop used for Class Item drops and fragment farming. Access requires level
              67+. Dungeon clears are the fastest EXP route into Boss Rush on current community guides.
            </p>
          </section>
          <section className="content-panel">
            <h2>How to unlock Boss Rush</h2>
            <ol>
              <li>Reach level 67+.</li>
              <li>Enter Boss Rush from the in-game portal / mode select.</li>
              <li>Pick the lobby main boss carefully — fragment rewards follow that boss.</li>
            </ol>
          </section>
          <section className="content-panel">
            <h2>Key floors and rewards</h2>
            <ul className="check-list">
              <li>
                <Link href="/boss-rush/floor-40">Floor 40+</Link> — Class Item drop breakpoint for Cursed King, Honored
                One, and Anti Magic. Higher floors improve odds; exact % not published here.
              </li>
              <li>
                <Link href="/boss-rush/floor-100">Floor 100</Link> — 8–18 matching fragments per clear for Forge crafts
                (50 fragments per Class Item).
              </li>
              <li>
                <Link href="/boss-rush/drops">Boss Rush drops index</Link> — both loops in one place.
              </li>
            </ul>
          </section>
          <section className="content-panel">
            <h2>Which boss for which class</h2>
            <ul>
              <li>
                Sukuna → <Link href="/guides/how-to-get-cursed-king">Cursed King</Link>
              </li>
              <li>
                Gojo → <Link href="/guides/how-to-get-honored-one">Honored One</Link>
              </li>
              <li>
                Asta → <Link href="/guides/how-to-get-anti-magic">Anti Magic</Link>
              </li>
            </ul>
          </section>
          <section className="content-panel">
            <h2>Fragments and Forge</h2>
            <p>
              Floor 100 fragment farming is the deterministic backup when Class Item RNG stalls. Confirm the lobby boss
              before you start — wrong boss means wrong fragments. Rate details live in the{' '}
              <Link href="/drop-rates">Drop Rate Database</Link>.
            </p>
          </section>
          <section className="content-panel">
            <h2>UPDATE 1 note</h2>
            <p>
              UPDATE 1 Exotic classes (Spell Breaker, Cryomancer, Coyote, Dark Professor) are not documented as Boss Rush
              Floor 40/100 unlocks on this wiki. See the <Link href="/update-1">UPDATE 1 guide</Link> for conflicting shop /
              raid reports.
            </p>
          </section>
          <RelatedLinks title="Related pages" links={bossRushClusterLinks('/boss-rush')} />
          <NextSteps
            links={[
              ['Cursed King unlock', '/guides/how-to-get-cursed-king'],
              ['Drop Rate Database', '/drop-rates'],
              ['Drop chance calculator', '/tools/drop-chance-calculator'],
              ['Class tier list', '/class-tier-list'],
            ]}
          />
        </div>
        <aside className="side-rail">
          <RetentionPanel title="Boss Rush" videoQuery="Dungeon Lootr Boss Rush Roblox clear guide" />
          <div className="content-panel">
            <h3>Last checked</h3>
            <p>Floor rules last reconciled 2026-09-06. Recheck after patches.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
