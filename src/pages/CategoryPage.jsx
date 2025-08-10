// src/pages/CategoryPage.jsx
import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { journals } from "../data/journals";
import { FilterContext } from "../context/FilterContext";

export default function CategoryPage() {
  const { searchTerm, setSearchTerm, dateFilter, setDateFilter } =
    useContext(FilterContext);
  const { categorySlug } = useParams();

  const categoryTitle = categorySlug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Filtre global + catégorie
  const filteredByText = journals.filter((j) =>
    (j.title + j.summary + j.content)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const filteredByCat = filteredByText.filter(
    (j) => j.category?.toLowerCase() === categoryTitle.toLowerCase()
  );
  const finalJournals = filteredByCat.filter((j) =>
    dateFilter ? j.date === dateFilter : true
  );

  // Pagination calculs
  const totalPages = Math.ceil(finalJournals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJournals = finalJournals.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="pt-[var(--navbar-total-offset)] px-4 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-green-700">
        Catégorie : {categoryTitle}
      </h1>

      {/* Recherche partagée */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Recherche..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 px-3 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Liste paginée */}
      {currentJournals.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentJournals.map((journal) => (
              <Link
                key={journal.id}
                to={`/journal/${journal.id}`}
                className="bg-white p-4 shadow rounded hover:bg-green-50 transition"
              >
                <h3 className="text-lg font-semibold">{journal.title}</h3>
                <p className="text-sm text-gray-500">{journal.date}</p>
                <p className="mt-2 text-sm text-gray-700">{journal.summary}</p>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-green-700 text-white rounded disabled:opacity-50"
              >
                Précédent
              </button>
              <span className="text-gray-700">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-green-700 text-white rounded disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">
          Aucun document trouvé pour cette catégorie.
        </p>
      )}
    </div>
  );
}

