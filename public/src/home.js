function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  for (let i = 0; i < books.length; i++) {
    let bookBorrows = books[i].borrows;
    if (bookBorrows.some((borrowInfo) => borrowInfo.returned === false))
      total += 1;
  }
  return total;
}

function getMostCommonGenres(books) {
  let beforeSort = books.reduce((acc, book) => {
    const genre = book.genre;
    if (!acc[genre]) acc[genre] = { name: genre, count: 1 };
    else acc[genre].count++;
    return acc;
  }, {});

  const result = Object.values(beforeSort);

  return result
    .sort((genre1, genre2) => genre2.count - genre1.count)
    .splice(0, 5);
}

function getMostPopularBooks(books) {
  let beforeSort = books.reduce((acc, book) => {
    const title = book.title;
    const borrows = book.borrows;

    if (!acc[title]) {
      acc[title] = { name: title, count: borrows.length };
    }
    return acc;
  }, {});

  const result = Object.values(beforeSort);

  return result
    .sort((title1, title2) => title2.count - title1.count)
    .splice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let result = [];

  for (let i = 0; i < authors.length; i++) {
    const author = authors[i];
    const authorName = author.name;
    const authorUId = author.id;
    const { first, last } = authorName;
    let bookMatches = books.filter((book) => {
      if (authorUId === book.authorId) return book;
    });

    bookMatches.reduce((acc, book) => {
      if (!acc[authorUId]) {
        result.push(
          (acc[authorUId] = {
            name: `${first} ${last}`,
            count: book.borrows.length,
          })
        );
      } else {
        acc[authorUId].count += book.borrows.length;
      }
      return acc;
    }, {});
  }

  return result
    .sort((author1, author2) => author2.count - author1.count)
    .splice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
