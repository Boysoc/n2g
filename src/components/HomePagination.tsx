import React from 'react';

export interface Props {
  totalPosts: number;
  postsPerPage: number;
}

export default function HomePagination({ totalPosts, postsPerPage }: Props) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  // 如果只有一页，不显示分页
  if (totalPages <= 1) {
    return null;
  }

  // 生成页码数组
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="home-pagination-wrapper" aria-label="文章分页">
      {pageNumbers.map((pageNum) => (
        <a
          key={pageNum}
          href={pageNum === 1 ? '/' : `/posts/${pageNum}/`}
          className={`home-pagination-link ${pageNum === 1 ? 'active' : ''}`}
          aria-label={`第 ${pageNum} 页`}
        >
          {pageNum}
        </a>
      ))}
      
      {totalPages > 1 && (
        <a
          href="/posts/2/"
          className="home-pagination-link home-pagination-next"
          aria-label="下一页"
        >
          Next »
        </a>
      )}
    </nav>
  );
}