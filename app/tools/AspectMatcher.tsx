'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { ClassEntry } from '../data';

const goals = [
  { id: 'Boss Rush', label: 'Boss Rush push' },
  { id: 'Dungeon clear', label: 'Fast dungeon clears' },
  { id: 'Solo', label: 'Solo consistency' },
  { id: 'Burst', label: 'Burst windows' },
  { id: 'Survival', label: 'Survival first' },
] as const;

export function AspectMatcher({ classes }: { classes: ClassEntry[] }) {
  const [goal, setGoal] = useState<(typeof goals)[number]['id']>('Boss Rush');
  const matches = useMemo(
    () => classes.filter((item) => item.mode === goal || (goal === 'Dungeon clear' && item.mode.includes('clear'))).slice(0, 8),
    [classes, goal],
  );

  return (
    <section className="content-panel">
      <h2>Match Aspect direction by goal</h2>
      <div className="finder-controls">
        <label>
          Your goal
          <select value={goal} onChange={(e) => setGoal(e.target.value as (typeof goals)[number]['id'])}>
            {goals.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
      </div>
      <ul className="check-list">
        {matches.map((item) => (
          <li key={item.slug}>
            <Link href={`/classes/${item.slug}/`}>{item.name}</Link>
            {' — '}
            start with <strong>{item.aspect}</strong> for {item.mode.toLowerCase()}.
          </li>
        ))}
      </ul>
      <p className="codes-meta">If clears fail before damage matters, swap to a survival/uptime Aspect even on burst classes.</p>
    </section>
  );
}
