import rawManifest from "../generated/image-manifest.json";

export interface ImageVariant {
  src: string;
  width: number;
}

export interface ImageManifestEntry {
  width: number;
  height: number;
  avif: ImageVariant[];
  webp: ImageVariant[];
}

const manifest = rawManifest as Record<string, ImageManifestEntry>;
export const singleImageSizes = "(max-width: 640px) calc(100vw - 32px), 880px";
export const galleryImageSizes = "(max-width: 640px) calc(100vw - 32px), 440px";

export function getImageManifestEntry(
  src: string,
): ImageManifestEntry | undefined {
  const pathname = src.split(/[?#]/, 1)[0];
  return pathname.startsWith("/images/") ? manifest[pathname] : undefined;
}

export function createSrcSet(variants: ImageVariant[]): string {
  return variants
    .map((variant) => `${variant.src} ${variant.width}w`)
    .join(", ");
}

export function getOrientationClass(entry: ImageManifestEntry): string {
  const ratio = entry.width / entry.height;
  if (ratio >= 1.45) return "responsive-image--wide";
  if (ratio <= 0.78) return "responsive-image--portrait";
  return "responsive-image--standard";
}

export function getRatioClass(entry: ImageManifestEntry): string {
  const ratio = Math.min(2, Math.max(0.5, entry.width / entry.height));
  const bucket = Math.round(ratio * 4) * 25;
  return `responsive-image--ratio-${bucket}`;
}

function readAttribute(attributes: string, name: string): string | undefined {
  return attributes.match(
    new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"),
  )?.[1];
}

function removeAttribute(attributes: string, name: string): string {
  return attributes.replace(
    new RegExp(`\\s+${name}(?:\\s*=\\s*(?:["'][^"']*["']|[^\\s>]+))?`, "gi"),
    "",
  );
}

function enhanceImageTag(
  tag: string,
  sizes: string,
  interactive: boolean,
): string {
  if (/\bdata-responsive-image\b/i.test(tag)) return tag;
  const attributes = tag.replace(/^<img\b/i, "").replace(/\/?>\s*$/, "");
  const src = readAttribute(attributes, "src");
  if (!src) return tag;
  const interactionAttributes = interactive
    ? ' tabindex="0" role="button" aria-label="查看大图"'
    : "";
  const entry = getImageManifestEntry(src);
  if (!entry) {
    let fallbackAttributes = removeAttribute(
      removeAttribute(attributes, "loading"),
      "decoding",
    );
    return `<img${fallbackAttributes} loading="lazy" decoding="async"${interactionAttributes}>`;
  }

  let imageAttributes = attributes;
  for (const name of [
    "loading",
    "decoding",
    "width",
    "height",
    "data-full-src",
    "data-responsive-image",
  ]) {
    imageAttributes = removeAttribute(imageAttributes, name);
  }
  const className = getOrientationClass(entry);
  const ratioClassName = getRatioClass(entry);
  return [
    `<picture class="responsive-image ${className} ${ratioClassName}" data-responsive-image>`,
    `<source type="image/avif" srcset="${createSrcSet(entry.avif)}" sizes="${sizes}">`,
    `<source type="image/webp" srcset="${createSrcSet(entry.webp)}" sizes="${sizes}">`,
    `<img${imageAttributes} width="${entry.width}" height="${entry.height}" loading="lazy" decoding="async" data-full-src="${src}" data-responsive-image${interactionAttributes}>`,
    "</picture>",
  ].join("");
}

export function enhanceImageHtml(
  html: string,
  options: { interactive?: boolean } = {},
): string {
  const interactive = options.interactive ?? false;
  const galleryPattern =
    /<figure\b[^>]*class=["'][^"']*\bphoto-gallery\b[^"']*["'][^>]*>[\s\S]*?<\/figure>/gi;
  const withGalleries = html.replace(galleryPattern, (gallery) =>
    gallery.replace(/<img\b[^>]*>/gi, (tag) =>
      enhanceImageTag(tag, galleryImageSizes, interactive),
    ),
  );
  return withGalleries.replace(/<img\b[^>]*>/gi, (tag) =>
    enhanceImageTag(tag, singleImageSizes, interactive),
  );
}
