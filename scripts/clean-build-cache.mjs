import { rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputDirectory = path.join(projectRoot, "dist");
const cacheDirectories = [
  path.join(projectRoot, "_jampack"),
  path.join(projectRoot, ".jampack"),
];
const allowedDirectories = new Set(
  cacheDirectories.map((target) => path.resolve(target)),
);

if (
  path.dirname(path.resolve(outputDirectory)) !== projectRoot ||
  path.basename(path.resolve(outputDirectory)) !== "dist"
) {
  throw new Error(
    `Refusing to remove unexpected output directory: ${outputDirectory}`,
  );
}

await rm(outputDirectory, { recursive: true, force: true });

for (const target of cacheDirectories) {
  const resolvedTarget = path.resolve(target);
  if (!allowedDirectories.has(resolvedTarget)) {
    throw new Error(
      `Refusing to remove unexpected cache directory: ${resolvedTarget}`,
    );
  }
  await rm(resolvedTarget, { recursive: true, force: true });
}

console.log("[build] Cleared dist and Jampack cache markers");
