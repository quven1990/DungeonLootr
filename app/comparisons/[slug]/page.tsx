import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DataNote, NextSteps } from '../../components';
import { comparisonBySlug, comparisons } from '../../data';

export function generateStaticParams() {
  return comparisons.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = comparisonBySlug(slug);
  if (!item) return {};
  return { title: `${item.a} vs ${item.b}: Which Is Better in Dungeon Lootr?`, description: item.opening };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = comparisonBySlug(slug);
  if (!item) notFound();
  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Comparisons</p>
        <h1>{item.a} vs {item.b}: Which Is Better in Dungeon Lootr?</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{item.opening}</p>
          <div className="hero-actions"><Link href="/class-tier-list/">See Tier List</Link></div>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>Mode-based verdict</h2>
            <ul>
              <li>Boss Rush: choose the class with higher consistency and survivability.</li>
              <li>Dungeon clear: choose the class with stronger mobility and burst windows.</li>
              <li>Investment: choose the route with fewer unverified material bottlenecks.</li>
            </ul>
          </section>
          <DataNote />
          <NextSteps links={[
            ['Browse all classes', '/classes/'],
            ['Plan unlock drops', '/tools/drop-chance-calculator/'],
          ]} />
        </div>
      </section>
    </main>
  );
}
