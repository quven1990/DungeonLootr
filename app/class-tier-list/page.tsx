import Link from 'next/link';
import { ClassTable, DataNote, PageHero, RetentionPanel } from '../components';
import { byUrl, classes } from '../data';
import { pageMetadata } from '../seo';

const entry = byUrl('/class-tier-list/')!;

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
      <PageHero entry={entry} cta={<div className="hero-actions"><Link href="/tools/drop-chance-calculator/">Plan a farm</Link></div>} />
      <section className="site-shell content-grid">
        <div className="article-stack">
          {grouped.map((group) => (
            <section className="content-panel" key={group.tier}>
              <h2>{group.tier}-Tier</h2>
              <ol>
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/classes/${item.slug}/`}>{item.name}</Link>
                    {' — '}
                    {item.mode}. Unlock: {item.obtain}.
                  </li>
                ))}
              </ol>
            </section>
          ))}
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
            <p>Boss Rush favors Cursed King / Honored One / Anti Magic paths. Dungeon speed leans Sinister Trigger and ranged clear classes. Survival chases start with Dreadlord.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
