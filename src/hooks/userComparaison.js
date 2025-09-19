// src/hooks/useComparisons.js
import { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

export const useComparisons = () => {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadComparisons();
  }, []);

  const loadComparisons = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getComparisons();
      setComparisons(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addComparison = (newComparison) => {
    setComparisons(prev => [newComparison, ...prev]);
  };

  const updateComparison = (comparisonId, updates) => {
    setComparisons(prev =>
      prev.map(comparison =>
        comparison.id === comparisonId
          ? { ...comparison, ...updates }
          : comparison
      )
    );
  };

  const deleteComparison = async (comparisonId) => {
    try {
      await dashboardAPI.deleteComparison(comparisonId);
      setComparisons(prev => prev.filter(c => c.id !== comparisonId));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    comparisons,
    loading,
    error,
    refreshComparisons: loadComparisons,
    addComparison,
    updateComparison,
    deleteComparison
  };
};
