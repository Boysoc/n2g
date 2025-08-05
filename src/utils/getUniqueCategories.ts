import { type CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

const getUniqueCategories = (posts: CollectionEntry<"blog">[]) => {
  const categories: string[] = posts
    .flatMap(post => post.data.categories)
    .map(category => slugifyStr(category))
    .filter(
      (value: string, index: number, self: string[]) =>
        self.indexOf(value) === index
    )
    .sort((categoryA: string, categoryB: string) =>
      categoryA.localeCompare(categoryB)
    );
  return categories.map(category => {
    return {
      category,
      categoryName: posts
        .flatMap(post => post.data.categories)
        .find(c => slugifyStr(c) === category) as string,
    };
  });
};

export default getUniqueCategories;