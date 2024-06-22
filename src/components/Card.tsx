import React, { useMemo } from 'react';
import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'

// 创建 MarkdownIt 实例
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
});

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

  // 使用 useMemo 来缓存渲染结果，提高性能
  const renderedDescription = useMemo(() => {
    // 首先使用 MarkdownIt 将 Markdown 转换为 HTML
    const htmlContent = md.render(description);
    
    // 然后使用 sanitizeHtml 清理 HTML，防止 XSS 攻击
    return sanitizeHtml(htmlContent, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'title']
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