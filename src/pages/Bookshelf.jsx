import { useBooks } from '../contexts/BookContext';
import BookCard from '../components/BookCard';

export default function Bookshelf() {
  const books = useBooks();

  return (
    <>
      <h2 className="text-center text-2xl">Read Books</h2>
      <div className="mx-auto my-8 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {books
          .filter((book) => book.status === 'Have Read')
          .map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
      </div>
    </>
  );
}
