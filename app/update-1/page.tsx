import Link from '../native-link';
import { Breadcrumbs } from '../Breadcrumbs';
import { DataNote, FeaturedVideo, RelatedLinks } from '../components';
import { PageStatus } from '../PageStatus';
import {
  UPDATE_1_CLASS_SLUGS,
  UPDATE_1_RELEASED,
  WIKI_PAGE_UPDATED,
  byUrl,
  classBySlug,
  codesLastVerifiedAt,
  dungeonLootrCodes,
} from '../data';
import { formatDisplayDate } from '../format-date';
import { JsonLd, articleJsonLd, faqJsonLd } from '../jsonld';
import { pageMetadata } from '../seo';

const entry = byUrl('/update-1')!;

export const metadata = pageMetadata(
  { title: entry.title, description: entry.description, intent: 'update-1' },
  '/update-1',
);

const faqs = [
  {
    q: 'When did Dungeon Lootr UPDATE 1 release?',
    a: 'UPDATE 1 released on September 7, 2026.',
  },
  {
    q: 'What classes did UPDATE 1 add?',
    a: 'Public coverage agrees on four new Exotic classes: Spell Breaker, Cryomancer, Coyote, and Dark Professor.',
  },
  {
    q: 'How do you unlock the UPDATE 1 classes?',
    a: 'Community guides currently disagree on the exact unlocks. This wiki does not publish a shop price, drop rate, or bundle SKU as confirmed. Check the live game UI, then use the individual class pages for what is and is not settled.',
  },
  {
    q: 'What is Magic Unleashed in Dungeon Lootr?',
    a: 'Magic Unleashed is the UPDATE 1 event/raid content named across community guides. Weapon and shop details still conflict, so this page only treats the event name as confirmed.',
  },
];

export default function Update1Page() {
  const updateCodes = dungeonLootrCodes.filter((item) => item.patch === 'UPDATE 1' && item.status === 'active');
  const newClasses = UPDATE_1_CLASS_SLUGS.map((slug) => classBySlug(slug)).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );

  return (
    <main>
      <JsonLd
        data={articleJsonLd({
          headline: entry.h1,
          description: entry.description,
          url: '/update-1',
          datePublished: WIKI_PAGE_UPDATED,
          dateModified: WIKI_PAGE_UPDATED,
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <section className="site-shell page-hero">
        <Breadcrumbs items={[{ name: 'UPDATE 1' }]} currentPath="/update-1" />
        <h1>{entry.h1}</h1>
        <PageStatus updatedAt={WIKI_PAGE_UPDATED} verifiedForUpdate1={false} />
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{entry.opening}</p>
          <div className="hero-actions">
            <Link href="/classes">View All Classes</Link>
            <Link className="secondary" href="/codes">
              Latest Codes
            </Link>
          </div>
        </div>
      </section>

      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>What Changed in UPDATE 1</h2>
            <ul className="check-list">
              <li>Release date: {formatDisplayDate(UPDATE_1_RELEASED)}.</li>
              <li>Four new Exotic classes: Spell Breaker, Cryomancer, Coyote, and Dark Professor.</li>
              <li>New promo code coverage, including UPDATE1 from the September 6 community roundup.</li>
              <li>Magic Unleashed is named as related event/raid content. Exact shop prices and weapon unlocks still conflict in public guides.</li>
            </ul>
          </section>

          <section className="content-panel">
            <h2>New Classes</h2>
            <p>
              Public sources agree on the four names. They do not agree on how each class is obtained, so the directory
              below lists rarity as Exotic and leaves unlocks as “see the class page” rather than inventing a recipe.
            </p>
            <div className="table-wrap desktop-table">
              <table>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Rarity</th>
                    <th>How to Get</th>
                    <th>Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {newClasses.map((item) => (
                    <tr key={item.slug}>
                      <td>
                        <Link href={`/classes/${item.slug}`}>{item.name}</Link>
                      </td>
                      <td>
                        <span className="rarity">{item.rarity}</span>
                      </td>
                      <td>
                        <Link href={`/classes/${item.slug}`}>{item.obtain}</Link>
                      </td>
                      <td>{item.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {newClasses.map((item) => (
            <section className="content-panel" key={item.slug} id={item.slug}>
              <h2>{item.name}</h2>
              <p>{item.opening}</p>
              <p>
                <Link href={`/classes/${item.slug}`}>Open the {item.name} class page</Link>
              </p>
            </section>
          ))}

          <section className="content-panel" id="magic-unleashed">
            <h2>Magic Unleashed</h2>
            <p>
              Community coverage treats Magic Unleashed as the UPDATE 1 event/raid layer, sometimes alongside a City of
              Mages dungeon name and new weapons. Guides currently disagree on currency amounts and whether equipping
              those weapons grants Spell Breaker or Cryomancer. This wiki records the event name and that conflict; it
              does not publish a coin cost, drop rate, or weapon stat block.
            </p>
          </section>

          <section className="content-panel">
            <h2>New Codes</h2>
            <p>
              The codes list was last reconciled on {formatDisplayDate(codesLastVerifiedAt)}. UPDATE 1 launched the next
              day. UPDATE1 was already in that roundup, so it is highlighted here without pretending the rewards were
              re-checked after launch.
            </p>
            <ul>
              {updateCodes.map((item) => (
                <li key={item.code}>
                  <code className="code-chip">{item.code}</code> — {item.reward}{' '}
                  <Link href="/codes">Copy on the codes page</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="content-panel">
            <h2>What Players Should Do First</h2>
            <ol>
              <li>Redeem active codes, starting with UPDATE1 if it still works on your account.</li>
              <li>Open the class directory and decide whether you are chasing UPDATE 1 names or an older ranked class.</li>
              <li>If you can already clear Boss Rush, keep using the Floor 40+ / Forge routes for Cursed King and Honored One — those are still the best-documented endgame unlocks.</li>
              <li>Treat UPDATE 1 shop and raid claims as unconfirmed until they match the live UI.</li>
            </ol>
          </section>

          <RelatedLinks
            title="Related Guides"
            links={[
              ['Class directory', '/classes'],
              ['Tier list', '/class-tier-list'],
              ['Working codes', '/codes'],
              ['Boss Rush', '/boss-rush'],
              ['Drop calculator', '/tools/drop-chance-calculator'],
            ]}
          />

          <section className="content-panel">
            <h2>FAQ</h2>
            {faqs.map((item) => (
              <article key={item.q} className="faq-item">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </section>
          <DataNote />
        </div>
      </section>
      <FeaturedVideo title="Dungeon Lootr UPDATE 1" videoQuery="Dungeon Lootr UPDATE 1 beginner codes Roblox" />
    </main>
  );
}
