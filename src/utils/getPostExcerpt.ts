import { marked } from 'marked';

// 配置 marked 选项
marked.setOptions({
  breaks: true,
  gfm: true,
});

export function getPostExcerpt(content: string, maxLines: number = 20): { excerpt: string; hasMore: boolean } {
  // 移除 frontmatter
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n/, '');
  
  // 按行分割，过滤空行
  const lines = contentWithoutFrontmatter.split('\n');
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  
  // 如果行数少于等于最大行数，返回全部内容
  if (nonEmptyLines.length <= maxLines) {
    const markdownContent = contentWithoutFrontmatter.trim();
    return {
      excerpt: marked(markdownContent),
      hasMore: false
    };
  }
  
  // 截取前 maxLines 行（包括空行以保持格式）
  let lineCount = 0;
  let excerptLines: string[] = [];
  
  for (const line of lines) {
    excerptLines.push(line);
    if (line.trim() !== '') {
      lineCount++;
      if (lineCount >= maxLines) {
        break;
      }
    }
  }
  
  const markdownExcerpt = excerptLines.join('\n').trim();
  
  return {
    excerpt: marked(markdownExcerpt),
    hasMore: true
  };
}
