# SEO GSC Upgrade — 2026-09-12

## GSC Findings

Window: `2026-09-05 → 2026-09-11` · Property: `sc-domain:dungeonlootr.top`

| Metric | Value |
| --- | --- |
| Clicks | 50 |
| Impressions | 959 |
| CTR | 5.21% |
| Avg position | 5.9 |

**What GSC already proved**

- UPDATE 1 entity pages (`spell-breaker` / `coyote` / `cryomancer`) drove **34 / 50** clicks (~68%).
- Daily clicks stepped up after the 9/09 ship: `4 → 11 → 12 → 16`.
- Winning query pattern: `{class name} dungeon lootr` (high CTR, pos ~3–4).
- Largest waste: `/guides/how-to-get-cursed-king` — **394 impr / 6 clicks / 1.52% CTR**.
- `/drop-rates` is a real mid-tier page (6 clicks / 149 impr), worth database treatment, not essay expansion.
- `/codes` is not a growth lever (0 clicks / pos ~14.4) — freshness only.
- Site is growing; this pass doubles down on proven entity + CTR fixes. No rebuild.

---

## Pages Modified

| URL | Old problem | Change | Expected query impact |
| --- | --- | --- | --- |
| `/guides/how-to-get-cursed-king` | Title/snippet weak for main how-to query; Quick Answer not scannable | Title, meta, H1, Quick Answer facts, section labels, FAQ schema, intent split | CTR lift on `how to get cursed king in dungeon lootr` family |
| `/classes/cursed-king` | Risk of unlock cannibalization | Opening + unlock section point hard to guide; class stays skills/tier/build | Reduce overlap confusion |
| `/classes/spell-breaker` | Already ranking; thin first screen | Quick Answer facts, sibling + drop-rate links, breadcrumb `item` | Defend/expand `{name} dungeon lootr` |
| `/classes/coyote` | Same | Same entity template pass | Same |
| `/classes/cryomancer` | Same | Same | Same |
| `/classes/dark-professor` | No performance row yet; needs distribution | Same entity pass + hub/card links from `/classes`, `/update-1`, home, drop-rates | Index already OK; wait for crawl + queries |
| `/drop-rates` | Plain table only | Database columns + client search/filter + BreadcrumbList + Unknown UPDATE 1 rows | Support drop-rate / item rarity queries without inventing % |
| `/boss-rush` | 31 impr / 0 clicks | Factual sections + CK/drop-rate CTAs + BreadcrumbList | Better CTR on existing impressions |
| `/classes` | Generic hub | UPDATE 1 cards first; hub framed as distributor | Internal equity to entity pages |
| `/update-1` | OK hub | Breadcrumb current URL; obtain column links to class pages | Weight distribution |
| `/codes` | Stale verifiedAt 9/06; rewards treated as settled | Rechecked 9/12; conflict notes; +800LIKES/RELEASE as non-universal | Freshness only |
| `/` | Minor | Shortcut band adds Drop Rates + Cursed King | Discovery |

**New indexable pages:** 0  
**Deleted pages:** 0  
**Slug changes:** none

---

## Cursed King Changes

### Title

- **Old:** `How to Get Cursed King (Sukuna) in Dungeon Lootr – 2 Ways`
- **New:** `How to Get Cursed King in Dungeon Lootr – Unlock Requirements & Boss Rush`

### Description

- **Old:** `Cursed King has 2 unlock routes in Dungeon Lootr. Compare the Floor 40+ Class Item method and the 50-fragment Forge route...`
- **New:** `Unlock Cursed King in Dungeon Lootr via Boss Rush: Floor 40+ Class Item drop, or Forge with 50 Sukuna fragments from Floor 100 (8–18 per clear). Level 67+ required.`

### Quick Answer

- Lead sentence is now a direct unlock instruction.
- Added scannable facts: Requirement / Location / Boss·Floor / Material.
- CTA pair: Suggested Route + Skills/Tier/Build (class page).

### Intent split with `/classes/cursed-king`

| Guide | Class page |
| --- | --- |
| how to get / unlock / floors / fragments / forge / mistakes | skills / tier / strengths / weaknesses / build |
| FAQ + HowTo schema for unlock | Unlock block is a link out, not a second tutorial |

### Breadcrumb

- Live JSON-LD now can emit `item` on the current page via `currentPath`.
- Intermediate “Guides” without a hub URL remains visual-only (omitted from schema) so GSC does not see a missing `item`.

---

## Entity Pages

