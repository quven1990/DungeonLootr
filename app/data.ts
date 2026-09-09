export type SeoEntry = {
  url: string;
  title: string;
  description: string;
  opening: string;
  h1: string;
  type: 'hub' | 'database' | 'tier' | 'entity' | 'howto' | 'build' | 'tool' | 'guide';
};

export type ClassTier = 'S' | 'A' | 'B' | 'C' | 'D' | 'Unrated';
export type ObtainGroup = 'spin' | 'boss-rush' | 'checklist' | 'quest' | 'dungeon-drop' | 'update-1' | 'unknown';

export type ClassEntry = {
  slug: string;
  name: string;
  rarity: string;
  /** When community guides disagree on the rarity label (e.g. Mythic/Secret vs Exotic). */
  rarityConflictNote?: string;
  obtain: string;
  mode: string;
  aspect: string;
  tier: ClassTier;
  confidence: 'verified' | 'probable' | 'conflicting' | 'unverified';
  opening: string;
  strengths: string[];
  weaknesses: string[];
  unlockSteps: string[];
  buildNotes: string[];
  /** Directory row only — do not generate a thin /classes/[slug] page. */
  listingOnly?: boolean;
  /** Patch label when the class was added, e.g. UPDATE 1. */
  patch?: string;
  bestFor?: string;
};

export const UPDATE_1_RELEASED = '2026-09-07';
export const UPDATE_1_NAME = 'UPDATE 1';
export const WIKI_PAGE_UPDATED = '2026-09-09';
export const UPDATE_1_CLASS_SLUGS = ['spell-breaker', 'cryomancer', 'coyote', 'dark-professor'] as const;
export const UPDATE_1_CLASS_NAMES = ['Spell Breaker', 'Cryomancer', 'Coyote', 'Dark Professor'] as const;

/** Real build payload for /builds pages. Thin builds stay noindex. */
export type BuildProfile = {
  bestMode: string;
  bestAspect: string;
  altAspect: string;
  statPriority: string;
  gearFocus: string;
  rotation: string;
  bossRushSetup: string;
  dungeonSetup: string;
  strengths: string[];
  weaknesses: string[];
  lastChecked: string;
  patch: string;
  dataStatus: 'Verified' | 'Community-tested' | 'Mixed';
};

export type SearchIntent = 'entity' | 'howto' | 'build' | 'tool' | 'comparison' | 'freshness' | 'hub' | 'database' | 'tier';

export type Serp = {
  title: string;
  description: string;
  intent: string;
  primaryKeyword?: string;
  searchIntent?: SearchIntent;
};

export const CONTENT_LAST_CHECKED = '2026-09-06';
export const CONTENT_PATCH = 'Community snapshot';

/** UPDATE 1 names reported by community media but not yet rated on this wiki. */
export const UNRATED_CLASS_NAMES = UPDATE_1_CLASS_NAMES;

export function hasClassPage(item: ClassEntry) {
  return !item.listingOnly;
}

export function isUpdate1Class(item: ClassEntry) {
  return item.patch === 'UPDATE 1' || (UPDATE_1_CLASS_SLUGS as readonly string[]).includes(item.slug);
}

export function obtainGroupOf(item: ClassEntry): ObtainGroup {
  if (isUpdate1Class(item)) return 'update-1';
  if (/Boss Rush|Forge with/.test(item.obtain)) return 'boss-rush';
  if (/Class roll/.test(item.obtain)) return 'spin';
  if (/NPC quest|Jetstream NPC/.test(item.obtain)) return 'quest';
  if (/Glaive drop|Nightmare/.test(item.obtain) && /drop/i.test(item.obtain)) return 'dungeon-drop';
  if (/Heavenly Fragments|Devil Heart|Honored One Lv/.test(item.obtain)) return 'checklist';
  if (/No confirmed|Not confirmed|unconfirmed/i.test(item.obtain)) return 'unknown';
  return 'unknown';
}

function dirClass(input: {
  slug: string;
  name: string;
  rarity: string;
  obtain: string;
  mode?: string;
  bestFor?: string;
  confidence?: ClassEntry['confidence'];
  rarityConflictNote?: string;
}): ClassEntry {
  return {
    aspect: 'Not documented',
    mode: input.mode ?? 'Not ranked',
    tier: 'Unrated',
    confidence: input.confidence ?? 'probable',
    listingOnly: true,
    opening: `${input.name} appears in the current Dungeon Lootr class roster. This wiki lists it in the directory once the name is confirmed, but does not invent skills, drop rates, or a ranking.`,
    strengths: [],
    weaknesses: [],
    unlockSteps: [],
    buildNotes: [],
    bestFor: input.bestFor ?? 'Check the live Classes menu',
    ...input,
  };
}

const VAGUE_BUILD_RE =
  /prioritize consistency|use the class effectively|play aggressively|build around|lean into|hybrid|uptime aspect|damage aspect|control \/|endgame damage|burst aspect|sustain aspect|pure sustain|cleave uptime|aspect direction/i;

export const buildProfiles: Record<string, BuildProfile> = {
  'cursed-king': {
    bestMode: 'Boss Rush',
    bestAspect: 'Aspect direction (unverified): burst / sustain hybrid',
    altAspect: 'Aspect direction (unverified): pure sustain if Floor 40+ clears are unstable',
    statPriority: 'Damage > Cooldown > Survivability (general priority, unverified point spreads)',
    gearFocus: 'AoE / cleave weapons and mastery nodes that raise slash damage before greedier crit stacking',
    rotation: 'Open with core cleave → keep slash uptime on packs → save burst for elite / floor bosses → reset only when the next pack is already grouped',
    bossRushSetup: 'Primary. Push stable Floor 40+ clears before optimizing for Floor 100 fragment lobbies.',
    dungeonSetup: 'Secondary. Use the same direction but drop greedier damage if dungeon deaths reset coin / EXP progress.',
    strengths: ['Top Boss Rush AoE once mastery is online', 'Forge path makes the class farmable without pure Class Item RNG'],
    weaknesses: ['Needs Floor 40+ or 50 Sukuna fragments', 'Mastery investment before the kit feels complete'],
    lastChecked: CONTENT_LAST_CHECKED,
    patch: CONTENT_PATCH,
    dataStatus: 'Community-tested',
  },
  'sinister-trigger': {
    bestMode: 'Dungeon clear',
    bestAspect: 'Aspect direction (unverified): damage uptime',
    altAspect: 'Aspect direction (unverified): burst for short boss windows',
    statPriority: 'Damage > Cooldown > Mobility (general priority, unverified point spreads)',
    gearFocus: 'Clear-speed weapons and uptime stats; avoid tank stacking that slows dungeon cycles',
    rotation: 'Keep damage uptime rolling → clear packs without resetting buff windows → bank burst for dungeon bosses',
    bossRushSetup: 'Alt. Only if your clear is already stable; dungeon value is the main reason to chase this Exotic.',
    dungeonSetup: 'Primary. Build for pack clear speed and boss uptime, not long Boss Rush sustain.',
    strengths: ['Elite dungeon clear speed', 'High damage uptime profile'],
    weaknesses: ['~0.05% Exotic roll with no Forge shortcut', 'Bad investment if you mainly push Boss Rush'],
    lastChecked: CONTENT_LAST_CHECKED,
    patch: CONTENT_PATCH,
    dataStatus: 'Community-tested',
  },
  'honored-one': {
    bestMode: 'Solo',
    bestAspect: 'Aspect direction (unverified): control / damage',
    altAspect: 'Aspect direction (unverified): sustain for safer Boss Rush farming',
    statPriority: 'Damage > Cooldown > Survivability (general priority, unverified point spreads)',
    gearFocus: 'Solo consistency gear; keep control tools online while leveling toward Unrestricted',
    rotation: 'Establish control → deal damage in safe windows → reset only after the room is stable',
    bossRushSetup: 'Strong secondary. Use for Gojo fragment / Class Item farms while leveling to 25.',
    dungeonSetup: 'Use when you need a safer solo clearer before endgame checklist farms.',
    strengths: ['S-tier combat value', 'Required bridge into Unrestricted'],
    weaknesses: ['Shares Floor 40+ / Floor 100 grind', 'More checklist work after unlock'],
    lastChecked: CONTENT_LAST_CHECKED,
    patch: CONTENT_PATCH,
    dataStatus: 'Community-tested',
  },
  unrestricted: {
    bestMode: 'Endgame',
    bestAspect: 'Aspect direction (unverified): endgame damage',
    altAspect: 'Aspect direction (unverified): sustain until clears are consistent',
    statPriority: 'Damage > Cooldown > Survivability (general priority, unverified point spreads)',
    gearFocus: 'Endgame damage pieces after the checklist unlock; do not over-invest before Honored One 25 is done',
    rotation: 'Hold burst for elites / bosses → keep uptime between packs → avoid deaths that waste coin sinks',
    bossRushSetup: 'Use after unlock for deep clears; farm prep still happens on Honored One.',
    dungeonSetup: 'Strong once unlocked; checklist cost means this is not an early main.',
    strengths: ['Top-end ceiling', 'Checklist unlock instead of pure Boss Rush RNG'],
    weaknesses: ['Heavy coin / fragment checklist', 'Requires Honored One progression first'],
    lastChecked: CONTENT_LAST_CHECKED,
    patch: CONTENT_PATCH,
    dataStatus: 'Community-tested',
  },
};

