import Link from 'next/link';
import { ClassTable } from '../../components';

export const metadata = {
  title: 'Best Aspect for Every Dungeon Lootr Class (Current Meta)',
  description:
    'Best Aspect direction for major classes - Boss Rush picks, dungeon clear picks, and strong alternatives.',
};

export default function BestAspectPage() {
  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Guides / Aspects</p>
        <h1>Best Aspect for Every Dungeon Lootr Class</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>
            Here is the best Aspect direction for each major class - then tweak for Boss Rush, fast clears, or survival if
            your clear rate is falling apart.
          </p>
          <div className="hero-actions">
            <Link href="/classes/">Browse classes</Link>
          </div>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>Aspect matching rule</h2>
            <p>
              There is no single best Aspect for every situation. Use damage amplification for burst classes, uptime
              support for rotation-heavy classes, and survivability when your clear fails before your damage matters.
            </p>
          </section>
          <ClassTable />
        </div>
      </section>
    </main>
  );
}
