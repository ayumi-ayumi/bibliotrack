import { INIT_BOOKS, ADD_BOOK, DELETE_BOOK, UPDATE_BOOK } from "./actionTypes";

const reducer = (books, action) => {
  switch (action.type) {
    case INIT_BOOKS:
      return action.books;

    case ADD_BOOK:
      return [action.book, ...books];

    case DELETE_BOOK:
      return books.filter((_book) => _book._id !== action.book._id);

    case UPDATE_BOOK:
      const updatedBooks = books.filter(
        (_book) => _book._id !== action.book._id
      );
      updatedBooks.unshift(action.book);
      return updatedBooks;

    default:
      return books;
  }
};

export default reducer;