import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  BookOpen,
  Search,
  Download,
  Eye,
  Share2,
  Bookmark,
  Filter,
  Calendar,
  Clock,
  Users,
  Scale,
  ChevronDown,
  ChevronRight,
  FileText,
  Star,
  Tag,
  Menu,
  X,
  User,
  Bell,
  Settings,
  Zap,
  Shield,
  Flag,
  Sparkles,
  Award,
  AlertCircle,
  Home
} from "lucide-react";
import Footer from "../components/Footer";

export default function Constitution() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [viewMode, setViewMode] = useState("structured");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Structure de la Constitution sénégalaise
  const constitutionStructure = [
    {
      id: "preambule",
      title: "Préambule",
      articles: [],
      content: "Le peuple sénégalais souverain, profondément attaché à ses valeurs culturelles fondamentales qui constituent le ciment de l'unité nationale, affirme solennellement son attachement aux droits de l'Homme et aux libertés fondamentales tels qu'ils ont été définis par la Déclaration des Droits de l'Homme et du Citoyen de 1789 et la Déclaration Universelle des Droits de l'Homme de 1948...",
      color: "amber",
      icon: Flag
    },
    {
      id: "titre1",
      title: "TITRE PREMIER - DE L'ÉTAT ET DE LA SOUVERAINETÉ",
      color: "green",
      icon: Shield,
      articles: [
        {
          id: "art1",
          number: "Article 1er",
          content: "La République du Sénégal est laïque, démocratique et sociale. Elle assure l'égalité devant la loi de tous les citoyens, sans distinction d'origine, de race, de sexe, de religion. Elle respecte toutes les croyances.",
          keywords: ["laïque", "démocratique", "sociale", "égalité", "citoyens"]
        },
        {
          id: "art2",
          number: "Article 2",
          content: "La langue officielle de la République du Sénégal est le français. Les langues nationales sont le diola, le malinké, le poular, le sérère, le soninké, le wolof et toute autre langue nationale qui sera codifiée.",
          keywords: ["langue officielle", "français", "langues nationales", "wolof", "diola"]
        },
        {
          id: "art3",
          number: "Article 3",
          content: "La souveraineté nationale appartient au peuple sénégalais qui l'exerce par ses représentants ou par la voie du référendum. Aucune section du peuple, ni aucun individu, ne peut s'en attribuer l'exercice.",
          keywords: ["souveraineté", "peuple", "représentants", "référendum"]
        }
      ]
    },
    {
      id: "titre2",
      title: "TITRE II - DES LIBERTÉS PUBLIQUES ET DE LA PERSONNE HUMAINE",
      color: "blue",
      icon: Users,
      articles: [
        {
          id: "art7",
          number: "Article 7",
          content: "La personne humaine est sacrée. Elle est inviolable. L'État a l'obligation de la respecter et de la protéger. Tout individu a droit à la vie, à la liberté, à la sécurité, au libre développement de sa personnalité...",
          keywords: ["personne humaine", "inviolable", "droit à la vie", "liberté", "sécurité"]
        },
        {
          id: "art8",
          number: "Article 8",
          content: "La République du Sénégal garantit à tous les citoyens les libertés individuelles fondamentales, notamment : la liberté d'opinion et d'expression, la liberté de presse, la liberté d'association, de réunion et de manifestation...",
          keywords: ["libertés individuelles", "opinion", "expression", "presse", "association"]
        },
        {
          id: "art22",
          number: "Article 22",
          content: "L'État a le devoir et la charge de l'éducation et de la formation de la jeunesse par des écoles publiques. Tous les enfants, garçons et filles, en tous lieux du territoire national, ont le droit d'accéder à l'école.",
          keywords: ["éducation", "formation", "jeunesse", "écoles publiques", "droit d'accès"]
        }
      ]
    },
    {
      id: "titre3",
      title: "TITRE III - DU POUVOIR EXÉCUTIF",
      color: "red",
      icon: Award,
      articles: [
        {
          id: "art42",
          number: "Article 42",
          content: "Le Président de la République est le Chef de l'État. Il est le gardien de la Constitution. Il incarne l'unité nationale. Il est garant de l'indépendance nationale, de l'intégrité du territoire et du respect des traités et accords internationaux.",
          keywords: ["Président", "Chef d'État", "gardien Constitution", "unité nationale"]
        },
        {
          id: "art103",
          number: "Article 103",
          content: "Le mandat du Président de la République est de cinq ans. Il est renouvelable une seule fois. En aucun cas, nul ne peut exercer plus de deux mandats consécutifs.",
          keywords: ["mandat", "cinq ans", "renouvelable", "deux mandats"]
        }
      ]
    },
    {
      id: "titre4",
      title: "TITRE IV - DU POUVOIR LÉGISLATIF",
      color: "purple",
      icon: Scale,
      articles: [
        {
          id: "art60",
          number: "Article 60",
          content: "Le pouvoir législatif est exercé par une Assemblée qui prend le nom d'Assemblée nationale. Les membres de l'Assemblée nationale portent le titre de Député.",
          keywords: ["pouvoir législatif", "Assemblée nationale", "Député"]
        },
        {
          id: "art61",
          number: "Article 61",
          content: "Les Députés sont élus au suffrage universel direct. La durée de leur mandat est de cinq ans. Ils sont rééligibles.",
          keywords: ["Députés", "suffrage universel", "mandat", "cinq ans", "rééligibles"]
        }
      ]
    },
    {
      id: "titre5",
      title: "TITRE V - DU POUVOIR JUDICIAIRE",
      color: "indigo",
      icon: Scale,
      articles: [
        {
          id: "art88",
          number: "Article 88",
          content: "Le pouvoir judiciaire est indépendant du pouvoir législatif et du pouvoir exécutif. Il est gardé par le Président de la République assisté du Conseil supérieur de la magistrature.",
          keywords: ["pouvoir judiciaire", "indépendant", "magistrature"]
        }
      ]
    }
  ];

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = [];
    constitutionStructure.forEach(section => {
      if (section.title.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          type: 'section',
          section: section,
          match: section.title
        });
      }
      
      section.articles?.forEach(article => {
        if (article.content.toLowerCase().includes(query.toLowerCase()) ||
            article.keywords?.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))) {
          results.push({
            type: 'article',
            section: section,
            article: article,
            match: article.content
          });
        }
      });

      if (section.content && section.content.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          type: 'content',
          section: section,
          match: section.content
        });
      }
    });

    setSearchResults(results);
  };

  const toggleBookmark = (articleId) => {
    if (!checkAuth()) return;
    
    setBookmarks(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const checkAuth = () => {
    setShowLoginModal(true);
    return false;
  };

  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={index} className="bg-yellow-200 text-gray-900 rounded px-1">{part}</mark>
        : part
    );
  };

  const colors = {
    green: { bg: "from-green-500 to-green-600", text: "text-green-700", border: "border-green-200", light: "bg-green-50" },
    amber: { bg: "from-amber-500 to-yellow-500", text: "text-amber-700", border: "border-amber-200", light: "bg-amber-50" },
    blue: { bg: "from-blue-500 to-blue-600", text: "text-blue-700", border: "border-blue-200", light: "bg-blue-50" },
    red: { bg: "from-red-500 to-red-600", text: "text-red-700", border: "border-red-200", light: "bg-red-50" },
    purple: { bg: "from-purple-500 to-purple-600", text: "text-purple-700", border: "border-purple-200", light: "bg-purple-50" },
    indigo: { bg: "from-indigo-500 to-indigo-600", text: "text-indigo-700", border: "border-indigo-200", light: "bg-indigo-50" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50/30 to-green-100/50">
      {/* Header avec thème national */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/85 border-b border-green-200/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.history.back()}
                className="p-2 rounded-xl hover:bg-green-100/50 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-green-700" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-600 to-yellow-500 rounded-xl shadow-lg">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-700 to-yellow-600 bg-clip-text text-transparent">
                    Sunu Loi
                  </h1>
                  <p className="text-xs text-green-600 font-medium">Constitution du Sénégal</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-xl hover:bg-green-100/50 transition-all duration-300 relative">
                <Bell className="w-5 h-5 text-green-700" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></div>
              </button>
              <button className="p-2.5 rounded-xl hover:bg-green-100/50 transition-all duration-300">
                <User className="w-5 h-5 text-green-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section avec couleurs nationales */}
      <section className="relative bg-gradient-to-r from-green-600 via-green-700 to-yellow-600 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.06&quot;%3E%3Cpolygon points=&quot;30,10 50,50 10,50&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Flag className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-medium">Loi fondamentale de la République</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-8 tracking-tight">
            Constitution du Sénégal
            <span className="block text-yellow-300 text-2xl sm:text-4xl mt-4">République démocratique et sociale</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-10 leading-relaxed">
            Adoptée par référendum le 7 janvier 2001, révisée par la loi constitutionnelle n°2016-10 du 5 avril 2016. 
            Texte fondamental qui organise les pouvoirs publics et garantit les droits des citoyens.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4">
              <Calendar className="w-6 h-6 text-yellow-300" />
              <div className="text-left">
                <div className="text-lg font-bold text-white">7 janvier 2001</div>
                <div className="text-white/80 text-sm">Date d'adoption</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4">
              <FileText className="w-6 h-6 text-yellow-300" />
              <div className="text-left">
                <div className="text-lg font-bold text-white">104</div>
                <div className="text-white/80 text-sm">Articles</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4">
              <Eye className="w-6 h-6 text-yellow-300" />
              <div className="text-left">
                <div className="text-lg font-bold text-white">45,672</div>
                <div className="text-white/80 text-sm">Consultations</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={checkAuth}
              className="flex items-center gap-3 px-8 py-4 bg-white text-green-700 rounded-2xl font-bold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl"
            >
              <Download className="w-6 h-6" />
              Télécharger PDF officiel
            </button>
            <button
              onClick={checkAuth}
              className="flex items-center gap-3 px-8 py-4 bg-white/20 text-white border-2 border-white/30 rounded-2xl font-bold hover:bg-white/30 transition-all backdrop-blur-sm"
            >
              <Share2 className="w-6 h-6" />
              Partager
            </button>
          </div>
        </div>
      </section>

      {/* Barre de recherche modernisée */}
      <section className="relative -mt-12 max-w-6xl mx-auto px-4 z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-green-600 group-focus-within:text-green-700 transition-colors" />
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                className="w-full pl-16 pr-6 py-4 rounded-2xl border-2 border-green-100 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-lg placeholder-green-400"
                placeholder="Rechercher dans la Constitution (article, mot-clé, concept...)"
              />
            </div>
            
            <div className="flex gap-4">
              <select className="px-6 py-4 rounded-2xl border-2 border-green-100 focus:border-green-500 outline-none text-green-800 font-medium bg-white min-w-48">
                <option value="">Tous les titres</option>
                <option value="titre1">Titre I - État et Souveraineté</option>
                <option value="titre2">Titre II - Libertés et Droits</option>
                <option value="titre3">Titre III - Pouvoir Exécutif</option>
                <option value="titre4">Titre IV - Pouvoir Législatif</option>
                <option value="titre5">Titre V - Pouvoir Judiciaire</option>
              </select>
              
              <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-2xl hover:shadow-2xl transition-all flex items-center gap-3 font-bold hover:scale-105">
                <Filter className="w-5 h-5" />
                Filtrer
              </button>
            </div>
          </div>

          {/* Résultats de recherche modernisés */}
          {searchResults.length > 0 && (
            <div className="mt-8 border-t border-green-100 pt-8">
              <h3 className="font-bold text-green-800 mb-6 text-xl">
                {searchResults.length} résultat(s) trouvé(s)
              </h3>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="group p-6 bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl hover:shadow-lg cursor-pointer transition-all duration-300 border border-green-200 hover:border-green-300"
                    onClick={() => {
                      if (result.article) {
                        setSelectedChapter(result.section.id);
                        setSelectedArticle(result.article.id);
                      } else {
                        setSelectedChapter(result.section.id);
                      }
                      setSearchResults([]);
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${colors[result.section.color]?.bg || colors.green.bg}`}>
                        <result.section.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-green-800 mb-2 text-lg">
                          {result.section.title}
                          {result.article && ` - ${result.article.number}`}
                        </div>
                        <div className="text-green-700 leading-relaxed">
                          {highlightText(
                            result.match.substring(0, 200) + (result.match.length > 200 ? '...' : ''),
                            searchQuery
                          )}
                        </div>
                        {result.article?.keywords && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {result.article.keywords.slice(0, 3).map((keyword, i) => (
                              <span key={i} className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sommaire modernisé */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl shadow-xl p-8 border border-green-100/50">
              <h3 className="font-bold text-green-800 mb-8 text-2xl flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-green-600" />
                Sommaire
              </h3>
              
              <div className="space-y-3">
                {constitutionStructure.map((section) => {
                  const IconComponent = section.icon || BookOpen;
                  const colorScheme = colors[section.color] || colors.green;
                  
                  return (
                    <div key={section.id}>
                      <button
                        onClick={() => setSelectedChapter(selectedChapter === section.id ? null : section.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 hover:scale-105 ${
                          selectedChapter === section.id 
                            ? `bg-gradient-to-r ${colorScheme.light} ${colorScheme.text} border-2 ${colorScheme.border} shadow-lg` 
                            : 'hover:bg-green-50 text-green-700 border-2 border-transparent hover:border-green-200'
                        }`}
                      >
                        <div className={`p-3 rounded-xl ${selectedChapter === section.id ? `bg-gradient-to-br ${colorScheme.bg}` : 'bg-green-100'}`}>
                          <IconComponent className={`w-5 h-5 ${selectedChapter === section.id ? 'text-white' : 'text-green-600'}`} />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold line-clamp-3 text-sm">{section.title}</span>
                          {section.articles?.length > 0 && (
                            <div className="text-xs text-green-600 mt-1 font-medium">
                              {section.articles.length} article{section.articles.length > 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                        {section.articles?.length > 0 && (
                          selectedChapter === section.id ? 
                            <ChevronDown className="w-5 h-5 flex-shrink-0" /> : 
                            <ChevronRight className="w-5 h-5 flex-shrink-0" />
                        )}
                      </button>
                      
                      {selectedChapter === section.id && section.articles?.length > 0 && (
                        <div className="ml-8 mt-3 space-y-2">
                          {section.articles.map((article) => (
                            <button
                              key={article.id}
                              onClick={() => setSelectedArticle(article.id)}
                              className={`w-full text-left p-3 rounded-xl text-sm transition-all duration-300 hover:scale-105 ${
                                selectedArticle === article.id
                                  ? 'bg-green-200 text-green-900 font-bold shadow-md'
                                  : 'hover:bg-green-100 text-green-700 font-medium'
                              }`}
                            >
                              {article.number}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contenu principal modernisé */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl border border-green-100/50 overflow-hidden">
              {/* En-tête avec options d'affichage */}
              <div className="bg-gradient-to-r from-green-50 to-yellow-50 border-b border-green-100 p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-yellow-500 rounded-2xl">
                      <Flag className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-green-800">
                        {selectedChapter ? 
                          constitutionStructure.find(s => s.id === selectedChapter)?.title : 
                          "Constitution de la République du Sénégal"
                        }
                      </h2>
                      <p className="text-green-600 font-medium">Texte officiel en vigueur</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setViewMode('structured')}
                      className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                        viewMode === 'structured' 
                          ? 'bg-green-500 text-white shadow-lg' 
                          : 'bg-white text-green-700 hover:bg-green-100 border-2 border-green-200'
                      }`}
                    >
                      Vue structurée
                    </button>
                    <button
                      onClick={() => setViewMode('article')}
                      className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                        viewMode === 'article' 
                          ? 'bg-green-500 text-white shadow-lg' 
                          : 'bg-white text-green-700 hover:bg-green-100 border-2 border-green-200'
                      }`}
                    >
                      Article par article
                    </button>
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-8">
                {!selectedChapter ? (
                  // Vue d'ensemble modernisée
                  <div className="space-y-12">
                    <div className="text-center py-12">
                      <div className="bg-gradient-to-br from-green-100 to-yellow-100 rounded-full p-12 w-40 h-40 mx-auto mb-8 flex items-center justify-center">
                        <Flag className="w-20 h-20 text-green-600" />
                      </div>
                      <h3 className="text-3xl font-bold text-green-800 mb-6">
                        Constitution de la République du Sénégal
                      </h3>
                      <p className="text-green-700 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
                        Sélectionnez un titre dans le sommaire pour commencer votre consultation 
                        ou utilisez la recherche pour trouver un article spécifique.
                      </p>
                      
                      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-3xl p-8 max-w-lg mx-auto">
                        <div className="flex items-center justify-center gap-3 text-yellow-800 mb-4">
                          <Sparkles className="w-8 h-8" />
                          <span className="font-bold text-xl">Texte Authentique</span>
                        </div>
                        <p className="text-yellow-700 text-lg leading-relaxed">
                          Version officielle publiée au Journal Officiel de la République du Sénégal
                        </p>
                      </div>
                    </div>
                    
                    {/* Grille des titres modernisée */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {constitutionStructure.slice(1).map((section) => {
                        const IconComponent = section.icon || BookOpen;
                        const colorScheme = colors[section.color] || colors.green;
                        
                        return (
                          <div
                            key={section.id}
                            className="group p-8 border-2 border-green-200 rounded-3xl hover:border-green-400 hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gradient-to-br from-white to-green-50/50 hover:from-green-50 hover:to-yellow-50"
                            onClick={() => setSelectedChapter(section.id)}
                          >
                            <div className="flex items-start gap-6">
                              <div className={`p-4 rounded-2xl bg-gradient-to-br ${colorScheme.bg} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                <IconComponent className="w-8 h-8 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-green-800 mb-3 line-clamp-2 text-xl group-hover:text-green-600 transition-colors">
                                  {section.title}
                                </h4>
                                <p className="text-green-600 text-sm mb-4 font-semibold">
                                  {section.articles?.length || 0} article{(section.articles?.length || 0) > 1 ? 's' : ''} disponible{(section.articles?.length || 0) > 1 ? 's' : ''}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-green-700 font-bold flex items-center gap-2">
                                    Consulter 
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                  </span>
                                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                    {section.color.toUpperCase()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // Affichage du contenu sélectionné
                  <div className="space-y-8">
                    {selectedChapter === 'preambule' ? (
                      // Affichage spécial pour le préambule
                      <div className="p-8 rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
                        <div className="flex items-start justify-between mb-6">
                          <h4 className="text-3xl font-bold text-amber-800 flex items-center gap-3">
                            <Flag className="w-8 h-8" />
                            Préambule
                          </h4>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleBookmark('preambule')}
                              className="p-3 rounded-2xl hover:bg-amber-100 transition-all duration-300 hover:scale-110"
                              title="Ajouter aux favoris"
                            >
                              <Bookmark className={`w-6 h-6 ${
                                bookmarks.includes('preambule') 
                                  ? 'text-yellow-600 fill-yellow-600' 
                                  : 'text-amber-600'
                              }`} />
                            </button>
                            <button
                              onClick={checkAuth}
                              className="p-3 rounded-2xl hover:bg-amber-100 transition-all duration-300 hover:scale-110"
                              title="Partager"
                            >
                              <Share2 className="w-6 h-6 text-amber-600" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="prose max-w-none">
                          <p className="text-amber-800 leading-relaxed text-lg">
                            {highlightText(constitutionStructure.find(s => s.id === 'preambule')?.content || '', searchQuery)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      // Articles du titre sélectionné
                      constitutionStructure
                        .find(s => s.id === selectedChapter)?.articles
                        ?.map((article) => (
                          <div
                            key={article.id}
                            className={`p-8 rounded-3xl border-2 transition-all duration-300 hover:shadow-xl ${
                              selectedArticle === article.id
                                ? 'border-green-400 bg-gradient-to-br from-green-100 to-yellow-100 shadow-lg'
                                : 'border-green-200 hover:border-green-300 bg-gradient-to-br from-white to-green-50/30'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-6">
                              <h4 className="text-2xl font-bold text-green-800 flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                {article.number}
                              </h4>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => toggleBookmark(article.id)}
                                  className="p-3 rounded-2xl hover:bg-green-100 transition-all duration-300 hover:scale-110"
                                  title="Ajouter aux favoris"
                                >
                                  <Bookmark className={`w-6 h-6 ${
                                    bookmarks.includes(article.id) 
                                      ? 'text-yellow-600 fill-yellow-600' 
                                      : 'text-green-600'
                                  }`} />
                                </button>
                                <button
                                  onClick={checkAuth}
                                  className="p-3 rounded-2xl hover:bg-green-100 transition-all duration-300 hover:scale-110"
                                  title="Partager"
                                >
                                  <Share2 className="w-6 h-6 text-green-600" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="prose max-w-none mb-6">
                              <p className="text-green-800 leading-relaxed text-lg">
                                {highlightText(article.content, searchQuery)}
                              </p>
                            </div>

                            {/* Mots-clés */}
                            {article.keywords && (
                              <div className="flex flex-wrap gap-2">
                                <span className="text-green-700 font-semibold text-sm mr-2">Mots-clés :</span>
                                {article.keywords.map((keyword, i) => (
                                  <span key={i} className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium border border-green-300">
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de connexion modernisée */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-green-200">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-br from-green-100 to-yellow-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <User className="w-10 h-10 text-green-700" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Accès Premium</h3>
              <p className="text-green-700 leading-relaxed">
                Cette fonctionnalité nécessite une connexion pour accéder aux fonctionnalités 
                avancées de consultation et de sauvegarde.
              </p>
            </div>

            <div className="space-y-4">
              <button className="w-full py-4 bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
                Se connecter
              </button>
              <button className="w-full py-4 border-2 border-green-300 text-green-700 rounded-2xl font-bold hover:bg-green-50 transition-all duration-300 hover:scale-105">
                Créer un compte citoyen
              </button>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="w-full py-4 text-green-600 hover:text-green-700 transition-colors font-semibold"
              >
                Continuer la consultation
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl border border-green-200">
              <p className="text-green-700 text-sm text-center font-medium">
                🇸🇳 République du Sénégal - Texte officiel authentifié
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}