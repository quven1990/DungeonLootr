import Link from '../native-link';
import { Breadcrumbs } from '../Breadcrumbs';
import { DropRatesExplorer } from '../DropRatesExplorer';
import { DataNote, NextSteps, RelatedLinks, RetentionPanel } from '../components';
import { PageStatus } from '../PageStatus';
import { WIKI_PAGE_UPDATED, byUrl, dropRates } from '../data';
import { hubClusterLinks } from '../related';
import { pageMetadata } from '../seo';

const entry = byUrl('/drop-rates')!;

export const metadata = pageMetadata(
  { title: entry.title, description: entry.description, intent: 'drops' },
  '/drop-rates',
);

export default function DropRatesPage() {
  return (
    <main>
      <section className="site-shell page-hero">
        <Breadcrumbs items={[{ name: 'Drop Rates' }]} currentPath="/drop-rates" />
        <h1>{entry.h1}</h1>
        <PageStatus updatedAt={WIKI_PAGE_UPDATED} verifiedForUpdate1={false} />
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{entry.opening}</p>
          <div className="hero-actions">
            <Link href="/tools/drop-chance-calculator">Open Drop Calculator</Link>
            <Link className="secondary" href="/boss-rush">
              Boss Rush Floors
            </Link>
          </div>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <DropRatesExplorer rows={dropRates} />
          <DataNote />
          <RelatedLinks title="Related pages" links={hubClusterLinks('/drop-rates')} />
          <NextSteps
            links={[
              ['Open drop calculator', '/tools/drop-chance-calculator'],
              ['Boss Rush routes', '/boss-rush'],
              ['Cursed King unlock', '/guides/how-to-get-cursed-king'],
              ['UPDATE 1 classes', '/update-1'],
            ]}
          />
        </div>
        <aside className="side-rail">
          <RetentionPanel title="drop rates" videoQuery="Dungeon Lootr drop rates boss drops Roblox" />
          <div className="content-panel">
            <h3>Best next action</h3>
            <p>
              For any confirmed constant rate, calculate 50%, 90%, 95%, and 99% run targets before committing to a farm.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
