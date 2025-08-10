// src/pages/TexteList.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { textes } from "../data/textes";
import SearchBar from "../components/SearchBar";

export default function TexteList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const searchTerm = params.get("q") || "";
  const dateFrom = params.get("dateFrom") || "";
  const dateTo = params.get("dateTo") || "";
  const docType = params.get("type") || "";
  const ministry = params.get("ministry") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTextes = textes.filter((t) => {
    const matchesSearch =
      (t.title + t.summary + t.content).toLowerCase().includes(searchTerm.toLowerCase());
    const dateOk =
      (!dateFrom || t.date >= dateFrom) &&
      (!dateTo || t.date <= dateTo);
    const typeOk = !docType || t.type === docType;
    const ministryOk = !ministry || t.ministere === ministry;

    return matchesSearch && dateOk && typeOk && ministryOk;
  });

  const totalPages = Math.ceil(filteredTextes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTextes = filteredTextes.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateFrom, dateTo, docType, ministry]);

  return (
    <div className="max-w-screen-md mx-auto p-6 space-y-6">
      <SearchBar />

      <h1 className="text-3xl font-bold text-green-700 mb-4">Liste des textes</h1>

      {currentTextes.length === 0 ? (
        <p>Aucun texte trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {currentTextes.map((t) => (
            <li key={t.id} className="border-l-4 border-green-600 pl-4">
              <h2 className="text-xl font-semibold text-green-800">{t.title}</h2>
              <p className="text-sm text-gray-600">
                Publié le {t.date} — Type : {t.type} — Ministère : {t.ministere}
              </p>
              <p>{t.summary}</p>
              <Link
                to={`/texte/${t.id}`}
                className="text-green-700 hover:underline mt-1 inline-block"
              >
                Voir plus
              </Link>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-green-700 text-white rounded disabled:opacity-50"
          >
            Précédent
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-green-700 text-white rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