export function getBuildProfile(slug: string): BuildProfile | undefined {
  return buildProfiles[slug];
}

export function isBuildPublishReady(profile: BuildProfile | undefined): boolean {
  if (!profile) return false;
  // Require a concrete Aspect name (not a role/direction phrase) before claiming "Best build".
  if (!profile.bestAspect || profile.bestAspect.trim().length < 3 || VAGUE_BUILD_RE.test(profile.bestAspect)) {
    return false;
  }
  if (VAGUE_BUILD_RE.test(profile.altAspect) || VAGUE_BUILD_RE.test(profile.statPriority)) {
    return false;
  }
  const fields = [profile.gearFocus, profile.rotation, profile.bossRushSetup || profile.dungeonSetup];
  const filled = fields.filter((value) => value && value.trim().length >= 12 && !VAGUE_BUILD_RE.test(value));
  return filled.length >= 2;
}

export function isIndexableBuild(item: ClassEntry) {
  return isIndexableClass(item) && isBuildPublishReady(getBuildProfile(item.slug));
}

export const seoEntries: SeoEntry[] = [
  {
    url: '/classes',
    title: 'Dungeon Lootr Classes [UPDATE 1] – All Classes & Unlocks',
    description:
      'Browse the Dungeon Lootr class directory after UPDATE 1: Spell Breaker, Cryomancer, Coyote, Dark Professor, plus spin, Boss Rush, Forge and quest unlocks.',
    opening:
      'Dungeon Lootr has expanded after UPDATE 1, which added Spell Breaker, Cryomancer, Coyote and Dark Professor. Use the directory below to compare classes and open individual unlock guides.',
    h1: 'Dungeon Lootr Classes – All Classes After UPDATE 1',
    type: 'database',
  },
  {
    url: '/class-tier-list',
    title: 'Dungeon Lootr Tier List [UPDATE 1] – Best Classes',
    description:
      'Dungeon Lootr class rankings after UPDATE 1 for Boss Rush, dungeon clear, solo, farming and endgame. New Exotic classes stay unrated until we have reliable combat information.',
    opening:
      'This ranking covers classes we can actually judge by mode. Spell Breaker, Cryomancer, Coyote and Dark Professor are listed separately until enough reliable UPDATE 1 gameplay is available.',
    h1: 'Dungeon Lootr Tier List [UPDATE 1] – All Classes Ranked',
    type: 'tier',
  },
  {
    url: '/update-1',
    title: 'Dungeon Lootr UPDATE 1 – New Classes, Codes & Magic Unleashed',
    description:
      'Everything new in Dungeon Lootr UPDATE 1, including Spell Breaker, Cryomancer, Coyote, Dark Professor, new codes and confirmed update content.',
    opening:
      'UPDATE 1 launched on September 7, 2026 with four new Exotic classes — Spell Breaker, Cryomancer, Coyote and Dark Professor — plus related Magic Unleashed content and new codes.',
    h1: 'Dungeon Lootr UPDATE 1 Guide',
    type: 'guide',
  },
  {
    url: '/boss-rush',
    title: 'Dungeon Lootr Boss Rush Guide - Key Floors, Class Drops & Best Push Classes',
    description:
      'Hit the Boss Rush floors that drop classes and fragments, see farming routes, and pick a class that actually pushes deeper.',
    opening:
      'Boss Rush is where endgame classes and fragments lock to floor milestones - miss the breakpoint and you farm the wrong loop for hours.',
    h1: 'Dungeon Lootr Boss Rush Guide',
    type: 'hub',
  },
  {
    url: '/drop-rates',
    title: 'Dungeon Lootr Drop Rates - Boss, Class Item & Fragment Chances',
    description:
      'Check Dungeon Lootr drop rates for boss loot, class items, fragments, and rare materials, with last-checked patch dates and farming notes.',
    opening:
      'Dungeon Lootr drop rates vary by boss, dungeon, difficulty, and reward condition, so the best farming route depends on exactly what you are chasing.',
    h1: 'Dungeon Lootr Drop Rates',
    type: 'database',
  },
  {
    url: '/tools/drop-chance-calculator',
    title: 'Dungeon Lootr Drop Chance Calculator – Estimate Runs',
    description:
      'Enter a drop rate and target confidence to estimate expected attempts plus 50%, 75%, 90%, 95% and 99% thresholds.',
    opening:
      'Paste any constant drop rate and see expected wait vs cumulative chance across independent attempts. Default 2% is an example only — not a game drop claim.',
    h1: 'Dungeon Lootr Drop Chance Calculator',
    type: 'tool',
  },
];

