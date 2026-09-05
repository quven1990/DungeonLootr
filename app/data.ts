export type SeoEntry = {
  url: string;
  title: string;
  description: string;
  opening: string;
  h1: string;
  type: 'hub' | 'database' | 'tier' | 'entity' | 'howto' | 'build' | 'tool' | 'guide';
};

export type ClassEntry = {
  slug: string;
  name: string;
  rarity: string;
  obtain: string;
  mode: string;
  aspect: string;
  confidence: 'verified' | 'probable' | 'conflicting' | 'unverified';
  opening: string;
  strengths: string[];
  weaknesses: string[];
};

export type Serp = {
  title: string;
  description: string;
  intent: string;
};

export const seoEntries: SeoEntry[] = [
  {
    url: '/classes/',
    title: 'Dungeon Lootr Classes - All 30+ Classes & How to Unlock Them',
    description:
      'Every Dungeon Lootr class by rarity and unlock method - Boss Rush drops, Forge routes, strengths, and build links.',
    opening:
      'Dungeon Lootr has 30+ classes with totally different unlock routes - spin, Boss Rush, and Forge paths included. Pick your target before you farm.',
    h1: 'Dungeon Lootr Classes: All 30+ Classes & How to Unlock Them',
    type: 'database',
  },
  {
    url: '/class-tier-list/',
    title: 'Dungeon Lootr Tier List - Best Classes After the Latest Update',
    description:
      'S-tier and ranked picks for Boss Rush, dungeon clears, mobility, and endgame value - updated for the latest patch.',
    opening:
      'Looking for the best Dungeon Lootr class right now? The current meta clusters around a few high-output picks for Boss Rush and fast clears - here is the ranked list.',
    h1: 'Dungeon Lootr Class Tier List',
    type: 'tier',
  },
  {
    url: '/boss-rush/',
    title: 'Dungeon Lootr Boss Rush Guide - Key Floors, Class Drops & Best Push Classes',
    description:
      'Hit the Boss Rush floors that drop classes and fragments, see farming routes, and pick a class that actually pushes deeper.',
    opening:
      'Boss Rush is where endgame classes and fragments lock to floor milestones - miss the breakpoint and you farm the wrong loop for hours.',
    h1: 'Dungeon Lootr Boss Rush Guide',
    type: 'hub',
  },
  {
    url: '/drop-rates/',
    title: 'Dungeon Lootr Drop Rates - Boss, Class Item & Fragment Chances',
    description:
      'Check Dungeon Lootr drop rates for boss loot, class items, fragments, and rare materials, with last-checked patch dates and farming notes.',
    opening:
      'Dungeon Lootr drop rates vary by boss, dungeon, difficulty, and reward condition, so the best farming route depends on exactly what you are chasing.',
    h1: 'Dungeon Lootr Drop Rates',
    type: 'database',
  },
  {
    url: '/tools/drop-chance-calculator/',
    title: 'Dungeon Lootr Drop Chance Calculator - Runs to 50%, 90%, 95%, 99%',
    description:
      'Stop guessing rare drops. Enter any drop rate and see your chance after N runs - plus attempts needed for 50/90/95/99%.',
    opening:
      'Paste any Dungeon Lootr drop rate and see how many runs you really need instead of trusting a single percentage rumor.',
    h1: 'Dungeon Lootr Drop Chance Calculator',
    type: 'tool',
  },
];

const baseWeaknesses = [
  'Exact numbers require post-patch verification',
  'Best setup can change when Boss Rush rewards or skill values shift',
];

