const getPageNumbers = (numberOfPosts: number, postsPerPage: number = 5) => {
  const numberOfPages = Math.ceil(numberOfPosts / postsPerPage);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};

export default getPageNumbers;