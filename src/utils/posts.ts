import { getCollection, type CollectionEntry } from 'astro:content';

export const POSTS_PER_PAGE = 8;

export type PostEntry = CollectionEntry<'posts'>;
export type PostImage = Exclude<PostEntry['data']['heroImage'], undefined>;

export interface PostPresentation {
  description: string;
  heroImage?: PostImage;
  heroImageAlt: string;
}

export interface PostCardPresentation {
  excerpt: string;
  cardImage?: PostImage;
  cardImageAlt: string;
}

export async function getPublishedPosts(): Promise<PostEntry[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  return posts.sort(
    (left, right) => right.data.pubDate.getTime() - left.data.pubDate.getTime(),
  );
}

export function getPostPath(post: PostEntry): string {
  return `/posts/${post.id}/`;
}

export function getPostPresentation(post: PostEntry): PostPresentation {
  const heroImage = typeof post.data.heroImage === 'string'
    ? post.data.heroImage.trim() || undefined
    : post.data.heroImage;
  const explicitAlt = post.data.heroImageAlt.trim();
  const heroImageAlt = explicitAlt || (heroImage ? `${post.data.title}的封面图片` : '');
  const description = cleanExcerpt(
    post.data.description || post.data.excerpt || post.body || '',
    160,
  );

  return { description, heroImage, heroImageAlt };
}

export function getPostCardPresentation(post: PostEntry): PostCardPresentation {
  const cardImage = typeof post.data.cardImage === 'string'
    ? post.data.cardImage.trim() || undefined
    : post.data.cardImage;
  const explicitAlt = post.data.cardImageAlt.trim();
  const cardImageAlt = explicitAlt || (cardImage ? `${post.data.title}的卡片封面` : '');
  const excerpt = cleanExcerpt(
    post.data.excerpt || post.body || post.data.description || '',
    180,
  );

  return { excerpt, cardImage, cardImageAlt };
}

export function formatPostDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(date);
}

export function cleanExcerpt(value: string, maxLength = 180): string {
  const text = value
    .replace(/<[^>]*>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/!\[[^\]]*\]\[[^\]]*\]/g, ' ')
    .replace(/^\s*\[[^\]]+\]:\s+\S+.*$/gm, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export function toSearchText(post: PostEntry): string {
  return cleanExcerpt(`${post.data.description} ${post.body ?? ''}`, 100_000);
}
