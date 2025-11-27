import { c as createAstro, a as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead, b as addAttribute, j as renderTransition, u as unescapeHTML } from '../astro_oB0LccEY.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$Main, C as Card, a as $$Pagination, s as slugifyStr, D as Datetime, g as getCollection, b as getSortedPosts, c as getPageNumbers, d as getPagination, e as getUniqueTags, f as getPostsByTag, h as $$TagPosts } from './_page__ZuUflUUc.mjs';
import { a as $$Header, b as $$Footer, S as SITE, c as $$Layout, $ as $$LinkButton } from './404_okefdeQM.mjs';
/* empty css                          */
import { remark } from 'remark';
import remarkHtml from 'remark-html';
/* empty css                          */
/* empty css                          */

const $$Astro$8 = createAstro("https://n2g.cn");
const $$Posts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Posts;
  const { currentPage, totalPages, paginatedPosts } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Posts | ${SITE.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "posts" })} ${maybeRenderHead()}<div> ${renderComponent($$result2, "Main", $$Main, { "pageTitle": "", "pageDesc": "" }, { "default": ($$result3) => renderTemplate` <ul class="card-ul"> ${paginatedPosts.map(({ data, slug }) => renderTemplate`${renderComponent($$result3, "Card", Card, { "href": `/posts/${slug}/`, "slug": slug, "frontmatter": data })}`)} </ul> ` })} ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "prevUrl": `/posts${currentPage - 1 !== 1 ? "/" + (currentPage - 1) : ""}/`, "nextUrl": `/posts/${currentPage + 1}/` })} </div> ${renderComponent($$result2, "Footer", $$Footer, { "noMarginTop": totalPages > 1 })} ` })}`;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/layouts/Posts.astro", void 0);

const $$Astro$7 = createAstro("https://n2g.cn");
const $$Comment = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Comment;
  return renderTemplate`${maybeRenderHead()}<div class="waline-container astro-ksttp56e"> <div id="waline-comments" class="astro-ksttp56e"></div> </div>  <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css"> `;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/components/Comment.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$6 = createAstro("https://n2g.cn");
