import { getEntry, render } from 'astro:content';
import { mdxComponents } from '../components/mdx';

/**
 * Load a page's copy from src/content/pages/<id>.mdx.
 * Returns its frontmatter plus a <Content /> component for the MDX body,
 * pre-wired with the layout components in src/components/mdx.
 */
export async function loadPage(id: string) {
  const entry = await getEntry('pages', id);
  if (!entry) throw new Error(`Missing page content: src/content/pages/${id}.mdx`);
  const { Content } = await render(entry);
  return { ...entry.data, Content, components: mdxComponents };
}

/** Sort helper for collections that carry an `order` field. */
export function byOrder<T extends { data: { order?: number } }>(a: T, b: T) {
  return (a.data.order ?? 0) - (b.data.order ?? 0);
}
