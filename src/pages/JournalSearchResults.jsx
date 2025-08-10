import React from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const JournalSearchResults = () => {
  const query = useQuery().get("q") || "";

  // Ici tu peux faire ta requête API pour chercher les journaux avec query

  return (
    <div>
      <h1>Résultats pour : "{query}"</h1>
      {/* Affiche tes résultats ici */}
    </div>
  );
};

export default JournalSearchResults;
