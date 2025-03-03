import { createContext, useContext } from "react";

const BookContext = createContext();
const BookDispatchContext = createContext();

const useBooks = () => useContext(BookContext);
const useDispatchBooks = () => useContext(BookDispatchContext);

export { BookContext, BookDispatchContext, useBooks, useDispatchBooks };