export const classes: ClassEntry[] = [
  {
    slug: 'cursed-king',
    name: 'Cursed King',
    rarity: 'Mythic',
    rarityConflictNote:
      'Rarity label pending in-game confirm. Some community guides list this as Exotic instead of Mythic.',
    obtain: 'Boss Rush Floor 40+ Class Item, or Forge with 50 Sukuna fragments',
    mode: 'Boss Rush',
    aspect: 'Burst / sustain Aspect',
    tier: 'S',
    confidence: 'conflicting',
    opening:
      'Cursed King (Sukuna) is an S-tier Boss Rush class focused on high damage and AoE, with strong value once mastery is leveled. This overview covers its tier, combat role, strengths, weaknesses, and build direction.',
    strengths: ['Top-tier Boss Rush damage and AoE', 'Forge path removes pure RNG dependence', 'Strong once mastery is leveled'],
    weaknesses: ['Needs Floor 40+ or repeated Floor 100 fragment farms', 'Mastery investment before full kit value'],
    unlockSteps: [
      'Reach level 67+ so you can enter Boss Rush (dungeons are the fastest EXP route).',
      'Option A: push Floor 40+ and farm the Cursed King / Cursed Shrine Class Item drop (higher floors = better odds).',
      'Option B: create a Boss Rush lobby with Sukuna as the main boss, clear Floor 100 for 8–18 fragments, then craft at the Forge with 50 fragments.',
      'After unlock, raise mastery; at Mastery 50 you can buy the King of Curses title near the Boss Rush portal for 1,000,000 coins.',
    ],
    buildNotes: [
      'Prioritize clear consistency before greedier damage Aspects.',
      'Spend early mastery on core cleave / slash damage nodes first.',
      'Use Boss Rush as the main value loop after unlock.',
    ],
  },
  {
    slug: 'honored-one',
    name: 'Honored One',
    rarity: 'Mythic',
    rarityConflictNote:
      'Rarity label pending in-game confirm. Some community guides list this as Exotic instead of Mythic.',
    obtain: 'Boss Rush Floor 40+ Class Item, or Forge with 50 Gojo fragments',
    mode: 'Solo',
    aspect: 'Control / damage Aspect',
    tier: 'S',
    confidence: 'conflicting',
    opening:
      'Honored One is S-tier and the bridge into Unrestricted: farm the Boss Rush Class Item from Floor 40+, or Forge it with 50 Gojo fragments.',
    strengths: ['S-tier combat value', 'Required stepping stone for Unrestricted', 'Forge backup path via Gojo fragments'],
    weaknesses: ['Shares the Floor 40+ / Floor 100 fragment grind', 'You still need more materials later for Unrestricted'],
    unlockSteps: [
      'Enter Boss Rush and target Gojo when farming fragments.',
      'Farm Class Item drops from Floor 40+, or clear Floor 100 for 8–18 Gojo fragments per clear.',
      'Craft the Class Item at the Forge once you have 50 Gojo fragments.',
      'Level Honored One toward 25 if your next chase is Unrestricted.',
    ],
    buildNotes: [
      'Build for solo consistency and control windows.',
      'Keep this class leveled if Unrestricted is your end target.',
    ],
  },
  {
    slug: 'unrestricted',
    name: 'Unrestricted',
    rarity: 'Secret',
    rarityConflictNote:
      'Rarity label pending in-game confirm. Some community guides list this as Exotic instead of Secret.',
    obtain: 'Level 75, 500K coins, Honored One Lv 25, 10 Heavenly Fragments',
    mode: 'Endgame',
    aspect: 'Endgame damage Aspect',
    tier: 'S',
    confidence: 'conflicting',
    opening:
      'Unrestricted is an S-tier endgame chase: player level 75, 500K coins, Honored One level 25, and 10 Heavenly Fragments.',
    strengths: ['Top-end class ceiling', 'Clear checklist unlock (not pure Boss Rush RNG)', 'Pairs with Honored One progression'],
    weaknesses: ['Heavy checklist and coin cost', 'Heavenly Fragment farm can stall'],
    unlockSteps: [
      'Unlock and level Honored One to 25 first.',
      'Reach player level 75 and bank 500,000 coins.',
      'Farm Heavenly Fragments (about 5% from Challenge Mode bosses that spawn every 10 waves).',
      'Spend the checklist once you have 10 Heavenly Fragments.',
    ],
    buildNotes: [
      'Do not start this farm until Honored One and coin income are stable.',
      'Use the drop calculator on the 5% Heavenly Fragment rate before long Challenge Mode sessions.',
    ],
  },
  {
    slug: 'awakened-devil-ex',
    name: 'Awakened Devil EX',
    rarity: 'Secret',
    rarityConflictNote:
      'Rarity label pending in-game confirm. Some community guides list this as Exotic instead of Secret.',
    obtain: 'Azure Devil Lv 50, 1,000,000 coins, 1 Devil Heart',
    mode: 'Burst',
    aspect: 'Burst amplification Aspect',
    tier: 'S',
    confidence: 'conflicting',
    opening:
      'Awakened Devil EX needs Azure Devil level 50, 1,000,000 coins, and one Devil Heart from Awakened Devil in Frostspire NM.',
    strengths: ['S-tier burst potential', 'Checklist unlock once materials are ready'],
    weaknesses: ['Requires Azure Devil progression first', 'Devil Heart farm can be the long pole'],
    unlockSteps: [
      'Unlock and level Azure Devil to 50.',
      'Save 1,000,000 coins.',
      'Farm Devil Heart from the Awakened Devil boss in Frostspire Nightmare.',
      'Complete the exchange once all three requirements are ready.',
    ],
    buildNotes: [
      'Build around burst windows once unlocked.',
      'Farm Frostspire NM only with a stable clear first.',
    ],
  },
  {
    slug: 'dreadlord',
    name: 'Dreadlord',
    rarity: 'Legendary',
    obtain: '1% Underworld Glaive drop from Underworld Gate Nightmare',
    mode: 'Survival',
    aspect: 'Sustain / control Aspect',
    tier: 'S',
    confidence: 'probable',
    opening:
      'Dreadlord is S-tier survival pressure: farm the Underworld Glaive at about 1% from Underworld Gate Nightmare.',
    strengths: ['High-end survival class', 'Simple single-item chase'],
    weaknesses: ['1% drop means long expected runs', 'Needs a stable Nightmare clear first'],
    unlockSteps: [
      'Prepare a build that can clear Underworld Gate Nightmare consistently.',
      'Farm for Underworld Glaive (~1% drop).',
      'Use the drop calculator before committing to a long 1% grind.',
    ],
    buildNotes: [
      'Lean into sustain Aspects; dying mid-run wastes the rare farm.',
    ],
  },
  {
    slug: 'sinister-trigger',
    name: 'Sinister Trigger',
    rarity: 'Exotic',
    obtain: 'Class roll (~0.05% Exotic)',
    mode: 'Dungeon clear',
    aspect: 'Damage uptime Aspect',
    tier: 'S',
    confidence: 'probable',
    opening:
      'Sinister Trigger is an S-tier Exotic roll (~0.05%) built for fast dungeon clears and high damage uptime.',
    strengths: ['Elite clear speed', 'Strong dungeon damage profile'],
    weaknesses: ['Extremely rare class roll', 'No Forge shortcut like Boss Rush classes'],
    unlockSteps: [
      'Spend rolls only when you can afford the Exotic chase.',
      'Use codes / stone bundles to stretch roll sessions.',
      'If you hit it, move straight into a clear-speed build.',
    ],
    buildNotes: [
      'Prioritize damage uptime Aspects and dungeon clear routes.',
    ],
  },
  {
    slug: 'witch-gunner',
    name: 'Witch Gunner',
    rarity: 'Legendary',
    obtain: 'Class roll (~8% Legendary)',
    mode: 'Ranged clear',
    aspect: 'Range / damage Aspect',
    tier: 'S',
    confidence: 'probable',
    opening:
      'Witch Gunner is an S-tier Legendary roll (~8%) with safer ranged clears for progression and farming.',
    strengths: ['Ranged safety', 'Strong enough to stay in S-tier discussion', 'More obtainable than Exotic/Secret chases'],
    weaknesses: ['Still RNG-dependent on rolls', 'Lower ceiling than top Boss Rush secrets for some players'],
    unlockSteps: ['Roll for Legendary classes until Witch Gunner drops.', 'Redeem codes for extra roll resources when available.'],
    buildNotes: ['Keep range and clear speed first; use it as a safe farmer while chasing Boss Rush classes.'],
  },
  {
    slug: 'shadow-vagrant',
    name: 'Shadow Vagrant',
    rarity: 'Legendary',
    obtain: 'No confirmed obtain method yet (community)',
    mode: 'Solo',
    aspect: 'Damage uptime Aspect',
    tier: 'S',
    confidence: 'unverified',
    opening:
      'Shadow Vagrant shows up on community S-tier lists as a solo-consistency pick - but the unlock route is still unconfirmed, so verify in-game before farming.',
    strengths: ['Appears on multiple community S-tier lists', 'Solo consistency profile once owned'],
    weaknesses: ['No confirmed unlock route published yet', 'Do not plan farms around rumors'],
    unlockSteps: [
      'Community guides currently list Shadow Vagrant as having no confirmed obtain method.',
      'Check the live in-game unlock panel / Discord before spending resources.',
      'Do not treat unofficial chat recipes as verified until they match the game UI.',
    ],
    buildNotes: ['Build for uptime and solo survivability only after the unlock path is confirmed in-game.'],
  },
  {
    slug: 'anti-magic',
    name: 'Anti Magic',
    rarity: 'Legendary',
    obtain: 'Boss Rush Floor 40+ Class Item, or Forge with 50 Asta fragments',
    mode: 'Boss Rush',
    aspect: 'Survival / uptime Aspect',
    tier: 'A',
    confidence: 'probable',
    opening:
      'Anti Magic is A-tier Boss Rush: Floor 40+ Class Item drops, or Forge with 50 Asta fragments from Floor 100 clears.',
    strengths: ['Same dual-path system as Cursed King / Honored One', 'Reliable Boss Rush farming class'],
    weaknesses: ['Usually ranked below the absolute S-tier Boss Rush picks'],
    unlockSteps: [
      'Select Asta as the Boss Rush main boss when fragment farming.',
      'Farm Class Item from Floor 40+, or collect 8–18 Asta fragments per Floor 100 clear until you reach 50.',
      'Craft at the Forge.',
    ],
    buildNotes: ['Lean survival/uptime for deeper Boss Rush pushes.'],
  },
  {
    slug: 'azure-devil',
    name: 'Azure Devil',
    rarity: 'Celestial',
    obtain: 'Class roll (~0.5% Celestial)',
    mode: 'Burst',
    aspect: 'Burst Aspect',
    tier: 'A',
    confidence: 'probable',
    opening:
      'Azure Devil is an A-tier Celestial roll (~0.5%) and the required base class for Awakened Devil EX.',
    strengths: ['Burst kit', 'Required for Awakened Devil EX'],
    weaknesses: ['Celestial roll RNG', 'Needs heavy follow-up investment for the EX upgrade'],
    unlockSteps: [
      'Roll Celestial until Azure Devil drops (~0.5%).',
      'For Awakened Devil EX: level Azure Devil to 50, bank 1,000,000 coins, and farm 1 Devil Heart.',
      'For Jetstream: reach Azure Devil Mastery 50, then continue the Jetstream NPC quest (3 Devil Hearts + Exotic Shattered Armor + 200K coins).',
    ],
    buildNotes: ['Treat this as both a burst class and an unlock stepping stone.'],
  },
  {
    slug: 'artemis',
    name: 'Artemis',
    rarity: 'Celestial',
    obtain: 'Class roll (~0.5% Celestial)',
    mode: 'Dungeon clear',
    aspect: 'Precision / damage Aspect',
    tier: 'A',
    confidence: 'probable',
    opening: 'Artemis is an A-tier Celestial roll (~0.5%) aimed at precise dungeon clear damage.',
    strengths: ['Strong clear profile', 'Celestial power band'],
    weaknesses: ['Roll RNG', 'Not a Boss Rush Forge shortcut class'],
    unlockSteps: ['Roll for Celestial classes.', 'Move into dungeon-clear Aspects after unlock.'],
    buildNotes: ['Prioritize clear speed and boss-window damage.'],
  },
  {
    slug: 'forge-archon',
    name: 'Forge Archon',
    rarity: 'Celestial',
    obtain: 'Class roll (~0.5% Celestial)',
    mode: 'Endgame',
    aspect: 'Forge-scaling Aspect',
    tier: 'A',
    confidence: 'probable',
    opening: 'Forge Archon is an A-tier Celestial (~0.5%) that rewards players already investing in Forge progression.',
    strengths: ['Fits Forge-focused accounts', 'A-tier combat value'],
    weaknesses: ['Celestial roll gate', 'Needs Forge investment to feel worth it'],
    unlockSteps: ['Roll Celestial for Forge Archon.', 'Pair with Forge materials and endgame loops.'],
    buildNotes: ['Spend resources on Forge value only after your main class route is stable.'],
  },
  {
    slug: 'jetstream',
    name: 'Jetstream',
    rarity: 'Secret',
    obtain: 'Jetstream NPC quest: Azure Devil Mastery 50, 3 Devil Hearts, Exotic Shattered Armor, 200K coins',
    mode: 'Mobility',
    aspect: 'Mobility / damage Aspect',
    tier: 'A',
    confidence: 'probable',
    opening: 'Jetstream is an A-tier secret quest class: Azure Devil Mastery 50, 3 Devil Hearts, Exotic Shattered Armor, then 200K coins at the blue-boat NPC.',
    strengths: ['Secret quest unlock (not a class spin)', 'Strong mobility clear identity once finished'],
    weaknesses: ['Long multi-dungeon quest', 'Needs Azure Devil Celestial roll first', 'Underworld Nightmare Exotic armor farm'],
    unlockSteps: [
      'Start at the Jetstream NPC on the blue boat across the water from Starter Island (behind the rock archway).',
      'Obtain Azure Devil (Celestial ~0.5% class roll) and reach Mastery 50 on that class.',
      'Collect 3 Devil Hearts from Awakened Devil in Frostspire (~35% each). Unlock Frostspire by clearing The Catacombs on Hard.',
      'Unlock Underworld by clearing Frostspire on Nightmare, then farm Exotic Shattered Armor from Scarlet Knight on Underworld Nightmare (not craftable; lower difficulties do not drop it).',
      'Return to the Jetstream NPC and pay 200,000 coins for the Cybernetic Katana to unlock the class.',
    ],
    buildNotes: ['Use mobility Aspects and avoid over-stacking survival if clears are already stable.'],
  },
  {
    slug: 'streamline',
    name: 'Streamline',
    rarity: 'Epic',
    obtain: 'No confirmed obtain method yet (community)',
    mode: 'Dungeon clear',
    aspect: 'Speed / uptime Aspect',
    tier: 'A',
    confidence: 'unverified',
    opening: 'Streamline is listed as an A-tier progression clearer, but the obtain method is still unconfirmed - use this page for tier/mode context until the live unlock is verified.',
    strengths: ['Listed as an A-tier progression clearer in community tier lists'],
    weaknesses: ['Obtain method still marked TBC / unconfirmed in community guides'],
    unlockSteps: [
      'Community guides do not publish a confirmed Streamline unlock recipe yet.',
      'Verify the live class panel in-game before farming for it.',
    ],
    buildNotes: ['Speed and uptime over luxury stats once the unlock is confirmed.'],
  },
  {
    slug: 'boxer',
    name: 'Boxer',
    rarity: 'Epic',
    obtain: 'Class roll (~20% Epic)',
    mode: 'Early progression',
    aspect: 'Damage / survival Aspect',
    tier: 'B',
    confidence: 'probable',
    opening: 'Boxer is a B-tier Epic roll (~20%) for early/mid comfort - good for progression, not the endgame ceiling.',
    strengths: ['Easy to roll', 'Smooth early progression'],
    weaknesses: ['Outscaled by Mythic/Celestial/Secret targets'],
    unlockSteps: ['Roll Epic until Boxer appears, or use it if it drops early.'],
    buildNotes: ['Keep a balanced damage/survival setup and swap once a higher tier unlock is ready.'],
  },
  {
    slug: 'spell-breaker',
    name: 'Spell Breaker',
    rarity: 'Exotic',
    obtain: 'UPDATE 1 class. Community guides disagree on the exact unlock (Raid Shop currency vs Magic Unleashed weapon). Check the live shop / raid UI.',
    mode: 'Melee',
    aspect: 'Not documented',
    tier: 'Unrated',
    confidence: 'unverified',
    patch: 'UPDATE 1',
    bestFor: 'Testing melee UPDATE 1 kits',
    opening:
      'Spell Breaker is one of four Exotic classes added in Dungeon Lootr UPDATE 1 on September 7, 2026. Community write-ups treat it as a close-range option, but they do not agree on the unlock recipe, so this page does not publish a farm as fact.',
    strengths: [
      'Part of the current UPDATE 1 roster, so it is relevant to new-content searches.',
      'Public coverage consistently frames it as a melee / physical UPDATE 1 class.',
    ],
    weaknesses: [
      'Unlock method is still disputed across community guides.',
      'No ranking, skill names, or damage numbers are confirmed on this wiki.',
    ],
    unlockSteps: [
      'Read the UPDATE 1 guide for the current public picture, including conflicting shop vs event-weapon reports.',
      'Confirm the live Classes, Raid Shop, or Magic Unleashed UI before spending currency.',
      'Do not follow a guide that publishes skill multipliers this wiki has not checked in game.',
    ],
    buildNotes: [
      'Skip copied “best Aspect” lists until an in-game kit is verified.',
      'If you already own it, treat clears as testing — not a published build.',
    ],
  },
  {
    slug: 'cryomancer',
    name: 'Cryomancer',
    rarity: 'Exotic',
    obtain: 'UPDATE 1 class. Community guides disagree on the exact unlock (Raid Shop currency vs Magic Unleashed wand). Check the live shop / raid UI.',
    mode: 'Ranged / magic',
    aspect: 'Not documented',
    tier: 'Unrated',
    confidence: 'unverified',
    patch: 'UPDATE 1',
    bestFor: 'Testing ranged UPDATE 1 kits',
    opening:
      'Cryomancer is an UPDATE 1 Exotic class. Public posts usually describe a ranged ice / magic identity, but they split on whether you buy it from a raid shop or unlock it by equipping a Magic Unleashed wand.',
    strengths: [
      'Named in every major UPDATE 1 class roundup we checked.',
      'Consistently described as the ranged counterpart to Spell Breaker.',
    ],
    weaknesses: [
      'Shop price, currency name, and weapon-unlock claims currently conflict.',
      'Skill names and rankings are not confirmed here.',
    ],
    unlockSteps: [
      'Use the UPDATE 1 guide to see which claims are in conflict.',
      'Verify the live event shop and class panel before farming a currency that may not be the real cost.',
      'Leave drop-rate math out of the plan until a single in-game source is confirmed.',
    ],
    buildNotes: [
      'No Aspect recommendation is published until the kit is verified.',
      'Compare it against existing ranged farmers such as Witch Gunner only after you own both.',
    ],
  },
  {
    slug: 'coyote',
    name: 'Coyote',
    rarity: 'Exotic',
    obtain: 'UPDATE 1 class. Several community guides describe a paid bundle rather than a class spin. Bundle SKU and price are not confirmed here.',
    mode: 'Magic',
    aspect: 'Not documented',
    tier: 'Unrated',
    confidence: 'unverified',
    patch: 'UPDATE 1',
    bestFor: 'Only if you already have the bundle, or after in-game confirmation',
    opening:
      'Coyote is an UPDATE 1 Exotic class. Multiple community guides say it is bundle-locked instead of a normal spin, but this wiki has not confirmed the product name, price, or whether a free route exists.',
    strengths: [
      'Confirmed as one of the four UPDATE 1 class names.',
      'If the bundle reports are right, it is not competing with spin pity for the other three.',
    ],
    weaknesses: [
      'May be paywalled — unconfirmed.',
      'No verified combat role, skills, or tier placement.',
    ],
    unlockSteps: [
      'Check the live Roblox/game store before buying anything based on a third-party guide.',
      'Do not assume a raid-farm alternative unless the in-game UI shows one.',
      'If you already own Coyote, use the class page and UPDATE 1 notes rather than copied damage tables.',
    ],
    buildNotes: [
      'No published rotation or Aspect until the kit is recorded in game.',
    ],
  },
  {
    slug: 'dark-professor',
    name: 'Dark Professor',
    rarity: 'Exotic',
    obtain: 'UPDATE 1 class. Community reports describe a late-game raid chase, but raid name, difficulty, and drop rate currently conflict, so no rate is listed here.',
    mode: 'Magic',
    aspect: 'Not documented',
    tier: 'Unrated',
    confidence: 'unverified',
    patch: 'UPDATE 1',
    bestFor: 'Late-game testing after UPDATE 1 raids are confirmed',
    opening:
      'Dark Professor is the UPDATE 1 Exotic class most often described as a late raid chase. Guides disagree on the raid name, required difficulty, and drop rate, so this wiki does not publish a percentage or a skill list.',
    strengths: [
      'Widely listed as the hardest of the four UPDATE 1 classes to obtain.',
      'Worth tracking if you are already pushing the new raid content.',
    ],
    weaknesses: [
      'Unlock details are the most conflicted of the four new classes.',
      'Skill names and multipliers circulating online are not treated as confirmed.',
    ],
    unlockSteps: [
      'Open the UPDATE 1 guide for the conflicting raid-drop claims, then confirm against the live raid panel.',
      'Do not plan a 0.5% farm from a third-party article until the in-game drop text matches.',
      'Use the drop calculator only after you have a rate you personally confirmed.',
    ],
    buildNotes: [
      'Ignore copied skill names (and any x damage multipliers) until they match the in-game kit.',
    ],
  },
  dirClass({
    slug: 'ronin',
    name: 'Ronin',
    rarity: 'Rare',
    obtain: 'Class roll (Rare band, community ~70%). Also reported as the tutorial class.',
    mode: 'Early progression',
    bestFor: 'Starter clears',
  }),
  dirClass({
    slug: 'greatsword',
    name: 'Greatsword',
    rarity: 'Rare',
    obtain: 'Class roll (Rare band, community ~70%)',
    mode: 'Early progression',
    bestFor: 'Starter melee',
  }),
  dirClass({
    slug: 'bowman',
    name: 'Bowman',
    rarity: 'Rare',
    obtain: 'Class roll (Rare band, community ~70%)',
    mode: 'Ranged clear',
    bestFor: 'Starter ranged',
  }),
  dirClass({
    slug: 'flame-bastion',
    name: 'Flame Bastion',
    rarity: 'Epic',
    obtain: 'Class roll (Epic band, community ~20%)',
    mode: 'Early progression',
    bestFor: 'Early Epic option',
  }),
  dirClass({
    slug: 'assassin',
    name: 'Assassin',
    rarity: 'Epic',
    obtain: 'Class roll (Epic band, community ~20%)',
    mode: 'Early progression',
    bestFor: 'Early Epic option',
  }),
  dirClass({
    slug: 'archer',
    name: 'Archer',
    rarity: 'Legendary',
    obtain: 'Class roll (Legendary band, community ~8%)',
    mode: 'Ranged clear',
    bestFor: 'Spin-pool ranged',
  }),
  dirClass({
    slug: 'shinobi',
    name: 'Shinobi',
    rarity: 'Legendary',
    obtain: 'Class roll (Legendary band, community ~8%)',
    mode: 'Dungeon clear',
    bestFor: 'Spin-pool Legendary',
  }),
  dirClass({
    slug: 'kage',
    name: 'Kage',
    rarity: 'Legendary',
    obtain: 'Class roll (Legendary band, community ~8%)',
    mode: 'Dungeon clear',
    bestFor: 'Spin-pool Legendary',
  }),
  dirClass({
    slug: 'divergent',
    name: 'Divergent',
    rarity: 'Mythic',
    obtain: 'Class roll (Mythic band, community ~2%)',
    mode: 'Not ranked',
    bestFor: 'Spin-pool Mythic',
  }),
  dirClass({
    slug: 'wanderer',
    name: 'Wanderer',
    rarity: 'Mythic',
    obtain: 'Class roll (Mythic band, community ~2%)',
    mode: 'Not ranked',
    bestFor: 'Spin-pool Mythic',
  }),
  dirClass({
    slug: 'cursed-child',
    name: 'Cursed Child',
    rarity: 'Mythic',
    obtain: 'Class roll (Mythic band, community ~2%)',
    mode: 'Not ranked',
    bestFor: 'Spin-pool Mythic',
  }),
  dirClass({
    slug: 'vacio',
    name: 'Vacio',
    rarity: 'Celestial',
    obtain: 'Class roll (Celestial band, community ~0.5%)',
    mode: 'Not ranked',
    bestFor: 'Spin-pool Celestial',
  }),
  dirClass({
    slug: 'founder',
    name: 'Founder',
    rarity: 'Unconfirmed',
    obtain: 'Not confirmed. Community lists include the name but do not agree on a reliable unlock.',
    confidence: 'unverified',
    bestFor: 'Unknown until the live panel is checked',
  }),
  dirClass({
    slug: 'demonbane',
    name: 'Demonbane',
    rarity: 'Unconfirmed',
    obtain: 'Not confirmed. Community tier lists mention the name; rarity and unlock currently disagree.',
    confidence: 'unverified',
    bestFor: 'Unknown until the live panel is checked',
  }),
];

