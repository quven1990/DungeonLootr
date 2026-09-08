'use client';

export type AnalyticsEventName =
  | 'code_copy'
  | 'code_copy_error'
  | 'video_play'
  | 'video_open_youtube'
  | 'calculator_use'
  | 'class_finder_use'
  | 'class_result_open'
  | 'aspect_matcher_use'
  | 'aspect_result_open';

type AnalyticsValue = string | number | boolean;
export type AnalyticsProperties = Record<string, AnalyticsValue | null | undefined>;

type PlausibleFunction = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: PlausibleFunction;
    clarity?: (...args: unknown[]) => void;
  }
}

function cleanProperties(properties: AnalyticsProperties) {
  const entries = Object.entries(properties)
    .filter((entry): entry is [string, AnalyticsValue] => entry[1] !== undefined && entry[1] !== null)
    .map(([key, value]) => [key, typeof value === 'string' ? value.slice(0, 100) : value] as const);

  return Object.fromEntries(entries) as Record<string, AnalyticsValue>;
}

function plausibleQueue() {
  if (window.plausible) return window.plausible;

  const queued: PlausibleFunction = (...args: unknown[]) => {
    queued.q = queued.q || [];
    queued.q.push(args);
  };
  window.plausible = queued;
  return queued;
}

/**
 * Send the same privacy-safe interaction event to all configured analytics tools.
 * Properties must be low-cardinality enums, slugs, booleans, buckets, or counts.
 */
export function trackAnalyticsEvent(name: AnalyticsEventName, properties: AnalyticsProperties = {}) {
  if (typeof window === 'undefined') return;

  const clean = cleanProperties({
    ...properties,
    page_path: window.location.pathname,
  });

  if (window.gtag) {
    window.gtag('event', name, clean);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(['event', name, clean]);
  }

  plausibleQueue()(name, { props: clean });
  window.clarity?.('event', name);
}
