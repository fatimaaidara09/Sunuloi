import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { apiService } from '../services/api';

export const useDashboard = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getDashboardData();
      setDashboardData(data);
    } catch (err) {
      console.error('Dashboard data loading failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const response = await apiService.updateSettings(newSettings);
      setDashboardData(prev => ({
        ...prev,
        user: { ...prev.user, settings: newSettings }
      }));
      return { success: true, data: response };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await apiService.markNotificationAsRead(notificationId);
      setDashboardData(prev => ({
        ...prev,
        notifications: prev.notifications?.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        ) || []
      }));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const addToFavorites = async (documentId) => {
    try {
      const response = await apiService.addToFavorites(documentId);
      setDashboardData(prev => ({
        ...prev,
        favorites: [response.data, ...(prev.favorites || [])]
      }));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const removeFromFavorites = async (favoriteId) => {
    try {
      await apiService.removeFromFavorites(favoriteId);
      setDashboardData(prev => ({
        ...prev,
        favorites: prev.favorites?.filter(fav => fav.id !== favoriteId) || []
      }));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  return {
    dashboardData,
    loading,
    error,
    refreshData: loadDashboardData,
    updateSettings,
    markNotificationAsRead,
    addToFavorites,
    removeFromFavorites
  };
};

// Hook pour les statistiques
export const useUserStats = (autoRefresh = true) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStats();
    
    if (autoRefresh) {
      const interval = setInterval(loadStats, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await apiService.getStats();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, refreshStats: loadStats };
};

// Hook pour les favoris
export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await apiService.getFavorites();
      setFavorites(data.data || []);
      setError(null);
    } catch (err) {
      console.error('Favorites loading failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (documentId) => {
    const existingFavorite = favorites.find(fav => fav.documentId === documentId);
    
    try {
      if (existingFavorite) {
        await apiService.removeFromFavorites(existingFavorite.id);
        setFavorites(prev => prev.filter(fav => fav.id !== existingFavorite.id));
        return { action: 'removed', success: true };
      } else {
        const response = await apiService.addToFavorites(documentId);
        setFavorites(prev => [response.data, ...prev]);
        return { action: 'added', success: true };
      }
    } catch (err) {
      console.error('Toggle favorite failed:', err);
      return { success: false, error: err.message };
    }
  };

  const isFavorite = (documentId) => {
    return favorites.some(fav => fav.documentId === documentId);
  };

  return {
    favorites,
    loading,
    error,
    toggleFavorite,
    isFavorite,
    refreshFavorites: loadFavorites
  };
};
