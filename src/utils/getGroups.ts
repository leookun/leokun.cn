import { getCollection } from "astro:content";
// 只生成这个文件夹下的文章
import getSortedPosts from "./getSortedPosts";
/*获取首页集合 */
export default async () => {
  const newPost=[]
  const posts = await getCollection("bolg");
  for (const post of posts) {

    const secondFolder = post.slug.split("/")?.[1];
    const displayName = post.slug
      .split("/")
      ?.slice(2)
      .join("/")
      ?.replace(".md", "");
    const res = await post.render();
    const normalizedPost = {
      ...post,
      displayName,
      collection: secondFolder,
      data: {
        title: displayName,
        ...post.data,
        ...res.remarkPluginFrontmatter,
      },
    };
    newPost.push(normalizedPost);
  }
  const sortedPosts = getSortedPosts(newPost);

  return sortedPosts;
};
