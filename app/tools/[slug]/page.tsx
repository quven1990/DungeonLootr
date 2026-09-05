import { notFound } from 'next/navigation';
import Link from 'next/link';
import { NextSteps } from '../../components';
import { AspectMatcher } from '../AspectMatcher';
import { ClassFinder } from '../ClassFinder';
import { classes, toolBySlug, toolPages, toolSerp } from '../../data';

export function generateStaticParams() {
  return toolPages.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = toolBySlug(slug);
  if (!tool) return {};
  const serp = toolSerp(tool);
  return {
    title: serp.title,
    description: serp.description,
    openGraph: { title: serp.title, description: serp.description },
    twitter: { title: serp.title, description: serp.description },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = toolBySlug(slug);
  if (!tool) notFound();
  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Tools / {tool.title}</p>
        <h1>{tool.title}</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{tool.opening}</p>
          <div className="hero-actions"><Link href="/classes/">Browse Classes</Link></div>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          {slug === 'class-finder' ? <ClassFinder classes={classes} /> : <AspectMatcher classes={classes} />}
          <NextSteps links={[
            ['Need drop math? Open calculator', '/tools/drop-chance-calculator/'],
            ['See all classes', '/classes/'],
          ]} />
        </div>
      </section>
    </main>
  );
}
