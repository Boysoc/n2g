import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, f as renderComponent } from '../astro_oB0LccEY.mjs';
import 'kleur/colors';
import 'clsx';
import { S as SITE, a as $$Header, b as $$Footer, c as $$Layout } from './404_okefdeQM.mjs';
/* empty css                          */
import { $ as $$Comment } from './index_2QpMa2NK.mjs';

const links = [
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
    inactive: true
    // 👉 加上这个字段表示此人“停更”或“下线”
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
    instagram: "https://www.instagram.com/zhu_wenlong/",
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
    logo: "https://xifeng.net/images/avatar.webp",
    description: "外贸 旅行 代码 人生",
    feed: "https://xifeng.net/feed"
  },
  {
    name: "Andy烧麦",
    href: "https://4311346.com/",
    logo: "https://avatar.199508.com/avatar/e77ca46fca9a659f61226ca650ff8dd7.jpg",
    description: "记录时间，记录生活，记录想法"
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
    description: "做自己，不隨波逐流，不妥協"
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
    name: "ch3nyang的博客",
    href: "https://ch3nyang.top/",
    feed: "https://blog.ch3nyang.top/feed.xml"
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
    name: "博友圈",
    href: "https://www.boyouquan.com/",
    logo: "https://www.boyouquan.com/assets/images/sites/logo/logo-small.png",
    description: "博客人的朋友圈，博客收录与文章 RSS 聚合网站。",
    feed: "https://www.boyouquan.com/feed.xml?sort=latest",
    organization: true
  }
];

