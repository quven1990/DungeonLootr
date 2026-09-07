import { NextSteps, PageHero, RelatedLinks } from '../../components';
import { byUrl } from '../../data';
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
      <PageHero entry={entry} />
      <section className="site-shell content-grid">
        <div className="article-stack">
          <DropCalculator />
          <section className="content-panel">
            <h2>How to read the result</h2>
            <p>
              At a constant 2% chance per independent attempt, the expected wait for the first drop is 50 attempts.
              That is not a guarantee: the chance of at least one drop within 50 attempts is about 63.6%.
            </p>
            <p>
              Reaching 50% cumulative chance takes 35 attempts; 90% takes 114; 95% takes 149; 99% takes 228.
              Use &quot;expected attempts (1/p)&quot; for average wait, and &quot;attempts for target q&quot; when you care about a confidence threshold.
            </p>
            <ul>
              <li>p = 0: positive targets are impossible (infinite attempts).</li>
              <li>p = 100%: any positive target needs 1 attempt.</li>
              <li>q = 0: 0 attempts; q = 100% with 0 &lt; p &lt; 100%: no finite guarantee.</li>
              <li>n = 0: cumulative chance is 0%.</li>
            </ul>
          </section>
          <RelatedLinks title="Related pages" links={hubClusterLinks('/tools/drop-chance-calculator')} />
          <NextSteps
            links={[
              ['Check drop rates', '/drop-rates', 'Confirm sources and odds before you queue the same clear again.'],
              ['Boss Rush farming', '/boss-rush', 'Plan floor breakpoints, Class Item drops, and fragment farms.'],
              ['Class unlock routes', '/classes', 'Stay on the same class path with the next useful action.'],
              ['Working codes', '/codes', 'Redeem active codes before a long farm session.'],
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
