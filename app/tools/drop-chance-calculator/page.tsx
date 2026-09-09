import { NextSteps, RelatedLinks } from '../../components';
import { Breadcrumbs } from '../../Breadcrumbs';
import { PageStatus } from '../../PageStatus';
import { WIKI_PAGE_UPDATED, byUrl } from '../../data';
import { hubClusterLinks } from '../../related';
import { pageMetadata } from '../../seo';
import DropCalculator from './DropCalculator';

const entry = byUrl('/tools/drop-chance-calculator')!;

export const metadata = pageMetadata(
  { title: entry.title, description: entry.description, intent: 'calculator' },
  '/tools/drop-chance-calculator',
);

export default function CalculatorPage() {
  return (
    <main>
      <section className="site-shell page-hero">
        <Breadcrumbs items={[{ name: 'Tools' }, { name: 'Drop Calculator' }]} />
        <h1>{entry.h1}</h1>
        <PageStatus updatedAt={WIKI_PAGE_UPDATED} verifiedForUpdate1={false} />
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>{entry.opening}</p>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <DropCalculator />
          <section className="content-panel">
            <h2>How to read the result</h2>
            <p>
              At a 1% drop rate, reaching a 90% chance requires approximately 230 independent attempts. The calculator
              computes that live from p and q; it is not a hardcoded Dungeon Lootr drop.
            </p>
            <p>
              Default example at 2%: expected wait is 50 attempts. Chance of at least one success in 50 attempts is about
              63.6%. Cumulative targets: 50% takes 35 attempts; 75% takes 69; 90% takes 114; 95% takes 149; 99% takes 228.
            </p>
            <ul>
              <li>Drop rate = chance per independent attempt.</li>
              <li>Target confidence = 50% / 75% / 90% / 95% / 99%.</li>
              <li>Outputs: expected attempts (1/p) plus the attempt counts for those confidence levels.</li>
              <li>p = 0: positive targets are impossible. q = 100% with 0 &lt; p &lt; 100%: no finite guarantee.</li>
            </ul>
          </section>
          <RelatedLinks title="Related pages" links={hubClusterLinks('/tools/drop-chance-calculator')} />
          <NextSteps
            links={[
              ['Community drop table', '/drop-rates', 'Only paste a rate you trust from this table or the live UI.'],
              ['Boss Rush floors', '/boss-rush', 'Class Item and fragment loops still use the same math.'],
              ['Class directory', '/classes', 'Pick the class whose farm you are actually running.'],
              ['UPDATE 1 guide', '/update-1', 'Do not invent UPDATE 1 drop rates for the calculator.'],
            ]}
          />
        </div>
        <aside className="side-rail">
          <div className="content-panel">
            <h3>Use for</h3>
            <ul>
              <li>Boss drops</li>
              <li>Class materials</li>
              <li>Fragments</li>
              <li>Rare dungeon items</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
