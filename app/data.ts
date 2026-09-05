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

const baseWeaknesses = ['Exact numbers require post-patch verification', 'Best setup can change when Boss Rush rewards or skill values shift'];

export const classes: ClassEntry[] = [
  ['sinister-trigger', 'Sinister Trigger', 'Mythic', 'Late-game damage route', 'Dungeon clear', 'Damage uptime Aspect', 'probable', 'Sinister Trigger is a top damage-focused Dungeon Lootr class that shines when you build around its burst windows and fast clear potential.'],
  ['cursed-king', 'Cursed King', 'Mythic', 'Boss Rush route or Cursed Shrine Forge path', 'Boss Rush', 'Burst or sustain Aspect', 'probable', 'Cursed King is one of Dungeon Lootr’s strongest late-game classes, and the fastest route is through Boss Rush or the Cursed Shrine Forge path.'],
  ['honored-one', 'Honored One', 'Mythic', 'Prerequisite progression chain', 'Solo', 'Control or damage Aspect', 'probable', 'Honored One is a key late-game Dungeon Lootr class and an important progression step for players chasing stronger unlock chains such as Unrestricted.'],
  ['unrestricted', 'Unrestricted', 'Secret', 'Prerequisite class, fragments, and currency', 'Endgame', 'Endgame damage Aspect', 'unverified', 'Unrestricted is a high-investment Dungeon Lootr chase class, and the unlock route should be checked against current prerequisite, level, fragment, and currency requirements.'],
  ['awakened-devil-ex', 'Awakened Devil EX', 'Secret', 'Rare material path', 'Burst', 'Burst amplification Aspect', 'unverified', 'Awakened Devil EX is a late-game chase class where the route should be planned around rare materials, boss farming, and current patch requirements.'],
  ['dreadlord', 'Dreadlord', 'Legendary', 'Boss route', 'Survival', 'Sustain or control Aspect', 'unverified', 'Dreadlord is best evaluated as a durable Dungeon Lootr class for longer fights, especially when survival matters more than raw burst.'],
  ['anti-magic', 'Anti Magic', 'Legendary', 'Class unlock route', 'Boss Rush', 'Survival or uptime Aspect', 'unverified', 'Anti Magic is a Dungeon Lootr class to evaluate around consistent Boss Rush clears, unlock cost, and how well its kit handles longer fights.'],
  ['jetstream', 'Jetstream', 'Legendary', 'Class unlock route', 'Mobility', 'Mobility or damage Aspect', 'unverified', 'Jetstream is a mobility-focused Dungeon Lootr class where the best value comes from fast clears and clean rotation uptime.'],
  ['shadow-vagrant', 'Shadow Vagrant', 'Legendary', 'Class unlock route', 'Solo', 'Damage uptime Aspect', 'unverified', 'Shadow Vagrant should be judged by solo consistency, damage uptime, and whether its unlock route is cheaper than other late-game class targets.'],
  ['azure-devil', 'Azure Devil', 'Legendary', 'Class unlock route', 'Burst', 'Burst Aspect', 'unverified', 'Azure Devil is a burst-oriented Dungeon Lootr class to compare by boss-window damage, material cost, and late-game scaling.'],
  ['streamline', 'Streamline', 'Epic', 'Class unlock route', 'Dungeon clear', 'Speed or uptime Aspect', 'unverified', 'Streamline is best treated as a fast-clear Dungeon Lootr class until current patch data proves whether it competes with late-game chase classes.'],
  ['forge-archon', 'Forge Archon', 'Legendary', 'Forge route', 'Endgame', 'Forge-scaling Aspect', 'unverified', 'Forge Archon belongs on the Dungeon Lootr Forge progression path, so its value depends on material requirements and endgame return on investment.'],
  ['witch-gunner', 'Witch Gunner', 'Epic', 'Class unlock route', 'Ranged clear', 'Range or damage Aspect', 'unverified', 'Witch Gunner is a Dungeon Lootr class to evaluate by ranged safety, dungeon clear speed, and whether its Aspect pairing improves uptime.'],
  ['boxer', 'Boxer', 'Rare', 'Class unlock route', 'Early progression', 'Damage or survival Aspect', 'unverified', 'Boxer is an early-to-mid Dungeon Lootr class that should be judged by progression comfort rather than endgame ceiling.'],
  ['artemis', 'Artemis', 'Epic', 'Class unlock route', 'Dungeon clear', 'Precision or damage Aspect', 'unverified', 'Artemis is a Dungeon Lootr class to test around clear speed, ranged consistency, and whether its investment beats easier progression options.'],
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
  {
    slug: 'how-to-get-awakened-devil-ex',
    target: 'Awakened Devil EX',
    title: 'How to Get Awakened Devil EX in Dungeon Lootr',
    opening: 'Awakened Devil EX should be unlocked by confirming its current rare-material path first, then farming the highest-consistency source for those materials.',
    requirements: ['Confirm current material list', 'Check boss or dungeon source', 'Farm only where your clear rate is stable'],
    next: ['/classes/awakened-devil-ex/', '/tools/drop-chance-calculator/'],
  },
  {
    slug: 'how-to-get-dreadlord',
    target: 'Dreadlord',
    title: 'How to Get Dreadlord in Dungeon Lootr',
    opening: 'Dreadlord is best approached through its boss route, with drop planning handled before you sink runs into a low-consistency farm.',
    requirements: ['Confirm boss source', 'Prepare a stable Boss Rush or dungeon build', 'Track rare material progress'],
    next: ['/classes/dreadlord/', '/tools/drop-chance-calculator/'],
  },
  {
    slug: 'heavenly-fragments',
    target: 'Heavenly Fragments',
    title: 'How to Get Heavenly Fragments in Dungeon Lootr',
    opening: 'Heavenly Fragments should be farmed only after you know which class unlock or Forge route needs them, because the best source depends on your current progression.',
    requirements: ['Identify the target unlock', 'Confirm source after the latest patch', 'Use a repeatable clear route'],
    next: ['/drop-rates/', '/tools/drop-chance-calculator/'],
  },
  {
    slug: 'devil-heart',
    target: 'Devil Heart',
    title: 'Dungeon Lootr Devil Heart Drop Rate & How to Get It',
    opening: 'Devil Heart farming should start with the verified source and expected-run calculation, not a blind grind based on a single drop-rate rumor.',
    requirements: ['Confirm source', 'Record estimated or official rate', 'Calculate runs for 90% and 95% targets'],
    next: ['/drop-rates/', '/tools/drop-chance-calculator/'],
  },
  {
    slug: 'cursed-fragments',
    target: 'Cursed Fragments',
    title: 'How to Get Cursed Fragments in Dungeon Lootr',
    opening: 'Cursed Fragments are worth routing around the class or Forge path they unlock, then farming through the most reliable repeatable source.',
    requirements: ['Confirm target class requirement', 'Check current source', 'Avoid unstable high-floor farms'],
    next: ['/guides/how-to-get-cursed-king/', '/tools/drop-chance-calculator/'],
  },
];

