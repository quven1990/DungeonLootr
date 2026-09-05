import Link from 'next/link';
import { DataNote, PageHero, RetentionPanel } from '../components';
import { byUrl, dropRates } from '../data';
import { pageMetadata } from '../seo';

const entry = byUrl('/drop-rates/')!;

export const metadata = pageMetadata(
  { title: entry.title, description: entry.description, intent: 'drops' },
  '/drop-rates',
);

export default function DropRatesPage() {
  return (
    <main>
      <PageHero entry={entry} cta={<div className="hero-actions"><Link href="/tools/drop-chance-calculator/">Open Drop Calculator</Link></div>} />
      <section className="site-shell content-grid">
        <div className="article-stack">
          <section className="content-panel">
            <h2>Drop tracking table</h2>
            <p>Community-checked rates. Exact official numbers are not published for every source - recalculate after patches.</p>
            <div className="table-wrap">
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
          </section>
          <DataNote />
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
