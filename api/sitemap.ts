import { createClient } from '@supabase/supabase-js';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  const staticPages: { loc: string; priority: string; changefreq: string; lastmod?: string }[] = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/about', priority: '0.8', changefreq: 'monthly' },
    { loc: '/services', priority: '0.9', changefreq: 'monthly' },
    { loc: '/photography', priority: '0.8', changefreq: 'monthly' },
    { loc: '/blog', priority: '0.9', changefreq: 'daily' },
    { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
  ];

  let blogPages: { loc: string; priority: string; changefreq: string; lastmod?: string }[] = [];

  // Fetch blog slugs from Supabase
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data } = await supabase
        .from('blogs')
        .select('slug, updated_at')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (data) {
        blogPages = data.map((blog) => ({
          loc: `/blog/${blog.slug}`,
          priority: '0.7',
          changefreq: 'weekly',
          lastmod: blog.updated_at ? blog.updated_at.split('T')[0] : new Date().toISOString().split('T')[0],
        }));
      }
    } catch (e) {
      console.error('Error fetching blogs for sitemap:', e);
    }
  }

  const today = new Date().toISOString().split('T')[0];
  const allPages = [...staticPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
    .map(
      (page) => `  <url>
    <loc>https://hitechglobals.com${page.loc}</loc>
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