export const classes: ClassEntry[] = [
  [
    'sinister-trigger',
    'Sinister Trigger',
    'Mythic',
    'Late-game damage route',
    'Dungeon clear',
    'Damage uptime Aspect',
    'probable',
    'Sinister Trigger is a top damage class for fast clears - build around burst windows and you will feel the difference immediately.',
  ],
  [
    'cursed-king',
    'Cursed King',
    'Mythic',
    'Boss Rush route or Cursed Shrine Forge path',
    'Boss Rush',
    'Burst or sustain Aspect',
    'probable',
    'Cursed King is one of the strongest late-game classes - unlock it through Boss Rush first, or use the Cursed Shrine Forge path as your backup.',
  ],
  [
    'honored-one',
    'Honored One',
    'Mythic',
    'Prerequisite progression chain',
    'Solo',
    'Control or damage Aspect',
    'probable',
    'Honored One is a key late-game stepping stone - unlock it if you are pushing toward stronger chains like Unrestricted.',
  ],
  [
    'unrestricted',
    'Unrestricted',
    'Secret',
    'Prerequisite class, fragments, and currency',
    'Endgame',
    'Endgame damage Aspect',
    'unverified',
    'Unrestricted is a high-investment chase class - confirm prereqs, level, fragments, and currency before you commit the farm.',
  ],
  [
    'awakened-devil-ex',
    'Awakened Devil EX',
    'Secret',
    'Rare material path',
    'Burst',
    'Burst amplification Aspect',
    'unverified',
    'Awakened Devil EX is a late-game chase: plan the rare-material route first, then farm only the most consistent source.',
  ],
  [
    'dreadlord',
    'Dreadlord',
    'Legendary',
    'Boss route',
    'Survival',
    'Sustain or control Aspect',
    'unverified',
    'Dreadlord shines in long fights where survival beats raw burst - strong if your clears keep dying before the damage lands.',
  ],
  [
    'anti-magic',
    'Anti Magic',
    'Legendary',
    'Class unlock route',
    'Boss Rush',
    'Survival or uptime Aspect',
    'unverified',
    'Anti Magic is built for consistent Boss Rush clears - check unlock cost and how well it holds in longer fights before farming.',
  ],
  [
    'jetstream',
    'Jetstream',
    'Legendary',
    'Class unlock route',
    'Mobility',
    'Mobility or damage Aspect',
    'unverified',
    'Jetstream is a mobility class that pays off in fast clears and clean rotation uptime - great when speed is the goal.',
  ],
  [
    'shadow-vagrant',
    'Shadow Vagrant',
    'Legendary',
    'Class unlock route',
    'Solo',
    'Damage uptime Aspect',
    'unverified',
    'Shadow Vagrant is a solo-consistency pick - farm it if the unlock is cheaper than other late-game targets you want.',
  ],
  [
    'azure-devil',
    'Azure Devil',
    'Legendary',
    'Class unlock route',
    'Burst',
    'Burst Aspect',
    'unverified',
    'Azure Devil is a burst class - compare boss-window damage and material cost before you invest.',
  ],
  [
    'streamline',
    'Streamline',
    'Epic',
    'Class unlock route',
    'Dungeon clear',
    'Speed or uptime Aspect',
    'unverified',
    'Streamline is a fast-clear class for progression - use it to push content until a true endgame chase is worth the farm.',
  ],
  [
    'forge-archon',
    'Forge Archon',
    'Legendary',
    'Forge route',
    'Endgame',
    'Forge-scaling Aspect',
    'unverified',
    'Forge Archon sits on the Forge progression path - worth it when the material cost matches the endgame return.',
  ],
  [
    'witch-gunner',
    'Witch Gunner',
    'Epic',
    'Class unlock route',
    'Ranged clear',
    'Range or damage Aspect',
    'unverified',
    'Witch Gunner offers ranged safety and solid clear speed - strong when you want safer dungeon farming.',
  ],
  [
    'boxer',
    'Boxer',
    'Rare',
    'Class unlock route',
    'Early progression',
    'Damage or survival Aspect',
    'unverified',
    'Boxer is an early-to-mid comfort class - take it for smoother progression, not for endgame ceiling.',
  ],
  [
    'artemis',
    'Artemis',
    'Epic',
    'Class unlock route',
    'Dungeon clear',
    'Precision or damage Aspect',
    'unverified',
    'Artemis is a ranged clear option - farm it if clear speed and consistency beat easier progression classes for you.',
  ],
].map(([slug, name, rarity, obtain, mode, aspect, confidence, opening]) => ({
  slug,
  name,
  rarity,
  obtain,
  mode,
  aspect,
  confidence: confidence as ClassEntry['confidence'],
  opening,
  strengths: [`Strong ${String(mode).toLowerCase()} profile`, 'Clear build direction', 'Useful comparison target'],
  weaknesses: baseWeaknesses,
}));