export const hubPages = [
  ['codes', 'Dungeon Lootr Codes', 'These Dungeon Lootr codes currently give the fastest free boost to your progression, especially when a new update or milestone code goes live.', ['Working codes', 'Expired codes', 'Where new codes appear', 'Last checked']],
  ['builds', 'Dungeon Lootr Builds', 'Dungeon Lootr builds should be picked by mode first: Boss Rush rewards consistency, while dungeon clearing rewards burst windows and mobility.', ['Best overall builds', 'Boss Rush builds', 'Dungeon clear builds', 'Build methodology']],
  ['aspects', 'Dungeon Lootr Aspects', 'Aspects can completely change how a Dungeon Lootr class performs, so the best choice depends on your class, mode, and damage or survivability needs.', ['Best Aspects by role', 'Class pairings', 'Alternatives', 'Patch notes']],
  ['dungeons', 'Dungeon Lootr Dungeons', 'Dungeon Lootr dungeon progression is fastest when you farm the highest tier you can clear consistently rather than forcing unstable clears.', ['Progression checkpoints', 'Farming routes', 'Class recommendations', 'Drop notes']],
  ['items', 'Dungeon Lootr Items', 'Dungeon Lootr items matter most when they connect to a class unlock, Forge path, Boss Rush breakpoint, or rare drop farm.', ['Class materials', 'Fragments', 'Boss drops', 'Used-for index']],
  ['progression-guide', 'Dungeon Lootr Progression Guide', 'The fastest Dungeon Lootr progression path is to unlock reliable early damage, push higher dungeon tiers quickly, then transition into Boss Rush and deterministic Forge upgrades.', ['Early game', 'Mid game', 'Boss Rush transition', 'Endgame class targets']],
].map(([slug, title, opening, sections]) => ({
  slug: slug as string,
  title: title as string,
  opening: opening as string,
  sections: sections as string[],
}));

export const bossRushPages = [
  ['floor-40', 'Dungeon Lootr Boss Rush Floor 40', 'Boss Rush Floor 40 is a major Dungeon Lootr progression breakpoint because several high-value class and fragment rewards enter the farming loop around this range.'],
  ['floor-100', 'Dungeon Lootr Boss Rush Floor 100', 'Boss Rush Floor 100 is an endgame checkpoint where class choice, survivability, and damage uptime matter more than raw burst alone.'],
  ['drops', 'Dungeon Lootr Boss Rush Drops', 'Boss Rush drops should be tracked by floor, condition, and last-checked patch so players can avoid farming the wrong breakpoint.'],
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
    opening: 'Cursed King is usually the safer Boss Rush investment, while Sinister Trigger is the better pick when your goal is fast burst-focused dungeon clearing.',
  },
  {
    slug: 'honored-one-vs-unrestricted',
    a: 'Honored One',
    b: 'Unrestricted',
    opening: 'Honored One is the progression bridge, while Unrestricted is the higher-investment chase target once prerequisites and resources are already lined up.',
  },
];

