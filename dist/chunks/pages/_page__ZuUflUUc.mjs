import { prependForwardSlash } from '@astrojs/internal-helpers/path';
import { A as AstroError, U as UnknownContentCollectionError, a as createComponent, g as renderUniqueStylesheet, h as renderScriptElement, i as createHeadAndContent, r as renderTemplate, f as renderComponent, u as unescapeHTML, c as createAstro, m as maybeRenderHead, b as addAttribute, j as renderTransition, d as renderSlot } from '../astro_oB0LccEY.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$LinkButton, S as SITE, a as $$Header, b as $$Footer, c as $$Layout } from './404_okefdeQM.mjs';
/* empty css                          */
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useMemo } from 'react';
import { slug } from 'github-slugger';
import sanitizeHtml from 'sanitize-html';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection **${collection}** does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return;
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://n2g.cn", "ASSETS_PREFIX": undefined}, { Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/2011-01-29.md": () => import('../2011-01-29_NtUW7W7B.mjs'),"/src/content/blog/2012-08-03.md": () => import('../2012-08-03_PAeOsghU.mjs'),"/src/content/blog/2012-11-28.md": () => import('../2012-11-28_c4QVXoGw.mjs'),"/src/content/blog/2013-10-21.md": () => import('../2013-10-21_mTPk6OVE.mjs'),"/src/content/blog/2013-10-26.md": () => import('../2013-10-26_8XhfNHHv.mjs'),"/src/content/blog/2013-10-27.md": () => import('../2013-10-27_e8Nziurq.mjs'),"/src/content/blog/2016-08-02.md": () => import('../2016-08-02_WDbunQTk.mjs'),"/src/content/blog/2020-05-20.md": () => import('../2020-05-20_i6bp_uph.mjs'),"/src/content/blog/2021-10-25.md": () => import('../2021-10-25_Vf7e4gO8.mjs'),"/src/content/blog/2025-05-30.md": () => import('../2025-05-30_jCbXRSYf.mjs'),"/src/content/blog/2025-06-02.md": () => import('../2025-06-02_oQAh8JIl.mjs'),"/src/content/blog/2025-06-15.md": () => import('../2025-06-15_oEyxysCj.mjs'),"/src/content/blog/2025-06-18.md": () => import('../2025-06-18_gn6PUwa_.mjs'),"/src/content/blog/2025-07-03.md": () => import('../2025-07-03_QolOJSMm.mjs'),"/src/content/blog/2025-07-08.md": () => import('../2025-07-08_b3mJRXtw.mjs'),"/src/content/blog/2025-07-26.md": () => import('../2025-07-26_kezlHbJr.mjs'),"/src/content/blog/2025-08-11.md": () => import('../2025-08-11_wx9oMl61.mjs'),"/src/content/blog/2025-08-23.md": () => import('../2025-08-23_lb3zrsRY.mjs'),"/src/content/blog/2025-11-02.md": () => import('../2025-11-02_szSQdSL9.mjs'),"/src/content/blog/2025-11-18.md": () => import('../2025-11-18_jJDNumY3.mjs'),"/src/content/blog/markdown-reference.md": () => import('../markdown-reference_6RJ3M4Bo.mjs'),"/src/content/blog/pjblog-2006-07-23.md": () => import('../pjblog-2006-07-23_GTJc5yHB.mjs'),"/src/content/blog/pjblog-2007-03-01.md": () => import('../pjblog-2007-03-01_P3jdpYFy.mjs'),"/src/content/blog/pjblog-2007-03-04.md": () => import('../pjblog-2007-03-04__oix0BB9.mjs'),"/src/content/blog/pjblog-2007-03-16.md": () => import('../pjblog-2007-03-16_RWhI2eqL.mjs'),"/src/content/blog/pjblog-2007-03-17.md": () => import('../pjblog-2007-03-17_PRMU9eFC.mjs'),"/src/content/blog/qzone-2011-06-21.md": () => import('../qzone-2011-06-21_qIGZj-tZ.mjs'),"/src/content/blog/shijidazhan.md": () => import('../shijidazhan_xXBRvjtR.mjs'),"/src/content/blog/typecho-2011-09-25.md": () => import('../typecho-2011-09-25_SYmQCYbw.mjs'),"/src/content/blog/typecho-2012-11-07.md": () => import('../typecho-2012-11-07_e1wQsIt7.mjs'),"/src/content/blog/typecho-2012-11-09.md": () => import('../typecho-2012-11-09_U8AspDmh.mjs'),"/src/content/blog/typecho-2012-11-12.md": () => import('../typecho-2012-11-12_FA3xo9Y0.mjs'),"/src/content/blog/typecho-2012-12-10.md": () => import('../typecho-2012-12-10_sHIa7pXs.mjs'),"/src/content/blog/typecho-2013-11-19.md": () => import('../typecho-2013-11-19_rDa-Gr34.mjs'),"/src/content/blog/typecho-2014-08-30.md": () => import('../typecho-2014-08-30_PDLJvMtv.mjs'),"/src/content/blog/typecho-2014-11-29.md": () => import('../typecho-2014-11-29_oYBQgEoV.mjs'),"/src/content/blog/typecho-2019-11-08.md": () => import('../typecho-2019-11-08_xk1I-yny.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"blog":{"type":"content","entries":{"2011-01-29":"/src/content/blog/2011-01-29.md","red":"/src/content/blog/2012-11-28.md","2012-08-03":"/src/content/blog/2012-08-03.md","jiaxiao":"/src/content/blog/2013-10-21.md","2013-10-26":"/src/content/blog/2013-10-26.md","solo-trip":"/src/content/blog/2013-10-27.md","time-to-end-and-begin":"/src/content/blog/2016-08-02.md","2020-05-20":"/src/content/blog/2020-05-20.md","investment-ten-years":"/src/content/blog/2021-10-25.md","2025-05-30":"/src/content/blog/2025-05-30.md","model-y-dream-car":"/src/content/blog/2025-06-02.md","2025-06-15":"/src/content/blog/2025-06-15.md","ziyouboke":"/src/content/blog/2025-07-03.md","2025-06-18":"/src/content/blog/2025-06-18.md","typecho2astro":"/src/content/blog/2025-07-08.md","2025-07-26":"/src/content/blog/2025-07-26.md","2025-08-23":"/src/content/blog/2025-08-23.md","2025-08-11":"/src/content/blog/2025-08-11.md","youtongxiaole":"/src/content/blog/2025-11-02.md","stars":"/src/content/blog/2025-11-18.md","markdown-reference":"/src/content/blog/markdown-reference.md","pjblog-2006-07-23":"/src/content/blog/pjblog-2006-07-23.md","pjblog-2007-03-01":"/src/content/blog/pjblog-2007-03-01.md","pjblog-2007-03-04":"/src/content/blog/pjblog-2007-03-04.md","pjblog-2007-03-16":"/src/content/blog/pjblog-2007-03-16.md","pjblog-2007-03-17":"/src/content/blog/pjblog-2007-03-17.md","qzone-2011-06-21":"/src/content/blog/qzone-2011-06-21.md","shijidazhan":"/src/content/blog/shijidazhan.md","naxiechunzhendewangshi":"/src/content/blog/typecho-2011-09-25.md","kanqiushiyizhongxinliboyitebieshimailezuqiucaipiaoderen":"/src/content/blog/typecho-2012-11-07.md","yangguangxiadezhuimengren":"/src/content/blog/typecho-2012-11-12.md","shiwangdebisaishangxindecaimin":"/src/content/blog/typecho-2012-11-09.md","suisuiyu":"/src/content/blog/typecho-2012-12-10.md","emengyibanquexiwangzhishigeemeng":"/src/content/blog/typecho-2013-11-19.md","shimian":"/src/content/blog/typecho-2014-08-30.md","aobuqiye":"/src/content/blog/typecho-2014-11-29.md","zucailumanmanbijibunengwang":"/src/content/blog/typecho-2019-11-08.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/2011-01-29.md": () => import('../2011-01-29_XJnvmmoI.mjs'),"/src/content/blog/2012-08-03.md": () => import('../2012-08-03_UcEHickA.mjs'),"/src/content/blog/2012-11-28.md": () => import('../2012-11-28_HCkhhDSn.mjs'),"/src/content/blog/2013-10-21.md": () => import('../2013-10-21_8W7XCNnE.mjs'),"/src/content/blog/2013-10-26.md": () => import('../2013-10-26_KTuhTJCx.mjs'),"/src/content/blog/2013-10-27.md": () => import('../2013-10-27_QgrYNEAb.mjs'),"/src/content/blog/2016-08-02.md": () => import('../2016-08-02_6yd3-Wt-.mjs'),"/src/content/blog/2020-05-20.md": () => import('../2020-05-20_Nu_bf9iA.mjs'),"/src/content/blog/2021-10-25.md": () => import('../2021-10-25_xORDqhku.mjs'),"/src/content/blog/2025-05-30.md": () => import('../2025-05-30_NeaEj1X9.mjs'),"/src/content/blog/2025-06-02.md": () => import('../2025-06-02_o4gvgnyb.mjs'),"/src/content/blog/2025-06-15.md": () => import('../2025-06-15_3_RGgaqY.mjs'),"/src/content/blog/2025-06-18.md": () => import('../2025-06-18_l-E8eonr.mjs'),"/src/content/blog/2025-07-03.md": () => import('../2025-07-03_QWU_1Adh.mjs'),"/src/content/blog/2025-07-08.md": () => import('../2025-07-08_FsvJnI3b.mjs'),"/src/content/blog/2025-07-26.md": () => import('../2025-07-26_84nGO-Wy.mjs'),"/src/content/blog/2025-08-11.md": () => import('../2025-08-11_qmfrZtTi.mjs'),"/src/content/blog/2025-08-23.md": () => import('../2025-08-23_jCKSj1c1.mjs'),"/src/content/blog/2025-11-02.md": () => import('../2025-11-02_HcYJXkAB.mjs'),"/src/content/blog/2025-11-18.md": () => import('../2025-11-18_q6feKWso.mjs'),"/src/content/blog/markdown-reference.md": () => import('../markdown-reference_Q0apTTy7.mjs'),"/src/content/blog/pjblog-2006-07-23.md": () => import('../pjblog-2006-07-23_3uefzmJN.mjs'),"/src/content/blog/pjblog-2007-03-01.md": () => import('../pjblog-2007-03-01_i5eKhsyX.mjs'),"/src/content/blog/pjblog-2007-03-04.md": () => import('../pjblog-2007-03-04_oVb1XbRT.mjs'),"/src/content/blog/pjblog-2007-03-16.md": () => import('../pjblog-2007-03-16_t0FvQtgA.mjs'),"/src/content/blog/pjblog-2007-03-17.md": () => import('../pjblog-2007-03-17_XEEME8B9.mjs'),"/src/content/blog/qzone-2011-06-21.md": () => import('../qzone-2011-06-21_bC7vBQhC.mjs'),"/src/content/blog/shijidazhan.md": () => import('../shijidazhan_QIRimGs5.mjs'),"/src/content/blog/typecho-2011-09-25.md": () => import('../typecho-2011-09-25_aOqKuo6L.mjs'),"/src/content/blog/typecho-2012-11-07.md": () => import('../typecho-2012-11-07_e7CfBbI_.mjs'),"/src/content/blog/typecho-2012-11-09.md": () => import('../typecho-2012-11-09_RHtELApY.mjs'),"/src/content/blog/typecho-2012-11-12.md": () => import('../typecho-2012-11-12_ictpogUw.mjs'),"/src/content/blog/typecho-2012-12-10.md": () => import('../typecho-2012-12-10_98XHY3gk.mjs'),"/src/content/blog/typecho-2013-11-19.md": () => import('../typecho-2013-11-19_LT94eMxg.mjs'),"/src/content/blog/typecho-2014-08-30.md": () => import('../typecho-2014-08-30_Hq_3LmJR.mjs'),"/src/content/blog/typecho-2014-11-29.md": () => import('../typecho-2014-11-29_oTA9eXMp.mjs'),"/src/content/blog/typecho-2019-11-08.md": () => import('../typecho-2019-11-08_d6iQw2XY.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const slugifyStr = (str) => slug(str);
const slugifyAll = (arr) => arr.map((str) => slugifyStr(str));

const $$Astro$3 = createAstro("https://n2g.cn");
const $$Main = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Main;
  const { props } = Astro2;
  return renderTemplate`${maybeRenderHead()}<main id="main-content" class="content"> ${"titleTransition" in props ? renderTemplate`<h1> ${props.pageTitle[0]} <span${addAttribute(renderTransition($$result, "iqfxtmh4", "", props.titleTransition), "data-astro-transition-scope")}> ${props.pageTitle[1]} </span> </h1>` : renderTemplate`<h1>${props.pageTitle}</h1>`} <p>${props.pageDesc}</p> ${renderSlot($$result, $$slots["default"])} </main> `;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/layouts/Main.astro", "self");

const $$Astro$2 = createAstro("https://n2g.cn");
const $$Pagination = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { currentPage, totalPages, prevUrl, nextUrl } = Astro2.props;
  const prev = currentPage > 1 ? "" : "disabled";
  const next = currentPage < totalPages ? "" : "disabled";
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return renderTemplate`${totalPages > 1 && renderTemplate`${maybeRenderHead()}<nav class="pagination-wrapper content" aria-label="Pagination">${renderComponent($$result, "LinkButton", $$LinkButton, { "disabled": prev === "disabled", "href": prevUrl, "className": `mr-4 select-none ${prev}`, "ariaLabel": "Previous" }, { "default": ($$result2) => renderTemplate`
&lt;
` })}${pageNumbers.map((pageNum) => renderTemplate`${renderComponent($$result, "LinkButton", $$LinkButton, { "href": pageNum === 1 ? "/posts/" : `/posts/${pageNum}/`, "className": `mx-1 select-none ${currentPage === pageNum ? "active" : ""}`, "ariaLabel": `Page ${pageNum}` }, { "default": ($$result2) => renderTemplate`${pageNum}` })}`)}${renderComponent($$result, "LinkButton", $$LinkButton, { "disabled": next === "disabled", "href": nextUrl, "className": `ml-4 select-none ${next}`, "ariaLabel": "Next" }, { "default": ($$result2) => renderTemplate`
&gt;
` })}</nav>`}`;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/components/Pagination.astro", void 0);

