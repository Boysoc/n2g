import rss from '@astrojs/rss';
import { SITE } from '../data/site';
import { getPostPath, getPostPresentation, getPublishedPosts } from '../utils/posts';

export async function GET(context) {
  const posts = await getPublishedPosts();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: getPostPresentation(post).description,
      link: getPostPath(post),
    })),
    customData: '<language>zh-CN</language>',
  });
}