export const guides = [
  {
    slug: 'how-to-get-cursed-king',
    target: 'Cursed King',
    title: 'How to Get Cursed King in Dungeon Lootr',
    opening: 'Fastest Cursed King route: Boss Rush first, Forge as the deterministic backup.',
    requirements: [
      'Confirm current Boss Rush floor access',
      'Track Cursed Shrine or Forge materials',
      'Prepare a class that can clear consistently',
    ],
    next: ['/builds/cursed-king/', '/tools/drop-chance-calculator/'],
  },
  {
    slug: 'how-to-get-honored-one',
    target: 'Honored One',
    title: 'How to Get Honored One in Dungeon Lootr',
    opening:
      'Treat Honored One as a prerequisite chain: required class path first, then fragments and currency in order.',
    requirements: [
      'Check prerequisite class route',
      'Save fragments before rerolling',
      'Use Boss Rush only when clear rate is stable',
    ],
    next: ['/classes/honored-one/', '/guides/how-to-get-unrestricted/'],
  },
  {
    slug: 'how-to-get-unrestricted',
    target: 'Unrestricted',
    title: 'How to Get Unrestricted in Dungeon Lootr',
    opening:
      'Unlock Unrestricted only after the correct prereq progression, then finish level, fragment, and currency gates.',
    requirements: [
      'Finish prerequisite progression',
      'Confirm level gate',
      'Farm required fragments',
      'Keep currency for the final unlock step',
    ],
    next: ['/classes/unrestricted/', '/guides/best-aspect-by-class/'],
  },
  {
    slug: 'how-to-get-awakened-devil-ex',
    target: 'Awakened Devil EX',
    title: 'How to Get Awakened Devil EX in Dungeon Lootr',
    opening:
      'Confirm the current rare-material list first, then farm the highest-consistency source for Awakened Devil EX.',
    requirements: [
      'Confirm current material list',
      'Check boss or dungeon source',
      'Farm only where your clear rate is stable',
    ],
    next: ['/classes/awakened-devil-ex/', '/tools/drop-chance-calculator/'],
  },
  {
    slug: 'how-to-get-dreadlord',
    target: 'Dreadlord',
    title: 'How to Get Dreadlord in Dungeon Lootr',
    opening:
      'Take the boss route for Dreadlord, and plan drops before you dump runs into a low-consistency farm.',
    requirements: [
      'Confirm boss source',
      'Prepare a stable Boss Rush or dungeon build',
      'Track rare material progress',
    ],
    next: ['/classes/dreadlord/', '/tools/drop-chance-calculator/'],
  },
  {
    slug: 'heavenly-fragments',
    target: 'Heavenly Fragments',
    title: 'How to Get Heavenly Fragments',
    opening:
      'Farm Heavenly Fragments only for the unlock you are chasing - the best source changes with your progression.',
    requirements: [
      'Identify the target unlock',
      'Confirm source after the latest patch',
      'Use a repeatable clear route',
    ],
    next: ['/drop-rates/', '/tools/drop-chance-calculator/'],
  },
  {
    slug: 'devil-heart',
    target: 'Devil Heart',
    title: 'Devil Heart Drop Rate in Dungeon Lootr',
    opening:
      'Start Devil Heart farming with a verified source and expected-run math - not a random drop-rate rumor from chat.',
    requirements: [
      'Confirm source',
      'Record estimated or official rate',
      'Calculate runs for 90% and 95% targets',
    ],
    next: ['/drop-rates/', '/tools/drop-chance-calculator/'],
  },
  {
    slug: 'cursed-fragments',
    target: 'Cursed Fragments',
    title: 'How to Get Cursed Fragments',
    opening:
      'Route Cursed Fragments around the class or Forge path they unlock, then farm the most repeatable source you can clear.',
    requirements: [
      'Confirm target class requirement',
      'Check current source',
      'Avoid unstable high-floor farms',
    ],
    next: ['/guides/how-to-get-cursed-king/', '/tools/drop-chance-calculator/'],
  },
];

