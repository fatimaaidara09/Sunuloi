import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  token: null,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload, error: null };
    
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    
    case 'LOGOUT':
      return {
        ...initialState,
        loading: false
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const token = localStorage.getItem('sunuloi_token') || sessionStorage.getItem('sunuloi_token');
      
      if (!token) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      const response = await apiService.getProfile();
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.data,
          token
        }
      });
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('sunuloi_token');
      sessionStorage.removeItem('sunuloi_token');
      dispatch({ 
        type: 'AUTH_ERROR', 
        payload: 'Session expirée' 
      });
    }
  };

  const login = async (credentials, rememberMe = false) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await apiService.login(credentials);
      
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('sunuloi_token', response.token);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: response
      });

      return { success: true, user: response.user };
    } catch (error) {
      console.error('Login failed:', error);
      dispatch({ 
        type: 'AUTH_ERROR', 
        payload: error.message 
      });
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await apiService.register(userData);
      
      sessionStorage.setItem('sunuloi_token', response.token);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: response
      });

      return { success: true, user: response.user };
    } catch (error) {
      console.error('Registration failed:', error);
      dispatch({ 
        type: 'AUTH_ERROR', 
        payload: error.message 
      });
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      localStorage.removeItem('sunuloi_token');
      sessionStorage.removeItem('sunuloi_token');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const clearError = () => {
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      updateUser,
      clearError,
      refreshAuth: checkAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
