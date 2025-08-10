// src/components/SearchBar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "";
  const initialDateFrom = params.get("dateFrom") || "";
  const initialDateTo = params.get("dateTo") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [dateFrom, setDateFrom] = useState(initialDateFrom);
  const [dateTo, setDateTo] = useState(initialDateTo);

  // Sync state with URL when URL changes
  useEffect(() => {
    setSearchTerm(initialQuery);
    setDateFrom(initialDateFrom);
    setDateTo(initialDateTo);
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();

    if (searchTerm.trim()) queryParams.set("q", searchTerm.trim());
    if (dateFrom) queryParams.set("dateFrom", dateFrom);
    if (dateTo) queryParams.set("dateTo", dateTo);

    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const handleReset = () => {
    setSearchTerm("");
    setDateFrom("");
    setDateTo("");
    navigate(location.pathname);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-8 px-4"
    >
      <input
        type="text"
        placeholder="Rechercher un texte, une loi..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Recherche"
      />
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Date début"
      />
      <input
        type="date"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Date fin"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
        aria-label="Lancer la recherche"
      >
        Rechercher
      </button>
      <button
        type="button"
        onClick={handleReset}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
        aria-label="Réinitialiser la recherche"
      >
        Réinitialiser
      </button>
    </form>
  );
}

