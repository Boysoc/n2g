import { useMemo } from "react";
import sanitizeHtml from "sanitize-html";
import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  slug?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
  variant?: "default" | "preview";
  previewMedia?: string;
  previewContent?: string;
}

function sanitizeRichContent(content: string) {
  return sanitizeHtml(content, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "details",
      "summary",
      "figure",
      "figcaption",
      "img",
      "picture",
      "source",
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: [
        "src",
        "alt",
        "title",
        "loading",
        "decoding",
        "width",
        "height",
        "data-full-src",
        "data-responsive-image",
      ],
      picture: ["class", "data-responsive-image"],
      source: ["type", "srcset", "sizes"],
      p: ["class"],
      figure: ["class"],
      details: ["open"],
    },
    allowedClasses: {
      figure: ["photo-gallery", "photo-single"],
      picture: [
        "responsive-image",
        "responsive-image--wide",
        "responsive-image--standard",
        "responsive-image--portrait",
        "responsive-image--ratio-50",
        "responsive-image--ratio-75",
        "responsive-image--ratio-100",
        "responsive-image--ratio-125",
        "responsive-image--ratio-150",
        "responsive-image--ratio-175",
        "responsive-image--ratio-200",
      ],
      p: ["custom-indent", "drop-cap"],
    },
  });
}

export default function Card({
  href,
  slug = "none-slug",
  frontmatter,
  secHeading = true,
  variant = "default",
  previewMedia = "",
  previewContent = "",
}: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;
  const renderedDescription = useMemo(
    () => sanitizeRichContent(description),
    [description],
  );
  const renderedPreviewMedia = useMemo(
    () => sanitizeRichContent(previewMedia),
    [previewMedia],
  );
  const renderedPreviewContent = useMemo(
    () => sanitizeRichContent(previewContent),
    [previewContent],
  );
  const headingProps = {
    style: { viewTransitionName: slugifyStr(slug) },
    className: "card-heading",
  };

  return (
    <li
      className="card-list-li"
      data-preview-card={variant === "preview" || undefined}
    >
      <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      <a href={href} className="card-title">
        {secHeading ? (
          <h2 {...headingProps}>{title}</h2>
        ) : (
          <h3 {...headingProps}>{title}</h3>
        )}
      </a>

      {variant === "preview" ? (
        <>
          {renderedPreviewMedia && (
            <div
              className="post-content home-preview-media"
              dangerouslySetInnerHTML={{ __html: renderedPreviewMedia }}
            />
          )}
          {renderedPreviewContent && (
            <div
              className="post-content post-preview-content"
              data-post-preview
              dangerouslySetInnerHTML={{ __html: renderedPreviewContent }}
            />
          )}
          {href && (
            <a
              href={href}
              className="read-more-link"
              data-preview-read-more
              aria-label={`阅读全文：${title}`}
            >
              <span>阅读全文</span>
              <span className="read-more-arrow" aria-hidden="true">
                →
              </span>
            </a>
          )}
        </>
      ) : (
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: renderedDescription }}
        />
      )}
    </li>
  );
}
