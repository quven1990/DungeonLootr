import { notFound } from 'next/navigation';
import Link from '../../native-link';
import { DataNote, NextSteps, RelatedLinks, RetentionPanel } from '../../components';
import { bossRushBySlug, bossRushPages, bossRushSerp } from '../../data';
import { bossRushClusterLinks } from '../../related';
import { notFoundMetadata, pageMetadata } from '../../seo';

export function generateStaticParams() {
  return bossRushPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = bossRushBySlug(slug);
  if (!page) return notFoundMetadata;
  return pageMetadata(bossRushSerp(page), `/boss-rush/${page.slug}`);
}

export default async function BossRushDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = bossRushBySlug(slug);
  if (!page) notFound();
  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Boss Rush / {page.title}</p>
        <h1>{page.title}</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{page.opening}</p>
          <div className="hero-actions"><Link href="/tools/drop-chance-calculator">Calculate expected runs</Link></div>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>Route checklist</h2>
            <ul>{page.sections.map((section) => <li key={section}>{section}</li>)}</ul>
          </section>
          <DataNote />
          <RelatedLinks title="Related pages" links={bossRushClusterLinks(`/boss-rush/${page.slug}`)} />
          <NextSteps links={[
            ['Back to Boss Rush hub', '/boss-rush'],
            ['Compare class tiers', '/class-tier-list'],
            ['Open drop calculator', '/tools/drop-chance-calculator'],
            ['Drop rates table', '/drop-rates'],
          ]} />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title={page.title}
            videoQuery={`${page.title} Dungeon Lootr Roblox clear`}
          />
        </aside>
      </section>
    </main>
  );
}
