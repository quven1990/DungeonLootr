import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Facts, NextSteps } from '../../components';
import { classBySlug, classes } from '../../data';

export function generateStaticParams() {
  return classes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item) return {};
  return {
    title: `Best ${item.name} Build in Dungeon Lootr - Stats, Aspects & Gear`,
    description: `Use a practical ${item.name} build framework for Boss Rush, dungeon clear, stat priority, Aspects, and alternatives.`,
  };
}

export default async function BuildPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item) notFound();

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
            ['Need the class first? Unlock route', `/guides/how-to-get-${item.slug}/`],
            ['Still missing drops? Calculate runs', '/tools/drop-chance-calculator/'],
          ]} />
        </div>
      </section>
    </main>
  );
}