const $$Astro$2 = createAstro("https://n2g.cn");
const $$FriendLinks = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$FriendLinks;
  const { showDescription = true, maxItems, showRandomButton = true } = Astro2.props;
  const siteInfo = {
    name: SITE.title,
    href: SITE.website,
    logo: `${SITE.website}/logo.webp`,
    description: "\u72EE\u5B50\u5EA7\u7684\u6570\u5B57\u6E38\u7267\u8005\uFF0C\u7528\u4EE3\u7801\u548C\u6587\u5B57\u63A2\u7D22\u79D1\u6280\u4E16\u754C\uFF0C\u8BB0\u5F55\u7075\u611F\u4E0E\u601D\u8003\u3002"
  };
  const sortedLinks = [...links];
  sortedLinks.sort((a, b) => {
    if (a.verified && !b.verified)
      return -1;
    if (!a.verified && b.verified)
      return 1;
    return 0;
  });
  const displayLinks = maxItems ? sortedLinks.slice(0, maxItems) : sortedLinks;
  const verifiedLinks = displayLinks.filter((link) => link.verified && !link.organization);
  const unverifiedLinks = displayLinks.filter((link) => !link.verified && !link.organization);
  const organizationLinks = displayLinks.filter((link) => link.organization);
  const slogans = [
    "\u63A2\u7D22\u4E92\u8054\u7F51\u7684\u65E0\u9650\u53EF\u80FD",
    "\u94FE\u63A5\u4E16\u754C\u7684\u7CBE\u5F69\u89D2\u843D",
    "\u53D1\u73B0\u6709\u8DA3\u7684\u6570\u5B57\u90BB\u5C45",
    "\u5206\u4EAB\u77E5\u8BC6\uFF0C\u8FDE\u63A5\u601D\u60F3",
    "\u5728\u4EE3\u7801\u4E0E\u6587\u5B57\u95F4\u7A7F\u68AD",
    "\u8BB0\u5F55\u7075\u611F\uFF0C\u5206\u4EAB\u521B\u610F",
    "\u8FDE\u63A5\u6BCF\u4E00\u4E2A\u6709\u8DA3\u7684\u7075\u9B42",
    "\u8BA9\u601D\u60F3\u5728\u4E92\u8054\u7F51\u4E2D\u95EA\u5149"
  ];
  const randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];
  return renderTemplate`${maybeRenderHead()}<section class="friend-links astro-fhfa3koh"> <!-- 已验证的友链卡片 --> <div class="verified-links astro-fhfa3koh"> <div class="card-container astro-fhfa3koh"> ${verifiedLinks.map((link) => renderTemplate`<div class="card-wrap astro-fhfa3koh"> <a${addAttribute(link.href, "href")}${addAttribute(`modern-card ${link.inactive ? "inactive" : ""} astro-fhfa3koh`, "class")} target="_blank" rel="noopener noreferrer"> <div class="modern-card-border astro-fhfa3koh"> <div class="friend-avatar astro-fhfa3koh"> <img${addAttribute(link.logo, "src")}${addAttribute(`${link.name}\u7684\u5934\u50CF`, "alt")} loading="lazy" class="astro-fhfa3koh"> <span class="verified-badge astro-fhfa3koh" title="友链互通"></span> </div> <div class="card-title astro-fhfa3koh">${link.name}</div> <div class="card-tooltip astro-fhfa3koh"> <div class="tooltip-content astro-fhfa3koh"> <div class="tooltip-desc astro-fhfa3koh">邻居介绍：${link.description || "\u6682\u65E0\u4ECB\u7ECD"}</div> </div> </div> </div> </a> </div>`)} </div> </div> <!-- 卡片切换面板 --> <div class="card-switch-container astro-fhfa3koh"> <div class="panel-header astro-fhfa3koh"> <h2 class="panel-title astro-fhfa3koh">${randomSlogan}</h2> </div> <div class="panel-tabs astro-fhfa3koh"> ${unverifiedLinks.length > 0 && renderTemplate`<div class="tab-item astro-fhfa3koh" id="unverified-tab" data-target="unverified-content"> <div class="tab-icon astro-fhfa3koh">📚</div> <div class="tab-label astro-fhfa3koh">常逛的网站</div> <div class="tab-count astro-fhfa3koh">(${unverifiedLinks.length})</div> </div>`} ${organizationLinks.length > 0 && renderTemplate`<div class="tab-item astro-fhfa3koh" id="organization-tab" data-target="organization-content"> <div class="tab-icon astro-fhfa3koh">🤝</div> <div class="tab-label astro-fhfa3koh">博客组织</div> <div class="tab-count astro-fhfa3koh">(${organizationLinks.length})</div> </div>`} <div class="tab-item astro-fhfa3koh" id="apply-tab" data-target="apply-content"> <div class="tab-icon astro-fhfa3koh">📋</div> <div class="tab-label astro-fhfa3koh">友链信息</div> </div> </div> <!-- 卡片内容容器 --> <div class="card-content-container astro-fhfa3koh"> ${unverifiedLinks.length > 0 && renderTemplate`<div class="content-card astro-fhfa3koh" id="unverified-content"> <div class="card-body astro-fhfa3koh"> <div class="unverified-container astro-fhfa3koh"> ${unverifiedLinks.map((link, index) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(`friend-text-item ${link.inactive ? "inactive" : ""} astro-fhfa3koh`, "class")} target="_blank" rel="noopener noreferrer"${addAttribute(`\u535A\u4E3B\u4ECB\u7ECD\uFF1A${link.description || "\u6682\u65E0\u4ECB\u7ECD"}`, "title")}${addAttribute(`animation-delay: ${index * 0.05}s`, "style")}> <span class="friend-text-name astro-fhfa3koh">${link.name}</span> </a>`)} </div> </div> </div>`} ${organizationLinks.length > 0 && renderTemplate`<div class="content-card astro-fhfa3koh" id="organization-content"> <div class="card-body astro-fhfa3koh"> <div class="organization-container astro-fhfa3koh"> ${organizationLinks.map((link, index) => renderTemplate`<a${addAttribute(link.href, "href")} class="organization-item astro-fhfa3koh" target="_blank" rel="noopener noreferrer"${addAttribute(`\u7EC4\u7EC7\u4ECB\u7ECD\uFF1A${link.description || "\u6682\u65E0\u4ECB\u7ECD"}`, "title")}> <div class="org-logo astro-fhfa3koh"> ${link.logo ? renderTemplate`<img${addAttribute(link.logo, "src")}${addAttribute(link.name, "alt")} loading="lazy" class="astro-fhfa3koh">` : renderTemplate`<div class="org-placeholder astro-fhfa3koh">🏛️</div>`} </div> <div class="org-info astro-fhfa3koh"> <div class="org-name astro-fhfa3koh">${link.name}</div> <div class="org-desc astro-fhfa3koh">${link.description || "\u535A\u5BA2\u7EC4\u7EC7"}</div> </div> </a>`)} </div> </div> </div>`} <div class="content-card astro-fhfa3koh" id="apply-content"> <div class="card-body astro-fhfa3koh"> <div class="apply-card astro-fhfa3koh"> <div class="card-top astro-fhfa3koh"> <div class="site-avatar astro-fhfa3koh"> <img${addAttribute(siteInfo.logo, "src")}${addAttribute(siteInfo.name, "alt")} loading="lazy" class="astro-fhfa3koh"> </div> <div class="site-info astro-fhfa3koh"> <h4 class="site-name astro-fhfa3koh">${siteInfo.name}</h4> <p class="site-desc astro-fhfa3koh">${siteInfo.description}</p> </div> </div> <div class="site-details astro-fhfa3koh"> <div class="detail-row astro-fhfa3koh"> <div class="detail-key astro-fhfa3koh">网站地址</div> <div class="detail-value astro-fhfa3koh">https://n2g.cn</div> <button class="copy-btn astro-fhfa3koh" data-copy="https://n2g.cn">复制</button> </div> <div class="detail-row astro-fhfa3koh"> <div class="detail-key astro-fhfa3koh">Logo地址</div> <div class="detail-value astro-fhfa3koh">https://n2g.cn/logo.webp</div> <button class="copy-btn astro-fhfa3koh" data-copy="https://n2g.cn/logo.webp">复制</button> </div> <div class="detail-row astro-fhfa3koh"> <div class="detail-key astro-fhfa3koh">RSS订阅</div> <div class="detail-value astro-fhfa3koh">https://n2g.cn/rss.xml</div> <button class="copy-btn astro-fhfa3koh" data-copy="https://n2g.cn/rss.xml">复制</button> </div> </div> </div> </div> </div> </div> </div> </section>  `;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/components/FriendLinks.astro", void 0);