export const hubPages = [
  [
    'codes',
    'Dungeon Lootr Codes',
    'These working Dungeon Lootr codes are the fastest free boost right now - redeem the active list first, skip anything marked expired.',
    ['Working codes', 'Expired codes', 'Where new codes appear', 'Last checked'],
  ],
  [
    'builds',
    'Dungeon Lootr Builds',
    'Stop guessing your setup: pick your class and mode first, then copy the stat priority, Aspect, and gear focus that actually clear.',
    ['Best overall builds', 'Boss Rush builds', 'Dungeon clear builds', 'Build methodology'],
  ],
  [
    'aspects',
    'Dungeon Lootr Aspects',
    'The best Aspect in Dungeon Lootr depends on your class and goal: Boss Rush wants uptime, dungeon clears want burst, and survival builds win when you keep failing mid-run.',
    ['Best Aspects by role', 'Class pairings', 'Alternatives', 'Patch notes'],
  ],
  [
    'dungeons',
    'Dungeon Lootr Dungeons',
    'The fastest dungeon progression is not the hardest room - it is the highest tier you can clear on repeat without dying for free.',
    ['Progression checkpoints', 'Farming routes', 'Class recommendations', 'Drop notes'],
  ],
  [
    'items',
    'Dungeon Lootr Items',
    'Every important Dungeon Lootr item should answer one question: what class, Forge path, or Boss Rush farm does this unlock next?',
    ['Class materials', 'Fragments', 'Boss drops', 'Used-for index'],
  ],
  [
    'progression-guide',
    'Dungeon Lootr Progression Guide',
    'Start with reliable early damage, push the highest dungeon tier you can farm cleanly, then move into Boss Rush and Forge for endgame classes.',
    ['Early game', 'Mid game', 'Boss Rush transition', 'Endgame class targets'],
  ],
].map(([slug, title, opening, sections]) => ({
  slug: slug as string,
  title: title as string,
  opening: opening as string,
  sections: sections as string[],
}));

export const bossRushPages = [
  [
    'floor-40',
    'Boss Rush Floor 40',
    'Boss Rush Floor 40 is where several high-value class and fragment rewards enter the loop - if you can clear it stably, this is a farm worth camping.',
  ],
  [
    'floor-100',
    'Boss Rush Floor 100',
    'Floor 100 punishes glass-cannon greed - bring a class with survivability and damage uptime, not just a big burst window.',
  ],
  [
    'drops',
    'Dungeon Lootr Boss Rush Drops',
    'Do not farm random Boss Rush floors - track drops by floor and patch so you stop at the reward that actually upgrades your account.',
  ],
].map(([slug, title, opening]) => ({
  slug,
  title,
  opening,
  sections: ['Reward checks', 'Best strategy', 'Expected runs', 'What to farm next'],
}));

export const comparisons = [
  {
    slug: 'cursed-king-vs-sinister-trigger',
    a: 'Cursed King',
    b: 'Sinister Trigger',
    opening:
      'Cursed King is usually the safer Boss Rush investment, while Sinister Trigger is the better pick when your goal is fast burst-focused dungeon clearing.',
  },
  {
    slug: 'honored-one-vs-unrestricted',
    a: 'Honored One',
    b: 'Unrestricted',
    opening:
      'Honored One is the progression bridge, while Unrestricted is the higher-investment chase target once prerequisites and resources are already lined up.',
  },
];

export const toolPages = [
  {
    slug: 'class-finder',
    title: 'Dungeon Lootr Class Finder',
    opening:
      'Use the Class Finder to shortlist targets by rarity, unlock path, and mode - then open the unlock guide only for classes you will actually farm.',
  },
  {
    slug: 'aspect-matcher',
    title: 'Dungeon Lootr Aspect Matcher',
    opening:
      'Pick your class and goal, then get an Aspect direction built for Boss Rush, fast clears, burst, or staying alive.',
  },
];

const modeHook: Record<string, string> = {
  'Boss Rush': 'Boss Rush clears',
  'Dungeon clear': 'fast dungeon clears',
  Solo: 'solo consistency',
  Endgame: 'endgame pushes',
  Burst: 'burst windows / boss damage',
  Survival: 'long fights / survivability',
  Mobility: 'speed clears',
  'Ranged clear': 'safe ranged clears',
  'Early progression': 'early-mid progression',
};

