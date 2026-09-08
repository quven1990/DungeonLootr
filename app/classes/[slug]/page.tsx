import { notFound } from 'next/navigation';
import Link from '../../native-link';
import { ClassFinderPreview, DataNote, Facts, NextSteps, RelatedLinks, RetentionPanel } from '../../components';
import {
  CONTENT_LAST_CHECKED,
  CONTENT_PATCH,
  classBySlug,
  classes,
  classSerp,
  guideBySlug,
  isIndexableClass,
} from '../../data';
import { classClusterLinks, classIntentNextSteps } from '../../related';
import { notFoundMetadata, pageMetadata } from '../../seo';

export function generateStaticParams() {
  return classes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item) return notFoundMetadata;
  return pageMetadata(classSerp(item), `/classes/${item.slug}`, { index: isIndexableClass(item) });
}

export default async function ClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item) notFound();
  const unlockGuide = guideBySlug(`how-to-get-${item.slug}`);
  const indexable = isIndexableClass(item);
  const isCursedKing = item.slug === 'cursed-king';
  const dataStatus =
    item.confidence === 'verified'
      ? 'Verified'
      : item.confidence === 'conflicting'
        ? 'Conflicting labels'
        : item.confidence === 'unverified'
          ? 'Unverified'
          : 'Community-reported';
  const facts: [string, string][] = isCursedKing
    ? [
        ['Tier', item.tier],
        ['Best mode', item.mode],
        ['Combat role', 'High damage / AoE'],
        ['Rarity', item.rarityConflictNote ? `${item.rarity} (pending confirm)` : item.rarity],
        ['Last checked', CONTENT_LAST_CHECKED],
        ['Patch', CONTENT_PATCH],
        ['Data status', dataStatus],
      ]
    : [
        ['Rarity', item.rarityConflictNote ? `${item.rarity} (pending confirm)` : item.rarity],
        ['Obtain', item.obtain],
        ['Best mode', item.mode],
        ['Aspect note', item.aspect],
        ['Tier', item.tier],
        ['Last checked', CONTENT_LAST_CHECKED],
        ['Patch', CONTENT_PATCH],
        ['Data status', dataStatus],
      ];

  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Classes / {item.name}</p>
        <h1>
          {isCursedKing
            ? 'Dungeon Lootr Cursed King (Sukuna)'
            : indexable
              ? `Dungeon Lootr ${item.name}`
              : `Dungeon Lootr ${item.name}: What We Know`}
        </h1>
        {isCursedKing ? <p className="page-updated">Updated: September 9, 2026</p> : null}
        <div className="quick-answer wide">
          <span className="label">{isCursedKing ? 'Class Overview' : 'Quick Answer'}</span>
          <p>{item.opening}</p>
          <div className="hero-actions" data-nosnippet>
            {isCursedKing ? (
              <>
                <Link href="#skills-and-build">Skills &amp; Build Notes</Link>
                <Link className="secondary" href="#unlock">
                  Unlock Guide
                </Link>
              </>
            ) : (
              <>
                {unlockGuide ? <Link href={`/guides/${unlockGuide.slug}`}>How to Get {item.name}</Link> : null}
                <Link className={unlockGuide ? 'secondary' : undefined} href={`/builds/${item.slug}`}>
                  Best {item.name} Build
                </Link>
              </>
            )}
          </div>
        </div>
        <Facts facts={facts} />
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          {item.rarityConflictNote ? (
            <section className="content-panel">
              <h2>Rarity label note</h2>
              <p>{item.rarityConflictNote}</p>
            </section>
          ) : null}
          <section className="content-panel" id={isCursedKing ? 'unlock' : undefined}>
            <h2>{isCursedKing ? 'How to Unlock Cursed King' : 'Obtain overview'}</h2>
            {isCursedKing ? (
              <p>
                Cursed King can be unlocked through Boss Rush progression or Forge crafting. For the full step-by-step
                route, requirements, and farming guide:{' '}
                <Link href="/guides/how-to-get-cursed-king">How to Get Cursed King in Dungeon Lootr</Link>.
              </p>
            ) : (
              <>
                <p>{item.obtain}.</p>
                <ul className="check-list">
                  {item.unlockSteps.slice(0, 3).map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
                {unlockGuide ? (
                  <p>
                    Full route, requirements, and mistakes:{' '}
                    <Link href={`/guides/${unlockGuide.slug}`}>How to get {item.name}</Link>.
                  </p>
                ) : null}
              </>
            )}
          </section>
          <section className="content-panel" id={isCursedKing ? 'skills-and-build' : undefined}>
            <h2>{isCursedKing ? 'Skills, strengths, and weaknesses' : 'Strengths and weaknesses'}</h2>
            {isCursedKing ? (
              <p>
                The current class data supports a high-damage, AoE-focused Boss Rush role. Individual skill names and
                damage values are not published here until they are verified in game.
              </p>
            ) : null}
            <h3>Strengths</h3>
            <ul>
              {item.strengths.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
            <h3>Weaknesses</h3>
            <ul>
              {item.weaknesses.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </section>
          <section className="content-panel">
            <h2>{isCursedKing ? 'Build direction' : 'Aspect note and build summary'}</h2>
            <p>
              Start with a {item.aspect.toLowerCase()} for {item.mode}. Full stats, gear focus, and rotation live on the
              build page.
            </p>
            <ul>
              {item.buildNotes.slice(0, 2).map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <p>
              <Link href={`/builds/${item.slug}`}>
                {isCursedKing ? 'Open Cursed King build notes →' : `Open the best ${item.name} build →`}
              </Link>
            </p>
          </section>
          <ClassFinderPreview current={item} />
          <DataNote />
          <RelatedLinks title="Related pages" links={classClusterLinks(item)} />
          <NextSteps links={classIntentNextSteps(item)} eyebrow="Next steps for this class" />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title={item.name}
            videoQuery={`Dungeon Lootr ${item.name} class showcase Roblox`}
            toolHref="/tools/class-finder"
            toolLabel="Find a better class match"
          />
          <div className="content-panel">
            <h3>Quick facts</h3>
            <p>
              Confidence: {item.confidence}. Last checked {CONTENT_LAST_CHECKED}. Recheck obtain text after major
              updates.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
