import type { CollectionEntry } from "astro:content";

export interface PostGroup {
  year: number;
  months: {
    month: number;
    posts: CollectionEntry<"blog">[];
    count: number;
  }[];
  totalPosts: number;
}

export interface ArchiveStats {
  totalPosts: number;
  totalYears: number;
  firstPostDate: Date;
  lastPostDate: Date;
  tagsCount: Map<string, number>;
}

/**
 * 将文章按年份和月份分组
 */
export function groupPostsByDate(posts: CollectionEntry<"blog">[]): PostGroup[] {
  const groupedByYear = new Map<number, Map<number, CollectionEntry<"blog">[]>>();
  
  // 将文章按年月分组
  posts.forEach(post => {
    const date = new Date(post.data.pubDatetime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0-11 -> 1-12
    
    if (!groupedByYear.has(year)) {
      groupedByYear.set(year, new Map());
    }
    
    const yearGroup = groupedByYear.get(year)!;
    if (!yearGroup.has(month)) {
      yearGroup.set(month, []);
    }
    
    yearGroup.get(month)!.push(post);
  });
  
  // 转换为PostGroup数组并排序
  const result: PostGroup[] = [];
  groupedByYear.forEach((months, year) => {
    const monthGroups: PostGroup["months"] = [];
    let totalPosts = 0;
    
    months.forEach((posts, month) => {
      // 按日期降序排序
      posts.sort((a, b) => 
        new Date(b.data.pubDatetime).getTime() - new Date(a.data.pubDatetime).getTime()
      );
      
      totalPosts += posts.length;
      monthGroups.push({
        month,
        posts,
        count: posts.length
      });
    });
    
    // 按月份降序排序
    monthGroups.sort((a, b) => b.month - a.month);
    
    result.push({
      year,
      months: monthGroups,
      totalPosts
    });
  });
  
  // 按年份降序排序
  result.sort((a, b) => b.year - a.year);
  
  return result;
}

/**
 * 获取归档统计信息
 */
export function getArchiveStats(posts: CollectionEntry<"blog">[]): ArchiveStats {
  if (posts.length === 0) {
    return {
      totalPosts: 0,
      totalYears: 0,
      firstPostDate: new Date(),
      lastPostDate: new Date(),
      tagsCount: new Map()
    };
  }
  
  const tagsCount = new Map<string, number>();
  const dates = posts.map(post => new Date(post.data.pubDatetime));
  
  // 统计标签使用次数
  posts.forEach(post => {
    if (post.data.tags) {
      post.data.tags.forEach(tag => {
        tagsCount.set(tag, (tagsCount.get(tag) || 0) + 1);
      });
    }
  });
  
  // 按使用次数排序标签
  const sortedTagsCount = new Map([...tagsCount.entries()].sort((a, b) => b[1] - a[1]));
  
  const firstPostDate = new Date(Math.min(...dates.map(d => d.getTime())));
  const lastPostDate = new Date(Math.max(...dates.map(d => d.getTime())));
  
  const years = new Set(dates.map(d => d.getFullYear()));
  
  return {
    totalPosts: posts.length,
    totalYears: years.size,
    firstPostDate,
    lastPostDate,
    tagsCount: sortedTagsCount
  };
}

/**
 * 获取月份名称
 */
export function getMonthName(month: number): string {
  const monthNames = [
    "一月", "二月", "三月", "四月", "五月", "六月",
    "七月", "八月", "九月", "十月", "十一月", "十二月"
  ];
  return monthNames[month - 1] || "";
}

/**
 * 获取季节
 */
export function getSeason(month: number): string {
  if (month >= 3 && month <= 5) return "春季";
  if (month >= 6 && month <= 8) return "夏季";
  if (month >= 9 && month <= 11) return "秋季";
  return "冬季";
}

/**
 * 获取季节图标
 */
export function getSeasonIcon(month: number): string {
  if (month >= 3 && month <= 5) return "🌸"; // 春季
  if (month >= 6 && month <= 8) return "☀️"; // 夏季
  if (month >= 9 && month <= 11) return "🍂"; // 秋季
  return "❄️"; // 冬季
}