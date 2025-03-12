import { useState } from 'react';
import bookApi from '../api/book';
import { useDispatchBooks } from '../contexts/BookContext';

export default function DeleteModal({ book, toggleDeleteModal }) {
  const dispatch = useDispatchBooks();
  const [error, setError] = useState('');

  function handleDelete(book) {
    bookApi
      .delete(book)
      .then(() => {
        dispatch({ type: 'DELETE_BOOK', book: book });
        toggleDeleteModal();
      })
      .catch((error) => {
        console.log('Failed to delete book:', error);
        setError(error);
      });
  }

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">
      <div className="w-96 rounded-md bg-white p-5">
        <div className="text-center">
          <p className="text-lg font-medium">{book.title}</p>
          <p className="text-lg font-medium"> Do you want to delete ?</p>
        </div>
        <div>{error}</div>
        <div className="mt-5 flex justify-around text-lg">
          <button onClick={toggleDeleteModal} className="btn btn-cancel">
            Cancel
          </button>
          <button
            onClick={() => handleDelete(book)}
            className="btn bg-red-600 text-white hover:bg-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
