import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Search, Filter, BookOpen, FileText, Scale, Gavel, Globe,
  Home, RefreshCw, Brain, Eye, Download, Share2, Calendar, Bookmark,
  Clock, Star, TrendingUp, Tag, AlertCircle, CheckCircle, User,
  ChevronDown, ChevronUp, SlidersHorizontal, Users, Bell, Menu, X,
  Languages, Settings, LogOut, Copy, ExternalLink, History
} from 'lucide-react';
import Footer from './Footer';

const RecherchePage = ({ user, onNavigate, searchParams = {} }) => {
  const [searchQuery, setSearchQuery] = useState(searchParams.query || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.filter || 'all');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAI, setShowAI] = useState(searchParams.openAI || false);
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);

  const categories = [
    { 
      id: 'all', 
      name: 'Tout', 
      icon: Search, 
      count: 32847, 
      color: 'bg-gray-100 text-gray-800',
      description: 'Tous les textes juridiques'
    },
    { 
      id: 'constitution', 
      name: 'Constitution', 
      icon: BookOpen, 
      count: 1, 
      color: 'bg-red-100 text-red-800',
      description: 'Loi fondamentale du Sénégal'
    },
    { 
      id: 'codes', 
      name: 'Codes', 
      icon: FileText, 
      count: 67, 
      color: 'bg-blue-100 text-blue-800',
      description: 'Codes thématiques'
    },
    { 
      id: 'lois', 
      name: 'Lois', 
      icon: Scale, 
      count: 3247, 
      color: 'bg-green-100 text-green-800',
      description: 'Lois de l\'Assemblée Nationale'
    },
    { 
      id: 'decrets', 
      name: 'Décrets', 
      icon: FileText, 
      count: 15432, 
      color: 'bg-purple-100 text-purple-800',
      description: 'Décrets exécutifs'
    },
    { 
      id: 'jurisprudence', 
      name: 'Jurisprudence', 
      icon: Gavel, 
      count: 12891, 
      color: 'bg-orange-100 text-orange-800',
      description: 'Décisions de justice'
    },
    { 
      id: 'conventions', 
      name: 'Conventions', 
      icon: Globe, 
      count: 456, 
      color: 'bg-teal-100 text-teal-800',
      description: 'Traités internationaux'
    }
  ];

  const mockResults = [
    {
      id: 'loi-2024-18',
      title: 'Loi n° 2024-18 sur la cybersécurité nationale du Sénégal',
      type: 'Loi',
      date: '10 août 2024',
      dateApplication: '1er septembre 2024',
      category: 'Sécurité numérique',
      status: 'En vigueur',
      source: 'Journal Officiel n° 7156',
      authority: 'Assemblée Nationale',
      summary: 'Cette loi établit le cadre juridique de la cybersécurité nationale, définit les obligations des opérateurs d\'importance vitale et renforce la protection des infrastructures numériques critiques du Sénégal.',
      relevance: 95,
      views: 2847,
      bookmarks: 156,
      tags: ['cybersécurité', 'infrastructure', 'protection', 'numérique'],
      isNew: true,
      hasResume: true,
      hasVulgarization: true
    },
    {
      id: 'code-travail-art-45-78',
      title: 'Code du Travail - Articles 45 à 78 : Contrats de travail',
      type: 'Code',
      date: '15 mars 2023',
      dateApplication: '1er avril 2023',
      category: 'Droit du travail',
      status: 'Modifié récemment',
      source: 'Code du Travail du Sénégal',
      authority: 'Ministère du Travail',
      summary: 'Dispositions relatives aux différents types de contrats de travail, aux obligations des parties, aux conditions de rupture et aux procédures de licenciement.',
      relevance: 88,
      views: 4521,
      bookmarks: 287,
      tags: ['contrat', 'travail', 'licenciement', 'obligations'],
      isNew: false,
      hasResume: true,
      hasVulgarization: true
    },
    {
      id: 'arret-2024-67',
      title: 'Arrêt n° 67/2024 - Cour Suprême - Commerce électronique et protection du consommateur',
      type: 'Jurisprudence',
      date: '5 juillet 2024',
      dateApplication: 'Immédiate',
      category: 'Commerce électronique',
      status: 'Définitif',
      source: 'Cour Suprême du Sénégal',
      authority: 'Cour Suprême',
      summary: 'Jurisprudence établissant les principes de protection des consommateurs dans le commerce électronique au Sénégal, définissant les obligations des plateformes et les recours possibles.',
      relevance: 82,
      views: 1654,
      bookmarks: 98,
      tags: ['commerce', 'électronique', 'consommateur', 'protection'],
      isNew: true,
      hasResume: true,
      hasVulgarization: false
    },
    {
      id: 'decret-2024-789',
      title: 'Décret n° 2024-789 d\'application sur l\'intelligence artificielle dans l\'administration',
      type: 'Décret',
      date: '8 août 2024',
      dateApplication: '15 septembre 2024',
      category: 'Administration numérique',
      status: 'En cours d\'application',
      source: 'Journal Officiel n° 7155',
      authority: 'Présidence de la République',
      summary: 'Réglementation de l\'usage de l\'intelligence artificielle dans l\'administration publique sénégalaise, définition des procédures d\'évaluation et des mesures de contrôle.',
      relevance: 79,
      views: 1287,
      bookmarks: 74,
      tags: ['IA', 'intelligence artificielle', 'administration', 'numérique'],
      isNew: true,
      hasResume: true,
      hasVulgarization: true
    }
  ];

  const suggestedSearches = [
    'Code de la famille',
    'Droit du travail',
    'Fiscalité des entreprises',
    'Procédure civile',
    'Droit foncier',
    'Protection des données',
    'Commerce international',
    'Droit pénal',
    'Constitution 2001',
    'Marchés publics'
  ];

  const aiSuggestions = [
    "Quelles sont les nouvelles règles de cybersécurité au Sénégal ?",
    "Comment créer une entreprise au Sénégal selon la nouvelle législation ?",
    "Quels sont mes droits en tant que travailleur salarié ?",
    "Comment fonctionne la procédure de divorce au Sénégal ?",
    "Que dit la loi sur la protection des données personnelles ?"
  ];

  useEffect(() => {
    if (searchQuery || selectedCategory !== 'all') {
      handleSearch();
    }
  }, [selectedCategory]);

  const handleSearch = async () => {
    setLoading(true);
    
    try {
      // Simulation d'une recherche avec délai
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredResults = mockResults;
      
      // Filtrage par catégorie
      if (selectedCategory !== 'all') {
        filteredResults = filteredResults.filter(result => {
          if (selectedCategory === 'lois') return result.type === 'Loi';
          if (selectedCategory === 'codes') return result.type === 'Code';
          if (selectedCategory === 'decrets') return result.type === 'Décret';
          if (selectedCategory === 'jurisprudence') return result.type === 'Jurisprudence';
          return true;
        });
      }
      
      // Filtrage par terme de recherche
      if (searchQuery) {
        filteredResults = filteredResults.filter(result =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      setResults(filteredResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const askAI = async (question) => {
    setAiLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const responses = {
        "cybersécurité": "La Loi n° 2024-18 sur la cybersécurité nationale établit un cadre complet pour la protection des infrastructures numériques du Sénégal. Elle impose aux opérateurs d'importance vitale de mettre en place des mesures de sécurité spécifiques et prévoit la création d'une Agence nationale de cybersécurité. Les sanctions peuvent aller jusqu'à 100 millions de FCFA d'amende.",
        "entreprise": "Pour créer une entreprise au Sénégal, vous devez suivre plusieurs étapes selon le nouveau Code des Investissements 2024 : 1) Réservation du nom au RCCM, 2) Ouverture d'un compte bancaire bloqué, 3) Rédaction des statuts, 4) Enregistrement au Centre de Formalités, 5) Publication au Journal Officiel. La procédure complète prend environ 5 jours ouvrables.",
        "travailleur": "Selon le Code du Travail sénégalais, vous avez droit à : un contrat de travail écrit, un salaire minimum garanti, des congés payés (24 jours ouvrables par an), une protection contre le licenciement abusif, et des prestations sociales. En cas de litige, vous pouvez saisir l'Inspection du Travail ou le Tribunal du Travail."
      };
      
      const key = Object.keys(responses).find(k => question.toLowerCase().includes(k));
      const response = key ? responses[key] : `Voici une analyse juridique concernant votre question : "${question}". 

L'intelligence artificielle de JuriSen analyse votre demande et peut vous expliquer que cette question touche plusieurs aspects du droit sénégalais. 

Pour une réponse précise, je vous recommande de consulter les textes suivants dans notre base de données : Code Civil, Code de Procédure Civile, et les lois récentes sur le sujet.

Souhaitez-vous que je vous oriente vers des textes spécifiques ?`;
      
      setAiResponse(response);
    } catch (error) {
      console.error('AI error:', error);
    } finally {
      setAiLoading(false);
    }
  };

  const handleTextClick = (textId, mode = 'view') => {
    if (!user && mode !== 'view') {
      // Utilisateur non connecté - redirection vers auth
      onNavigate('auth');
      return;
    }
    
    onNavigate('viewer', null, { 
      textId, 
      mode: user ? 'user' : 'public' 
    });
  };

  const addToFavorites = (textId) => {
    if (!user) {
      onNavigate('auth');
      return;
    }
    
    // Logique d'ajout aux favoris
    console.log(`Added ${textId} to favorites`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('home')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Scale className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Recherche Juridique</h1>
                  <p className="text-sm text-gray-600">Explorez la législation sénégalaise</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <select className="appearance-none bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm font-medium focus:outline-none">
                <option value="fr">FR</option>
                <option value="wo">WO</option>
                <option value="en">EN</option>
              </select>
              
              {user ? (
                <>
                  <div className="relative">
                    <button 
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors relative"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
                    </button>
                  </div>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center space-x-2 text-sm text-gray-700 hover:text-green-600 px-3 py-2 rounded-lg hover:bg-green-50"
                  >
                    <User className="h-4 w-4" />
                    <span>{user.firstName}</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onNavigate('auth')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Se connecter
                </button>
              )}
              
              <button
                onClick={() => onNavigate('home')}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100"
              >
                <Home className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar de filtres */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtres
                </h3>
                
                {/* Catégories */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Catégories</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left flex items-center justify-between p-3 rounded-xl transition-all ${
                          selectedCategory === category.id 
                            ? 'bg-green-50 border-2 border-green-200 text-green-800' 
                            : 'hover:bg-gray-50 text-gray-700 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <category.icon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-xs text-gray-500">{category.description}</div>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${category.color}`}>
                          {category.count.toLocaleString()}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtres avancés */}
                <div className="border-t pt-4">
                  <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 mb-3"
                  >
                    <span>Filtres avancés</span>
                    {showAdvancedFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  
                  {showAdvancedFilters && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">Période</label>
                        <select 
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="all">Toute période</option>
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                          <option value="6months">6 derniers mois</option>
                          <option value="1month">Ce mois</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">Statut</label>
                        <select 
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="all">Tous les statuts</option>
                          <option value="vigueur">En vigueur</option>
                          <option value="modifie">Modifié récemment</option>
                          <option value="abroge">Abrogé</option>
                          <option value="projet">Projet</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">Source</label>
                        <select 
                          value={sourceFilter}
                          onChange={(e) => setSourceFilter(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="all">Toutes sources</option>
                          <option value="jo">Journal Officiel</option>
                          <option value="an">Assemblée Nationale</option>
                          <option value="pr">Présidence</option>
                          <option value="cs">Cour Suprême</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">Options</label>
                        <div className="space-y-2">
                          <label className="flex items-center text-sm">
                            <input type="checkbox" className="mr-2 rounded text-green-600" />
                            <span>Avec résumé</span>
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="checkbox" className="mr-2 rounded text-green-600" />
                            <span>Avec vulgarisation</span>
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="checkbox" className="mr-2 rounded text-green-600" />
                            <span>Nouveautés uniquement</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recherches suggérées */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Recherches populaires</h4>
                  <div className="flex flex-wrap gap-2">
                    {suggestedSearches.slice(0, 6).map((term, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(term)}
                        className="text-xs bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-800 px-3 py-1 rounded-full transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1">
            {/* Barre de recherche */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex space-x-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher dans les textes juridiques sénégalais..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center"
                >
                  {loading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => setShowAI(!showAI)}
                  className={`px-4 py-3 rounded-xl font-semibold transition-colors flex items-center ${
                    showAI ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                  title="Assistant IA Juridique"
                >
                  <Brain className="h-5 w-5" />
                </button>
              </div>

              {/* Tri */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Trier par :</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                  >
                    <option value="relevance">Pertinence</option>
                    <option value="date_desc">Date récente</option>
                    <option value="date_asc">Date ancienne</option>
                    <option value="title">Titre A-Z</option>
                    <option value="popularity">Popularité</option>
                  </select>
                </div>
                
                {results.length > 0 && (
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">{results.length}</span> résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>

            {/* Assistant IA */}
            {showAI && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Assistant IA Juridique</h3>
                    <p className="text-sm text-gray-600">Posez vos questions en langage naturel</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="Ex: Comment créer une entreprise au Sénégal ?"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          askAI(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.querySelector('input[placeholder*="Comment créer"]');
                        askAI(input.value);
                        input.value = '';
                      }}
                      disabled={aiLoading}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                    >
                      {aiLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : 'Demander'}
                    </button>
                  </div>

                  {/* Suggestions d'IA */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Questions fréquentes :</p>
                    <div className="flex flex-wrap gap-2">
                      {aiSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => askAI(suggestion)}
                          className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {aiResponse && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-900">Réponse de l'Assistant IA</span>
                      </div>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">{aiResponse}</div>
                      {user && (
                        <div className="flex items-center space-x-3 mt-4 pt-3 border-t border-blue-200">
                          <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                            <Copy className="h-4 w-4 mr-1" />
                            Copier
                          </button>
                          <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                            <Share2 className="h-4 w-4 mr-1" />
                            Partager
                          </button>
                          <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                            <Bookmark className="h-4 w-4 mr-1" />
                            Sauvegarder
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Résultats */}
            <div className="space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
                    <p className="text-gray-600">Recherche en cours...</p>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <>
                  {results.map((result) => (
                    <div 
                      key={result.id} 
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden"
                    >
                      <div className="p-8">
                        {/* En-tête du résultat */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                                result.type === 'Loi' ? 'bg-green-100 text-green-800' :
                                result.type === 'Code' ? 'bg-blue-100 text-blue-800' :
                                result.type === 'Décret' ? 'bg-purple-100 text-purple-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {result.type}
                              </span>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                result.status === 'En vigueur' ? 'bg-green-100 text-green-700' :
                                result.status === 'Modifié récemment' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {result.status}
                              </span>
                              {result.isNew && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                                  NOUVEAU
                                </span>
                              )}
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                {result.relevance}% pertinent
                              </span>
                            </div>
                            
                            <h3 
                              className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors cursor-pointer leading-tight"
                              onClick={() => handleTextClick(result.id)}
                            >
                              {result.title}
                            </h3>
                            
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {result.summary}
                            </p>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {result.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-800 cursor-pointer transition-colors"
                              onClick={() => setSearchQuery(tag)}
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Métadonnées */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{result.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-2" />
                            <span>{result.authority}</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            <span>{result.views.toLocaleString()} vues</span>
                          </div>
                          <div className="flex items-center">
                            <Bookmark className="h-4 w-4 mr-2" />
                            <span>{result.bookmarks} favoris</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center space-x-4">
                            {/* Consultation */}
                            <button
                              onClick={() => handleTextClick(result.id)}
                              className="flex items-center space-x-2 text-green-600 hover:text-green-800 font-medium transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                              <span>Consulter</span>
                            </button>

                            {/* Actions pour utilisateurs connectés */}
                            {user ? (
                              <>
                                <button
                                  onClick={() => addToFavorites(result.id)}
                                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                                  title="Ajouter aux favoris"
                                >
                                  <Bookmark className="h-4 w-4" />
                                  <span>Favoris</span>
                                </button>
                                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                                  <Download className="h-4 w-4" />
                                  <span>PDF</span>
                                </button>
                                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                                  <Share2 className="h-4 w-4" />
                                  <span>Partager</span>
                                </button>
                              </>
                            ) : (
                              <div className="flex items-center space-x-2 text-gray-500">
                                <AlertCircle className="h-4 w-4" />
                                <span className="text-sm">
                                  <button 
                                    onClick={() => onNavigate('auth')}
                                    className="text-green-600 hover:text-green-800 font-medium"
                                  >
                                    Connectez-vous
                                  </button>
                                  {' '}pour plus d'options
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Indicateurs de disponibilité */}
                          <div className="flex items-center space-x-3">
                            {result.hasResume && (
                              <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                <FileText className="h-3 w-3 mr-1" />
                                Résumé
                              </div>
                            )}
                            {result.hasVulgarization && (
                              <div className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                <Users className="h-3 w-3 mr-1" />
                                Vulgarisé
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : searchQuery || selectedCategory !== 'all' ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 p-4 rounded-full inline-block mb-4">
                    <Search className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun résultat trouvé</h3>
                  <p className="text-gray-600 mb-6">Essayez d'utiliser d'autres termes de recherche ou modifiez vos filtres</p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Suggestions :</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {suggestedSearches.slice(0, 5).map((term, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchQuery(term)}
                            className="text-sm bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-800 px-3 py-1 rounded-full transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                          setResults([]);
                        }}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      >
                        Réinitialiser les filtres
                      </button>
                      <button
                        onClick={() => setShowAI(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
                      >
                        <Brain className="h-4 w-4 mr-2" />
                        Poser une question à l'IA
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
                    <Search className="h-16 w-16 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Commencez votre recherche</h3>
                  <p className="text-gray-600">Utilisez la barre de recherche ci-dessus ou sélectionnez une catégorie</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications toast */}
      {showNotifications && user && (
        <div className="fixed top-20 right-6 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 max-w-sm z-50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">Notifications</h4>
            <button 
              onClick={() => setShowNotifications(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="bg-blue-500 p-1 rounded-full">
                <FileText className="h-3 w-3 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Nouvelle loi publiée</p>
                <p className="text-xs text-gray-600">Loi sur la cybersécurité - Il y a 2h</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="bg-green-500 p-1 rounded-full">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Recherche sauvegardée</p>
                <p className="text-xs text-gray-600">Alerte: "droit du travail" - Il y a 1j</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default RecherchePage;