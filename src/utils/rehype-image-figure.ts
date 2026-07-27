import { visit, SKIP } from "unist-util-visit";
import type { Node } from "unist";
import {
  createSrcSet,
  enhanceImageHtml,
  galleryImageSizes,
  getImageManifestEntry,
  getOrientationClass,
  getRatioClass,
  singleImageSizes,
} from "./responsive-images";

function classList(node: any): string[] {
  const value = node?.properties?.className;
  if (Array.isArray(value)) return value.map(String);
  return typeof value === "string" ? value.split(/\s+/) : [];
}

/**
 * Turns article images into responsive pictures and wraps standalone images in
 * figures. Local images receive intrinsic dimensions, AVIF/WebP source sets,
 * lazy decoding and a full-resolution lightbox target.
 */
export function rehypeImageFigure() {
  return (tree: Node) => {
    visit(tree, "raw", (node: any) => {
      if (typeof node.value === "string" && /<img\b/i.test(node.value)) {
        node.value = enhanceImageHtml(node.value, { interactive: true });
      }
    });

    visit(
      tree,
      "element",
      (node: any, index: number | undefined, parent: any) => {
        if (node.tagName !== "img" || node.properties?.dataResponsiveImage)
          return;
        if (!parent || typeof index !== "number") return;

        node.properties ||= {};
        node.properties.loading = "lazy";
        node.properties.decoding = "async";
        node.properties.tabIndex = 0;
        node.properties.role = "button";
        node.properties.ariaLabel = node.properties.alt
          ? `查看大图：${node.properties.alt}`
          : "查看大图";
        node.properties.dataResponsiveImage = true;

        const title =
          typeof node.properties.title === "string"
            ? node.properties.title
            : undefined;
        if (title) delete node.properties.title;
        const src =
          typeof node.properties.src === "string" ? node.properties.src : "";
        const entry = getImageManifestEntry(src);
        const isGallery =
          parent.tagName === "figure" &&
          classList(parent).includes("photo-gallery");
        const sizes = isGallery ? galleryImageSizes : singleImageSizes;
        let renderedImage: any = node;

        if (entry) {
          node.properties.width = entry.width;
          node.properties.height = entry.height;
          node.properties.dataFullSrc = src;
          renderedImage = {
            type: "element",
            tagName: "picture",
            properties: {
              className: [
                "responsive-image",
                getOrientationClass(entry),
                getRatioClass(entry),
              ],
              dataResponsiveImage: true,
            },
            children: [
              {
                type: "element",
                tagName: "source",
                properties: {
                  type: "image/avif",
                  srcSet: createSrcSet(entry.avif),
                  sizes,
                },
                children: [],
              },
              {
                type: "element",
                tagName: "source",
                properties: {
                  type: "image/webp",
                  srcSet: createSrcSet(entry.webp),
                  sizes,
                },
                children: [],
              },
              node,
            ],
          };
        }

        if (parent.tagName === "figure") {
          parent.children[index] = renderedImage;
          if (
            title &&
            !parent.children.some(
              (child: any) => child.tagName === "figcaption",
            )
          ) {
            parent.children.push({
              type: "element",
              tagName: "figcaption",
              properties: {},
              children: [{ type: "text", value: title }],
            });
          }
          return [SKIP, index];
        }

        const figure: any = {
          type: "element",
          tagName: "figure",
          properties: { className: ["photo-single"] },
          children: [renderedImage],
        };
        if (title) {
          figure.children.push({
            type: "element",
            tagName: "figcaption",
            properties: {},
            children: [{ type: "text", value: title }],
          });
        }
        parent.children[index] = figure;
        return [SKIP, index];
      },
    );
  };
}
