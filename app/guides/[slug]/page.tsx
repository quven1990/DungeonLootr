import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DataNote, NextSteps } from '../../components';
import { guideBySlug, guides } from '../../data';

export function generateStaticParams() {
  return guides.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} - Fastest Method & Requirements`,
    description: `Unlock ${guide.target} with a quick answer, requirements checklist, route order, farming strategy, and next-step links.`,
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();

  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Guides / {guide.target}</p>
        <h1>{guide.title}</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{guide.opening}</p>
          <div className="hero-actions">
            <Link href="#route">Fastest Route</Link>
            <Link className="secondary" href="/tools/drop-chance-calculator/">Open Calculator</Link>
          </div>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>Requirements checklist</h2>
            <ul className="check-list">
              {guide.requirements.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          <section className="content-panel" id="route">
            <h2>Fastest farming route</h2>
            <ol>
              <li>Confirm the current route requirements before spending currency.</li>
              <li>Farm the most stable source first, usually the one your current build can clear consistently.</li>
              <li>Use deterministic Forge or prerequisite progress as the backup when random drops stall.</li>
            </ol>
          </section>
          <DataNote />
          <NextSteps links={guide.next.map((href) => [
            href.includes('/tools/') ? 'Still farming? Open calculator' : 'Open the next route',
            href,
          ])} />
        </div>
        <aside className="side-rail">
          <div className="content-panel">
            <h3>Common mistake</h3>
            <p>Do not chase a low-rate drop on an unstable clear. A slightly slower floor with reliable clears usually wins over time.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
