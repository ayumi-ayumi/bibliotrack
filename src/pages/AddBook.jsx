import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import bookApi from "../api/book";
import { useDispatchBooks } from "../contexts/useContext";
import SearchBar from "../components/SearchBar";
import InputBookInfo from "../components/forms/InputBookInfo";
import Toggle from "../components/forms/Toggle";
import InputDate from "../components/forms/InputDate";
import InputComment from "../components/forms/InputComment";
import InputRating from "../components/forms/InputRating";

export default function AddBook() {
  const dispatch = useDispatchBooks();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: "",
      author: "",
      date: "",
      comment: "",
    },
  });

  const [newBook, setNewBook] = useState({});
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState("Have Read");
  const [error, setError] = useState("");

  const handleChangeRating = (rating) => setRating(rating);

  const handleBookSearch = (value) => {
    setValue("title", value.title);
    setValue("author", value.author);
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
      rating,
      status,
      isbn: newBook.isbn,
      thumbnail: newBook.thumbnail,
    };

    try {
      await bookApi.post(bookData);
      dispatch({ type: "book/add", book: bookData });
      if (status === "Have Read") {
        navigate("/bookshelf");
      } else {
        navigate("/toread");
      }
    } catch (e) {
      console.error("Error occurred!", e);
      setError("Failed to add the book. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-5 bg-white shadow-md rounded-lg">
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
        <InputDate register={register} errors={errors} />
        <InputComment register={register} errors={errors} />
        <InputRating rating={rating} onChange={handleChangeRating} />
        {error && <div className="text-center text-red-500">{error}</div>}
        <input
          type="submit"
          value="Add Book"
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-800 transition-colors"
        />
      </form>
    </div>
  );
}
