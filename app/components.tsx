import Link from './native-link';
import type { ReactNode } from 'react';
import { CopyCodeButton } from './CopyCodeButton';
import {
  classes,
  codesLastChecked,
  dungeonLootrCodes,
  isIndexableClass,
  type ClassEntry,
  type SeoEntry,
} from './data';

export function CodesPanel() {
  const active = dungeonLootrCodes.filter((item) => item.status === 'active');
  const expired = dungeonLootrCodes.filter((item) => item.status === 'expired');
  return (
    <>
      <section className="content-panel">
        <h2>Working codes</h2>
        <p className="codes-meta">
          Last checked: {codesLastChecked}. Codes are case-sensitive and can expire without notice.{' '}
          <Link href="/updatelog">Update log</Link>
        </p>
        <div className="table-wrap desktop-table">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Reward</th>
                <th>Status</th>
                <th>Copy</th>
              </tr>
            </thead>
            <tbody>
              {active.map((item) => (
                <tr key={item.code}>
                  <td><code className="code-chip">{item.code}</code></td>
                  <td>{item.reward}</td>
                  <td>{item.isNew ? 'Active · New' : 'Active'}</td>
                  <td><CopyCodeButton code={item.code} showCode={false} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="code-card-list mobile-cards" aria-label="Working codes">
          {active.map((item) => (
            <article className="code-card" key={item.code}>
              <div className="code-card-top">
                <CopyCodeButton code={item.code} />
                <span className="status-pill">{item.isNew ? 'Active · New' : 'Active'}</span>
              </div>
              <p className="code-card-reward">{item.reward}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="content-panel">
        <h2>Expired codes</h2>
        <ul className="expired-codes">
          {expired.map((item) => (
            <li key={item.code}><CopyCodeButton code={item.code} muted /></li>
          ))}
        </ul>
      </section>
      <section className="content-panel">
        <h2>How to redeem</h2>
        <ol>
          <li>Join the required community group if the game asks for it before redeeming.</li>
          <li>Open Dungeon Lootr on Roblox and go to the lobby Menu.</li>
          <li>Open More → Codes, paste a working code, then Claim.</li>
          <li>If a code fails, check spelling/case, confirm it is still in the active list, and try a fresh server.</li>
        </ol>
      </section>
    </>
  );
}

export function PageHero({ entry, cta }: { entry: SeoEntry; cta?: ReactNode }) {
  return (
    <section className="site-shell page-hero">
      <p className="breadcrumb">Home / {entry.type}</p>
      <h1>{entry.h1}</h1>
      <div className="quick-answer wide">
        <span className="label">Quick Answer</span>
        <p>{entry.opening}</p>
        {cta}
      </div>
    </section>
  );
}

export function Facts({ facts }: { facts: [string, string][] }) {
  return (
    <dl className="facts">
      {facts.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ClassTable() {
  return (
    <>
      <div className="table-wrap desktop-table">
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Tier</th>
              <th>Rarity</th>
              <th>Obtain</th>
              <th>Best mode</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item) => (
              <tr key={item.slug}>
                <td><Link href={`/classes/${item.slug}`}>{item.name}</Link></td>
                <td>{item.tier}</td>
                <td><span className="rarity">{item.rarity}</span>{item.rarityConflictNote ? ' · pending confirm' : ''}</td>
                <td>{item.obtain}</td>
                <td>{item.mode}</td>
                <td>{item.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="class-card-list mobile-cards" aria-label="Class list">
        {classes.map((item) => (
          <Link className="class-card" href={`/classes/${item.slug}`} key={item.slug}>
            <div className="class-card-top">
              <strong>{item.name}</strong>
              <span className="rarity">{item.tier} · {item.rarity}{item.rarityConflictNote ? ' · pending' : ''}</span>
            </div>
            <div className="class-card-meta">
              <span>Obtain: {item.obtain}</span>
              <span>Best mode: {item.mode}</span>
              <span>Confidence: {item.confidence}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export function DataNote() {
  return (
    <section className="data-note">
      <span className="label">Data Note</span>
      <p>
        Routes and rates are community-reported (not official patch notes). Fields marked probable, conflicting, or
        unverified can shift after Roblox updates. Rarity labels that disagree across community guides are marked pending
        in-game confirm — confirm against the live UI before long farms. Send correction notes via the{' '}
        <a href="https://github.com/quven1990/DungeonLootr/issues">GitHub issues</a> for this wiki.
      </p>
    </section>
  );
}

export function NextSteps({
  links,
  eyebrow = 'What to do next',
}: {
  links: [string, string, string?][];
  eyebrow?: string;
}) {
  return (
    <section className="next-steps">
      <p className="eyebrow">{eyebrow}</p>
      <div className="card-grid four">
        {links.map(([label, href, blurb]) => (
          <Link className="intent-card" href={href} key={href}>
            <span>{label}</span>
            <p>{blurb ?? describeLink(label, href)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Compact related-link list for denser internal linking without keyword stuffing. */
export function RelatedLinks({
  title = 'Related pages',
  links,
}: {
  title?: string;
  links: [string, string, string?][];
}) {
  if (!links.length) return null;
  return (
    <section className="content-panel">
      <h2>{title}</h2>
      <ul className="check-list">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RetentionPanel({
  title,
  videoQuery,
  toolHref = '/tools/drop-chance-calculator',
  toolLabel = 'Calculate expected runs',
  showVideo = true,
}: {
  title: string;
  videoQuery: string;
  toolHref?: string;
  toolLabel?: string;
  showVideo?: boolean;
}) {
  const video = showVideo ? pickVideo(title, videoQuery) : null;
  return (
    <div className="engagement-panel">
      <div className="engagement-item">
        <span className="label">Tool</span>
        <Link href={toolHref}>{toolLabel}</Link>
      </div>
      {video ? (
        <div className="engagement-item video-item">
          <span className="label">Video</span>
          <VideoEmbed video={video} compact />
          <p>{video.reason}</p>
        </div>
      ) : null}
    </div>
  );
}

export function FeaturedVideo({ title, videoQuery }: { title: string; videoQuery: string }) {
  const video = pickVideo(title, videoQuery);
  if (!video) return null;
  return (
    <section className="site-shell video-feature">
      <div>
        <p className="eyebrow">Gameplay video</p>
        <h2>{video.heading}</h2>
        <p>{video.reason}</p>
      </div>
      <VideoEmbed video={video} />
    </section>
  );
}

type VideoChoice = {
  id: string;
  label: string;
  heading: string;
  reason: string;
};

function VideoEmbed({ video, compact = false }: { video: VideoChoice; compact?: boolean }) {
  return (
    <div className={compact ? 'video-embed compact' : 'video-embed'}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.id}`}
        title={video.label}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">
        Open on YouTube
      </a>
    </div>
  );
}

function pickVideo(title: string, videoQuery: string): VideoChoice | null {
  const key = `${title} ${videoQuery}`.toLowerCase();
  // Only show a video when the query is close enough; otherwise hide the module.
  if (key.includes('cursed king') && (key.includes('unlock') || key.includes('how to get'))) {
    return {
      id: 'XwQFsLvtdr8',
      label: 'Dungeon Lootr Cursed King unlock and route context',
      heading: 'Cursed King unlock route context',
      reason: 'Watch a current unlock / progression route before you commit Boss Rush floors to Cursed King.',
    };
  }
  if (key.includes('cursed king') && key.includes('build')) {
    return {
      id: 'FjNIit2YdUw',
      label: 'Dungeon Lootr Cursed King Boss Rush gameplay',
      heading: 'Cursed King Boss Rush gameplay',
      reason: 'Use this to check clear pacing and skill timing for a Boss Rush-focused Cursed King setup.',
    };
  }
  if (key.includes('cursed king') || (key.includes('class') && key.includes('showcase'))) {
    return {
      id: '2AAJL4oJFoo',
      label: 'Dungeon Lootr class showcase',
      heading: 'Class kit showcase',
      reason: 'See kit animations and clear style before you spend fragments or rolls.',
    };
  }
  if (key.includes('boss rush') || key.includes('floor 40') || key.includes('floor 100')) {
    return {
      id: 'FjNIit2YdUw',
      label: 'Dungeon Lootr Boss Rush gameplay',
      heading: 'Boss Rush clear reference',
      reason: 'Check floor pacing and clear stability before camping Class Item or fragment breakpoints.',
    };
  }
  if (key.includes('wiki') || key.includes('code') || key.includes('beginner') || key.includes('home')) {
    return {
      id: '2uE24Q7LeQQ',
      label: 'Dungeon Lootr beginner overview',
      heading: 'Beginner overview',
      reason: 'Quick gameplay overview before you pick a class, unlock route, or farm plan.',
    };
  }
  if (key.includes('tier') || key.includes('aspect')) {
    return {
      id: '2AAJL4oJFoo',
      label: 'Dungeon Lootr all classes showcase',
      heading: 'Class showcase before you commit',
      reason: 'Compare kits visually before you lock a long farm or Aspect direction.',
    };
  }
  // No precise match → do not show a generic filler video.
  return null;
}

export function ClassFinderPreview({ current }: { current?: ClassEntry }) {
  const rows = current
    ? classes
        .filter((item) => item.slug !== current.slug && isIndexableClass(item))
        .map((item) => {
          let score = 0;
          if (item.tier === current.tier) score += 3;
          if (item.mode === current.mode) score += 2;
          if (item.rarity === current.rarity) score += 1;
          return { item, score };
        })
        .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
        .slice(0, 4)
        .map((row) => row.item)
    : classes.filter(isIndexableClass).slice(0, 4);

  return (
    <section className="content-panel">
      <h2>{current ? 'Similar classes to compare' : 'Not sure this is your class?'}</h2>
      <div className="mini-grid">
        {rows.map((item) => (
          <Link href={`/classes/${item.slug}`} key={item.slug}>
            <strong>{item.name}</strong>
            <span>{item.mode} / {item.rarity}</span>
          </Link>
        ))}
      </div>
      <p>
        Or use the <Link href="/tools/class-finder">Class Finder</Link> and{' '}
        <Link href="/class-tier-list">tier list</Link> before you commit a long farm.
      </p>
    </section>
  );
}

function describeLink(label: string, href: string) {
  const text = label.toLowerCase();
  if (href.includes('/tools/drop-chance-calculator')) return 'Estimate attempts to 50%, 90%, 95%, and 99% before a long farm.';
  if (href.includes('/guides/how-to-get-')) return 'Open the suggested unlock route, requirements, and common mistakes.';
  if (href.includes('/builds/')) return 'Read build notes or a verified setup for this class.';
  if (href.includes('/classes/')) return 'See rarity, obtain overview, strengths, weaknesses, and best mode.';
  if (href.includes('/comparisons/')) return 'Get a mode-based verdict instead of guessing from rarity alone.';
  if (href.includes('/class-tier-list')) return 'Check whether this selected class is still worth the grind in your mode.';
  if (href.includes('/boss-rush')) return 'Plan floor breakpoints, Class Item drops, and fragment farms.';
  if (href.includes('/drop-rates')) return 'Confirm sources and odds before you queue the same clear again.';
  if (href.includes('/guides/best-aspect')) return 'Pick an Aspect direction that matches your clear goal.';
  if (href.includes('/codes')) return 'Redeem active codes before a long farm session.';
  if (text.includes('unlock') || text.includes('farming') || text.includes('got ')) {
    return 'Stay on the same class path with the next useful action.';
  }
  return 'Continue with the related page that matches your next goal.';
}
