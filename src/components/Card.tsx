import React, { useMemo } from 'react';
import { slugifyStr } from "../utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
import { highlightText, highlightSimpleText } from "@utils/highlightText";

// 创建 MarkdownIt 实例
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});

// 添加对表格的支持
md.enable(['table']);

export interface Props {
  href?: string;
  slug?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
  searchTerm?: string; // 新增搜索关键词属性
}

export default function Card({ href, slug="none-slug", frontmatter, secHeading = true, searchTerm }: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;


  const headerProps = {
    style: { viewTransitionName: slugifyStr(slug) },
    className: "card-title-link",
  };

  // 使用 useMemo 来缓存渲染结果，提高性能
  const renderedDescription = useMemo(() => {
    if (!description) return '';
    
    // 先使用 MarkdownIt 将 Markdown 转换为 HTML
    let htmlContent = md.render(description);
    
    // 如果有搜索关键词，在HTML内容中进行高亮处理
    if (searchTerm) {
      htmlContent = highlightText(htmlContent, searchTerm);
    }
    
    // 然后使用 sanitizeHtml 清理 HTML，防止 XSS 攻击
    return sanitizeHtml(htmlContent, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        'img', 'mark', 'pre', 'code', 'blockquote', 'table', 'thead', 'tbody', 
        'tr', 'td', 'th', 'del', 'ins', 'sub', 'sup', 'details', 'summary'
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'title', 'width', 'height'],
        mark: ['style'],
        pre: ['class'],
        code: ['class'],
        blockquote: ['class'],
        table: ['class'],
        thead: ['class'],
        tbody: ['class'],
        tr: ['class'],
        td: ['class', 'colspan', 'rowspan'],
        th: ['class', 'colspan', 'rowspan'],
        details: ['open'],
        summary: ['class']
      }
    });
  }, [description, searchTerm]);

  // 高亮标题
  const highlightedTitle = useMemo(() => {
    return searchTerm ? highlightSimpleText(title, searchTerm) : title;
  }, [title, searchTerm]);

  return (
    <li className="card-list-li">
      <div className="card-meta">
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      </div>
      <a href={href} className="card-title">
        {secHeading ? (
          <h2 {...headerProps} dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
        ) : (
          <h3 {...headerProps} dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
        )}
      </a>
      {description && (
        <div 
          className="card-description" 
          dangerouslySetInnerHTML={{ __html: renderedDescription }} 
        />
      )}
    </li>
  );
}