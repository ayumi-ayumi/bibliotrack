import { Link } from 'react-router-dom';

export default function Page404() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <h2 className="text-lg">404 Not Found</h2>
      <img
        src="./notFound.png"
        alt="404 Not Found"
        className="mx-auto my-0 w-2/4"
      />
      <Link
        to="/"
        className="mt-10 rounded-md bg-teal-200 px-4 py-2 hover:bg-teal-400"
      >
        Back to Top
      </Link>
    </div>
  );
}
