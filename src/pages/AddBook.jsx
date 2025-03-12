import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatchBooks } from '../contexts/BookContext';
import bookApi from '../api/book';
import SearchBar from '../components/SearchBar';
import InputBookInfo from '../components/forms/InputBookInfo';
import Toggle from '../components/forms/Toggle';
import InputDate from '../components/forms/InputDate';
import InputComment from '../components/forms/InputComment';
import InputRating from '../components/forms/InputRating';

export default function AddBook() {
  const dispatch = useDispatchBooks();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      author: '',
      date: '',
      comment: '',
    },
  });

  const [newBook, setNewBook] = useState({});
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState('Have Read');
  const [error, setError] = useState('');

  const handleChangeRating = (rating) => setRating(rating);

  const handleBookSearch = (value) => {
    setValue('title', value.title);
    setValue('author', value.author);
    setNewBook((prevValue) => {
      return {
        ...prevValue,
        title: value.title,
        author: value.author,
        isbn: value.isbn,
        thumbnail: value.thumbnail,
      };
    });
  };

  const onSubmit = async (formInputs) => {
    const bookData = {
      ...formInputs,
      status,
      rating,
      isbn: newBook.isbn,
      thumbnail: newBook.thumbnail,
    };

    try {
      await bookApi.post(bookData);
      dispatch({ type: 'ADD_BOOK', book: bookData });
      if (status === 'Have Read') {
        navigate('/bookshelf');
      } else {
        navigate('/toread');
      }
    } catch (e) {
      console.error('Error occurred!', e);
      setError('Failed to add the book. Please try again.');
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg rounded-lg bg-white p-5 shadow-md">
      <div>
        <p>Search a Book</p>
        <SearchBar onResultChange={handleBookSearch} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
        <div>
          <p>Or Input manually</p>
          <div>
            <InputBookInfo
              register={register}
              errors={errors}
              label="title"
              labelText="Title"
            />
            <InputBookInfo
              register={register}
              errors={errors}
              label="author"
              labelText="Author"
            />
          </div>
        </div>
        <Toggle
          setStatus={setStatus}
          leftText="Have Read"
          rightText="To-Read"
        />
        {status === 'Have Read' && (
          <>
            <InputDate register={register} errors={errors} />
            <InputComment register={register} errors={errors} />
            <InputRating rating={rating} onChange={handleChangeRating} />
          </>
        )}
        {error && <div className="text-center text-red-500">{error}</div>}
        <input
          type="submit"
          value="Add Book"
          className="cursor-pointer rounded bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-800"
        />
      </form>
    </div>
  );
}
