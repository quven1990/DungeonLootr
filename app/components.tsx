import Link from 'next/link';
import type { ReactNode } from 'react';
import { classes, type SeoEntry } from './data';

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
      <p className="eyebrow">Next steps</p>
      <div className="card-grid four">
        {links.map(([label, href]) => (
          <Link className="intent-card" href={href} key={href}>
            <span>{label}</span>
            <p>Open the next high-intent page for this route.</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
