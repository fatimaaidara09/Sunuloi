import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FilterProvider } from "./context/FilterContext";
import Layout from "./components/Layout";
import Categories from "./pages/Categories";
import DetailJournal from "./pages/DetailJournal";
import DetailTexte from "./pages/DetailTexte";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";
import SearchResults from "./components/SearchResults";
import SearchPage from "./pages/SearchPage";
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import AideFAQPage from "./pages/Aide";
import UserDashboard from "./pages/UserDashboard";
import Codes from "./pages/Code";
import Jurisprudence from "./pages/Jurisprudence";
import Constitution from "./pages/Constitution";
import JournalOfficielPage from "./pages/JournalOfficiel";
import Convention from "./pages/Convention";
import AccessibilityPage from "./pages/Accessibilite";
import PageIa from "./pages/PageIa";
import Glossaire from "./pages/Glossaire";
import RecherchePage from "./components/RechercheAvancee";
import AdminDashboard from "./components/admin/Dashboarddmin";
import ErrorBoundary from './components/ErrorBoundary';
import NotificationProvider from './context/NotificationContext';
import AuthProvider from './context/AuthContext';
import AccessibilityProvider from './context/AccessibilityContext';


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

export default function App() {
  return (
    <ErrorBoundary>
     
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <AccessibilityProvider>
    
        <NotificationProvider>
        {/* Injection du CSS global d’accessibilité */}
        <style>{AccessibilityCSS}</style>

        <Router>
          <FilterProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/journal/:id" element={<DetailJournal />} />
                <Route path="/texte/:id" element={<DetailTexte />} />
                <Route path="/categories/:categorySlug" element={<CategoryPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/inscription" element={<Inscription />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/aide" element={<AideFAQPage />} />
                <Route path="/codes" element={<Codes />} />
                <Route path="/jurisprudence" element={<Jurisprudence />} />
                <Route path="/constitution" element={<Constitution />} />
                <Route path="/journal-officiel" element={<JournalOfficielPage />} />
                <Route path="/convention" element={<Convention />} />
                <Route path="/accessibilite" element={<AccessibilityPage />} />
                <Route path="/page-ia" element={<PageIa />} />
                <Route path="/glossaire" element={<Glossaire />} />
                <Route path="/recherche-avancee" element={<RecherchePage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>

              {/* route SearchPage isolée */}
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </FilterProvider>
        </Router>
        </NotificationProvider>
        
      
    </AccessibilityProvider>
    </AuthProvider>
    </QueryClientProvider>
    </ErrorBoundary>
  );
}
