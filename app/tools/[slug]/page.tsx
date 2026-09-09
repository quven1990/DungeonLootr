import { notFound } from 'next/navigation';
import Link from '../../native-link';
import { Breadcrumbs } from '../../Breadcrumbs';
import { NextSteps, RelatedLinks } from '../../components';
import { AspectMatcher } from '../AspectMatcher';
import { ClassFinder } from '../ClassFinder';
import { classes, toolBySlug, toolPages, toolSerp } from '../../data';
import { hubClusterLinks } from '../../related';
import { notFoundMetadata, pageMetadata } from '../../seo';

export function generateStaticParams() {
  return toolPages.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = toolBySlug(slug);
  if (!tool) return notFoundMetadata;
  return pageMetadata(toolSerp(tool), `/tools/${tool.slug}`);
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = toolBySlug(slug);
  if (!tool) notFound();
  return (
    <main>
      <section className="site-shell page-hero">
        <Breadcrumbs items={[{ name: 'Tools', href: '/tools/drop-chance-calculator' }, { name: tool.title }]} />
        <h1>{tool.title}</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{tool.opening}</p>
          <div className="hero-actions"><Link href="/classes">Browse Classes</Link></div>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          {slug === 'class-finder' ? <ClassFinder classes={classes} /> : <AspectMatcher classes={classes} />}
          <RelatedLinks title="Related pages" links={hubClusterLinks(`/tools/${tool.slug}`)} />
          <NextSteps links={[
            ['Need drop math? Open calculator', '/tools/drop-chance-calculator'],
            ['See all classes', '/classes'],
            ['Class tier list', '/class-tier-list'],
            ['Boss Rush guide', '/boss-rush'],
          ]} />
        </div>
      </section>
    </main>
  );
}
