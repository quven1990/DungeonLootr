import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ClassTable, CodesPanel, DataNote, NextSteps, RetentionPanel } from '../components';
import { codesLastChecked, hubBySlug, hubPages, hubSerp } from '../data';

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

function HubBody({ slug }: { slug: string }) {
  if (slug === 'codes') return <CodesPanel />;
  if (slug === 'builds' || slug === 'aspects') {
    return (
      <>
        <section className="content-panel">
          <h2>{slug === 'builds' ? 'Build directory' : 'Aspect direction by class'}</h2>
          <p>
            {slug === 'builds'
              ? 'Open a class build page for mode focus, Aspect direction, and unlock links. Start with your clear goal before copying a setup.'
              : 'Use each class Aspect recommendation as the starting point, then swap to survival/uptime if clears fail before damage matters.'}
          </p>
        </section>
        <ClassTable />
      </>
    );
  }
  if (slug === 'progression-guide') {
    return (
      <section className="content-panel">
        <h2>Fastest progression route</h2>
        <ol>
          <li>Early: roll a usable Epic/Legendary clearer (Boxer / Witch Gunner band) and stop rerolling until clears are stable.</li>
          <li>Mid: push the highest dungeon tier you can farm cleanly for EXP and coins.</li>
          <li>Boss Rush unlock at 67+: decide between Floor 40+ Class Item farming and Floor 100 fragment crafting.</li>
          <li>Endgame chase order most accounts follow: Cursed King or Honored One → Unrestricted checklist, or Azure Devil → Awakened Devil EX / Dreadlord as side chases.</li>
        </ol>
      </section>
    );
  }
  if (slug === 'dungeons') {
    return (
      <section className="content-panel">
        <h2>Dungeon progression checkpoints</h2>
        <ul className="check-list">
          <li>Farm the highest tier you can clear repeatedly - deaths cost more than slow clears.</li>
          <li>Use dungeon EXP to hit Boss Rush at level 67+.</li>
          <li>Frostspire Nightmare is the Devil Heart source for Awakened Devil EX.</li>
          <li>Underworld Gate Nightmare is the ~1% Underworld Glaive farm for Dreadlord.</li>
        </ul>
      </section>
    );
  }
  if (slug === 'items') {
    return (
      <section className="content-panel">
        <h2>Key items and what they unlock</h2>
        <ul className="check-list">
          <li>Sukuna / Gojo / Asta fragments (50) → Forge Class Items for Cursed King / Honored One / Anti Magic</li>
          <li>Heavenly Fragments (10) → Unrestricted checklist</li>
          <li>Devil Heart → Awakened Devil EX with Azure Devil Lv 50 + 1M coins</li>
          <li>Underworld Glaive → Dreadlord</li>
          <li>Boss Rush Class Items (Floor 40+) → skip the fragment grind if the drop lands</li>
        </ul>
        <p><Link href="/drop-rates/">Open the drop-rate table</Link> for sources and odds.</p>
      </section>
    );
  }
  return null;
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
          <HubBody slug={slug} />
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
            <h3>{slug === 'codes' ? 'Source note' : 'Keep verified'}</h3>
            <p>
              {slug === 'codes'
                ? `Active and expired lists were last reconciled on ${codesLastChecked}. Cross-check Discord / group posts after each update.`
                : 'Routes and rates can shift after Roblox updates. Prefer in-game UI and multiple community sources over a single rumor.'}
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
