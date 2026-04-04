import { Helmet } from 'react-helmet-async';

// Replace with real domain once confirmed
const DOMAIN = 'https://reseauartisans.fr';

export default function Seo({ title, description, keywords, jsonLd, path = '' }) {
  const fullTitle = `${title} | Réseau Artisans`;
  const canonicalUrl = `${DOMAIN}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang — 4 French-speaking countries + x-default */}
      <link rel="alternate" hreflang="fr-FR" href={canonicalUrl} />
      <link rel="alternate" hreflang="fr-BE" href={canonicalUrl} />
      <link rel="alternate" hreflang="fr-CA" href={canonicalUrl} />
      <link rel="alternate" hreflang="fr-CH" href={canonicalUrl} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl} />

      {/* Open Graph — multi-locale */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:locale:alternate" content="fr_BE" />
      <meta property="og:locale:alternate" content="fr_CA" />
      <meta property="og:locale:alternate" content="fr_CH" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* JSON-LD structured data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
