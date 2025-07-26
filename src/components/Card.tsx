import React, { useMemo } from 'react';
import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'

// 创建 MarkdownIt 实例，启用代码高亮
const md: MarkdownIt = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  highlight: function (str: string, lang: string): string {
    // 使用网站现有的代码块样式类
    if (lang) {
      return `<pre class="astro-code" data-language="${lang}"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    }
    return `<pre class="astro-code"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
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

  // 按行数截取内容（保留格式）
  const getExcerptByLines = (content: string, maxLines: number = 25) => {
    const lines = content.split('\n');
    if (lines.length <= maxLines) {
      return { excerpt: content, hasMore: false };
    }
    
    const excerptLines = lines.slice(0, maxLines);
    return { 
      excerpt: excerptLines.join('\n'), 
      hasMore: true 
    };
  };

  const { excerpt, hasMore } = useMemo(() => getExcerptByLines(description), [description]);

  // 使用 useMemo 来缓存渲染结果，提高性能
  const renderedDescription = useMemo(() => {
    // 首先使用 MarkdownIt 将 Markdown 转换为 HTML
    const htmlContent = md.render(excerpt);
    
    // 然后使用 sanitizeHtml 清理 HTML，防止 XSS 攻击
    return sanitizeHtml(htmlContent, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'pre', 'code']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'title'],
        pre: ['class', 'data-language'],
        code: ['class']
      }
    });
  }, [excerpt]);

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
      <div className="post-content">
        <div dangerouslySetInnerHTML={{ __html: renderedDescription }} />
        {hasMore && (
          <a href={href} className="read-more-link">
            阅读剩余部分 →
          </a>
        )}
      </div>
    </li>
  );
}
