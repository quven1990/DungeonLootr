import { notFound } from 'next/navigation';
import Link from '../../native-link';
import { DataNote, Facts, NextSteps, RelatedLinks, RetentionPanel } from '../../components';
import {
  buildOpening,
  buildSerp,
  classBySlug,
  classes,
  CONTENT_LAST_CHECKED,
  CONTENT_PATCH,
  getBuildProfile,
  guideBySlug,
  isIndexableBuild,
} from '../../data';
import { buildClusterLinks, buildIntentNextSteps } from '../../related';
import { notFoundMetadata, pageMetadata } from '../../seo';

export function generateStaticParams() {
  return classes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item) return notFoundMetadata;
  return pageMetadata(buildSerp(item), `/builds/${item.slug}`, { index: isIndexableBuild(item) });
}

export default async function BuildPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item) notFound();
  const unlockGuide = guideBySlug(`how-to-get-${item.slug}`);
  const profile = getBuildProfile(item.slug);
  const publishReady = isIndexableBuild(item);

  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Builds / {item.name}</p>
        <h1>{publishReady ? `Best ${item.name} Build` : `${item.name} Build Notes`}</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{buildOpening(item)}</p>
          <div className="hero-actions">
            <Link href={`/classes/${item.slug}`}>Class overview</Link>
            <Link className="secondary" href={unlockGuide ? `/guides/${unlockGuide.slug}` : '/classes'}>
              {unlockGuide ? `How to get ${item.name}` : 'Browse classes'}
            </Link>
          </div>
        </div>
        <Facts
          facts={
            profile
              ? [
                  ['Best mode', profile.bestMode],
                  ['Best Aspect', profile.bestAspect],
                  ['Alt Aspect', profile.altAspect],
                  ['Stat priority', profile.statPriority],
                  ['Last checked', profile.lastChecked],
                  ['Patch', profile.patch],
                  ['Data status', profile.dataStatus],
                ]
              : [
                  ['Mode', item.mode],
                  ['Aspect', item.aspect],
                  ['Tier', item.tier],
                  ['Last checked', CONTENT_LAST_CHECKED],
                  ['Patch', CONTENT_PATCH],
                  ['Data status', 'Mixed'],
                ]
          }
        />
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          {profile && publishReady ? (
            <>
              <section className="content-panel">
                <h2>Best overall</h2>
                <dl className="facts">
                  <div>
                    <dt>Best Aspect</dt>
                    <dd>{profile.bestAspect}</dd>
                  </div>
                  <div>
                    <dt>Alternative Aspect</dt>
                    <dd>{profile.altAspect}</dd>
                  </div>
                  <div>
                    <dt>Stat priority</dt>
                    <dd>{profile.statPriority}</dd>
                  </div>
                  <div>
                    <dt>Gear focus</dt>
                    <dd>{profile.gearFocus}</dd>
                  </div>
                </dl>
              </section>
              <section className="content-panel">
                <h2>Core rotation</h2>
                <p>{profile.rotation}</p>
              </section>
              <section className="content-panel">
                <h2>Boss Rush setup</h2>
                <p>{profile.bossRushSetup}</p>
                <h2>Dungeon clear setup</h2>
                <p>{profile.dungeonSetup}</p>
              </section>
              <section className="content-panel">
                <h2>Strengths and weaknesses</h2>
                <h3>Strengths</h3>
                <ul>
                  {profile.strengths.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
                <h3>Weaknesses</h3>
                <ul>
                  {profile.weaknesses.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </section>
            </>
          ) : (
            <section className="content-panel">
              <h2>Build notes in progress</h2>
              <p>
                This page is available for internal linking, but it does not yet meet the publish bar for stats, Aspect,
                gear focus, and rotation. Use the class overview and unlock guide until a full build is verified.
              </p>
              <ul>
                {item.buildNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </section>
          )}
          <DataNote />
          <RelatedLinks title="Related pages" links={buildClusterLinks(item)} />
          <NextSteps links={buildIntentNextSteps(item)} eyebrow="Next steps after this build" />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title={`${item.name} build`}
            videoQuery={`Dungeon Lootr ${item.name} build Boss Rush Roblox`}
            toolHref="/tools/aspect-matcher"
            toolLabel="Match an Aspect"
            showVideo={publishReady}
          />
        </aside>
      </section>
    </main>
  );
}
