/**
 * Build a URL that respects the configured `base` (currently "/nyx-website").
 * Use this for every internal link and every reference to a file in /public,
 * so switching to a custom domain requires no edits outside astro.config.mjs.
 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

/** True when the given path is the current page (or an ancestor of it). */
export function isActive(pathname: string, href: string): boolean {
  const strip = (s: string) => s.replace(/\/+$/, '') || '/';
  const here = strip(pathname);
  const target = strip(href);
  if (target === strip(url('/'))) return here === target;
  return here === target || here.startsWith(`${target}/`);
}
