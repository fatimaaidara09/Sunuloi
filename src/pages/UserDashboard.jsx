// src/pages/UserDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, BookOpen, Star, Download, Clock, Search, Settings, 
  Bell, FileText, TrendingUp, Calendar, Eye, Share2, Bookmark,
  Filter, ChevronRight, Award, Target, BarChart3, Globe, Scale,
  Plus, AlertCircle, CheckCircle, X, Edit3, Trash2, ExternalLink,
  MessageSquare, Users, Activity, Zap, Shield, HelpCircle,
  LogOut, Moon, Sun, Volume2, VolumeX, Smartphone, Mail,
  Lock, Database, Languages, Palette, History, Download as DownloadIcon,
  GraduationCap, Users2, GitCompare, PlayCircle, BookBookmark,
  MessageCircle, Trophy, PenTool, Lightbulb, Video, FileTextIcon,
  Headphones, Monitor, Wifi, WifiOff, Bookmark as BookmarkIcon,
  Heart, ThumbsUp, MessageSquareMore, Calendar as CalendarIcon,
  Clock3, MapPin, Briefcase, Building2, Phone, Globe2, UserCheck
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [glossaryTerms, setGlossaryTerms] = useState([]);
  const [glossaryFilter, setGlossaryFilter] = useState('');
  const [myTrainings, setMyTrainings] = useState([]);
  const [forumActivity, setForumActivity] = useState([]);
  const [comparisons, setComparisons] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [learningPath, setLearningPath] = useState([]);
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'fr',
    notifications: {
      email: true,
      push: true,
      updates: true,
      favorites: false,
      forum: true,
      training: true
    },
    privacy: {
      profileVisibility: 'private',
      searchHistory: true,
      analytics: true,
      forumProfile: 'public'
    },
    preferences: {
      defaultSearch: 'advanced',
      resultsPerPage: 20,
      autoComplete: true,
      trainingReminders: true,
      forumDigest: 'weekly'
    }
  });

  // Charger les données utilisateur au montage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('sunuloi_user') || sessionStorage.getItem('sunuloi_user'));
    if (!userData) {
      navigate('/connexion');
      return;
    }
    setUser(userData);
    loadUserData(userData.id);
  }, [navigate]);

  // Charger les données utilisateur
  const loadUserData = (userId) => {
    // Données existantes...
    setRecentSearches([
      { id: 1, query: "Code du travail sénégalais", timestamp: "2024-09-10T10:30:00", results: 45, category: "Code" },
      { id: 2, query: "Droit de la famille", timestamp: "2024-09-09T15:45:00", results: 23, category: "Jurisprudence" },
      { id: 3, query: "Constitution du Sénégal", timestamp: "2024-09-08T09:15:00", results: 12, category: "Loi" },
      { id: 4, query: "Procédure civile", timestamp: "2024-09-07T14:20:00", results: 31, category: "Code" },
      { id: 5, query: "Droit commercial OHADA", timestamp: "2024-09-06T11:15:00", results: 18, category: "Convention" }
    ]);

    setFavorites([
      {
        id: 1,
        title: "Code du travail sénégalais - Titre II",
        type: "Code",
        dateAdded: "2024-09-10",
        category: "Droit du travail",
        views: 156,
        description: "Dispositions relatives au contrat de travail"
      },
      {
        id: 2,
        title: "Loi n° 2024-15 sur la transformation numérique",
        type: "Loi",
        dateAdded: "2024-09-09", 
        category: "Technologies",
        views: 89,
        description: "Cadre juridique de la digitalisation au Sénégal"
      },
      {
        id: 3,
        title: "Arrêt Cour Suprême - Propriété intellectuelle",
        type: "Jurisprudence",
        dateAdded: "2024-09-08",
        category: "Propriété",
        views: 234,
        description: "Jurisprudence sur les brevets d'invention"
      }
    ]);

    // Nouvelles données pour les formations
    setMyTrainings([
      {
        id: 1,
        title: "Formation Droit du Travail Sénégalais",
        instructor: "Maître Fatou Diop",
        progress: 75,
        duration: "12h",
        modules: 8,
        completedModules: 6,
        enrolledDate: "2024-08-15",
        nextSession: "2024-09-20T14:00:00",
        level: "Intermédiaire",
        category: "Droit Social",
        certificate: false,
        rating: 4.8,
        students: 234
      },
      {
        id: 2,
        title: "Procédures OHADA",
        instructor: "Professeur Amadou Ba",
        progress: 45,
        duration: "16h",
        modules: 12,
        completedModules: 5,
        enrolledDate: "2024-09-01",
        nextSession: "2024-09-22T10:00:00",
        level: "Avancé",
        category: "Droit Commercial",
        certificate: true,
        rating: 4.9,
        students: 189
      },
      {
        id: 3,
        title: "Rédaction d'Actes Juridiques",
        instructor: "Maître Aissatou Ndiaye",
        progress: 100,
        duration: "8h",
        modules: 6,
        completedModules: 6,
        enrolledDate: "2024-07-10",
        completedDate: "2024-08-20",
        level: "Débutant",
        category: "Pratique Juridique",
        certificate: true,
        rating: 4.7,
        students: 312
      }
    ]);

    // Activité forum
    setForumActivity([
      {
        id: 1,
        type: "question",
        title: "Interprétation de l'article 45 du Code du Travail",
        content: "Comment interpréter cette disposition dans le cas...",
        category: "Droit du Travail",
        author: "Vous",
        createdAt: "2024-09-10T09:30:00",
        replies: 12,
        views: 89,
        likes: 15,
        solved: true,
        tags: ["code-travail", "contrat", "interpretation"]
      },
      {
        id: 2,
        type: "response",
        title: "Procédure de saisie immobilière",
        content: "D'après ma pratique, la procédure nécessite...",
        category: "Procédures Civiles",
        parentQuestion: "Étapes de saisie immobilière au Sénégal",
        createdAt: "2024-09-09T15:20:00",
        likes: 8,
        bestAnswer: true
      },
      {
        id: 3,
        type: "discussion",
        title: "Évolution du droit numérique au Sénégal",
        content: "Avec l'adoption de la nouvelle loi...",
        category: "Droit des NTIC",
        author: "Vous",
        createdAt: "2024-09-08T11:45:00",
        replies: 23,
        views: 156,
        likes: 31
      }
    ]);

    // Comparaisons sauvegardées
    setComparisons([
      {
        id: 1,
        title: "Code du Travail Sénégal vs France",
        type: "legislation",
        documents: [
          { title: "Code du Travail Sénégalais", type: "Code national" },
          { title: "Code du Travail Français", type: "Code étranger" }
        ],
        createdAt: "2024-09-05",
        lastModified: "2024-09-08",
        sections: ["Contrat de travail", "Durée du travail", "Congés"],
        notes: "Comparaison pour étude comparative sur les droits sociaux",
        shared: false,
        category: "Droit Social"
      },
      {
        id: 2,
        title: "Lois sur les NTIC - Sénégal vs Maroc",
        type: "comparative",
        documents: [
          { title: "Loi sur les NTIC Sénégal", type: "Loi nationale" },
          { title: "Loi sur le Numérique Maroc", type: "Loi étrangère" }
        ],
        createdAt: "2024-08-28",
        lastModified: "2024-09-02",
        sections: ["Protection des données", "Commerce électronique", "Signature numérique"],
        notes: "Analyse pour harmonisation régionale",
        shared: true,
        category: "Droit des NTIC"
      }
    ]);

    // Succès et réalisations
    setAchievements([
      {
        id: 1,
        title: "Expert Chercheur",
        description: "Plus de 500 recherches effectuées",
        icon: "search",
        earnedDate: "2024-09-01",
        category: "Recherche",
        points: 100,
        rarity: "rare"
      },
      {
        id: 2,
        title: "Formateur Assidu",
        description: "3 formations complétées avec succès",
        icon: "graduation",
        earnedDate: "2024-08-20",
        category: "Formation",
        points: 150,
        rarity: "epic"
      },
      {
        id: 3,
        title: "Contributeur Forum",
        description: "50 réponses utiles dans le forum",
        icon: "message",
        earnedDate: "2024-08-15",
        category: "Communauté",
        points: 75,
        rarity: "common"
      },
      {
        id: 4,
        title: "Analyste Juridique",
        description: "10 comparaisons de textes réalisées",
        icon: "compare",
        earnedDate: "2024-07-30",
        category: "Analyse",
        points: 120,
        rarity: "rare"
      }
    ]);

    // Parcours d'apprentissage recommandé
    setLearningPath([
      {
        id: 1,
        title: "Maîtrise du Droit des Affaires",
        description: "Parcours complet pour devenir expert en droit commercial",
        modules: [
          { title: "Introduction au Droit OHADA", completed: true },
          { title: "Sociétés Commerciales", completed: true },
          { title: "Contrats d'Affaires", completed: false, current: true },
          { title: "Droit Bancaire", completed: false },
          { title: "Résolution de Conflits", completed: false }
        ],
        progress: 40,
        estimatedDuration: "40h",
        difficulty: "Avancé",
        prerequisites: ["Droit Civil", "Procédures"],
        certificate: true
      },
      {
        id: 2,
        title: "Spécialisation Droit Numérique",
        description: "Formation aux enjeux juridiques du digital",
        modules: [
          { title: "Protection des Données", completed: false, current: true },
          { title: "Commerce Électronique", completed: false },
          { title: "Propriété Intellectuelle Numérique", completed: false },
          { title: "Cybercriminalité", completed: false }
        ],
        progress: 0,
        estimatedDuration: "25h",
        difficulty: "Intermédiaire",
        prerequisites: ["Bases du Droit"],
        certificate: true
      }
    ]);

    // Notifications enrichies
    setNotifications([
      { 
        id: 1, 
        type: 'training', 
        title: 'Nouvelle session de formation',
        message: 'Formation "Droit du Travail" démarre dans 2 jours', 
        date: '2024-09-18', 
        read: false,
        priority: 'high',
        action: 'Voir la formation'
      },
      { 
        id: 2, 
        type: 'forum', 
        title: 'Nouvelle réponse à votre question',
        message: 'Un expert a répondu à votre question sur le Code du Travail', 
        date: '2024-09-17', 
        read: false,
        priority: 'medium',
        action: 'Voir la réponse'
      },
      { 
        id: 3, 
        type: 'update', 
        title: 'Nouvelle loi publiée',
        message: 'Loi de finances rectificative 2024 disponible', 
        date: '2024-09-10', 
        read: true,
        priority: 'high'
      },
      {
        id: 4,
        type: 'achievement',
        title: 'Nouveau succès débloqué !',
        message: 'Vous avez obtenu le badge "Expert Chercheur"',
        date: '2024-09-15',
        read: false,
        priority: 'medium',
        action: 'Voir mes succès'
      },
      {
        id: 5,
        type: 'comparison',
        title: 'Comparaison partagée',
        message: 'Votre analyse "Code du Travail" a été consultée 50 fois',
        date: '2024-09-12',
        read: false,
        priority: 'low'
      }
    ]);

    setGlossaryTerms([
      {
        id: 1,
        term: "Arrêt",
        definition: "Décision de justice rendue par une cour d'appel ou la Cour suprême",
        category: "Procédure",
        examples: ["Arrêt de la Cour d'appel de Dakar"],
        lastUpdated: "2024-09-01"
      },
      {
        id: 2,
        term: "Code OHADA",
        definition: "Organisation pour l'harmonisation en Afrique du droit des affaires",
        category: "Droit commercial",
        examples: ["Acte uniforme relatif au droit commercial général"],
        lastUpdated: "2024-08-15"
      }
    ]);

    setRecentDocuments([
      {
        id: 1,
        title: "Décret sur l'environnement",
        type: "Décret",
        viewedAt: "2024-09-10T14:20:00",
        duration: "5 min",
        progress: 100
      },
      {
        id: 2,
        title: "Code pénal - Article 125",
        type: "Code",
        viewedAt: "2024-09-10T11:45:00",
        duration: "12 min",
        progress: 85
      }
    ]);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  };

  const tabs = [
    { id: "overview", label: "Vue d'ensemble", icon: BarChart3, color: "text-green-600" },
    { id: "favorites", label: "Favoris", icon: Star, color: "text-yellow-600" },
    { id: "training", label: "Formations", icon: GraduationCap, color: "text-blue-600" },
    { id: "forum", label: "Forum", icon: MessageSquare, color: "text-purple-600" },
    { id: "comparator", label: "Comparateur", icon: GitCompare, color: "text-indigo-600" },
    { id: "achievements", label: "Succès", icon: Trophy, color: "text-orange-600" },
    { id: "history", label: "Historique", icon: Clock, color: "text-green-600" },
    { id: "glossary", label: "Glossaire", icon: BookOpen, color: "text-yellow-600" },
    { id: "settings", label: "Paramètres", icon: Settings, color: "text-gray-600" }
  ];

  const quickActions = [
    { 
      title: "Nouvelle recherche", 
      desc: "Rechercher dans les textes juridiques", 
      icon: Search, 
      color: "bg-gradient-to-r from-green-500 to-green-600", 
      hoverColor: "hover:from-green-600 hover:to-green-700",
      link: "/recherche-avancee" 
    },
    { 
      title: "Mes formations", 
      desc: "Continuer mon apprentissage", 
      icon: GraduationCap, 
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700", 
      link: "/formations" 
    },
    { 
      title: "Forum juridique", 
      desc: "Poser une question ou aider", 
      icon: MessageSquare, 
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700", 
      link: "/forum" 
    },
    { 
      title: "Comparateur", 
      desc: "Comparer des textes juridiques", 
      icon: GitCompare, 
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      hoverColor: "hover:from-indigo-600 hover:to-indigo-700", 
      link: "/comparateur" 
    },
    { 
      title: "Glossaire juridique", 
      desc: "Consulter les définitions", 
      icon: BookOpen, 
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      hoverColor: "hover:from-yellow-600 hover:to-yellow-700", 
      link: "/glossaire" 
    },
    { 
      title: "Mes statistiques", 
      desc: "Analyser mon activité", 
      icon: TrendingUp, 
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700", 
      link: "#",
      onClick: () => setActiveTab("overview") 
    }
  ];

  // Fonctions utilitaires existantes...
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Code': 'bg-green-100 text-green-800 border-green-200',
      'Loi': 'bg-green-100 text-green-800 border-green-200',
      'Jurisprudence': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Convention': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Décret': 'bg-green-100 text-green-800 border-green-200',
      'Formation': 'bg-blue-100 text-blue-800 border-blue-200',
      'Forum': 'bg-purple-100 text-purple-800 border-purple-200',
      'Comparaison': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Droit Social': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Droit Commercial': 'bg-sky-100 text-sky-800 border-sky-200',
      'Pratique Juridique': 'bg-violet-100 text-violet-800 border-violet-200',
      'Droit des NTIC': 'bg-cyan-100 text-cyan-800 border-cyan-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getNotificationIcon = (type) => {
    const icons = {
      'update': <FileText className="h-5 w-5 text-green-600" />,
      'favorite': <Star className="h-5 w-5 text-yellow-600" />,
      'system': <Settings className="h-5 w-5 text-gray-600" />,
      'achievement': <Award className="h-5 w-5 text-orange-600" />,
      'training': <GraduationCap className="h-5 w-5 text-blue-600" />,
      'forum': <MessageSquare className="h-5 w-5 text-purple-600" />,
      'comparison': <GitCompare className="h-5 w-5 text-indigo-600" />
    };
    return icons[type] || <Bell className="h-5 w-5 text-gray-600" />;
  };

  const getAchievementIcon = (iconType) => {
    const icons = {
      'search': Search,
      'graduation': GraduationCap,
      'message': MessageSquare,
      'compare': GitCompare,
      'star': Star,
      'trophy': Trophy
    };
    return icons[iconType] || Trophy;
  };

  const getRarityColor = (rarity) => {
    const colors = {
      'common': 'from-gray-400 to-gray-500',
      'rare': 'from-blue-400 to-blue-600',
      'epic': 'from-purple-400 to-purple-600',
      'legendary': 'from-yellow-400 to-orange-500'
    };
    return colors[rarity] || colors.common;
  };

  // Nouvelles fonctions de rendu pour les nouveaux onglets...

  const renderTraining = () => (
    <div className="space-y-6">
      {/* En-tête formations */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <GraduationCap className="h-6 w-6 text-blue-600 mr-2" />
              Mes formations ({myTrainings.length})
            </h3>
            <p className="text-gray-600 text-sm mt-1">Suivez votre progression et découvrez de nouveaux contenus</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link 
              to="/formations"
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              Découvrir
            </Link>
          </div>
        </div>
      </div>

      {/* Parcours d'apprentissage recommandé */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Target className="h-5 w-5 text-blue-600 mr-2" />
          Parcours recommandés
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {learningPath.map((path) => (
            <div key={path.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">{path.title}</h5>
                  <p className="text-gray-600 text-sm mb-3">{path.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {path.estimatedDuration}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(path.difficulty)}`}>
                      {path.difficulty}
                    </span>
                    {path.certificate && (
                      <span className="flex items-center text-blue-600">
                        <Award className="h-4 w-4 mr-1" />
                        Certificat
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">Progression</span>
                  <span>{path.progress}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                    style={{ width: `${path.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                {path.modules.slice(0, 3).map((module, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    {module.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : module.current ? (
                      <PlayCircle className="h-4 w-4 text-blue-600" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                    )}
                    <span className={`text-sm ${module.completed ? 'text-gray-700' : module.current ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                      {module.title}
                    </span>
                  </div>
                ))}
                {path.modules.length > 3 && (
                  <div className="text-sm text-gray-500 ml-6">
                    +{path.modules.length - 3} autres modules
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mes formations en cours */}
      <div className="grid gap-6">
        {myTrainings.map((training) => (
          <div key={training.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{training.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(training.level)}`}>
                    {training.level}
                  </span>
                  {training.certificate && (
                    <Award className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3">Par {training.instructor}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {training.duration}
                  </span>
                  <span className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {training.completedModules}/{training.modules} modules
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {training.students} étudiants
                  </span>
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {training.rating}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(training.category)}`}>
                    {training.category}
                  </span>
                </div>
                
                {training.nextSession && training.progress < 100 && (
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-blue-800 text-sm font-medium">
                      Prochaine session : {formatTime(training.nextSession)}
                    </p>
                  </div>
                )}
                
                {training.progress === 100 && (
                  <div className="bg-green-50 p-3 rounded-lg mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800 text-sm font-medium">
                      Formation terminée le {formatDate(training.completedDate)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <PlayCircle className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
                  <BookmarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium">Progression</span>
                <span>{training.progress}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${training.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Inscrit le {formatDate(training.enrolledDate)}
              </div>
              <Link
                to={`/formations/${training.id}`}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm"
              >
                {training.progress === 100 ? 'Revoir' : 'Continuer'}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderForum = () => (
    <div className="space-y-6">
      {/* En-tête forum */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <MessageSquare className="h-6 w-6 text-purple-600 mr-2" />
              Mon activité forum
            </h3>
            <p className="text-gray-600 text-sm mt-1">Questions, réponses et discussions</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link 
              to="/forum"
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle question
            </Link>
          </div>
        </div>
      </div>

      {/* Statistiques forum */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Questions posées", value: forumActivity.filter(a => a.type === 'question').length, icon: MessageSquareMore, color: "from-purple-500 to-purple-600" },
          { label: "Réponses données", value: forumActivity.filter(a => a.type === 'response').length, icon: MessageCircle, color: "from-indigo-500 to-indigo-600" },
          { label: "Likes reçus", value: forumActivity.reduce((sum, a) => sum + (a.likes || 0), 0), icon: ThumbsUp, color: "from-pink-500 to-pink-600" },
          { label: "Meilleures réponses", value: forumActivity.filter(a => a.bestAnswer).length, icon: Award, color: "from-green-500 to-green-600" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Activité récente du forum */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center">
            <Activity className="h-5 w-5 text-purple-600 mr-2" />
            Activité récente
          </h4>
        </div>
        <div className="divide-y divide-gray-100">
          {forumActivity.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-purple-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'question' ? 'bg-purple-100' : 
                  activity.type === 'response' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {activity.type === 'question' ? (
                    <MessageSquareMore className="h-5 w-5 text-purple-600" />
                  ) : activity.type === 'response' ? (
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Users2 className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">{activity.title}</h5>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{activity.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(activity.category)}`}>
                          {activity.category}
                        </span>
                        <span>{formatTime(activity.createdAt)}</span>
                        {activity.replies && (
                          <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {activity.replies} réponses
                          </span>
                        )}
                        {activity.views && (
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {activity.views} vues
                          </span>
                        )}
                        <span className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {activity.likes || 0}
                        </span>
                      </div>
                      {activity.tags && (
                        <div className="flex items-center space-x-2 mt-2">
                          {activity.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {activity.solved && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span className="text-xs">Résolu</span>
                        </div>
                      )}
                      {activity.bestAnswer && (
                        <div className="flex items-center text-yellow-600">
                          <Award className="h-4 w-4 mr-1" />
                          <span className="text-xs">Meilleure réponse</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderComparator = () => (
    <div className="space-y-6">
      {/* En-tête comparateur */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <GitCompare className="h-6 w-6 text-indigo-600 mr-2" />
              Mes comparaisons ({comparisons.length})
            </h3>
            <p className="text-gray-600 text-sm mt-1">Analyses comparatives de textes juridiques</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link 
              to="/comparateur"
              className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle comparaison
            </Link>
          </div>
        </div>
      </div>

      {/* Liste des comparaisons */}
      <div className="grid gap-6">
        {comparisons.map((comparison) => (
          <div key={comparison.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{comparison.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(comparison.category)}`}>
                    {comparison.category}
                  </span>
                  {comparison.shared && (
                    <div className="flex items-center text-green-600">
                      <Share2 className="h-4 w-4 mr-1" />
                      <span className="text-xs">Partagé</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {comparison.documents.map((doc, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-800 text-sm">{doc.title}</h5>
                      <p className="text-gray-600 text-xs">{doc.type}</p>
                    </div>
                  ))}
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{comparison.notes}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Créé le {formatDate(comparison.createdAt)}</span>
                  <span>Modifié le {formatDate(comparison.lastModified)}</span>
                  <span>{comparison.sections.length} sections comparées</span>
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                  {comparison.sections.slice(0, 3).map((section, idx) => (
                    <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                      {section}
                    </span>
                  ))}
                  {comparison.sections.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{comparison.sections.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-6">
                <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all">
                  <Download className="h-4 w-4" />
                </button>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Share2 className="h-4 w-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      {/* En-tête succès */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <Trophy className="h-6 w-6 text-orange-600 mr-2" />
              Mes succès ({achievements.length})
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {achievements.reduce((sum, a) => sum + a.points, 0)} points totaux
            </p>
          </div>
        </div>
      </div>

      {/* Liste des succès */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => {
          const IconComponent = getAchievementIcon(achievement.icon);
          return (
            <div key={achievement.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${getRarityColor(achievement.rarity)} rounded-full -translate-y-12 translate-x-12 opacity-20`}></div>
              <div className="relative z-10">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(achievement.category)}`}>
                        {achievement.category}
                      </span>
                      <div className="flex items-center space-x-3 text-gray-500">
                        <span>{achievement.points} pts</span>
                        <span>{formatDate(achievement.earnedDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Succès à débloquer */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Target className="h-5 w-5 text-orange-600 mr-2" />
          Prochains objectifs
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Maître du Forum", desc: "Obtenir 100 likes sur vos réponses", progress: 65, max: 100, icon: MessageSquare },
            { title: "Étudiant Assidu", desc: "Terminer 5 formations", progress: 3, max: 5, icon: GraduationCap },
            { title: "Analyste Expert", desc: "Créer 20 comparaisons", progress: 2, max: 20, icon: GitCompare }
          ].map((goal, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <goal.icon className="h-5 w-5 text-gray-600" />
                <h5 className="font-medium text-gray-900">{goal.title}</h5>
              </div>
              <p className="text-gray-600 text-sm mb-3">{goal.desc}</p>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progression</span>
                <span>{goal.progress}/{goal.max}</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                  style={{ width: `${(goal.progress / goal.max) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Fonction pour rendre la vue d'ensemble améliorée
  const renderOverview = () => (
    <div className="space-y-8">
      {/* Statistiques personnelles enrichies */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {[
          { 
            label: "Recherches", 
            value: user.stats?.searchCount || 247, 
            icon: Search, 
            color: "from-green-500 to-green-600",
            change: "+12%",
            changeType: "positive"
          },
          { 
            label: "Formations", 
            value: myTrainings.length, 
            icon: GraduationCap, 
            color: "from-blue-500 to-blue-600",
            change: "+2",
            changeType: "positive"
          },
          { 
            label: "Forum", 
            value: forumActivity.length, 
            icon: MessageSquare, 
            color: "from-purple-500 to-purple-600",
            change: "+5",
            changeType: "positive"
          },
          { 
            label: "Comparaisons", 
            value: comparisons.length, 
            icon: GitCompare, 
            color: "from-indigo-500 to-indigo-600",
            change: "+1",
            changeType: "positive"
          },
          { 
            label: "Favoris", 
            value: favorites.length, 
            icon: Star, 
            color: "from-yellow-500 to-yellow-600",
            change: "+3",
            changeType: "positive"
          },
          { 
            label: "Points", 
            value: achievements.reduce((sum, a) => sum + a.points, 0), 
            icon: Trophy, 
            color: "from-orange-500 to-orange-600",
            change: "+150",
            changeType: "positive"
          }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'positive' 
                  ? 'text-green-700 bg-green-100' 
                  : 'text-red-700 bg-red-100'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-gray-600 text-xs">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions rapides améliorées */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <Zap className="h-6 w-6 text-green-600 mr-2" />
            Actions rapides
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, idx) => (
            <Link
              key={idx}
              to={action.link}
              onClick={action.onClick}
              className="group p-4 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className={`w-12 h-12 ${action.color} ${action.hoverColor} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">{action.title}</h4>
              <p className="text-xs text-gray-600">{action.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Activité récente avec sections améliorées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formations en cours */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
              Formations en cours
            </h3>
            <button 
              onClick={() => setActiveTab("training")}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
            >
              Voir tout <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {myTrainings.filter(t => t.progress < 100).slice(0, 3).map((training) => (
              <div key={training.id} className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800 text-sm">{training.title}</h4>
                  <span className="text-blue-600 text-xs font-medium">{training.progress}%</span>
                </div>
                <div className="bg-white rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                    style={{ width: `${training.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">{training.completedModules}/{training.modules} modules • {training.instructor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activité forum récente */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <MessageSquare className="h-5 w-5 text-purple-600 mr-2" />
              Activité forum
            </h3>
            <button 
              onClick={() => setActiveTab("forum")}
              className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center"
            >
              Voir tout <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {forumActivity.slice(0, 3).map((activity) => (
              <div key={activity.id} className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className={`p-1 rounded ${
                    activity.type === 'question' ? 'bg-purple-200' : 
                    activity.type === 'response' ? 'bg-green-200' : 'bg-blue-200'
                  }`}>
                    {activity.type === 'question' ? (
                      <MessageSquareMore className="h-3 w-3 text-purple-600" />
                    ) : activity.type === 'response' ? (
                      <MessageCircle className="h-3 w-3 text-green-600" />
                    ) : (
                      <Users2 className="h-3 w-3 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-sm mb-1">{activity.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{activity.category}</span>
                      <span>•</span>
                      <span>{formatTime(activity.createdAt)}</span>
                      {activity.likes > 0 && (
                        <>
                          <span>•</span>
                          <span className="flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {activity.likes}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recherches récentes et comparaisons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recherches récentes */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <Search className="h-5 w-5 text-green-600 mr-2" />
              Recherches récentes
            </h3>
            <button 
              onClick={() => setActiveTab("history")}
              className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
            >
              Voir tout <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="space-y-3">
            {recentSearches.slice(0, 4).map((search) => (
              <div key={search.id} className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">{search.query}</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                      <span>{search.results} résultats</span>
                      <span>•</span>
                      <span>{formatTime(search.timestamp)}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(search.category)}`}>
                    {search.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mes comparaisons */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <GitCompare className="h-5 w-5 text-indigo-600 mr-2" />
              Mes comparaisons
            </h3>
            <button 
              onClick={() => setActiveTab("comparator")}
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center"
            >
              Voir tout <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="space-y-3">
            {comparisons.slice(0, 2).map((comparison) => (
              <div key={comparison.id} className="p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                <h4 className="font-medium text-gray-800 text-sm mb-2">{comparison.title}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{comparison.documents.length} documents</span>
                    <span>•</span>
                    <span>{formatDate(comparison.lastModified)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {comparison.shared && (
                      <Share2 className="h-3 w-3 text-green-600" />
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(comparison.category)}`}>
                      {comparison.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Fonctions existantes pour les autres onglets
  const renderFavorites = () => (
    <div className="space-y-6">
      {/* En-tête avec filtres */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <Star className="h-6 w-6 text-yellow-600 mr-2" />
              Mes favoris ({favorites.length})
            </h3>
            <p className="text-gray-600 text-sm mt-1">Gérez vos documents juridiques préférés</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                <option value="">Tous les types</option>
                <option value="Code">Codes</option>
                <option value="Loi">Lois</option>
                <option value="Jurisprudence">Jurisprudence</option>
                <option value="Convention">Conventions</option>
              </select>
            </div>
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </button>
          </div>
        </div>
      </div>

      {/* Liste des favoris */}
      {favorites.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-lg border border-gray-100 text-center">
          <div className="max-w-md mx-auto">
            <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Aucun favori pour le moment</h4>
            <p className="text-gray-600 mb-6">Commencez à ajouter des documents à vos favoris lors de vos recherches pour les retrouver facilement ici.</p>
            <Link 
              to="/recherche-avancee"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
            >
              <Search className="h-4 w-4 mr-2" />
              Commencer une recherche
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {favorites.map((fav) => (
            <div key={fav.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(fav.type)}`}>
                      {fav.type}
                    </span>
                    <span className="text-sm text-gray-500">{fav.category}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{fav.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{fav.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Ajouté le {formatDate(fav.dateAdded)}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {fav.views} vues
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-6">
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                    <Download className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => removeFromFavorites(fav.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      {/* En-tête avec filtres */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <Clock className="h-6 w-6 text-green-600 mr-2" />
              Historique des recherches
            </h3>
            <p className="text-gray-600 text-sm mt-1">Retrouvez toutes vos recherches précédentes</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="7">7 derniers jours</option>
                <option value="30">30 derniers jours</option>
                <option value="90">90 derniers jours</option>
                <option value="all">Tout l'historique</option>
              </select>
            </div>
            <button className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all">
              <Trash2 className="h-4 w-4 mr-2" />
              Vider
            </button>
          </div>
        </div>
      </div>

      {/* Liste des recherches */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {recentSearches.length === 0 ? (
          <div className="p-12 text-center">
            <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Aucune recherche dans l'historique</h4>
            <p className="text-gray-600">Vos recherches apparaîtront ici automatiquement</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentSearches.map((search, index) => (
              <div key={search.id} className="p-6 hover:bg-green-50 transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                      <Search className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-green-700">{search.query}</h4>
                      <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                        <span className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {search.results} résultats
                        </span>
                        <span>•</span>
                        <span>{formatTime(search.timestamp)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(search.category)}`}>
                          {search.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex items-center px-3 py-2 text-green-600 hover:bg-green-100 rounded-lg transition-all text-sm">
                      <Search className="h-4 w-4 mr-1" />
                      Relancer
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderGlossary = () => (
    <div className="space-y-6">
      {/* En-tête du glossaire */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <BookOpen className="h-6 w-6 text-yellow-600 mr-2" />
              Glossaire juridique ({glossaryTerms.length} termes)
            </h3>
            <p className="text-gray-600 text-sm mt-1">Définitions et explications des termes juridiques</p>
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un terme..."
                value={glossaryFilter}
                onChange={(e) => setGlossaryFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all">
              <Plus className="h-4 w-4 mr-2" />
              Suggérer
            </button>
          </div>
        </div>
      </div>

      {/* Termes du glossaire */}
      {glossaryTerms.filter(term =>
        term.term.toLowerCase().includes(glossaryFilter.toLowerCase()) ||
        term.definition.toLowerCase().includes(glossaryFilter.toLowerCase()) ||
        term.category.toLowerCase().includes(glossaryFilter.toLowerCase())
      ).length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-lg border border-gray-100 text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h4 className="text-xl font-semibold text-gray-800 mb-2">Aucun terme trouvé</h4>
          <p className="text-gray-600">Essayez avec d'autres mots-clés ou consultez tous les termes</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {glossaryTerms.filter(term =>
            term.term.toLowerCase().includes(glossaryFilter.toLowerCase()) ||
            term.definition.toLowerCase().includes(glossaryFilter.toLowerCase()) ||
            term.category.toLowerCase().includes(glossaryFilter.toLowerCase())
          ).map((term) => (
            <div key={term.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-xl font-bold text-gray-900">{term.term}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(term.category)}`}>
                      {term.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{term.definition}</p>
                  {term.examples && term.examples.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-800 mb-2 text-sm">Exemples :</h5>
                      <ul className="list-disc list-inside space-y-1">
                        {term.examples.map((example, idx) => (
                          <li key={idx} className="text-gray-600 text-sm">{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="text-xs text-gray-500">
                    Mis à jour le {formatDate(term.lastUpdated)}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-6">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all">
                    <Bookmark className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* En-tête des paramètres */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Settings className="h-6 w-6 text-gray-600 mr-2" />
          Paramètres du compte
        </h3>
        <p className="text-gray-600 text-sm mt-1">Personnalisez votre expérience sur SunuLoi</p>
      </div>

      {/* Informations du profil */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center">
            <User className="h-5 w-5 text-gray-600 mr-2" />
            Informations du profil
          </h4>
          <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
            <Edit3 className="h-4 w-4 mr-1" />
            Modifier
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
            <input
              type="text"
              value={user.name}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
            <input
              type="text"
              value={user.profession || "Non spécifié"}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date d'inscription</label>
            <input
              type="text"
              value={formatDate(user.createdAt || "2024-01-01")}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Paramètres de notification améliorés */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center">
            <Bell className="h-5 w-5 text-gray-600 mr-2" />
            Notifications
          </h4>
        </div>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Notifications par email', desc: 'Recevoir les mises à jour par email', icon: Mail },
            { key: 'push', label: 'Notifications push', desc: 'Notifications dans le navigateur', icon: Smartphone },
            { key: 'updates', label: 'Mises à jour légales', desc: 'Nouvelles lois et modifications', icon: FileText },
            { key: 'favorites', label: 'Favoris mis à jour', desc: 'Modifications de vos documents favoris', icon: Star },
            { key: 'forum', label: 'Activité forum', desc: 'Nouvelles réponses et mentions', icon: MessageSquare },
            { key: 'training', label: 'Formations', desc: 'Rappels de cours et nouvelles formations', icon: GraduationCap }
          ].map((notif) => (
            <div key={notif.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <notif.icon className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">{notif.label}</p>
                  <p className="text-sm text-gray-600">{notif.desc}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications[notif.key]}
                  onChange={(e) => updateSettings('notifications', notif.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Actions de déconnexion */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Session</h4>
            <p className="text-gray-600 text-sm">Gérer votre session active</p>
          </div>
          <button
            onClick={() => handleLogout()}
            className="flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );

  // Fonctions utilitaires
  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const removeFromFavorites = (id) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('sunuloi_user');
    sessionStorage.removeItem('sunuloi_user');
    navigate('/connexion');
  };

  const updateSettings = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  // Fonction pour rendre le contenu selon l'onglet actif
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "favorites":
        return renderFavorites();
      case "training":
        return renderTraining();
      case "forum":
        return renderForum();
      case "comparator":
        return renderComparator();
      case "achievements":
        return renderAchievements();
      case "history":
        return renderHistory();
      case "glossary":
        return renderGlossary();
      case "settings":
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement de votre espace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* En-tête de bienvenue */}
        <div className="mb-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-yellow-400 rounded-full -translate-y-16 translate-x-16 opacity-10"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {getGreeting()}, {user.name}
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Bienvenue dans votre espace personnel SunuLoi
                  </p>
                  <div className="flex items-center mt-3 text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Dernière connexion : {formatTime(new Date().toISOString())}
                  </div>
                </div>
                
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
                  >
                    <Bell className="h-6 w-6" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-96 overflow-y-auto">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800">Notifications</h3>
                          <button
                            onClick={() => setShowNotifications(false)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">
                            <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                            <p>Aucune notification</p>
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div
                              key={notif.id}
                              className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                              onClick={() => markNotificationAsRead(notif.id)}
                            >
                              <div className="flex items-start space-x-3">
                                {getNotificationIcon(notif.type)}
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm ${!notif.read ? 'font-semibold text-gray-900' : 'text-gray-800'}`}>
                                    {notif.title}
                                  </p>
                                  <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">{formatDate(notif.date)}</p>
                                  {notif.action && (
                                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-1">
                                      {notif.action}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="mb-8">
          <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
            <nav className="flex space-x-1 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <tab.icon className={`h-4 w-4 mr-2 ${activeTab === tab.id ? 'text-white' : tab.color}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="mb-8">
          {renderTabContent()}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;