import { notFound } from 'next/navigation';
import Link from '../../native-link';
import { Breadcrumbs } from '../../Breadcrumbs';
import { ClassFinderPreview, DataNote, Facts, NextSteps, RelatedLinks, RetentionPanel } from '../../components';
import { PageStatus } from '../../PageStatus';
import {
  CONTENT_LAST_CHECKED,
  CONTENT_PATCH,
  WIKI_PAGE_UPDATED,
  classBySlug,
  classPages,
  classSerp,
  guideBySlug,
  isIndexableClass,
  isUpdate1Class,
} from '../../data';
import { JsonLd, faqJsonLd } from '../../jsonld';
import { classClusterLinks, classIntentNextSteps } from '../../related';
import { notFoundMetadata, pageMetadata } from '../../seo';

export function generateStaticParams() {
  return classPages().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item || item.listingOnly) return notFoundMetadata;
  return pageMetadata(classSerp(item), `/classes/${item.slug}`, { index: isIndexableClass(item) });
}

export default async function ClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classBySlug(slug);
  if (!item || item.listingOnly) notFound();
  const unlockGuide = guideBySlug(`how-to-get-${item.slug}`);
  const indexable = isIndexableClass(item);
  const isCursedKing = item.slug === 'cursed-king';
  const isUpdate1 = isUpdate1Class(item);
  const dataStatus =
    item.confidence === 'verified'
      ? 'Verified'
      : item.confidence === 'conflicting'
        ? 'Community sources disagree'
        : item.confidence === 'unverified'
          ? 'Still being verified'
          : 'Community-reported';
  const facts: [string, string][] = isUpdate1
    ? [
        ['Rarity', item.rarity],
        ['Added', 'UPDATE 1 (September 7, 2026)'],
        ['Tier', 'Unrated'],
        ['Play style', item.mode],
        ['Skills', 'Not verified'],
        ['Data status', dataStatus],
      ]
    : isCursedKing
      ? [
          ['Tier', item.tier],
          ['Best mode', item.mode],
          ['Combat role', 'High damage / AoE'],
          ['Rarity', item.rarityConflictNote ? `${item.rarity} (community labels disagree)` : item.rarity],
          ['Last checked', CONTENT_LAST_CHECKED],
          ['Patch', CONTENT_PATCH],
          ['Data status', dataStatus],
        ]
      : [
          ['Rarity', item.rarityConflictNote ? `${item.rarity} (community labels disagree)` : item.rarity],
          ['How to get', item.obtain],
          ['Best mode', item.mode],
          ['Aspect note', item.aspect],
          ['Tier', item.tier],
          ['Last checked', CONTENT_LAST_CHECKED],
          ['Patch', CONTENT_PATCH],
          ['Data status', dataStatus],
        ];

  const updateFaqs = isUpdate1
    ? [
        {
          q: `How do you get ${item.name} in Dungeon Lootr?`,
          a: `${item.obtain} Confirm the live UI before spending currency or raid keys.`,
        },
        {
          q: `Is ${item.name} good?`,
          a: `This wiki is not ranking ${item.name} yet. It is a confirmed UPDATE 1 Exotic name, but combat performance is still being verified.`,
        },
        {
          q: `What rarity is ${item.name}?`,
          a: `Public UPDATE 1 coverage lists ${item.name} as Exotic.`,
        },
      ]
    : [];

  const h1 = isCursedKing
    ? 'Dungeon Lootr Cursed King (Sukuna)'
    : isUpdate1
      ? `${item.name} in Dungeon Lootr`
      : indexable
        ? `Dungeon Lootr ${item.name}`
        : `Dungeon Lootr ${item.name}: What We Know`;

  return (
    <main>
      {updateFaqs.length ? <JsonLd data={faqJsonLd(updateFaqs)} /> : null}
      <section className="site-shell page-hero">
        <Breadcrumbs items={[{ name: 'Classes', href: '/classes' }, { name: item.name }]} />
        <h1>{h1}</h1>
        <PageStatus updatedAt={WIKI_PAGE_UPDATED} verifiedForUpdate1={false} />
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
            ) : isUpdate1 ? (
              <>
                <Link href="/update-1">UPDATE 1 Notes</Link>
                <Link className="secondary" href="/classes">
                  All Classes
                </Link>
              </>
            ) : (
              <>
                {unlockGuide ? <Link href={`/guides/${unlockGuide.slug}`}>How to Get {item.name}</Link> : null}
                <Link className={unlockGuide ? 'secondary' : undefined} href={`/builds/${item.slug}`}>
                  {item.name} build notes
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
              <h2>{item.name} rarity</h2>
              <p>{item.rarityConflictNote}</p>
            </section>
          ) : isUpdate1 ? (
            <section className="content-panel">
              <h2>{item.name} rarity</h2>
              <p>
                Public UPDATE 1 coverage lists {item.name} as Exotic. This wiki is not attaching a spin percentage to
                that label, because UPDATE 1 classes are not documented as normal class rolls.
              </p>
            </section>
          ) : null}

          <section className="content-panel" id={isCursedKing ? 'unlock' : undefined}>
            <h2>{isUpdate1 ? `How to Get ${item.name}` : isCursedKing ? 'How to Unlock Cursed King' : 'Obtain overview'}</h2>
            {isCursedKing ? (
              <p>
                Cursed King can be unlocked through Boss Rush progression or Forge crafting. For the full step-by-step
                route, requirements, and farming guide:{' '}
                <Link href="/guides/how-to-get-cursed-king">How to Get Cursed King in Dungeon Lootr</Link>.
              </p>
            ) : (
              <>
                <p>{item.obtain}</p>
                {item.unlockSteps.length ? (
                  <ul className="check-list">
                    {item.unlockSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                ) : null}
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
            <h2>{isUpdate1 ? 'Skills' : isCursedKing ? 'Skills, strengths, and weaknesses' : 'Strengths and weaknesses'}</h2>
            {isUpdate1 ? (
              <p>Skill details are still being verified after UPDATE 1. No skill names or damage multipliers are listed here.</p>
            ) : isCursedKing ? (
              <p>
                The current class data supports a high-damage, AoE-focused Boss Rush role. Individual skill names and
                damage values are not published here until they are verified in game.
              </p>
            ) : null}
            {item.strengths.length ? (
              <>
                <h3>Strengths</h3>
                <ul>
                  {item.strengths.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </>
            ) : null}
            {item.weaknesses.length ? (
              <>
                <h3>Weaknesses</h3>
                <ul>
                  {item.weaknesses.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>

          {isUpdate1 ? (
            <>
              <section className="content-panel">
                <h2>Best uses</h2>
                <p>{item.bestFor}. That is a testing note, not a ranked role.</p>
              </section>
              <section className="content-panel">
                <h2>Is {item.name} good?</h2>
                <p>
                  Not ranked yet. If you already own it, treat it as an UPDATE 1 kit to test. If you do not, finish a
                  documented class such as Cursed King or Witch Gunner rather than planning around disputed shop prices.
                </p>
              </section>
              <section className="content-panel">
                <h2>{item.name} vs other classes</h2>
                <p>
                  Compare it to older classes only after you own both. Documented alternatives:{' '}
                  <Link href="/classes/cursed-king">Cursed King</Link> for Boss Rush,{' '}
                  <Link href="/classes/witch-gunner">Witch Gunner</Link> for safer ranged farming, and{' '}
                  <Link href="/class-tier-list">the ranked tier list</Link> for everything else.
                </p>
              </section>
              <section className="content-panel">
                <h2>Best build</h2>
                <p>
                  No Aspect, stat spread, or rotation is published for {item.name} until the in-game kit is recorded.
                  Copied multiplier tables from other sites are not used here.
                </p>
                {item.buildNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </section>
              <section className="content-panel">
                <h2>UPDATE 1 notes</h2>
                <p>
                  {item.name} is one of four Exotic classes added on September 7, 2026. For the full patch picture,
                  including Magic Unleashed and codes, see the <Link href="/update-1">UPDATE 1 guide</Link>.
                </p>
              </section>
              <section className="content-panel">
                <h2>FAQ</h2>
                {updateFaqs.map((faq) => (
                  <article key={faq.q} className="faq-item">
                    <h3>{faq.q}</h3>
                    <p>{faq.a}</p>
                  </article>
                ))}
              </section>
            </>
          ) : (
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
                  {isCursedKing ? 'Open Cursed King build notes →' : `Open ${item.name} build notes →`}
                </Link>
              </p>
            </section>
          )}

          <ClassFinderPreview current={item} />
          <DataNote />
          <RelatedLinks title={isUpdate1 ? 'Related classes' : 'Related pages'} links={classClusterLinks(item)} />
          <NextSteps links={classIntentNextSteps(item)} eyebrow="Next steps for this class" />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title={item.name}
            videoQuery={`Dungeon Lootr ${item.name} class showcase Roblox`}
            toolHref={isUpdate1 ? '/update-1' : '/tools/class-finder'}
            toolLabel={isUpdate1 ? 'Open UPDATE 1' : 'Find a better class match'}
          />
          <div className="content-panel">
            <h3>Quick facts</h3>
            <p>
              {isUpdate1
                ? `${item.name} is documented as an UPDATE 1 Exotic class. Unlock details still need an in-game check.`
                : `Last game-data check ${CONTENT_LAST_CHECKED}. Recheck obtain text after major updates.`}
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
