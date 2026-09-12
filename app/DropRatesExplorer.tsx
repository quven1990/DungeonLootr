'use client';

import { useMemo, useState } from 'react';
import Link from './native-link';
import type { DropRateEntry } from './data';

export function DropRatesExplorer({ rows }: { rows: DropRateEntry[] }) {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('all');
  const [sort, setSort] = useState<'item' | 'source' | 'rate'>('item');

  const sources = useMemo(
    () => Array.from(new Set(rows.map((row) => row.source))).sort((a, b) => a.localeCompare(b)),
    [rows],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter((row) => {
      if (source !== 'all' && row.source !== source) return false;
      if (!q) return true;
      const hay = [row.item, row.source, row.location, row.difficulty, row.rate, row.usedFor, row.note]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
    return [...list].sort((a, b) => a[sort].localeCompare(b[sort]));
  }, [query, rows, sort, source]);

  return (
    <section className="content-panel">
      <h2>Drop tracking table</h2>
      <p>
        Community-checked rates only. Exact official numbers are not published for every source. Unknown means
        unverified — not an estimate.
      </p>
      <div className="drop-filters" style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Search item / source</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. Sukuna, Glaive, Spell Breaker"
            aria-label="Search drop rates"
          />
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Source</span>
            <select value={source} onChange={(event) => setSource(event.target.value)} aria-label="Filter by source">
              <option value="all">All sources</option>
              {sources.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Sort</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as 'item' | 'source' | 'rate')}
              aria-label="Sort drop rates"
            >
              <option value="item">Item</option>
              <option value="source">Source</option>
              <option value="rate">Rate</option>
            </select>
          </label>
        </div>
      </div>
      <div className="table-wrap desktop-table">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Source</th>
              <th>Boss / Dungeon</th>
              <th>Difficulty</th>
              <th>Drop Rate</th>
              <th>Used For</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.item}>
                <td>
                  <Link href={row.href}>{row.item}</Link>
                </td>
                <td>{row.source}</td>
                <td>{row.location ?? '—'}</td>
                <td>{row.difficulty ?? '—'}</td>
                <td>{row.rate}</td>
                <td>{row.usedFor ?? row.note}</td>
                <td>{row.verified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="class-card-list mobile-cards" aria-label="Drop rates">
        {filtered.map((row) => (
          <Link className="class-card" href={row.href} key={row.item}>
            <div className="class-card-top">
              <strong>{row.item}</strong>
              <span className="status-pill">{row.rate}</span>
            </div>
            <div className="class-card-meta">
              <span>
                {row.source}
                {row.location ? ` · ${row.location}` : ''}
              </span>
              <span>{row.usedFor ?? row.note}</span>
              <span>Verified: {row.verified}</span>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 ? <p>No rows match this filter.</p> : null}
    </section>
  );
}
