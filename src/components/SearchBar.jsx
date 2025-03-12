import { useState, useRef } from 'react';
import bookApi from '../api/book';

export default function SearchBar({ onResultChange }) {
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') handleSubmit();
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
    } catch (error) {
      console.error('Error searching for book:', error);
    }
  };

  function singleResult(result) {
    const handleSelectResult = () => {
      setShowResults(false);
      onResultChange(result);
    };

    return (
      <button
        key={result.isbn + result.title}
        className="p-2 hover:bg-gray-200"
        onClick={handleSelectResult}
      >
        <strong>{result.title}</strong> by {result.author}
      </button>
    );
  }

  return (
    <div className="relative mb-4">
      <div className="h-13 flex">
        <input
          type="text"
          className="form-control w-full rounded-md border border-gray-300 bg-slate-100 p-2 hover:bg-white focus:outline-none focus:ring-2 focus:ring-teal-800"
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
          className="solid w-14 rounded-md border border-lime-700 bg-transparent px-2 py-0 hover:bg-slate-100"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="absolute z-30 m-0 w-full rounded-md bg-white shadow-sm">
        {results?.length > 0 && showResults && (
          <ul className="rounded-md border border-gray-300">
            {results.map(singleResult)}
          </ul>
        )}
      </div>
    </div>
  );
}
