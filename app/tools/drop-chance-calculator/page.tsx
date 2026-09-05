import { PageHero } from '../../components';
import { byUrl } from '../../data';
import DropCalculator from './DropCalculator';

export const metadata = {
  title: 'Dungeon Lootr Drop Chance Calculator - Estimate Runs for Any Drop Rate',
  description: 'Enter a Dungeon Lootr drop rate and see your chance after any number of runs, plus how many attempts you need for 50%, 90%, 95%, or 99%.',
};

export default function CalculatorPage() {
  const entry = byUrl('/tools/drop-chance-calculator/')!;
  return (
    <main>
      <PageHero entry={entry} />
      <section className="site-shell content-grid">
        <div className="article-stack">
          <DropCalculator />
          <section className="content-panel">
            <h2>How to read the result</h2>
            <p>A 2% drop is not expected every 50 runs. The calculator shows your cumulative chance after repeated independent attempts and how many clears you need for a chosen target probability.</p>
          </section>
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
