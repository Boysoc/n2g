import { type CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

const getPostsByCategory = (
  posts: CollectionEntry<"blog">[],
  category: string
) =>
  posts.filter(post =>
    post.data.categories.some(c => slugifyStr(c) === category)
  );

export default getPostsByCategory;