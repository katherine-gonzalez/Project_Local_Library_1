function findAuthorById(authors, id) {
  let result = authors.filter((author) => author.id === id);
  return result[0];
}

function findBookById(books, id) {
  let result = books.filter((book) => book.id === id);
  return result[0];
}

function partitionBooksByBorrowedStatus(books) {
  let booksOut = [];
  let booksIn = [];
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const borrowDetails = book.borrows;
    if (borrowDetails.some((detail) => detail.returned === false)) {
      booksOut.push(book);
    } else {
      booksIn.push(book);
    }
  }
  let result = [booksOut, booksIn];
  return result;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  const borrowDetails = book.borrows;
  let bookIds = borrowDetails.map((detail) => detail.id);

  for (let i = 0; i < accounts.length; i++) {
    let account = accounts[i];
    let accountId = account.id;

    if (bookIds.some((bookId) => bookId === accountId)) {
      let borrowedStatus = borrowDetails.filter(
        (detail) => detail.id === accountId
      );
      let accountWithStatus = {
        ...account,
        returned: borrowedStatus[0].returned,
      };
      result.push(accountWithStatus);
    }

    if (result.length === 10) {
      return result;
    }
  }

  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
