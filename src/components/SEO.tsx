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
  ogImage = '/og-image.png',
  ogType = 'website',
  keywords,
}: SEOProps) {
  const siteName = 'Irtiqa Marketing';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Full-Service Creative Marketing Agency`;
  const defaultDescription = 'Irtiqa Marketing is a full-service creative marketing agency helping startups, businesses, and enterprises grow through branding, digital marketing, AI solutions, websites, photography, videography, and performance-driven campaigns.';
  const baseUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || window.location.origin;
  const url = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  const baseKeywords = 'irtiqa marketing, irtiqa, creative marketing agency, branding agency india, digital marketing agency, social media marketing, website development, photography, videography';
  const fullKeywords = keywords ? `${keywords}, ${baseKeywords}` : baseKeywords;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description || defaultDescription} />
      {fullKeywords && <meta name="keywords" content={fullKeywords} />}

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:site_name" content={siteName} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={absoluteOgImage} />

      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
            ...(canonical ? [{
              '@type': 'ListItem',
              position: 2,
              name: title || canonical.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'Page',
              item: url,
            }] : []),
          ],
        })}
      </script>
    </Helmet>
  );
}
