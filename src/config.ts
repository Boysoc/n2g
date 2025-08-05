import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://n2g.cn/", // replace this with your deployed domain
  author: "Xio",
  desc: "一切从简，记录生活。",
  title: "Xio's",
  ogImage: "logo.png",
  lightAndDarkMode: false,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "zh", // html lang code. Set this empty and default will be "en"
  langTag: ["zh"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 41,
  height: 41,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/Boysoc/n2g",
    linkTitle: `${SITE.title} on Github`,
    active: true,
  }
];
