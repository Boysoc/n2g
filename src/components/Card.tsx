import React, { useMemo } from 'react';
import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import sanitizeHtml from 'sanitize-html'

export interface Props {
  href?: string;
  slug?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, slug="none-slug", frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(slug) },
    className: "text-xl font-medium decoration-dashed hover:underline",
  };

  // 使用 useMemo 来缓存处理结果，提高性能
  // description 已经在 getSortedPosts.ts 中通过 remark 处理过了，这里只需要清理 HTML
  const renderedDescription = useMemo(() => {
    // 创建一个新的数组，包含默认标签和我们要添加的标签
    const allowedTags = [...sanitizeHtml.defaults.allowedTags, 'img', 'details', 'summary'];
    
    return sanitizeHtml(description, {
      allowedTags: allowedTags,
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'title'],
        p: ['class'], // 允许 p 标签有 class 属性
        details: ['open'] // 允许 details 标签有 open 属性
      }
    });
  }, [description]);

  return (
    <li className="card-list-li">
      <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      <a
        href={href}
        className="card-title"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <div 
        className="post-content" 
        dangerouslySetInnerHTML={{ __html: renderedDescription }} 
      />
    </li>
  );
}