export type GuideEntry = {
  slug: string;
  target: string;
  title: string;
  opening: string;
  requirements: string[];
  steps: string[];
  tips: string[];
  next: string[];
};

export const guides: GuideEntry[] = [
  {
    slug: 'how-to-get-cursed-king',
    target: 'Cursed King',
    title: 'How to Get Cursed King (Sukuna) in Dungeon Lootr – 2 Ways',
    opening:
      'Cursed King (Sukuna) has two Boss Rush unlock routes: a Floor 40+ Class Item drop and a 50-fragment Forge route. The better choice depends on how far you can reliably push Boss Rush — compare both routes, requirements, and farming methods below.',
    requirements: [
      'Level 67+ for Boss Rush access',
      'A build that can reach Floor 40+ (drops) or Floor 100 (fragments)',
      '50 Sukuna fragments if using the Forge path',
    ],
    steps: [
      'Reach Boss Rush (level 67+; dungeon clears are the fastest EXP).',
      'Lucky path: push Floor 40+ and farm the Cursed King / Cursed Shrine Class Item. Higher floors improve drop odds.',
      'Forge path: create a lobby with Sukuna as main boss, clear Floor 100 for 8–18 fragments per win, stop at 50.',
      'Craft the Class Item at the Forge, then level mastery. Optional: Mastery 50 + 1,000,000 coins for the King of Curses title.',
    ],
    tips: [
      'Do not farm below Floor 40 if you only want the Class Item drop.',
      'Fragment path is slower but more deterministic than pure Class Item RNG.',
      'Join the ClickBytes group before redeeming codes that fund the grind.',
    ],
    next: ['/builds/cursed-king', '/tools/drop-chance-calculator', '/boss-rush/floor-100'],
  },
  {
    slug: 'how-to-get-honored-one',
    target: 'Honored One',
    title: 'How to Get Honored One in Dungeon Lootr',
    opening:
      'Honored One uses the same Boss Rush system as Cursed King, but you target Gojo: Floor 40+ Class Item or 50 Gojo fragments at the Forge.',
    requirements: [
      'Boss Rush access',
      'Gojo selected as the lobby main boss for fragment farming',
      '50 Gojo fragments for Forge crafting',
    ],
    steps: [
      'Enter Boss Rush and decide drop farming vs fragment crafting.',
      'Farm Class Item from Floor 40+, or clear Floor 100 with Gojo selected for 8–18 fragments each clear.',
      'Craft at the Forge at 50 fragments.',
      'If Unrestricted is next, keep leveling Honored One to 25 while banking coins and Heavenly Fragments.',
    ],
    tips: [
      'Honored One is both a strong class and an unlock bridge - do not reset progress if Unrestricted is your goal.',
      'Same Floor 40 rule: Class Item drops do not start earlier.',
    ],
    next: ['/classes/honored-one', '/guides/how-to-get-unrestricted', '/guides/heavenly-fragments'],
  },
  {
    slug: 'how-to-get-unrestricted',
    target: 'Unrestricted',
    title: 'How to Get Unrestricted in Dungeon Lootr',
    opening:
      'Unrestricted checklist: player level 75, 500K coins, Honored One level 25, and 10 Heavenly Fragments from Challenge Mode.',
    requirements: [
      'Honored One unlocked and leveled to 25',
      'Player level 75',
      '500,000 coins',
      '10 Heavenly Fragments',
    ],
    steps: [
      'Finish the Honored One unlock and push it to level 25.',
      'Level the account to 75 while stocking 500K coins.',
      'Run Challenge Mode and pick up Heavenly Fragments from bosses that spawn every 10 waves (~5% drop).',
      'Complete the unlock once all four requirements are ready.',
    ],
    tips: [
      'Use the calculator on a 5% rate before long Challenge Mode sessions.',
      'Do not start the coin sink until Honored One leveling is nearly done.',
    ],
    next: ['/classes/unrestricted', '/guides/heavenly-fragments', '/guides/best-aspect-by-class'],
  },
  {
    slug: 'how-to-get-awakened-devil-ex',
    target: 'Awakened Devil EX',
    title: 'How to Get Awakened Devil EX in Dungeon Lootr',
    opening:
      'Awakened Devil EX needs Azure Devil level 50, 1,000,000 coins, and a Devil Heart from Awakened Devil in Frostspire Nightmare.',
    requirements: ['Azure Devil level 50', '1,000,000 coins', '1 Devil Heart (Frostspire NM)'],
    steps: [
      'Unlock Azure Devil (Celestial roll) and level it to 50.',
      'Bank 1,000,000 coins from stable farms.',
      'Clear Frostspire Nightmare and farm Devil Heart from Awakened Devil.',
      'Turn in the checklist for Awakened Devil EX.',
    ],
    tips: ['Treat Azure Devil as a required base class, not an optional detour.', 'Only farm Frostspire NM when clears are consistent.'],
    next: ['/classes/awakened-devil-ex', '/guides/devil-heart', '/tools/drop-chance-calculator'],
  },
  {
    slug: 'how-to-get-dreadlord',
    target: 'Dreadlord',
    title: 'How to Get Dreadlord in Dungeon Lootr',
    opening:
      'Dreadlord unlocks from the Underworld Glaive, about a 1% drop in Underworld Gate Nightmare.',
    requirements: ['Stable Underworld Gate Nightmare clear', 'Patience for a ~1% item farm'],
    steps: [
      'Build a clear that survives Underworld Gate Nightmare repeatedly.',
      'Farm for Underworld Glaive (~1%).',
      'Unlock Dreadlord once the Glaive drops.',
    ],
    tips: [
      'At 1%, expected runs are long - calculate 90%/95% targets before you commit.',
      'Survival failures are worse than slightly slower clears.',
    ],
    next: ['/classes/dreadlord', '/tools/drop-chance-calculator', '/drop-rates'],
  },
  {
    slug: 'how-to-get-anti-magic',
    target: 'Anti Magic',
    title: 'How to Get Anti Magic in Dungeon Lootr',
    opening:
      'Anti Magic uses the Boss Rush dual path: Floor 40+ Class Item drops, or Forge crafting with 50 Asta fragments from Floor 100.',
    requirements: [
      'Boss Rush access',
      'Asta selected as the lobby main boss for fragment farming',
      '50 Asta fragments if using the Forge path',
    ],
    steps: [
      'Enter Boss Rush and choose Class Item farming or fragment crafting.',
      'Farm the Class Item from Floor 40+ (higher floors improve odds), or clear Floor 100 with Asta selected for 8–18 fragments per clear.',
      'Craft the Class Item at the Forge once you have 50 Asta fragments.',
    ],
    tips: [
      'Same Floor 40 rule as Cursed King and Honored One: Class Item drops do not start earlier.',
      'Wrong lobby boss wastes the fragment session.',
    ],
    next: ['/classes/anti-magic', '/boss-rush/floor-100', '/tools/drop-chance-calculator'],
  },
  {
    slug: 'how-to-get-jetstream',
    target: 'Jetstream',
    title: 'How to Get Jetstream in Dungeon Lootr',
    opening:
      'Jetstream is a secret NPC quest: Azure Devil Mastery 50, 3 Devil Hearts, Exotic Shattered Armor, then 200K coins at the blue-boat NPC.',
    requirements: [
      'Azure Devil class at Mastery 50',
      '3 Devil Hearts from Frostspire Awakened Devil',
      'Exotic Shattered Armor from Underworld Nightmare Scarlet Knight',
      '200,000 coins for the Cybernetic Katana',
    ],
    steps: [
      'Talk to the Jetstream NPC on the blue boat across from Starter Island (behind the rock archway).',
      'Roll Azure Devil (~0.5% Celestial) and raise that class to Mastery 50.',
      'Unlock Frostspire by clearing The Catacombs on Hard, then farm Awakened Devil for 3 Devil Hearts (~35% each).',
      'Clear Frostspire Nightmare to unlock Underworld, then farm Scarlet Knight on Underworld Nightmare for Exotic Shattered Armor (not craftable; lower difficulties do not drop it).',
      'Return to the Jetstream NPC and pay 200,000 coins for the Cybernetic Katana.',
    ],
    tips: [
      'Save coins while farming - the katana payment is the final gate.',
      'Nightmare content requires at least level 25; bring strong gear anyway.',
    ],
    next: ['/classes/jetstream', '/guides/devil-heart', '/tools/drop-chance-calculator'],
  },
  {
    slug: 'heavenly-fragments',
    target: 'Heavenly Fragments',
    title: 'How to Get Heavenly Fragments',
    opening:
      'Heavenly Fragments are mainly for Unrestricted: about 5% from Challenge Mode bosses that spawn every 10 waves. You need 10 total.',
    requirements: ['Access to Challenge Mode', 'Unrestricted checklist progress'],
    steps: [
      'Enter Challenge Mode with a stable clear build.',
      'Defeat the bosses that spawn every 10 waves.',
      'Bank Heavenly Fragments until you have 10 for Unrestricted.',
    ],
    tips: ['5% is farmable but streaky - use the calculator.', 'Do not farm fragments before Honored One leveling is underway.'],
    next: ['/guides/how-to-get-unrestricted', '/tools/drop-chance-calculator', '/drop-rates'],
  },
  {
    slug: 'devil-heart',
    target: 'Devil Heart',
    title: 'Devil Heart Drop Rate in Dungeon Lootr',
    opening:
      'Devil Heart drops from the Awakened Devil boss in Frostspire Nightmare and is the rare gate for Awakened Devil EX.',
    requirements: [
      'The Catacombs cleared on Hard (unlocks Frostspire)',
      'Frostspire access for Awakened Devil',
    ],
    steps: [
      'Clear The Catacombs on Hard to unlock Frostspire.',
      'Defeat Awakened Devil in Frostspire for Devil Hearts (~35% community-reported drop).',
      'Use 1 Devil Heart for Awakened Devil EX (with Azure Devil Lv 50 + 1M coins), or bank 3 for the Jetstream quest.',
    ],
    tips: [
      'Jetstream and Awakened Devil EX compete for the same heart farm - plan which unlock you finish first.',
      'Recheck the live drop text after patches.',
    ],
    next: ['/guides/how-to-get-awakened-devil-ex', '/guides/how-to-get-jetstream', '/tools/drop-chance-calculator'],
  },
  {
    slug: 'cursed-fragments',
    target: 'Cursed Fragments',
    title: 'How to Get Cursed Fragments',
    opening:
      'Cursed / Sukuna fragments come from Boss Rush Floor 100 clears with Sukuna selected - expect about 8–18 per clear toward the 50 needed for Cursed King.',
    requirements: ['Boss Rush lobby with Sukuna selected', 'Floor 100 clear ability'],
    steps: [
      'Create Boss Rush with Sukuna as the main boss.',
      'Push to Floor 100 and collect 8–18 fragments per clear.',
      'Stop at 50 and craft Cursed King at the Forge.',
    ],
    tips: [
      'Worst case is closer to 7 clears (if you only hit 8 each time); best case can be 3 clears at 18.',
      'Class Item drops from Floor 40+ can skip this grind entirely if you get lucky.',
    ],
    next: ['/guides/how-to-get-cursed-king', '/boss-rush/floor-100', '/tools/drop-chance-calculator'],
  },
];

