import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchResults = ({ results }) => {
  const { t } = useTranslation();
  const location = useLocation();

  // Extraire les params de recherche (optionnel, pour afficher ce qui a été cherché)
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q") || "";
  const dateFrom = queryParams.get("dateFrom") || "";
  const dateTo = queryParams.get("dateTo") || "";
  const docType = queryParams.get("docType") || "";

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">{t("results")}</h2>

      {/* Afficher la recherche courante */}
      <div className="mb-4 text-gray-600 text-sm space-y-1">
        <p>
          <strong>{t("search")}:</strong> {q || "-"}
        </p>
        <p>
          <strong>{t("startDate")}:</strong> {dateFrom || "-"}
        </p>
        <p>
          <strong>{t("endDate")}:</strong> {dateTo || "-"}
        </p>
        <p>
          <strong>{t("type")}:</strong>{" "}
          {docType
            ? t(
                docType === "loi"
                  ? "law"
                  : docType === "decret"
                  ? "decree"
                  : docType === "arret"
                  ? "order"
                  : docType === "circulaire"
                  ? "circular"
                  : "all"
              )
            : t("all")}
        </p>
      </div>

      {/* Résultats */}
      {results.length === 0 ? (
        <p className="text-center text-gray-500">{t("noResults")}</p>
      ) : (
        <ul className="space-y-3">
          {results.map((item) => (
            <li
              key={item.id}
              className="border rounded p-3 hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.summary}</p>
              <p className="text-xs text-gray-500 mt-1">
                {item.date} - {t(item.type)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
