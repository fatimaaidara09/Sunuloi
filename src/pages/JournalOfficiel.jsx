// src/pages/JournalOfficielPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  FileText, Calendar, Filter, Search, Download, Eye, Share2, 
  Star, Bookmark, ChevronDown, SortAsc, SortDesc, Grid, List,
  Bell, TrendingUp, Clock, Tag, AlertCircle, CheckCircle
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const JournalOfficielPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteDocuments, setFavoriteDocuments] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 12;

  // Données mockées - à remplacer par des appels API
  const [journalData] = useState([
    {
      id: 1,
      date: "2024-09-10",
      titre: "Loi n° 2024-25 sur la transformation numérique",
      type: "Loi",
      status: "Nouveau",
      downloads: 1850,
      views: 4520,
      description: "Nouvelle réglementation sur la digitalisation des services publics au Sénégal",
      urgent: false,
      category: "Technologies",
      tags: ["Numérique", "Innovation", "Services publics"],
      fileSize: "2.3 MB"
    },
    {
      id: 2,
      date: "2024-09-08",
      titre: "Décret n° 2024-1847 relatif à la protection de l'environnement",
      type: "Décret",
      status: "Mis à jour",
      downloads: 1120,
      views: 2890,
      description: "Mesures renforcées pour la préservation de l'environnement et la lutte contre la pollution",
      urgent: true,
      category: "Environnement",
      tags: ["Environnement", "Pollution", "Développement durable"],
      fileSize: "1.8 MB"
    },
    {
      id: 3,
      date: "2024-09-05",
      titre: "Arrêt Cour Suprême n° 2024-156 - Droit du travail",
      type: "Jurisprudence",
      status: "",
      downloads: 890,
      views: 2140,
      description: "Décision importante concernant les droits des travailleurs et les conditions de travail",
      urgent: false,
      category: "Droit du travail",
      tags: ["Travail", "Droits sociaux", "Jurisprudence"],
      fileSize: "950 KB"
    },
    {
      id: 4,
      date: "2024-09-03",
      titre: "Ordonnance n° 2024-12 sur le commerce électronique",
      type: "Ordonnance",
      status: "Nouveau",
      downloads: 675,
      views: 1560,
      description: "Réglementation complète du commerce en ligne et des transactions électroniques",
      urgent: false,
      category: "Commerce",
      tags: ["E-commerce", "Numérique", "Réglementation"],
      fileSize: "1.2 MB"
    },
    {
      id: 5,
      date: "2024-09-01",
      titre: "Circulaire ministérielle n° 2024-089 - Fonction publique",
      type: "Circulaire",
      status: "",
      downloads: 445,
      views: 1020,
      description: "Instructions relatives aux nouvelles procédures administratives",
      urgent: false,
      category: "Administration",
      tags: ["Fonction publique", "Procédures", "Administration"],
      fileSize: "680 KB"
    },
    {
      id: 6,
      date: "2024-08-28",
      titre: "Loi n° 2024-24 de finances rectificative",
      type: "Loi",
      status: "Mis à jour",
      downloads: 2340,
      views: 5680,
      description: "Modifications budgétaires et nouvelles dispositions fiscales",
      urgent: true,
      category: "Finances",
      tags: ["Budget", "Fiscalité", "Économie"],
      fileSize: "3.1 MB"
    }
  ]);

  const documentTypes = [
    { value: '', label: 'Tous les types' },
    { value: 'Loi', label: 'Lois' },
    { value: 'Décret', label: 'Décrets' },
    { value: 'Ordonnance', label: 'Ordonnances' },
    { value: 'Jurisprudence', label: 'Jurisprudence' },
    { value: 'Circulaire', label: 'Circulaires' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date de publication' },
    { value: 'views', label: 'Nombre de vues' },
    { value: 'downloads', label: 'Téléchargements' },
    { value: 'titre', label: 'Titre alphabétique' }
  ];

  // Filtrage et tri des données
  const filteredData = journalData
    .filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDate = dateFilter === '' || item.date >= dateFilter;
      const matchesType = typeFilter === '' || item.type === typeFilter;
      
      return matchesSearch && matchesDate && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(b.date) - new Date(a.date);
          break;
        case 'views':
          comparison = b.views - a.views;
          break;
        case 'downloads':
          comparison = b.downloads - a.downloads;
          break;
        case 'titre':
          comparison = a.titre.localeCompare(b.titre);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? -comparison : comparison;
    });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const toggleFavorite = (docId) => {
    setFavoriteDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const getStatusBadge = (status, urgent = false) => {
    if (urgent) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">
          <AlertCircle className="h-3 w-3 mr-1" />
          Urgent
        </span>
      );
    }
    if (status === "Nouveau") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Nouveau
        </span>
      );
    }
    if (status === "Mis à jour") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <TrendingUp className="h-3 w-3 mr-1" />
          Mis à jour
        </span>
      );
    }
    return null;
  };

  const getTypeColor = (type) => {
    const colors = {
      'Loi': 'bg-green-100 text-green-800 border-green-200',
      'Décret': 'bg-blue-100 text-blue-800 border-blue-200',
      'Ordonnance': 'bg-purple-100 text-purple-800 border-purple-200',
      'Jurisprudence': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Circulaire': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDateFilter('');
    setTypeFilter('');
    setSortBy('date');
    setSortOrder('desc');
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl mr-6">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-green-800 mb-2">Journal Officiel du Sénégal</h1>
                  <p className="text-gray-600">Publications officielles et textes réglementaires</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{filteredData.length}</p>
                  <p className="text-gray-500 text-sm">Documents</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{documentTypes.length - 1}</p>
                  <p className="text-gray-500 text-sm">Types</p>
                </div>
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm">Mis à jour</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par titre, description ou mots-clés..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            {/* Bouton filtres mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filtres
              <ChevronDown className={`h-4 w-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filtres détaillés */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-6 pt-6 border-t border-gray-200`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Filtre par date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date depuis</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filtre par type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de document</label>
                <select
                  value={typeFilter}
                  onChange={(e) => {
                    setTypeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {documentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Tri */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trier par</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Ordre de tri */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ordre</label>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                >
                  {sortOrder === 'asc' ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />}
                  {sortOrder === 'asc' ? 'Croissant' : 'Décroissant'}
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-end space-x-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Réinitialiser
                </button>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'bg-white text-gray-600'} hover:bg-green-50 transition-colors`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'bg-white text-gray-600'} hover:bg-green-50 transition-colors`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Résultats */}
        {currentData.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucun document trouvé</h3>
            <p className="text-gray-600 mb-6">Modifiez vos critères de recherche pour afficher plus de résultats</p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            {/* En-tête des résultats */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                <span className="font-semibold">{filteredData.length}</span> document{filteredData.length > 1 ? 's' : ''} trouvé{filteredData.length > 1 ? 's' : ''}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Dernière mise à jour: il y a 2 heures
              </div>
            </div>

            {/* Affichage en grille */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentData.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getTypeColor(item.type)}`}>
                            {item.type}
                          </span>
                          {getStatusBadge(item.status, item.urgent)}
                        </div>
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className={`p-2 rounded-lg transition-all ${
                            favoriteDocuments.includes(item.id) 
                              ? 'text-yellow-500 bg-yellow-50' 
                              : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                          }`}
                        >
                          <Star className="h-4 w-4" fill={favoriteDocuments.includes(item.id) ? "currentColor" : "none"} />
                        </button>
                      </div>

                      {/* Contenu */}
                      <Link to={`/journal-officiel/${item.id}`} className="block group">
                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                          {item.titre}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {item.description}
                        </p>
                      </Link>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                            +{item.tags.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {formatNumber(item.views)}
                          </span>
                          <span className="flex items-center">
                            <Download className="h-3 w-3 mr-1" />
                            {formatNumber(item.downloads)}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Affichage en liste
              <div className="space-y-4 mb-8">
                {currentData.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getTypeColor(item.type)}`}>
                            {item.type}
                          </span>
                          {getStatusBadge(item.status, item.urgent)}
                          <span className="text-sm text-gray-500">{formatDate(item.date)}</span>
                        </div>
                        
                        <Link to={`/journal-officiel/${item.id}`} className="block group">
                          <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                            {item.titre}
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {item.description}
                          </p>
                        </Link>

                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {formatNumber(item.views)} vues
                          </span>
                          <span className="flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            {formatNumber(item.downloads)} téléchargements
                          </span>
                          <span className="flex items-center">
                            <Tag className="h-4 w-4 mr-1" />
                            {item.fileSize}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-6">
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className={`p-2 rounded-lg transition-all ${
                            favoriteDocuments.includes(item.id) 
                              ? 'text-yellow-500 bg-yellow-50' 
                              : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                          }`}
                        >
                          <Star className="h-5 w-5" fill={favoriteDocuments.includes(item.id) ? "currentColor" : "none"} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                          <Bookmark className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Précédent
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (page === currentPage || page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                            : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2 text-gray-400">...</span>;
                  }
                  return null;
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Suivant
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default JournalOfficielPage;