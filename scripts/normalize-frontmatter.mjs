import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const postsDirectory = path.join(projectRoot, 'src', 'content', 'posts');
const checkOnly = process.argv.includes('--check');

const knownFields = new Set([
  'title',
  'description',
  'pubDate',
  'pubDatetime',
  'updatedDate',
  'author',
  'slug',
  'excerpt',
  'categories',
  'tags',
  'featured',
  'draft',
  'cardImage',
  'cardImageAlt',
  'cardImageWidth',
  'cardImageHeight',
  'heroImage',
  'heroImageAlt',
  'heroImageWidth',
  'heroImageHeight',
  'ogImage',
]);

function splitDocument(source, filePath) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);

  if (!match) {
    throw new Error(`${path.relative(projectRoot, filePath)} 缺少有效的 YAML frontmatter。`);
  }

  return {
    rawFrontmatter: match[1],
    body: source.slice(match[0].length),
  };
}

function readRawScalar(frontmatter, key) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = frontmatter.match(new RegExp(`^${escapedKey}:\\s*(.+?)\\s*$`, 'm'));
  if (!match) return undefined;

  const raw = match[1].trim();
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1);
  }

  return raw.replace(/\s+#.*$/, '').trim();
}

function quote(value) {
  return JSON.stringify(String(value ?? ''));
}

function dateValue(value) {
  if (value instanceof Date) return value.toISOString();
  return String(value ?? '').trim();
}

function appendArray(lines, key, value) {
  if (!Array.isArray(value)) {
    throw new Error(`${key} 必须是数组。`);
  }

  if (value.length === 0) {
    lines.push(`${key}: []`);
    return;
  }

  lines.push(`${key}:`);
  for (const item of value) lines.push(`  - ${quote(item)}`);
}

function appendImageFields(lines, data, prefix, defaults) {
  const image = typeof data[prefix] === 'string' ? data[prefix].trim() : '';
  const altKey = `${prefix}Alt`;
  const widthKey = `${prefix}Width`;
  const heightKey = `${prefix}Height`;

  if (!image) {
    const alt = typeof data[altKey] === 'string' && data[altKey].trim()
      ? data[altKey].trim()
      : defaults.alt;
    lines.push(`# ${prefix}: ${quote(defaults.path)}`);
    lines.push(`# ${altKey}: ${quote(alt)}`);
    return;
  }

  lines.push(`${prefix}: ${quote(image)}`);
  lines.push(`${altKey}: ${quote(data[altKey] ?? '')}`);
  if (data[widthKey] !== undefined) lines.push(`${widthKey}: ${Number(data[widthKey])}`);
  if (data[heightKey] !== undefined) lines.push(`${heightKey}: ${Number(data[heightKey])}`);
}

function normalizeData(rawFrontmatter, filePath) {
  const parsed = load(rawFrontmatter);
  const data = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? { ...parsed } : {};
  const unknownFields = Object.keys(data).filter((key) => !knownFields.has(key));

  if (unknownFields.length > 0) {
    throw new Error(
      `${path.relative(projectRoot, filePath)} 含有未识别字段：${unknownFields.join(', ')}。为避免丢失数据，已停止格式化。`,
    );
  }

  if (!data.title || (!data.pubDate && !data.pubDatetime)) {
    throw new Error(`${path.relative(projectRoot, filePath)} 必须包含 title 和 pubDate（或旧字段 pubDatetime）。`);
  }

  return data;
}

function renderFrontmatter(data, rawFrontmatter) {
  const lines = [
    '---',
    `title: ${quote(data.title)}`,
    `description: ${quote(data.description ?? '')}`,
  ];

  const rawPubDate = readRawScalar(rawFrontmatter, 'pubDate')
    ?? readRawScalar(rawFrontmatter, 'pubDatetime')
    ?? dateValue(data.pubDate ?? data.pubDatetime);
  lines.push(`pubDate: ${rawPubDate}`);

  if (data.updatedDate !== undefined) {
    const rawUpdatedDate = readRawScalar(rawFrontmatter, 'updatedDate') ?? dateValue(data.updatedDate);
    lines.push(`updatedDate: ${rawUpdatedDate}`);
  }

  if (data.author !== undefined && String(data.author).trim()) lines.push(`author: ${quote(data.author)}`);
  if (data.slug !== undefined && String(data.slug).trim()) lines.push(`slug: ${quote(data.slug)}`);
  if (data.excerpt !== undefined && String(data.excerpt).trim()) lines.push(`excerpt: ${quote(data.excerpt)}`);

  appendArray(lines, 'categories', data.categories ?? []);
  appendArray(lines, 'tags', data.tags ?? []);
  lines.push(`featured: ${Boolean(data.featured)}`);
  lines.push(`draft: ${Boolean(data.draft)}`);

  lines.push('');
  appendImageFields(lines, data, 'cardImage', {
    path: '../../assets/posts/optimized/your-card.webp',
    alt: '首页卡片封面说明',
  });

  lines.push('');
  appendImageFields(lines, data, 'heroImage', {
    path: '../../assets/posts/optimized/your-hero.webp',
    alt: '文章顶部大图说明',
  });

  if (typeof data.ogImage === 'string' && data.ogImage.trim()) {
    lines.push('', `ogImage: ${quote(data.ogImage.trim())}`);
  }

  lines.push('---');
  return lines.join('\n');
}

async function findMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await findMarkdownFiles(entryPath));
    else if (/\.mdx?$/i.test(entry.name)) files.push(entryPath);
  }

  return files.sort((left, right) => left.localeCompare(right));
}

const files = await findMarkdownFiles(postsDirectory);
const changedFiles = [];

for (const filePath of files) {
  const source = await readFile(filePath, 'utf8');
  const { rawFrontmatter, body } = splitDocument(source, filePath);
  const data = normalizeData(rawFrontmatter, filePath);
  const normalized = `${renderFrontmatter(data, rawFrontmatter)}\n${body}`;

  if (splitDocument(normalized, filePath).body !== body) {
    throw new Error(`${path.relative(projectRoot, filePath)} 的正文在格式化过程中发生变化。`);
  }

  if (normalized === source) continue;
  changedFiles.push(path.relative(projectRoot, filePath));
  if (!checkOnly) await writeFile(filePath, normalized, 'utf8');
}

if (checkOnly && changedFiles.length > 0) {
  console.error('以下文章的 frontmatter 尚未规范化：');
  for (const file of changedFiles) console.error(`- ${file}`);
  process.exitCode = 1;
} else {
  const verb = checkOnly ? '已检查' : '已规范化';
  console.log(`${verb} ${files.length} 篇文章；${changedFiles.length} 篇需要${checkOnly ? '' : '并已完成'}更新。`);
}
