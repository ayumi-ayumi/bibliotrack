import { useBooks } from '../contexts/BookContext';
import BookCard from '../components/BookCard';

export default function ToReadPile() {
  const books = useBooks();

  return (
    <>
      <h2 className="text-center text-2xl">To-Read Pile</h2>
      <div className="mx-auto my-8 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {books
          .filter((book) => book.status === 'To-Read')
          .map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
      </div>
    </>
  );
}
