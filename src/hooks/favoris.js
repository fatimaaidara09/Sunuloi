// src/hooks/useFavorites.js
import { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    sortBy: 'dateAdded',
    sortOrder: 'desc'
  });

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getFavorites();
      setFavorites(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (document) => {
    try {
      const newFavorite = await dashboardAPI.addToFavorites(document);
      setFavorites(prev => [newFavorite, ...prev]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const removeFromFavorites = async (favoriteId) => {
    try {
      await dashboardAPI.removeFromFavorites(favoriteId);
      setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getFilteredFavorites = () => {
    let filtered = [...favorites];

    // Filtrage par type
    if (filters.type) {
      filtered = filtered.filter(fav => fav.type === filters.type);
    }

    // Filtrage par catégorie
    if (filters.category) {
      filtered = filtered.filter(fav => fav.category === filters.category);
    }

    // Tri
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy];
      const bValue = b[filters.sortBy];
      
      if (filters.sortOrder === 'desc') {
        return new Date(bValue) - new Date(aValue);
      } else {
        return new Date(aValue) - new Date(bValue);
      }
    });

    return filtered;
  };

  const getFavoritesByType = () => {
    const byType = {};
    favorites.forEach(fav => {
      if (!byType[fav.type]) {
        byType[fav.type] = [];
      }
      byType[fav.type].push(fav);
    });
    return byType;
  };

  return {
    favorites,
    loading,
    error,
    filters,
    filteredFavorites: getFilteredFavorites(),
    favoritesByType: getFavoritesByType(),
    addToFavorites,
    removeFromFavorites,
    updateFilters,
    refreshFavorites: loadFavorites
  };
};
