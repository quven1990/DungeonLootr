import Link from 'next/link';
import { ClassTable } from '../../components';

export const metadata = {
  title: 'Best Aspect for Every Dungeon Lootr Class - Current Meta Guide',
  description: 'Find the best Aspect direction for major Dungeon Lootr classes, with Boss Rush, dungeon, and alternative picks.',
};

export default function BestAspectPage() {
  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Guides / Aspects</p>
        <h1>Best Aspect for Every Dungeon Lootr Class</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>There is no single best Aspect in Dungeon Lootr; the strongest choice depends on the class and whether you care more about Boss Rush, fast clears, or survival.</p>
          <div className="hero-actions"><Link href="/classes/">Browse classes</Link></div>
        </div>
      </section>
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>Aspect matching rule</h2>
            <p>Use damage amplification for burst classes, uptime support for rotation-heavy classes, and survivability when your clear fails before your damage matters.</p>
          </section>
          <ClassTable />
        </div>
      </section>
    </main>
  );
}
