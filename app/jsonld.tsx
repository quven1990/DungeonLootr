type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dungeon Lootr Wiki',
    url: 'https://dungeonlootr.top',
    description:
      'Unofficial Dungeon Lootr wiki covering UPDATE 1, classes, tier list, codes, Boss Rush routes, unlock guides, and farming tools.',
    publisher: {
      '@type': 'Organization',
      name: 'Dungeon Lootr Wiki',
      url: 'https://dungeonlootr.top',
    },
  };
}

export function articleJsonLd(input: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) {
  const url = `https://dungeonlootr.top${input.url.replace(/\/$/, '') || ''}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: url,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      '@type': 'Organization',
      name: 'Dungeon Lootr Wiki',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dungeon Lootr Wiki',
      url: 'https://dungeonlootr.top',
    },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function howToJsonLd(input: {
  name: string;
  description: string;
  steps: string[];
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    url: `https://dungeonlootr.top${input.url.replace(/\/$/, '')}`,
    step: input.steps.map((text, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Step ${index + 1}`,
      text,
    })),
  };
}
