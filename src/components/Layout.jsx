// src/components/Layout.jsx
import React, { useState, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Navbar from "./Navbar";

import { categories } from "../data/categories";
import { FilterContext } from "../context/FilterContext";

function Layout() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Utilisation du contexte pour la recherche globale (optionnel)
  const { searchTerm, setSearchTerm } = useContext(FilterContext);

  // Gestion du clic sur une catégorie principale : toggle sélection
  const handleCategoryClick = (slug) => {
    setSelectedCategory((prev) => (prev === slug ? null : slug));
  };

  // Récupération des sous-catégories de la catégorie sélectionnée
  const sousCategories =
    selectedCategory &&
    categories.find((cat) => cat.slug === selectedCategory)?.sousCategories;

  return (
    <>
      {/* Barre de navigation principale */}
      <Navbar />

      {/* Fil d’Ariane simple */}
      <div className="bg-green-700 text-white px-4 py-2 flex items-center gap-2 mt-[64px] sticky top-[64px] z-40">
        <FaHome />
        <Link to="/" className="font-semibold text-sm hover:underline">
          Accueil
        </Link>
      </div>

      {/* Barre de recherche globale - retirée (tu peux la remettre si besoin) */}
      {/* 
      <div className="bg-white shadow z-30 px-4 py-3 sticky top-[96px]">
        <GeneralSearchBar query={searchTerm} setQuery={setSearchTerm} />
      </div> 
      */}

      {/* Barre des catégories principales */}
      <div className="bg-gray-100 px-4 py-2 sticky top-[96px] z-20 shadow-sm">
        <div className="flex space-x-4 overflow-x-hidden"> {/* overflow-x-hidden ici */}
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === cat.slug
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-green-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Barre des sous-catégories si une catégorie est sélectionnée */}
      {selectedCategory && sousCategories?.length > 0 && (
        <div className="bg-gray-50 px-4 py-2 sticky top-[144px] z-10 shadow-inner">
          <SousCategoriesBar
            sousCategories={sousCategories}
            categorySlug={selectedCategory}
          />
        </div>
      )}

      {/* Zone principale de contenu */}
      <main className="px-4 pt-8 pb-8 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
