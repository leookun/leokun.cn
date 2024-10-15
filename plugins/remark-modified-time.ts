import { statSync } from "fs";
import dayjs from "dayjs";
export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    const result = statSync(filepath);
    file.data.astro.frontmatter.pubDatetime = result.birthtime.toISOString();
    file.data.astro.frontmatter.modDatetime = result.mtime.toISOString();
    file.data.astro.frontmatter.modifiedText = dayjs(file.data.astro.frontmatter.modDatetime).format("YYYY-MM-DD HH:mm:ss");
    file.data.astro.frontmatter.pubTimeText = dayjs(file.data.astro.frontmatter.pubDatetime).format("YYYY-MM-DD HH:mm:ss");

  };
}