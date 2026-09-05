export const metadata = {
  title: 'Privacy Policy - Dungeon Lootr Wiki',
  description: 'Privacy policy for dungeonlootr.top: what data we collect, third-party embeds, and how to contact us.',
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Privacy</p>
        <h1>Privacy Policy</h1>
        <div className="quick-answer wide">
          <span className="label">Summary</span>
          <p>This fan wiki does not require accounts. We may use privacy-friendly analytics and embed third-party videos. We do not sell personal data.</p>
        </div>
      </section>
      <section className="site-shell article-stack">
        <section className="content-panel">
          <h2>Who we are</h2>
          <p>Dungeon Lootr Wiki at dungeonlootr.top is an unofficial community guide for the Roblox game Dungeon Lootr. It is not affiliated with Roblox or the game developers.</p>
        </section>
        <section className="content-panel">
          <h2>Data we process</h2>
          <ul>
            <li>Standard server/CDN logs (IP, user agent, request path) for security and reliability.</li>
            <li>Optional analytics cookies or similar technologies if enabled later (for example GA4 or Cloudflare analytics).</li>
            <li>No login, payment, or upload features on the current site version.</li>
          </ul>
        </section>
        <section className="content-panel">
          <h2>Third parties</h2>
          <ul>
            <li>Cloudflare hosts and protects the site.</li>
            <li>YouTube (youtube-nocookie embeds) may set cookies or collect data under Google’s policies when you play a video.</li>
          </ul>
        </section>
        <section className="content-panel">
          <h2>Contact</h2>
          <p>For privacy requests related to this site, contact the operator via the GitHub repository linked from the project deployment notes.</p>
          <p>Last updated: 2026-09-06.</p>
        </section>
      </section>
    </main>
  );
}
