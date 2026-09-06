/**
 * Marks any element whose text contains "PLACEHOLDER" with class="ph", so
 * unfinished copy renders in the muted italic style everywhere on the site —
 * in MDX bodies as well as in the page templates. Delete the word and the
 * styling clears itself.
 */
const TARGETS = new Set(['p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'td', 'th', 'blockquote']);

function textOf(node) {
  if (node.type === 'text') return node.value;
  if (!Array.isArray(node.children)) return '';
  return node.children.map(textOf).join('');
}

export function rehypePlaceholder() {
  return (tree) => {
    const walk = (node) => {
      if (!Array.isArray(node.children)) return;
      for (const child of node.children) {
        if (
          child.type === 'element' &&
          TARGETS.has(child.tagName) &&
          textOf(child).includes('PLACEHOLDER')
        ) {
          child.properties ??= {};
          const existing = child.properties.className;
          const classes = Array.isArray(existing) ? existing : existing ? [existing] : [];
          if (!classes.includes('ph')) child.properties.className = [...classes, 'ph'];
        }
        walk(child);
      }
    };
    walk(tree);
  };
}

export default rehypePlaceholder;
