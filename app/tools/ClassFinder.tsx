'use client';

import Link from '../native-link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { trackAnalyticsEvent } from '../analytics-events';
import type { ClassEntry, ObtainGroup } from '../data';
import { hasClassPage, isUpdate1Class, obtainGroupOf } from '../data';
import { playUiSound, prefersReducedMotion } from '../ui-feedback';

const rarities = ['All', 'Exotic', 'Secret', 'Celestial', 'Mythic', 'Legendary', 'Epic', 'Rare'] as const;
const modes = [
  'All',
  'Boss Rush',
  'Dungeon clear',
  'Solo',
  'Burst',
  'Survival',
  'Mobility',
  'Ranged clear',
  'Ranged / magic',
  'Melee',
  'Magic',
  'Endgame',
  'Early progression',
] as const;
const unlocks = ['All', 'Class roll', 'Boss Rush / Forge', 'Checklist / quest', 'UPDATE 1', 'Unconfirmed'] as const;

function unlockMatches(item: ClassEntry, unlock: (typeof unlocks)[number]) {
  if (unlock === 'All') return true;
  const group: ObtainGroup = obtainGroupOf(item);
  if (unlock === 'Class roll') return group === 'spin';
  if (unlock === 'Boss Rush / Forge') return group === 'boss-rush';
  if (unlock === 'Checklist / quest') return group === 'checklist' || group === 'quest' || group === 'dungeon-drop';
  if (unlock === 'UPDATE 1') return group === 'update-1';
  return group === 'unknown';
}

function rarityMatches(item: ClassEntry, rarity: (typeof rarities)[number]) {
  if (rarity === 'All') return true;
  return item.rarity === rarity;
}

export function ClassFinder({
  classes,
  heading = 'Filter classes',
}: {
  classes: ClassEntry[];
  heading?: string;
}) {
  const [tier, setTier] = useState<'All' | 'S' | 'A' | 'B' | 'C' | 'D' | 'Unrated'>('All');
  const [mode, setMode] = useState<(typeof modes)[number]>('All');
  const [rarity, setRarity] = useState<(typeof rarities)[number]>('All');
  const [unlock, setUnlock] = useState<(typeof unlocks)[number]>('All');
  const [query, setQuery] = useState('');
  const [pop, setPop] = useState(false);
  const analyticsReady = useRef(false);
  const popTimer = useRef<number | undefined>(undefined);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return classes.filter((item) => {
      if (tier !== 'All' && item.tier !== tier) return false;
      if (mode !== 'All' && item.mode !== mode) return false;
      if (!rarityMatches(item, rarity)) return false;
      if (!unlockMatches(item, unlock)) return false;
      if (!q) return true;
      return [item.name, item.rarity, item.obtain, item.mode, item.aspect, item.bestFor ?? '']
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [classes, mode, query, rarity, tier, unlock]);

  const recommendation = useMemo(() => {
    return filtered.find(
      (item) => hasClassPage(item) && !isUpdate1Class(item) && item.tier !== 'Unrated' && item.confidence !== 'unverified',
    );
  }, [filtered]);

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
      <h2>{heading}</h2>
      <div className="finder-controls finder-controls-wide">
        <label>
          Search class
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Spell Breaker, Forge, Exotic..." />
        </label>
        <label>
          Rarity
          <select
            className={rarity !== 'All' ? 'is-selected' : undefined}
            value={rarity}
            onChange={(e) => {
              setRarity(e.target.value as (typeof rarities)[number]);
              triggerFilterFeedback();
            }}
          >
            {rarities.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label>
          Play style
          <select
            className={mode !== 'All' ? 'is-selected' : undefined}
            value={mode}
            onChange={(e) => {
              setMode(e.target.value as (typeof modes)[number]);
              triggerFilterFeedback();
            }}
          >
            {modes.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label>
          How to get
          <select
            className={unlock !== 'All' ? 'is-selected' : undefined}
            value={unlock}
            onChange={(e) => {
              setUnlock(e.target.value as (typeof unlocks)[number]);
              triggerFilterFeedback();
            }}
          >
            {unlocks.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ranked tier
          <select
            className={tier !== 'All' ? 'is-selected' : undefined}
            value={tier}
            onChange={(e) => {
              setTier(e.target.value as typeof tier);
              triggerFilterFeedback();
            }}
          >
            {['All', 'S', 'A', 'B', 'C', 'D', 'Unrated'].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className={`codes-meta filter-count${pop ? ' is-pop' : ''}`}>{filtered.length} classes match.</p>
      {recommendation ? (
        <p className="codes-meta">
          Suggested from current filters:{' '}
          <Link
            href={`/classes/${recommendation.slug}`}
            onClick={() =>
              trackAnalyticsEvent('class_result_open', {
                class_slug: recommendation.slug,
                result_view: 'recommend',
              })
            }
          >
            {recommendation.name}
          </Link>
          {' — '}
          {recommendation.obtain}. UPDATE 1 names are listed below when they match, but they are not auto-recommended
          until unlock data is confirmed.
        </p>
      ) : null}
      <div className="table-wrap desktop-table">
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Rarity</th>
              <th>How to Get</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.slug}>
                <td>
                  {hasClassPage(item) ? (
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
                  ) : (
                    item.name
                  )}
                  {isUpdate1Class(item) ? <span className="status-pill">UPDATE 1</span> : null}
                </td>
                <td>
                  <span className="rarity">{item.rarity}</span>
                </td>
                <td>{item.obtain}</td>
                <td>{item.bestFor ?? item.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="class-card-list mobile-cards" aria-label="Filtered class list">
        {filtered.map((item) => {
          const body = (
            <>
              <div className="class-card-top">
                <strong>{item.name}</strong>
                <span className="rarity">
                  {item.rarity}
                  {isUpdate1Class(item) ? ' · UPDATE 1' : ''}
                </span>
              </div>
              <div className="class-card-meta">
                <span>How to get: {item.obtain}</span>
                <span>Best for: {item.bestFor ?? item.mode}</span>
              </div>
            </>
          );
          if (!hasClassPage(item)) {
            return (
              <article className="class-card" key={item.slug}>
                {body}
              </article>
            );
          }
          return (
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
              {body}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
