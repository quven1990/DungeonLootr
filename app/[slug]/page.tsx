import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ClassTable, DataNote, NextSteps, RetentionPanel } from '../components';
import { hubBySlug, hubPages, hubSerp } from '../data';

export function generateStaticParams() {
  return hubPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = hubBySlug(slug);
  if (!page) return {};
  const serp = hubSerp(page);
  return {
    title: serp.title,
    description: serp.description,
    openGraph: { title: serp.title, description: serp.description },
    twitter: { title: serp.title, description: serp.description },
  };
}

export default async function HubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = hubBySlug(slug);
  if (!page) notFound();

  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / {page.title}</p>
        <h1>{page.title}</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{page.opening}</p>
          <div className="hero-actions">
            <Link href="/tools/drop-chance-calculator/">Open Drop Calculator</Link>
            <Link className="secondary" href="/classes/">Browse Classes</Link>
          </div>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>What this page answers</h2>
            <ul>
              {page.sections.map((section) => <li key={section}>{section}</li>)}
            </ul>
          </section>
          {slug === 'builds' || slug === 'aspects' ? <ClassTable /> : null}
          {slug === 'codes' ? (
            <section className="content-panel">
              <h2>Code status</h2>
              <p>No working code should be published here until it is checked against an official update, Roblox group post, or developer announcement. Expired and unverified codes stay separated.</p>
            </section>
          ) : null}
          {slug === 'progression-guide' ? (
            <section className="content-panel">
              <h2>Fastest progression route</h2>
              <ol>
                <li>Use a reliable early class and stop rerolling before you have a stable farm.</li>
                <li>Push dungeons until clear consistency drops.</li>
                <li>Move into Boss Rush when rewards and class unlocks become your bottleneck.</li>
                <li>Target late-game classes only after checking requirements and expected runs.</li>
              </ol>
            </section>
          ) : null}
          <DataNote />
          <NextSteps links={[
            ['Pick a class target', '/classes/'],
            ['Plan rare drops', '/tools/drop-chance-calculator/'],
            ['Check Boss Rush', '/boss-rush/'],
          ]} />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title={page.title}
            videoQuery={`${page.title} Roblox Dungeon Lootr guide`}
            toolHref={slug === 'aspects' ? '/tools/aspect-matcher/' : '/tools/drop-chance-calculator/'}
            toolLabel={slug === 'aspects' ? 'Match an Aspect' : 'Plan the next farm'}
          />
          <div className="content-panel">
            <h3>Phase 1 coverage</h3>
            <p>This hub is part of the first sitemap group and is structured for later table expansion.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
