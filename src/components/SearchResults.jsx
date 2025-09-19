// src/pages/Search/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchAPI } from './../services/api';
import TextCard from './TexteCard'
import LoadingSpinner from './LoadingSpinner';

function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    category: '',
    dateFrom: '',
    dateTo: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query, filters, pagination.page]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = {
        query,
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      };
      
      const response = await searchAPI.search(params);
      setResults(response.data.data);
      setPagination(prev => ({
        ...prev,
        total: response.data.pagination.total,
      }));
    } catch (error) {
      console.error('Erreur recherche:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderResultCard = (item, type) => {
    switch (type) {
      case 'text':
        return <TextCard key={item.id} text={item} />;
      case 'journal':
        return <JournalCard key={item.id} publication={item} />;
      default:
        return <TextCard key={item.id} text={item} />;
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex gap-6">
        {/* Filtres */}
        <div className="w-1/4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-4">Filtres</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Type</label>
              <select 
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="all">Tout</option>
                <option value="texts">Textes de loi</option>
                <option value="journal">Journal Officiel</option>
                <option value="jurisprudence">Jurisprudence</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Catégorie</label>
              <select 
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Toutes les catégories</option>
                <option value="civil">Droit civil</option>
                <option value="penal">Droit pénal</option>
                <option value="commercial">Droit commercial</option>
                <option value="administratif">Droit administratif</option>
              </select>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="w-3/4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">
              Résultats pour "{query}"
            </h2>
            <p className="text-gray-600">
              {pagination.total} résultat{pagination.total > 1 ? 's' : ''} trouvé{pagination.total > 1 ? 's' : ''}
            </p>
          </div>

          <div className="space-y-4">
            {results.map((item) => renderResultCard(item, item._index || 'text'))}
          </div>

          {/* Pagination */}
          {pagination.total > pagination.limit && (
            <div className="mt-6 flex justify-center">
              <nav className="flex gap-2">
                {Array.from({ length: Math.ceil(pagination.total / pagination.limit) }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                    className={`px-3 py-1 rounded ${
                      pagination.page === i + 1 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;