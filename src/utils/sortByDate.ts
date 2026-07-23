interface DatedItem {
  frontmatter: { date: string | Date };
}

export const sortByDate = (a: DatedItem, b: DatedItem) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
}
