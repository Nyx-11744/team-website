// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { rehypePlaceholder } from './src/lib/rehype-placeholder.mjs';

/**
 * AARAV pls read this:
 * Currently deploying to the GitHub Pages *project* URL:
 *     https://nyx-11744.github.io/team-website
 *
 * when u get the website ready change these lines to
 *     site: 'https://nyx11744.org',
 *     base: '/',
 * then put the bare domain in `public/CNAME` (a template is already there,
 * see public/CNAME.example) and do ur dns thingy
 *
 */
export default defineConfig({
  
  site: 'https://nyx-11744.github.io',
  base: '/team-website',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  markdown: {
    // Applies to .mdx too — @astrojs/mdx extends this config by default.
    rehypePlugins: [rehypePlaceholder],
  },
});
