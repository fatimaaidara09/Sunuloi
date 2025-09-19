// src/hooks/useNotifications.js
import { useState, useEffect, useContext } from 'react';
import { dashboardAPI } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

export const useNotifications = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      loadNotifications();
      // Setup WebSocket ou polling pour les notifications en temps réel
      setupRealTimeNotifications();
    }
  }, [user]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getNotifications();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const setupRealTimeNotifications = () => {
    // Polling simple toutes les 30 secondes
    const interval = setInterval(async () => {
      try {
        const data = await dashboardAPI.getNotifications({ limit: 5 });
        if (data.unreadCount !== unreadCount) {
          setUnreadCount(data.unreadCount);
          // Mettre à jour seulement si nouvelles notifications
          const newNotifications = data.notifications.filter(n => 
            !notifications.find(existing => existing.id === n.id)
          );
          if (newNotifications.length > 0) {
            setNotifications(prev => [...newNotifications, ...prev]);
          }
        }
      } catch (err) {
        console.error('Erreur polling notifications:', err);
      }
    }, 30000);

    return () => clearInterval(interval);
  };

  const markAsRead = async (notificationId) => {
    try {
      await dashboardAPI.markNotificationAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      setError(err.message);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
      await Promise.all(unreadIds.map(id => dashboardAPI.markNotificationAsRead(id)));
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      setError(err.message);
    }
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
    if (!notification.read) {
      setUnreadCount(prev => prev + 1);
    }
  };

  return {
    notifications,
    loading,
    error,
    unreadCount,
    refreshNotifications: loadNotifications,
    markAsRead,
    markAllAsRead,
    addNotification
  };
};
