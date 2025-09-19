import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Scale, 
  Gavel, 
  FileText, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe, 
  ChevronRight, 
  ArrowUpRight, 
  Bell,
  Calendar,
  Clock,
  AlertTriangle,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Type,
  Contrast,
  Moon,
  Sun,
  Languages,
  Accessibility,
  Download,
  Share2,
  Bookmark,
  Heart,
  MessageSquare,
  Star,
  Zap,
  Activity,
  BarChart3,
  Settings,
  HelpCircle,
  RefreshCw
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import { useAccessibleComponent } from "../constant/AccessibleSysteme";




const SunuLoiHome = () => {
   const { 
    accessibility, 
    getAccessibleClasses, 
    getAccessibleStyles,
    speakText 
  } = useAccessibleComponent();


  // États pour l'accessibilité
  const [fontSize, setFontSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceSearch, setVoiceSearch] = useState(false);
  const [readAloud, setReadAloud] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [reducedMotion, setReducedMotion] = useState(false);

  // États pour les fonctionnalités
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [user, setUser] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);

  // Références
  const speechSynthesis = useRef(null);
  const recognition = useRef(null);

  // Données améliorées
  const journalOfficielData = [
    {
      id: 1,
      date: "10 septembre 2024",
      titre: "Loi n° 2024-15 sur la transformation numérique",
      type: "Loi",
      status: "Nouveau",
      downloads: 1250,
      views: 3420,
      likes: 89,
      comments: 45,
      description: "Nouvelle réglementation sur la digitalisation des services publics au Sénégal",
      urgent: false,
      tags: ["numérique", "transformation", "services publics"],
      difficulty: "Avancé",
      readingTime: "15 min"
    },
    {
      id: 2,
      date: "08 septembre 2024",
      titre: "Décret relatif à la protection de l'environnement",
      type: "Décret",
      status: "Mis à jour",
      downloads: 890,
      views: 2180,
      likes: 156,
      comments: 23,
      description: "Mesures renforcées pour la préservation de l'environnement et la biodiversité",
      urgent: true,
      tags: ["environnement", "biodiversité", "protection"],
      difficulty: "Intermédiaire",
      readingTime: "8 min"
    },
    {
      id: 3,
      date: "05 septembre 2024",
      titre: "Arrêt Cour Suprême - Droit du travail",
      type: "Jurisprudence",
      status: "",
      downloads: 650,
      views: 1560,
      likes: 203,
      comments: 67,
      description: "Décision importante concernant les droits des travailleurs et les conditions de travail",
      urgent: false,
      tags: ["travail", "droits sociaux", "jurisprudence"],
      difficulty: "Expert",
      readingTime: "12 min"
    }
  ];

  const trendingTopics = [
    { topic: "IA et droit", searches: 450, trend: "+25%", category: "Technologie", urgent: true },
    { topic: "Droit du travail", searches: 320, trend: "+8%", category: "Social", urgent: false },
    { topic: "Protection environnement", searches: 280, trend: "+22%", category: "Environnement", urgent: true },
    { topic: "Code civil", searches: 260, trend: "+5%", category: "Civil", urgent: false },
    { topic: "Fiscalité numérique", searches: 240, trend: "+18%", category: "Économie", urgent: false }
  ];

  const quickStats = [
    { label: "Documents", value: "12,547", icon: FileText, change: "+8%" },
    { label: "Utilisateurs actifs", value: "25,689", icon: Users, change: "+12%" },
    { label: "Recherches/jour", value: "95,234", icon: Search, change: "+15%" },
    { label: "Mises à jour", value: "342", icon: RefreshCw, change: "+5%" }
  ];

  // Fonctions d'accessibilité
  const changeFontSize = (size) => {
    setFontSize(size);
    document.documentElement.style.fontSize = size === 'large' ? '120%' : size === 'xlarge' ? '140%' : '100%';
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast', !highContrast);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = language;
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        handleSearch(transcript);
      };
      recognition.onend = () => setIsListening(false);
      recognition.start();
    }
  };

  const readAloudText = (text) => {
    if ('speechSynthesis' in window && soundEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      speechSynthesis.current = window.speechSynthesis;
      speechSynthesis.current.speak(utterance);
    }
  };

  // Fonctions principales
  const handleSearch = (query = searchQuery) => {
    console.log("Recherche:", { query, type: searchType, filters: activeFilters });
    if (soundEnabled) {
      new Audio('/sounds/search.mp3').play().catch(() => {});
    }
  };

  const addToFavorites = (item) => {
    setFavorites([...favorites, item]);
    if (soundEnabled) {
      new Audio('/sounds/favorite.mp3').play().catch(() => {});
    }
  };

  const shareDocument = async (doc) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: doc.titre,
          text: doc.description,
          url: window.location.href + '/document/' + doc.id
        });
      } catch (error) {
        console.log('Erreur de partage:', error);
      }
    }
  };

  // Classe CSS dynamique basée sur les préférences d'accessibilité
  const getAccessibilityClasses = () => {
    return `
      ${darkMode ? 'dark' : ''}
      ${highContrast ? 'high-contrast' : ''}
      ${reducedMotion ? 'reduce-motion' : ''}
    `;
  };

  return (
    
    <div className={`min-h-screen transition-all duration-300 ${getAccessibilityClasses()}`}>
      
      {/* Barre d'accessibilité */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Accessibility className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Accessibilité</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Taille de police */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => changeFontSize('normal')}
                className={`p-1 rounded ${fontSize === 'normal' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                aria-label="Taille normale"
              >
                <Type className="h-3 w-3" />
              </button>
              <button 
                onClick={() => changeFontSize('large')}
                className={`p-1 rounded ${fontSize === 'large' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                aria-label="Grande taille"
              >
                <Type className="h-4 w-4" />
              </button>
              <button 
                onClick={() => changeFontSize('xlarge')}
                className={`p-1 rounded ${fontSize === 'xlarge' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                aria-label="Très grande taille"
              >
                <Type className="h-5 w-5" />
              </button>
            </div>

            {/* Contraste */}
            <button 
              onClick={toggleHighContrast}
              className={`p-2 rounded-lg ${highContrast ? 'bg-yellow-500 text-black' : 'text-gray-600 hover:bg-gray-100'}`}
              aria-label="Basculer le contraste élevé"
            >
              <Contrast className="h-4 w-4" />
            </button>

            {/* Mode sombre */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Basculer le mode sombre"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Son */}
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300"
              aria-label="Basculer le son"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {/* Langues */}
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-2 py-1"
              aria-label="Choisir la langue"
            >
              <option value="fr">🇫🇷 Français</option>
              <option value="wo">🇸🇳 Wolof</option>
              <option value="en">🇬🇧 English</option>
              <option value="ar">🇸🇦 العربية</option>
            </select>
          </div>
        </div>
      </div>

     
   

      {/* Contenu principal */}
      <main className="pt-28 pb-8">
     <HeroSection/>

        {/* Statistiques en temps réel */}
        <section className="py-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, idx) => (
                <div 
                  key={idx}
                  className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                      <stat.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section principale avec contenu */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Journal Officiel amélioré */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Journal Officiel</h2>
                      <p className="text-gray-600 dark:text-gray-400">Dernières publications officielles</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" aria-label="Actualiser">
                        <RefreshCw className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" aria-label="Filtrer">
                        <Filter className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {journalOfficielData.map((doc) => (
                      <article 
                        key={doc.id}
                        className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all border border-gray-200 dark:border-gray-600 group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                              <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{doc.date}</span>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                  doc.type === 'Loi' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                  doc.type === 'Décret' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                }`}>
                                  {doc.type}
                                </span>
                                {doc.urgent && (
                                  <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs rounded-full font-medium flex items-center">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Urgent
                                  </span>
                                )}
                                {doc.status && (
                                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs rounded-full font-medium">
                                    {doc.status}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => readAloudText(doc.titre)}
                              className="p-2 text-gray-400 hover:text-green-600 transition-colors group-hover:opacity-100 opacity-0"
                              aria-label="Lire à voix haute"
                            >
                              <Volume2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => addToFavorites(doc)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Ajouter aux favoris"
                            >
                              <Heart className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => shareDocument(doc)}
                              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                              aria-label="Partager"
                            >
                              <Share2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                          {doc.titre}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                          {doc.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {doc.tags?.map((tag, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-300 cursor-pointer transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{doc.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Download className="h-4 w-4" />
                              <span>{doc.downloads.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{doc.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{doc.comments}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{doc.readingTime}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              doc.difficulty === 'Débutant' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              doc.difficulty === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {doc.difficulty}
                            </span>
                            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all hover:shadow-lg flex items-center space-x-2">
                              <span>Lire</span>
                              <ArrowUpRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all hover:shadow-lg transform hover:-translate-y-1 flex items-center space-x-2 mx-auto">
                      <span>Voir tous les documents</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar améliorée */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Tendances intelligentes */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center mb-6">
                    <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg mr-3">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Tendances IA</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Analyse prédictive</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {trendingTopics.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all border border-gray-200 dark:border-gray-600 group cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {item.urgent && (
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            )}
                            <span className="font-medium text-gray-800 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                              {item.topic}
                            </span>
                          </div>
                          <Zap className={`h-4 w-4 ${item.urgent ? 'text-red-500' : 'text-yellow-500'} group-hover:scale-110 transition-transform`} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {item.searches.toLocaleString()} recherches
                          </span>
                          <span className={`text-sm font-semibold ${
                            parseInt(item.trend.replace('%', '').replace('+', '')) > 15 ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            {item.trend}
                          </span>
                        </div>
                        
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-400">{item.category}</span>
                            <span className="text-xs text-gray-400">Score IA: {Math.floor(Math.random() * 40) + 60}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                            <div 
                              className={`h-1 rounded-full transition-all duration-1000 ${
                                item.urgent ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-green-500 to-blue-500'
                              }`}
                              style={{ width: `${Math.floor(Math.random() * 60) + 40}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 text-center">
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center group">
                      <Activity className="h-4 w-4 mr-1" />
                      Analyse complète IA
                      <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Assistant IA */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-6 border border-blue-200 dark:border-gray-600">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg mr-3">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Assistant IA</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">SunuBot Juridique</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 border border-blue-200 dark:border-gray-600">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">AI</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          Bonjour ! Je peux vous aider à :
                        </p>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Résumer des textes juridiques</li>
                          <li>• Expliquer des concepts complexes</li>
                          <li>• Trouver des jurisprudences</li>
                          <li>• Analyser des contradictions</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Posez votre question juridique..."
                      className="flex-1 px-3 py-2 border border-blue-200 dark:border-gray-600 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:text-white"
                    />
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                      <span className="sr-only">Envoyer</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Résumer", "Expliquer", "Comparer", "Analyser"].map((action) => (
                      <button
                        key={action}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calendrier intelligent */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center mb-6">
                    <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg mr-3">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Agenda Juridique</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Événements à venir</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        date: "15 Sept",
                        title: "Session parlementaire",
                        time: "09:00",
                        type: "parliamentary",
                        participants: 125,
                        importance: "high"
                      },
                      {
                        date: "20 Sept", 
                        title: "Publication JO",
                        time: "14:00",
                        type: "publication",
                        participants: 45,
                        importance: "medium"
                      },
                      {
                        date: "22 Sept",
                        title: "Débat Code du travail",
                        time: "10:30",
                        type: "debate",
                        participants: 89,
                        importance: "high"
                      }
                    ].map((event, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                          event.importance === 'high' ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' :
                          'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold text-gray-800 dark:text-white">{event.date}</span>
                            {event.importance === 'high' && (
                              <AlertTriangle className="h-3 w-3 text-red-500" />
                            )}
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Users className="h-3 w-3" />
                            <span>{event.participants}</span>
                          </div>
                        </div>
                        
                        <p className="font-medium text-sm text-gray-800 dark:text-white mb-1">{event.title}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{event.time}</span>
                          </div>
                          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                            Détails
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Voir l'agenda complet</span>
                    </button>
                  </div>
                </div>

                {/* Raccourcis rapides */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Accès Rapide</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: BookOpen, label: "Codes", color: "bg-blue-500", count: "2,847" },
                      { icon: Scale, label: "Jurisprudence", color: "bg-green-500", count: "1,523" },
                      { icon: FileText, label: "Constitution", color: "bg-red-500", count: "1" },
                      { icon: Shield, label: "Décrets", color: "bg-yellow-500", count: "432" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all group border border-gray-200 dark:border-gray-600"
                      >
                        <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-sm font-medium text-gray-800 dark:text-white">{item.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.count} docs</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section d'accès rapide révolutionnaire */}
        <section className="py-16 bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Explorez le Droit Sénégalais
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Découvrez nos collections organisées avec intelligence artificielle
              </p>
            </div>

            {/* Catégories principales avec animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { 
                  icon: BookOpen, 
                  title: "Codes", 
                  count: "2,847",
                  desc: "Textes législatifs consolidés",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "bg-blue-50 dark:bg-blue-900/20",
                  updated: "Mis à jour il y a 3h"
                },
                { 
                  icon: Scale, 
                  title: "Jurisprudence", 
                  count: "1,523",
                  desc: "Décisions de justice analysées",
                  color: "from-green-500 to-green-600",
                  bgColor: "bg-green-50 dark:bg-green-900/20",
                  updated: "Nouvelle décision il y a 1h"
                },
                { 
                  icon: Gavel, 
                  title: "Lois", 
                  count: "856",
                  desc: "Lois en vigueur",
                  color: "from-purple-500 to-purple-600",
                  bgColor: "bg-purple-50 dark:bg-purple-900/20",
                  updated: "3 nouvelles cette semaine"
                },
                { 
                  icon: FileText, 
                  title: "Constitution", 
                  count: "1",
                  desc: "Texte fondamental",
                  color: "from-red-500 to-red-600",
                  bgColor: "bg-red-50 dark:bg-red-900/20",
                  updated: "Version consolidée 2024"
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer"
                >
                  <div className={`absolute inset-0 ${item.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  <div className="relative p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                          {item.title}
                        </h3>
                        <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 group-hover:scale-110 transition-all duration-200" />
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-600">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color} mr-2 animate-pulse`}></div>
                          <span className="text-2xl font-bold text-gray-800 dark:text-white">
                            {item.count}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.updated}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center text-green-600 dark:text-green-400 font-semibold group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                      <span>Explorer</span>
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA révolutionnaire */}
            <div className="mt-16 bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-3xl p-12 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 animate-pulse"></div>
              <div className="relative">
                <h3 className="text-4xl font-bold mb-6">
                  Révolutionnez Votre Pratique Juridique
                </h3>
                <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Rejoignez plus de 25,000 professionnels du droit qui utilisent SunuLoi pour transformer leur pratique
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-all duration-200 transform hover:scale-105 hover:shadow-2xl group">
                    <Zap className="h-5 w-5 mr-2 group-hover:text-yellow-500 transition-colors" />
                    Commencer gratuitement
                    <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="inline-flex items-center px-8 py-4 border-2 border-white border-opacity-50 hover:border-opacity-100 text-white rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm hover:bg-white hover:bg-opacity-10">
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Découvrir les fonctionnalités
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  {[
                    { value: "99.9%", label: "Disponibilité" },
                    { value: "< 0.5s", label: "Recherche" },
                    { value: "25k+", label: "Utilisateurs" },
                    { value: "24/7", label: "Support IA" }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="text-2xl font-bold text-yellow-300">{stat.value}</div>
                      <div className="text-sm text-green-100">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer moderne */}
      <Footer/>

      {/* Widget d'accessibilité flottant */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 group"
          aria-label="Options d'accessibilité"
          onClick={() => document.querySelector('[data-accessibility-panel]')?.classList.toggle('hidden')}
        >
          <Accessibility className="h-6 w-6 group-hover:animate-spin" />
        </button>
        
        <div 
          data-accessibility-panel
          className="hidden absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Options d'accessibilité</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Lecture audio</span>
              <button 
                onClick={() => setReadAloud(!readAloud)}
                className={`w-12 h-6 rounded-full transition-colors ${readAloud ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${readAloud ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Mouvement réduit</span>
              <button 
                onClick={() => setReducedMotion(!reducedMotion)}
                className={`w-12 h-6 rounded-full transition-colors ${reducedMotion ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${reducedMotion ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
            
            <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
              Plus d'options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunuLoiHome;