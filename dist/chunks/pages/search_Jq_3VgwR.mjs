import { c as createAstro, a as createComponent, r as renderTemplate, f as renderComponent } from '../astro_oB0LccEY.mjs';
import 'kleur/colors';
import 'clsx';
import { C as Card, g as getCollection, b as getSortedPosts, $ as $$Main } from './_page__ZuUflUUc.mjs';
import { a as $$Header, b as $$Footer, S as SITE, c as $$Layout } from './404_okefdeQM.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import Fuse from 'fuse.js';
import { useRef, useState, useMemo, useEffect } from 'react';

function SearchBar({ searchList }) {
  const inputRef = useRef(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState(
    null
  );
  const handleChange = (e) => {
    setInputVal(e.currentTarget.value);
  };
  const fuse = useMemo(
    () => new Fuse(searchList, {
      keys: ["title", "description"],
      includeMatches: true,
      minMatchCharLength: 2,
      threshold: 0.5
    }),
    [searchList]
  );
  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr)
      setInputVal(searchStr);
    setTimeout(function() {
      inputRef.current.selectionStart = inputRef.current.selectionEnd = searchStr?.length || 0;
    }, 50);
  }, []);
  useEffect(() => {
    let inputResult = inputVal.length > 1 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);
    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
      history.replaceState(history.state, "", newRelativePathQuery);
    } else {
      history.replaceState(history.state, "", window.location.pathname);
    }
  }, [inputVal]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("label", { className: "search-bar", children: [
      /* @__PURE__ */ jsx("span", { className: "search-bar-text", children: /* @__PURE__ */ jsx("span", { className: "", children: "关键词" }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "search-bar-input",
          placeholder: "Search for anything...",
          type: "text",
          name: "search",
          value: inputVal,
          onChange: handleChange,
          autoComplete: "off",
          ref: inputRef
        }
      )
    ] }),
    inputVal.length > 1 && /* @__PURE__ */ jsxs("div", { className: "search-bar-result", children: [
      "找到 ",
      searchResults?.length,
      "个结果关于 '",
      inputVal,
      "'"
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "card-ul", children: searchResults && searchResults.map(({ item, refIndex }) => /* @__PURE__ */ jsx(
      Card,
      {
        href: `/posts/${item.slug}/`,
        frontmatter: item.data
      },
      `${refIndex}-${item.slug}`
    )) })
  ] });
}

const $$Astro = createAstro("https://n2g.cn");
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sortedPosts = getSortedPosts(posts);
  const searchList = sortedPosts.map(({ data, slug }) => ({
    title: data.title,
    description: data.description,
    data,
    slug
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `\u641C\u7D22 | ${SITE.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "activeNav": "search" })} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": "\u641C\u7D22", "pageDesc": "" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "SearchBar", SearchBar, { "client:load": true, "searchList": searchList, "client:component-hydration": "load", "client:component-path": "@components/Search", "client:component-export": "default" })} ` })} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "D:/Github\u9879\u76EE/GithubN2G\u98CE\u683CASTRO\u6A21\u677F/n2g/src/pages/search.astro", void 0);

const $$file = "D:/Github项目/GithubN2G风格ASTRO模板/n2g/src/pages/search.astro";
const $$url = "/search";

export { $$Search as default, $$file as file, $$url as url };
