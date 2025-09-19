
// App.js - Configuration principale de l'application SunuLoi
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Import des pages
import SunuLoiHome from './pages/SunuLoiHome';
import DocumentPage from './pages/DocumentPage';
import SearchResultsPage from './pages/SearchResultsPage';
import CodesPage from './pages/CodesPage';
import JurisprudencePage from './pages/JurisprudencePage';
import JournalOfficielPage from './pages/JournalOfficielPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

// Import des composants globaux
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import NotificationProvider from './contexts/NotificationContext';
import AuthProvider from './contexts/AuthContext';
import AccessibilityProvider from './contexts/AccessibilityContext';

// Configuration de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AccessibilityProvider>
            <NotificationProvider>
              <Router>
                <div className="App">
                  <Routes>
                    {/* Page d'accueil */}
                    <Route path="/" element={<SunuLoiHome />} />
                    
                    {/* Recherche */}
                    <Route path="/search" element={<SearchResultsPage />} />
                    
                    {/* Documents */}
                    <Route path="/document/:id" element={<DocumentPage />} />
                    
                    {/* Collections */}
                    <Route path="/codes" element={<CodesPage />} />
                    <Route path="/codes/:codeId" element={<DocumentPage />} />
                    <Route path="/jurisprudence" element={<JurisprudencePage />} />
                    <Route path="/jurisprudence/:id" element={<DocumentPage />} />
                    <Route path="/journal-officiel" element={<JournalOfficielPage />} />
                    <Route path="/journal-officiel/:id" element={<DocumentPage />} />
                    
                    {/* Utilisateur */}
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    
                    {/* Pages 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </div>
              </Router>
            </NotificationProvider>
          </AccessibilityProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

// ===== CONTEXTS =====

// contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('sunuloi_token');
    if (token) {
      // Valider le token et récupérer les infos utilisateur
      validateToken(token)
        .then(userData => setUser(userData))
        .catch(() => localStorage.removeItem('sunuloi_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('sunuloi_token', data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Erreur de connexion' };
    }
  };

  const logout = () => {
    localStorage.removeItem('sunuloi_token');
    setUser(null);
  };

  const validateToken = async (token) => {
    const response = await fetch('/api/auth/validate', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!response.ok) {
      throw new Error('Token invalide');
    }
    
    return response.json();
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};