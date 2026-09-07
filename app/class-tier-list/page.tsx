import Link from '../native-link';
import { ClassTable, DataNote, NextSteps, PageHero, RelatedLinks, RetentionPanel } from '../components';
import { byUrl, classes, UNRATED_CLASS_NAMES } from '../data';
import { hubClusterLinks } from '../related';
import { pageMetadata } from '../seo';

const entry = byUrl('/class-tier-list')!;

export const metadata = pageMetadata(
  { title: entry.title, description: entry.description, intent: 'tier' },
  '/class-tier-list',
);

const tierOrder = ['S', 'A', 'B', 'C', 'D'] as const;

export default function TierPage() {
  const grouped = tierOrder
    .map((tier) => ({ tier, items: classes.filter((item) => item.tier === tier) }))
    .filter((group) => group.items.length > 0);

  return (
    <main>
      <PageHero entry={entry} cta={<div className="hero-actions"><Link href="/tools/drop-chance-calculator">Plan a farm</Link></div>} />
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>How to read this list</h2>
            <p>
              Rankings are mode-aware community snapshots (Boss Rush, dungeon clear, solo, survival, endgame), not a claim that every class in the game is rated.
              Investment cost and pay-to-progress shortcuts can change value; conflicting media tiers do not automatically make one list &quot;correct.&quot;
            </p>
          </section>
          {grouped.map((group) => (
            <section className="content-panel" key={group.tier}>
              <h2>{group.tier}-Tier</h2>
              <ol>
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/classes/${item.slug}`}>{item.name}</Link>
                    {' — '}
                    {item.mode}. Unlock: {item.obtain}.
                    {item.rarityConflictNote ? ' Rarity label pending confirm.' : ''}
                  </li>
                ))}
              </ol>
            </section>
          ))}
          <section className="content-panel">
            <h2>Unrated (reported, not tiered yet)</h2>
            <p>
              Community media mentions these UPD1 names, but this wiki has not assigned S–D placements without enough testing:
            </p>
            <ul>
              {UNRATED_CLASS_NAMES.map((name) => (
                <li key={name}>{name} — temporarily unrated (no invented S/A placement).</li>
              ))}
            </ul>
          </section>
          <ClassTable />
          <DataNote />
          <RelatedLinks title="Related pages" links={hubClusterLinks('/class-tier-list')} />
          <NextSteps links={[
            ['Browse all classes', '/classes', 'See rarity, obtain overview, strengths, weaknesses, and best mode.'],
            ['Boss Rush routes', '/boss-rush', 'Plan floor breakpoints, Class Item drops, and fragment farms.'],
            ['Drop calculator', '/tools/drop-chance-calculator', 'Estimate attempts to 50%, 90%, 95%, and 99% before a long farm.'],
            ['Working codes', '/codes', 'Redeem active codes before a long farm session.'],
          ]} />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title="class tier list"
            videoQuery="Dungeon Lootr class tier list best classes Roblox"
            toolHref="/tools/class-finder"
            toolLabel="Find your class"
          />
          <div className="content-panel">
            <h3>Mode-based verdict</h3>
            <p>Boss Rush favors Cursed King / Honored One / Anti Magic paths. Dungeon speed leans Sinister Trigger and ranged clear classes. Survival chases start with Dreadlord.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
