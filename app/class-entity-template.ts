/**
 * Shared structure for UPDATE 1 / future class entity pages.
 * Keep sections data-driven; hide empty blocks instead of printing Coming Soon.
 *
 * Required sections when data exists:
 * - Quick Answer (rarity, patch, obtain summary)
 * - How to Get / Requirements
 * - Skills (only if verified names exist)
 * - Strengths / Weaknesses
 * - Best use
 * - Related entities (UPDATE 1 siblings, drop rates, update hub)
 * - FAQ
 * - Last verified / sources
 *
 * Implemented today by app/classes/[slug]/page.tsx for isUpdate1Class entries.
 * Do not batch-generate empty /classes, /items, /weapons, or /bosses slugs.
 */
export const CLASS_ENTITY_TEMPLATE = {
  requiredWhenKnown: [
    'quickAnswer',
    'howToGet',
    'strengthsWeaknesses',
    'bestUse',
    'relatedEntities',
    'faq',
    'lastVerified',
  ],
  hideWhenEmpty: ['skills', 'stats', 'effects', 'locationExact', 'dropPercent', 'bestBuild'],
  serpPattern: '{Name} Dungeon Lootr – How to Get, Skills & Build',
  queryPattern: '{name} dungeon lootr',
} as const;
