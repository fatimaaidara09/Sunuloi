import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  FileText,
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
  Star,
  Tag,
  Menu,
  X,
  User,
  Bell,
  Settings,
  Grid,
  List,
  TrendingUp,
  BookOpen,
  Briefcase,
  Home,
  Heart,
  Shield,
  Gavel,
  Building,
  Truck,
  Globe,
  Sparkles,
  Award,
  AlertCircle
} from "lucide-react";

export default function Codes() {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCode, setSelectedCode] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [filteredCodes, setFilteredCodes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  // Base de données des codes adaptée au Sénégal
  const codes = [
    {
      id: "code-travail-sn",
      name: "Code du Travail",
      category: "Social",
      icon: Briefcase,
      color: "emerald",
      description: "Réglementation des relations de travail au Sénégal, droits et obligations des employeurs et travailleurs",
      articles: 425,
      lastUpdate: "2024-12-15",
      views: 15420,
      downloads: 892,
      isPopular: true,
      isNew: false,
      books: [
        { id: "livre1", title: "Livre I - Dispositions générales", articles: 45 },
        { id: "livre2", title: "Livre II - Relations individuelles de travail", articles: 178 },
        { id: "livre3", title: "Livre III - Relations collectives de travail", articles: 89 },
        { id: "livre4", title: "Livre IV - Hygiène et sécurité au travail", articles: 67 },
        { id: "livre5", title: "Livre V - Contrôle et sanctions", articles: 46 }
      ]
    },
    {
      id: "code-civil-sn",
      name: "Code Civil Sénégalais",
      category: "Civil",
      icon: Home,
      color: "amber",
      description: "Droit des personnes, de la famille, des biens et des obligations selon le droit sénégalais",
      articles: 892,
      lastUpdate: "2024-11-28",
      views: 12350,
      downloads: 567,
      isPopular: true,
      isNew: false,
      books: [
        { id: "livre1", title: "Livre I - Des personnes", articles: 234 },
        { id: "livre2", title: "Livre II - Des biens et propriété", articles: 178 },
        { id: "livre3", title: "Livre III - Des obligations et contrats", articles: 345 },
        { id: "livre4", title: "Livre IV - Des sûretés", articles: 135 }
      ]
    },
    {
      id: "code-penal-sn",
      name: "Code Pénal",
      category: "Pénal",
      icon: Shield,
      color: "red",
      description: "Infractions, peines et procédures pénales en République du Sénégal",
      articles: 567,
      lastUpdate: "2024-10-12",
      views: 9876,
      downloads: 743,
      isPopular: true,
      isNew: false,
      books: [
        { id: "livre1", title: "Livre I - Dispositions générales", articles: 123 },
        { id: "livre2", title: "Livre II - Des crimes et délits", articles: 289 },
        { id: "livre3", title: "Livre III - Des contraventions", articles: 155 }
      ]
    },
    {
      id: "code-procedure-penale",
      name: "Code de Procédure Pénale",
      category: "Procédure",
      icon: Gavel,
      color: "purple",
      description: "Organisation judiciaire pénale et procédures au Sénégal",
      articles: 743,
      lastUpdate: "2024-12-01",
      views: 7654,
      downloads: 432,
      isPopular: false,
      isNew: true,
      books: [
        { id: "livre1", title: "Livre I - Dispositions communes", articles: 156 },
        { id: "livre2", title: "Livre II - Procédure d'instruction", articles: 345 },
        { id: "livre3", title: "Livre III - Jugement et voies de recours", articles: 242 }
      ]
    },
    {
      id: "code-commerce-sn",
      name: "Code de Commerce OHADA",
      category: "Commercial",
      icon: Building,
      color: "blue",
      description: "Droit commercial harmonisé OHADA applicable au Sénégal",
      articles: 456,
      lastUpdate: "2024-08-15",
      views: 6543,
      downloads: 321,
      isPopular: false,
      isNew: false,
      books: [
        { id: "livre1", title: "Livre I - Du commerce en général", articles: 145 },
        { id: "livre2", title: "Livre II - Des sociétés commerciales", articles: 198 },
        { id: "livre3", title: "Livre III - Des procédures collectives", articles: 113 }
      ]
    },
    {
      id: "code-famille-sn",
      name: "Code de la Famille",
      category: "Civil",
      icon: Heart,
      color: "pink",
      description: "Mariage, divorce, filiation et succession selon le droit sénégalais",
      articles: 389,
      lastUpdate: "2024-07-03",
      views: 8901,
      downloads: 654,
      isPopular: true,
      isNew: false,
      books: [
        { id: "livre1", title: "Livre I - Du mariage", articles: 134 },
        { id: "livre2", title: "Livre II - De la filiation", articles: 89 },
        { id: "livre3", title: "Livre III - Des successions", articles: 166 }
      ]
    },
    {
      id: "code-route-sn",
      name: "Code de la Route",
      category: "Transport",
      icon: Truck,
      color: "orange",
      description: "Circulation routière, permis de conduire et infractions au Sénégal",
      articles: 234,
      lastUpdate: "2024-11-20",
      views: 11234,
      downloads: 876,
      isPopular: true,
      isNew: true,
      books: [
        { id: "livre1", title: "Livre I - Circulation routière", articles: 98 },
        { id: "livre2", title: "Livre II - Véhicules et conducteurs", articles: 78 },
        { id: "livre3", title: "Livre III - Infractions et sanctions", articles: 58 }
      ]
    },
    {
      id: "code-environnement-sn",
      name: "Code de l'Environnement",
      category: "Environnement",
      icon: Globe,
      color: "green",
      description: "Protection environnementale et développement durable au Sénégal",
      articles: 198,
      lastUpdate: "2024-05-22",
      views: 3456,
      downloads: 234,
      isPopular: false,
      isNew: false,
      books: [
        { id: "livre1", title: "Livre I - Principes généraux", articles: 67 },
        { id: "livre2", title: "Livre II - Protection des ressources", articles: 89 },
        { id: "livre3", title: "Livre III - Prévention des pollutions", articles: 42 }
      ]
    }
  ];

  const categories = [
    { id: "", name: "Tous les codes", count: codes.length },
    { id: "Civil", name: "Droit Civil", count: codes.filter(c => c.category === "Civil").length },
    { id: "Pénal", name: "Droit Pénal", count: codes.filter(c => c.category === "Pénal").length },
    { id: "Social", name: "Droit Social", count: codes.filter(c => c.category === "Social").length },
    { id: "Commercial", name: "Droit Commercial", count: codes.filter(c => c.category === "Commercial").length },
    { id: "Procédure", name: "Procédure", count: codes.filter(c => c.category === "Procédure").length },
    { id: "Transport", name: "Transport", count: codes.filter(c => c.category === "Transport").length },
    { id: "Environnement", name: "Environnement", count: codes.filter(c => c.category === "Environnement").length }
  ];

  // Filtrage et tri des codes
  useEffect(() => {
    let filtered = codes;

    if (selectedCategory) {
      filtered = filtered.filter(code => code.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(code => 
        code.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        code.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "articles":
          return b.articles - a.articles;
        case "views":
          return b.views - a.views;
        case "date":
          return new Date(b.lastUpdate) - new Date(a.lastUpdate);
        default:
          return 0;
      }
    });

    setFilteredCodes(filtered);
  }, [selectedCategory, searchQuery, sortBy]);

  const checkAuth = () => {
    setShowLoginModal(true);
    return false;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const colors = {
    emerald: { 
      bg: "from-emerald-500 to-emerald-600", 
      text: "text-emerald-700", 
      border: "border-emerald-200", 
      light: "bg-emerald-50",
      hover: "hover:bg-emerald-600"
    },
    amber: { 
      bg: "from-amber-500 to-yellow-500", 
      text: "text-amber-700", 
      border: "border-amber-200", 
      light: "bg-amber-50",
      hover: "hover:bg-amber-600"
    },
    blue: { 
      bg: "from-blue-500 to-blue-600", 
      text: "text-blue-700", 
      border: "border-blue-200", 
      light: "bg-blue-50",
      hover: "hover:bg-blue-600"
    },
    red: { 
      bg: "from-red-500 to-red-600", 
      text: "text-red-700", 
      border: "border-red-200", 
      light: "bg-red-50",
      hover: "hover:bg-red-600"
    },
    purple: { 
      bg: "from-purple-500 to-purple-600", 
      text: "text-purple-700", 
      border: "border-purple-200", 
      light: "bg-purple-50",
      hover: "hover:bg-purple-600"
    },
    orange: { 
      bg: "from-orange-500 to-orange-600", 
      text: "text-orange-700", 
      border: "border-orange-200", 
      light: "bg-orange-50",
      hover: "hover:bg-orange-600"
    },
    pink: { 
      bg: "from-pink-500 to-pink-600", 
      text: "text-pink-700", 
      border: "border-pink-200", 
      light: "bg-pink-50",
      hover: "hover:bg-pink-600"
    },
    green: { 
      bg: "from-green-500 to-green-600", 
      text: "text-green-700", 
      border: "border-green-200", 
      light: "bg-green-50",
      hover: "hover:bg-green-600"
    }
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
                  <p className="text-xs text-green-600 font-medium">Codes Juridiques</p>
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
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.06&quot;%3E%3Cpolygon points=&quot;30,15 45,45 15,45&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white/90 text-sm font-medium">Plateforme Officielle du Sénégal</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
            Codes Juridiques
            <span className="block text-yellow-300">du Sénégal</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            Accédez à l'ensemble des codes en vigueur, organisés par thématique et 
            constamment mis à jour selon la législation sénégalaise
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4">
              <FileText className="w-6 h-6 text-yellow-300" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{codes.length}</div>
                <div className="text-white/80 text-sm">Codes disponibles</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4">
              <BookOpen className="w-6 h-6 text-yellow-300" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{codes.reduce((sum, code) => sum + code.articles, 0)}</div>
                <div className="text-white/80 text-sm">Articles</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4">
              <TrendingUp className="w-6 h-6 text-yellow-300" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{codes.reduce((sum, code) => sum + code.views, 0).toLocaleString()}</div>
                <div className="text-white/80 text-sm">Consultations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barre de recherche et filtres modernisée */}
      <section className="relative -mt-12 max-w-7xl mx-auto px-4 z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-green-600 group-focus-within:text-green-700 transition-colors" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-4 rounded-2xl border-2 border-green-100 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-lg placeholder-green-400"
                placeholder="Rechercher un code (nom, description, articles...)"
              />
            </div>
            
            <div className="flex gap-4">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-4 rounded-2xl border-2 border-green-100 focus:border-green-500 outline-none min-w-48 text-green-800 font-medium"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
              
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-4 rounded-2xl border-2 border-green-100 focus:border-green-500 outline-none text-green-800 font-medium"
              >
                <option value="name">Nom A-Z</option>
                <option value="articles">Nb. d'articles</option>
                <option value="views">Plus consultés</option>
                <option value="date">Récemment mis à jour</option>
              </select>
              
              <div className="flex rounded-2xl border-2 border-green-100 overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-4 transition-all duration-300 ${
                    viewMode === "grid" 
                      ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-white shadow-lg' 
                      : 'bg-white text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-4 transition-all duration-300 ${
                    viewMode === "list" 
                      ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-white shadow-lg' 
                      : 'bg-white text-green-600 hover:bg-green-50'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tags de filtrage modernisés */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-green-700 font-medium">Filtres rapides :</span>
            {[
              { name: "Populaires", icon: Star },
              { name: "Nouveaux", icon: Sparkles },
              { name: "Civil", icon: Home },
              { name: "Pénal", icon: Shield },
              { name: "Social", icon: Users }
            ].map((tag) => (
              <button
                key={tag.name}
                onClick={() => {
                  if (tag.name === "Populaires") {
                    setFilteredCodes(codes.filter(c => c.isPopular));
                  } else if (tag.name === "Nouveaux") {
                    setFilteredCodes(codes.filter(c => c.isNew));
                  } else {
                    setSelectedCategory(tag.name);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-yellow-100 hover:from-green-200 hover:to-yellow-200 rounded-full text-green-700 hover:text-green-800 transition-all duration-300 border border-green-200/50"
              >
                <tag.icon className="w-4 h-4" />
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {!selectedCode ? (
          <>
            {/* En-tête des résultats */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-2">
                  {filteredCodes.length} code{filteredCodes.length > 1 ? 's' : ''} trouvé{filteredCodes.length > 1 ? 's' : ''}
                </h2>
                <p className="text-green-600 text-lg">
                  {selectedCategory && `Catégorie: ${categories.find(c => c.id === selectedCategory)?.name}`}
                </p>
              </div>
              
              {/* Indicateur de codes récents */}
              <div className="flex items-center gap-2 bg-yellow-100 rounded-2xl px-4 py-2 border border-yellow-200">
                <Sparkles className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-700 font-medium">
                  {codes.filter(c => c.isNew).length} nouveaux codes
                </span>
              </div>
            </div>

            {/* Affichage des codes */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCodes.map((code) => (
                  <CodeCard 
                    key={code.id} 
                    code={code} 
                    colors={colors}
                    onSelect={() => setSelectedCode(code)}
                    onBookmark={() => checkAuth()}
                    onDownload={() => checkAuth()}
                    onShare={() => checkAuth()}
                    isBookmarked={bookmarks.includes(code.id)}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredCodes.map((code) => (
                  <CodeListItem 
                    key={code.id} 
                    code={code} 
                    colors={colors}
                    onSelect={() => setSelectedCode(code)}
                    onBookmark={() => checkAuth()}
                    onDownload={() => checkAuth()}
                    onShare={() => checkAuth()}
                    isBookmarked={bookmarks.includes(code.id)}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )}

            {filteredCodes.length === 0 && (
              <div className="text-center py-20">
                <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded-3xl p-12 max-w-md mx-auto">
                  <FileText className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-green-800 mb-4">Aucun code trouvé</h3>
                  <p className="text-green-600 text-lg leading-relaxed">
                    Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <CodeDetailView 
            code={selectedCode} 
            colors={colors}
            onBack={() => setSelectedCode(null)}
            checkAuth={checkAuth}
            formatDate={formatDate}
          />
        )}
      </section>

      {/* Modal de connexion */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}

// Composant pour les cartes de codes modernisé
function CodeCard({ code, colors, onSelect, onBookmark, onDownload, onShare, isBookmarked, formatDate }) {
  const colorScheme = colors[code.color];
  const IconComponent = code.icon;

  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-green-100/50 hover:border-green-300 overflow-hidden">
      {/* Header avec gradient et badges */}
      <div className="relative">
        <div className={`h-3 bg-gradient-to-r ${colorScheme.bg}`} />
        
        {/* Badges flottants */}
        <div className="absolute -top-1 right-4 flex gap-2">
          {code.isNew && (
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              NOUVEAU
            </div>
          )}
          {code.isPopular && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Award className="w-3 h-3" />
              POPULAIRE
            </div>
          )}
        </div>
      </div>
      
      <div className="p-8">
        {/* Icône et catégorie */}
        <div className="flex items-start justify-between mb-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${colorScheme.bg} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          
          <span className={`px-4 py-2 text-sm font-bold rounded-2xl ${colorScheme.light} ${colorScheme.text} border-2 ${colorScheme.border}`}>
            {code.category}
          </span>
        </div>

        {/* Titre et description */}
        <h3 className="text-xl font-bold text-green-800 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
          {code.name}
        </h3>
        
        <p className="text-green-700 text-sm leading-relaxed mb-6 line-clamp-3">
          {code.description}
        </p>

        {/* Statistiques avec design moderne */}
        <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
          <div className="flex items-center gap-3 bg-green-50 rounded-2xl p-3">
            <div className="p-2 bg-green-200 rounded-xl">
              <FileText className="w-4 h-4 text-green-700" />
            </div>
            <div>
              <div className="font-bold text-green-800">{code.articles}</div>
              <div className="text-green-600">articles</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-yellow-50 rounded-2xl p-3">
            <div className="p-2 bg-yellow-200 rounded-xl">
              <Eye className="w-4 h-4 text-yellow-700" />
            </div>
            <div>
              <div className="font-bold text-yellow-800">{code.views.toLocaleString()}</div>
              <div className="text-yellow-600">vues</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-blue-50 rounded-2xl p-3">
            <div className="p-2 bg-blue-200 rounded-xl">
              <Download className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <div className="font-bold text-blue-800">{code.downloads}</div>
              <div className="text-blue-600">DL</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-purple-50 rounded-2xl p-3">
            <div className="p-2 bg-purple-200 rounded-xl">
              <Calendar className="w-4 h-4 text-purple-700" />
            </div>
            <div>
              <div className="font-bold text-purple-800 text-xs">MAJ</div>
              <div className="text-purple-600 text-xs">{formatDate(code.lastUpdate).split(' ')[0]}</div>
            </div>
          </div>
        </div>

        {/* Actions avec design amélioré */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSelect}
            className="flex-1 py-3 bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Consulter
          </button>
          
          <button
            onClick={onBookmark}
            className="p-3 rounded-2xl border-2 border-green-200 hover:bg-green-100 transition-all duration-300 hover:scale-105"
            title="Ajouter aux favoris"
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-yellow-600 fill-yellow-600' : 'text-green-600'}`} />
          </button>
          
          <button
            onClick={onDownload}
            className="p-3 rounded-2xl border-2 border-green-200 hover:bg-green-100 transition-all duration-300 hover:scale-105"
            title="Télécharger"
          >
            <Download className="w-5 h-5 text-green-600" />
          </button>
          
          <button
            onClick={onShare}
            className="p-3 rounded-2xl border-2 border-green-200 hover:bg-green-100 transition-all duration-300 hover:scale-105"
            title="Partager"
          >
            <Share2 className="w-5 h-5 text-green-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Composant pour la vue liste modernisé
function CodeListItem({ code, colors, onSelect, onBookmark, onDownload, onShare, isBookmarked, formatDate }) {
  const colorScheme = colors[code.color];
  const IconComponent = code.icon;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-green-100/50 hover:border-green-300 hover:shadow-2xl transition-all duration-500 overflow-hidden group">
      <div className="p-8">
        <div className="flex items-start gap-8">
          {/* Icône avec animation */}
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${colorScheme.bg} shadow-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          
          {/* Contenu principal */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold text-green-800 group-hover:text-green-600 transition-colors">
                  {code.name}
                </h3>
                <div className="flex gap-2">
                  {code.isNew && (
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      NOUVEAU
                    </div>
                  )}
                  {code.isPopular && (
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      POPULAIRE
                    </div>
                  )}
                </div>
              </div>
              
              <span className={`px-4 py-2 text-sm font-bold rounded-2xl ${colorScheme.light} ${colorScheme.text} border-2 ${colorScheme.border} flex-shrink-0`}>
                {code.category}
              </span>
            </div>
            
            <p className="text-green-700 mb-6 line-clamp-2 text-lg leading-relaxed">{code.description}</p>
            
            <div className="flex flex-wrap items-center gap-8 text-sm mb-6">
              <div className="flex items-center gap-2 bg-green-50 rounded-2xl px-4 py-2">
                <FileText className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-green-800">{code.articles} articles</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 rounded-2xl px-4 py-2">
                <Eye className="w-4 h-4 text-yellow-600" />
                <span className="font-semibold text-yellow-800">{code.views.toLocaleString()} consultations</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 rounded-2xl px-4 py-2">
                <Download className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-800">{code.downloads} téléchargements</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 rounded-2xl px-4 py-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-purple-800">MAJ {formatDate(code.lastUpdate)}</span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onSelect}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Consulter
            </button>
            
            <button
              onClick={onBookmark}
              className="p-3 rounded-2xl hover:bg-green-100 transition-all duration-300 hover:scale-110"
              title="Favoris"
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-yellow-600 fill-yellow-600' : 'text-green-600'}`} />
            </button>
            
            <button
              onClick={onDownload}
              className="p-3 rounded-2xl hover:bg-green-100 transition-all duration-300 hover:scale-110"
              title="Télécharger"
            >
              <Download className="w-5 h-5 text-green-600" />
            </button>
            
            <button
              onClick={onShare}
              className="p-3 rounded-2xl hover:bg-green-100 transition-all duration-300 hover:scale-110"
              title="Partager"
            >
              <Share2 className="w-5 h-5 text-green-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant pour la vue détaillée modernisé
function CodeDetailView({ code, colors, onBack, checkAuth, formatDate }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchInCode, setSearchInCode] = useState("");
  const colorScheme = colors[code.color];
  const IconComponent = code.icon;

  return (
    <div className="space-y-8">
      {/* Header du code avec design moderne */}
      <div className="bg-white rounded-3xl shadow-xl border border-green-100/50 overflow-hidden">
        <div className={`h-4 bg-gradient-to-r ${colorScheme.bg}`} />
        
        <div className="p-8">
          <div className="flex items-start gap-8">
            <div className={`p-6 rounded-3xl bg-gradient-to-br ${colorScheme.bg} shadow-2xl`}>
              <IconComponent className="w-12 h-12 text-white" />
            </div>
            
            <div className="flex-1">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4 text-sm font-bold bg-green-50 rounded-2xl px-4 py-2 transition-all duration-300 hover:bg-green-100"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour aux codes
              </button>
              
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-green-800 mb-4">{code.name}</h1>
                  <p className="text-green-700 leading-relaxed text-lg max-w-3xl">{code.description}</p>
                </div>
                
                <div className="flex flex-col gap-2">
                  {code.isNew && (
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-2xl flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      NOUVEAU
                    </div>
                  )}
                  <span className={`px-4 py-2 text-sm font-bold rounded-2xl ${colorScheme.light} ${colorScheme.text} border-2 ${colorScheme.border} text-center`}>
                    {code.category}
                  </span>
                </div>
              </div>
              
              {/* Statistiques avec design moderne */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 text-center border-2 border-green-200">
                  <div className="text-4xl font-bold text-green-700 mb-2">{code.articles}</div>
                  <div className="text-green-600 font-semibold">Articles</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl p-6 text-center border-2 border-yellow-200">
                  <div className="text-4xl font-bold text-yellow-700 mb-2">{code.views.toLocaleString()}</div>
                  <div className="text-yellow-600 font-semibold">Consultations</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 text-center border-2 border-blue-200">
                  <div className="text-4xl font-bold text-blue-700 mb-2">{code.downloads}</div>
                  <div className="text-blue-600 font-semibold">Téléchargements</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-6 text-center border-2 border-purple-200">
                  <div className="text-lg font-bold text-purple-700 mb-2">{formatDate(code.lastUpdate).split(' ').slice(0, 2).join(' ')}</div>
                  <div className="text-purple-600 font-semibold">Dernière MAJ</div>
                </div>
              </div>
              
              {/* Actions avec design amélioré */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={checkAuth}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <Download className="w-6 h-6" />
                  Télécharger PDF
                </button>
                <button
                  onClick={checkAuth}
                  className="flex items-center gap-3 px-8 py-4 border-2 border-green-300 text-green-700 rounded-2xl font-bold hover:bg-green-100 transition-all duration-300 hover:scale-105"
                >
                  <Bookmark className="w-6 h-6" />
                  Ajouter aux favoris
                </button>
                <button
                  onClick={checkAuth}
                  className="flex items-center gap-3 px-8 py-4 border-2 border-green-300 text-green-700 rounded-2xl font-bold hover:bg-green-100 transition-all duration-300 hover:scale-105"
                >
                  <Share2 className="w-6 h-6" />
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sommaire modernisé */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white rounded-3xl shadow-xl p-8 border border-green-100/50">
            <h3 className="font-bold text-green-800 mb-6 text-xl flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-green-600" />
              Structure du Code
            </h3>
            
            <div className="space-y-3">
              {code.books.map((book) => (
                <button
                  key={book.id}
                  onClick={() => setSelectedBook(selectedBook === book.id ? null : book.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                    selectedBook === book.id 
                      ? 'bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 border-2 border-green-300 shadow-lg' 
                      : 'hover:bg-green-50 text-green-700 border-2 border-transparent hover:border-green-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold line-clamp-2 text-sm">{book.title}</span>
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                      selectedBook === book.id ? 'rotate-90 text-green-600' : 'text-green-500'
                    }`} />
                  </div>
                  <div className="text-xs text-green-600 mt-2 font-medium">
                    {book.articles} articles
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contenu modernisé */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-xl border border-green-100/50 overflow-hidden">
            {/* Barre de recherche dans le code */}
            <div className="border-b border-green-100 p-8 bg-gradient-to-r from-green-50 to-yellow-50">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-green-600" />
                <input
                  value={searchInCode}
                  onChange={(e) => setSearchInCode(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 rounded-2xl border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-lg placeholder-green-500"
                  placeholder={`Rechercher dans le ${code.name}...`}
                />
              </div>
            </div>

            <div className="p-8">
              {!selectedBook ? (
                // Vue d'ensemble modernisée
                <div className="space-y-8">
                  <div className="text-center py-12">
                    <div className="bg-gradient-to-br from-green-100 to-yellow-100 rounded-full p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-green-800 mb-4">
                      {code.name}
                    </h3>
                    <p className="text-green-700 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
                      Sélectionnez un livre dans le sommaire pour commencer votre consultation 
                      ou utilisez la recherche pour trouver un article spécifique.
                    </p>
                    
                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-3xl p-8 max-w-md mx-auto">
                      <div className="flex items-center justify-center gap-3 text-yellow-800 mb-4">
                        <AlertCircle className="w-8 h-8" />
                        <span className="font-bold text-xl">Accès Premium</span>
                      </div>
                      <p className="text-yellow-700 text-lg leading-relaxed">
                        Connectez-vous pour accéder au contenu complet, télécharger et sauvegarder vos favoris.
                      </p>
                    </div>
                  </div>
                  
                  {/* Grille des livres modernisée */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {code.books.map((book) => (
                      <div
                        key={book.id}
                        className="group p-6 border-2 border-green-200 rounded-3xl hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-green-50 to-yellow-50 hover:from-green-100 hover:to-yellow-100"
                        onClick={() => setSelectedBook(book.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-gradient-to-br from-green-500 to-yellow-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-green-800 mb-2 line-clamp-2 text-lg group-hover:text-green-600 transition-colors">
                              {book.title}
                            </h4>
                            <p className="text-green-600 text-sm mb-4 font-semibold">
                              {book.articles} articles disponibles
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-green-700 text-sm font-bold flex items-center gap-2">
                                Consulter 
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Contenu du livre sélectionné
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-green-800">
                      {code.books.find(b => b.id === selectedBook)?.title}
                    </h3>
                    <button
                      onClick={() => setSelectedBook(null)}
                      className="text-green-600 hover:text-green-700 font-bold bg-green-50 rounded-2xl px-6 py-3 transition-all duration-300 hover:bg-green-100"
                    >
                      ← Retour à la vue d'ensemble
                    </button>
                  </div>
                  
                  {/* Articles simulés avec design moderne */}
                  <div className="space-y-6">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="border-2 border-green-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-6 border-b border-green-200">
                          <div className="flex items-start justify-between">
                            <h4 className="text-xl font-bold text-green-700 flex items-center gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Article {index + 1}
                            </h4>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={checkAuth}
                                className="p-2 rounded-2xl hover:bg-green-100 transition-all duration-300 hover:scale-110"
                                title="Favoris"
                              >
                                <Bookmark className="w-5 h-5 text-green-600" />
                              </button>
                              <button
                                onClick={checkAuth}
                                className="p-2 rounded-2xl hover:bg-green-100 transition-all duration-300 hover:scale-110"
                                title="Partager"
                              >
                                <Share2 className="w-5 h-5 text-green-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-8">
                          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-3xl p-8 text-center">
                            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                              <Users className="w-10 h-10 text-yellow-700" />
                            </div>
                            <h5 className="text-xl font-bold text-yellow-800 mb-4">Contenu Premium</h5>
                            <p className="text-yellow-700 mb-6 leading-relaxed">
                              Connectez-vous pour accéder au contenu complet de cet article et profiter de toutes les fonctionnalités.
                            </p>
                            <button
                              onClick={checkAuth}
                              className="w-full py-4 bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                              Se connecter maintenant
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal de connexion modernisée
function LoginModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-green-200">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-green-100 to-yellow-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <User className="w-10 h-10 text-green-700" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-4">Connexion Premium</h3>
          <p className="text-green-700 leading-relaxed">
            Pour accéder au contenu complet des codes, télécharger les documents et gérer vos favoris, 
            rejoignez la communauté Sunu Loi.
          </p>
        </div>

        <div className="space-y-4">
          <button className="w-full py-4 bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
            Se connecter
          </button>
          <button className="w-full py-4 border-2 border-green-300 text-green-700 rounded-2xl font-bold hover:bg-green-50 transition-all duration-300 hover:scale-105">
            Créer un compte gratuit
          </button>
          <button 
            onClick={onClose}
            className="w-full py-4 text-green-600 hover:text-green-700 transition-colors font-semibold"
          >
            Continuer en mode consultation limitée
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl border border-green-200">
          <p className="text-green-700 text-sm text-center font-medium">
            🇸🇳 Plateforme officielle de la République du Sénégal
          </p>
        </div>
      </div>
    </div>
  );
}