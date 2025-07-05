export interface Link {
  name: string;
  href: string;
  logo: string;
  darkLogo?: string;
  description?: string;
  feed?: string;  
  inactive?: boolean; // 新增字段：是否不活跃
}

export const links: Link[] = [
  {
    name: "Cho",
    href: "https://frynut.com/",
    logo: "https://avatars.githubusercontent.com/u/1884557?v=4",
    description: "Cho大神",
    feed: "https://frynut.com/rss.xml"
  },
  {
    name: "Zimoo`s",
    href: "https://zimoo.me/",
    logo: "https://cravatar.cn/avatar/1fa37bd1ff014dd0df4178b0cebcfc13?s=32&r=G&d=",
    description: "也是一位蜀国人",
    feed: "https://blog.zimoo.me/feed/"
  },
  {
    name: "晚餐",
    href: "http://www.chelsea.org.cn/",
    logo: "/images/links/jiangxixi.jpg",
    description: "又名教主。（切尔西的夏天）",
    inactive: true, // 👉 加上这个字段表示此人“停更”或“下线”
  },
  {
    name: "面条",
    href: "http://miantiao.me/",
    logo: "https://miantiao.me/logo.png",
    description: "面条的自留地"
  },
  {
    name: "山炮不二",
    href: "http://xsinger.me/",
    logo: "https://sbsb.fun/img/me.png",
    description: "歌者与生活",
    feed: "https://xsinger.me/feed/"
  },
  {
    name: "咚门",
    href: "http://www.dearzd.com/",
    logo: "https://avatar.bdstatic.com/it/u=3268207087,554627273&fm=3012&app=3012&autime=1751331911&size=b360,360",
    description: "喜欢栀子花的男生。",
    feed: "https://www.dearzd.com/DBlog/feed"
  },
  {
    name: "Huiris's Blog",
    href: "http://huiris.com/",
    logo: "https://pic.huiris.com/favicon.png",
    description: "Huiris 的数字空间",
    feed: "https://huiris.com/feed/"
  },
  {
    name: "设计笔记",
    href: "https://biji.io/",
    logo: "https://www.biji.io/wp-content/uploads/favicon.png",
    description: "界面设计师分享",
    feed: "https://biji.io/feed"
  },
  {
    name: "小剧客栈",
    href: "http://bh-lay.com/",
    logo: "https://static.bh-lay.com/build/single-page-vue/assets/aboutme_2-eb1beec4.jpg",
    description: "有戏的博客"
  },
  {
    name: "liruifengv",
    href: "https://liruifengv.com",
    logo: "https://bucket.liruifengv.com/avatar.jpg",
    description: "Web 开发者，Astro 项目成员，开源爱好者。",
    feed: "https://liruifengv.com/rss.xml"
  },
  {
    name: "CaptainOfPhB",
    href: "https://captainofphb.me",
    logo: "https://captainofphb.me/_astro/avatar.ke_icKou_Z23JjR9.webp",
    description: "船长の部落格，记录有趣的事，分享技术经验。",
    feed: "https://captainofphb.me/rss.xml"
  },
  {
    name: "雪糕博客",
    href: "https://blog.xuegaogg.com/",
    logo: "https://blog.xuegaogg.com/about/wx.webp",
    description: "什么都搞，不再专注网络了。",
    feed: "https://blog.xuegaogg.com/index.xml"
  },
  {
    name: "Lianbo`s Blog",
    href: "https://godruoyi.com/",
    logo: "https://images.godruoyi.com/gblog/assets/brand_logo.Z0NyS6D-_2cLiuT.webp",
    description: "Enjoy the process of building something using any technology stack.",
    feed: "https://godruoyi.com/rss.xml"
  },
  {
    name: "全局变量",
    href: "https://ilogs.cn",
    logo: "https://ilogs.cn/images/avatar.jpg",
    description: "记录生活中的平凡事",
    feed: "https://ilogs.cn/feed/"
  },
  {
    name: "三十海河",
    href: "https://ihaihe.cn/",
    logo: "https://ihaihe.cn/wp-content/uploads/2025/03/touxiang.png",
    description: "做不了伟人，至少要做个好人。",
    feed: "https://ihaihe.cn/feed"
  },
  {
    name: "王鑫的小屋",
    href: "https://wonse.info/",
    logo: "https://img.vone.xin/web/blog-icon.jpg",
    description: "热爱学习，热爱互联网，渴望自由。",
    feed: "https://wonse.info/feed/"
  },
  {
    name: "朱文龙 Mofei",
    href: "https://www.mofei.life/",
    logo: "https://avatars.githubusercontent.com/u/3351337?v=4",
    description: "前端老法师(15年) → 数据炼丹师(5年) → AI 地图侠(当下)",
    feed: "https://www.mofei.life/zh/rss"
  }
];