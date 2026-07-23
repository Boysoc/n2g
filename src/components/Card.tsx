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
}

export default function Card({
  href,
  slug = "none-slug",
  frontmatter,
  secHeading = true,
}: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;
  const renderedDescription = useMemo(
    () =>
      sanitizeHtml(description, {
        allowedTags: [
          ...sanitizeHtml.defaults.allowedTags,
          "details",
          "summary",
          "img",
        ],
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ["src", "alt", "title"],
          p: ["class"],
          figure: ["class"],
          details: ["open"],
        },
        allowedClasses: {
          figure: ["photo-gallery", "photo-single"],
          p: ["custom-indent", "drop-cap"],
        },
      }),
    [description],
  );
  const headingProps = {
    style: { viewTransitionName: slugifyStr(slug) },
    className: "card-heading",
  };

  return (
    <li className="card-list-li">
      <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      <a href={href} className="card-title">
        {secHeading ? (
          <h2 {...headingProps}>{title}</h2>
        ) : (
          <h3 {...headingProps}>{title}</h3>
        )}
      </a>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: renderedDescription }}
      />
    </li>
  );
}
