// 高亮搜索关键词的工具函数
export function highlightText(html: string, searchTerm: string): string {
  if (!searchTerm || !html) return html;
  
  // 转义特殊字符
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // 创建正则表达式，忽略大小写
  const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
  
  // 智能高亮函数：只在文本内容中高亮，不破坏HTML标签
  return html.replace(/>[^<]*</g, (match) => {
    // 提取标签之间的文本内容
    const textContent = match.slice(1, -1);
    if (textContent.trim()) {
      // 对文本内容进行高亮处理
      const highlightedText = textContent.replace(regex, '<mark style="background-color: #ffeb3b; padding: 1px 2px; border-radius: 2px; font-weight: bold;">$1</mark>');
      return '>' + highlightedText + '<';
    }
    return match;
  }).replace(/^[^<]+/, (match) => {
    // 处理开头的文本内容（不在标签内的）
    return match.replace(regex, '<mark style="background-color: #ffeb3b; padding: 1px 2px; border-radius: 2px; font-weight: bold;">$1</mark>');
  }).replace(/>[^<]*$/, (match) => {
    // 处理结尾的文本内容（不在标签内的）
    const textContent = match.slice(1);
    if (textContent.trim()) {
      const highlightedText = textContent.replace(regex, '<mark style="background-color: #ffeb3b; padding: 1px 2px; border-radius: 2px; font-weight: bold;">$1</mark>');
      return '>' + highlightedText;
    }
    return match;
  });
}

// 简单文本高亮函数（用于纯文本内容）
export function highlightSimpleText(text: string, searchTerm: string): string {
  if (!searchTerm || !text) return text;
  
  // 转义特殊字符
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // 创建正则表达式，忽略大小写
  const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
  
  // 替换匹配的文本，添加高亮标签
  return text.replace(regex, '<mark style="background-color: #ffeb3b; padding: 1px 2px; border-radius: 2px; font-weight: bold;">$1</mark>');
}