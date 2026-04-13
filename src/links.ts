export interface Link {
  name: string;
  href: string;
  logo: string;
  darkLogo?: string;
  description?: string;
  tooltip?: string;      // 鼠标悬浮提示内容
  feed?: string;  
  github?: string;  
  x?: string;  
  instagram?: string;  
  inactive?: boolean; // 新增字段：是否不活跃
  verified?: boolean; 
  organization?: boolean; // 新增字段：是否为博客组织
}

export const links: Link[] = [
  {
    name: "Cho",
    href: "https://chopstack.com/",
    logo: "https://avatars.githubusercontent.com/u/1884557?v=4",
    description: "Cho大神，他另一个地址frynut.com",
    tooltip: "心中的技术白月光，定义了简洁的力量。如今每个404页面都保留着他的影子——既是对过往的致敬，也是对所有迷路者的温柔提醒：曾有人把代码写成诗。",
    github: "https://github.com/pagecho",
    feed: "https://chopstack.com/rss.xml"
  },
  {
    name: "Zimoo`s",
    href: "https://zimoo.me/",
    logo: "https://cravatar.cn/avatar/1fa37bd1ff014dd0df4178b0cebcfc13?s=32&r=G&d=",
    description: "也是一位蜀国人",
    verified: true,
    feed: "https://blog.zimoo.me/feed/"
  },
  {
    name: "晚餐",
    href: "http://www.chelsea.org.cn/",
    logo: "/images/links/jiangxixi.jpg",
    description: "教主，切尔西的夏天。",
    tooltip: "晚餐，当年和我共建「中国罗马球迷联盟」的搭档，一个骨子里的罗马球迷（虽然后来也喜欢切尔西）。那些夏天的记忆都是滚烫的青春，如今生活各自忙碌，偶尔在球迷群里聊几句。而最纯粹的热忱，永远留在了川外校园里的夏天里 —— 他是我记忆里永远的朋友。",
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
    logo: "https://huiris.com/wp-content/uploads/old/favicon.png",
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
    logo: "https://avatars.githubusercontent.com/u/14826931?v=4",
    description: "有戏的博客",
    verified: true
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
    logo: "https://avatars.githubusercontent.com/u/30765485?v=4",
    description: "记录有趣的事，分享技术经验。",
    feed: "https://captainofphb.me/rss.xml"
  },
  {
    name: "雪糕博客",
    href: "https://blog.xuegaogg.com/",
    logo: "https://avatars.githubusercontent.com/u/35700485?v=4",
    description: "什么都搞，不再专注网络了。",
    feed: "https://blog.xuegaogg.com/index.xml"
  },
  {
    name: "Lianbo`s Blog",
    href: "https://godruoyi.com/",
    logo: "https://images.godruoyi.com/gblog/assets/brand_logo.Z0NyS6D-_2cLiuT.webp",
    description: "用纸质书镇压效率 · 用Laravel怀念青春。",
    github: "https://github.com/godruoyi",
    feed: "https://godruoyi.com/rss.xml"
  },
  {
    name: "全局变量",
    href: "https://ilogs.cn",
    logo: "https://ilogs.cn/images/avatar.jpg",
    description: "记录生活中的平凡事",
    verified: true,
    feed: "https://ilogs.cn/feed/"
  },
  {
    name: "三十海河",
    href: "https://ihaihe.cn/",
    logo: "https://ihaihe.cn/wp-content/uploads/2025/03/touxiang.png",
    description: "做不了伟人，至少要做个好人。",
    verified: true,
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
    description: "赫尔辛基的键盘诗人。",
    tooltip: "芬兰的程序员超级奶爸，写写博客，聊聊移居生活和带娃日常。有时也会唠两句技术",
    github: "https://github.com/zmofei",
    instagram:"https://www.instagram.com/zhu_wenlong/",
    verified: true,
    feed: "https://www.mofei.life/zh/rss"
  },
  {
    name: "爱情在线",
    href: "https://aqzx.com/",
    logo: "http://www.aqzx.com/logo100.png",
    description: "一个因网恋而建并碎碎念了20多年的个人站。",
    verified: true,
    feed: "https://aqzx.com/rss.asp"
  },
  {
    name: "瓦匠个人小站",
    href: "https://airy.ink",
    logo: "https://airy.ink/logo.svg",
    description: "大家都是倔强的人！",
    verified: true,
    feed: "https://airy.ink/feed"
  },
  {
    name: "异数",
    href: "https://www.yishu.pro/",
    logo: "https://www.yishu.pro/img/logo.jpg",
    description: "笔落惊风雨，诗成泣鬼神。",
    verified: true,
    feed: "https://www.yishu.pro/feed/"
  },
  {
    name: "Acevs",
    href: "https://acevs.com/",
    logo: "https://upload.storeweb.cn/upload/site/logo/2301/7b942248da4170e7ff4c6fad75e873b1.png",
    description: "探索者，blogger",
    feed: "https://acevs.com/feed/"
  },
  {
    name: "李的日志",
    href: "https://lilog.cn",
    logo: "https://lilog.cn/Image/avatar.webp",
    description: "在阅读中沉淀，于随笔中抒怀",
    verified: true,
    feed: "https://lilog.cn/feed"
  },
  {
    name: "旺东自留地",
    href: "https://wang618.cn/",
    logo: "https://wang618.cn/logo.gif",
    description: "爱生活、爱摸鱼",
    verified: true,
    feed: "https://wang618.cn/rss.php"
  },
  {
    name: "西城往事",
    href: "https://xifeng.net",
    logo: "https://xifeng.net/images/avatar.svg",
    description: "外贸 旅行 代码 人生",
    feed: "https://xifeng.net/feed"
  },
  {
    name: "Andy烧麦",
    href: "https://4311346.com/",
    logo: "https://avatar.199508.com/avatar/e77ca46fca9a659f61226ca650ff8dd7.jpg",
    description: "记录时间，记录生活，记录想法",
  },
{
    name: "Zeruns's Blog",
    href: "https://blog.zeruns.com",
    logo: "https://blog.zeruns.com/tx.jpg",
    description: "爱折腾软件和硬件的技术宅",
    feed: "https://blog.zeruns.com/feed/"
  },
{
    name: "孤鬥",
    href: "https://d-d.design/",
    logo: "https://d-d.design/assets/favicon-lmKuKuwt.ico",
    description: "做自己，不隨波逐流，不妥協",
  },
  {
    name: "耳朵的主人",
    href: "https://www.edzbe.com",
    logo: "https://seccdn.libravatar.org/avatar/3a548785c751d63bf1a852b1307df0bd",
    description: "耳朵电台，庆幸我们还有耳朵。",
    verified: true,
    feed: "https://www.edzbe.com/feed"
  },
  {
    name: "蘇SU",
    href: "https://suus.me",
    logo: "https://cravatar.cn/avatar/84b712148a63b44dd97ede997bc3efa5",
    description: "在数字的海洋中，寻找属于自己的星辰。",
    verified: true,
    feed: "https://suus.me/index.xml"
  },
  {
    name: "宗宗酱",
    href: "https://ygz.ink",
    logo: "https://cn.cravatar.com/avatar/0ab91c325f11fad98bd7eaaada0b0912",
    description: "用文字和图片记录生活。",
    verified: true,
    feed: "https://ygz.ink/feed"
  },
  {
    name: "ch3nyang的博客",
    href: "https://ch3nyang.top/",
    logo: "https://ch3nyang.top/favicon.ico",
    feed: "https://blog.ch3nyang.top/feed.xml"
  },
  {
    name: "秋記Autumn",
    href: "https://www.zhyok.cn",
    logo: "https://www.zhyok.cn/logo.png",
    description: "个人博客、网络日杂、生活记录",
    verified:true,
    feed: "https://www.zhyok.cn/index.php/feed/"
  },
  {
    name: "Frevia's Blog!",
    href: "https://www.frevia.site/",
    logo: "https://www.frevia.site/favicon.png",
    description: "一个时间长河中的个人档案馆。",
    verified: true,
    feed: "https://www.frevia.site/rss.xml"
  },
  {
    name: "十年之约",
    href: "https://www.foreverblog.cn/",
    logo: "https://www.foreverblog.cn/favicon.ico",
    description: "十年之约",
    feed: "https://www.foreverblog.cn/feeds.html",
    organization: true
  },
  {
    name: "笔墨迹",
    href: "https://blogscn.fun/",
    logo: "https://photo.xiangming.site/img/blogscn_icon.png",
    description: "致敬还在写博客的我们",
    feed: "https://blogscn.fun/feed/",
    organization: true
  },
  {
    name: "博客星球",
    href: "https://www.blogplanet.cn/",
    logo: "https://www.blogplanet.cn/img/bkxq.png",
    description: "每一个博客都是一个独立星球！",
    organization: true
  },
  {
    name: "BlogsClub",
    href: "https://www.blogsclub.org/",
    logo: "https://www.blogsclub.org/images/blogsclub_logo.jpg",
    description: "个人博客俱乐部！",
    feed: "https://www.blogsclub.org/feed.xml?sort=time",
    organization: true
  },
  {
    name: "拾趣博客导航",
    href: "https://s7.fan/",
    logo: "https://s7.fan/img/tubiao.png",
    description: "捡拾文字里的小乐趣！",
    organization: true
  },
  {
    name: "博友圈",
    href: "https://www.boyouquan.com/",
    logo: "https://www.boyouquan.com/assets/images/sites/logo/logo-small.png",
    description: "博客人的朋友圈，博客收录与文章 RSS 聚合网站。",
    feed: "https://www.boyouquan.com/feed.xml?sort=latest",
    organization: true
  }
];