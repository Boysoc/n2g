import feedparser
import html2text
import os
import re
from datetime import datetime

# RSS 地址
RSS_URL = "http://n2g.cn/feed/"
# 输出目录，根据实际情况修改（你说的是 src/content/blog）
OUTPUT_DIR = os.path.join("src", "content", "blog")

# 确保目录存在
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 解析 RSS
feed = feedparser.parse(RSS_URL)
converter = html2text.HTML2Text()
converter.ignore_links = False
converter.body_width = 0  # 不强制换行

def slugify(title):
    return re.sub(r'[^a-zA-Z0-9]+', '-', title.lower()).strip('-')

for entry in feed.entries:
    title = entry.title
    pub_date = datetime(*entry.published_parsed[:6]).strftime('%Y-%m-%d')
    content = converter.handle(entry.content[0].value if 'content' in entry else entry.summary)
    description = entry.summary if 'summary' in entry else ""

    slug = slugify(title)
    filename = f"{slug}.md"
    filepath = os.path.join(OUTPUT_DIR, filename)

    frontmatter = f"""---
title: "{title.replace('"', "'")}"
pubDate: "{pub_date}"
description: "{description.replace('"', "'")[:150]}"
---

{content}
"""

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(frontmatter)

    print(f"✅ 已保存: {filepath}")