function buildModeHook(mode: string) {
  return modeHook[mode] ?? mode.toLowerCase();
}

export function classSerp(item: ClassEntry): Serp {
  const isChase = item.rarity === 'Secret' || item.rarity === 'Mythic';
  return {
    title: `Dungeon Lootr ${item.name} - How to Unlock, Build & Is It Worth It?`,
    description: isChase
      ? `Is ${item.name} worth farming in Dungeon Lootr? Unlock route, best mode, Aspect direction, build, and whether to chase it now.`
      : `${item.name} unlock route, best mode, Aspect, build links, and when this class is actually worth your runs.`,
    intent: 'The searcher likely wants to know whether this class is strong, how to get it, and what to do after unlocking it.',
  };
}

export function buildSerp(item: ClassEntry): Serp {
  const hook = buildModeHook(item.mode);
  return {
    title: `Best ${item.name} Build in Dungeon Lootr - Stats, Aspect & Rotation`,
    description: `Copy the best ${item.name} build for ${hook}: stat priority, best Aspect, gear focus, Boss Rush and dungeon variants, plus a budget setup while you farm.`,
    intent: 'The searcher already has or wants the class and needs a practical setup, not a lore page.',
  };
}

export function buildOpening(item: ClassEntry) {
  return `Want the best ${item.name} build? Start with ${buildModeHook(item.mode)}, lock this Aspect direction, then copy the stat priority below.`;
}

export function guideSerp(guide: { slug: string; target: string; title: string; opening: string }): Serp {
  if (guide.slug === 'devil-heart') {
    return {
      title: 'Devil Heart Drop Rate in Dungeon Lootr - Best Farm & Run Estimates',
      description:
        'Devil Heart drop rate, best farming method, and how many runs you need for 90% or 95% - stop grinding blind.',
      intent: 'The searcher wants drop rate math and a farm plan, not a generic checklist.',
    };
  }
  if (guide.slug === 'heavenly-fragments') {
    return {
      title: 'How to Get Heavenly Fragments - Best Farm & What They Unlock',
      description:
        'Where to farm Heavenly Fragments, what class/Forge routes need them, and the most consistent source for your stage.',
      intent: 'The searcher wants source + unlock utility.',
    };
  }
  if (guide.slug === 'cursed-fragments') {
    return {
      title: 'How to Get Cursed Fragments - Fast Farm for Class & Forge Routes',
      description:
        'Fastest reliable Cursed Fragment farm, which unlocks need them, and mistakes that waste your Boss Rush runs.',
      intent: 'The searcher wants a reliable fragment farm tied to unlocks.',
    };
  }
  return {
    title: `How to Get ${guide.target} in Dungeon Lootr - Fastest Route & Requirements`,
    description: `Unlock ${guide.target} fast: requirements checklist, best route, common mistakes, and how hard the grind actually is.`,
    intent: 'The searcher wants the route immediately, plus requirements and a way to judge the grind.',
  };
}

const hubSerpBySlug: Record<string, { title: string; description: string }> = {
  codes: {
    title: 'Dungeon Lootr Codes - Working Codes & Free Rewards (Updated)',
    description:
      'Active Dungeon Lootr codes with free rewards, plus expired codes so you do not waste time redeeming dead ones.',
  },
  builds: {
    title: 'Dungeon Lootr Builds - Copy-Ready Setups by Class & Mode',
    description:
      'Grab the best Dungeon Lootr builds by class and mode - stats, Aspects, gear focus, and Boss Rush vs clear variants.',
  },
  aspects: {
    title: 'Dungeon Lootr Aspects - Best Picks by Class & Current Meta',
    description:
      'Find the best Aspect for your class in Dungeon Lootr - Boss Rush, fast clear, and survival picks in one place.',
  },
  dungeons: {
    title: 'Dungeon Lootr Dungeons - Best Farming Routes & Progression',
    description:
      'Push dungeon tiers faster: farm the highest stage you can clear consistently, then climb with the right class.',
  },
  items: {
    title: 'Dungeon Lootr Items - Fragments, Materials & What They Unlock',
    description:
      'See what every key fragment and material unlocks - class routes, Forge paths, and Boss Rush farms.',
  },
  'progression-guide': {
    title: 'Dungeon Lootr Progression Guide - Fastest Beginner to Endgame Route',
    description:
      'The fastest Dungeon Lootr path: early damage → higher dungeon tiers → Boss Rush → Forge upgrades.',
  },
};

