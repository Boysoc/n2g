---
title: "Astro 博客文章模板"
description: "一篇用于复制和参考的 Astro 博客文章模板，包含本项目推荐的 Frontmatter 字段。"
pubDate: 2026-08-01T00:00:00+08:00
updatedDate: 2026-08-01T00:00:00+08:00
author: "博主"
categories:
  - "博客"
tags:
  - "Astro"
  - "Markdown"
featured: false
draft: true

# cardImage: "../../assets/posts/optimized/your-card.webp"
# cardImageAlt: "首页卡片封面说明"

# heroImage: "../../assets/posts/optimized/your-hero.webp"
# heroImageAlt: "文章顶部大图说明"
---

这是一篇留给以后使用的文章模板。复制此文件后，先修改标题、摘要、发布日期、分类和标签，再开始写正文。

## 使用时注意

- `title` 和 `pubDate` 是必填字段，日期推荐使用带时区的 ISO 8601 格式。
- `description` 建议填写，它用于页面 Meta、RSS 和搜索；不填时系统会尝试从正文生成。
- 卡片摘要优先使用 `excerpt`；没有 `excerpt` 时自动截取正文，并最多显示三行，不需要为了卡片重写 `description`。
- 原文章已有 `slug` 就保留；没有就省略，不要为了“完整”而补写。
- `cardImage` 只控制首页和列表卡片封面，`heroImage` 只控制文章顶部大图；两者互不复用，未填写就不显示。
- 正文中的图片只在正文原位置显示，不会自动成为卡片封面或文章顶部大图。
- 高清原图可保留在 `src/assets/posts`；网页引用的副本建议转为 WebP、限制在 1280px 以内，放入 `src/assets/posts/optimized`。
- 正文使用发布副本的相对路径，例如 `![图片说明](../../assets/posts/optimized/example.webp)`，Astro 会再自动生成尺寸与响应式图片。
- `cardImage` 与 `heroImage` 也建议指向 `src/assets/posts/optimized` 中的本地图片，Astro 会为卡片和顶部大图生成各自合适的尺寸。
- 准备发布时，把 `draft` 改成 `false`；如果修改过文章，再更新 `updatedDate`。

Frontmatter 只负责描述文章，正文仍然应该从一个清楚、直接的观点开始。
