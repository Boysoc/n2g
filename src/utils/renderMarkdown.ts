import MarkdownIt from 'markdown-it';

// 创建 MarkdownIt 实例
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});

// 启用表格支持
md.enable(['table']);

export function renderMarkdown(content: string): string {
  if (!content) return '';
  return md.render(content);
}