import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string;
}

export function SEO({
  title,
  description,
  canonical,
  ogImage = 'https://hitechglobals.com/og-image.png',
  ogType = 'website',
  keywords,
}: SEOProps) {
  const siteName = 'Irtiqa Marketing';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Full-Service Creative Marketing Agency`;
  const defaultDescription = 'Irtiqa Marketing is a full-service creative marketing agency helping startups, businesses, and enterprises grow through branding, digital marketing, AI solutions, websites, photography, videography, and performance-driven campaigns.';
  const pageDescription = description || defaultDescription;
  const url = canonical ? `https://hitechglobals.com${canonical}` : 'https://hitechglobals.com';
  
  // Brand name variants for SEO
  const baseKeywords = 'irtiqa marketing, irtiqa, creative marketing agency, branding agency india, digital marketing agency, social media marketing, website development, photography, videography';
  const fullKeywords = keywords ? `${keywords}, ${baseKeywords}` : baseKeywords;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={pageDescription} />
      {fullKeywords && <meta name="keywords" content={fullKeywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />

      {/* Breadcrumb List Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://hitechglobals.com"
            },
            ...(canonical ? [{
              "@type": "ListItem",
              "position": 2,
              "name": title || canonical.split('/')[1].charAt(0).toUpperCase() + canonical.split('/')[1].slice(1),
              "item": `https://hitechglobals.com${canonical}`
            }] : [])
          ]
        })}
      </script>
    </Helmet>
  );
}
