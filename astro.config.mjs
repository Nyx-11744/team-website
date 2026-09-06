// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { rehypePlaceholder } from './src/lib/rehype-placeholder.mjs';

/**
 * ---------------------------------------------------------------------------
 * DEPLOYMENT TARGET
 * ---------------------------------------------------------------------------
 * Currently deploying to the GitHub Pages *project* URL:
 *     https://neur0n-7.github.io/nyx-website
 *
 * When the custom domain is ready, change exactly these two lines:
 *     site: 'https://your-domain.org',
 *     base: '/',
 * ...then put the bare domain in `public/CNAME` (a template is already there,
 * see public/CNAME.example) and point the DNS at GitHub Pages.
 *
 * Everything else in the site builds its URLs from `base`, so nothing else
 * needs to change.
 * ---------------------------------------------------------------------------
 */
export default defineConfig({
  site: 'https://neur0n-7.github.io',
  base: '/nyx-website',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  markdown: {
    // Applies to .mdx too — @astrojs/mdx extends this config by default.
    rehypePlugins: [rehypePlaceholder],
  },
});
