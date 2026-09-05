export type SeoEntry = {
  url: string;
  title: string;
  description: string;
  opening: string;
  h1: string;
  type: 'hub' | 'database' | 'tier' | 'entity' | 'howto' | 'build' | 'tool' | 'guide';
};

export const seoEntries: SeoEntry[] = [
  {
    url: '/classes/',
    title: 'Dungeon Lootr Classes - All Classes, Rarities & How to Unlock Them',
    description: 'Browse Dungeon Lootr classes by rarity and unlock method, including Boss Rush drops, Forge routes, strengths, builds, and current patch notes.',
    opening: 'Dungeon Lootr has 30+ classes, ranging from spin classes to Boss Rush and Forge unlocks, and each one has a different progression route.',
    h1: 'Dungeon Lootr Classes: All Classes, Rarities & How to Unlock Them',
    type: 'database',
  },
  {
    url: '/class-tier-list/',
    title: 'Dungeon Lootr Class Tier List - Best Classes After the Latest Update',
    description: 'See the best Dungeon Lootr classes ranked for Boss Rush, dungeon clearing, mobility, and endgame value, with patch-aware recommendations.',
    opening: 'The best Dungeon Lootr class depends on your mode, but the current endgame meta favors a small group of high-output classes for Boss Rush and fast clears.',
    h1: 'Dungeon Lootr Class Tier List',
    type: 'tier',
  },
  {
    url: '/boss-rush/',
    title: 'Dungeon Lootr Boss Rush Guide - Floors, Class Drops, Fragments & Builds',
    description: 'See the important Boss Rush floors, class drops, fragment rewards, farming routes, and the best classes for pushing deeper.',
    opening: 'Boss Rush is one of Dungeon Lootr’s most important endgame systems because key classes and fragments are tied to specific floor milestones.',
    h1: 'Dungeon Lootr Boss Rush Guide',
    type: 'hub',
  },
  {
    url: '/drop-rates/',
    title: 'Dungeon Lootr Drop Rates - Boss, Class Item & Fragment Chances',
    description: 'Check Dungeon Lootr drop rates for boss loot, class items, fragments, and rare materials, with last-checked patch dates and farming notes.',
    opening: 'Dungeon Lootr drop rates vary by boss, dungeon, difficulty, and reward condition, so the best farming route depends on exactly what you are chasing.',
    h1: 'Dungeon Lootr Drop Rates',
    type: 'database',
  },
  {
    url: '/tools/drop-chance-calculator/',
    title: 'Dungeon Lootr Drop Chance Calculator - Estimate Runs for Any Drop Rate',
    description: 'Enter a Dungeon Lootr drop rate and see your chance after any number of runs, plus how many attempts you need for 50%, 90%, 95%, or 99%.',
    opening: 'Use this Dungeon Lootr drop calculator to estimate how many runs you need for a rare item instead of guessing from a single drop-rate percentage.',
    h1: 'Dungeon Lootr Drop Chance Calculator',
    type: 'tool',
  },
];

