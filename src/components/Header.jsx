import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between w-full py-3 px-6 bg-teal-900 text-neutral-50">
      <Link to="/">
        <div className="flex items-center cursor-pointer">
          <img src="./book_logo.png" className="w-9" alt="Logo" />
          <div className="text-4xl">BiblioTrack</div>
        </div>
      </Link>

      <nav className="flex items-center mr-10">
        <ul className="flex gap-10 text-xl">
          {[
            ["Add Book", "/add"],
            ["Bookshelf", "/books"],
            ["To-Read Pile", "/toread"],
            ["Logout", "/"],
          ].map(([title, url]) => (
            <li key={url}>
              <Link
                to={url}
                className="underline-animation underline-animation::after underline-animation:active::after underline-animation::before underline-animation:hover::before underline-animation:focus::before"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
