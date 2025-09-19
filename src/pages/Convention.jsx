import { useState, useEffect } from 'react';
import { 
  Search, 
  Globe, 
  Calendar, 
  Tag, 
  Eye, 
  Download, 
  BookOpen, 
  Users, 
  Flag, 
  MapPin,
  ArrowLeft,
  Bell,
  User,
  Sparkles,
  Award,
  TrendingUp,
  Scale,
  Share2,
  Bookmark,
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  Clock,
  Star,
  Building,
  Shield,
  Heart,
  Briefcase
} from 'lucide-react';

const Convention = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedOrganization, setSelectedOrganization] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [conventions, setConventions] = useState([]);
  const [filteredConventions, setFilteredConventions] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedConvention, setSelectedConvention] = useState(null);
  const [favoriteItems, setFavoriteItems] = useState(new Set());
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Données des conventions adaptées au contexte sénégalais
  useEffect(() => {
    const sampleConventions = [
      {
        id: 1,
        title: 'Convention de Vienne sur le droit des traités',
        type: 'Traité international',
        organization: 'ONU',
        dateSignature: '1969-05-23',
        dateRatification: '1986-04-27',
        status: 'Ratifiée',
        summary: 'Convention établissant les règles fondamentales du droit international des traités, leur conclusion, interprétation et application. Base juridique des accords internationaux du Sénégal.',
        themes: ['Droit international', 'Traités', 'Diplomatie', 'Souveraineté'],
        signataires: 116,
        articles: 85,
        langues: ['Français', 'Anglais', 'Espagnol', 'Russe', 'Chinois', 'Arabe'],
        isNew: false,
        isPopular: true,
        impact: 'Très élevé',
        ratificationDetails: 'Ratifiée par le Sénégal en 1986, cette convention guide toutes les négociations diplomatiques du pays.',
        applicationSenegal: 'Utilisée dans tous les accords bilatéraux et multilatéraux du Sénégal, notamment avec les pays de la CEDEAO.'
      },
      {
        id: 2,
        title: 'Convention internationale des droits de l\'enfant',
        type: 'Convention des droits humains',
        organization: 'UNICEF',
        dateSignature: '1989-11-20',
        dateRatification: '1990-07-31',
        status: 'Ratifiée',
        summary: 'Convention garantissant les droits fondamentaux des enfants. Le Sénégal a été l\'un des premiers pays africains à la ratifier, démontrant son engagement pour la protection de l\'enfance.',
        themes: ['Droits de l\'enfant', 'Protection sociale', 'Éducation', 'Santé'],
        signataires: 196,
        articles: 54,
        langues: ['Français', 'Anglais', 'Espagnol'],
        isNew: false,
        isPopular: true,
        impact: 'Très élevé',
        ratificationDetails: 'Le Sénégal a ratifié cette convention très rapidement, montrant sa priorité accordée aux droits des enfants.',
        applicationSenegal: 'A inspiré la réforme du Code de la famille sénégalais et les politiques nationales de protection de l\'enfance.'
      },
      {
        id: 3,
        title: 'Accord de Paris sur le climat',
        type: 'Accord environnemental',
        organization: 'CCNUCC',
        dateSignature: '2015-12-12',
        dateRatification: '2016-09-21',
        status: 'Ratifiée',
        summary: 'Accord mondial sur la lutte contre le changement climatique. Le Sénégal s\'est engagé à réduire ses émissions et à développer les énergies renouvelables.',
        themes: ['Climat', 'Environnement', 'Énergies renouvelables', 'Développement durable'],
        signataires: 195,
        articles: 29,
        langues: ['Français', 'Anglais'],
        isNew: true,
        isPopular: true,
        impact: 'Très élevé',
        ratificationDetails: 'Ratification rapide du Sénégal témoignant de son leadership climatique en Afrique.',
        applicationSenegal: 'Plan Sénégal Émergent intègre les objectifs climatiques, développement du solaire et de l\'éolien.'
      },
      {
        id: 4,
        title: 'Convention de Genève relative au statut des réfugiés',
        type: 'Convention humanitaire',
        organization: 'HCR',
        dateSignature: '1951-07-28',
        dateRatification: '1967-02-16',
        status: 'Ratifiée',
        summary: 'Convention définissant le statut des réfugiés et leurs droits. Le Sénégal applique le principe de non-refoulement et accueille les réfugiés de la sous-région.',
        themes: ['Réfugiés', 'Droits humains', 'Asile', 'Protection internationale'],
        signataires: 149,
        articles: 46,
        langues: ['Français', 'Anglais'],
        isNew: false,
        isPopular: false,
        impact: 'Élevé',
        ratificationDetails: 'Le Sénégal a ratifié cette convention dans le contexte des mouvements de population en Afrique de l\'Ouest.',
        applicationSenegal: 'Accueil des réfugiés mauritaniens, guinéens et d\'autres nationalités. Camps de réfugiés gérés avec le HCR.'
      },
      {
        id: 5,
        title: 'Convention sur l\'élimination de toutes les formes de discrimination à l\'égard des femmes (CEDEF)',
        type: 'Convention des droits humains',
        organization: 'ONU Femmes',
        dateSignature: '1979-12-18',
        dateRatification: '1985-02-05',
        status: 'Ratifiée',
        summary: 'Convention garantissant l\'égalité des droits entre hommes et femmes. Le Sénégal a adopté la loi sur la parité en application de cette convention.',
        themes: ['Égalité des genres', 'Droits des femmes', 'Non-discrimination', 'Parité'],
        signataires: 189,
        articles: 30,
        langues: ['Français', 'Anglais', 'Espagnol', 'Russe', 'Chinois', 'Arabe'],
        isNew: false,
        isPopular: true,
        impact: 'Très élevé',
        ratificationDetails: 'Ratification précoce du Sénégal qui a inspiré des réformes législatives majeures.',
        applicationSenegal: 'Loi sur la parité de 2010 fait du Sénégal le premier pays au monde à garantir la parité absolue.'
      },
      {
        id: 6,
        title: 'Charte africaine des droits de l\'homme et des peuples',
        type: 'Convention régionale',
        organization: 'Union Africaine',
        dateSignature: '1981-06-27',
        dateRatification: '1982-08-13',
        status: 'Ratifiée',
        summary: 'Charte fondamentale des droits humains en Afrique, intégrant les valeurs africaines et les droits collectifs des peuples.',
        themes: ['Droits humains', 'Valeurs africaines', 'Droits collectifs', 'Développement'],
        signataires: 54,
        articles: 68,
        langues: ['Français', 'Anglais', 'Arabe', 'Portugais'],
        isNew: false,
        isPopular: true,
        impact: 'Très élevé',
        ratificationDetails: 'Le Sénégal a été parmi les premiers signataires, démontrant son engagement panafricain.',
        applicationSenegal: 'Intégrée dans la Constitution sénégalaise, référence pour les politiques de développement.'
      },
      {
        id: 7,
        title: 'Convention internationale sur l\'élimination de toutes les formes de discrimination raciale',
        type: 'Convention des droits humains',
        organization: 'ONU',
        dateSignature: '1965-12-21',
        dateRatification: '1972-04-18',
        status: 'Ratifiée',
        summary: 'Convention luttant contre toutes les formes de discrimination raciale. Le Sénégal prône la "Teranga" et l\'hospitalité envers tous.',
        themes: ['Non-discrimination', 'Égalité raciale', 'Droits humains', 'Intégration'],
        signataires: 182,
        articles: 25,
        langues: ['Français', 'Anglais', 'Espagnol', 'Russe', 'Chinois', 'Arabe'],
        isNew: false,
        isPopular: false,
        impact: 'Élevé',
        ratificationDetails: 'Ratification cohérente avec les valeurs d\'hospitalité et de tolérance du Sénégal.',
        applicationSenegal: 'Politique d\'accueil des étrangers, intégration des communautés immigrées.'
      },
      {
        id: 8,
        title: 'Protocole de Kyoto',
        type: 'Protocole environnemental',
        organization: 'CCNUCC',
        dateSignature: '1997-12-11',
        dateRatification: '2001-07-20',
        status: 'Ratifiée',
        summary: 'Protocole sur la réduction des émissions de gaz à effet de serre. Le Sénégal, bien que faible émetteur, s\'engage activement.',
        themes: ['Changement climatique', 'Émissions', 'Mécanisme développement propre', 'Environnement'],
        signataires: 192,
        articles: 28,
        langues: ['Français', 'Anglais'],
        isNew: false,
        isPopular: false,
        impact: 'Moyen',
        ratificationDetails: 'Ratification rapide malgré le statut de pays en développement, montrant l\'engagement environnemental.',
        applicationSenegal: 'Projets de mécanisme de développement propre, reboisement, énergies renouvelables.'
      }
    ];
    
    setConventions(sampleConventions);
    setFilteredConventions(sampleConventions);
  }, []);

  // Filtrage des conventions
  useEffect(() => {
    let filtered = conventions;

    if (searchTerm) {
      filtered = filtered.filter(convention =>
        convention.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convention.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convention.themes.some(theme => theme.toLowerCase().includes(searchTerm.toLowerCase())) ||
        convention.organization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(convention => convention.type === selectedType);
    }

    if (selectedOrganization !== 'all') {
      filtered = filtered.filter(convention => convention.organization === selectedOrganization);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(convention => convention.status === selectedStatus);
    }

    setFilteredConventions(filtered);
  }, [searchTerm, selectedType, selectedOrganization, selectedStatus, conventions]);

  const types = [
    { name: 'Tous types', value: 'all', count: conventions.length, icon: Globe },
    { name: 'Traité international', value: 'Traité international', count: conventions.filter(c => c.type === 'Traité international').length, icon: Flag },
    { name: 'Convention des droits humains', value: 'Convention des droits humains', count: conventions.filter(c => c.type === 'Convention des droits humains').length, icon: Users },
    { name: 'Accord environnemental', value: 'Accord environnemental', count: conventions.filter(c => c.type === 'Accord environnemental').length, icon: Globe },
    { name: 'Convention humanitaire', value: 'Convention humanitaire', count: conventions.filter(c => c.type === 'Convention humanitaire').length, icon: Heart },
    { name: 'Convention régionale', value: 'Convention régionale', count: conventions.filter(c => c.type === 'Convention régionale').length, icon: MapPin },
    { name: 'Protocole environnemental', value: 'Protocole environnemental', count: conventions.filter(c => c.type === 'Protocole environnemental').length, icon: Globe }
  ];

  const organizations = [
    { name: 'Toutes organisations', value: 'all', icon: Building },
    { name: 'ONU', value: 'ONU', icon: Flag },
    { name: 'UNICEF', value: 'UNICEF', icon: Users },
    { name: 'CCNUCC', value: 'CCNUCC', icon: Globe },
    { name: 'HCR', value: 'HCR', icon: Shield },
    { name: 'ONU Femmes', value: 'ONU Femmes', icon: Heart },
    { name: 'Union Africaine', value: 'Union Africaine', icon: MapPin }
  ];

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favoriteItems);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavoriteItems(newFavorites);
  };

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const checkAuth = () => {
    setShowLoginModal(true);
    return false;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ratifiée': return 'bg-green-100 text-green-800 border-green-300';
      case 'Signée': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'En négociation': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Non ratifiée': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Très élevé': return 'bg-red-100 text-red-800 border-red-300';
      case 'Élevé': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Faible': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeIcon = (type) => {
    const typeObj = types.find(t => t.value === type);
    return typeObj ? typeObj.icon : Globe;
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
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-700 to-yellow-600 bg-clip-text text-transparent">
                    Sunu Loi
                  </h1>
                  <p className="text-xs text-green-600 font-medium">Conventions Internationales</p>
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-green-700 to-yellow-600 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.06&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;15&quot; stroke=&quot;%23ffffff&quot; stroke-width=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Flag className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-medium">Engagements Internationaux du Sénégal</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-8 tracking-tight flex items-center justify-center gap-6">
            <Globe className="w-16 h-16 sm:w-20 sm:h-20" />
            <div>
              Conventions
              <span className="block text-yellow-300 text-3xl sm:text-5xl">Internationales</span>
            </div>
          </h1>
          
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
            Découvrez les traités et conventions internationales ratifiés par le Sénégal. 
            Engagements diplomatiques, droits humains, environnement et coopération internationale.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4">
              <Globe className="w-6 h-6 text-yellow-300" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{conventions.length}</div>
                <div className="text-white/80 text-sm">Conventions ratifiées</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4">
              <Building className="w-6 h-6 text-yellow-300" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{organizations.length - 1}</div>
                <div className="text-white/80 text-sm">Organisations</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4">
              <Users className="w-6 h-6 text-yellow-300" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{conventions.filter(c => c.isPopular).length}</div>
                <div className="text-white/80 text-sm">Conventions majeures</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{conventions.filter(c => c.isNew).length}</div>
                <div className="text-white/80 text-sm">Récentes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barre de recherche modernisée */}
      <section className="relative -mt-12 max-w-7xl mx-auto px-4 z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-green-600 group-focus-within:text-green-700 transition-colors" />
              <input
                type="text"
                placeholder="Rechercher une convention internationale..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-4 rounded-2xl border-2 border-green-100 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-lg placeholder-green-400"
              />
            </div>
            <button className="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <Search className="w-5 h-5 inline mr-2" />
              Rechercher
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 text-green-700 font-bold">
              <Filter className="w-5 h-5" />
              Filtres :
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border-2 border-green-100 rounded-2xl focus:border-green-500 outline-none text-green-800 font-medium bg-white"
            >
              {types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.name} ({type.count})
                </option>
              ))}
            </select>
            
            <select
              value={selectedOrganization}
              onChange={(e) => setSelectedOrganization(e.target.value)}
              className="px-4 py-3 border-2 border-green-100 rounded-2xl focus:border-green-500 outline-none text-green-800 font-medium bg-white"
            >
              {organizations.map((org) => (
                <option key={org.value} value={org.value}>
                  {org.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border-2 border-green-100 rounded-2xl focus:border-green-500 outline-none text-green-800 font-medium bg-white"
            >
              <option value="all">Tous statuts</option>
              <option value="Ratifiée">Ratifiée</option>
              <option value="Signée">Signée</option>
              <option value="En négociation">En négociation</option>
            </select>
          </div>

          {/* Tags de filtrage rapide */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <span className="text-green-700 font-bold">Raccourcis :</span>
            {[
              { name: "Droits humains", filter: () => setSelectedType('Convention des droits humains'), icon: Users },
              { name: "Environnement", filter: () => setSelectedType('Accord environnemental'), icon: Globe },
              { name: "ONU", filter: () => setSelectedOrganization('ONU'), icon: Flag },
              { name: "Populaires", filter: () => setFilteredConventions(conventions.filter(c => c.isPopular)), icon: Star }
            ].map((tag) => (
              <button
                key={tag.name}
                onClick={tag.filter}
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
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Liste des conventions */}
          <div className="lg:col-span-3">
            {/* En-tête des résultats */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-2">
                  {filteredConventions.length} convention{filteredConventions.length > 1 ? 's' : ''} trouvée{filteredConventions.length > 1 ? 's' : ''}
                </h2>
                <p className="text-green-600 text-lg">
                  Engagements internationaux de la République du Sénégal
                </p>
              </div>
              
              <div className="flex items-center gap-2 bg-yellow-100 rounded-2xl px-4 py-2 border border-yellow-200">
                <Sparkles className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-700 font-bold">
                  {conventions.filter(c => c.isNew).length} récentes
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100/50">
              {filteredConventions.map((convention) => (
                <ConventionCard 
                  key={convention.id} 
                  convention={convention}
                  favoriteItems={favoriteItems}
                  expandedCards={expandedCards}
                  toggleFavorite={toggleFavorite}
                  toggleExpanded={toggleExpanded}
                  setSelectedConvention={setSelectedConvention}
                  getStatusColor={getStatusColor}
                  getImpactColor={getImpactColor}
                  getTypeIcon={getTypeIcon}
                  checkAuth={checkAuth}
                />
              ))}
              
              {filteredConventions.length === 0 && (
                <div className="text-center py-20">
                  <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded-3xl p-12 max-w-md mx-auto">
                    <Globe className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-green-800 mb-4">Aucune convention trouvée</h3>
                    <p className="text-green-600 text-lg leading-relaxed">
                      Essayez de modifier vos critères de recherche ou de sélectionner d'autres filtres.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Statistiques */}
            <div className="bg-gradient-to-br from-green-600 to-yellow-500 text-white p-8 rounded-3xl text-center shadow-xl">
              <div className="text-4xl font-bold mb-3">{conventions.length}</div>
              <div className="text-lg opacity-90 mb-4">Conventions ratifiées</div>
              <div className="bg-white/20 rounded-2xl p-4">
                <div className="text-2xl font-bold">{conventions.filter(c => c.status === 'Ratifiée').length}</div>
                <div className="text-sm opacity-90">En vigueur</div>
              </div>
            </div>

            {/* Types de conventions */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100/50">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-green-600" />
                Types de conventions
              </h3>
              <ul className="space-y-3">
                {types.slice(1).map((type, index) => {
                  const IconComponent = type.icon;
                  return (
                    <li
                      key={index}
                      onClick={() => setSelectedType(type.value)}
                      className={`group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedType === type.value
                          ? 'bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 font-bold border-2 border-green-300 shadow-lg'
                          : 'hover:bg-green-50 border-2 border-transparent hover:border-green-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${selectedType === type.value ? 'bg-green-500' : 'bg-green-100 group-hover:bg-green-200'}`}>
                          <IconComponent className={`w-4 h-4 ${selectedType === type.value ? 'text-white' : 'text-green-600'}`} />
                        </div>
                        <span className="text-sm font-medium">{type.name}</span>
                      </div>
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-bold">{type.count}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Organisations */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100/50">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
                <Building className="w-6 h-6 text-green-600" />
                Organisations
              </h3>
              <div className="space-y-3">
                {organizations.slice(1).map((org, index) => {
                  const IconComponent = org.icon;
                  const count = conventions.filter(c => c.organization === org.value).length;
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedOrganization(org.value)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all hover:scale-105 ${
                        selectedOrganization === org.value
                          ? 'bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 font-bold border-2 border-green-300'
                          : 'hover:bg-green-50 border-2 border-transparent hover:border-green-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-green-600" />
                          <span className="font-medium">{org.name}</span>
                        </div>
                        <span className="text-green-600 font-bold">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Conventions récentes */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100/50">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-green-600" />
                Récemment ratifiées
              </h3>
              <div className="space-y-4">
                {conventions
                  .sort((a, b) => new Date(b.dateRatification) - new Date(a.dateRatification))
                  .slice(0, 3)
                  .map((convention, index) => (
                    <div key={index} className="border-l-4 border-green-600 pl-4 hover:bg-green-50 p-2 rounded-r-lg transition-colors cursor-pointer"
                         onClick={() => setSelectedConvention(convention)}>
                      <div className="font-bold text-green-800 line-clamp-2 text-sm mb-2">
                        {convention.title}
                      </div>
                      <div className="text-xs text-green-600 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(convention.dateRatification).getFullYear()}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de détail de convention */}
      {selectedConvention && (
        <ConventionDetailModal 
          convention={selectedConvention}
          onClose={() => setSelectedConvention(null)}
          getStatusColor={getStatusColor}
          getImpactColor={getImpactColor}
          getTypeIcon={getTypeIcon}
          checkAuth={checkAuth}
        />
      )}

      {/* Modal de connexion */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

// Composant carte de convention
function ConventionCard({ convention, favoriteItems, expandedCards, toggleFavorite, toggleExpanded, setSelectedConvention, getStatusColor, getImpactColor, getTypeIcon, checkAuth }) {
  const TypeIcon = getTypeIcon(convention.type);
  
  return (
    <div className="p-8 border-b border-green-100 last:border-b-0 hover:bg-gradient-to-r hover:from-green-50/50 hover:to-yellow-50/50 transition-all duration-300 group">
      {/* En-tête avec badges */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-lg flex items-center gap-2">
          <TypeIcon className="w-4 h-4" />
          {convention.organization}
        </span>
        
        <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-2xl text-sm font-bold border-2 border-blue-200">
          {convention.type}
        </span>
        
        <span className={`px-3 py-2 rounded-2xl text-sm font-bold border-2 ${getStatusColor(convention.status)}`}>
          {convention.status}
        </span>
        
        {convention.isNew && (
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3 h-3" />
            RÉCENTE
          </div>
        )}
        
        {convention.isPopular && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Award className="w-3 h-3" />
            MAJEURE
          </div>
        )}

        <span className={`px-3 py-2 rounded-2xl text-sm font-bold border-2 ${getImpactColor(convention.impact)}`}>
          Impact {convention.impact?.toLowerCase()}
        </span>
      </div>

      {/* Informations contextuelles */}
      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 text-green-600">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">Signée: {new Date(convention.dateSignature).toLocaleDateString('fr-FR')}</span>
        </div>
        <div className="flex items-center gap-2 text-green-600">
          <Flag className="w-4 h-4" />
          <span className="font-medium">Ratifiée: {new Date(convention.dateRatification).toLocaleDateString('fr-FR')}</span>
        </div>
        <div className="flex items-center gap-2 text-green-600">
          <Users className="w-4 h-4" />
          <span className="font-medium">{convention.signataires} pays signataires</span>
        </div>
      </div>

      {/* Titre */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-green-800 group-hover:text-green-600 transition-colors leading-tight flex-1 mr-4">
          {convention.title}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(convention.id)}
            className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
              favoriteItems.has(convention.id) ? 'text-yellow-600 bg-yellow-100' : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
            }`}
          >
            <Star className="w-5 h-5" fill={favoriteItems.has(convention.id) ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => toggleExpanded(convention.id)}
            className="p-3 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-2xl transition-all duration-300"
          >
            {expandedCards.has(convention.id) ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Résumé */}
      <p className="text-green-700 leading-relaxed mb-6 text-lg">
        {convention.summary}
      </p>

      {/* Contenu étendu */}
      {expandedCards.has(convention.id) && (
        <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-6 mb-6 border border-green-200">
          <h4 className="font-bold text-green-800 mb-4 text-lg">Détails pour le Sénégal</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-bold text-green-800 mb-3">Ratification</h5>
              <p className="text-green-700 text-sm leading-relaxed">{convention.ratificationDetails}</p>
            </div>
            <div>
              <h5 className="font-bold text-green-800 mb-3">Application au Sénégal</h5>
              <p className="text-green-700 text-sm leading-relaxed">{convention.applicationSenegal}</p>
            </div>
          </div>
        </div>
      )}

      {/* Thématiques */}
      <div className="flex flex-wrap gap-2 mb-6">
        {convention.themes.map((theme, index) => (
          <span
            key={index}
            className="bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 px-3 py-2 rounded-2xl text-sm flex items-center gap-2 border border-green-200 hover:shadow-md transition-all duration-300"
          >
            <Tag className="w-3 h-3" />
            {theme}
          </span>
        ))}
      </div>

      {/* Statistiques et langues */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-2xl border border-green-200">
          <Users className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-green-800">{convention.signataires} signataires</span>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-2xl border border-blue-200">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-blue-800">{convention.articles} articles</span>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-2xl border border-purple-200">
          <Flag className="w-4 h-4 text-purple-600" />
          <span className="font-semibold text-purple-800">{convention.langues.length} langues</span>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-2xl border border-yellow-200">
          <Calendar className="w-4 h-4 text-yellow-600" />
          <span className="font-semibold text-yellow-800">{new Date(convention.dateRatification).getFullYear()}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setSelectedConvention(convention)}
            className="flex items-center gap-2 px-4 py-2 text-green-700 bg-green-100 hover:bg-green-200 rounded-2xl font-medium transition-all duration-300 hover:scale-105 border-2 border-green-300"
          >
            <Eye className="w-4 h-4" />
            Consulter
          </button>
          
          <button 
            onClick={checkAuth}
            className="flex items-center gap-2 text-blue-700 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-2xl font-medium transition-all duration-300 hover:scale-105 border-2 border-blue-300"
          >
            <Download className="w-4 h-4" />
            Télécharger
          </button>
          
          <button 
            onClick={checkAuth}
            className="flex items-center gap-2 text-purple-700 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-2xl font-medium transition-all duration-300 hover:scale-105 border-2 border-purple-300"
          >
            <Share2 className="w-4 h-4" />
            Partager
          </button>
        </div>
        
        <div className="text-xs text-green-600 font-medium">
          Langues: {convention.langues.slice(0, 2).join(', ')}
          {convention.langues.length > 2 && ` +${convention.langues.length - 2}`}
        </div>
      </div>
    </div>
  );
}

// Modal de détail de convention
function ConventionDetailModal({ convention, onClose, getStatusColor, getImpactColor, getTypeIcon, checkAuth }) {
  const TypeIcon = getTypeIcon(convention.type);
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        
        {/* Header du modal */}
        <div className="bg-gradient-to-r from-green-600 to-yellow-500 text-white p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <TypeIcon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">{convention.title}</h2>
                <p className="text-green-100 text-lg font-medium">{convention.organization}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/20 rounded-2xl transition-all hover:scale-105"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Contenu du modal */}
        <div className="p-8 overflow-y-auto max-h-[70vh]">
          
          {/* Informations principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 p-6 rounded-2xl border border-green-200">
              <h3 className="font-bold text-green-800 mb-4 text-lg">Informations générales</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-600 font-medium">Type:</span>
                  <span className="font-bold text-green-800">{convention.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">Statut:</span>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${getStatusColor(convention.status)}`}>
                    {convention.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">Impact:</span>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${getImpactColor(convention.impact)}`}>
                    {convention.impact}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600 font-medium">Articles:</span>
                  <span className="font-bold text-green-800">{convention.articles}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-4 text-lg">Dates importantes</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-blue-600 font-medium block">Signature:</span>
                  <div className="font-bold text-blue-800">
                    {new Date(convention.dateSignature).toLocaleDateString('fr-FR')}
                  </div>
                </div>
                <div>
                  <span className="text-blue-600 font-medium block">Ratification par le Sénégal:</span>
                  <div className="font-bold text-blue-800">
                    {new Date(convention.dateRatification).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
              <h3 className="font-bold text-purple-800 mb-4 text-lg">Portée internationale</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-600 font-medium">Signataires:</span>
                  <span className="font-bold text-purple-800">{convention.signataires} pays</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-600 font-medium">Langues:</span>
                  <span className="font-bold text-purple-800">{convention.langues.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Résumé */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-green-800 mb-4">Présentation générale</h3>
            <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-200">
              <p className="text-green-800 leading-relaxed text-lg">{convention.summary}</p>
            </div>
          </div>

          {/* Spécificités pour le Sénégal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Ratification par le Sénégal</h3>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
                <p className="text-yellow-800 leading-relaxed">{convention.ratificationDetails}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Application au Sénégal</h3>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
                <p className="text-blue-800 leading-relaxed">{convention.applicationSenegal}</p>
              </div>
            </div>
          </div>

          {/* Thématiques */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-green-800 mb-4">Domaines d'application</h3>
            <div className="flex flex-wrap gap-3">
              {convention.themes.map((theme, index) => (
                <span key={index} className="px-4 py-2 bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 rounded-2xl font-bold border-2 border-green-200">
                  {theme}
                </span>
              ))}
            </div>
          </div>

          {/* Langues disponibles */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-green-800 mb-4">Versions linguistiques</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {convention.langues.map((langue, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-purple-50 rounded-2xl border border-purple-200">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">{langue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer du modal */}
        <div className="bg-gradient-to-r from-green-50 to-yellow-50 px-8 py-6 border-t border-green-200">
          <div className="flex justify-between items-center">
            <div className="text-green-700 font-medium">
              Convention consultée le {new Date().toLocaleDateString('fr-FR')}
            </div>
            <div className="flex gap-4">
              <button 
                onClick={checkAuth}
                className="bg-green-500 text-white px-6 py-3 rounded-2xl hover:bg-green-600 transition-all flex items-center gap-2 font-bold hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Télécharger
              </button>
              <button 
                onClick={checkAuth}
                className="bg-yellow-500 text-white px-6 py-3 rounded-2xl hover:bg-yellow-600 transition-all flex items-center gap-2 font-bold hover:scale-105"
              >
                <Bookmark className="w-5 h-5" />
                Sauvegarder
              </button>
              <button 
                onClick={checkAuth}
                className="bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 transition-all flex items-center gap-2 font-bold hover:scale-105"
              >
                <Share2 className="w-5 h-5" />
                Partager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal de connexion
function LoginModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-green-200">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-green-100 to-yellow-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <User className="w-10 h-10 text-green-700" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-4">Accès Premium</h3>
          <p className="text-green-700 leading-relaxed">
            Pour accéder aux fonctionnalités complètes de téléchargement et sauvegarde des conventions internationales, 
            créez votre compte Sunu Loi.
          </p>
        </div>

        <div className="space-y-4">
          <button className="w-full py-4 bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
            Se connecter
          </button>
          <button className="w-full py-4 border-2 border-green-300 text-green-700 rounded-2xl font-bold hover:bg-green-50 transition-all duration-300 hover:scale-105">
            Créer un compte diplomate/juriste
          </button>
          <button 
            onClick={onClose}
            className="w-full py-4 text-green-600 hover:text-green-700 transition-colors font-semibold"
          >
            Continuer la consultation
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl border border-green-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flag className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-bold">Engagements Officiels</span>
          </div>
          <p className="text-green-700 text-sm text-center font-medium">
            République du Sénégal - Ministère des Affaires Étrangères
          </p>
        </div>
      </div>
    </div>
  );
}

export default Convention