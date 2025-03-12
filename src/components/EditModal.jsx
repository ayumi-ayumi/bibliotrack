import { useState } from 'react';
import { useForm } from 'react-hook-form';
import bookApi from '../api/book';
import { useDispatchBooks } from '../contexts/BookContext';
import InputComment from './forms/InputComment';
import InputDate from './forms/InputDate';
import InputRating from './forms/InputRating';
import { convertDate } from '../utils/helperfunctions';

export default function EditModal({ book, toggleEditModal }) {
  const dispatch = useDispatchBooks();

  const [error, setError] = useState('');
  const [rating, setRating] = useState(
    book.status === 'Have Read' ? book.rating : 0,
  );

  const clickCancel = () => toggleEditModal();
  const handleChangeRating = (rate) => setRating(rate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      date: book.status === 'Have Read' ? convertDate(book.date) : '',
      comment: book.status === 'Have Read' ? book.comment : '',
    },
  });

  const onSubmit = async (inputs) => {
    const formedBook = {
      ...book,
      ...inputs,
      rating: rating,
      status: book.status === 'To-Read' ? 'Have Read' : book.status,
    };

    try {
      await bookApi.patch(formedBook);
      dispatch({ type: 'UPDATE_BOOK', book: formedBook });
      toggleEditModal();
    } catch (e) {
      console.log('error occured!', e);
      setError(e);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">
      <form
        className="w-96 rounded-md bg-white p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="page-title">
          <p className="text-lg font-medium">{book.title}</p>
          <p className="text-lg font-medium text-slate-700">{book.author}</p>
        </div>

        <div className="flex flex-col gap-3">
          <InputComment register={register} errors={errors} />
          <InputDate register={register} errors={errors} />
          <InputRating rating={rating} onChange={handleChangeRating} />
        </div>

        <div className="text-center">{error}</div>

        <div className="mt-5 flex justify-around text-lg">
          <button className="btn btn-cancel" onClick={clickCancel}>
            Cancel
          </button>
          <button className="btn bg-teal-600 text-white hover:bg-teal-700">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
