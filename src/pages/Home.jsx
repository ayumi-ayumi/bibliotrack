import { Link } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';
import BarChart from '../components/BarChart';
import BookCard from '../components/BookCard';

export default function Home() {
  const books = useBooks();

  let latestHaveReadBook;
  let topOnThePile;
  if (books.length !== 0) {
    latestHaveReadBook = books.filter((book) => book.status === 'Have Read')[0];
    topOnThePile = books.filter((book) => book.status === 'To-Read')[0];
  }

  return (
    <div className="mx-auto my-0 flex flex-col gap-5 md:grid md:w-5/6 md:grid-cols-2 md:grid-rows-2">
      <div className="home-panel col-span-2">
        <BarChart />
      </div>

      <div className="home-panel home-panel-bottom md:row-start-2">
        <h3 className="text-center">The Latest Book I Read</h3>
        {latestHaveReadBook && <BookCard book={latestHaveReadBook} />}
        <Link to="/bookshelf" className="home-panel-bottom-link">
          View Bookshelf
          <i className="fa-solid fa-angle-right"></i>
        </Link>
      </div>

      <div className="home-panel home-panel-bottom md:row-start-2">
        <h3 className="text-center">The Top Book on To-Read Pile</h3>
        {topOnThePile && <BookCard book={topOnThePile} />}
        <Link to="/add" className="home-panel-bottom-link">
          <i className="fa-solid fa-plus"></i>
          Add to The Pile
        </Link>
      </div>
    </div>
  );
}