export type DropRateEntry = {
  item: string;
  source: string;
  rate: string;
  note: string;
  href: string;
};

export const dropRates: DropRateEntry[] = [
  {
    item: 'Boss Rush Class Item (Cursed King / Honored One / Anti Magic)',
    source: 'Boss Rush Floor 40+',
    rate: 'Starts at Floor 40; higher floors improve odds',
    note: 'No Class Item drop expectation below Floor 40.',
    href: '/boss-rush/floor-40',
  },
  {
    item: 'Sukuna / Gojo / Asta Fragments',
    source: 'Boss Rush Floor 100 main boss',
    rate: '8–18 fragments per clear',
    note: '50 fragments craft the matching Class Item at the Forge.',
    href: '/boss-rush/floor-100',
  },
  {
    item: 'Heavenly Fragments',
    source: 'Challenge Mode bosses every 10 waves',
    rate: '~5%',
    note: 'Need 10 for Unrestricted.',
    href: '/guides/heavenly-fragments',
  },
  {
    item: 'Underworld Glaive (Dreadlord)',
    source: 'Underworld Gate Nightmare',
    rate: '~1%',
    note: 'Long expected farm - use the calculator.',
    href: '/guides/how-to-get-dreadlord',
  },
  {
    item: 'Devil Heart',
    source: 'Awakened Devil in Frostspire',
    rate: '~35% per clear (community)',
    note: 'Need 1 for Awakened Devil EX; need 3 for Jetstream. Unlock Frostspire via Catacombs Hard.',
    href: '/guides/devil-heart',
  },
  {
    item: 'Exotic class roll (Sinister Trigger band)',
    source: 'Class rolls',
    rate: '~0.05%',
    note: 'No Forge bypass - budget rolls carefully.',
    href: '/classes/sinister-trigger',
  },
  {
    item: 'Celestial class roll',
    source: 'Class rolls',
    rate: '~0.5%',
    note: 'Azure Devil, Artemis, Forge Archon band.',
    href: '/classes',
  },
  {
    item: 'Legendary class roll',
    source: 'Class rolls',
    rate: '~8%',
    note: 'Witch Gunner sits in this band on current lists.',
    href: '/classes/witch-gunner',
  },
];

