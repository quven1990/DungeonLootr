import { notFound } from 'next/navigation';
import Link from '../../native-link';
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
        <p className="breadcrumb">Home / Guides / {guide.target}</p>
        <h1>{guide.title}</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{guide.opening}</p>
          <div className="hero-actions">
            <Link href="#route">Fastest Route</Link>
            <Link className="secondary" href="/tools/drop-chance-calculator">
              Open Calculator
            </Link>
          </div>
        </div>
        <Facts
          facts={[
            ['Target', guide.target],
            ['Requirements', `${guide.requirements.length} checks`],
            ['Last checked', CONTENT_LAST_CHECKED],
            ['Patch', CONTENT_PATCH],
            ['Data status', 'Community-tested'],
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
            <h2>Fastest farming route</h2>
            <ol>
              {guide.steps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
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
              <strong>Is this the fastest route?</strong> It is the community-checked route with the clearest
              requirements. Recheck after patches.
            </p>
            <p>
              <strong>What if the drop stalls?</strong> Switch to the deterministic backup when one exists (for example
              Floor 100 fragments to Forge), and use the calculator before long RNG farms.
            </p>
          </section>
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