const $$Astro$1 = createAstro("https://n2g.cn");
const $$RandomVisitButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RandomVisitButton;
  const verifiedLinks = links.filter((link) => link.verified);
  return renderTemplate`${verifiedLinks.length > 0 && renderTemplate`${maybeRenderHead()}<div class="random-visit-container astro-jffxlwus"><button class="random-visit-btn astro-jffxlwus" type="button" id="random-visit-button">
随机访问
</button></div>`}`;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/components/RandomVisitButton.astro", void 0);

const $$Astro = createAstro("https://n2g.cn");
const $$Links = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Links;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "class": "astro-au7rboj5" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "links", "class": "astro-au7rboj5" })} ${maybeRenderHead()}<main id="main-content" class="content astro-au7rboj5"> <section id="recent-posts" class="astro-au7rboj5"> <h1 class="links-title astro-au7rboj5">邻居</h1> <p class="astro-au7rboj5">${renderComponent($$result2, "RandomVisitButton", $$RandomVisitButton, { "class": "astro-au7rboj5" })}一个有趣的邻居。</p> ${renderComponent($$result2, "FriendLinks", $$FriendLinks, { "class": "astro-au7rboj5" })} ${renderComponent($$result2, "Component", $$Comment, { "class": "astro-au7rboj5" })} </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "class": "astro-au7rboj5" })} ` })} `;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/pages/links.astro", void 0);

const $$file = "D:/Github项目/GithubN2G风格ASTRO模板/n2g/src/pages/links.astro";
const $$url = "/links";

export { $$Links as default, $$file as file, $$url as url };
