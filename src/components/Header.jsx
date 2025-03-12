import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

export default function Header() {
  const { handleGoogleSignOut } = useAuth();

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { title: 'Home', url: '/' },
    { title: 'Add Book', url: '/add' },
    { title: 'Bookshelf', url: '/bookshelf' },
    { title: 'To-Read Pile', url: '/toread' },
    { title: 'Logout', url: '/' },
  ];

  return (
    <header className="flex w-full justify-between bg-teal-900 px-6 py-3 text-neutral-50">
      <Link to="/">
        <div className="flex cursor-pointer items-center">
          <img src="./book_logo.png" className="w-9" alt="Logo" />
          <div className="text-4xl">BiblioTrack</div>
        </div>
      </Link>
      {/* Desktop menu */}
      <nav className="mr-5 hidden items-center md:flex">
        <ul className="flex gap-5 lg:gap-10 lg:text-xl">
          {navItems.map((item) =>
            item.title === 'Logout' ? (
              <li key={item.url + item.title}>
                <Link
                  to={item.url}
                  onClick={handleGoogleSignOut}
                  className="underline-animation"
                >
                  {item.title}
                </Link>
              </li>
            ) : (
              <li key={item.url + item.title}>
                <Link to={item.url} className="underline-animation">
                  {item.title}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>

      <div className="md:hidden">
        <button
          // data-collapse-toggle="navbar-default"
          type="button"
          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-teal-600 md:hidden ${
            nav && 'bg-teal-600'
          } ring-2 ring-gray-200 transition duration-200 focus:outline-none`}
          // aria-controls="navbar-default"
          // aria-expanded="false"
          onClick={handleNav}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-5 w-5"
            // aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu - hamburger menu */}
      <ul
        className={
          nav
            ? 'fixed right-0 top-16 z-20 h-full w-2/5 border-r border-r-gray-900 bg-teal-600 duration-500 ease-in-out md:hidden'
            : 'fixed bottom-0 right-[-100%] top-16 z-20 w-2/5 duration-500 ease-in-out'
        }
      >
        {/* Mobile Navigation Items */}
        {navItems.map((item) =>
          item.title === 'Logout' ? (
            <li
              key={item.url + item.title}
              onClick={handleGoogleSignOut}
              className="cursor-pointer rounded-xl border-b border-gray-600 p-4 duration-300 hover:bg-teal-200 hover:text-black"
            >
              {item.title}
            </li>
          ) : (
            <li
              key={item.url + item.title}
              className="cursor-pointer rounded-xl border-b border-gray-600 p-4 duration-300 hover:bg-teal-200 hover:text-black"
            >
              {item.title}
            </li>
          ),
        )}
      </ul>
    </header>
  );
}
