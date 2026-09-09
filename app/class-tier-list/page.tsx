import Link from '../native-link';
import { Breadcrumbs } from '../Breadcrumbs';
import { DataNote, NextSteps, RelatedLinks, RetentionPanel } from '../components';
import { PageStatus } from '../PageStatus';
import { WIKI_PAGE_UPDATED, byUrl, classes, UNRATED_CLASS_NAMES } from '../data';
import { hubClusterLinks } from '../related';
import { pageMetadata } from '../seo';

const entry = byUrl('/class-tier-list')!;

export const metadata = pageMetadata(
  { title: entry.title, description: entry.description, intent: 'tier' },
  '/class-tier-list',
);

const tierOrder = ['S', 'A', 'B', 'C', 'D'] as const;

const useCases = [
  {
    title: 'Best Overall',
    pick: 'Cursed King',
    href: '/classes/cursed-king',
    why: 'S-tier Boss Rush damage/AoE with a Forge backup, so the class stays useful even when Class Item RNG stalls.',
  },
  {
    title: 'Best Boss Rush',
    pick: 'Cursed King / Honored One',
    href: '/boss-rush',
    why: 'Both use the Floor 40+ Class Item or 50-fragment Forge loop. Anti Magic is the documented A-tier version of the same system.',
  },
  {
    title: 'Best Solo',
    pick: 'Honored One',
    href: '/classes/honored-one',
    why: 'Existing notes treat it as the S-tier solo/control bridge, and it is required before Unrestricted.',
  },
  {
    title: 'Best Dungeon Clear',
    pick: 'Sinister Trigger',
    href: '/classes/sinister-trigger',
    why: 'Documented as an Exotic dungeon-speed class. The cost is the spin, not a Forge shortcut.',
  },
  {
    title: 'Best Beginner',
    pick: 'Boxer or Witch Gunner',
    href: '/classes/boxer',
    why: 'Boxer is an easy Epic roll for early clears. Witch Gunner is a safer Legendary ranged farmer if it drops.',
  },
  {
    title: 'Best Farming',
    pick: 'Witch Gunner',
    href: '/classes/witch-gunner',
    why: 'Ranged safety on a Legendary roll band makes long dungeon sessions less punishing than melee S-chases.',
  },
  {
    title: 'Best Endgame',
    pick: 'Unrestricted',
    href: '/classes/unrestricted',
    why: 'Highest documented ceiling, but only after Honored One 25, level 75, coins, and Heavenly Fragments.',
  },
  {
    title: 'Best Mobility',
    pick: 'Jetstream',
    href: '/classes/jetstream',
    why: 'Quest class whose documented identity is mobility/damage after the Azure Devil checklist.',
  },
];

export default function TierPage() {
  const grouped = tierOrder
    .map((tier) => ({ tier, items: classes.filter((item) => item.tier === tier) }))
    .filter((group) => group.items.length > 0);

  return (
    <main>
      <section className="site-shell page-hero">
        <Breadcrumbs items={[{ name: 'Tier List' }]} />
        <h1>{entry.h1}</h1>
        <PageStatus updatedAt={WIKI_PAGE_UPDATED} verifiedForUpdate1={false} />
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{entry.opening}</p>
          <div className="hero-actions">
            <Link href="/update-1">View UPDATE 1 Guide</Link>
            <Link className="secondary" href="/classes">
              Open Class Directory
            </Link>
          </div>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>How We Rank Classes</h2>
            <p>
              Rankings combine public gameplay, community reports, unlock cost, and actual use — dungeon clear, Boss
              Rush, survivability, mobility, investment, unlock difficulty, and endgame usefulness. This is not a
              fictional DPS test. If we do not have enough of those signals, the class stays unrated.
            </p>
          </section>

          <section className="content-panel">
            <h2>Best Dungeon Lootr Classes by Use Case</h2>
            <div className="usecase-grid">
              {useCases.map((item) => (
                <article key={item.title} className="route-card">
                  <h3>{item.title}</h3>
                  <p>
                    <Link href={item.href}>{item.pick}</Link>
                  </p>
                  <p>{item.why}</p>
                </article>
              ))}
            </div>
          </section>

          {grouped.map((group) => (
            <section className="content-panel" key={group.tier}>
              <h2>{group.tier}-Tier</h2>
              <ol>
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/classes/${item.slug}`}>{item.name}</Link>
                    {' — '}
                    {item.mode}. {item.obtain}.
                  </li>
                ))}
              </ol>
            </section>
          ))}

          <section className="content-panel">
            <h2>UPDATE 1 Classes – Still Being Evaluated</h2>
            <p>
              These classes are new in UPDATE 1. We are not assigning definitive rankings until enough reliable gameplay
              information is available.
            </p>
            <ul>
              {UNRATED_CLASS_NAMES.map((name) => (
                <li key={name}>
                  <Link href={`/classes/${name.toLowerCase().replace(/\s+/g, '-')}`}>{name}</Link>
                </li>
              ))}
            </ul>
            <p>
              <Link href="/update-1">View full UPDATE 1 guide</Link>
            </p>
          </section>

          <section className="content-panel">
            <h2>UPDATE 1 Changes</h2>
            <p>
              Spell Breaker, Cryomancer, Coyote, and Dark Professor expanded the Exotic roster. They are in the class
              directory, but they do not inherit S/A labels from older lists. Spin-pool names such as Ronin or Vacio
              remain listed on <Link href="/classes">Classes</Link> without a rank until this wiki has a use-case
              reason to place them.
            </p>
          </section>

          <DataNote />
          <RelatedLinks title="Related pages" links={hubClusterLinks('/class-tier-list')} />
          <NextSteps
            links={[
              ['Class directory after UPDATE 1', '/classes', 'Filter the full roster, including names without a rank yet.'],
              ['Boss Rush breakpoints', '/boss-rush', 'Floor 40 Class Items and Floor 100 fragments still decide older S-tier unlocks.'],
              ['UPDATE 1 guide', '/update-1', 'Four new Exotic classes and what is still unconfirmed.'],
              ['Working codes', '/codes', 'Copy UPDATE1 and the rest of the active list.'],
            ]}
          />
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
            <p>
              Boss Rush still favors Cursed King, Honored One, and Anti Magic. Dungeon speed still leans Sinister
              Trigger. Survival chases still start with Dreadlord. UPDATE 1 does not override those until kits are
              verified.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
