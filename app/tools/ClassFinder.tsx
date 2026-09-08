'use client';

import Link from '../native-link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { trackAnalyticsEvent } from '../analytics-events';
import type { ClassEntry } from '../data';
import { playUiSound, prefersReducedMotion } from '../ui-feedback';

const tiers = ['All', 'S', 'A', 'B', 'C', 'D'] as const;
const modes = ['All', 'Boss Rush', 'Dungeon clear', 'Solo', 'Burst', 'Survival', 'Mobility', 'Ranged clear', 'Endgame', 'Early progression'] as const;

export function ClassFinder({ classes }: { classes: ClassEntry[] }) {
  const [tier, setTier] = useState<(typeof tiers)[number]>('All');
  const [mode, setMode] = useState<(typeof modes)[number]>('All');
  const [query, setQuery] = useState('');
  const [pop, setPop] = useState(false);
  const analyticsReady = useRef(false);
  const popTimer = useRef<number | undefined>(undefined);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return classes.filter((item) => {
      if (tier !== 'All' && item.tier !== tier) return false;
      if (mode !== 'All' && item.mode !== mode) return false;
      if (!q) return true;
      return [item.name, item.rarity, item.obtain, item.mode, item.aspect].join(' ').toLowerCase().includes(q);
    });
  }, [classes, tier, mode, query]);

  function triggerFilterFeedback() {
    playUiSound('tap');
    if (prefersReducedMotion()) return;

    if (popTimer.current) window.clearTimeout(popTimer.current);
    setPop(true);
    popTimer.current = window.setTimeout(() => setPop(false), 280);
  }

  useEffect(
    () => () => {
      if (popTimer.current) window.clearTimeout(popTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!analyticsReady.current) {
      analyticsReady.current = true;
      return;
    }

    const timer = window.setTimeout(() => {
      trackAnalyticsEvent('class_finder_use', {
        tier,
        mode,
        has_query: query.trim().length > 0,
        result_count: filtered.length,
      });
    }, 700);

    return () => window.clearTimeout(timer);
  }, [filtered.length, mode, query, tier]);

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
          <select
            className={tier !== 'All' ? 'is-selected' : undefined}
            value={tier}
            onChange={(e) => {
              setTier(e.target.value as (typeof tiers)[number]);
              triggerFilterFeedback();
            }}
          >
            {tiers.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label>
          Mode
          <select
            className={mode !== 'All' ? 'is-selected' : undefined}
            value={mode}
            onChange={(e) => {
              setMode(e.target.value as (typeof modes)[number]);
              triggerFilterFeedback();
            }}
          >
            {modes.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>
      <p className={`codes-meta filter-count${pop ? ' is-pop' : ''}`}>{filtered.length} classes match.</p>
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
                <td>
                  <Link
                    href={`/classes/${item.slug}`}
                    onClick={() =>
                      trackAnalyticsEvent('class_result_open', {
                        class_slug: item.slug,
                        result_view: 'table',
                      })
                    }
                  >
                    {item.name}
                  </Link>
                </td>
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
          <Link
            className="class-card"
            href={`/classes/${item.slug}`}
            key={item.slug}
            onClick={() =>
              trackAnalyticsEvent('class_result_open', {
                class_slug: item.slug,
                result_view: 'card',
              })
            }
          >
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
