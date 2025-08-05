import Fuse from "fuse.js";
import { useState, useMemo, useRef, useEffect } from "react";
import Card from "./Card";
import type { CollectionEntry } from "astro:content";

export type SearchItem = {
  title: string;
  description: string;
  data: CollectionEntry<"blog">["data"];
  slug: string;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = useMemo(
    () =>
      new Fuse(searchList, {
        keys: ["title", "description", "data.tags", "data.categories"],
        includeMatches: true,
        minMatchCharLength: 1,
        threshold: 0.5,
      }),
    [searchList]
  );

  useEffect(() => {
    // 只有当输入值长度大于0时才进行搜索
    if (inputVal.length > 0) {
      const searchResult = fuse.search(inputVal);
      setSearchResults(searchResult);
    } else {
      setSearchResults(null);
    }
  }, [fuse, inputVal]);

  // 清空搜索
  const clearSearch = () => {
    setInputVal("");
    setSearchResults(null);
    inputRef.current?.focus();
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <span style={{ 
          position: 'absolute', 
          left: '10px', 
          top: '50%', 
          transform: 'translateY(-50%)',
          opacity: 0.7,
          pointerEvents: 'none'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="m19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
          </svg>
        </span>
        <input
          style={{
            width: '100%',
            padding: '12px 40px 12px 40px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            outline: 'none'
          }}
          placeholder="搜索文章..."
          type="text"
          name="search"
          value={inputVal}
          onChange={handleChange}
          autoComplete="off"
          ref={inputRef}
        />
        {inputVal && (
          <button
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px'
            }}
            onClick={clearSearch}
            title="清空搜索"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {inputVal.length > 0 && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '10px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '4px',
          fontSize: '14px',
          color: '#666'
        }}>
          找到 {searchResults?.length ?? 0} 个结果
          {inputVal && ` 关于 "${inputVal}"`}
        </div>
      )}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {searchResults &&
          searchResults.map(({ item, refIndex }) => (
            <Card
              href={`/posts/${item.slug}/`}
              frontmatter={item.data}
              key={`${refIndex}-${item.slug}`}
              slug={item.slug}
              searchTerm={inputVal}
            />
          ))}
      </ul>
    </div>
  );
}