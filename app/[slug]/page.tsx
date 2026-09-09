import { notFound } from 'next/navigation';
import Link from '../native-link';
import { Breadcrumbs } from '../Breadcrumbs';
import { ClassTable, CodesPanel, DataNote, NextSteps, RelatedLinks, RetentionPanel } from '../components';
import { PageStatus } from '../PageStatus';
import { WIKI_PAGE_UPDATED, codesLastChecked, demotedHubSlugs, hubBySlug, hubPages, hubSerp } from '../data';
import { JsonLd, faqJsonLd } from '../jsonld';
import { hubClusterLinks } from '../related';
import { notFoundMetadata, pageMetadata } from '../seo';

export function generateStaticParams() {
  return hubPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = hubBySlug(slug);
  if (!page) return notFoundMetadata;
  return pageMetadata(hubSerp(page), `/${page.slug}`, { index: !demotedHubSlugs.has(page.slug) });
}

const codesFaqs = [
  {
    q: 'Where do I redeem Dungeon Lootr codes?',
    a: 'Open the lobby Menu, go to More → Codes, paste a working code, then Claim. Join the required community group if the game asks for it.',
  },
  {
    q: 'Why is my Dungeon Lootr code not working?',
    a: 'Codes are case-sensitive and can expire. Copy from the active list, avoid expired codes, and try a fresh server if a valid code still fails.',
  },
  {
    q: 'Is UPDATE1 an UPDATE 1 code?',
    a: 'Yes. UPDATE1 was in the September 6, 2026 community roundup and is highlighted as an UPDATE 1 code. That list was reconciled the day before UPDATE 1 launched.',
  },
];

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
        <h2>Suggested progression route</h2>
        <ol>
          <li>Early: roll a usable Epic/Legendary clearer (Boxer / Witch Gunner band) and stop rerolling until clears are stable.</li>
          <li>Mid: push the highest dungeon tier you can farm cleanly for EXP and coins.</li>
          <li>Boss Rush unlock at 67+: decide between Floor 40+ Class Item farming and Floor 100 fragment crafting.</li>
          <li>Endgame chase order most accounts follow: Cursed King or Honored One → Unrestricted checklist, or Azure Devil → Awakened Devil EX / Dreadlord as side chases.</li>
          <li>UPDATE 1 classes are optional extras until their unlocks are confirmed in your client.</li>
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
        <p><Link href="/drop-rates">Open the drop-rate table</Link> for sources and odds.</p>
      </section>
    );
  }
  return null;
}

export default async function HubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = hubBySlug(slug);
  if (!page) notFound();
  const isCodes = slug === 'codes';

  return (
    <main>
      {isCodes ? <JsonLd data={faqJsonLd(codesFaqs)} /> : null}
      <section className="site-shell page-hero">
        <Breadcrumbs items={[{ name: page.title }]} />
        <h1>{page.title}</h1>
        {isCodes ? <PageStatus updatedAt={WIKI_PAGE_UPDATED} verifiedForUpdate1={false} /> : null}
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{page.opening}</p>
          <div className="hero-actions" data-nosnippet>
            {isCodes ? (
              <>
                <Link href="/update-1">View UPDATE 1 Guide</Link>
                <Link className="secondary" href="/classes">
                  Browse Classes
                </Link>
              </>
            ) : (
              <>
                <Link href="/tools/drop-chance-calculator">Open Drop Calculator</Link>
                <Link className="secondary" href="/classes">
                  Browse Classes
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>What this page answers</h2>
            <ul>
              {page.sections.map((section) => (
                <li key={section}>{section}</li>
              ))}
            </ul>
          </section>
          <HubBody slug={slug} />
          {isCodes ? (
            <section className="content-panel">
              <h2>FAQ</h2>
              {codesFaqs.map((item) => (
                <article key={item.q} className="faq-item">
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </section>
          ) : null}
          <DataNote />
          <RelatedLinks title="Related pages" links={hubClusterLinks(`/${page.slug}`)} />
          <NextSteps
            links={
              isCodes
                ? [
                    ['UPDATE 1 changes', '/update-1', 'See which classes and event names landed with UPDATE 1.'],
                    ['Class directory', '/classes', 'Pick a target after you redeem.'],
                    ['Boss Rush', '/boss-rush', 'Spend chests and potions on documented floor breakpoints.'],
                    ['Tier list', '/class-tier-list', 'Check whether your main is still worth the grind.'],
                  ]
                : [
                    ['Class directory', '/classes'],
                    ['Drop calculator', '/tools/drop-chance-calculator'],
                    ['Boss Rush', '/boss-rush'],
                    ['Tier list', '/class-tier-list'],
                  ]
            }
          />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title={page.title}
            videoQuery={`${page.title} Roblox Dungeon Lootr guide`}
            toolHref={slug === 'aspects' ? '/tools/aspect-matcher' : isCodes ? '/update-1' : '/tools/drop-chance-calculator'}
            toolLabel={slug === 'aspects' ? 'Match an Aspect' : isCodes ? 'Open UPDATE 1' : 'Open calculator'}
          />
          <div className="content-panel">
            <h3>{isCodes ? 'Verified vs updated' : 'Keep current'}</h3>
            <p>
              {isCodes
                ? `Code rewards were last reconciled on ${codesLastChecked}. This page layout was updated later; that is not a new in-game audit.`
                : 'Routes and rates can shift after Roblox updates. Prefer in-game UI and multiple community sources over a single rumor.'}
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