export function hubSerp(page: { slug: string; title: string; opening: string }): Serp {
  const custom = hubSerpBySlug[page.slug];
  return {
    title: custom?.title ?? `${page.title} - Fast Answers & Data`,
    description: custom?.description ?? page.opening,
    intent: 'The searcher is browsing a category and needs a scannable directory with clear next actions.',
  };
}

const bossRushSerpBySlug: Record<string, { title: string; description: string }> = {
  drops: {
    title: 'Dungeon Lootr Boss Rush Drops - Floor Rewards & What to Farm First',
    description:
      'Full Boss Rush drop map by floor: class rewards, fragments, and which breakpoints are worth camping.',
  },
  'floor-40': {
    title: 'Boss Rush Floor 40 - High-Value Class & Fragment Checkpoint',
    description:
      'Floor 40 is a major progression breakpoint: see rewards, best clear classes, and whether you should farm here now.',
  },
  'floor-100': {
    title: 'Boss Rush Floor 100 - Endgame Checkpoint & Best Clear Classes',
    description:
      'Floor 100 is an endgame gate: survivability and uptime beat raw burst. See rewards and which classes clear it.',
  },
};

export function bossRushSerp(page: { slug: string; title: string; opening: string }): Serp {
  const custom = bossRushSerpBySlug[page.slug];
  return {
    title: custom?.title ?? `${page.title} - Drops, Rewards & Clear Strategy`,
    description: custom?.description ?? page.opening,
    intent: 'The searcher wants a floor or Boss Rush reward answer, then a class or drop-planning next step.',
  };
}

export function comparisonSerp(item: { a: string; b: string; opening: string }): Serp {
  const verdictByPair: Record<string, string> = {
    'Cursed King|Sinister Trigger':
      'Verdict: Cursed King is the safer Boss Rush investment; Sinister Trigger wins for burst dungeon clears. Compare unlock cost and modes.',
    'Honored One|Unrestricted':
      'Verdict: Honored One is the progression bridge; Unrestricted is the chase once prereqs and resources are ready.',
  };
  return {
    title: `${item.a} vs ${item.b} - Which Is Better?`,
    description: verdictByPair[`${item.a}|${item.b}`] ?? item.opening,
    intent: 'The searcher is choosing between two options and needs a verdict by mode.',
  };
}

export function toolSerp(tool: { slug: string; title: string; opening: string }): Serp {
  if (tool.slug === 'class-finder') {
    return {
      title: 'Dungeon Lootr Class Finder - Filter by Rarity, Unlock & Mode',
      description:
        'Narrow your next class target by rarity, unlock route, and best mode before you burn runs on the wrong farm.',
      intent: 'The searcher wants an interactive shortcut, not another article.',
    };
  }
  if (tool.slug === 'aspect-matcher') {
    return {
      title: 'Dungeon Lootr Aspect Matcher - Best Aspect by Class & Goal',
      description:
        'Match your class to an Aspect direction for Boss Rush, dungeon clear, burst, or survival - skip the guesswork.',
      intent: 'The searcher wants an interactive shortcut, not another article.',
    };
  }
  return {
    title: tool.title,
    description: tool.opening,
    intent: 'The searcher wants an interactive shortcut, not another article.',
  };
}

export function byUrl(url: string) {
  return seoEntries.find((entry) => entry.url === url);
}

export function classBySlug(slug: string) {
  return classes.find((item) => item.slug === slug);
}

export function guideBySlug(slug: string) {
  return guides.find((item) => item.slug === slug);
}

export function hubBySlug(slug: string) {
  return hubPages.find((item) => item.slug === slug);
}

export function bossRushBySlug(slug: string) {
  return bossRushPages.find((item) => item.slug === slug);
}

export function comparisonBySlug(slug: string) {
  return comparisons.find((item) => item.slug === slug);
}

export function toolBySlug(slug: string) {
  return toolPages.find((item) => item.slug === slug);
}