export const classes = [
  {
    slug: 'cursed-king',
    name: 'Cursed King',
    rarity: 'Mythic',
    obtain: 'Boss Rush route or Cursed Shrine Forge path',
    mode: 'Boss Rush',
    aspect: 'Burst or sustain Aspect',
    confidence: 'probable',
    opening: 'Cursed King is one of Dungeon Lootr’s strongest late-game classes, and the fastest route is through Boss Rush or the Cursed Shrine Forge path.',
    strengths: ['High late-game ceiling', 'Strong Boss Rush value', 'Good investment target'],
    weaknesses: ['Unlock path can be grind-heavy', 'Needs supporting stats to feel consistent'],
  },
  {
    slug: 'sinister-trigger',
    name: 'Sinister Trigger',
    rarity: 'Mythic',
    obtain: 'Late-game damage route',
    mode: 'Dungeon clear',
    aspect: 'Damage uptime Aspect',
    confidence: 'probable',
    opening: 'Sinister Trigger is a top damage-focused Dungeon Lootr class that shines when you build around its burst windows and fast clear potential.',
    strengths: ['Fast clear pressure', 'Excellent burst windows', 'Flexible damage builds'],
    weaknesses: ['Punishes missed rotations', 'Less forgiving while underbuilt'],
  },
  {
    slug: 'honored-one',
    name: 'Honored One',
    rarity: 'Mythic',
    obtain: 'Prerequisite progression chain',
    mode: 'Solo',
    aspect: 'Control or damage Aspect',
    confidence: 'probable',
    opening: 'Honored One is a key late-game Dungeon Lootr class and an important progression step for players chasing stronger unlock chains such as Unrestricted.',
    strengths: ['Important unlock bridge', 'Strong solo utility', 'Good scaling path'],
    weaknesses: ['Route depends on prior progress', 'Can lag behind top burst classes'],
  },
  {
    slug: 'unrestricted',
    name: 'Unrestricted',
    rarity: 'Secret',
    obtain: 'Prerequisite class, fragments, and currency',
    mode: 'Endgame',
    aspect: 'Endgame damage Aspect',
    confidence: 'unverified',
    opening: 'To unlock Unrestricted, you first need the correct prerequisite progression, then complete its level, fragment, and currency requirements.',
    strengths: ['Endgame chase value', 'High scaling potential', 'Strong prestige target'],
    weaknesses: ['Requires multiple resources', 'Needs verification after patches'],
  },
  {
    slug: 'awakened-devil-ex',
    name: 'Awakened Devil EX',
    rarity: 'Secret',
    obtain: 'Rare material path',
    mode: 'Burst',
    aspect: 'Burst amplification Aspect',
    confidence: 'unverified',
    opening: 'Awakened Devil EX is a late-game chase class where the route should be planned around rare materials, boss farming, and current patch requirements.',
    strengths: ['High burst identity', 'Strong chase-class appeal', 'Pairs well with damage Aspects'],
    weaknesses: ['Rare material pressure', 'Exact requirements need patch checks'],
  },
];

export const guides = [
  {
    slug: 'how-to-get-cursed-king',
    target: 'Cursed King',
    title: 'How to Get Cursed King in Dungeon Lootr',
    opening: 'The fastest way to get Cursed King is to target its Boss Rush route first, then use the Forge route as your deterministic backup.',
    requirements: ['Confirm current Boss Rush floor access', 'Track Cursed Shrine or Forge materials', 'Prepare a class that can clear consistently'],
    next: ['/builds/cursed-king/', '/tools/drop-chance-calculator/'],
  },
  {
    slug: 'how-to-get-honored-one',
    target: 'Honored One',
    title: 'How to Get Honored One in Dungeon Lootr',
    opening: 'Honored One is best approached as a prerequisite-chain unlock: check the required class path first, then farm fragments and currency in order.',
    requirements: ['Check prerequisite class route', 'Save fragments before rerolling', 'Use Boss Rush only when clear rate is stable'],
    next: ['/classes/honored-one/', '/guides/how-to-get-unrestricted/'],
  },
  {
    slug: 'how-to-get-unrestricted',
    target: 'Unrestricted',
    title: 'How to Get Unrestricted in Dungeon Lootr',
    opening: 'To unlock Unrestricted, you first need the correct prerequisite progression, then complete its level, fragment, and currency requirements.',
    requirements: ['Finish prerequisite progression', 'Confirm level gate', 'Farm required fragments', 'Keep currency for the final unlock step'],
    next: ['/classes/unrestricted/', '/guides/best-aspect-by-class/'],
  },
];

export function byUrl(url: string) {
  return seoEntries.find((entry) => entry.url === url);
}

export function classBySlug(slug: string) {
  return classes.find((item) => item.slug === slug);
}

export function guideBySlug(slug: string) {
  return guides.find((item) => item.slug === slug);
}
