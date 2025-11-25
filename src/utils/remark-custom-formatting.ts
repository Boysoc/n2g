import { visit } from 'unist-util-visit';
import type { Node } from 'unist';

// 自定义插件，处理 ::indent 和 ::drop-cap 语法
export function remarkCustomFormatting() {
  return (tree: Node) => {
    visit(tree, 'element', (node: any) => {
      // 只处理段落元素
      if (node.tagName !== 'p') return;
      
      // 获取段落的文本内容
      const textContent = node.children
        .filter((child: any) => child.type === 'text')
        .map((child: any) => child.value)
        .join('');
      
      // 检查是否包含 ::indent 标记
      if (textContent.trim().startsWith('::indent')) {
        // 移除 ::indent 标记
        const firstChild = node.children.find((child: any) => child.type === 'text');
        if (firstChild) {
          firstChild.value = firstChild.value.replace(/^::indent\s*/, '');
        }
        
        // 添加自定义类名
        if (!node.properties) node.properties = {};
        node.properties.className = ['custom-indent'];
      }
      
      // 检查是否包含 ::drop-cap 标记
      if (textContent.trim().startsWith('::drop-cap')) {
        // 移除 ::drop-cap 标记
        const firstChild = node.children.find((child: any) => child.type === 'text');
        if (firstChild) {
          firstChild.value = firstChild.value.replace(/^::drop-cap\s*/, '');
        }
        
        // 添加自定义类名
        if (!node.properties) node.properties = {};
        node.properties.className = ['drop-cap'];
      }
    });
  };
}