export type CodeEntry = {
  code: string;
  reward: string;
  status: 'active' | 'expired';
  isNew?: boolean;
  addedAt?: string;
  verifiedAt: string;
  source: string;
  patch?: string;
};

const CODES_SOURCE = 'Community codes roundup';

/** Redeem codes are public promo strings; rewards/status are community-checked and can expire without notice. */
export const dungeonLootrCodes: CodeEntry[] = [
  { code: 'UPDATE1', reward: '100 Mage Chests and 10 Normal Chests', status: 'active', isNew: true, addedAt: '2026-09-06', verifiedAt: '2026-09-06', source: CODES_SOURCE, patch: 'UPDATE 1' },
  { code: 'WEEKENDBUFFS', reward: '2X of all Luck Potions', status: 'active', isNew: true, addedAt: '2026-09-06', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: '15KCCU', reward: '5 Luck Potions III', status: 'active', isNew: true, addedAt: '2026-09-06', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: 'COURAGE', reward: '5 Random GM Blessings', status: 'active', isNew: true, addedAt: '2026-09-06', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: 'LOVETHISGAME', reward: '10 Aspect Gems', status: 'active', isNew: true, addedAt: '2026-09-06', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: 'RAIDTIME', reward: '5 Forge Stones Bundle', status: 'active', isNew: true, addedAt: '2026-09-06', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: 'LOOTR', reward: 'Random GM Blessing', status: 'active', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: 'FORGESKIP', reward: '3 Forge Stone Bundles, 3 Reforge Stone Bundles', status: 'expired', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: '8KLIKE', reward: 'Special rewards', status: 'expired', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: '10KFAV', reward: 'Special rewards', status: 'expired', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: 'FULLRELEASE', reward: '3 Luck Potion 3', status: 'expired', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: 'LOOTRISBACK', reward: '3 Forge Stone Bundle', status: 'expired', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: 'JACKPOT', reward: '5 Luck Potion 3', status: 'expired', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: '20KPLAYERS', reward: '5 Reforge Stone Bundle', status: 'expired', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: 'GIVEMEGEMSPLEASE', reward: '3 Aspect Gems', status: 'expired', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: '3KLIKES', reward: 'Expired', status: 'expired', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: '4KFAV', reward: 'Expired', status: 'expired', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: 'EARLYACCESSYAY', reward: 'Expired', status: 'expired', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: 'NEWASPECT', reward: 'Expired', status: 'expired', verifiedAt: '2026-09-06', source: CODES_SOURCE },
  { code: 'BYEMETA', reward: 'Expired', status: 'expired', verifiedAt: '2026-09-06', source: CODES_SOURCE },
];

