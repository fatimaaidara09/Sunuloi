import React, { useState, useEffect } from "react";

export default function JournalOfficiel({ documents, onSelectDocument }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filteredJournaux, setFilteredJournaux] = useState([]);

  useEffect(() => {
    let journaux = documents.filter(
      (doc) => doc.category.toLowerCase() === "journal officiel"
    );

    if (dateFrom) {
      journaux = journaux.filter((j) => new Date(j.date) >= new Date(dateFrom));
    }
    if (dateTo) {
      journaux = journaux.filter((j) => new Date(j.date) <= new Date(dateTo));
    }

    setFilteredJournaux(journaux);
  }, [documents, dateFrom, dateTo]);

  function handleDateSearch(e) {
    e.preventDefault();
    // Le filtre est déjà appliqué automatiquement via useEffect
  }

  return (
    <section className="bg-white p-6 rounded-md shadow border border-gray-300 flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-green-900">Journaux Officiels</h2>

      <form onSubmit={handleDateSearch} className="mb-4 space-y-2">
        <div>
          <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700">
            Date début
          </label>
          <input
            type="date"
            id="dateFrom"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700">
            Date fin
          </label>
          <input
            type="date"
            id="dateTo"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="mt-2 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Rechercher
        </button>
      </form>

      <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px]">
        {filteredJournaux.length === 0 && (
          <p className="text-gray-500 text-center">Aucun journal trouvé.</p>
        )}
        {filteredJournaux.map((jo) => (
          <button
            key={jo.id}
            onClick={() => onSelectDocument(jo)}
            className="text-left px-3 py-2 rounded hover:bg-green-100 focus:outline-none border border-transparent hover:border-green-300"
          >
            <div className="font-semibold text-green-700">{jo.title}</div>
            <div className="text-xs text-gray-500">{jo.date}</div>
          </button>
        ))}
      </div>
    </section>
  );
}