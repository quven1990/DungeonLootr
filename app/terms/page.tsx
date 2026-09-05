export const metadata = {
  title: 'Terms of Use - Dungeon Lootr Wiki',
  description: 'Terms of use for dungeonlootr.top: unofficial fan content, no warranties, and community-tested game data.',
};

export default function TermsPage() {
  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Terms</p>
        <h1>Terms of Use</h1>
        <div className="quick-answer wide">
          <span className="label">Summary</span>
          <p>This is an unofficial fan wiki. Game data can change. Use guides and codes at your own risk.</p>
        </div>
      </section>
      <section className="site-shell article-stack">
        <section className="content-panel">
          <h2>Unofficial fan site</h2>
          <p>Dungeon Lootr Wiki is not endorsed by Roblox Corporation or the Dungeon Lootr developers. Game names, assets, and trademarks belong to their owners.</p>
        </section>
        <section className="content-panel">
          <h2>No warranty</h2>
          <p>Class routes, drop rates, codes, and builds are community-tested and may be wrong, outdated, or incomplete after a patch. Always verify in-game.</p>
        </section>
        <section className="content-panel">
          <h2>Codes and rewards</h2>
          <p>Redeem codes are provided for convenience. Developers can expire codes at any time. We are not responsible for invalid codes, missed rewards, or account issues.</p>
        </section>
        <section className="content-panel">
          <h2>Acceptable use</h2>
          <p>Do not misuse the site for scraping abuse, fraud, or anything that violates Roblox or applicable law.</p>
          <p>Last updated: 2026-09-06.</p>
        </section>
      </section>
    </main>
  );
}
