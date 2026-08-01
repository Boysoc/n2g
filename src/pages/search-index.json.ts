import {
  formatPostDate,
  getPostPath,
  getPublishedPosts,
  toSearchText,
} from '../utils/posts';

export const prerender = true;

export async function GET() {
  const posts = await getPublishedPosts();
  const searchList = posts.map((post) => ({
    title: post.data.title,
    searchText: `${post.data.title} ${toSearchText(post)}`.toLocaleLowerCase('zh-CN'),
    pubDate: formatPostDate(post.data.pubDate),
    url: getPostPath(post),
  }));

  return new Response(JSON.stringify(searchList), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
