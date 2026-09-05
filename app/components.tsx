import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  classes,
  codesLastChecked,
  dungeonLootrCodes,
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
        <p className="codes-meta">Last checked: {codesLastChecked}. Codes are case-sensitive and can expire without notice.</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Reward</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {active.map((item) => (
                <tr key={item.code}>
                  <td><code className="code-chip">{item.code}</code></td>
                  <td>{item.reward}</td>
                  <td>{item.isNew ? 'Active · New' : 'Active'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="content-panel">
        <h2>Expired codes</h2>
        <ul className="expired-codes">
          {expired.map((item) => (
            <li key={item.code}><code className="code-chip muted">{item.code}</code></li>
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
                <td><Link href={`/classes/${item.slug}/`}>{item.name}</Link></td>
                <td>{item.tier}</td>
                <td><span className="rarity">{item.rarity}</span></td>
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
          <Link className="class-card" href={`/classes/${item.slug}/`} key={item.slug}>
            <div className="class-card-top">
              <strong>{item.name}</strong>
              <span className="rarity">{item.tier} · {item.rarity}</span>
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
        Some class routes and exact rates can shift after Roblox updates. Fields marked probable or unverified should be treated as community-tested until checked against in-game UI, developer notes, or multiple independent gameplay sources.
      </p>
    </section>
  );
}

export function NextSteps({ links }: { links: [string, string][] }) {
  return (
    <section className="next-steps">
      <p className="eyebrow">Related next steps</p>
      <div className="card-grid four">
        {links.map(([label, href]) => (
          <Link className="intent-card" href={href} key={href}>
            <span>{label}</span>
            <p>{describeLink(label, href)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function RetentionPanel({
  title,
  videoQuery,
  toolHref = '/tools/drop-chance-calculator/',
  toolLabel = 'Calculate expected runs',
}: {
  title: string;
  videoQuery: string;
  toolHref?: string;
  toolLabel?: string;
}) {
  const video = pickVideo(title, videoQuery);
  return (
    <div className="engagement-panel">
      <div className="engagement-item">
        <span className="label">Tool</span>
        <Link href={toolHref}>{toolLabel}</Link>
      </div>
      <div className="engagement-item video-item">
        <span className="label">Video</span>
        <VideoEmbed video={video} compact />
        <p>Use gameplay to verify skill timing, clear consistency, and whether the route still matches the current update.</p>
      </div>
    </div>
  );
}

export function FeaturedVideo({ title, videoQuery }: { title: string; videoQuery: string }) {
  const video = pickVideo(title, videoQuery);
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

function pickVideo(title: string, videoQuery: string): VideoChoice {
  const key = `${title} ${videoQuery}`.toLowerCase();
  if (key.includes('wiki') || key.includes('code') || key.includes('progression') || key.includes('beginner')) {
    return {
      id: '2uE24Q7LeQQ',
      label: 'Dungeon Lootr beginner guide and new exotic class video',
      heading: 'Beginner guide and current progression context',
      reason: 'This is the broadest fit for home, codes, and progression pages because it gives new visitors a gameplay overview quickly.',
    };
  }
  if (key.includes('tier') || key.includes('class') || key.includes('aspect')) {
    return {
      id: '2AAJL4oJFoo',
      label: 'Dungeon Lootr all classes showcase video',
      heading: 'All classes showcased before you commit',
      reason: 'This works best on class and tier pages because users can see kits and animations before choosing what to farm.',
    };
  }
  if (key.includes('boss') || key.includes('dungeon') || key.includes('build')) {
    return {
      id: 'FjNIit2YdUw',
      label: 'Dungeon Lootr strongest classes versus all dungeons gameplay',
      heading: 'Dungeon and Boss Rush gameplay route',
      reason: 'This video fits build, dungeon, and Boss Rush pages because it compares stronger classes against multiple dungeon clears.',
    };
  }
  if (key.includes('drop') || key.includes('rate') || key.includes('item') || key.includes('fragment')) {
    return {
      id: 'XwQFsLvtdr8',
      label: 'Dungeon Lootr tier list and class unlock route video',
      heading: 'Tier list and unlock route context',
      reason: 'This supports farming pages because it keeps rare drops connected to the class routes players are actually chasing.',
    };
  }
  return {
    id: '2uE24Q7LeQQ',
    label: 'Dungeon Lootr beginner guide and new exotic class video',
    heading: 'Beginner guide and current progression context',
    reason: 'This is the broadest fit for home, codes, and progression pages because it gives new visitors a gameplay overview quickly.',
  };
}

export function ClassFinderPreview({ current }: { current?: ClassEntry }) {
  const rows = classes
    .filter((item) => !current || item.slug !== current.slug)
    .slice(0, 4);
  return (
    <section className="content-panel">
      <h2>Not sure this is your class?</h2>
      <div className="mini-grid">
        {rows.map((item) => (
          <Link href={`/classes/${item.slug}/`} key={item.slug}>
            <strong>{item.name}</strong>
            <span>{item.mode} / {item.rarity}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function describeLink(label: string, href: string) {
  if (href.includes('/tools/drop-chance-calculator')) return 'Turn a drop-rate guess into 50%, 90%, 95%, and 99% run targets.';
  if (href.includes('/builds/')) return 'Move from unlock info into stats, Aspect, gear focus, and mode-specific setup.';
  if (href.includes('/classes/')) return 'Check rarity, obtain method, best mode, strengths, weaknesses, and unlock direction.';
  if (href.includes('/class-tier-list')) return 'Compare this choice against the current class shortlist before spending resources.';
  if (href.includes('/boss-rush')) return 'Plan floor targets, reward checks, and stable clear routes.';
  if (label.toLowerCase().includes('compare')) return 'Use a mode-based verdict instead of guessing from rarity alone.';
  return 'Continue to the next page a searcher would naturally need after this answer.';
}
