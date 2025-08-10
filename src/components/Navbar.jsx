import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SenegalFlag from "../assets/image.png";

const categoriesData = [
  {
    title: "Droit national en vigueur",
    items: [
      "Codes",
      "Jurisprudence",
      "Constitutions",
      "Textes consolidés",
      "Circulaires et institutions",
      "Accords collectifs",
    ],
  },
  {
    title: "Publications officielles",
    items: [
      "Bulletin officiel",
      "Journal officiel",
      "Bulletins des conventions collectives",
      "Débats parlementaires",
      "Questions parlementaires écrites",
      "Documents administratifs",
    ],
  },
  {
    title: "Autour de la loi",
    items: [
      "Codification",
      "Législatif et réglementaire",
      "Autorités indépendantes",
      "Entreprise",
      "Guide de légistique SVA",
    ],
  },
  {
    title: "Droit et jurisprudence du Sénégal",
    items: [
      "Journal officiel",
      "Jurisprudence",
      "Directives",
      "Mesures de transposition",
    ],
  },
  {
    title: "Droit international",
    items: [
      "Jurisprudence CEDH",
      "Accords et traités internationaux",
      "Juridictions internationales",
    ],
  },
];

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const authMenuRef = useRef(null);

  const handleMenuClick = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  // Fermeture du menu utilisateur au clic à l'extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        authMenuOpen &&
        authMenuRef.current &&
        !authMenuRef.current.contains(event.target)
      ) {
        setAuthMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [authMenuOpen]);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 shadow-lg bg-white">
      {/* Ligne principale */}
      <div className="bg-green-900 text-white border-b-4 border-yellow-400">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4">
          
          {/* Logo + titre */}
          <div className="flex items-center gap-3">
            <img src={SenegalFlag} alt="République du Sénégal" className="h-12 w-auto" />
            <div>
              <div className="text-xl font-bold">SunuLoi</div>
              <div className="text-sm text-green-100">
                Le service public du droit sénégalais
              </div>
            </div>
          </div>

          {/* Menus */}
          <div className="flex items-center gap-4">
            {categoriesData.map((cat, idx) => (
              <div key={idx} className="relative">
                <button
                  onClick={() => handleMenuClick(idx)}
                  className={`px-4 py-5 font-medium transition ${
                    activeIndex === idx ? "bg-green-800" : "hover:bg-green-800"
                  }`}
                >
                  {cat.title}
                </button>
              </div>
            ))}

            {/* Icône utilisateur avec menu déroulant */}
            <div className="relative" ref={authMenuRef}>
              <button
                onClick={() => setAuthMenuOpen(!authMenuOpen)}
                aria-haspopup="true"
                aria-expanded={authMenuOpen}
                aria-label="Menu utilisateur"
                className="ml-4 text-white hover:text-yellow-300 focus:outline-none"
              >
                <FaUserCircle size={28} />
              </button>

              {authMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg text-green-900 border border-green-200 z-50">
                  <Link
                    to="/connexion"
                    className="block px-4 py-2 hover:bg-green-100"
                    onClick={() => setAuthMenuOpen(false)}
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/inscription"
                    className="block px-4 py-2 hover:bg-green-100"
                    onClick={() => setAuthMenuOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sous-menu affiché horizontalement */}
      {activeIndex !== null && (
        <div className="bg-green-50 border-b border-gray-300 py-2">
          <div className="max-w-screen-xl mx-auto flex gap-6 px-4 overflow-x-auto">
            {categoriesData[activeIndex].items.map((item, i) => (
              <Link
                key={i}
                to={`/categories/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-green-800 hover:text-yellow-500 whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
