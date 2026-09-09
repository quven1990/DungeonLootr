import { notFound } from 'next/navigation';
import Link from '../../native-link';
import { Breadcrumbs } from '../../Breadcrumbs';
import { DataNote, Facts, NextSteps, RelatedLinks, RetentionPanel } from '../../components';
import { CONTENT_LAST_CHECKED, CONTENT_PATCH, guideBySlug, guideSerp, guides } from '../../data';
import { JsonLd, howToJsonLd } from '../../jsonld';
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

  return (
    <main>
      <JsonLd
        data={howToJsonLd({
          name: guide.title,
          description: serp.description,
          steps: guide.steps,
          url: `/guides/${guide.slug}`,
        })}
      />
      <section className="site-shell page-hero">
        <Breadcrumbs items={[{ name: 'Guides' }, { name: guide.target }]} />
        <h1>{guide.title}</h1>
        {isCursedKingGuide ? <p className="page-updated">Updated: September 9, 2026</p> : null}
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{guide.opening}</p>
          <div className="hero-actions" data-nosnippet>
            <Link href="#route">Suggested Route</Link>
            <Link className="secondary" href="/tools/drop-chance-calculator">
              Open Calculator
            </Link>
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
                    <dd>Yes</dd>
                  </div>
                  <div>
                    <dt>Best For</dt>
                    <dd>Players farming Boss Rush and willing to rely on drops</dd>
                  </div>
                </dl>
              </article>
              <article className="route-card">
                <h3>Forge</h3>
                <dl>
                  <div>
                    <dt>Route</dt>
                    <dd>Forge</dd>
                  </div>
                  <div>
                    <dt>Requirement</dt>
                    <dd>50 Sukuna fragments</dd>
                  </div>
                  <div>
                    <dt>RNG</dt>
                    <dd>Fragment-based progression</dd>
                  </div>
                  <div>
                    <dt>Best For</dt>
                    <dd>Players who prefer steady fragment progression</dd>
                  </div>
                </dl>
              </article>
            </div>
          </section>
        ) : null}
        <Facts
          facts={[
            ['Target', guide.target],
            ['Requirements', `${guide.requirements.length} checks`],
            ['Last checked', CONTENT_LAST_CHECKED],
            ['Patch', CONTENT_PATCH],
            ['Data status', 'Community-reported'],
          ]}
        />
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>Requirements checklist</h2>
            <ul className="check-list">
              {guide.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="content-panel" id="route">
            <h2>Suggested farming route</h2>
            {isCursedKingGuide ? (
              <>
                <p>{guide.steps[0]}</p>
                <h3>Method 1: Floor 40+ Class Item</h3>
                <p>{guide.steps[1]}</p>
                <h3>Method 2: Fragments / Forge</h3>
                <ol>
                  {guide.steps.slice(2).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
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
            <h2>Farming tips and common mistakes</h2>
            <ul>
              {guide.tips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
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
          {isCursedKingGuide ? (
            <section className="content-panel">
              <h2>Is Cursed King worth using?</h2>
              <p>
                Want to compare its combat role, current tier, strengths, weaknesses, and build direction?{' '}
                <Link href="/classes/cursed-king">Cursed King Skills, Tier &amp; Build</Link>.
              </p>
            </section>
          ) : null}
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
