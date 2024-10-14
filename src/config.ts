import type { Site } from "./types";

export const SITE: Site = {
  website: "https://leokun.cn/", // replace this with your deployed domain
  author: "leokun",
  profile: "https://leokun.cn/",
  desc: "leokun's blog",
  title: "leokun's blog",
  ogImage: "astropaper-og.jpg"

};

export const LOCALE = {
  lang: "zh", // html lang code. Set this empty and default will be "en"
  langTag: ["zh-CN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

