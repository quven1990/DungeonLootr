import { PageHero } from '../../components';
import { byUrl } from '../../data';
import DropCalculator from './DropCalculator';

const entry = byUrl('/tools/drop-chance-calculator/')!;

export const metadata = {
  title: entry.title,
  description: entry.description,
};

export default function CalculatorPage() {
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
