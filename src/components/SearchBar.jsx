import { useState, useRef } from "react";
import bookApi from "../api/book";

export default function SearchBar({ onResultChange }) {
  const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleSubmit();
  };

  const handleFocus = () => {
    setShowResults(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  const handleChange = async (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (inputRef.current) inputRef.current.focus();

    if (input.length === 0) {
      setResults([]);
      return;
    }

    try {
      const response = await bookApi.searchBook({ input: input });
      setResults(response);
      setShowResults(true);
    } catch (err) {
      console.error("Error searching for book:", err);
    }
  };

  function singleResult(result) {
    const handleSelectResult = () => {
      setShowResults(false);
      onResultChange(result);
    };

    return (
      <button
        onClick={handleSelectResult}
        className="p-2 hover:bg-gray-200"
        key={result.isbn + result.title}
      >
        <strong>{result.title}</strong> by {result.author}
      </button>
    );
  }

  return (
    <div className="relative mb-4">
      <div className="flex h-13">
        <input
          type="text"
          className="form-control w-full border border-gray-300 rounded-md p-2 bg-slate-100 hover:bg-white focus:ring-2 focus:outline-none focus:ring-teal-800"
          placeholder="Search for a title..."
          ref={inputRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <button
          onClick={handleSubmit}
          className="w-14 border solid border-lime-700 rounded-md bg-transparent py-0 px-2 hover:bg-slate-100"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="m-0 absolute w-full shadow-sm z-30 rounded-md bg-white">
        {results?.length > 0 && showResults && (
          <ul className="border border-gray-300 rounded-md">
            {results.map(singleResult)}
          </ul>
        )}
      </div>
    </div>
  );
}

