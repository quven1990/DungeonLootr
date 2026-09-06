import Link from '../native-link';
import { DataNote, NextSteps, PageHero, RelatedLinks, RetentionPanel } from '../components';
import { byUrl, dropRates } from '../data';
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
      <PageHero entry={entry} cta={<div className="hero-actions"><Link href="/tools/drop-chance-calculator">Open Drop Calculator</Link></div>} />
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>Drop tracking table</h2>
            <p>Community-checked rates. Exact official numbers are not published for every source - recalculate after patches.</p>
            <div className="table-wrap desktop-table">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Source</th>
                    <th>Rate</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {dropRates.map((row) => (
                    <tr key={row.item}>
                      <td><Link href={row.href}>{row.item}</Link></td>
                      <td>{row.source}</td>
                      <td>{row.rate}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="class-card-list mobile-cards" aria-label="Drop rates">
              {dropRates.map((row) => (
                <Link className="class-card" href={row.href} key={row.item}>
                  <div className="class-card-top">
                    <strong>{row.item}</strong>
                    <span className="status-pill">{row.rate}</span>
                  </div>
                  <div className="class-card-meta">
                    <span>Source: {row.source}</span>
                    <span>{row.note}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <DataNote />
          <RelatedLinks title="Related pages" links={hubClusterLinks('/drop-rates')} />
          <NextSteps links={[
            ['Open drop calculator', '/tools/drop-chance-calculator'],
            ['Boss Rush routes', '/boss-rush'],
            ['Class unlock guides', '/guides/how-to-get-cursed-king'],
            ['All classes', '/classes'],
          ]} />
        </div>
        <aside className="side-rail">
          <RetentionPanel
            title="drop rates"
            videoQuery="Dungeon Lootr drop rates boss drops Roblox"
          />
          <div className="content-panel">
            <h3>Best next action</h3>
            <p>For any rate estimate, calculate 50%, 90%, 95%, and 99% run targets before choosing a farm.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