export const toolPages = [
  {
    slug: 'class-finder',
    title: 'Dungeon Lootr Class Finder',
    opening: 'Use the Dungeon Lootr Class Finder to narrow class targets by rarity, unlock route, and best mode before committing to a farm.',
  },
  {
    slug: 'aspect-matcher',
    title: 'Dungeon Lootr Aspect Matcher',
    opening: 'Use the Dungeon Lootr Aspect Matcher to pair a class with an Aspect direction based on Boss Rush, dungeon clear, burst, or survival goals.',
  },
];

export function classSerp(item: ClassEntry): Serp {
  const isChase = item.rarity === 'Secret' || item.rarity === 'Mythic';
  return {
    title: `Dungeon Lootr ${item.name} Guide - Unlock, Build, Best Aspect & Tier`,
    description: `${isChase ? 'Decide if' : 'See when'} ${item.name} is worth farming in Dungeon Lootr: unlock route, rarity, best mode, Aspect direction, build links, strengths, weaknesses, and next steps.`,
    intent: 'The searcher likely wants to know whether this class is strong, how to get it, and what to do after unlocking it.',
  };
}

export function buildSerp(item: ClassEntry): Serp {
  return {
    title: `Best ${item.name} Build in Dungeon Lootr - Stats, Aspect, Gear & Rotation`,
    description: `Build ${item.name} for ${item.mode}: stat priority, Aspect pick, gear focus, Boss Rush and dungeon variants, rotation notes, and alternatives if you are still farming.`,
    intent: 'The searcher already has or wants the class and needs a practical setup, not a lore page.',
  };
}

export function guideSerp(guide: { slug: string; target: string; title: string; opening: string }): Serp {
  const dropIntent = guide.slug === 'devil-heart';
  return {
    title: dropIntent
      ? 'Devil Heart Drop Rate in Dungeon Lootr - Best Farming Method & Runs'
      : `${guide.title} - Fastest Route, Requirements & Farming Tips`,
    description: `Get ${guide.target} in Dungeon Lootr with a quick answer, requirements checklist, fastest route, common mistakes, expected grind planning, and what to open next.`,
    intent: 'The searcher wants the route immediately, plus requirements and a way to judge the grind.',
  };
}

export function hubSerp(page: { slug: string; title: string; opening: string }): Serp {
  const suffixBySlug: Record<string, string> = {
    codes: 'Working Codes, New Rewards & Expired List',
    builds: 'Best Builds by Class, Mode, Stats & Aspects',
    aspects: 'Effects, Best Classes, Pairings & Current Meta',
    dungeons: 'Routes, Farming Targets & Progression Checkpoints',
    items: 'Materials, Fragments, Drops & What They Unlock',
    'progression-guide': 'Fastest Route From Beginner to Endgame',
  };
  return {
    title: `${page.title} - ${suffixBySlug[page.slug] ?? 'Fast Answers & Data'}`,
    description: `${page.opening} Includes quick answers, tables, tool links, and next-step routes so players do not dead-end after one page.`,
    intent: 'The searcher is browsing a category and needs a scannable directory with clear next actions.',
  };
}

export function bossRushSerp(page: { title: string; opening: string }): Serp {
  return {
    title: `${page.title} - Drops, Rewards, Classes & Clear Strategy`,
    description: `${page.opening} Check reward planning, class choices, expected runs, common mistakes, and related farming tools.`,
    intent: 'The searcher wants a floor or Boss Rush reward answer, then a class or drop-planning next step.',
  };
}

export function comparisonSerp(item: { a: string; b: string; opening: string }): Serp {
  return {
    title: `${item.a} vs ${item.b} - Which Is Better in Dungeon Lootr?`,
    description: `Compare ${item.a} and ${item.b} by Boss Rush, dungeon clear, solo play, unlock cost, investment, and final recommendation.`,
    intent: 'The searcher is choosing between two options and needs a verdict by mode.',
  };
}

export function toolSerp(tool: { title: string; opening: string }): Serp {
  return {
    title: `${tool.title} - Pick Faster, Farm Smarter, Waste Fewer Runs`,
    description: `${tool.opening} Use it alongside class pages, build pages, Boss Rush routes, and drop planning pages.`,
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
