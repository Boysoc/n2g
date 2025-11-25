import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";
import { remark } from 'remark';
import remarkHtml from 'remark-html';

// 处理自定义格式的函数
function processCustomFormatting(html: string): string {
  // 处理 ::indent 标记
  // 处理 ::indent 在段落开头的情况
  html = html.replace(
    /<p>\s*::indent\s*(.*?)<\/p>/gs,
    '<p class="custom-indent">$1</p>'
  );
  
  // 处理 ::drop-cap 标记
  // 处理 ::drop-cap 在段落开头的情况
  html = html.replace(
    /<p>\s*::drop-cap\s*(.*?)<\/p>/gs,
    '<p class="drop-cap">$1</p>'
  );
  
  return html;
}

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  posts.forEach(post => {
    // 使用 remark 处理 Markdown 内容
    const processedContent = remark()
      .use(remarkHtml, { sanitize: false })
      .processSync(post.body);
    
    const htmlContent = processedContent.toString();
    
    // 应用自定义格式处理
    const finalHtml = processCustomFormatting(htmlContent);
    
    // 调试信息：打印处理后的HTML内容
    if (post.slug === '2025-06-18' || post.slug === '2025-08-23') {
      console.log('=== 文章:', post.slug, ' ===');
      console.log('=== 原始内容 ===');
      console.log(post.body);
      console.log('=== 处理后的HTML ===');
      console.log(finalHtml);
    }
    
    post.data.description = finalHtml;
  });
  
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};


export default getSortedPosts;
