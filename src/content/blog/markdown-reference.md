---
author: Xio
pubDatetime: 2025-01-20T10:00:00Z
title: "Markdown 语法参考文档"
slug: "markdown-reference"
featured: true
draft: false
tags:
  - markdown
  - 文档
  - 参考
ogImage: ""
description: "完整的 Markdown 语法参考文档，展示本平台支持的所有格式化元素和语法示例。"
---

# Markdown 语法参考文档

本文档展示了本博客平台支持的所有 Markdown 语法元素，每个语法都包含工作示例和说明。

## 目录

- [标题](#标题)
- [文本格式](#文本格式)
- [列表](#列表)
- [链接](#链接)
- [图片](#图片)
- [代码](#代码)
- [表格](#表格)
- [引用](#引用)
- [分割线](#分割线)
- [特殊字符](#特殊字符)
- [HTML标签](#html标签)

## 标题

Markdown 支持六级标题，使用 `#` 符号：

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

效果展示：

# 一级标题示例
## 二级标题示例
### 三级标题示例
#### 四级标题示例
##### 五级标题示例
###### 六级标题示例

## 文本格式

### 基本格式

```markdown
**粗体文本**
*斜体文本*
***粗斜体文本***
~~删除线文本~~
`行内代码`
```

效果展示：

**粗体文本**  
*斜体文本*  
***粗斜体文本***  
~~删除线文本~~  
`行内代码`

### 下划线和上标下标

```markdown
<u>下划线文本</u>
X<sup>2</sup> (上标)
H<sub>2</sub>O (下标)
```

效果展示：

<u>下划线文本</u>  
X<sup>2</sup> (上标)  
H<sub>2</sub>O (下标)

## 列表

### 无序列表

```markdown
- 项目一
- 项目二
  - 子项目一
  - 子项目二
    - 子子项目
- 项目三

* 使用星号
+ 使用加号
```

效果展示：

- 项目一
- 项目二
  - 子项目一
  - 子项目二
    - 子子项目
- 项目三

* 使用星号
+ 使用加号

### 有序列表

```markdown
1. 第一项
2. 第二项
   1. 子项目一
   2. 子项目二
3. 第三项
```

效果展示：

1. 第一项
2. 第二项
   1. 子项目一
   2. 子项目二
3. 第三项

### 任务列表

```markdown
- [x] 已完成任务
- [ ] 未完成任务
- [x] 另一个已完成任务
```

效果展示：

- [x] 已完成任务
- [ ] 未完成任务
- [x] 另一个已完成任务

## 链接

### 基本链接

```markdown
[链接文本](https://example.com)
[带标题的链接](https://example.com "这是标题")
<https://example.com>
```

效果展示：

[链接文本](https://example.com)  
[带标题的链接](https://example.com "这是标题")  
<https://example.com>

### 引用式链接

```markdown
[引用式链接][1]
[另一个引用][link-ref]

[1]: https://example.com
[link-ref]: https://example.com "可选标题"
```

效果展示：

[引用式链接][1]  
[另一个引用][link-ref]

[1]: https://example.com
[link-ref]: https://example.com "可选标题"

### 内部链接

```markdown
[跳转到标题](#标题)
[跳转到代码部分](#代码)
```

效果展示：

[跳转到标题](#标题)  
[跳转到代码部分](#代码)

## 图片

### 基本图片

```markdown
![替代文本](https://via.placeholder.com/300x200 "图片标题")
```

效果展示：

![替代文本](https://via.placeholder.com/300x200 "图片标题")

### 引用式图片

```markdown
![替代文本][image-ref]

[image-ref]: https://via.placeholder.com/200x150 "引用式图片"
```

效果展示：

![替代文本][image-ref]

[image-ref]: https://via.placeholder.com/200x150 "引用式图片"

### 带链接的图片

```markdown
[![图片](https://via.placeholder.com/150x100)](https://example.com)
```

效果展示：

[![图片](https://via.placeholder.com/150x100)](https://example.com)

## 代码

### 行内代码

```markdown
这是 `行内代码` 示例。
```

效果展示：

这是 `行内代码` 示例。

### 代码块

````markdown
```javascript
function hello() {
    console.log("Hello, World!");
}
```
````

效果展示：

```javascript
function hello() {
    console.log("Hello, World!");
}
```

### 不同语言的代码块

````markdown
```python
def hello():
    print("Hello, Python!")
```

```css
.example {
    color: #333;
    font-size: 16px;
}
```

```html
<div class="example">
    <p>HTML 示例</p>
</div>
```
````

效果展示：

```python
def hello():
    print("Hello, Python!")
```

```css
.example {
    color: #333;
    font-size: 16px;
}
```

```html
<div class="example">
    <p>HTML 示例</p>
</div>
```

### 无语言标识的代码块

```
这是没有语言标识的代码块
可以用来显示纯文本
```

## 表格

### 基本表格

```markdown
| 标题1 | 标题2 | 标题3 |
|-------|-------|-------|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |
```

效果展示：

| 标题1 | 标题2 | 标题3 |
|-------|-------|-------|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |

### 对齐表格

```markdown
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 左     | 中       | 右     |
| 内容   | 内容     | 内容   |
```

效果展示：

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 左     | 中       | 右     |
| 内容   | 内容     | 内容   |

### 复杂表格

```markdown
| 功能 | 支持 | 说明 |
|------|:----:|------|
| **粗体** | ✅ | 完全支持 |
| *斜体* | ✅ | 完全支持 |
| `代码` | ✅ | 行内代码 |
| [链接](https://example.com) | ✅ | 外部链接 |
```

效果展示：

| 功能 | 支持 | 说明 |
|------|:----:|------|
| **粗体** | ✅ | 完全支持 |
| *斜体* | ✅ | 完全支持 |
| `代码` | ✅ | 行内代码 |
| [链接](https://example.com) | ✅ | 外部链接 |

## 引用

### 基本引用

```markdown
> 这是一个引用块。
> 可以包含多行内容。
```

效果展示：

> 这是一个引用块。
> 可以包含多行内容。

### 嵌套引用

```markdown
> 第一层引用
> > 第二层引用
> > > 第三层引用
```

效果展示：

> 第一层引用
> > 第二层引用
> > > 第三层引用

### 引用中的其他元素

```markdown
> ## 引用中的标题
> 
> 引用中可以包含：
> - 列表项
> - **粗体文本**
> - `代码`
> 
> ```javascript
> // 甚至代码块
> console.log("Hello");
> ```
```

效果展示：

> ## 引用中的标题
> 
> 引用中可以包含：
> - 列表项
> - **粗体文本**
> - `代码`
> 
> ```javascript
> // 甚至代码块
> console.log("Hello");
> ```

## 分割线

```markdown
---
***
___
```

效果展示：

---

***

___

## 特殊字符

### 转义字符

```markdown
\* 不是斜体
\# 不是标题
\` 不是代码
\\ 反斜杠
```

效果展示：

\* 不是斜体  
\# 不是标题  
\` 不是代码  
\\ 反斜杠

### 特殊符号

```markdown
版权符号: &copy;
注册商标: &reg;
商标符号: &trade;
小于号: &lt;
大于号: &gt;
和号: &amp;
```

效果展示：

版权符号: &copy;  
注册商标: &reg;  
商标符号: &trade;  
小于号: &lt;  
大于号: &gt;  
和号: &amp;

## HTML标签

### 基本HTML标签

```markdown
<strong>强调文本</strong>
<em>斜体文本</em>
<mark>高亮文本</mark>
<small>小号文本</small>
```

效果展示：

<strong>强调文本</strong>  
<em>斜体文本</em>  
<mark>高亮文本</mark>  
<small>小号文本</small>

### 键盘按键

```markdown
按 <kbd>Ctrl</kbd> + <kbd>C</kbd> 复制
按 <kbd>Ctrl</kbd> + <kbd>V</kbd> 粘贴
```

效果展示：

按 <kbd>Ctrl</kbd> + <kbd>C</kbd> 复制  
按 <kbd>Ctrl</kbd> + <kbd>V</kbd> 粘贴

### 详情折叠

```markdown
<details>
<summary>点击展开详情</summary>

这里是折叠的内容。

- 可以包含列表
- **格式化文本**
- `代码`

```javascript
console.log("甚至代码块");
```

</details>
```

效果展示：

<details>
<summary>点击展开详情</summary>

这里是折叠的内容。

- 可以包含列表
- **格式化文本**
- `代码`

```javascript
console.log("甚至代码块");
```

</details>

## 注意事项和限制

### 1. 空行的重要性
- 列表项之间需要空行来分隔不同的列表
- 代码块前后需要空行
- 引用块前后建议添加空行

### 2. 缩进规则
- 列表的子项目需要正确缩进（2或4个空格）
- 代码块的缩进会被保留

### 3. 特殊情况
- 表格中的管道符 `|` 需要转义：`\|`
- 在代码块中显示三个反引号需要使用四个反引号包围

### 4. 最佳实践
- 使用一致的列表标记（建议使用 `-`）
- 为图片添加有意义的替代文本
- 为链接添加描述性文本
- 保持文档结构清晰

## 兼容性说明

本平台基于标准 Markdown 语法，支持：
- ✅ CommonMark 标准
- ✅ GitHub Flavored Markdown (GFM)
- ✅ 基本 HTML 标签
- ✅ 语法高亮代码块
- ✅ 表格扩展
- ✅ 任务列表
- ✅ 删除线

---

*本文档会持续更新，如发现问题或有建议，欢迎反馈。*