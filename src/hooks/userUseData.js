
// src/hooks/useUserData.js
import { useMemo } from 'react';
import { useDashboard } from './useDashboard';
import { useUserStats } from './useUserStats';
import { useNotifications } from './useNotifications';
import { useFavorites } from './useFavorites';

export const useUserData = () => {
  const dashboard = useDashboard();
  const stats = useUserStats();
  const notifications = useNotifications();
  const favorites = useFavorites();

  const combinedLoading = useMemo(() => {
    return dashboard.loading || stats.loading || notifications.loading || favorites.loading;
  }, [dashboard.loading, stats.loading, notifications.loading, favorites.loading]);

  const hasError = useMemo(() => {
    return dashboard.error || stats.error || notifications.error || favorites.error;
  }, [dashboard.error, stats.error, notifications.error, favorites.error]);

  const refreshAll = async () => {
    await Promise.all([
      dashboard.refreshData(),
      stats.refreshStats(),
      notifications.refreshNotifications(),
      favorites.refreshFavorites()
    ]);
  };

  return {
    dashboard,
    stats,
    notifications,
    favorites,
    loading: combinedLoading,
    hasError,
    refreshAll
  };
};
