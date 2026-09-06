/**
 * Vinext SSR needs Cloudflare Workers + assets (not classic static Pages).
 * This script deploys the built Worker as project name: dungeon-lootr
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const configPath = join(root, 'dist/server/wrangler.json');
const projectName = 'dungeon-lootr';

if (!existsSync(configPath)) {
  console.error('Missing dist/server/wrangler.json. Run npm run build first.');
  process.exit(1);
}

const config = JSON.parse(readFileSync(configPath, 'utf8'));
config.name = projectName;
config.topLevelName = projectName;
writeFileSync(configPath, JSON.stringify(config));

console.log(`Deploying Worker project "${projectName}" (vinext SSR + static assets)...`);
console.log('Note: classic Cloudflare Pages cannot host this vinext SSR bundle; Workers+Assets is the supported path and shows under Workers & Pages.');

const result = spawnSync(
  'npx',
  ['wrangler', 'deploy', '--config', configPath],
  { stdio: 'inherit', cwd: root, shell: process.platform === 'win32' },
);

if ((result.status ?? 1) !== 0) {
  process.exit(result.status ?? 1);
}

// Notify IndexNow after a successful production deploy (non-blocking soft-fail).
console.log('\nSubmitting sitemap URLs to IndexNow...');
const indexNow = spawnSync('node', ['scripts/indexnow.mjs'], {
  stdio: 'inherit',
  cwd: root,
  shell: process.platform === 'win32',
});
if ((indexNow.status ?? 1) !== 0) {
  console.warn('IndexNow submit failed; deploy itself succeeded. Re-run: npm run indexnow');
}

process.exit(0);
