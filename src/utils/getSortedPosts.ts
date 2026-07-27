import type { CollectionEntry } from "astro:content";
import { remark } from "remark";
import remarkHtml from "remark-html";
import postFilter from "./postFilter";
import { enhanceImageHtml } from "./responsive-images";

function processCustomFormatting(html: string): string {
  return html
    .replace(/<p>\s*::indent\s*(.*?)<\/p>/gs, '<p class="custom-indent">$1</p>')
    .replace(/<p>\s*::drop-cap\s*(.*?)<\/p>/gs, '<p class="drop-cap">$1</p>');
}

export interface SortedPostsOptions {
  renderContent?: boolean;
}

const getSortedPosts = (
  posts: CollectionEntry<"blog">[],
  { renderContent = true }: SortedPostsOptions = {},
) => {
  return posts
    .filter(postFilter)
    .map((post) => {
      if (!renderContent) return post;
      const processedContent = remark()
        .use(remarkHtml, { sanitize: false })
        .processSync(post.body)
        .toString();
      return {
        ...post,
        data: {
          ...post.data,
          description: enhanceImageHtml(
            processCustomFormatting(processedContent),
          ),
        },
      };
    })
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000,
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000,
        ),
    );
};

export default getSortedPosts;
