import Link from '../../native-link';
import { classes } from '../../data';
import { pageMetadata } from '../../seo';

export const metadata = pageMetadata(
  {
    title: 'Aspect Direction by Dungeon Lootr Class (Community Snapshot)',
    description:
      'Aspect direction notes for tracked classes - Boss Rush, dungeon clear, burst, and survival starting points. Not verified in-game Aspect names.',
    intent: 'aspects',
  },
  '/guides/best-aspect-by-class',
);

export default function BestAspectPage() {
  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Guides / Aspects</p>
        <h1>Aspect Direction by Dungeon Lootr Class</h1>
        <div className="quick-answer wide">
          <span className="label">Quick Answer</span>
          <p>
            Start with the Aspect direction listed for your class and mode. These are community direction notes until
            concrete in-game Aspect names are confirmed. If clears fail before damage lands, swap to survival/uptime first.
          </p>
          <div className="hero-actions">
            <Link href="/classes">Browse classes</Link>
            <Link className="secondary" href="/tools/aspect-matcher">Open matcher</Link>
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
          <section className="content-panel">
            <h2>Aspect direction by class</h2>
            <div className="table-wrap desktop-table">
              <table>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Tier</th>
                    <th>Mode</th>
                    <th>Start with</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((item) => (
                    <tr key={item.slug}>
                      <td><Link href={`/classes/${item.slug}`}>{item.name}</Link></td>
                      <td>{item.tier}</td>
                      <td>{item.mode}</td>
                      <td>{item.aspect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="class-card-list mobile-cards" aria-label="Aspect direction by class">
              {classes.map((item) => (
                <Link className="class-card" href={`/classes/${item.slug}`} key={item.slug}>
                  <div className="class-card-top">
                    <strong>{item.name}</strong>
                    <span className="rarity">{item.tier}</span>
                  </div>
                  <div className="class-card-meta">
                    <span>Mode: {item.mode}</span>
                    <span>Start with: {item.aspect}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
