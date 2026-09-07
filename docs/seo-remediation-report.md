# SEO Remediation Report — dungeonlootr.top

Baseline kit: `docs/seo-fix-kit/` (2026-09-07).  
Execution date: 2026-09-07.  
**Production deploy: not run** (per kit). Local `npm run build` passed.

## Summary by task ID

| ID | Status | Notes |
|---|---|---|
| DL-00 | 已核对无须改 / 已加强 | `app/robots.ts` already declares `Sitemap: https://dungeonlootr.top/dl-lootr-urlmap.xml`. Thin-build noindex tightened via publish gate (see DL-03); builds without concrete Aspect names leave sitemap. |
| DL-01 | 已修复（待证据） | Shared `classes` source used on homepage featured table. Added `rarityConflictNote` + `confidence: conflicting` for Cursed King / Honored One / Unrestricted / Awakened Devil EX. Did **not** blindly switch labels to PGG Exotic. |
| DL-02 | 已修复 | Tier list SERP/H1 → Selected; Unrated UPD1 names listed without invented tiers; reading notes for mode/evidence. |
| DL-03 | 已修复（待证据） | Vague Aspect directions fail `isBuildPublishReady`; pages render **Build Notes** (noindex) instead of Best Build. Concrete in-game Aspect names still needed to re-publish. |
| DL-04 | 已修复（待证据） | Fastest → Suggested; Community-tested → Community-reported where appropriate; guide FAQ no longer claims timed fastest. Numeric unlock fields still pending in-game confirm. |
| DL-05 | 已修复 | Calculator math copy + expected wait vs cumulative chance; validation for rate/attempts; 2% example wording matches kit; attempt definition clarified. |
| DL-06 | 已修复 | Template fallback CTA cleaned; SEO Phase 1 removed from public `/updatelog` → `docs/seo-phase1-internal-notes.md`; player-facing update entry added; GitHub issues as correction path. |
| DL-07 | 已核对 | Intent next-steps retained; mobile cards already present for key tables. No duplicate calculator pages added. |

## Changed files (high level)

- `app/data.ts` — rarity conflict notes, publish gate, SERP/update log, patch label
- `app/page.tsx` — shared class data for featured list
- `app/class-tier-list/page.tsx` — Selected + Unrated section
- `app/builds/[slug]/page.tsx` — Build Notes UI when not publish-ready
- `app/guides/[slug]/page.tsx` — Suggested route wording
- `app/classes/[slug]/page.tsx` — rarity note panel + status labels
- `app/[slug]/page.tsx` — progression heading
- `app/components.tsx` — DataNote / describeLink / rarity pending markers
- `app/related.ts` — Suggested unlock CTA
- `app/tools/drop-chance-calculator/*` — math UX + copy
- `app/sitemap-data.ts` — selective lastmod
- `app/updatelog/page.tsx`, `app/layout.tsx`, `app/globals.css`
- `docs/seo-fix-kit/*`, `docs/seo-phase1-internal-notes.md`, this report

## Verification

- Command: `npm run build` → success
- Robots (code): sitemap points to `/dl-lootr-urlmap.xml`
- Build indexability: Aspect-direction profiles no longer pass publish bar → `/builds/*` for those classes should be `noindex` and omitted from URL map once deployed
- Calculator: rejects negative / non-numeric / out-of-range rate; non-integer attempts; shows expected attempts and finite/infinite target messaging

## Pending human / game evidence

- In-game screenshots for rarity labels (Mythic/Secret vs Exotic)
- Concrete Aspect names + point spreads before restoring Best Build indexing
- Confirm unlock numbers (Lv67, Floor 40/100, fragment ranges, rates) against live UI
- GSC: submit/confirm `https://dungeonlootr.top/dl-lootr-urlmap.xml` after deploy
- Optional: Cloudflare crawl logs only if Googlebot fetch failures appear

## Risks / rollback

- Demoting previously indexed build URLs to noindex may drop those URLs from Google until re-verified builds ship — intentional per DL-03
- Keep git diff reviewable; redeploy previous commit if wording is too aggressive

## Deploy note

Kit forbids auto production deploy. When ready: review locally → commit → push/CI or `npm run deploy`.
