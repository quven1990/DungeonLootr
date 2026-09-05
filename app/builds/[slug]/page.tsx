import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Facts, NextSteps, RetentionPanel } from '../../components';
import { buildOpening, buildSerp, classBySlug, classes, guideBySlug } from '../../data';

export function generateStaticParams() {
  return classes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item) return {};
  const serp = buildSerp(item);
  return {
    title: serp.title,
    description: serp.description,
    openGraph: { title: serp.title, description: serp.description },
    twitter: { title: serp.title, description: serp.description },
  };
}

export default async function BuildPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item) notFound();
  const unlockGuide = guideBySlug(`how-to-get-${item.slug}`);

  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Builds / {item.name}</p>
        <h1>Best {item.name} Build in Dungeon Lootr</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{buildOpening(item)}</p>
          <div className="hero-actions">
            <Link href={`/classes/${item.slug}/`}>Class details</Link>
            <Link className="secondary" href="/guides/best-aspect-by-class/">Best Aspects</Link>
          </div>
        </div>
        <Facts facts={[
          ['Tier', item.tier],
          ['Mode', item.mode],
          ['Aspect', item.aspect],
          ['Unlock', item.obtain],
          ['Difficulty', item.rarity === 'Secret' || item.rarity === 'Exotic' ? 'High' : 'Medium-high'],
        ]} />
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>Best overall</h2>
            <ul>
              {item.buildNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
            <p>Keep clears consistent in {item.mode} before stacking greedier damage. A dead run wastes more time than a slightly slower safe clear.</p>
          </section>
          <section className="content-panel">
            <h2>Build focus by mode</h2>
            <div className="card-grid four">
              {['Overall', 'Boss Rush', 'Dungeon', 'Solo'].map((mode) => (
                <div className="metric" key={mode}>
                  <span>{mode}</span>
                  <strong>
                    {mode === 'Overall' || mode === item.mode || (mode === 'Dungeon' && item.mode.includes('clear'))
                      ? 'Primary'
                      : 'Alt'}
                  </strong>
                </div>
              ))}
            </div>
          </section>
          <section className="content-panel">
            <h2>Strengths to build around</h2>
            <ul>{item.strengths.map((text) => <li key={text}>{text}</li>)}</ul>
          </section>
          <NextSteps links={[
            ['Need the class first? Unlock route', unlockGuide ? `/guides/${unlockGuide.slug}/` : '/classes/'],
            ['Still missing drops? Calculate runs', '/tools/drop-chance-calculator/'],
          ]} />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title={`${item.name} build`}
            videoQuery={`Dungeon Lootr ${item.name} build rotation Boss Rush Roblox`}
            toolHref="/tools/aspect-matcher/"
            toolLabel="Match an Aspect"
          />
        </aside>
      </section>
    </main>
  );
}
