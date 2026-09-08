'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { trackAnalyticsEvent } from '../../analytics-events';
import { playUiSound, prefersReducedMotion } from '../../ui-feedback';

function parseRate(raw: string) {
  const value = Number(raw);
  if (!Number.isFinite(value)) return { ok: false as const, error: 'Enter a number for drop rate (%).' };
  if (value < 0 || value > 100) return { ok: false as const, error: 'Drop rate must be between 0 and 100.' };
  return { ok: true as const, value };
}

function parseRuns(raw: string) {
  const value = Number(raw);
  if (!Number.isFinite(value)) return { ok: false as const, error: 'Enter a number for attempts.' };
  if (value < 0) return { ok: false as const, error: 'Attempts cannot be negative.' };
  if (!Number.isInteger(value)) return { ok: false as const, error: 'Attempts must be a whole number.' };
  return { ok: true as const, value };
}

function chanceAfterRuns(p: number, n: number) {
  if (n <= 0) return 0;
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  return 1 - Math.pow(1 - p, n);
}

function expectedAttempts(p: number) {
  if (p <= 0) return Infinity;
  if (p >= 1) return 1;
  return 1 / p;
}

function runsForTarget(p: number, q: number) {
  if (q <= 0) return 0;
  if (q >= 1) {
    if (p <= 0) return Infinity;
    if (p >= 1) return 1;
    return Infinity; // no finite guarantee for 0 < p < 1
  }
  if (p <= 0) return Infinity;
  if (p >= 1) return 1;
  return Math.ceil(Math.log(1 - q) / Math.log(1 - p));
}

function formatAttempts(value: number) {
  if (!Number.isFinite(value)) return 'No finite guarantee';
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(1);
}

function rateBucket(rate: number) {
  if (rate === 0) return '0';
  if (rate <= 1) return '0.1-1';
  if (rate <= 5) return '1.1-5';
  if (rate <= 20) return '5.1-20';
  if (rate < 100) return '20.1-99.9';
  return '100';
}

function attemptsBucket(attempts: number) {
  if (attempts <= 10) return '0-10';
  if (attempts <= 50) return '11-50';
  if (attempts <= 100) return '51-100';
  if (attempts <= 500) return '101-500';
  return '501+';
}

export default function DropCalculator() {
  const [rateRaw, setRateRaw] = useState('2');
  const [runsRaw, setRunsRaw] = useState('50');
  const [target, setTarget] = useState(0.9);
  const [flash, setFlash] = useState(false);
  const analyticsReady = useRef(false);
  const flashTimer = useRef<number | undefined>(undefined);

  const parsed = useMemo(() => {
    const rate = parseRate(rateRaw);
    const runs = parseRuns(runsRaw);
    if (!rate.ok || !runs.ok) {
      return { ok: false as const, error: !rate.ok ? rate.error : runs.error };
    }
    const p = rate.value / 100;
    const n = runs.value;
    return {
      ok: true as const,
      ratePct: rate.value,
      p,
      n,
      chance: chanceAfterRuns(p, n),
      expected: expectedAttempts(p),
      targetRuns: runsForTarget(p, target),
      halfRuns: runsForTarget(p, 0.5),
      highRuns: runsForTarget(p, 0.95),
    };
  }, [rateRaw, runsRaw, target]);

  function triggerInputFeedback(valid: boolean) {
    playUiSound('tap');
    if (!valid || prefersReducedMotion()) return;

    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    setFlash(true);
    flashTimer.current = window.setTimeout(() => setFlash(false), 320);
  }

  useEffect(
    () => () => {
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!analyticsReady.current) {
      analyticsReady.current = true;
      return;
    }
    if (!parsed.ok) return;

    const timer = window.setTimeout(() => {
      trackAnalyticsEvent('calculator_use', {
        rate_bucket: rateBucket(parsed.ratePct),
        attempts_bucket: attemptsBucket(parsed.n),
        target_percent: Math.round(target * 100),
      });
    }, 700);

    return () => window.clearTimeout(timer);
  }, [parsed, target]);

  return (
    <section className="calculator" aria-label="Dungeon Lootr drop chance calculator">
      <div className="field-grid">
        <label>
          Drop rate per attempt (%)
          <input
            min="0"
            max="100"
            step="0.1"
            type="number"
            inputMode="decimal"
            value={rateRaw}
            onChange={(event) => {
              const nextRate = event.target.value;
              setRateRaw(nextRate);
              triggerInputFeedback(parseRate(nextRate).ok && parseRuns(runsRaw).ok);
            }}
          />
        </label>
        <label>
          Attempts (n)
          <input
            min="0"
            step="1"
            type="number"
            inputMode="numeric"
            value={runsRaw}
            onChange={(event) => {
              const nextRuns = event.target.value;
              setRunsRaw(nextRuns);
              triggerInputFeedback(parseRate(rateRaw).ok && parseRuns(nextRuns).ok);
            }}
          />
        </label>
        <label>
          Target probability (q)
          <select
            value={target}
            onChange={(event) => {
              setTarget(Number(event.target.value));
              triggerInputFeedback(parseRate(rateRaw).ok && parseRuns(runsRaw).ok);
            }}
          >
            <option value={0.5}>50%</option>
            <option value={0.75}>75%</option>
            <option value={0.9}>90%</option>
            <option value={0.95}>95%</option>
            <option value={0.99}>99%</option>
            <option value={1}>100% (finite only if p = 100%)</option>
          </select>
        </label>
      </div>

      {!parsed.ok ? (
        <p className="calculator-error" role="alert">{parsed.error}</p>
      ) : (
        <div className={`result-grid${flash ? ' is-flashing' : ''}`} aria-live="polite">
          <div className="metric">
            <span>Chance of at least one success in {parsed.n} attempts</span>
            <strong>{(parsed.chance * 100).toFixed(1)}%</strong>
          </div>
          <div className="metric">
            <span>Expected attempts to first success (1/p)</span>
            <strong>{formatAttempts(parsed.expected)}</strong>
          </div>
          <div className="metric">
            <span>Attempts for selected target q</span>
            <strong>{formatAttempts(parsed.targetRuns)}</strong>
          </div>
          <div className="metric">
            <span>Attempts for 50% / 95%</span>
            <strong>
              {formatAttempts(parsed.halfRuns)} / {formatAttempts(parsed.highRuns)}
            </strong>
          </div>
        </div>
      )}

      <p>
        Formula (independent attempts, constant probability p): P(at least once in n) = 1 − (1 − p)^n.
        Expected wait for the first success = 1/p. Attempts for target q = ceil(log(1 − q) / log(1 − p)).
      </p>
      <p>
        One attempt means one independent roll at rate p. If a clear has multiple drop chances, do not treat one clear as one attempt unless you are sure those rolls collapse to a single p.
        Default 2% is only an example input — not a claim about any Dungeon Lootr drop. This model ignores pity and luck buffs unless you fold them into p yourself.
      </p>
    </section>
  );
}
