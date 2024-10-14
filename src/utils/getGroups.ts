import { getCollection, type CollectionEntry } from "astro:content";
// 只生成这个文件夹下的文章
const FOLDER = "leokun.cn";
import getSortedPosts from "./getSortedPosts";
/*获取首页集合 */
export default async () => {
  const groups = new Map<string, Record<string, CollectionEntry<"bolg">>>();
  const posts = await getCollection("bolg");
  for (const post of posts) {
    const rootFolder = post.id.split("/")?.[0];
    const secondFolder = post.id.split("/")?.[1];
    const displayName = post.id
      .split("/")
      ?.slice(2)
      .join("/")
      ?.replace(".md", "");
    if (rootFolder === FOLDER && secondFolder && displayName) {
      const res = await post.render();
      const normalizedPost = {
        ...post,
        displayName,
        data: {
          title: displayName,
          
          ...post.data,
          ...res.remarkPluginFrontmatter,
        },
      };
      if (!groups.has(secondFolder)) {
        groups.set(secondFolder, [normalizedPost]);
      } else {
        groups.get(secondFolder)?.push(normalizedPost);
      }
    }
  }
  // 对每个分组进行排序
  for (const [key, value] of groups) {
    groups.set(key, getSortedPosts(value));
  }
  return groups;
};
