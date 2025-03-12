import {
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import bookApi from '../api/book';

const BookContext = createContext();
const BookDispatchContext = createContext();

const useBooks = () => useContext(BookContext);
const useDispatchBooks = () => useContext(BookDispatchContext);

const reducer = (books, action) => {
  switch (action.type) {
    case 'INIT_BOOKS':
      return action.books;

    case 'ADD_BOOK':
      return [action.book, ...books];

    case 'DELETE_BOOK':
      return books.filter((_book) => _book._id !== action.book._id);

    case 'UPDATE_BOOK': {
      const index = books.findIndex((book) => book._id === action.book._id);
      if (index !== -1) {
        return [
          ...books.slice(0, index),
          action.book,
          ...books.slice(index + 1),
        ];
      }
      return books;
    }

    default:
      return books;
  }
};

const BookProvider = ({ children }) => {
  const [books, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    bookApi
      .getAllBooks()
      .then((_books) => {
        dispatch({ type: 'INIT_BOOKS', books: _books });
      })
      .catch((error) => {
        console.error('Failed to fetch books:', error);
      });
  }, []);

  const memoizedDispatch = useCallback(dispatch, []);
  const memoizedBooks = useMemo(() => books, [books]);

  return (
    <BookContext.Provider value={memoizedBooks}>
      <BookDispatchContext.Provider value={memoizedDispatch}>
        {children}
      </BookDispatchContext.Provider>
    </BookContext.Provider>
  );
};

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { BookProvider, useBooks, useDispatchBooks };
