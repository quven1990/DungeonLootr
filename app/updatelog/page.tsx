import Link from '../native-link';
import { updateLog } from '../data';
import { pageMetadata } from '../seo';

export const metadata = pageMetadata(
  {
    title: 'Dungeon Lootr Wiki Update Log - Codes, Builds & Data Changes',
    description:
      'Track what changed on Dungeon Lootr Wiki: new codes, expired codes, build updates, and data refreshes with dates.',
    intent: 'freshness',
    primaryKeyword: 'Dungeon Lootr wiki update log',
    searchIntent: 'freshness',
  },
  '/updatelog',
);

export default function UpdateLogPage() {
  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Update Log</p>
        <h1>Dungeon Lootr Wiki Update Log</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>
            This page lists the latest verified changes on the wiki: new codes, expired codes, build publishing, and
            sitemap refreshes.
          </p>
          <div className="hero-actions">
            <Link href="/codes">Working Codes</Link>
            <Link className="secondary" href="/class-tier-list">
              Tier List
            </Link>
          </div>
        </div>
      </section>
      <section className="site-shell article-stack">
        {updateLog.map((entry) => (
          <section className="content-panel" key={`${entry.date}-${entry.title}`}>
            <p className="codes-meta">
              {entry.date} · {entry.title}
            </p>
            <h2>{entry.title}</h2>
            <p>{entry.summary}</p>
            <ul className="check-list">
              {entry.changes.map((change) => (
                <li key={change}>{change}</li>
              ))}
            </ul>
            {entry.hrefs?.length ? (
              <p>
                {entry.hrefs.map(([label, href], index) => (
                  <span key={href}>
                    {index > 0 ? ' · ' : null}
                    <Link href={href}>{label}</Link>
                  </span>
                ))}
              </p>
            ) : null}
          </section>
        ))}
      </section>
    </main>
  );
}
