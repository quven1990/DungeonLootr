import { notFound } from 'next/navigation';
import Link from '../../native-link';
import { Breadcrumbs } from '../../Breadcrumbs';
import { DataNote, Facts, NextSteps, RelatedLinks, RetentionPanel } from '../../components';
import { CONTENT_LAST_CHECKED, CONTENT_PATCH, WIKI_PAGE_UPDATED, guideBySlug, guideSerp, guides } from '../../data';
import { formatDisplayDate } from '../../format-date';
import { JsonLd, faqJsonLd, howToJsonLd } from '../../jsonld';
import { guideClusterLinks, guideIntentNextSteps } from '../../related';
import { notFoundMetadata, pageMetadata } from '../../seo';

export function generateStaticParams() {
  return guides.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return notFoundMetadata;
  return pageMetadata(guideSerp(guide), `/guides/${guide.slug}`);
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();
  const serp = guideSerp(guide);
  const isCursedKingGuide = guide.slug === 'how-to-get-cursed-king';
  const path = `/guides/${guide.slug}`;

  const cursedKingFaqs = [
    {
      q: 'How do you get Cursed King in Dungeon Lootr?',
      a: 'Unlock Boss Rush at level 67+, then either farm the Floor 40+ Class Item drop or craft at the Forge with 50 Sukuna fragments from Floor 100 clears (8–18 fragments per win).',
    },
    {
      q: 'Does Cursed King require Boss Rush?',
      a: 'Yes. Both documented unlock routes use Boss Rush: Floor 40+ for Class Item drops, or Floor 100 fragment farming for the Forge path.',
    },
    {
      q: 'Is the Forge path better than the Class Item drop?',
      a: 'Forge is more deterministic once you can clear Floor 100 with Sukuna selected. Class Item drops can be faster if you get lucky at Floor 40+, but they are RNG.',
    },
  ];

  return (
    <main>
      <JsonLd
        data={howToJsonLd({
          name: guide.title,
          description: serp.description,
          steps: guide.steps,
          url: path,
        })}
      />
      {isCursedKingGuide ? <JsonLd data={faqJsonLd(cursedKingFaqs)} /> : null}
      <section className="site-shell page-hero">
        <Breadcrumbs
          items={[{ name: 'Guides' }, { name: guide.target }]}
          currentPath={path}
        />
        <h1>{guide.title}</h1>
        {isCursedKingGuide ? (
          <p className="page-updated">Updated: {formatDisplayDate(WIKI_PAGE_UPDATED)}</p>
        ) : null}
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          {isCursedKingGuide ? (
            <>
              <p>{guide.opening}</p>
              <dl className="facts">
                <div>
                  <dt>Requirement</dt>
                  <dd>Level 67+ (Boss Rush access)</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>Boss Rush</dd>
                </div>
                <div>
                  <dt>Boss / Floor</dt>
                  <dd>Floor 40+ Class Item, or Floor 100 with Sukuna lobby boss</dd>
                </div>
                <div>
                  <dt>Material</dt>
                  <dd>50 Sukuna fragments for Forge craft (8–18 per Floor 100 clear)</dd>
                </div>
              </dl>
            </>
          ) : (
            <p>{guide.opening}</p>
          )}
          <div className="hero-actions" data-nosnippet>
            <Link href="#route">Suggested Route</Link>
            {isCursedKingGuide ? (
              <Link className="secondary" href="/classes/cursed-king">
                Skills, Tier &amp; Build
              </Link>
            ) : (
              <Link className="secondary" href="/tools/drop-chance-calculator">
                Open Calculator
              </Link>
            )}
          </div>
        </div>
        {isCursedKingGuide ? (
          <section className="route-comparison" aria-labelledby="cursed-king-route-heading">
            <h2 id="cursed-king-route-heading">Which Cursed King Route Should You Use?</h2>
            <div className="route-comparison-grid">
              <article className="route-card">
                <h3>Class Item Drop</h3>
                <dl>
                  <div>
                    <dt>Route</dt>
                    <dd>Class Item Drop</dd>
                  </div>
                  <div>
                    <dt>Requirement</dt>
                    <dd>Boss Rush Floor 40+</dd>
                  </div>
                  <div>
                    <dt>RNG</dt>
                    <dd>Yes — higher floors improve odds</dd>
                  </div>
                  <div>
                    <dt>Best For</dt>
                    <dd>Players already farming Floor 40+ clears</dd>
                  </div>
                </dl>
              </article>
              <article className="route-card">
                <h3>Forge</h3>
                <dl>
                  <div>
                    <dt>Route</dt>
                    <dd>Forge craft</dd>
                  </div>
                  <div>
                    <dt>Requirement</dt>
                    <dd>50 Sukuna fragments</dd>
                  </div>
                  <div>
                    <dt>RNG</dt>
                    <dd>Fragment counts per clear (8–18)</dd>
                  </div>
                  <div>
                    <dt>Best For</dt>
                    <dd>Players who can clear Floor 100 with Sukuna selected</dd>
                  </div>
                </dl>
              </article>
            </div>
          </section>
        ) : null}
        <Facts
          facts={
            isCursedKingGuide
              ? [
                  ['Target', 'Cursed King (Sukuna)'],
                  ['Unlock system', 'Boss Rush + Forge'],
                  ['Last checked', CONTENT_LAST_CHECKED],
                  ['Patch', CONTENT_PATCH],
                  ['Data status', 'Community-reported'],
                ]
              : [
                  ['Target', guide.target],
                  ['Requirements', `${guide.requirements.length} checks`],
                  ['Last checked', CONTENT_LAST_CHECKED],
                  ['Patch', CONTENT_PATCH],
                  ['Data status', 'Community-reported'],
                ]
          }
        />
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>{isCursedKingGuide ? 'Requirements' : 'Requirements checklist'}</h2>
            <ul className="check-list">
              {guide.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="content-panel" id="route">
            <h2>{isCursedKingGuide ? 'How to Get Cursed King' : 'Suggested farming route'}</h2>
            {isCursedKingGuide ? (
              <>
                <p>{guide.steps[0]}</p>
                <h3>Boss Rush Route — Class Item (Floor 40+)</h3>
                <p>{guide.steps[1]}</p>
                <h3>Required Items / Fragments — Floor 100</h3>
                <p>{guide.steps[2]}</p>
                <h3>Where to Forge / Unlock</h3>
                <p>{guide.steps[3]}</p>
              </>
            ) : (
              <ol>
                {guide.steps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            )}
          </section>
          <section className="content-panel">
            <h2>{isCursedKingGuide ? 'Common Mistakes' : 'Farming tips and common mistakes'}</h2>
            <ul>
              {guide.tips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          {isCursedKingGuide ? (
            <>
              <section className="content-panel">
                <h2>Is Cursed King Worth Getting?</h2>
                <p>
                  Unlock value and farming effort live on this page. For combat role, current tier placement, strengths,
                  weaknesses, and build direction, open{' '}
                  <Link href="/classes/cursed-king">Cursed King Skills, Tier &amp; Build</Link> — that page does not
                  redo the unlock tutorial.
                </p>
              </section>
              <section className="content-panel">
                <h2>FAQ</h2>
                {cursedKingFaqs.map((faq) => (
                  <article key={faq.q} className="faq-item">
                    <h3>{faq.q}</h3>
                    <p>{faq.a}</p>
                  </article>
                ))}
              </section>
              <section className="content-panel">
                <h2>Sources / Last Verified</h2>
                <p>
                  Unlock facts on this page are community-reported Boss Rush routes last reconciled with the wiki data
                  set on {CONTENT_LAST_CHECKED}. Exact Class Item percentages are not published here. Page copy updated{' '}
                  {formatDisplayDate(WIKI_PAGE_UPDATED)}.
                </p>
                <p>
                  Related verified loops:{' '}
                  <Link href="/boss-rush">Boss Rush guide</Link>, <Link href="/drop-rates">Drop Rate Database</Link>,{' '}
                  <Link href="/tools/drop-chance-calculator">Drop Chance Calculator</Link>.
                </p>
              </section>
            </>
          ) : (
            <section className="content-panel">
              <h2>FAQ</h2>
              <p>
                <strong>Is this the fastest route?</strong> It is a suggested community-reported route with the clearest
                requirements we track — not a timed speedrun claim. Recheck after patches and against the in-game UI.
              </p>
              <p>
                <strong>What if the drop stalls?</strong> Switch to the deterministic backup when one exists (for example
                Floor 100 fragments to Forge), and use the calculator before long RNG farms.
              </p>
            </section>
          )}
          <DataNote />
          <RelatedLinks title="Related pages" links={guideClusterLinks(guide)} />
          <NextSteps links={guideIntentNextSteps(guide)} eyebrow="Next steps after unlock" />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title={guide.target}
            videoQuery={`Dungeon Lootr how to get ${guide.target} unlock Roblox`}
          />
          <div className="content-panel">
            <h3>Common mistake</h3>
            <p>
              Do not chase a low-rate drop on an unstable clear. A slightly slower floor with reliable clears usually
              wins over time.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