Shared UPDATE 1 pattern (Spell Breaker / Coyote / Cryomancer / Dark Professor):

- SERP title kept as `{Name} Dungeon Lootr – How to Get, Skills & Build` (matches proven query shape).
- First-screen Quick Answer includes rarity, patch date, obtain summary, skills/rates = not verified.
- How-to section links siblings + `/drop-rates` Unknown row.
- Template contract documented in `app/class-entity-template.ts` (no empty batch pages).

### Dark Professor technical status

| Check | Result |
| --- | --- |
| HTTP | 200 |
| robots | `index, follow` |
| canonical | `https://dungeonlootr.top/classes/dark-professor` |
| sitemap | included |
| URL Inspection (earlier) | Submitted and indexed |
| GSC performance row | still none (demand/crawl lag, not a missing page) |

---

## Drop Database

Expanded `DropRateEntry` with: location, difficulty, usedFor, verified.

Added **Unknown** (not invented) rows for:

- Spell Breaker
- Cryomancer
- Coyote
- Dark Professor

UI: search + source filter + sort (`DropRatesExplorer`).

No new fabricated percentages.

---

## Codes

- `codesLastVerifiedAt` → **2026-09-12**
- Kept core active set; marked conflicting rewards honestly (UPDATE1, WEEKENDBUFFS, 15KCCU, RAIDTIME, LOOTR).
- Added **800LIKES** and **RELEASE** as active-but-not-universal (present in some Sep roundups only).
- Did **not** import IndiaTimes-only extras (BOSSRUSH, MOREEXP, etc.) without multi-source agreement.

---

## Technical SEO

| Area | Status |
| --- | --- |
| Canonical | unchanged; still absolute `dungeonlootr.top` paths |
| BreadcrumbList | `item` emitted whenever `href`/`currentPath` exists, including last crumb |
| HowTo + FAQ | CK guide |
| FAQ | UPDATE 1 class pages (existing) |
| Sitemap lastmod | bumped for touched URLs to `2026-09-12` |
| Indexability | no noindex added; Dark Professor remains indexable |
| Internal links | CK↔class, Boss Rush↔CK/drops, UPDATE1↔4 classes, Drop Rates↔entity pages, home shortcuts |

---

## Unknown Data (do not invent)

- Exact Class Item drop % for Floor 40+
- UPDATE 1 unlock recipes / shop prices / bundle SKUs
- UPDATE 1 skill names and damage multipliers
- Dark Professor raid name, difficulty, and drop %
- Settled reward packages for several codes (multi-guide conflict)
- Whether Coyote has any free unlock path

---

## Files touched

- `app/data.ts`
- `app/Breadcrumbs.tsx`
- `app/guides/[slug]/page.tsx`
- `app/classes/[slug]/page.tsx`
- `app/classes/page.tsx`
- `app/drop-rates/page.tsx`
- `app/DropRatesExplorer.tsx` *(new client UI, not a new URL)*
- `app/boss-rush/page.tsx`
- `app/update-1/page.tsx`
- `app/page.tsx`
- `app/[slug]/page.tsx`
- `app/related.ts`
- `app/sitemap-data.ts`
- `app/class-entity-template.ts` *(template contract only)*
- `SEO_GSC_UPGRADE_2026-09-12.md` *(this report)*

---

## Verification

| Check | Status |
| --- | --- |
| `npx tsc --noEmit` | pass |
| eslint on changed files | pass |
| `npm run build` | pass |
| `npm run typecheck` | script not defined (used `tsc`) |
| Full `npm run lint` | not required; repo has pre-existing unrelated lint debt |

---

## Final acceptance answers

1. **Pages modified:** CK guide, CK class, 4 UPDATE 1 classes, drop-rates, boss-rush, classes hub, update-1, codes hub data, home shortcuts.
2. **Files:** listed above.
3. **CK CTR points:** query-led title; requirement-led description; scannable Quick Answer; FAQ/HowTo; intent split.
4. **New verified facts:** none invented; codes conflict labels + Unknown drop rows are honesty markers.
5. **Dark Professor:** technically healthy / indexed; linked from hubs; waiting on demand.
6. **Drop Rates:** columns + filters + 4 Unknown UPDATE 1 rows.
7. **Codes:** reconciled 2026-09-12; conflicts marked; 800LIKES/RELEASE added cautiously.
8. **New pages:** 0 indexable.
9. **Deleted pages:** 0.
10. **Build/tsc/lint(changed):** pass.
