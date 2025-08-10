// src/components/Search/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, X, Calendar, Tag, FileText, BookOpen, 
  Gavel, Building, ChevronDown, ChevronUp, History, Bookmark,
  Download, Share2, Clock
} from 'lucide-react';

const SearchPage = ({ 
  searchTerm, 
  setSearchTerm, 
  onSearch, 
  darkMode,
  searchResults = [],
  loading = false,
  totalResults = 0
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    dateFrom: '',
    dateTo: '',
    status: '',
    source: '',
    language: 'fr'
  });

  const [sortBy, setSortBy] = useState('relevance');
  const [searchSuggestions] = useState([
    'Code de la famille',
    'Loi sur la protection des données',
    'Code du travail',
    'Droit foncier',
    'Procédure civile',
    'Code pénal',
    'Loi électorale',
    'Statut de la fonction publique'
  ]);

  const categories = [
    { value: 'civil', label: 'Droit civil', icon: FileText },
    { value: 'penal', label: 'Droit pénal', icon: Gavel },
    { value: 'travail', label: 'Droit du travail', icon: Building },
    { value: 'commercial', label: 'Droit commercial', icon: Building },
    { value: 'administratif', label: 'Droit administratif', icon: Building },
    { value: 'numerique', label: 'Droit numérique', icon: FileText },
    { value: 'foncier', label: 'Droit foncier', icon: FileText },
    { value: 'fiscal', label: 'Droit fiscal', icon: FileText },
    { value: 'environnement', label: 'Droit de l\'environnement', icon: FileText },
    { value: 'sante', label: 'Droit de la santé', icon: FileText }
  ];

  const textTypes = [
    { value: 'code', label: 'Code', icon: BookOpen },
    { value: 'loi', label: 'Loi', icon: Gavel },
    { value: 'decret', label: 'Décret', icon: FileText },
    { value: 'arrete', label: 'Arrêté', icon: FileText },
    { value: 'circulaire', label: 'Circulaire', icon: FileText },
    { value: 'jurisprudence', label: 'Jurisprudence', icon: Gavel }
  ];

  const statusOptions = [
    { value: 'en_vigueur', label: 'En vigueur' },
    { value: 'abroge', label: 'Abrogé' },
    { value: 'suspendu', label: 'Suspendu' },
    { value: 'projet', label: 'Projet' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Pertinence' },
    { value: 'date_desc', label: 'Plus récent' },
    { value: 'date_asc', label: 'Plus ancien' },
    { value: 'title_asc', label: 'Titre A-Z' },
    { value: 'views_desc', label: 'Plus consulté' }
  ];

  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      performSearch();
    }
  };

  const performSearch = () => {
    // Ajouter aux recherches récentes
    const newRecentSearches = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    
    // Effectuer la recherche
    onSearch && onSearch({
      term: searchTerm,
      filters,
      sortBy
    });
    
    setShowSuggestions(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      type: '',
      dateFrom: '',
      dateTo: '',
      status: '',
      source: '',
      language: 'fr'
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value !== 'fr');

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setTimeout(performSearch, 100);
  };

  const saveCurrentSearch = () => {
    if (searchTerm.trim()) {
      const searchConfig = {
        id: Date.now(),
        term: searchTerm,
        filters: { ...filters },
        timestamp: new Date().toISOString()
      };
      setSavedSearches(prev => [searchConfig, ...prev.slice(0, 4)]);
    }
  };

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase()) && 
    suggestion.toLowerCase() !== searchTerm.toLowerCase()
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Barre de recherche principale */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg border p-6 mb-6`}>
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          {/* Zone de recherche */}
          <div className="relative">
            <div className="flex">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                  placeholder="Rechercher dans les textes juridiques (ex: Code de la famille, article 123...)"
                  className={`w-full pl-12 pr-4 py-4 text-lg border-2 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                
                {/* Suggestions de recherche */}
                {showSuggestions && (searchTerm.length > 0) && (
                  <div className={`absolute top-full left-0 right-0 mt-1 ${
                    darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
                  } border rounded-lg shadow-xl z-30 max-h-64 overflow-y-auto`}>
                    {filteredSuggestions.length > 0 && (
                      <div className="p-2">
                        <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Suggestions
                        </p>
                        {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center`}
                          >
                            <Search className="h-4 w-4 mr-2 text-gray-400" />
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {recentSearches.length > 0 && (
                      <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                        <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Recherches récentes
                        </p>
                        {recentSearches.map((recent, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSuggestionClick(recent)}
                            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center`}
                          >
                            <History className="h-4 w-4 mr-2 text-gray-400" />
                            {recent}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium rounded-r-lg transition-colors flex items-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Rechercher
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Boutons d'action rapide */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                showFilters 
                  ? 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900/20 dark:border-green-600 dark:text-green-300'
                  : darkMode 
                    ? 'border-gray-600 hover:bg-gray-700' 
                    : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtres avancés
              {hasActiveFilters && (
                <span className="ml-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {Object.values(filters).filter(v => v && v !== 'fr').length}
                </span>
              )}
              {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </button>

            <button
              type="button"
              onClick={saveCurrentSearch}
              className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                darkMode 
                  ? 'border-gray-600 hover:bg-gray-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Sauvegarder
            </button>

            <div className="flex items-center space-x-2">
              <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Trier par:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-2 border rounded-lg text-sm ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>

        {/* Filtres avancés */}
        {showFilters && (
          <div className={`mt-6 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg space-y-4`}>
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Filtres avancés</h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center text-sm text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4 mr-1" />
                  Effacer les filtres
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium mb-2">Catégorie</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Toutes les catégories</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Type de texte */}
              <div>
                <label className="block text-sm font-medium mb-2">Type de texte</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Tous les types</option>
                  {textTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Statut */}
              <div>
                <label className="block text-sm font-medium mb-2">Statut</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Tous les statuts</option>
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>

              {/* Date de début */}
              <div>
                <label className="block text-sm font-medium mb-2">À partir du</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              {/* Date de fin */}
              <div>
                <label className="block text-sm font-medium mb-2">Jusqu'au</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              {/* Langue */}
              <div>
                <label className="block text-sm font-medium mb-2">Langue</label>
                <select
                  value={filters.language}
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="fr">Français</option>
                  <option value="wo">Wolof</option>
                  <option value="en">Anglais</option>
                  <option value="all">Toutes les langues</option>
                </select>
              </div>
            </div>

            {/* Tags de filtres actifs */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-300 dark:border-gray-600">
                {Object.entries(filters).map(([key, value]) => {
                  if (!value || value === 'fr') return null;
                  
                  let label = value;
                  if (key === 'category') {
                    const cat = categories.find(c => c.value === value);
                    label = cat ? cat.label : value;
                  } else if (key === 'type') {
                    const type = textTypes.find(t => t.value === value);
                    label = type ? type.label : value;
                  } else if (key === 'status') {
                    const status = statusOptions.find(s => s.value === value);
                    label = status ? status.label : value;
                  }
                  
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    >
                      {label}
                      <button
                        onClick={() => handleFilterChange(key, '')}
                        className="ml-2 hover:text-green-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Résultats de recherche summary */}
        {totalResults > 0 && (
          <div className={`mt-4 flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg`}>
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              <span className="text-sm">
                <strong>{totalResults.toLocaleString()}</strong> texte{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
                {searchTerm && <span> pour "<em>{searchTerm}</em>"</span>}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded">
                <Download className="h-4 w-4 mr-1" />
                Exporter
              </button>
              <button className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded">
                <Share2 className="h-4 w-4 mr-1" />
                Partager
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Fermer les suggestions en cliquant ailleurs */}
      {showSuggestions && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setShowSuggestions(false)}
        ></div>
      )}
    </div>
  );
};

export default SearchPage;