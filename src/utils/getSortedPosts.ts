import dayjs from "dayjs";
const getSortedPosts = (posts) => {
  return posts
    .sort(
      (a, b) =>
         dayjs(b.data.pubDatetime).unix()-dayjs(a.data.pubDatetime).unix() 
    );
};

export default getSortedPosts;