function Datetime({
  pubDatetime,
  modDatetime,
  size = "sm",
  className
}) {
  return /* @__PURE__ */ jsx("div", { className: `date-box ${className ?? ""}`, children: /* @__PURE__ */ jsx("span", { className: `italic ${size === "sm" ? "text-sm" : "text-base"}`, children: /* @__PURE__ */ jsx(
    FormattedDatetime,
    {
      pubDatetime,
      modDatetime
    }
  ) }) });
}
const FormattedDatetime = ({ pubDatetime, modDatetime }) => {
  const myDatetime = new Date(
    modDatetime && modDatetime > pubDatetime ? modDatetime : pubDatetime
  );
  const date = myDatetime.toISOString().substring(0, 10);
  const [year, month, day] = date.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const monthIndex = parseInt(month) - 1;
  const monthAbbreviation = monthNames[monthIndex];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    monthAbbreviation,
    " ",
    day,
    ", ",
    year
  ] });
};

function Card({ href, slug = "none-slug", frontmatter, secHeading = true }) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;
  const headerProps = {
    style: { viewTransitionName: slugifyStr(slug) },
    className: "text-xl font-medium decoration-dashed hover:underline"
  };
  const renderedDescription = useMemo(() => {
    const allowedTags = [...sanitizeHtml.defaults.allowedTags, "img", "details", "summary"];
    return sanitizeHtml(description, {
      allowedTags,
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title"],
        p: ["class"],
        // 允许 p 标签有 class 属性
        details: ["open"]
        // 允许 details 标签有 open 属性
      }
    });
  }, [description]);
  return /* @__PURE__ */ jsxs("li", { className: "card-list-li", children: [
    /* @__PURE__ */ jsx(Datetime, { pubDatetime, modDatetime }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href,
        className: "card-title",
        children: secHeading ? /* @__PURE__ */ jsx("h2", { ...headerProps, children: title }) : /* @__PURE__ */ jsx("h3", { ...headerProps, children: title })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "post-content",
        dangerouslySetInnerHTML: { __html: renderedDescription }
      }
    )
  ] });
}

