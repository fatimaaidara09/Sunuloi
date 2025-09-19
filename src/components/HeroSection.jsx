// src/components/HeroSection.jsx
import React, { useState, useEffect } from "react";
import { Search, Filter, TrendingUp, Users, BookOpen, Scale } from "lucide-react";

const HeroSection = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contentType, setContentType] = useState("all");
  const [fieldType, setFieldType] = useState("all");
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [lawNumber, setLawNumber] = useState("");

  const searchSuggestionsData = [
    "Code du travail",
    "Constitution du Sénégal",
    "Droit de la famille",
    "Code pénal",
    "Droit commercial",
    "Code civil",
    "Droit fiscal",
    "Code de l'environnement"
  ];

  const quickStats = [
    { 
      label: "Textes législatifs", 
      value: "2,847", 
      icon: BookOpen, 
      color: "text-green-600",
      bg: "bg-green-100" 
    },
    { 
      label: "Jurisprudences", 
      value: "1,523", 
      icon: Scale, 
      color: "text-yellow-600",
      bg: "bg-yellow-100" 
    },
    { 
      label: "Utilisateurs actifs", 
      value: "15,420", 
      icon: Users, 
      color: "text-green-700",
      bg: "bg-green-50" 
    },
    { 
      label: "Recherches/jour", 
      value: "3,250", 
      icon: TrendingUp, 
      color: "text-yellow-700",
      bg: "bg-yellow-50" 
    }
  ];

  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = searchSuggestionsData.filter(suggestion => 
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchSuggestions(filtered.slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = {
      query: searchQuery,
      contentType,
      fieldType,
      dateFrom,
      dateTo,
      lawNumber
    };
    
    if (onSearch) {
      onSearch(searchParams);
    }
    
    console.log("Recherche:", searchParams);
  };

  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchSuggestions([]);
  };

  return (
    <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 py-20 overflow-hidden">
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-yellow-400 opacity-15 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-green-300 opacity-10 rounded-full animate-bounce delay-500"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto text-center px-4">
        {/* Titre principal */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Bienvenue sur{" "}
          <span className="text-yellow-300 drop-shadow-lg">SunuLoi</span>
        </h1>
        
        <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Recherchez dans l'ensemble des textes législatifs, réglementaires et jurisprudentiels 
          du Sénégal avec une technologie moderne et intuitive.
        </p>

        {/* Barre de recherche principale */}
        <form onSubmit={handleSearch} className="bg-white p-6 rounded-2xl shadow-2xl max-w-5xl mx-auto mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Sélecteurs */}
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="border-2 border-gray-200 rounded-lg p-3 text-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all min-w-[180px]"
            >
              <option value="all">📁 Tous les contenus</option>
              <option value="codes">📖 Codes</option>
              <option value="lois">⚖️ Lois</option>
              <option value="jurisprudence">🏛️ Jurisprudence</option>
              <option value="constitution">📜 Constitution</option>
            </select>

            <select
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
              className="border-2 border-gray-200 rounded-lg p-3 text-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all min-w-[160px]"
            >
              <option value="all">🔍 Tous les champs</option>
              <option value="titre">📝 Titre</option>
              <option value="texte">📄 Texte</option>
              <option value="auteur">👤 Auteur</option>
              <option value="numero">🔢 Numéro</option>
            </select>

            {/* Champ de recherche principal */}
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des lois, codes, jurisprudences..."
                className="w-full py-4 pl-12 pr-32 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 h-5 w-5" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium shadow-lg"
              >
                Rechercher
              </button>
            </div>

            {/* Bouton recherche avancée */}
            <button
              type="button"
              onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
              className={`flex items-center px-4 py-3 font-medium transition-all rounded-lg ${
                isAdvancedSearch 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-green-600 hover:text-green-700 hover:bg-green-50'
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Avancé
            </button>
          </div>

          {/* Suggestions de recherche */}
          {searchSuggestions.length > 0 && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2 font-medium">Suggestions :</p>
              <div className="flex flex-wrap gap-2">
                {searchSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectSuggestion(suggestion)}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm hover:border-green-500 hover:text-green-600 transition-all hover:shadow-md"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recherche avancée */}
          {isAdvancedSearch && (
            <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-green-50 rounded-lg border border-green-100">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-green-600" />
                Recherche Avancée
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📅 Période de publication
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="date" 
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg p-2 focus:border-green-500 focus:ring-1 focus:ring-green-200" 
                      placeholder="Du"
                    />
                    <input 
                      type="date" 
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg p-2 focus:border-green-500 focus:ring-1 focus:ring-green-200" 
                      placeholder="Au"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🔢 Numéro de loi/décret
                  </label>
                  <input 
                    type="text" 
                    value={lawNumber}
                    onChange={(e) => setLawNumber(e.target.value)}
                    placeholder="Ex: 2024-15" 
                    className="w-full border border-gray-300 rounded-lg p-2 focus:border-green-500 focus:ring-1 focus:ring-green-200" 
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => {
                      setDateFrom("");
                      setDateTo("");
                      setLawNumber("");
                    }}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    ↻ Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickStats.map((stat, idx) => (
            <div key={idx} className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-30 transition-all group">
              <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.bg} rounded-lg mb-3 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-green-100 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call-to-action secondaire */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="/aide" 
            className="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg font-medium transition-all backdrop-blur-sm"
          >
            📘 Guide d'utilisation
          </a>
          <a 
            href="/page-ia" 
            className="inline-flex items-center px-6 py-3 border-2 border-white border-opacity-30 hover:border-opacity-50 text-white rounded-lg font-medium transition-all backdrop-blur-sm"
          > 
            🔌 Assistant IA
          </a>
            <a 
            href="/glossaire" 
            className="inline-flex items-center px-6 py-3 border-2 border-white border-opacity-30 hover:border-opacity-50 text-white rounded-lg font-medium transition-all backdrop-blur-sm"
          >
             Glossaire
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;