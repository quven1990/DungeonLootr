import type { ClassEntry, GuideEntry } from './data';
import { classes, guideBySlug, isIndexableClass } from './data';

export type RelatedLink = [string, string, string?];

function dedupe(links: RelatedLink[], exclude: string[] = []) {
  const seen = new Set(exclude);
  const out: RelatedLink[] = [];
  for (const link of links) {
    const href = link[1];
    if (!href || seen.has(href)) continue;
    seen.add(href);
    out.push(link);
  }
  return out;
}

/** Same-tier / same-mode alternatives for a class page. */
export function relatedClassLinks(current: ClassEntry, limit = 4): RelatedLink[] {
  const pool = classes.filter((item) => item.slug !== current.slug && isIndexableClass(item));
  const scored = pool
    .map((item) => {
      let score = 0;
      if (item.tier === current.tier) score += 3;
      if (item.mode === current.mode) score += 2;
      if (item.rarity === current.rarity) score += 1;
      return { item, score };
    })
    .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));

  return scored.slice(0, limit).map(({ item }) => [`${item.name} (${item.tier})`, `/classes/${item.slug}`]);
}

export function classIntentNextSteps(item: ClassEntry): RelatedLink[] {
  const unlock = guideBySlug(`how-to-get-${item.slug}`);
  const compare =
    item.slug === 'cursed-king'
      ? (['Compare Cursed King vs Sinister Trigger →', '/comparisons/cursed-king-vs-sinister-trigger', 'Mode verdict before you pick one chase.'] as RelatedLink)
      : item.slug === 'honored-one'
        ? (['Compare Honored One vs Unrestricted →', '/comparisons/honored-one-vs-unrestricted', 'See whether to stop at Honored One or push the checklist.'] as RelatedLink)
        : null;

  return dedupe(
    [
      unlock
        ? ([`Still farming? Fastest ${item.name} unlock →`, `/guides/${unlock.slug}`, 'Requirements, Floor 40 / Forge path, and common mistakes.'] as RelatedLink)
        : null,
      [`Already unlocked? Best ${item.name} build →`, `/builds/${item.slug}`, 'Stats, Aspect, gear focus, and mode setup.'],
      compare,
      ['Estimate your farm with the calculator →', '/tools/drop-chance-calculator', 'Runs needed for 50% / 90% / 95% / 99%.'],
    ].filter(Boolean) as RelatedLink[],
    [`/classes/${item.slug}`],
  ).slice(0, 4);
}

export function classClusterLinks(item: ClassEntry): RelatedLink[] {
  const unlock = guideBySlug(`how-to-get-${item.slug}`);
  return dedupe(
    [
      [`Best ${item.name} build →`, `/builds/${item.slug}`],
      unlock ? [`How to get ${item.name} →`, `/guides/${unlock.slug}`] : null,
      ['Class tier list', '/class-tier-list'],
      ['Boss Rush guide', '/boss-rush'],
      ['Drop rates', '/drop-rates'],
      ['Drop chance calculator', '/tools/drop-chance-calculator'],
    ].filter(Boolean) as RelatedLink[],
    [`/classes/${item.slug}`],
  ).slice(0, 6);
}

export function buildIntentNextSteps(item: ClassEntry): RelatedLink[] {
  const unlock = guideBySlug(`how-to-get-${item.slug}`);
  return dedupe(
    [
      [`Need ${item.name} first? Unlock route →`, unlock ? `/guides/${unlock.slug}` : '/classes', 'Requirements and fastest farm before you copy a build.'],
      ['Not sure it is worth the grind? Tier list →', '/class-tier-list', 'Compare this class against current S/A options.'],
      ['Best Aspect by class →', '/guides/best-aspect-by-class', 'Confirm Aspect direction for your clear goal.'],
      ['Still missing drops? Calculate runs →', '/tools/drop-chance-calculator', 'Convert a drop rate into expected attempts.'],
    ].filter(Boolean) as RelatedLink[],
    [`/builds/${item.slug}`],
  ).slice(0, 4);
}