const postFilter = ({ data }) => {
  const isPublishTimePassed = Date.now() > new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !data.draft && isPublishTimePassed;
};

function processCustomFormatting(html) {
  html = html.replace(
    /<p>\s*::indent\s*(.*?)<\/p>/gs,
    '<p class="custom-indent">$1</p>'
  );
  html = html.replace(
    /<p>\s*::drop-cap\s*(.*?)<\/p>/gs,
    '<p class="drop-cap">$1</p>'
  );
  return html;
}
const getSortedPosts = (posts) => {
  posts.forEach((post) => {
    const processedContent = remark().use(remarkHtml, { sanitize: false }).processSync(post.body);
    const htmlContent = processedContent.toString();
    const finalHtml = processCustomFormatting(htmlContent);
    if (post.slug === "2025-06-18" || post.slug === "2025-08-23") {
      console.log("=== 文章:", post.slug, " ===");
      console.log("=== 原始内容 ===");
      console.log(post.body);
      console.log("=== 处理后的HTML ===");
      console.log(finalHtml);
    }
    post.data.description = finalHtml;
  });
  return posts.filter(postFilter).sort(
    (a, b) => Math.floor(
      new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1e3
    ) - Math.floor(
      new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1e3
    )
  );
};

const getPageNumbers = (numberOfPosts) => {
  const numberOfPages = numberOfPosts / Number(SITE.postPerPage);
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }
  return pageNumbers;
};

