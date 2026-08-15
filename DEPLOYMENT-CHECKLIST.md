# Irtiqa Marketing — Final Deployment Checklist

## Before Vercel deployment

Add these **Production** environment variables in Vercel:

```text
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_SITE_URL=https://YOUR-FINAL-DOMAIN.com
```

Use only the Supabase **anon/public** key in the frontend. Never add the `service_role` key to Vercel frontend variables or GitHub.

## Supabase Photography CMS

1. Run `supabase-photography.sql` once in the Supabase SQL Editor.
2. Create the private admin user in Supabase Authentication > Users.
3. Do not enable a public signup flow for the admin panel.
4. The public `/photography` page reads only the photography table and public storage bucket.
5. Admin users can upload, replace, edit and delete photography.

## Photography performance

- Uploads are resized to a maximum dimension of 2400px in the browser.
- Uploads are converted to WebP before storage.
- Target storage size is approximately 1.5 MB or less per image where possible.
- Public gallery images use lazy loading, async decoding, responsive `sizes`, long cache headers and Supabase CDN delivery.
- Old hardcoded photography images are not used by `/photography`.
- The gallery is populated only from the Supabase Photography CMS.

## Vercel / browser cache

The custom service worker was removed. Vercel's CDN/browser caching is sufficient for this site and this avoids an old service worker serving stale website code after a deployment.

## Local development

```bash
npm install
npm run dev
```

For a production check:

```bash
npm run build
```

After changing Vercel environment variables, create a new deployment so the Vite build receives the new values.
