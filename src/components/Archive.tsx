import React from 'react';
import type { CollectionEntry } from "astro:content";

export interface Props {
  posts: CollectionEntry<"blog">[];
}

interface PostsByYear {
  [year: string]: CollectionEntry<"blog">[];
}

export default function Archive({ posts }: Props) {
  // 按年份分组文章
  const postsByYear: PostsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.data.pubDatetime).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as PostsByYear);

  // 按年份降序排列
  const sortedYears = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  // 格式化日期为 MM-DD 格式
  const formatDate = (dateStr: string | Date) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
  };

  return (
    <div className="archive-wrapper">
      {sortedYears.map(year => (
        <div key={year} className="archive-year-section">
          <div className="archive-year-header">
            <span className="archive-year-text">{year}年</span>
            <div className="archive-divider"></div>
          </div>
          <div className="archive-posts">
            {postsByYear[year].map(post => (
              <div key={post.slug} className="archive-post">
                <span className="archive-post-date">{formatDate(post.data.pubDatetime)}</span>
                <a 
                  href={`/posts/${post.slug}/`}
                  className="archive-post-title"
                >
                  {post.data.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}