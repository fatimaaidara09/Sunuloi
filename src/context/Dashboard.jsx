import React, { createContext, useContext, useReducer } from 'react';

const DashboardContext = createContext();

const initialState = {
  activeTab: 'overview',
  sidebarCollapsed: false,
  theme: 'light',
  notifications: {
    show: false,
    list: []
  },
  filters: {
    favorites: { type: '', category: '' },
    history: { period: '30', category: '' }
  },
  cache: {
    lastUpdated: null,
    data: null
  }
};

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    
    case 'SHOW_NOTIFICATIONS':
      return { 
        ...state, 
        notifications: { ...state.notifications, show: true } 
      };
    
    case 'HIDE_NOTIFICATIONS':
      return { 
        ...state, 
        notifications: { ...state.notifications, show: false } 
      };
    
    case 'UPDATE_NOTIFICATIONS':
      return {
        ...state,
        notifications: { ...state.notifications, list: action.payload }
      };
    
    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, [action.section]: action.payload }
      };
    
    case 'UPDATE_CACHE':
      return {
        ...state,
        cache: { lastUpdated: Date.now(), data: action.payload }
      };
    
    default:
      return state;
  }
};

export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const setActiveTab = (tab) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
    localStorage.setItem('dashboard-theme', theme);
  };

  const showNotifications = () => {
    dispatch({ type: 'SHOW_NOTIFICATIONS' });
  };

  const hideNotifications = () => {
    dispatch({ type: 'HIDE_NOTIFICATIONS' });
  };

  const updateNotifications = (notifications) => {
    dispatch({ type: 'UPDATE_NOTIFICATIONS', payload: notifications });
  };

  const updateFilters = (section, filters) => {
    dispatch({ type: 'UPDATE_FILTERS', section, payload: filters });
  };

  const updateCache = (data) => {
    dispatch({ type: 'UPDATE_CACHE', payload: data });
  };

  return (
    <DashboardContext.Provider value={{
      state,
      setActiveTab,
      toggleSidebar,
      setTheme,
      showNotifications,
      hideNotifications,
      updateNotifications,
      updateFilters,
      updateCache
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};