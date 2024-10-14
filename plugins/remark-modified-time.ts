import { statSync } from "fs";

export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    const result = statSync(filepath);
    file.data.astro.frontmatter.pubDatetime = result.birthtime.toISOString();
    file.data.astro.frontmatter.modDatetime = result.mtime.toISOString();
  };
}