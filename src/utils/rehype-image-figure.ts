import { visit } from 'unist-util-visit';
import type { Node } from 'unist';

/**
 * 把文章里的裸 <img> 包进 <figure>，并：
 *  - 若 markdown 写成 ![alt](url "标题")，则把 title 作为 <figcaption>
 *  - 给 <img> 加上 loading="lazy" 与 decoding="async"
 *  - 跳过已位于 <figure> 内的图片
 */
export function rehypeImageFigure() {
  return (tree: Node) => {
    visit(tree, 'element', (node: any, index: number | undefined, parent: any) => {
      if (node.tagName !== 'img') return;
      if (!parent || parent.tagName === 'figure') return;
      if (typeof index !== 'number') return;

      const title = node.properties?.title as string | undefined;
      if (title) {
        delete node.properties.title;
      }

      const figure: any = {
        type: 'element',
        tagName: 'figure',
        properties: {
          className: ['photo-single'],
        },
        children: [node],
      };

      if (title) {
        figure.children.push({
          type: 'element',
          tagName: 'figcaption',
          properties: {},
          children: [{ type: 'text', value: title }],
        });
      }

      node.properties = node.properties || {};
      node.properties.loading = 'lazy';
      node.properties.decoding = 'async';

      parent.children.splice(index, 1, figure);
    });
  };
}