export function buildClusterLinks(item: ClassEntry): RelatedLink[] {
  const unlock = guideBySlug(`how-to-get-${item.slug}`);
  return dedupe(
    [
      [`${item.name} class overview →`, `/classes/${item.slug}`],
      unlock ? [`Unlock ${item.name} →`, `/guides/${unlock.slug}`] : null,
      ['Best Aspects by class', '/guides/best-aspect-by-class'],
      ['Aspect matcher', '/tools/aspect-matcher'],
      ['Class tier list', '/class-tier-list'],
      ['Boss Rush guide', '/boss-rush'],
    ].filter(Boolean) as RelatedLink[],
    [`/builds/${item.slug}`],
  ).slice(0, 6);
}

export function guideIntentNextSteps(guide: GuideEntry): RelatedLink[] {
  const classSlug = guide.slug.replace(/^how-to-get-/, '');
  const classPage = classes.find((item) => item.slug === classSlug);
  return dedupe(
    [
      classPage
        ? ([`Got ${classPage.name}? Build it next →`, `/builds/${classPage.slug}`, 'Stats, Aspect, gear, and rotation for after unlock.'] as RelatedLink)
        : null,
      ['Still farming? Estimate your runs →', '/tools/drop-chance-calculator', 'Convert the drop rate into 90%/95% targets.'],
      classPage
        ? ([`${classPage.name} class overview →`, `/classes/${classPage.slug}`, 'Rarity, strengths, weaknesses, and best mode.'] as RelatedLink)
        : null,
      ...guide.next
        .filter((href) => !href.includes('/tools/drop-chance') && !(classPage && href === `/builds/${classPage.slug}`))
        .slice(0, 1)
        .map((href): RelatedLink => [href.includes('/boss-rush') ? 'Boss Rush breakpoints →' : 'Next farm route →', href]),
    ].filter(Boolean) as RelatedLink[],
    [`/guides/${guide.slug}`],
  ).slice(0, 4);
}

export function guideClusterLinks(guide: GuideEntry): RelatedLink[] {
  const classSlug = guide.slug.replace(/^how-to-get-/, '');
  const classPage = classes.find((item) => item.slug === classSlug);

  return dedupe(
    [
      classPage ? [`${classPage.name} class page`, `/classes/${classPage.slug}`] : null,
      classPage ? [`${classPage.name} build`, `/builds/${classPage.slug}`] : null,
      ...guide.next.map((href): RelatedLink => [
        href.includes('/tools') ? 'Drop calculator' : href.includes('/boss-rush') ? 'Boss Rush route' : 'Next route',
        href,
      ]),
      ['Boss Rush guide', '/boss-rush'],
      ['Drop rates', '/drop-rates'],
      ['Class tier list', '/class-tier-list'],
    ].filter(Boolean) as RelatedLink[],
    [`/guides/${guide.slug}`],
  ).slice(0, 6);
}

export function hubClusterLinks(current?: string): RelatedLink[] {
  return dedupe(
    [
      ['Working codes', '/codes'],
      ['Update log', '/updatelog'],
      ['Class directory', '/classes'],
      ['Class tier list', '/class-tier-list'],
      ['Boss Rush guide', '/boss-rush'],
      ['Drop rates', '/drop-rates'],
      ['Drop chance calculator', '/tools/drop-chance-calculator'],
      ['Class finder', '/tools/class-finder'],
      ['Aspect matcher', '/tools/aspect-matcher'],
      ['Builds hub', '/builds'],
      ['Aspects hub', '/aspects'],
    ],
    current ? [current] : [],
  ).slice(0, 6);
}

export function bossRushClusterLinks(current?: string): RelatedLink[] {
  return dedupe(
    [
      ['Boss Rush hub', '/boss-rush'],
      ['Floor 40 Class Items', '/boss-rush/floor-40'],
      ['Floor 100 fragments', '/boss-rush/floor-100'],
      ['Boss Rush drops', '/boss-rush/drops'],
      ['Cursed King unlock', '/guides/how-to-get-cursed-king'],
      ['Honored One unlock', '/guides/how-to-get-honored-one'],
      ['Class tier list', '/class-tier-list'],
      ['Drop chance calculator', '/tools/drop-chance-calculator'],
      ['Drop rates', '/drop-rates'],
      ['Working codes', '/codes'],
    ],
    current ? [current] : [],
  ).slice(0, 6);
}
