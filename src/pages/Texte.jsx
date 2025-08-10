// src/pages/Textes.jsx
import React, { useState, useEffect } from "react";
import TexteCard from "../components/TexteCard";
import TexteSearch from "../components/TexteSearch";
import TexteFilters from "../components/TexteFilters";

const Textes = () => {
  const [textes, setTextes] = useState([]);
  const [filteredTextes, setFilteredTextes] = useState([]);

  useEffect(() => {
    // Simulation de données juridiques (à remplacer par un appel API plus tard)
    const dummyTextes = [
      {
        id: 1,
        titre: "Loi sur la Cybercriminalité",
        resume: "Texte de loi encadrant les infractions liées à l'utilisation des technologies...",
        domaine: "Droit pénal",
        type: "Loi",
        date: "2022-01-15",
        fichier: "/pdfs/cybercriminalite.pdf"
      },
      {
        id: 2,
        titre: "Décret sur la protection des données personnelles",
        resume: "Règlement concernant les traitements de données personnelles au Sénégal...",
        domaine: "Droit civil",
        type: "Décret",
        date: "2023-06-10",
        fichier: "/pdfs/donnees.pdf"
      }
    ];

    setTextes(dummyTextes);
    setFilteredTextes(dummyTextes);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Textes Juridiques</h1>

      <TexteSearch textes={textes} setFilteredTextes={setFilteredTextes} />
      <TexteFilters textes={textes} setFilteredTextes={setFilteredTextes} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredTextes.map((texte) => (
          <TexteCard key={texte.id} texte={texte} />
        ))}
      </div>
    </div>
  );
};

export default Textes;
