import { writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

// Load TS data via tsx
const dump = spawnSync(
  'npx',
  ['tsx', '-e', `
import * as d from './app/data.ts';
const homeOpening = 'Need a main class, an unlock route, or a drop farm plan? Start here - then jump to the tier list, Boss Rush guide, or drop calculator.';
const homeTitle = 'Dungeon Lootr Wiki - Best Classes, Builds, Boss Rush & Codes';
const homeDesc = 'Fast answers for Dungeon Lootr: class tier list, unlock routes, Boss Rush drops, working codes, and a drop-chance calculator.';
const aspect = {
  url: '/guides/best-aspect-by-class/',
  title: 'Best Aspect for Every Dungeon Lootr Class (Current Meta)',
  description: 'Best Aspect direction for major classes - Boss Rush picks, dungeon clear picks, and strong alternatives.',
  first: 'Here is the best Aspect direction for each major class - then tweak for Boss Rush, fast clears, or survival if your clear rate is falling apart.',
};
const rows = [];
rows.push({ url: '/', title: homeTitle, description: homeDesc, first: homeOpening, kind: 'home' });
for (const e of d.seoEntries) rows.push({ url: e.url, title: e.title, description: e.description, first: e.opening, kind: 'seo', key: e.url });
for (const p of d.hubPages) {
  const s = d.hubSerp(p);
  rows.push({ url: '/' + p.slug + '/', title: s.title, description: s.description, first: p.opening, kind: 'hub', key: p.slug });
}
for (const p of d.bossRushPages) {
  const s = d.bossRushSerp(p);
  rows.push({ url: '/boss-rush/' + p.slug + '/', title: s.title, description: s.description, first: p.opening, kind: 'boss', key: p.slug });
}
for (const item of d.classes) {
  const s = d.classSerp(item);
  rows.push({ url: '/classes/' + item.slug + '/', title: s.title, description: s.description, first: item.opening, kind: 'class', name: item.name, rarity: item.rarity, mode: item.mode });
  const b = d.buildSerp(item);
  rows.push({ url: '/builds/' + item.slug + '/', title: b.title, description: b.description, first: d.buildOpening(item), kind: 'build', name: item.name, mode: item.mode });
}
for (const g of d.guides) {
  const s = d.guideSerp(g);
  rows.push({ url: '/guides/' + g.slug + '/', title: s.title, description: s.description, first: g.opening, kind: 'guide', target: g.target, slug: g.slug });
}
rows.push({ ...aspect, kind: 'aspect' });
for (const c of d.comparisons) {
  const s = d.comparisonSerp(c);
  rows.push({ url: '/comparisons/' + c.slug + '/', title: s.title, description: s.description, first: c.opening, kind: 'cmp', a: c.a, b: c.b });
}
for (const t of d.toolPages) {
  const s = d.toolSerp(t);
  rows.push({ url: '/tools/' + t.slug + '/', title: s.title, description: s.description, first: t.opening, kind: 'tool', slug: t.slug });
}
rows.sort((a,b)=>a.url.localeCompare(b.url));
console.log(JSON.stringify(rows));
`],
  { cwd: process.cwd(), encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 },
);

if (dump.status !== 0) {
  console.error(dump.stderr || dump.stdout);
  process.exit(1);
}

const lines = dump.stdout.trim().split('\n');
const jsonLine = lines.reverse().find((l) => l.startsWith('['));
const rows = JSON.parse(jsonLine);

const modeZh = {
  'Boss Rush': 'Boss Rush',
  'Dungeon clear': '副本清图',
  Solo: '单人',
  Endgame: '终局',
  Burst: '爆发',
  Survival: '生存',
  Mobility: '机动性',
  'Ranged clear': '远程清图',
  'Early progression': '前期进度',
};

const queryIntent = {
  '/': ['Dungeon Lootr wiki', '找总入口：判断这站是否覆盖职业、build、Boss Rush、掉落、兑换码和攻略。'],
  '/classes/': ['Dungeon Lootr classes', '想看全职业列表、稀有度、怎么解锁，并挑主玩职业。'],
  '/class-tier-list/': ['Dungeon Lootr tier list', '想知道最新版本哪些职业强，Boss Rush / 清图该练谁。'],
  '/boss-rush/': ['Dungeon Lootr Boss Rush', '想知道 Boss Rush 怎么打、关键层、掉什么、用什么职业更稳。'],
  '/drop-rates/': ['Dungeon Lootr drop rates', '想查 Boss / 职业道具 / 碎片掉率，决定去哪刷。'],
  '/tools/drop-chance-calculator/': ['Dungeon Lootr drop chance calculator', '已知掉率，想算刷多少次才够稳，避免盲目肝。'],
  '/codes/': ['Dungeon Lootr codes', '想找可用兑换码、奖励和过期列表。'],
  '/builds/': ['Dungeon Lootr builds', '想按职业/模式找能直接照抄的 build。'],
  '/aspects/': ['Dungeon Lootr aspects', '想搞懂 Aspect 效果、搭配和当前 meta。'],
  '/dungeons/': ['Dungeon Lootr dungeons', '想知道副本进度路线、刷哪层、用什么职业。'],
  '/items/': ['Dungeon Lootr items', '想查材料/碎片/掉落用途，以及解锁什么。'],
  '/progression-guide/': ['Dungeon Lootr progression guide', '新手想知道从开局到终局最快怎么推。'],
  '/guides/best-aspect-by-class/': ['best aspect Dungeon Lootr', '想按职业查当前最强 Aspect 方向，以及 Boss Rush / 清图 / 生存该怎么选。'],
  '/tools/class-finder/': ['Dungeon Lootr class finder', '想用筛选工具按稀有度/解锁路线/模式挑职业，而不是再读长文。'],
  '/tools/aspect-matcher/': ['Dungeon Lootr aspect matcher', '想快速给某个职业匹配 Aspect 方向。'],
};

const zhTitle = {
  'Dungeon Lootr Wiki - Best Classes, Builds, Boss Rush & Codes':
    'Dungeon Lootr Wiki - 最强职业、Build、Boss Rush 与兑换码',
  'Dungeon Lootr Classes - All 30+ Classes & How to Unlock Them':
    'Dungeon Lootr 职业大全 - 全 30+ 职业与解锁方式',
  'Dungeon Lootr Tier List - Best Classes After the Latest Update':
    'Dungeon Lootr 强度榜 - 最新更新后的最强职业',
  'Dungeon Lootr Boss Rush Guide - Key Floors, Class Drops & Best Push Classes':
    'Dungeon Lootr Boss Rush 攻略 - 关键层、职业掉落与冲层职业',
  'Dungeon Lootr Drop Rates - Boss, Class Item & Fragment Chances':
    'Dungeon Lootr 掉率 - Boss、职业道具与碎片概率',
  'Dungeon Lootr Drop Chance Calculator - Runs to 50%, 90%, 95%, 99%':
    'Dungeon Lootr 掉率计算器 - 刷到 50%/90%/95%/99% 要多少次',
  'Dungeon Lootr Codes - Working Codes & Free Rewards (Updated)':
    'Dungeon Lootr 兑换码 - 可用码与免费奖励（已更新）',
  'Dungeon Lootr Builds - Copy-Ready Setups by Class & Mode':
    'Dungeon Lootr Builds - 按职业/模式可照抄配置',
  'Dungeon Lootr Aspects - Best Picks by Class & Current Meta':
    'Dungeon Lootr Aspects - 按职业最佳选择与当前 Meta',
  'Dungeon Lootr Dungeons - Best Farming Routes & Progression':
    'Dungeon Lootr 副本 - 最佳刷取路线与进度',
  'Dungeon Lootr Items - Fragments, Materials & What They Unlock':
    'Dungeon Lootr 道具 - 碎片、材料与解锁用途',
  'Dungeon Lootr Progression Guide - Fastest Beginner to Endgame Route':
    'Dungeon Lootr 进度攻略 - 新手到终局最快路线',
  'Dungeon Lootr Boss Rush Drops - Floor Rewards & What to Farm First':
    'Dungeon Lootr Boss Rush 掉落 - 层数奖励与优先刷点',
  'Boss Rush Floor 100 - Endgame Checkpoint & Best Clear Classes':
    'Boss Rush 第 100 层 - 终局门槛与最佳通关职业',
  'Boss Rush Floor 40 - High-Value Class & Fragment Checkpoint':
    'Boss Rush 第 40 层 - 高价值职业/碎片检查点',
  'Best Aspect for Every Dungeon Lootr Class (Current Meta)':
    '每个 Dungeon Lootr 职业的最佳 Aspect（当前 Meta）',
  'Devil Heart Drop Rate in Dungeon Lootr - Best Farm & Run Estimates':
    'Dungeon Lootr Devil Heart 掉率 - 最佳刷点与次数估算',
  'How to Get Heavenly Fragments - Best Farm & What They Unlock':
    'Heavenly Fragments - 最佳刷点与解锁用途',
  'How to Get Cursed Fragments - Fast Farm for Class & Forge Routes':
    'Cursed Fragments - 职业/Forge 快速刷法',
  'Dungeon Lootr Class Finder - Filter by Rarity, Unlock & Mode':
    'Dungeon Lootr 职业筛选器 - 按稀有度/解锁/模式过滤',
  'Dungeon Lootr Aspect Matcher - Best Aspect by Class & Goal':
    'Dungeon Lootr Aspect 匹配器 - 按职业与目标选最佳 Aspect',
  'Cursed King vs Sinister Trigger - Which Is Better?':
    'Cursed King vs Sinister Trigger - 哪个更好？',
  'Honored One vs Unrestricted - Which Is Better?':
    'Honored One vs Unrestricted - 哪个更好？',
};

const zhDesc = {
  'Fast answers for Dungeon Lootr: class tier list, unlock routes, Boss Rush drops, working codes, and a drop-chance calculator.':
    '快速答案：职业强度榜、解锁路线、Boss Rush 掉落、可用兑换码，外加掉率计算器。',
  'Every Dungeon Lootr class by rarity and unlock method - Boss Rush drops, Forge routes, strengths, and build links.':
    '按稀有度与解锁方式看全职业：Boss Rush 掉落、Forge、优劣势与 build 链接。',
  'S-tier and ranked picks for Boss Rush, dungeon clears, mobility, and endgame value - updated for the latest patch.':
    'S 级与排名推荐：Boss Rush、清图、机动、终局价值，按最新版本。',
  'Hit the Boss Rush floors that drop classes and fragments, see farming routes, and pick a class that actually pushes deeper.':
    '打到掉职业/碎片的关键层，看刷取路线，选真能往上推的职业。',
  'Check Dungeon Lootr drop rates for boss loot, class items, fragments, and rare materials, with last-checked patch dates and farming notes.':
    '查看 Boss 战利品、职业道具、碎片和稀有材料的掉率，含最后核对版本与刷取备注。',
  'Stop guessing rare drops. Enter any drop rate and see your chance after N runs - plus attempts needed for 50/90/95/99%.':
    '别再猜稀有掉落。输入掉率，看刷 N 次概率，以及 50/90/95/99% 要多少次。',
  'Active Dungeon Lootr codes with free rewards, plus expired codes so you do not waste time redeeming dead ones.':
    '可用兑换码 + 免费奖励；附过期列表，别浪费时间兑死码。',
  'Grab the best Dungeon Lootr builds by class and mode - stats, Aspects, gear focus, and Boss Rush vs clear variants.':
    '按职业和模式拿可照抄 build：属性、Aspect、装备重点，以及 Boss Rush / 清图变体。',
  'Find the best Aspect for your class in Dungeon Lootr - Boss Rush, fast clear, and survival picks in one place.':
    '按职业找最佳 Aspect：Boss Rush / 快速清图 / 生存向，一页看完。',
  'Push dungeon tiers faster: farm the highest stage you can clear consistently, then climb with the right class.':
    '更快推副本层：刷你能稳定通关的最高层，再配对的职业往上爬。',
  'See what every key fragment and material unlocks - class routes, Forge paths, and Boss Rush farms.':
    '看清关键碎片和材料解锁什么：职业路线、Forge、Boss Rush 刷点。',
  'The fastest Dungeon Lootr path: early damage → higher dungeon tiers → Boss Rush → Forge upgrades.':
    '最快路径：前期伤害 → 更高副本层 → Boss Rush → Forge 升级。',
  'Full Boss Rush drop map by floor: class rewards, fragments, and which breakpoints are worth camping.':
    '按层看掉落：职业奖励、碎片，以及哪些节点值得蹲。',
  'Floor 40 is a major progression breakpoint: see rewards, best clear classes, and whether you should farm here now.':
    '第 40 层是重要进度节点：看奖励、最佳通关职业，以及现在值不值得蹲。',
  'Floor 100 is an endgame gate: survivability and uptime beat raw burst. See rewards and which classes clear it.':
    '第 100 层是终局门槛：生存和覆盖比纯爆发更重要。看奖励和能过的职业。',
  'Best Aspect direction for major classes - Boss Rush picks, dungeon clear picks, and strong alternatives.':
    '主要职业的最佳 Aspect 方向：Boss Rush / 清图 / 强力备选。',
  'Devil Heart drop rate, best farming method, and how many runs you need for 90% or 95% - stop grinding blind.':
    '掉率、最佳刷法，以及冲 90%/95% 大概要多少次——别盲肝。',
  'Where to farm Heavenly Fragments, what class/Forge routes need them, and the most consistent source for your stage.':
    '去哪刷、哪些职业/Forge 需要、你当前进度最稳的来源。',
  'Fastest reliable Cursed Fragment farm, which unlocks need them, and mistakes that waste your Boss Rush runs.':
    '最稳最快刷法、哪些解锁需要、哪些错误会浪费 Boss Rush 次数。',
  'Narrow your next class target by rarity, unlock route, and best mode before you burn runs on the wrong farm.':
    '按稀有度、解锁路线和最佳模式缩小下一个职业目标，别把次数烧在错误刷点上。',
  'Match your class to an Aspect direction for Boss Rush, dungeon clear, burst, or survival - skip the guesswork.':
    '按 Boss Rush / 清图 / 爆发 / 生存给职业匹配 Aspect 方向，别瞎猜。',
  'Verdict: Cursed King is the safer Boss Rush investment; Sinister Trigger wins for burst dungeon clears. Compare unlock cost and modes.':
    '结论：Boss Rush 更稳选 Cursed King；爆发清图选 Sinister Trigger。再比解锁成本和模式。',
  'Verdict: Honored One is the progression bridge; Unrestricted is the chase once prereqs and resources are ready.':
    '结论：Honored One 是进度桥；前置和资源齐了再追 Unrestricted。',
};

const zhFirst = {
  'Need a main class, an unlock route, or a drop farm plan? Start here - then jump to the tier list, Boss Rush guide, or drop calculator.':
    '要主玩职业、解锁路线还是刷取计划？从这里进强度榜、Boss Rush 攻略或掉率计算器。',
  'Dungeon Lootr has 30+ classes with totally different unlock routes - spin, Boss Rush, and Forge paths included. Pick your target before you farm.':
    '30+ 职业解锁路线完全不同（转盘/Boss Rush/Forge）。先定目标再开刷。',
  'Looking for the best Dungeon Lootr class right now? The current meta clusters around a few high-output picks for Boss Rush and fast clears - here is the ranked list.':
    '想知道现在最强职业？当前 meta 集中在少数高输出选择（Boss Rush + 快速清图）——下面是排名。',
  'Boss Rush is where endgame classes and fragments lock to floor milestones - miss the breakpoint and you farm the wrong loop for hours.':
    'Boss Rush 把终局职业和碎片绑在层数节点上——错过节点等于白肝。',
  'Dungeon Lootr drop rates vary by boss, dungeon, difficulty, and reward condition, so the best farming route depends on exactly what you are chasing.':
    '掉率会随 Boss、副本、难度和奖励条件变化，所以最佳刷取路线取决于你具体在追什么。',
  'Paste any Dungeon Lootr drop rate and see how many runs you really need instead of trusting a single percentage rumor.':
    '贴上任意掉率，看你到底要刷多少次——别信一个百分比传言。',
  'These working Dungeon Lootr codes are the fastest free boost right now - redeem the active list first, skip anything marked expired.':
    '这些可用码是现在最快的免费加速——先兑有效的，过期的直接跳过。',
  'Stop guessing your setup: pick your class and mode first, then copy the stat priority, Aspect, and gear focus that actually clear.':
    '别再瞎猜配装：先选职业和模式，再照抄真正能通关的属性、Aspect 和装备重点。',
  'The best Aspect in Dungeon Lootr depends on your class and goal: Boss Rush wants uptime, dungeon clears want burst, and survival builds win when you keep failing mid-run.':
    '最佳 Aspect 取决于职业和目标：Boss Rush 要覆盖，清图要爆发，老死半路就先堆生存。',
  'The fastest dungeon progression is not the hardest room - it is the highest tier you can clear on repeat without dying for free.':
    '最快进度不是最难那层，而是你能反复通关、不白送命的最高层。',
  'Every important Dungeon Lootr item should answer one question: what class, Forge path, or Boss Rush farm does this unlock next?':
    '每个重要道具只回答一个问题：它下一步解锁哪个职业、Forge 路线或 Boss Rush 刷点？',
  'Start with reliable early damage, push the highest dungeon tier you can farm cleanly, then move into Boss Rush and Forge for endgame classes.':
    '先拿稳定前期伤害，刷你能清干净的最高副本层，再进 Boss Rush 和 Forge 冲终局职业。',
  'Do not farm random Boss Rush floors - track drops by floor and patch so you stop at the reward that actually upgrades your account.':
    '别乱刷层——按层和版本盯掉落，停在真正能升级号的奖励点。',
  'Floor 100 punishes glass-cannon greed - bring a class with survivability and damage uptime, not just a big burst window.':
    '第 100 层惩罚玻璃大炮——要生存+伤害覆盖，不是只会放一个大爆发。',
  'Boss Rush Floor 40 is where several high-value class and fragment rewards enter the loop - if you can clear it stably, this is a farm worth camping.':
    '多个高价值职业和碎片会从这层进入循环——能稳定通关就值得蹲。',
  'Here is the best Aspect direction for each major class - then tweak for Boss Rush, fast clears, or survival if your clear rate is falling apart.':
    '这是各主要职业的最佳 Aspect 方向；通关不稳再按 Boss Rush / 清图 / 生存微调。',
  'Cursed King is usually the safer Boss Rush investment, while Sinister Trigger is the better pick when your goal is fast burst-focused dungeon clearing.':
    'Cursed King 通常是更稳的 Boss Rush 投资；若目标是爆发向快速清图，Sinister Trigger 更好。',
  'Honored One is the progression bridge, while Unrestricted is the higher-investment chase target once prerequisites and resources are already lined up.':
    'Honored One 是进度桥梁；Unrestricted 是前置和资源齐备后更高投入的追猎目标。',
  'Use the Class Finder to shortlist targets by rarity, unlock path, and mode - then open the unlock guide only for classes you will actually farm.':
    '先用筛选器按稀有度/路线/模式缩小名单，只给真要刷的职业打开解锁攻略。',
  'Pick your class and goal, then get an Aspect direction built for Boss Rush, fast clears, burst, or staying alive.':
    '选好职业和目标，直接拿到对应 Aspect 方向。',
  'Fastest Cursed King route: Boss Rush first, Forge as the deterministic backup.':
    '最快：先 Boss Rush，Forge 做保底。',
  'Treat Honored One as a prerequisite chain: required class path first, then fragments and currency in order.':
    '当前置链：先职业路径，再按序碎片和货币。',
  'Unlock Unrestricted only after the correct prereq progression, then finish level, fragment, and currency gates.':
    '前置对了再冲；再补等级/碎片/货币门槛。',
  'Confirm the current rare-material list first, then farm the highest-consistency source for Awakened Devil EX.':
    '先确认当前材料清单，再刷最稳来源。',
  'Take the boss route for Dreadlord, and plan drops before you dump runs into a low-consistency farm.':
    '走 Boss 路线；低稳定刷点开刷前先算掉落。',
  'Farm Heavenly Fragments only for the unlock you are chasing - the best source changes with your progression.':
    '只为你正在追的解锁刷；最佳来源会随进度变。',
  'Start Devil Heart farming with a verified source and expected-run math - not a random drop-rate rumor from chat.':
    '先确认来源 + 用次数估算开刷，别信聊天里随口一个掉率。',
  'Route Cursed Fragments around the class or Forge path they unlock, then farm the most repeatable source you can clear.':
    '按它们解锁的职业/Forge 来规划，再走你能反复通关的最稳来源。',
};

const classOpenings = {
  'Sinister Trigger': '顶尖伤害向清图职业：围绕爆发窗口构筑，手感差立刻拉开。',
  'Cursed King': '最强后期之一：优先 Boss Rush 解锁，备选 Cursed Shrine Forge。',
  'Honored One': '后期关键跳板：要冲 Unrestricted 等更强链，先拿它。',
  Unrestricted: '高投入追猎：开刷前先确认前置、等级、碎片和货币。',
  'Awakened Devil EX': '后期追猎：先规划稀有材料路线，再只刷最稳来源。',
  Dreadlord: '长线战斗、生存压过爆发时很强——老死在爆发前就适合它。',
  'Anti Magic': '偏稳定 Boss Rush：先看解锁成本和长线能不能扛，再决定刷。',
  Jetstream: '机动向：快速清图 + 干净循环覆盖时很值。',
  'Shadow Vagrant': '单人稳定向：解锁比其他后期目标更便宜时值得刷。',
  'Azure Devil': '爆发向：先比 Boss 窗口伤害和材料成本再投入。',
  Streamline: '进度向快速清图：先用它推内容，真到终局追猎再换重仓。',
  'Forge Archon': 'Forge 路线职业：材料成本和终局回报匹配时再上。',
  'Witch Gunner': '远程安全 + 清图：想更稳刷副本时很合适。',
  Boxer: '早中期舒适职：为更好推图，不为终局上限。',
  Artemis: '远程清图选项：清图速度/稳定性压过更易推的职业时再刷。',
};

function titleZh(r) {
  if (zhTitle[r.title]) return zhTitle[r.title];
  if (r.kind === 'class') {
    return `Dungeon Lootr ${r.name} - 怎么解锁、怎么玩、值不值得刷？`;
  }
  if (r.kind === 'build') {
    return `Dungeon Lootr 最佳 ${r.name} Build - 属性、Aspect 与循环`;
  }
  if (r.kind === 'guide') {
    if (r.slug === 'devil-heart' || r.slug === 'heavenly-fragments' || r.slug === 'cursed-fragments') {
      return zhTitle[r.title] || r.title;
    }
    return `怎么获得 ${r.target} - 最快路线与需求`;
  }
  return r.title;
}

function guideTitleZh(r) {
  const map = {
    'how-to-get-cursed-king': '怎么获得 Cursed King',
    'how-to-get-honored-one': '怎么获得 Honored One',
    'how-to-get-unrestricted': '怎么获得 Unrestricted',
    'how-to-get-awakened-devil-ex': '怎么获得 Awakened Devil EX',
    'how-to-get-dreadlord': '怎么获得 Dreadlord',
    'heavenly-fragments': 'Heavenly Fragments - 最佳刷点与解锁用途',
    'cursed-fragments': 'Cursed Fragments - 职业/Forge 快速刷法',
    'devil-heart': 'Devil Heart 掉率 - 最佳刷点与次数估算',
  };
  return map[r.slug] || r.title;
}

function descZh(r) {
  if (zhDesc[r.description]) return zhDesc[r.description];
  if (r.kind === 'hub' || r.kind === 'boss' || r.kind === 'tool' || r.kind === 'seo' || r.kind === 'home' || r.kind === 'aspect' || r.kind === 'cmp') {
    return zhFirst[r.first] || r.description;
  }
  if (r.kind === 'class') {
    return r.rarity === 'Secret' || r.rarity === 'Mythic'
      ? `${r.name} 值得刷吗？解锁路线、最佳模式、Aspect、build，以及现在要不要追。`
      : `${r.name} 解锁路线、最佳模式、Aspect、build，以及什么时候真值得投入次数。`;
  }
  if (r.kind === 'build') {
    const m = modeZh[r.mode] || r.mode;
    return `照抄 ${r.name} 在「${m}」的最佳 build：属性优先级、最佳 Aspect、装备重点、Boss Rush/副本变体，以及还在刷时的省钱版。`;
  }
  if (r.kind === 'guide') {
    if (r.slug === 'devil-heart' || r.slug === 'heavenly-fragments' || r.slug === 'cursed-fragments') {
      return zhDesc[r.description] || r.description;
    }
    return `快速解锁 ${r.target}：需求清单、最佳路线、常见错误，以及这肝到底有多狠。`;
  }
  return r.description;
}

function firstZh(r) {
  if (zhFirst[r.first]) return zhFirst[r.first];
  if (r.kind === 'class' && classOpenings[r.name]) return classOpenings[r.name];
  if (r.kind === 'build') {
    const m = modeZh[r.mode] || r.mode;
    return `要最佳 ${r.name} build？先定「${m}」，锁 Aspect 方向，再照抄下面的属性优先级。`;
  }
  return r.first;
}

function qi(r) {
  if (queryIntent[r.url]) return queryIntent[r.url];
  if (r.kind === 'class') return [`Dungeon Lootr ${r.name}`, `想知道 ${r.name} 强不强、怎么获得、解锁后怎么玩。`];
  if (r.kind === 'build') return [`best ${r.name} build Dungeon Lootr`, `已有或准备刷 ${r.name}，要可直接照抄的属性、Aspect、装备和循环。`];
  if (r.kind === 'guide') {
    const q =
      r.slug === 'devil-heart'
        ? 'Dungeon Lootr Devil Heart drop rate'
        : `how to get ${r.target} Dungeon Lootr`;
    return [q, `想立刻知道怎么拿到 ${r.target}：需求、最快路线、肝度判断。`];
  }
  if (r.kind === 'boss') {
    const q =
      r.key === 'drops'
        ? 'Dungeon Lootr Boss Rush drops'
        : `Dungeon Lootr Boss Rush ${String(r.key).replace(/-/g, ' ')}`;
    return [q, '查具体层数或掉落：奖励、打法、职业选择、值不值得停在这里刷。'];
  }
  if (r.kind === 'cmp') return [`${r.a} vs ${r.b} Dungeon Lootr`, `在 ${r.a} 和 ${r.b} 之间二选一，想按模式给结论。`];
  return ['Dungeon Lootr', '查找相关攻略或数据。'];
}

function guideTitleLine(r) {
  if (r.kind !== 'guide') return titleZh(r);
  return titleZh(r);
}

let md = `# Dungeon Lootr SERP 文案检查清单

> 从当前站点代码生成。中文是给你审核用的翻译，**不会**写进线上 metadata。
>
> **怎么看这三项：**
> 1. **Title** → Google 蓝字标题（约 50–60 字符）
> 2. **Meta Description** → 标题下灰色摘要（约 150–160 字符；Google 也可能改写）
> 3. **SERP 可能展示句（首段）** → 页面开头/Quick Answer；当 description 不够相关时，Google 常改写这段来展示

**页面总数：${rows.length}**

---

`;

for (const r of rows) {
  const [query, intent] = qi(r);
  const tZh = r.kind === 'guide' ? guideTitleLine(r) : titleZh(r);
  md += `## ${r.url}

- **目标搜索词：** ${query}
- **用户意图：** ${intent}
- **Title：** ${r.title}
- **标题翻译：** ${tZh}
- **Meta Description：** ${r.description}
- **描述翻译：** ${descZh(r)}
- **SERP 可能展示句（首段）：** ${r.first}
- **首段翻译：** ${firstZh(r)}

`;
}

writeFileSync('serp-copy-review.md', md);
console.log('OK', rows.length);
