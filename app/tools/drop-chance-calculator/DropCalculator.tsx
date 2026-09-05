'use client';

import { useMemo, useState } from 'react';

function clampRate(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), 100);
}

function runsForTarget(rate: number, target: number) {
  const p = rate / 100;
  if (p <= 0) return Infinity;
  if (p >= 1) return 1;
  return Math.ceil(Math.log(1 - target) / Math.log(1 - p));
}

export default function DropCalculator() {
  const [rate, setRate] = useState(2);
  const [runs, setRuns] = useState(50);
  const [target, setTarget] = useState(0.9);

  const result = useMemo(() => {
    const cleanRate = clampRate(rate);
    const cleanRuns = Math.max(0, Math.floor(runs || 0));
    const p = cleanRate / 100;
    const chance = p <= 0 ? 0 : 1 - Math.pow(1 - p, cleanRuns);
    return {
      cleanRate,
      cleanRuns,
      chance,
      targetRuns: runsForTarget(cleanRate, target),
      halfRuns: runsForTarget(cleanRate, 0.5),
      highRuns: runsForTarget(cleanRate, 0.95),
    };
  }, [rate, runs, target]);

  return (
    <section className="calculator" aria-label="Dungeon Lootr drop chance calculator">
      <div className="field-grid">
        <label>
          Drop rate (%)
          <input
            min="0"
            max="100"
            step="0.1"
            type="number"
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
          />
        </label>
        <label>
          Runs
          <input
            min="0"
            step="1"
            type="number"
            value={runs}
            onChange={(event) => setRuns(Number(event.target.value))}
          />
        </label>
        <label>
          Target probability
          <select value={target} onChange={(event) => setTarget(Number(event.target.value))}>
            <option value={0.5}>50%</option>
            <option value={0.75}>75%</option>
            <option value={0.9}>90%</option>
            <option value={0.95}>95%</option>
            <option value={0.99}>99%</option>
          </select>
        </label>
      </div>
      <div className="result-grid" aria-live="polite">
        <div className="metric">
          <span>Chance after {result.cleanRuns} runs</span>
          <strong>{(result.chance * 100).toFixed(1)}%</strong>
        </div>
        <div className="metric">
          <span>Runs for selected target</span>
          <strong>{Number.isFinite(result.targetRuns) ? result.targetRuns : 'N/A'}</strong>
        </div>
        <div className="metric">
          <span>Runs for 50%</span>
          <strong>{Number.isFinite(result.halfRuns) ? result.halfRuns : 'N/A'}</strong>
        </div>
        <div className="metric">
          <span>Runs for 95%</span>
          <strong>{Number.isFinite(result.highRuns) ? result.highRuns : 'N/A'}</strong>
        </div>
      </div>
      <p>
        Formula: P(at least once) = 1 - (1 - p)^n. This estimates probability across independent runs; it does not prove pity systems or hidden conditions.
      </p>
    </section>
  );
}
