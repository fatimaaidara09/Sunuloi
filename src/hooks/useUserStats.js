// src/hooks/useUserStats.js
import { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

export const useUserStats = (autoRefresh = true) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStats();
    
    if (autoRefresh) {
      const interval = setInterval(loadStats, 5 * 60 * 1000); // Refresh toutes les 5min
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getStats();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStat = (statType, value) => {
    setStats(prev => ({
      ...prev,
      [statType]: prev[statType] + value
    }));
  };

  return {
    stats,
    loading,
    error,
    refreshStats: loadStats,
    updateStat
  };
};