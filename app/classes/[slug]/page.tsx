import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DataNote, Facts, NextSteps } from '../../components';
import { classBySlug, classes, guideBySlug } from '../../data';

export function generateStaticParams() {
  return classes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item) return {};
  return {
    title: `Dungeon Lootr ${item.name} - How to Get, Skills, Build & Best Aspects`,
    description: `See how ${item.name} works in Dungeon Lootr, including unlock route, best mode, Aspect direction, strengths, weaknesses, and next-step build links.`,
  };
}

export default async function ClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item) notFound();
  const unlockGuide = guideBySlug(`how-to-get-${item.slug}`);

  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Classes / {item.name}</p>
        <h1>Dungeon Lootr {item.name}: How to Get, Skills, Build & Best Aspects</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{item.opening}</p>
          <div className="hero-actions">
            <Link href={`/builds/${item.slug}/`}>See Best Build</Link>
            <Link className="secondary" href={unlockGuide ? `/guides/${unlockGuide.slug}/` : '/classes/'}>How to Unlock</Link>
          </div>
        </div>
        <Facts facts={[
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
            <h2>How to get {item.name}</h2>
            <p>{item.obtain}. If the route depends on a rare material or floor-specific drop, use the calculator before committing to a long farm.</p>
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
            <p>Prioritize the stats that keep {item.name} consistent in {item.mode}. Use a {item.aspect.toLowerCase()} first, then test alternatives against your clear speed and survival rate.</p>
          </section>
          <DataNote />
          <NextSteps links={[
            [`Got ${item.name}? Build it next`, `/builds/${item.slug}/`],
            ['Still farming? Calculate your drop chance', '/tools/drop-chance-calculator/'],
            ['Compare class tiers', '/class-tier-list/'],
          ]} />
        </div>
        <aside className="side-rail">
          <div className="content-panel">
            <h3>Quick facts</h3>
            <p>Confidence: {item.confidence}. Verify exact route requirements after major Dungeon Lootr updates.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
