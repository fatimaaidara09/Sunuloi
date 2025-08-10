import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const JournalSearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/journal/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-between bg-white shadow-md border border-gray-200 rounded-xl px-4 py-3 mb-4"
    >
      <input
        type="text"
        placeholder="Rechercher un journal..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm px-2"
      />
      <button
        type="submit"
        className="ml-3 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition"
        aria-label="Rechercher"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default JournalSearchBar;


