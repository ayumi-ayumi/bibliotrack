import { useState } from 'react';
import { createPortal } from 'react-dom';
import Rating from 'react-rating';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { convertDate } from '../utils/helperfunctions';

const ModalPortal = ({ children }) => {
  return createPortal(children, document.body);
};

const BookCard = ({ book }) => {
  const [status, setStatus] = useState('Have Read');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const toggleEditModal = () => setIsEditModalOpen((prev) => !prev);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  const title =
    book.title.length > 30 ? book.title.substring(0, 30) + '...' : book.title;

  const author =
    book.author.length > 30
      ? book.author.substring(0, 40) + '...'
      : book.author;

  const comment =
    book.comment.length > 20
      ? book.comment.substring(0, 20) + '...'
      : book.comment;

  return (
    <>
      <div
        key={book._id}
        className={`${
          book.status === 'Have Read' ? 'bg-amber-50' : 'bg-teal-50'
        } relative grid h-52 grid-cols-8 rounded-md bg-amber-50 shadow-2xl hover:shadow-none`}
      >
        <div className="col-span-3 flex h-52 items-center justify-center overflow-hidden">
          <img
            src={book.thumbnail || './book_alt.png'}
            alt="thumbnail"
            onError={(e) => (e.target.src = './book_alt.png')}
            className={
              book.thumbnail
                ? 'rounded-l-md object-cover'
                : 'h-25 w-25 object-cover'
            }
          />
        </div>
        <div className="relative col-span-5 p-2">
          <h3 className="h-1/5 text-lg leading-5">{title}</h3>
          <h3 className="my-1 text-lg leading-5 text-slate-700">{author}</h3>

          {book.status === 'Have Read' && book.date && (
            <div>
              <div className="my-1 inline text-sm">Read Date: </div>
              <p className="text-md inline">
                {book.date && convertDate(book.date)}
              </p>
            </div>
          )}

          {book.status === 'To-Read' && (
            <div>
              <div className="my-1 inline text-sm">Added Date: </div>
              <p className="text-md inline">
                {book.createdAt && convertDate(book.createdAt)}
              </p>
            </div>
          )}

          {comment && (
            <div>
              <span className="my-1 text-sm">Comment: </span>
              <p className="break-words">{comment}</p>
            </div>
          )}

          <div className="absolute bottom-2 left-2">
            {book.rating > 0 && (
              <>
                <span className="text-sm">Rating: </span>
                <Rating
                  emptySymbol="fa fa-star-o fa-base"
                  fullSymbol="fa fa-star fa-base"
                  fractions={1}
                  initialRating={book.rating}
                  readonly={true}
                />
              </>
            )}
          </div>

          {book.status === 'To-Read' && (
            <button
              className="absolute bottom-2 left-2 cursor-pointer rounded-lg bg-teal-600 bg-opacity-90 px-2 py-1 text-white hover:bg-teal-800"
              onClick={toggleEditModal}
            >
              <i className="fa-solid fa-circle-plus"></i>
              <span> Have Read</span>
            </button>
          )}

          <div className="absolute bottom-2 right-3">
            {book.status === 'Have Read' && (
              <button
                className="cursor-pointer text-blue-500"
                onClick={toggleEditModal}
              >
                <i className="fa-solid fa-pen-to-square mr-2"></i>
              </button>
            )}
            <button
              className="cursor-pointer text-red-500"
              onClick={toggleDeleteModal}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <ModalPortal>
          <EditModal book={book} toggleEditModal={toggleEditModal} />
        </ModalPortal>
      )}

      {isDeleteModalOpen && (
        <ModalPortal>
          <DeleteModal book={book} toggleDeleteModal={toggleDeleteModal} />
        </ModalPortal>
      )}
    </>
  );
};

export default BookCard;