const $$PostDetails = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$PostDetails;
  function processCustomFormatting(html) {
    html = html.replace(/<p>\s*::indent\s*(.*?)<\/p>/gs, '<p class="custom-indent">$1</p>');
    html = html.replace(/<p>\s*::drop-cap\s*(.*?)<\/p>/gs, '<p class="drop-cap">$1</p>');
    return html;
  }
  const { post, next, prev } = Astro2.props;
  const {
    title,
    author,
    description,
    ogImage,
    canonicalURL,
    pubDatetime,
    modDatetime,
    tags
  } = post.data;
  await post.render();
  const processedContent = await remark().use(remarkHtml, { sanitize: false }).process(post.body);
  const formattedContent = processCustomFormatting(String(processedContent));
  const ogImageUrl = typeof ogImage === "string" ? ogImage : ogImage?.src;
  const ogUrl = new URL(
    ogImageUrl ?? `/posts/${slugifyStr(title)}.png`,
    Astro2.url.origin
  ).href;
  const layoutProps = {
    title: `${title} | ${SITE.title}`,
    author,
    description,
    pubDatetime,
    modDatetime,
    canonicalURL,
    ogImage: ogUrl,
    scrollSmooth: true
  };
  return renderTemplate(_a || (_a = __template(["", '  <script>\n  /** Create a progress indicator\n   *  at the top */\n  function createProgressBar() {\n    // Create the main container div\n    const progressContainer = document.createElement("div");\n    progressContainer.className =\n      "progress-container fixed top-0 z-10 h-1 w-full bg-skin-fill";\n\n    // Create the progress bar div\n    const progressBar = document.createElement("div");\n    progressBar.className = "progress-bar h-1 w-0 bg-skin-accent";\n    progressBar.id = "myBar";\n\n    // Append the progress bar to the progress container\n    progressContainer.appendChild(progressBar);\n\n    // Append the progress container to the document body or any other desired parent element\n    document.body.appendChild(progressContainer);\n  }\n  createProgressBar();\n\n  /** Update the progress bar\n   *  when user scrolls */\n  function updateScrollProgress() {\n    const winScroll =\n      document.body.scrollTop || document.documentElement.scrollTop;\n    const height =\n      document.documentElement.scrollHeight -\n      document.documentElement.clientHeight;\n    \n    // \u53EA\u6709\u5F53\u9875\u9762\u5185\u5BB9\u8DB3\u4EE5\u4EA7\u751F\u6EDA\u52A8\u6761\u65F6\u624D\u66F4\u65B0\u8FDB\u5EA6\n    if (height > 0) {\n      const scrolled = (winScroll / height) * 100;\n      if (document) {\n        const myBar = document.getElementById("myBar");\n        if (myBar) {\n          myBar.style.width = scrolled + "%";\n        }\n      }\n    }\n  }\n  document.addEventListener("scroll", updateScrollProgress);\n\n  /** Attaches links to headings in the document,\n   *  allowing sharing of sections easily */\n  function addHeadingLinks() {\n    let headings = Array.from(document.querySelectorAll("h2, h3, h4, h5, h6"));\n    for (let heading of headings) {\n      heading.classList.add("group");\n      let link = document.createElement("a");\n      link.innerText = "#";\n      link.className = "heading-link hidden group-hover:inline-block ml-2";\n      link.href = "#" + heading.id;\n      link.ariaHidden = "true";\n      heading.appendChild(link);\n    }\n  }\n  addHeadingLinks();\n\n  /** Attaches copy buttons to code blocks in the document,\n   * allowing users to copy code easily. */\n  function attachCopyButtons() {\n    let copyButtonLabel = "Copy";\n    let codeBlocks = Array.from(document.querySelectorAll("pre"));\n\n    for (let codeBlock of codeBlocks) {\n      let wrapper = document.createElement("div");\n      wrapper.style.position = "relative";\n\n      let copyButton = document.createElement("button");\n      copyButton.className =\n        "copy-code absolute right-3 -top-3 rounded bg-skin-card px-2 py-1 text-xs leading-4 text-skin-base font-medium";\n      copyButton.innerHTML = copyButtonLabel;\n      codeBlock.setAttribute("tabindex", "0");\n      codeBlock.appendChild(copyButton);\n\n      // wrap codebock with relative parent element\n      codeBlock?.parentNode?.insertBefore(wrapper, codeBlock);\n      wrapper.appendChild(codeBlock);\n\n      copyButton.addEventListener("click", async () => {\n        await copyCode(codeBlock, copyButton);\n      });\n    }\n\n    async function copyCode(block, button) {\n      let code = block.querySelector("code");\n      let text = code?.innerText;\n\n      await navigator.clipboard.writeText(text ?? "");\n\n      // visual feedback that task is completed\n      button.innerText = "Copied";\n\n      setTimeout(() => {\n        button.innerText = copyButtonLabel;\n      }, 700);\n    }\n  }\n  attachCopyButtons();\n\n  /** Scrolls the document to the top when\n   * the "Back to Top" button is clicked. */\n  function backToTop() {\n    document.querySelector("#back-to-top")?.addEventListener("click", () => {\n      document.body.scrollTop = 0; // For Safari\n      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera\n    });\n  }\n  backToTop();\n<\/script>'])), renderComponent($$result, "Layout", $$Layout, { ...layoutProps }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main id="main-content" class="content"> ${renderComponent($$result2, "Datetime", Datetime, { "pubDatetime": pubDatetime, "modDatetime": modDatetime, "className": "post-date" })} <h1 class="post-title"${addAttribute(renderTransition($$result2, "fam6wyqg", "", slugifyStr(post.slug)), "data-astro-transition-scope")}>${title}</h1> <article id="article" role="article" class="post-content"> <div>${unescapeHTML(formattedContent)}</div> </article> ${(prev || next) && // 这里添加条件来检查是否有上下篇
  renderTemplate`<div class="related-post"> <div class="prev-post"> ${prev && renderTemplate`<a${addAttribute(`/posts/${prev.slug}`, "href")}> <svg xmlns="http://www.w3.org/2000/svg" class="prev-svg"> <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path> </svg>
上一篇：${prev.data.title} </a>`} </div> <div class="next-post"> ${next && renderTemplate`<a${addAttribute(`/posts/${next.slug}`, "href")}>
下一篇：${next.data.title} <svg xmlns="http://www.w3.org/2000/svg" class="next-svg"> <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path> </svg> </a>`} </div> </div>`} <div class="comment"> ${renderComponent($$result2, "Comment", $$Comment, {})} </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` }));
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/layouts/PostDetails.astro", "self");

const $$Astro$5 = createAstro("https://n2g.cn");
async function getStaticPaths$1() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sortedPosts = getSortedPosts(posts);
  const postResult = sortedPosts.map((post, index) => ({
    params: { slug: post.slug },
    props: {
      post,
      next: index > 0 ? sortedPosts[index - 1] : null,
      prev: index < sortedPosts.length - 1 ? sortedPosts[index + 1] : null
    }
  }));
  const pagePaths = getPageNumbers(posts.length).map((pageNum) => ({
    params: { slug: String(pageNum) },
    props: { post: null, prev: null, next: null }
  }));
  return [...postResult, ...pagePaths];
}
const $$Index$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index$4;
  const { slug } = Astro2.params;
  const { post, prev, next } = Astro2.props;
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  const pagination = getPagination({
    posts: sortedPosts,
    page: slug
  });
  return renderTemplate`${post ? renderTemplate`${renderComponent($$result, "PostDetails", $$PostDetails, { "post": post, "prev": prev, "next": next })}` : renderTemplate`${renderComponent($$result, "Posts", $$Posts, { ...pagination })}`}`;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/pages/posts/[slug]/index.astro", void 0);

const $$file$4 = "D:/Github项目/GithubN2G风格ASTRO模板/n2g/src/pages/posts/[slug]/index.astro";
const $$url$4 = "/posts/[slug]";

const index$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$4,
  file: $$file$4,
  getStaticPaths: getStaticPaths$1,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro("https://n2g.cn");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  const tags = getUniqueTags(posts);
  return tags.map(({ tag, tagName }) => {
    return {
      params: { tag },
      props: { tag, tagName, posts }
    };
  });
}
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index$3;
  const { tag, tagName, posts } = Astro2.props;
  const postsByTag = getPostsByTag(posts, tag);
  const pagination = getPagination({
    posts: postsByTag,
    page: 1,
    isIndex: true
  });
  return renderTemplate`${renderComponent($$result, "TagPosts", $$TagPosts, { ...pagination, "tag": tag, "tagName": tagName })}`;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/pages/tags/[tag]/index.astro", void 0);

const $$file$3 = "D:/Github项目/GithubN2G风格ASTRO模板/n2g/src/pages/tags/[tag]/index.astro";
const $$url$3 = "/tags/[tag]";

const index$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$3,
  file: $$file$3,
  getStaticPaths,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro("https://n2g.cn");
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$2;
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  const pagination = getPagination({
    posts: sortedPosts,
    page: 1,
    isIndex: true
  });
  return renderTemplate`${renderComponent($$result, "Posts", $$Posts, { ...pagination })}`;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/pages/posts/index.astro", void 0);

const $$file$2 = "D:/Github项目/GithubN2G风格ASTRO模板/n2g/src/pages/posts/index.astro";
const $$url$2 = "/posts";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$2,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro("https://n2g.cn");
const $$Tag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Tag;
  const { tag, size = "sm" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li${addAttribute(`inline-block ${size === "sm" ? "my-1 underline-offset-4" : "my-3 mx-1 underline-offset-8"} astro-blwjyjpt`, "class")}> <a${addAttribute(`/tags/${tag}/`, "href")}${addAttribute(`${size === "sm" ? "text-sm" : "text-lg"} pr-2 group astro-blwjyjpt`, "class")}${addAttribute(renderTransition($$result, "36ssibgs", "", tag), "data-astro-transition-scope")}> <svg xmlns="http://www.w3.org/2000/svg"${addAttribute(`${size === "sm" ? " scale-75" : "scale-110"} astro-blwjyjpt`, "class")}><path d="M16.018 3.815 15.232 8h-4.966l.716-3.815-1.964-.37L8.232 8H4v2h3.857l-.751 4H3v2h3.731l-.714 3.805 1.965.369L8.766 16h4.966l-.714 3.805 1.965.369.783-4.174H20v-2h-3.859l.751-4H21V8h-3.733l.716-3.815-1.965-.37zM14.106 14H9.141l.751-4h4.966l-.752 4z" class="astro-blwjyjpt"></path> </svg>
&nbsp;<span class="astro-blwjyjpt">${tag}</span> </a> </li> `;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/components/Tag.astro", "self");

const $$Astro$1 = createAstro("https://n2g.cn");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const posts = await getCollection("blog");
  let tags = getUniqueTags(posts);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Tags | ${SITE.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "tags" })} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": "Tags", "pageDesc": "All the tags used in posts." }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<ul class="tag-list"> ${tags.map(({ tag }) => renderTemplate`${renderComponent($$result3, "Tag", $$Tag, { "tag": tag, "size": "lg" })}`)} </ul> ` })} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/pages/tags/index.astro", void 0);

const $$file$1 = "D:/Github项目/GithubN2G风格ASTRO模板/n2g/src/pages/tags/index.astro";
const $$url$1 = "/tags";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://n2g.cn");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  const recentPosts = sortedPosts;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "posts" })} ${maybeRenderHead()}<main id="main-content" class="content"> ${recentPosts.length > 0 && renderTemplate`<section id="recent-posts"> <ul class="card-ul"> ${recentPosts.map(
    ({ data, slug }, index) => index < SITE.postPerPage && renderTemplate`${renderComponent($$result2, "Card", Card, { "slug": slug, "href": `/posts/${slug}/`, "frontmatter": data, "secHeading": false })}`
  )} </ul> </section>`} ${recentPosts.length > SITE.postPerPage && renderTemplate`<div class="all-posts-btn-wrapper"> ${renderComponent($$result2, "LinkButton", $$LinkButton, { "href": "/posts/2" }, { "default": ($$result3) => renderTemplate`
更多文章  &gt;
` })} </div>`} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} `;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/pages/index.astro", void 0);

const $$file = "D:/Github项目/GithubN2G风格ASTRO模板/n2g/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Comment as $, index$3 as a, index$2 as b, index$1 as c, index as d, index$4 as i };
