// src/pages/DetailJournal.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { journals } from "../data/journals";
import jsPDF from "jspdf";
import JournalSearchBar from "../components/JournalSearchBar";  // Import du nouveau composant

export default function DetailJournal() {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);

  useEffect(() => {
    const found = journals.find((j) => String(j.id) === id);
    setJournal(found || null);
  }, [id]);

  if (!journal) {
    return <p className="p-6 text-center">Journal non trouvé.</p>;
  }

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(journal.title, 10, 20);
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(journal.content, 180);
    doc.text(lines, 10, 30);
    doc.save(`${journal.title}.pdf`);
  };

  return (
    <div className="pt-[var(--navbar-total-offset)] px-6 max-w-screen-md mx-auto space-y-6">
      {/* Barre de recherche indépendante pour la page journal */}
      <JournalSearchBar />

      <h1 className="text-3xl font-bold text-green-700">{journal.title}</h1>
      <p className="text-sm text-gray-500">{journal.date}</p>
      <div className="prose prose-green">
        {/* Si ton contenu est en HTML, tu peux utiliser dangerouslySetInnerHTML */}
        <p>{journal.content}</p>
      </div>
      <button
        onClick={downloadPDF}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
      >
        Télécharger en PDF
      </button>
    </div>
  );
}

