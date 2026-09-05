import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Facts, NextSteps, RetentionPanel } from '../../components';
import { buildSerp, classBySlug, classes, guideBySlug } from '../../data';

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
          <p>The best {item.name} build starts with {item.mode.toLowerCase()} consistency, then tunes stats, Aspect, and gear around the fights you can clear without losing uptime.</p>
          <div className="hero-actions">
            <Link href={`/classes/${item.slug}/`}>Class details</Link>
            <Link className="secondary" href="/guides/best-aspect-by-class/">Best Aspects</Link>
          </div>
        </div>
        <Facts facts={[
          ['Mode', item.mode],
          ['Stats', 'Damage, uptime, survival'],
          ['Aspect', item.aspect],
          ['Difficulty', item.rarity === 'Secret' ? 'High' : 'Medium-high'],
        ]} />
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>Best overall</h2>
            <p>Build for reliable clears first. A high-damage setup is only better when it survives the full route and keeps core skills active during boss windows.</p>
          </section>
          <section className="content-panel">
            <h2>Build switcher</h2>
            <div className="card-grid four">
              {['Overall', 'Boss Rush', 'Dungeon', 'Solo'].map((mode) => (
                <div className="metric" key={mode}>
                  <span>{mode}</span>
                  <strong>{mode === item.mode ? 'Primary' : 'Alt'}</strong>
                </div>
              ))}
            </div>
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
