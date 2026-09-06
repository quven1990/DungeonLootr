import { notFound } from 'next/navigation';
import Link from '../../native-link';
import { ClassFinderPreview, DataNote, Facts, NextSteps, RelatedLinks, RetentionPanel } from '../../components';
import {
  CONTENT_LAST_CHECKED,
  CONTENT_PATCH,
  classBySlug,
  classes,
  classSerp,
  guideBySlug,
  isIndexableClass,
} from '../../data';
import { classClusterLinks, classIntentNextSteps } from '../../related';
import { notFoundMetadata, pageMetadata } from '../../seo';

export function generateStaticParams() {
  return classes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item) return notFoundMetadata;
  return pageMetadata(classSerp(item), `/classes/${item.slug}`, { index: isIndexableClass(item) });
}

export default async function ClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item) notFound();
  const unlockGuide = guideBySlug(`how-to-get-${item.slug}`);
  const indexable = isIndexableClass(item);

  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Classes / {item.name}</p>
        <h1>{indexable ? `Dungeon Lootr ${item.name}` : `Dungeon Lootr ${item.name}: What We Know`}</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{item.opening}</p>
          <div className="hero-actions">
            {unlockGuide ? <Link href={`/guides/${unlockGuide.slug}`}>How to Get {item.name}</Link> : null}
            <Link className={unlockGuide ? 'secondary' : undefined} href={`/builds/${item.slug}`}>
              Best {item.name} Build
            </Link>
          </div>
        </div>
        <Facts
          facts={[
            ['Rarity', item.rarity],
            ['Obtain', item.obtain],
            ['Best mode', item.mode],
            ['Best Aspect', item.aspect],
            ['Tier', item.tier],
            ['Last checked', CONTENT_LAST_CHECKED],
            ['Patch', CONTENT_PATCH],
            ['Data status', item.confidence === 'verified' ? 'Verified' : 'Community-tested'],
          ]}
        />
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>Obtain overview</h2>
            <p>{item.obtain}.</p>
            <ul className="check-list">
              {item.unlockSteps.slice(0, 3).map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            {unlockGuide ? (
              <p>
                Full route, requirements, and mistakes:{' '}
                <Link href={`/guides/${unlockGuide.slug}`}>How to get {item.name}</Link>.
              </p>
            ) : null}
          </section>
          <section className="content-panel">
            <h2>Strengths and weaknesses</h2>
            <h3>Strengths</h3>
            <ul>
              {item.strengths.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
            <h3>Weaknesses</h3>
            <ul>
              {item.weaknesses.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </section>
          <section className="content-panel">
            <h2>Best Aspect and build summary</h2>
            <p>
              Start with a {item.aspect.toLowerCase()} for {item.mode}. Full stats, gear focus, and rotation live on the
              build page.
            </p>
            <ul>
              {item.buildNotes.slice(0, 2).map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <p>
              <Link href={`/builds/${item.slug}`}>Open the best {item.name} build →</Link>
            </p>
          </section>
          <ClassFinderPreview current={item} />
          <DataNote />
          <RelatedLinks title="Related pages" links={classClusterLinks(item)} />
          <NextSteps links={classIntentNextSteps(item)} eyebrow="Next steps for this class" />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title={item.name}
            videoQuery={`Dungeon Lootr ${item.name} class showcase Roblox`}
            toolHref="/tools/class-finder"
            toolLabel="Find a better class match"
          />
          <div className="content-panel">
            <h3>Quick facts</h3>
            <p>
              Confidence: {item.confidence}. Last checked {CONTENT_LAST_CHECKED}. Recheck obtain text after major
              updates.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
