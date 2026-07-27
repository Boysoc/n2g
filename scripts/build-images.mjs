import {
  access,
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const publicDir = path.join(projectRoot, "public");
const imageRoot = path.join(publicDir, "images");
const outputRoot = path.join(imageRoot, "_optimized");
const manifestPath = path.join(
  projectRoot,
  "src",
  "generated",
  "image-manifest.json",
);
const scanExtensions = new Set([
  ".astro",
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mdx",
  ".ts",
  ".tsx",
]);
const supportedExtensions = new Set([
  ".avif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
]);
const targetWidths = [480, 880, 1280, 1760];
const encodeConcurrency = Math.max(
  2,
  Math.min(4, os.availableParallelism?.() ?? os.cpus().length),
);
const pipelineVersion = "avif56-e4-webp80-v1";
const stampPath = path.join(outputRoot, ".pipeline-version");

function assertSafeOutputDirectory() {
  const resolvedImages = path.resolve(imageRoot);
  const resolvedOutput = path.resolve(outputRoot);
  if (
    path.dirname(resolvedOutput) !== resolvedImages ||
    path.basename(resolvedOutput) !== "_optimized"
  ) {
    throw new Error(
      `Refusing to clean unexpected image directory: ${resolvedOutput}`,
    );
  }
}

async function collectSourceFiles(target, files = []) {
  for (const entry of await readdir(target, { withFileTypes: true })) {
    if (
      [".astro", ".git", "dist", "generated", "node_modules"].includes(
        entry.name,
      )
    )
      continue;
    const absolute = path.join(target, entry.name);
    if (entry.isDirectory()) await collectSourceFiles(absolute, files);
    else if (scanExtensions.has(path.extname(entry.name).toLowerCase()))
      files.push(absolute);
  }
  return files;
}

async function findReferencedImages() {
  const files = await collectSourceFiles(path.join(projectRoot, "src"));
  const references = new Set();
  const imagePattern =
    /(?<![\w.-])\/images\/[^\s"'()<>]+?\.(?:avif|jpe?g|png|webp)(?:\?[^\s"'()<>]*)?/gi;
  for (const file of files) {
    const content = await readFile(file, "utf8");
    for (const match of content.matchAll(imagePattern)) {
      const reference = match[0].split("?")[0];
      if (!reference.startsWith("/images/_optimized/"))
        references.add(reference);
    }
  }
  return [...references].sort();
}

function buildOutputUrl(sourceUrl, width, format) {
  const parsed = path.posix.parse(sourceUrl.replace(/^\/images\//, ""));
  const extension = parsed.ext.slice(1).toLowerCase();
  return path.posix.join(
    "/images/_optimized",
    parsed.dir,
    `${parsed.name}-${extension}-${width}.${format}`,
  );
}

async function createVariant(
  sourcePath,
  outputUrl,
  width,
  format,
  sourceExtension,
) {
  const outputPath = path.join(
    publicDir,
    outputUrl.replace(/^\//, "").split("/").join(path.sep),
  );
  await mkdir(path.dirname(outputPath), { recursive: true });
  try {
    const [sourceInfo, outputInfo] = await Promise.all([
      stat(sourcePath),
      stat(outputPath),
    ]);
    if (outputInfo.mtimeMs >= sourceInfo.mtimeMs) return false;
  } catch {
    // A missing output is expected on the first build.
  }
  let pipeline = sharp(sourcePath, { failOn: "warning" }).rotate().resize({
    width,
    withoutEnlargement: true,
    fit: "inside",
  });
  const isScreenshot = sourceExtension === ".png";
  pipeline =
    format === "avif"
      ? pipeline.avif({
          quality: isScreenshot ? 64 : 56,
          effort: 4,
          chromaSubsampling: "4:4:4",
        })
      : pipeline.webp({
          quality: isScreenshot ? 84 : 80,
          alphaQuality: 100,
          smartSubsample: true,
        });
  await pipeline.toFile(outputPath);
  return true;
}

assertSafeOutputDirectory();
let cachedVersion = "";
try {
  cachedVersion = (await readFile(stampPath, "utf8")).trim();
} catch {
  // No cache exists on the first build.
}
if (cachedVersion !== pipelineVersion)
  await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

const references = await findReferencedImages();
const manifest = {};
let generated = 0;
let encoded = 0;
const encodeJobs = [];
const expectedOutputs = new Set();

for (const sourceUrl of references) {
  let decodedUrl;
  try {
    decodedUrl = decodeURIComponent(sourceUrl);
  } catch {
    decodedUrl = sourceUrl;
  }
  const sourcePath = path.resolve(
    publicDir,
    decodedUrl.replace(/^\//, "").split("/").join(path.sep),
  );
  if (!sourcePath.startsWith(`${path.resolve(imageRoot)}${path.sep}`)) continue;
  if (!supportedExtensions.has(path.extname(sourcePath).toLowerCase()))
    continue;
  try {
    await access(sourcePath);
  } catch {
    console.warn(`[images] Missing local source: ${sourceUrl}`);
    continue;
  }

  const metadata = await sharp(sourcePath).metadata();
  if (!metadata.width || !metadata.height || (metadata.pages ?? 1) > 1)
    continue;
  const widths = [
    ...new Set([
      ...targetWidths.filter((width) => width < metadata.width),
      Math.min(metadata.width, targetWidths.at(-1)),
    ]),
  ].sort((a, b) => a - b);
  const entry = {
    width: metadata.width,
    height: metadata.height,
    avif: [],
    webp: [],
  };

  for (const width of widths) {
    for (const format of ["avif", "webp"]) {
      const outputUrl = buildOutputUrl(sourceUrl, width, format);
      expectedOutputs.add(
        path.resolve(
          publicDir,
          outputUrl.replace(/^\//, "").split("/").join(path.sep),
        ),
      );
      encodeJobs.push(() =>
        createVariant(
          sourcePath,
          outputUrl,
          width,
          format,
          path.extname(sourcePath).toLowerCase(),
        ),
      );
      entry[format].push({ src: outputUrl, width });
      generated += 1;
    }
  }
  manifest[sourceUrl] = entry;
}

let nextJob = 0;
await Promise.all(
  Array.from(
    { length: Math.min(encodeConcurrency, encodeJobs.length) },
    async () => {
      while (nextJob < encodeJobs.length) {
        const job = encodeJobs[nextJob];
        nextJob += 1;
        if (await job()) encoded += 1;
      }
    },
  ),
);

async function removeStaleOutputs(target) {
  for (const entry of await readdir(target, { withFileTypes: true })) {
    const absolute = path.join(target, entry.name);
    if (entry.isDirectory()) await removeStaleOutputs(absolute);
    else if (
      absolute !== stampPath &&
      !expectedOutputs.has(path.resolve(absolute))
    )
      await rm(absolute);
  }
}
await removeStaleOutputs(outputRoot);
await writeFile(stampPath, `${pipelineVersion}\n`, "utf8");

await mkdir(path.dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

const outputFiles = await (async function countFiles(target) {
  let count = 0;
  for (const entry of await readdir(target, { withFileTypes: true })) {
    const absolute = path.join(target, entry.name);
    count += entry.isDirectory() ? await countFiles(absolute) : 1;
  }
  return count;
})(outputRoot);
console.log(
  `[images] ${Object.keys(manifest).length} sources, ${generated || outputFiles} variants, ${encoded} encoded`,
);
