import { remark } from "remark";
import remarkHtml from "remark-html";
import sanitizeHtml from "sanitize-html";
import { enhanceImageHtml } from "./responsive-images";

const FIGURE_PATTERN =
  /<figure\b[^>]*class=["'][^"']*\bphoto-(?:single|gallery)\b[^"']*["'][^>]*>[\s\S]*?<\/figure>/i;
const FIGURE_PATTERN_GLOBAL =
  /<figure\b[^>]*class=["'][^"']*\bphoto-(?:single|gallery)\b[^"']*["'][^>]*>[\s\S]*?<\/figure>/gi;
const STANDALONE_IMAGE_PATTERN = /<p>\s*(<img\b[^>]*>)\s*<\/p>/i;
const IMAGE_PATTERN = /<img\b[^>]*>/i;
const MAX_PREVIEW_TEXT_CHARACTERS = 1100;

export interface PostPreview {
  media: string;
  content: string;
}

function keepFirstTwoImages(figure: string): string {
  let imageCount = 0;

  return figure.replace(/<img\b[^>]*>/gi, (image) => {
    imageCount += 1;
    return imageCount <= 2 ? image : "";
  });
}

function getCandidate(
  html: string,
  pattern: RegExp,
  transform: (match: RegExpExecArray) => string,
) {
  const match = pattern.exec(html);
  return match
    ? { index: match.index, html: transform(match) }
    : { index: Number.POSITIVE_INFINITY, html: "" };
}

function extractPreviewContent(html: string): string {
  const content = html
    .replace(FIGURE_PATTERN_GLOBAL, "")
    .replace(/<picture\b[^>]*>[\s\S]*?<\/picture>/gi, "")
    .replace(/<img\b[^>]*>/gi, "")
    .replace(
      /<figure\b[^>]*>\s*(?:<figcaption\b[^>]*>[\s\S]*?<\/figcaption>)?\s*<\/figure>/gi,
      "",
    )
    .replace(/<(?:script|style)\b[^>]*>[\s\S]*?<\/(?:script|style)>/gi, "")
    .replace(/<p>\s*<\/p>/gi, "")
    .trim();
  let remainingCharacters = MAX_PREVIEW_TEXT_CHARACTERS;

  return sanitizeHtml(content, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "details",
      "summary",
      "figure",
      "figcaption",
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      details: ["open"],
      figure: ["class"],
      p: ["class"],
    },
    textFilter(text) {
      if (remainingCharacters <= 0) return "";

      const visibleText = text.slice(0, remainingCharacters);
      remainingCharacters -= visibleText.length;
      return visibleText;
    },
  })
    .replace(/<(p|h[1-6]|li|blockquote|pre|code)\b[^>]*>\s*<\/\1>/gi, "")
    .trim();
}

export default function getPostPreview(markdown: string): PostPreview {
  const html = remark()
    .use(remarkHtml, { sanitize: false })
    .processSync(markdown)
    .toString();
  const candidates = [
    getCandidate(html, FIGURE_PATTERN, (match) => keepFirstTwoImages(match[0])),
    getCandidate(
      html,
      STANDALONE_IMAGE_PATTERN,
      (match) => `<figure class="photo-single">${match[1]}</figure>`,
    ),
    getCandidate(
      html,
      IMAGE_PATTERN,
      (match) => `<figure class="photo-single">${match[0]}</figure>`,
    ),
  ];
  const firstMedia = candidates.sort((a, b) => a.index - b.index)[0];

  return {
    media: firstMedia?.html ? enhanceImageHtml(firstMedia.html) : "",
    content: extractPreviewContent(html),
  };
}
