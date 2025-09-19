// src/hooks/useSearchHistory.js
import { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    period: '30',
    category: '',
    query: ''
  });

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getSearchHistory();
      setSearchHistory(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = (searchData) => {
    setSearchHistory(prev => [searchData, ...prev]);
  };

  const clearHistory = async () => {
    try {
      await dashboardAPI.clearSearchHistory();
      setSearchHistory([]);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeFromHistory = async (searchId) => {
    try {
      await dashboardAPI.removeFromSearchHistory(searchId);
      setSearchHistory(prev => prev.filter(search => search.id !== searchId));
    } catch (err) {
      setError(err.message);
    }
  };

  const getFilteredHistory = () => {
    let filtered = [...searchHistory];

    // Filtrage par période
    if (filters.period !== 'all') {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(filters.period));
      filtered = filtered.filter(search => 
        new Date(search.timestamp) >= daysAgo
      );
    }

    // Filtrage par catégorie
    if (filters.category) {
      filtered = filtered.filter(search => search.category === filters.category);
    }

    // Filtrage par terme de recherche
    if (filters.query) {
      filtered = filtered.filter(search => 
        search.query.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    return filtered;
  };

  const getPopularSearches = () => {
    const searchCounts = {};
    searchHistory.forEach(search => {
      searchCounts[search.query] = (searchCounts[search.query] || 0) + 1;
    });

    return Object.entries(searchCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));
  };

  return {
    searchHistory,
    loading,
    error,
    filters,
    filteredHistory: getFilteredHistory(),
    popularSearches: getPopularSearches(),
    addToHistory,
    clearHistory,
    removeFromHistory,
    updateFilters: setFilters,
    refreshHistory: loadSearchHistory
  };
};
