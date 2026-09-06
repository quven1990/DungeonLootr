'use client';

import Link from '../native-link';
import { useMemo, useState } from 'react';
import type { ClassEntry } from '../data';

const tiers = ['All', 'S', 'A', 'B', 'C', 'D'] as const;
const modes = ['All', 'Boss Rush', 'Dungeon clear', 'Solo', 'Burst', 'Survival', 'Mobility', 'Ranged clear', 'Endgame', 'Early progression'] as const;

export function ClassFinder({ classes }: { classes: ClassEntry[] }) {
  const [tier, setTier] = useState<(typeof tiers)[number]>('All');
  const [mode, setMode] = useState<(typeof modes)[number]>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return classes.filter((item) => {
      if (tier !== 'All' && item.tier !== tier) return false;
      if (mode !== 'All' && item.mode !== mode) return false;
      if (!q) return true;
      return [item.name, item.rarity, item.obtain, item.mode, item.aspect].join(' ').toLowerCase().includes(q);
    });
  }, [classes, tier, mode, query]);

  return (
    <section className="content-panel">
      <h2>Filter classes</h2>
      <div className="finder-controls">
        <label>
          Search
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cursed King, Forge, fragments..." />
        </label>
        <label>
          Tier
          <select value={tier} onChange={(e) => setTier(e.target.value as (typeof tiers)[number])}>
            {tiers.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label>
          Mode
          <select value={mode} onChange={(e) => setMode(e.target.value as (typeof modes)[number])}>
            {modes.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>
      <p className="codes-meta">{filtered.length} classes match.</p>
      <div className="table-wrap desktop-table">
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Tier</th>
              <th>Rarity</th>
              <th>Mode</th>
              <th>Unlock</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.slug}>
                <td><Link href={`/classes/${item.slug}`}>{item.name}</Link></td>
                <td>{item.tier}</td>
                <td><span className="rarity">{item.rarity}</span></td>
                <td>{item.mode}</td>
                <td>{item.obtain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="class-card-list mobile-cards" aria-label="Filtered class list">
        {filtered.map((item) => (
          <Link className="class-card" href={`/classes/${item.slug}`} key={item.slug}>
            <div className="class-card-top">
              <strong>{item.name}</strong>
              <span className="rarity">{item.tier} · {item.rarity}</span>
            </div>
            <div className="class-card-meta">
              <span>Best mode: {item.mode}</span>
              <span>Unlock: {item.obtain}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