/** Last time the codes list was reconciled against community roundups. Not deploy time. */
export const codesLastChecked = '2026-09-06';
export const codesLastVerifiedAt = codesLastChecked;

export type UpdateLogEntry = {
  date: string;
  title: string;
  summary: string;
  changes: string[];
  hrefs?: [string, string][];
};

export const updateLog: UpdateLogEntry[] = [
  {
    date: '2026-09-09',
    title: 'UPDATE 1 wiki coverage',
    summary:
      'Repositioned the wiki around UPDATE 1: new pillar page, class directory expansion, and honest handling of conflicting new-class unlock reports.',
    changes: [
      'Added the UPDATE 1 guide covering Spell Breaker, Cryomancer, Coyote, Dark Professor, Magic Unleashed, and codes.',
      'Expanded the class directory with confirmed roster names; listing-only rows do not get thin pages.',
      'Codes page now stores verifiedAt separately from page copy updates, and highlights UPDATE1 without pretending a new in-game audit happened after September 6.',
      'Tier list keeps UPDATE 1 classes unrated instead of inventing S/A placements.',
    ],
    hrefs: [
      ['UPDATE 1 guide', '/update-1'],
      ['Class directory', '/classes'],
      ['Tier list', '/class-tier-list'],
      ['Working codes', '/codes'],
    ],
  },
  {
    date: '2026-09-09',
    title: 'Privacy-safe interaction analytics',
    summary:
      'Added aggregate event tracking for the player actions that make the wiki useful without collecting search text or personal information.',
    changes: [
      'Tracks successful code copies as redemption intent; the wiki cannot observe whether Roblox accepts a code.',
      'Tracks first video play and YouTube outbound clicks.',
      'Tracks drop-calculator use with rate and attempt buckets instead of raw high-cardinality input.',
      'Tracks Class Finder and Aspect Matcher use without sending typed search text.',
    ],
    hrefs: [
      ['Working codes', '/codes'],
      ['Drop calculator', '/tools/drop-chance-calculator'],
      ['Class Finder', '/tools/class-finder'],
    ],
  },
  {
    date: '2026-09-09',
    title: 'Cursed King search intent and unlock guide update',
    summary:
      'Separated the Cursed King unlock guide from the class overview so each page answers a distinct player question.',
    changes: [
      'The unlock guide now compares the existing Class Item and Forge routes before the detailed farming steps.',
      'The class page now leads with tier, Boss Rush role, strengths, weaknesses, and build direction.',
      'Added clearer links between the unlock guide and class overview, plus cleaner search-snippet controls for CTA text.',
      'No new drop rates, damage values, or unverified skill names were added.',
    ],
    hrefs: [
      ['Cursed King unlock guide', '/guides/how-to-get-cursed-king'],
      ['Cursed King class overview', '/classes/cursed-king'],
    ],
  },
  {
    date: '2026-09-07',
    title: 'Evidence and calculator wording pass',
    summary:
      'Tightened rarity conflict notes, demoted unverified Best Build claims to Build Notes, and corrected drop-calculator math copy.',
    changes: [
      'Marked Mythic/Secret labels that conflict with other community Exotic labels as pending in-game confirm.',
      'Build pages without concrete Aspect names stay as Build Notes (noindex) instead of Best Build.',
      'Tier list scope clarified as selected classes; UPD1 names listed as Unrated when untested.',
      'Drop calculator copy now separates expected wait vs cumulative chance; 2% example uses accurate wording.',
    ],
    hrefs: [
      ['Working codes', '/codes'],
      ['Drop calculator', '/tools/drop-chance-calculator'],
      ['Tier list', '/class-tier-list'],
    ],
  },
  {
    date: '2026-09-06',
    title: 'Codes refresh',
    summary:
      'Rebuilt the active Dungeon Lootr codes list after a community codes roundup published new redeem codes and marked older ones expired.',
    changes: [
      'Added active codes: UPDATE1, WEEKENDBUFFS, 15KCCU, COURAGE, LOVETHISGAME, RAIDTIME.',
      'Kept LOOTR active.',
      'Moved FORGESKIP, 8KLIKE, 10KFAV, FULLRELEASE, LOOTRISBACK, JACKPOT, 20KPLAYERS, GIVEMEGEMSPLEASE to expired.',
      'Refreshed /codes last-checked date.',
    ],
    hrefs: [
      ['Working codes', '/codes'],
      ['Drop calculator', '/tools/drop-chance-calculator'],
    ],
  },
];

