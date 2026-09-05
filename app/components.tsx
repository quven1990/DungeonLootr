import Link from 'next/link';
import type { ReactNode } from 'react';
import { classes, type ClassEntry, type SeoEntry } from './data';

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
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Class</th>
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
              <td><span className="rarity">{item.rarity}</span></td>
              <td>{item.obtain}</td>
              <td>{item.mode}</td>
              <td>{item.confidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
  const youtube = `https://www.youtube.com/results?search_query=${encodeURIComponent(videoQuery)}`;
  return (
    <div className="engagement-panel">
      <div className="engagement-item">
        <span className="label">Tool</span>
        <Link href={toolHref}>{toolLabel}</Link>
      </div>
      <div className="engagement-item">
        <span className="label">Video</span>
        <a href={youtube} target="_blank" rel="noreferrer">
          Watch {title} gameplay on YouTube
        </a>
        <p>Use gameplay to verify skill timing, clear consistency, and whether the route still matches the current update.</p>
      </div>
    </div>
  );
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
