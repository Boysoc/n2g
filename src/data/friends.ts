export interface FriendLink {
  name: string;
  url: string;
  description?: string;
  tooltip?: string;
  logo?: string;
  verified?: boolean;
  inactive?: boolean;
  organization?: boolean;
}

/**
 * 友情链接数据同步自正式项目 D:\Github项目\n2g\src\links.ts。
 * 互链站点头像已缓存到 public/images/friends，减少访问页面时的第三方请求。
 * 图片失效时由页面自动回退为文字标记。
 */
export const friendLinks: FriendLink[] = [
  {
    name: 'Cho',
    url: 'https://chopstack.com/',
    description: 'Cho大神，他另一个地址frynut.com',
    tooltip: '心中的技术白月光，定义了简洁的力量。如今每个 404 页面都保留着他的影子——既是对过往的致敬，也是对所有迷路者的温柔提醒：曾有人把代码写成诗。',
  },
  {
    name: 'Zimoo`s',
    url: 'https://zimoo.me/',
    logo: '/images/friends/zimoo.webp',
    description: '也是一位蜀国人',
    verified: true,
  },
  {
    name: '晚餐',
    url: 'http://www.chelsea.org.cn/',
    description: '教主，切尔西的夏天。',
    tooltip: '晚餐，当年和我共建「中国罗马球迷联盟」的搭档，一个骨子里的罗马球迷（虽然后来也喜欢切尔西）。那些夏天的记忆都是滚烫的青春，如今生活各自忙碌，偶尔在球迷群里聊几句。而最纯粹的热忱，永远留在了川外校园里的夏天里——他是我记忆里永远的朋友。',
    inactive: true,
  },
  {
    name: '面条',
    url: 'http://miantiao.me/',
    description: '面条的自留地',
  },
  {
    name: '山炮不二',
    url: 'http://xsinger.me/',
    description: '歌者与生活',
  },
  {
    name: '咚门',
    url: 'http://www.dearzd.com/',
    description: '喜欢栀子花的男生。',
  },
  {
    name: "Huiris's Blog",
    url: 'http://huiris.com/',
    description: 'Huiris 的数字空间',
  },
  {
    name: '设计笔记',
    url: 'https://biji.io/',
    description: '界面设计师分享',
  },
  {
    name: '小剧客栈',
    url: 'http://bh-lay.com/',
    logo: '/images/friends/xiaoju.webp',
    description: '有戏的博客',
    verified: true,
  },
  {
    name: 'liruifengv',
    url: 'https://liruifengv.com/',
    description: 'Web 开发者，Astro 项目成员，开源爱好者。',
  },
  {
    name: 'CaptainOfPhB',
    url: 'https://captainofphb.me/',
    description: '记录有趣的事，分享技术经验。',
  },
  {
    name: '雪糕博客',
    url: 'https://blog.xuegaogg.com/',
    description: '什么都搞，不再专注网络了。',
  },
  {
    name: 'Lianbo`s Blog',
    url: 'https://godruoyi.com/',
    description: '用纸质书镇压效率 · 用 Laravel 怀念青春。',
  },
  {
    name: '全局变量',
    url: 'https://ilogs.cn/',
    logo: '/images/friends/ilogs.webp',
    description: '记录生活中的平凡事',
    verified: true,
  },
  {
    name: '三十海河',
    url: 'https://ihaihe.cn/',
    logo: '/images/friends/ihaihe.webp',
    description: '做不了伟人，至少要做个好人。',
    verified: true,
  },
  {
    name: '王鑫的小屋',
    url: 'https://wonse.info/',
    description: '热爱学习，热爱互联网，渴望自由。',
  },
  {
    name: '朱文龙 Mofei',
    url: 'https://www.mofei.life/',
    logo: '/images/friends/mofei.webp',
    description: '赫尔辛基的键盘诗人。',
    tooltip: '芬兰的程序员超级奶爸，写写博客，聊聊移居生活和带娃日常。有时也会唠两句技术。',
    verified: true,
  },
  {
    name: '爱情在线',
    url: 'https://aqzx.com/',
    logo: '/images/friends/aqzx.webp',
    description: '一个因网恋而建并碎碎念了20多年的个人站。',
    verified: true,
  },
  {
    name: '瓦匠个人小站',
    url: 'https://airy.ink/',
    logo: '/images/friends/airy.webp',
    description: '大家都是倔强的人！',
    verified: true,
  },
  {
    name: '异数',
    url: 'https://www.yishu.pro/',
    logo: '/images/friends/yishu.webp',
    description: '笔落惊风雨，诗成泣鬼神。',
    verified: true,
  },
  {
    name: 'Acevs',
    url: 'https://acevs.com/',
    description: '探索者，blogger',
  },
  {
    name: '李的日志',
    url: 'https://lilog.cn/',
    logo: '/images/friends/lilog.webp',
    description: '在阅读中沉淀，于随笔中抒怀',
    verified: true,
  },
  {
    name: '旺东自留地',
    url: 'https://wang618.cn/',
    logo: '/images/friends/wangdong.webp',
    description: '爱生活、爱摸鱼',
    verified: true,
  },
  {
    name: '西城往事',
    url: 'https://xifeng.net/',
    description: '外贸 旅行 代码 人生',
  },
  {
    name: 'Andy烧麦',
    url: 'https://4311346.com/',
    description: '记录时间，记录生活，记录想法',
  },
  {
    name: "Zeruns's Blog",
    url: 'https://blog.zeruns.com/',
    description: '爱折腾软件和硬件的技术宅',
  },
  {
    name: '孤鬥',
    url: 'https://d-d.design/',
    description: '做自己，不隨波逐流，不妥協',
  },
  {
    name: '耳朵的主人',
    url: 'https://www.edzbe.com/',
    logo: '/images/friends/edzbe.webp',
    description: '耳朵电台，庆幸我们还有耳朵。',
    verified: true,
  },
  {
    name: '蘇SU',
    url: 'https://suus.me/',
    description: '在数字的海洋中，寻找属于自己的星辰。',
  },
  {
    name: '宗宗酱',
    url: 'https://ygz.ink/',
    logo: '/images/friends/suus.webp',
    description: '用文字和图片记录生活。',
    verified: true,
  },
  {
    name: 'ch3nyang的博客',
    url: 'https://ch3nyang.top/',
  },
  {
    name: '秋記Autumn',
    url: 'https://www.zhyok.cn/',
    logo: '/images/friends/zhyok.webp',
    description: '个人博客、网络日杂、生活记录',
    verified: true,
  },
  {
    name: "Frevia's Blog!",
    url: 'https://www.frevia.site/',
    logo: '/images/friends/frevia.webp',
    description: '一个时间长河中的个人档案馆。',
    verified: true,
  },
  {
    name: '秋雨De blog',
    url: 'https://www.fallrain.cn/',
    logo: '/images/friends/fallrain.webp',
    description: '一个技术小白的个人博客',
    verified: true,
  },
  {
    name: '十年之约',
    url: 'https://www.foreverblog.cn/',
    description: '十年之约',
    organization: true,
  },
  {
    name: '笔墨迹',
    url: 'https://blogscn.fun/',
    description: '致敬还在写博客的我们',
    organization: true,
  },
  {
    name: '博客星球',
    url: 'https://www.blogplanet.cn/',
    description: '每一个博客都是一个独立星球！',
    organization: true,
  },
  {
    name: 'BlogsClub',
    url: 'https://www.blogsclub.org/',
    description: '个人博客俱乐部！',
    organization: true,
  },
  {
    name: '博友圈',
    url: 'https://www.boyouquan.com/',
    description: '博客人的朋友圈，博客收录与文章 RSS 聚合网站。',
    organization: true,
  },
];
