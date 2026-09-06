export const metadata = {
  title: 'Privacy Policy - Dungeon Lootr Wiki',
  description: 'Privacy policy for dungeonlootr.top: what data we collect, third-party embeds, and how to contact us.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="site-shell page-hero">
        <p className="breadcrumb">Home / Privacy</p>
        <h1>Privacy Policy</h1>
        <div className="quick-answer wide">
          <span className="label">Summary</span>
          <p>This fan wiki does not require accounts. We use Google Analytics (GA4), Microsoft Clarity, and Plausible for aggregate traffic and session analytics, and may embed third-party videos. We do not sell personal data.</p>
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
            <li>Google Analytics 4 (measurement ID G-1GMG1D45H6) for page views and aggregate usage. Google may set cookies or use similar identifiers under its policies.</li>
            <li>Microsoft Clarity (project ID ydo24u93q6) for session recordings, heatmaps, and aggregate UX metrics under Microsoft’s terms.</li>
            <li>Plausible Analytics (self-hosted at plausible.shipsolo.io, domain dungeonlootr.top) for cookieless aggregate pageview stats.</li>
            <li>No login, payment, or upload features on the current site version.</li>
          </ul>
        </section>
        <section className="content-panel">
          <h2>Third parties</h2>
          <ul>
            <li>Cloudflare hosts and protects the site.</li>
            <li>Google Analytics processes analytics data under Google’s terms and privacy policy.</li>
            <li>Microsoft Clarity processes analytics data under Microsoft’s terms and privacy policy.</li>
            <li>Plausible (via shipsolo.io) processes aggregate analytics without advertising cookies.</li>
            <li>YouTube (youtube-nocookie embeds) may set cookies or collect data under Google’s policies when you play a video.</li>
          </ul>
        </section>
        <section className="content-panel">
          <h2>Contact</h2>
          <p>
            Privacy requests:{' '}
            <a href="mailto:privacy@dungeonlootr.top">privacy@dungeonlootr.top</a>
          </p>
          <p>
            General contact:{' '}
            <a href="mailto:contact@dungeonlootr.top">contact@dungeonlootr.top</a>
          </p>
          <p>Last updated: 2026-09-06.</p>
        </section>
      </section>
    </main>
  );
}