export const hubPages = [
  [
    'codes',
    'Dungeon Lootr Codes [UPDATE 1]',
    'Latest working Dungeon Lootr codes after UPDATE 1. Copy active codes for chests, luck potions, Aspect Gems, Forge Stones and other rewards.',
    ['Latest codes', 'New UPDATE 1 codes', 'Expired codes', 'How to redeem'],
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

/** Thin hubs kept for UX but kept out of crawl prioritization. */
export const demotedHubSlugs = new Set(['dungeons', 'items', 'progression-guide']);

export function isIndexableHub(slug: string) {
  return !demotedHubSlugs.has(slug);
}

export const bossRushPages = [
  {
    slug: 'floor-40',
    title: 'Boss Rush Floor 40',
    opening:
      'Floor 40 is the first floor where Cursed King, Honored One, and Anti Magic Class Items can drop - do not farm Class Items below this breakpoint.',
    sections: [
      'Class Item drops unlock at Floor 40+ for Cursed King, Honored One, and Anti Magic.',
      'Higher floors improve Class Item odds, so push only while clears stay consistent.',
      'If drops refuse to land, switch to the Floor 100 fragment → Forge path for the same class.',
      'Boss mapping: Sukuna → Cursed King, Gojo → Honored One, Asta → Anti Magic.',
      'Boss Rush entry commonly reported at player level 67+ (dungeon clears for EXP).',
    ],
  },
  {
    slug: 'floor-100',
    title: 'Boss Rush Floor 100',
    opening:
      'Floor 100 is the fragment farm: pick Sukuna, Gojo, or Asta as the lobby boss and expect about 8–18 fragments per clear toward a 50-fragment Forge craft.',
    sections: [
      'Select the boss that matches your class before creating the lobby.',
      'Clear Floor 100 for 8–18 fragments of that boss each successful run.',
      'Stop at 50 fragments and craft the Class Item at the Forge.',
      'Rough math from the 8–18 range: about 3–7 Floor 100 clears depending on fragment rolls.',
      'Floor 100 fragment farming is the deterministic backup when Floor 40+ Class Item RNG stalls.',
    ],
  },
  {
    slug: 'drops',
    title: 'Dungeon Lootr Boss Rush Drops',
    opening:
      'Boss Rush drops split into two loops: Floor 40+ Class Items, and Floor 100 boss fragments for Forge crafting.',
    sections: [
      'Floor 40+: Class Item drop chance turns on and scales with floor.',
      'Floor 100: 8–18 fragments for the selected main boss.',
      'Forge: 50 fragments = one Class Item for Cursed King, Honored One, or Anti Magic.',
      'Track which boss you queued - wrong lobby wastes the entire fragment session.',
      'Related farms outside Boss Rush: Heavenly Fragments (~5% Challenge Mode), Underworld Glaive (~1%), Devil Hearts (~35% Frostspire).',
    ],
  },
];

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

export function isIndexableClass(item: ClassEntry) {
  if (item.listingOnly) return false;
  if (isUpdate1Class(item)) return true;
  return item.confidence !== 'unverified';
}

export function classPages() {
  return classes.filter(hasClassPage);
}

export function classSerp(item: ClassEntry): Serp {
  if (item.slug === 'cursed-king') {
    return {
      title: 'Dungeon Lootr Cursed King (Sukuna) – Skills, Tier & Build',
      description:
        'Review Cursed King (Sukuna) skills, S-tier placement, strengths and weaknesses, current build notes, and Boss Rush performance in Dungeon Lootr.',
      intent: 'Class overview focused on role, tier, strengths, weaknesses, and build notes rather than unlock steps.',
      primaryKeyword: 'Dungeon Lootr Cursed King',
      searchIntent: 'entity',
    };
  }
  if (isUpdate1Class(item)) {
    return {
      title: `${item.name} Dungeon Lootr – How to Get, Skills & Build`,
      description: `${item.name} in Dungeon Lootr UPDATE 1: what is confirmed about rarity and unlock reports, why skill data is withheld, and how it compares to older classes.`,
      intent: 'UPDATE 1 class page: update context and honest unknowns, not invented skills or drop rates.',
      primaryKeyword: `${item.name} Dungeon Lootr`,
      searchIntent: 'entity',
    };
  }
  if (!isIndexableClass(item)) {
    return {
      title: `Dungeon Lootr ${item.name} - Tier Placement & What We Know`,
      description: `${item.name} sits in community ${item.tier}-tier talk for ${item.mode.toLowerCase()}, but the unlock route is still unconfirmed - see what is known before you farm.`,
      intent: 'The searcher wants honesty on an unconfirmed unlock, plus tier/mode context.',
      primaryKeyword: `Dungeon Lootr ${item.name}`,
      searchIntent: 'entity',
    };
  }
  return {
    title: `Dungeon Lootr ${item.name} – Skills, Tier & Build`,
    description: `${item.name}: combat role, ${item.tier}-tier placement, strengths, weaknesses, and build notes. Unlock details live on the dedicated how-to page when one exists.`,
    intent: 'Entity overview for the class, not a full unlock tutorial or full build page.',
    primaryKeyword: `Dungeon Lootr ${item.name}`,
    searchIntent: 'entity',
  };
}

export function buildSerp(item: ClassEntry): Serp {
  const profile = getBuildProfile(item.slug);
  if (!isIndexableBuild(item)) {
    return {
      title: `Dungeon Lootr ${item.name} Build Notes - Mode Focus`,
      description: `${item.name} build notes for ${buildModeHook(item.mode)}. Full stats / Aspect / rotation publishing when the setup is verified.`,
      intent: 'Thin build page kept noindex until publish-ready.',
      primaryKeyword: `Dungeon Lootr ${item.name} build`,
      searchIntent: 'build',
    };
  }
  return {
    title: `Best ${item.name} Build in Dungeon Lootr – Stats, Aspects & Gear`,
    description: `Copy the best ${item.name} build: ${profile!.statPriority.toLowerCase()}, ${profile!.bestAspect.toLowerCase()}, gear focus, Boss Rush and dungeon setups.`,
    intent: 'Practical build page for players who already have or are about to unlock the class.',
    primaryKeyword: `Dungeon Lootr ${item.name} build`,
    searchIntent: 'build',
  };
}

export function buildOpening(item: ClassEntry) {
  const profile = getBuildProfile(item.slug);
  if (profile && isIndexableBuild(item)) {
    return `${item.name} best overall: ${profile.bestMode} with ${profile.bestAspect}. Stat priority ${profile.statPriority}.`;
  }
  if (profile) {
    return `${item.name} build notes for ${profile.bestMode}. Aspect and gear lines below are community direction notes - not a verified Best Build until in-game Aspect names and tests are confirmed.`;
  }
  return `${item.name} (${item.tier}-tier): build notes for ${buildModeHook(item.mode)}. ${item.buildNotes[0] ?? ''}`.trim();
}

export function guideSerp(guide: { slug: string; target: string; title: string; opening: string }): Serp {
  if (guide.slug === 'how-to-get-cursed-king') {
    return {
      title: 'How to Get Cursed King (Sukuna) in Dungeon Lootr – 2 Ways',
      description:
        'Cursed King has 2 unlock routes in Dungeon Lootr. Compare the Floor 40+ Class Item method and the 50-fragment Forge route, including requirements, farming tips, and which route to choose.',
      intent: 'How-to unlock page comparing the two existing Boss Rush routes.',
      primaryKeyword: 'how to get Cursed King in Dungeon Lootr',
      searchIntent: 'howto',
    };
  }
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
      title: 'How to Get Heavenly Fragments - Farm Sources & What They Unlock',
      description:
        'Where to farm Heavenly Fragments, what class/Forge routes need them, and the most consistent source for your stage.',
      intent: 'The searcher wants source + unlock utility.',
    };
  }
  if (guide.slug === 'cursed-fragments') {
    return {
      title: 'How to Get Cursed Fragments - Suggested Farm for Class & Forge Routes',
      description:
        'Suggested Cursed Fragment farm routes, which unlocks need them, and mistakes that waste Boss Rush runs.',
      intent: 'The searcher wants a reliable fragment farm tied to unlocks.',
    };
  }
  return {
    title: `How to Get ${guide.target} in Dungeon Lootr – Suggested Route & Requirements`,
    description: `Unlock ${guide.target} with a suggested route, required fragments or floors, Forge option when it exists, and farming tips. Requirements marked community-reported pending in-game confirm.`,
    intent: 'How-to unlock page: route and requirements only, not a full build or tier essay.',
    primaryKeyword: `how to get ${guide.target} Dungeon Lootr`,
    searchIntent: 'howto',
  };
}

const hubSerpBySlug: Record<string, { title: string; description: string }> = {
  codes: {
    title: 'Dungeon Lootr Codes [UPDATE 1] – Working Codes (September 2026)',
    description:
      'Latest working Dungeon Lootr codes for UPDATE 1. Copy active codes for chests, luck potions, Aspect Gems, Forge Stones and other rewards.',
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
    title: 'Dungeon Lootr Progression Guide - Beginner to Endgame Route',
    description:
      'A suggested Dungeon Lootr path: early damage → higher dungeon tiers → Boss Rush → Forge upgrades.',
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
    title: 'Boss Rush Floor 40 - Class Item Drop Breakpoint',
    description:
      'Floor 40 is where Cursed King, Honored One, and Anti Magic Class Items can start dropping - see why camping lower floors wastes runs.',
  },
  'floor-100': {
    title: 'Boss Rush Floor 100 - Fragment Farm for Forge Crafts',
    description:
      'Floor 100 pays 8–18 boss fragments per clear toward 50-fragment Forge crafts - plan Sukuna, Gojo, or Asta before you queue.',
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
