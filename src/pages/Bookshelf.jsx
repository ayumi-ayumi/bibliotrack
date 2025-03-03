import BookCard from "../components/BookCard";
import { useBooks } from "../contexts/useContext";

export default function Bookshelf() {
  const books = useBooks();
  return (
    <>
      <h2 className="text-2xl text-center">Read Books</h2>
      <div className="w-full gap-5 grid grid-cols-3 my-8 mx-auto">
        {books
          .filter((book) => book.status === "Have Read")
          .map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
      </div>
    </>
  );
}
