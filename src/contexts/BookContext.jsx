import {
  useEffect,
  useReducer,
  useCallback,
  useMemo
} from "react";
import PropTypes from "prop-types";
import bookApi from "../api/book";
import reducer from "./reducer";
import { INIT_BOOKS } from "./actionTypes";
import { BookContext, BookDispatchContext } from "./useContext";

const BookProvider = ({ children }) => {
  const [books, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    bookApi
      .getAllBooks()
      .then((_books) => {
        dispatch({ type: INIT_BOOKS, books: _books });
      })
      .catch((error) => {
        console.error("Failed to fetch books:", error);
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

export { BookProvider };
