
// src/hooks/useDashboard.js
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { dashboardAPI } from '../services/api';

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
      const data = await dashboardAPI.getDashboardData();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erreur chargement dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      await dashboardAPI.updateSettings(newSettings);
      setDashboardData(prev => ({
        ...prev,
        user: { ...prev.user, settings: newSettings }
      }));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await dashboardAPI.markNotificationAsRead(notificationId);
      setDashboardData(prev => ({
        ...prev,
        notifications: prev.notifications.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const removeFromFavorites = async (favoriteId) => {
    try {
      await dashboardAPI.removeFromFavorites(favoriteId);
      setDashboardData(prev => ({
        ...prev,
        favorites: prev.favorites.filter(fav => fav.id !== favoriteId)
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    dashboardData,
    loading,
    error,
    refreshData: loadDashboardData,
    updateSettings,
    markNotificationAsRead,
    removeFromFavorites
  };
};
