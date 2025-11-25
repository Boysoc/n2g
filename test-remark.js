import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { remarkCustomFormatting } from './src/utils/remark-custom-formatting.ts';

const testMarkdown = `::indent
这是一个使用首行缩进的段落。

::drop-cap
这是一个使用首字下沉的段落。`;

const result = remark()
  .use(remarkCustomFormatting)
  .use(remarkHtml)
  .processSync(testMarkdown);

console.log('Processed HTML:');
console.log(result.toString());