import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ClassFinderPreview, DataNote, Facts, NextSteps, RetentionPanel } from '../../components';
import { classBySlug, classes, classSerp, guideBySlug, isIndexableClass } from '../../data';
import { pageMetadata } from '../../seo';

export function generateStaticParams() {
  return classes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item) return {};
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
        <h1>
          {indexable
            ? `Dungeon Lootr ${item.name}: How to Get, Skills, Build & Best Aspects`
            : `Dungeon Lootr ${item.name}: Tier, Mode & What We Know`}
        </h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{item.opening}</p>
          <div className="hero-actions">
            <Link href={`/builds/${item.slug}/`}>See Best Build</Link>
            <Link className="secondary" href={unlockGuide ? `/guides/${unlockGuide.slug}/` : '/classes/'}>
              {indexable ? 'How to Unlock' : 'Browse Classes'}
            </Link>
          </div>
        </div>
        <Facts facts={[
          ['Tier', item.tier],
          ['Rarity', item.rarity],
          ['Obtain', item.obtain],
          ['Best mode', item.mode],
          ['Best Aspect', item.aspect],
          ['Last checked', '2026-09-05'],
        ]} />
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>{indexable ? `How to get ${item.name}` : `What we know about ${item.name}`}</h2>
            <ol>
              {item.unlockSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </section>
          <section className="content-panel">
            <h2>Strengths and weaknesses</h2>
            <h3>Strengths</h3>
            <ul>{item.strengths.map((text) => <li key={text}>{text}</li>)}</ul>
            <h3>Weaknesses</h3>
            <ul>{item.weaknesses.map((text) => <li key={text}>{text}</li>)}</ul>
          </section>
          <section className="content-panel">
            <h2>Best stats and Aspects</h2>
            <p>Prioritize the stats that keep {item.name} consistent in {item.mode}. Start with a {item.aspect.toLowerCase()}.</p>
            <ul>
              {item.buildNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </section>
          <ClassFinderPreview current={item} />
          <DataNote />
          <NextSteps links={[
            [`Got ${item.name}? Build it next`, `/builds/${item.slug}/`],
            ['Still farming? Calculate your drop chance', '/tools/drop-chance-calculator/'],
            ['Compare class tiers', '/class-tier-list/'],
          ]} />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title={item.name}
            videoQuery={`Dungeon Lootr ${item.name} gameplay build unlock Roblox`}
            toolHref="/tools/class-finder/"
            toolLabel="Find a better class match"
          />
          <div className="content-panel">
            <h3>Quick facts</h3>
            <p>Confidence: {item.confidence}. Verify exact route requirements after major Dungeon Lootr updates.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
