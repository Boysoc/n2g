import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  slug?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, slug="none-slug", frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(slug) },
    className: "text-xl font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="card-list-li">
      <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      <a
        href={href}
        className="card-title"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <p>{description}</p>
    </li>
  );
}
