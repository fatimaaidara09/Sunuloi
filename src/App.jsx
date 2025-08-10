import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import Layout from "./components/Layout";
import Categories from "./pages/Categories";
import DetailJournal from "./pages/DetailJournal";
import DetailTexte from "./pages/DetailTexte";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";
import SearchResults from "./components/SearchResults";
import SearchPage from "./pages/SearchPage";
import Favorites from "./pages/Favorites";
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';

export default function App() {
  return (
    <Router>
      <FilterProvider>
        <Routes>
          {/* Toutes les pages avec Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/journal/:id" element={<DetailJournal />} />
            <Route path="/texte/:id" element={<DetailTexte />} />
            <Route path="/categories/:categorySlug" element={<CategoryPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>

          {/* Route indépendante, si vraiment nécessaire */}
          {/* <Route path="/search" element={<SearchPage />} /> */}
        </Routes>
      </FilterProvider>
    </Router>
  );
}