const getPagination = ({
  posts,
  page,
  isIndex = false
}) => {
  const totalPagesArray = getPageNumbers(posts.length);
  const totalPages = totalPagesArray.length;
  const currentPage = isIndex ? 1 : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page)) ? Number(page) : 0;
  const lastPost = isIndex ? SITE.postPerPage : currentPage * SITE.postPerPage;
  const startPost = isIndex ? 0 : lastPost - SITE.postPerPage;
  const paginatedPosts = posts.slice(startPost, lastPost);
  return {
    totalPages,
    currentPage,
    paginatedPosts
  };
};

const $$Astro$1 = createAstro("https://n2g.cn");
const $$TagPosts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TagPosts;
  const { currentPage, totalPages, paginatedPosts, tag, tagName } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Tag: ${tagName} | ${SITE.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "tags" })} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": [`Tag:`, `${tagName}`], "titleTransition": tag, "pageDesc": `All the articles with the tag "${tagName}".` }, { "default": ($$result3) => renderTemplate`  ${maybeRenderHead()}<ul class="tag-list"> ${paginatedPosts.map(({ data, slug }) => renderTemplate`${renderComponent($$result3, "Card", Card, { "href": `/posts/${slug}/`, "frontmatter": data })}`)} </ul> `, "title": ($$result3) => renderTemplate`<h1${addAttribute(renderTransition($$result3, "vfrq7tp3", "", tag), "data-astro-transition-scope")}>${`Tag:${tag}`}</h1>` })} ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "prevUrl": `/tags/${tag}${currentPage - 1 !== 1 ? "/" + (currentPage - 1) : ""}/`, "nextUrl": `/tags/${tag}/${currentPage + 1}/` })} ${renderComponent($$result2, "Footer", $$Footer, { "noMarginTop": totalPages > 1 })} ` })}`;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/layouts/TagPosts.astro", "self");

const getPostsByTag = (posts, tag) => getSortedPosts(
  posts.filter((post) => slugifyAll(post.data.tags).includes(tag))
);

const getUniqueTags = (posts) => {
  const tags = posts.filter(postFilter).flatMap((post) => post.data.tags).map((tag) => ({ tag: slugifyStr(tag), tagName: tag })).filter(
    (value, index, self) => self.findIndex((tag) => tag.tag === value.tag) === index
  ).sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return tags;
};

const $$Astro = createAstro("https://n2g.cn");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  const tags = getUniqueTags(posts);
  return tags.flatMap(({ tag, tagName }) => {
    const tagPosts = getPostsByTag(posts, tag);
    const totalPages = getPageNumbers(tagPosts.length);
    return totalPages.map((page) => ({
      params: { tag, page },
      props: { tag, tagName }
    }));
  });
}
const $$page = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$page;
  const { page } = Astro2.params;
  const { tag, tagName } = Astro2.props;
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const postsByTag = getPostsByTag(posts, tag);
  const pagination = getPagination({
    posts: postsByTag,
    page
  });
  return renderTemplate`${renderComponent($$result, "TagPosts", $$TagPosts, { ...pagination, "tag": tag, "tagName": tagName })}`;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/pages/tags/[tag]/[page].astro", void 0);

const $$file = "D:/Github项目/GithubN2G风格ASTRO模板/n2g/src/pages/tags/[tag]/[page].astro";
const $$url = "/tags/[tag]/[page]";

const _page_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$page,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Main as $, Card as C, Datetime as D, _page_ as _, $$Pagination as a, getSortedPosts as b, getPageNumbers as c, getPagination as d, getUniqueTags as e, getPostsByTag as f, getCollection as g, $$TagPosts as h, slugifyStr as s };
