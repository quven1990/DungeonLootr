import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DataNote, NextSteps, RetentionPanel } from '../../components';
import { classBySlug, comparisonBySlug, comparisons, comparisonSerp } from '../../data';

export function generateStaticParams() {
  return comparisons.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = comparisonBySlug(slug);
  if (!item) return {};
  const serp = comparisonSerp(item);
  return {
    title: serp.title,
    description: serp.description,
    openGraph: { title: serp.title, description: serp.description },
    twitter: { title: serp.title, description: serp.description },
  };
}

function classFacts(name: string) {
  const item = classBySlug(
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
  );
  return item;
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = comparisonBySlug(slug);
  if (!item) notFound();
  const left = classFacts(item.a);
  const right = classFacts(item.b);

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
            <h2>Side-by-side facts</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>{item.a}</th>
                    <th>{item.b}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tier</td>
                    <td>{left?.tier ?? '—'}</td>
                    <td>{right?.tier ?? '—'}</td>
                  </tr>
                  <tr>
                    <td>Rarity</td>
                    <td>{left?.rarity ?? '—'}</td>
                    <td>{right?.rarity ?? '—'}</td>
                  </tr>
                  <tr>
                    <td>Best mode</td>
                    <td>{left?.mode ?? '—'}</td>
                    <td>{right?.mode ?? '—'}</td>
                  </tr>
                  <tr>
                    <td>Unlock</td>
                    <td>{left?.obtain ?? '—'}</td>
                    <td>{right?.obtain ?? '—'}</td>
                  </tr>
                  <tr>
                    <td>Confidence</td>
                    <td>{left?.confidence ?? '—'}</td>
                    <td>{right?.confidence ?? '—'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section className="content-panel">
            <h2>Mode-based verdict</h2>
            <ul>
              <li>Boss Rush: prefer the class with the clearer Boss Rush / Forge path and higher consistency ({left?.mode === 'Boss Rush' ? item.a : right?.mode === 'Boss Rush' ? item.b : 'compare unlock cost first'}).</li>
              <li>Dungeon clear: prefer the faster clear identity ({left?.mode.includes('clear') ? item.a : right?.mode.includes('clear') ? item.b : 'check mode column above'}).</li>
              <li>Investment: prefer fewer unconfirmed material bottlenecks (confidence column above).</li>
            </ul>
          </section>
          <DataNote />
          <NextSteps links={[
            left ? [`Open ${item.a}`, `/classes/${left.slug}/`] : ['Browse all classes', '/classes/'],
            right ? [`Open ${item.b}`, `/classes/${right.slug}/`] : ['Plan unlock drops', '/tools/drop-chance-calculator/'],
          ]} />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title={`${item.a} vs ${item.b}`}
            videoQuery={`Dungeon Lootr ${item.a} ${item.b} comparison Roblox`}
            toolHref="/tools/class-finder/"
            toolLabel="Find your best class"
          />
        </aside>
      </section>
    </main>
  );
}
