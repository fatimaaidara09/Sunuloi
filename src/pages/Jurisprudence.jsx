import { useState, useEffect } from 'react';
import { 
  Search, 
  Scale, 
  Calendar, 
  Tag, 
  Eye, 
  Download, 
  BookOpen, 
  TrendingUp, 
  Filter, 
  ArrowLeft,
  Bell,
  User,
  Sparkles,
  Award,
  Building,
  Users,
  AlertCircle,
  Share2,
  Bookmark,
  Clock,
  Star,
  ChevronDown,
  FileText,
  Gavel,
  Shield,
  Home,
  Briefcase
} from 'lucide-react';

const Jurisprudence = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [jurisprudences, setJurisprudences] = useState([]);
  const [filteredJurisprudences, setFilteredJurisprudences] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [viewMode, setViewMode] = useState('cards');

  useEffect(() => {
    const sampleJurisprudences = [
      {
        id: 1,
        reference: 'CS-SEN-2024-001',
        title: 'Arrêt sur les droits fonciers coutumiers au Sénégal',
        jurisdiction: 'Cour Suprême du Sénégal',
        domain: 'Droit foncier',
        date: '2024-11-15',
        year: '2024',
        summary: "La Cour Suprême précise les modalités de reconnaissance des droits fonciers coutumiers et leur articulation avec le droit moderne de la propriété au Sénégal.",
        keywords: ['Droits fonciers', 'Coutume', 'Propriété', 'Sénégal'],
        parties: 'Famille Diop c/ État du Sénégal',
        impact: 'Très haute',
        citations: 45,
        isNew: true,
        region: 'Dakar',
        fullText: false
      },
      {
        id: 2,
        reference: 'CA-DKR-2024-045',
        title: 'Décision sur le harcèlement au travail dans la fonction publique',
        jurisdiction: 'Cour d\'Appel de Dakar',
        domain: 'Droit du travail',
        date: '2024-10-22',
        year: '2024',
        summary: "Arrêt établissant la responsabilité de l'administration en cas de harcèlement moral dans la fonction publique sénégalaise et les voies de recours des agents.",
        keywords: ['Harcèlement', 'Fonction publique', 'Responsabilité', 'Administration'],
        parties: 'Agent M. Ndiaye c/ Ministère de l\'Éducation',
        impact: 'Haute',
        citations: 28,
        isNew: true,
        region: 'Dakar',
        fullText: true
      },
      {
        id: 3,
        reference: 'TA-DKR-2024-089',
        title: 'Jugement sur la dématérialisation des services publics',
        jurisdiction: 'Tribunal Administratif de Dakar',
        domain: 'Droit administratif',
        date: '2024-09-18',
        year: '2024',
        summary: 'Le Tribunal précise les obligations de l\'administration en matière de dématérialisation et d\'accès numérique aux services publics au Sénégal.',
        keywords: ['Dématérialisation', 'Services publics', 'Numérique', 'Accès'],
        parties: 'Association des Usagers c/ Commune de Dakar',
        impact: 'Moyenne',
        citations: 15,
        isNew: false,
        region: 'Dakar',
        fullText: true
      },
      {
        id: 4,
        reference: 'CC-SEN-2023-007',
        title: "Décision constitutionnelle sur la parité en politique",
        jurisdiction: 'Conseil Constitutionnel',
        domain: 'Droit constitutionnel',
        date: '2023-12-05',
        year: '2023',
        summary: "Le Conseil Constitutionnel interprète les dispositions sur la parité homme-femme dans les instances électives et leur application effective.",
        keywords: ['Parité', 'Élections', 'Constitution', 'Genre'],
        parties: 'Parti politique ABC c/ Commission électorale',
        impact: 'Très haute',
        citations: 67,
        isNew: false,
        region: 'Dakar',
        fullText: true
      },
      {
        id: 5,
        reference: 'TC-DKR-2023-156',
        title: 'Arrêt sur les contrats OHADA et le droit sénégalais',
        jurisdiction: 'Tribunal de Commerce de Dakar',
        domain: 'Droit commercial',
        date: '2023-11-30',
        year: '2023',
        summary: "Décision clarifiant l'articulation entre le droit OHADA et les spécificités du droit commercial sénégalais en matière contractuelle.",
        keywords: ['OHADA', 'Contrats', 'Commerce', 'Harmonisation'],
        parties: 'Société SONATEL c/ Entreprise Malienne',
        impact: 'Haute',
        citations: 34,
        isNew: false,
        region: 'Dakar',
        fullText: false
      },
      {
        id: 6,
        reference: 'TGI-SL-2024-023',
        title: 'Jugement sur les violences basées sur le genre',
        jurisdiction: 'TGI de Saint-Louis',
        domain: 'Droit pénal',
        date: '2024-08-12',
        year: '2024',
        summary: "Le Tribunal précise l'application de la loi criminalisant les violences basées sur le genre et les mesures de protection des victimes.",
        keywords: ['Violences', 'Genre', 'Protection', 'Victimes'],
        parties: 'Ministère Public c/ M. Fall',
        impact: 'Haute',
        citations: 19,
        isNew: false,
        region: 'Saint-Louis',
        fullText: true
      }
    ];
    setJurisprudences(sampleJurisprudences);
    setFilteredJurisprudences(sampleJurisprudences);
  }, []);

  useEffect(() => {
    let filtered = jurisprudences;

    if (searchTerm) {
      filtered = filtered.filter(j =>
        j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedJurisdiction !== 'all') {
      filtered = filtered.filter(j => j.jurisdiction === selectedJurisdiction);
    }

    if (selectedDomain !== 'all') {
      filtered = filtered.filter(j => j.domain === selectedDomain);
    }

    if (selectedYear !== 'all') {
      filtered = filtered.filter(j => j.year === selectedYear);
    }

    setFilteredJurisprudences(filtered);
  }, [searchTerm, selectedJurisdiction, selectedDomain, selectedYear, jurisprudences]);

  const jurisdictions = [
    { name: 'Toutes juridictions', value: 'all', count: jurisprudences.length, icon: Scale },
    { name: 'Cour Suprême du Sénégal', value: 'Cour Suprême du Sénégal', count: jurisprudences.filter(j => j.jurisdiction === 'Cour Suprême du Sénégal').length, icon: Award },
    { name: 'Cour d\'Appel de Dakar', value: 'Cour d\'Appel de Dakar', count: jurisprudences.filter(j => j.jurisdiction === 'Cour d\'Appel de Dakar').length, icon: Building },
    { name: 'Conseil Constitutionnel', value: 'Conseil Constitutionnel', count: jurisprudences.filter(j => j.jurisdiction === 'Conseil Constitutionnel').length, icon: Shield },
    { name: 'Tribunal Administratif de Dakar', value: 'Tribunal Administratif de Dakar', count: jurisprudences.filter(j => j.jurisdiction === 'Tribunal Administratif de Dakar').length, icon: Home },
    { name: 'Tribunal de Commerce de Dakar', value: 'Tribunal de Commerce de Dakar', count: jurisprudences.filter(j => j.jurisdiction === 'Tribunal de Commerce de Dakar').length, icon: Briefcase },
    { name: 'TGI de Saint-Louis', value: 'TGI de Saint-Louis', count: jurisprudences.filter(j => j.jurisdiction === 'TGI de Saint-Louis').length, icon: Gavel }
  ];

  const domains = [
    { name: 'Tous domaines', value: 'all' },
    { name: 'Droit foncier', value: 'Droit foncier' },
    { name: 'Droit du travail', value: 'Droit du travail' },
    { name: 'Droit administratif', value: 'Droit administratif' },
    { name: 'Droit constitutionnel', value: 'Droit constitutionnel' },
    { name: 'Droit commercial', value: 'Droit commercial' },
    { name: 'Droit pénal', value: 'Droit pénal' }
  ];

  const years = [
    { name: 'Toutes années', value: 'all' },
    { name: '2024', value: '2024' },
    { name: '2023', value: '2023' },
    { name: '2022', value: '2022' },
    { name: '2021', value: '2021' }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Très haute': return 'bg-red-100 text-red-800 border-red-200';
      case 'Haute': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Faible': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDomainIcon = (domain) => {
    switch (domain) {
      case 'Droit foncier': return Home;
      case 'Droit du travail': return Briefcase;
      case 'Droit administratif': return Building;
      case 'Droit constitutionnel': return Shield;
      case 'Droit commercial': return TrendingUp;
      case 'Droit pénal': return Gavel;
      default: return Scale;
    }
  };

  const checkAuth = () => {
    setShowLoginModal(true);
    return false;
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
                  <p className="text-xs text-green-600 font-medium">Jurisprudence</p>
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
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.06&quot;%3E%3Cpolygon points=&quot;30,10 50,50 10,50&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Gavel className="w-4 h-4 text-yellow-300" />
            <span className="text-white/90 text-sm font-medium">Justice Sénégalaise</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight flex items-center justify-center gap-6">
            <Scale className="w-16 h-16 sm:w-20 sm:h-20" />
            <div>
              Jurisprudence
              <span className="block text-yellow-300 text-3xl sm:text-5xl">du Sénégal</span>
            </div>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            Consultez les décisions de justice, arrêts de principe et jurisprudence 
            des juridictions sénégalaises
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4">
              <Gavel className="w-6 h-6 text-yellow-300" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{jurisprudences.length}</div>
                <div className="text-white/80 text-sm">Décisions disponibles</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4">
              <Building className="w-6 h-6 text-yellow-300" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{jurisdictions.length - 1}</div>
                <div className="text-white/80 text-sm">Juridictions</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4">
              <TrendingUp className="w-6 h-6 text-yellow-300" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{jurisprudences.filter(j => j.isNew).length}</div>
                <div className="text-white/80 text-sm">Nouvelles décisions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barre de recherche modernisée */}
      <section className="relative -mt-12 max-w-7xl mx-auto px-4 z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-green-600 group-focus-within:text-green-700 transition-colors" />
              <input
                type="text"
                placeholder="Rechercher une décision de justice (référence, titre, mots-clés...)"
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
            <div className="flex items-center gap-2 text-green-700 font-medium">
              <Filter className="w-5 h-5" />
              Filtres :
            </div>
            
            <select
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              className="px-4 py-3 border-2 border-green-100 rounded-2xl focus:border-green-500 outline-none text-green-800 font-medium bg-white"
            >
              {jurisdictions.map((jur) => (
                <option key={jur.value} value={jur.value}>{jur.name} ({jur.count})</option>
              ))}
            </select>

            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="px-4 py-3 border-2 border-green-100 rounded-2xl focus:border-green-500 outline-none text-green-800 font-medium bg-white"
            >
              {domains.map((domain) => (
                <option key={domain.value} value={domain.value}>{domain.name}</option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-3 border-2 border-green-100 rounded-2xl focus:border-green-500 outline-none text-green-800 font-medium bg-white"
            >
              {years.map((year) => (
                <option key={year.value} value={year.value}>{year.name}</option>
              ))}
            </select>
          </div>

          {/* Tags de filtrage rapide */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <span className="text-green-700 font-medium">Raccourcis :</span>
            {[
              { name: "Nouvelles", filter: () => setFilteredJurisprudences(jurisprudences.filter(j => j.isNew)), icon: Sparkles },
              { name: "Impact élevé", filter: () => setFilteredJurisprudences(jurisprudences.filter(j => j.impact === 'Très haute')), icon: Award },
              { name: "2024", filter: () => setSelectedYear('2024'), icon: Calendar },
              { name: "Cour Suprême", filter: () => setSelectedJurisdiction('Cour Suprême du Sénégal'), icon: Scale }
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
          {/* Liste des jurisprudences */}
          <div className="lg:col-span-3">
            {/* En-tête des résultats */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-2">
                  {filteredJurisprudences.length} décision{filteredJurisprudences.length > 1 ? 's' : ''} trouvée{filteredJurisprudences.length > 1 ? 's' : ''}
                </h2>
                <p className="text-green-600 text-lg">
                  Jurisprudence des tribunaux sénégalais
                </p>
              </div>
              
              <div className="flex items-center gap-2 bg-yellow-100 rounded-2xl px-4 py-2 border border-yellow-200">
                <Sparkles className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-700 font-medium">
                  {jurisprudences.filter(j => j.isNew).length} nouvelles décisions
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100/50">
              {filteredJurisprudences.map((juris) => (
                <JurisprudenceCard 
                  key={juris.id} 
                  juris={juris} 
                  getImpactColor={getImpactColor}
                  getDomainIcon={getDomainIcon}
                  checkAuth={checkAuth}
                />
              ))}
              
              {filteredJurisprudences.length === 0 && (
                <div className="text-center py-20">
                  <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded-3xl p-12 max-w-md mx-auto">
                    <Scale className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-green-800 mb-4">Aucune décision trouvée</h3>
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
              <div className="text-4xl font-bold mb-3">{jurisprudences.length}</div>
              <div className="text-lg opacity-90 mb-4">Décisions disponibles</div>
              <div className="bg-white/20 rounded-2xl p-4">
                <div className="text-2xl font-bold">{jurisprudences.filter(j => j.isNew).length}</div>
                <div className="text-sm opacity-90">Nouvelles en 2024</div>
              </div>
            </div>

            {/* Juridictions */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100/50">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
                <Scale className="w-6 h-6 text-green-600" />
                Juridictions
              </h3>
              <ul className="space-y-3">
                {jurisdictions.map((jur, index) => {
                  const IconComponent = jur.icon;
                  return (
                    <li key={index} 
                      onClick={() => setSelectedJurisdiction(jur.value)}
                      className={`group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedJurisdiction === jur.value 
                          ? 'bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 font-bold border-2 border-green-300 shadow-lg' 
                          : 'hover:bg-green-50 border-2 border-transparent hover:border-green-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${selectedJurisdiction === jur.value ? 'bg-green-500' : 'bg-green-100 group-hover:bg-green-200'}`}>
                          <IconComponent className={`w-4 h-4 ${selectedJurisdiction === jur.value ? 'text-white' : 'text-green-600'}`} />
                        </div>
                        <span className="text-sm font-medium">{jur.name}</span>
                      </div>
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-bold">{jur.count}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Domaines les plus consultés */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100/50">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
                Domaines populaires
              </h3>
              <div className="space-y-3">
                {domains.slice(1, 5).map((domain, index) => {
                  const count = jurisprudences.filter(j => j.domain === domain.value).length;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors cursor-pointer"
                         onClick={() => setSelectedDomain(domain.value)}>
                      <span className="text-green-800 font-medium">{domain.name}</span>
                      <span className="text-green-600 font-bold">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de connexion */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

// Composant pour les cartes de jurisprudence
function JurisprudenceCard({ juris, getImpactColor, getDomainIcon, checkAuth }) {
  const DomainIcon = getDomainIcon(juris.domain);
  
  return (
    <div className="p-8 border-b border-green-100 last:border-b-0 hover:bg-gradient-to-r hover:from-green-50/50 hover:to-yellow-50/50 transition-all duration-300 group">
      {/* En-tête avec badges */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-lg">
          {juris.reference}
        </span>
        
        <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-2xl border-2 border-green-200">
          <DomainIcon className="w-4 h-4" />
          <span className="font-medium text-sm">{juris.domain}</span>
        </div>
        
        <span className={`px-3 py-2 rounded-2xl text-sm font-bold border-2 ${getImpactColor(juris.impact)}`}>
          Impact {juris.impact}
        </span>
        
        {juris.isNew && (
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3 h-3" />
            NOUVEAU
          </div>
        )}
        
        {juris.fullText && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <FileText className="w-3 h-3" />
            TEXTE INTÉGRAL
          </div>
        )}
      </div>

      {/* Informations contextuelles */}
      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 text-green-600">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">{new Date(juris.date).toLocaleDateString('fr-FR')}</span>
        </div>
        <div className="flex items-center gap-2 text-green-600">
          <Building className="w-4 h-4" />
          <span className="font-medium">{juris.jurisdiction}</span>
        </div>
        <div className="flex items-center gap-2 text-green-600">
          <Users className="w-4 h-4" />
          <span className="font-medium">{juris.region}</span>
        </div>
      </div>

      {/* Titre et parties */}
      <h3 className="text-xl font-bold text-green-800 mb-2 group-hover:text-green-600 transition-colors leading-tight">
        {juris.title}
      </h3>
      <div className="text-sm text-green-600 mb-4 italic font-medium bg-green-50 rounded-xl px-4 py-2 border border-green-200">
        <strong>Parties :</strong> {juris.parties}
      </div>

      {/* Résumé */}
      <p className="text-green-700 leading-relaxed mb-6 text-lg">
        {juris.summary}
      </p>

      {/* Mots-clés */}
      <div className="flex flex-wrap gap-2 mb-6">
        {juris.keywords.map((keyword, index) => (
          <span key={index} className="bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 px-3 py-2 rounded-2xl text-sm flex items-center gap-2 border border-green-200 hover:shadow-md transition-all duration-300">
            <Tag className="w-3 h-3" />
            {keyword}
          </span>
        ))}
      </div>

      {/* Actions et statistiques */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={juris.fullText ? () => {} : checkAuth}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all duration-300 hover:scale-105 ${
              juris.fullText 
                ? 'text-green-700 bg-green-100 hover:bg-green-200 border-2 border-green-300' 
                : 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-300'
            }`}
          >
            <Eye className="w-4 h-4" />
            {juris.fullText ? 'Consulter' : 'Aperçu'}
          </button>
          
          <button 
            onClick={checkAuth}
            className="flex items-center gap-2 text-blue-700 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-2xl font-medium transition-all duration-300 hover:scale-105 border-2 border-blue-300"
          >
            <Download className="w-4 h-4" />
            Télécharger PDF
          </button>
          
          <button 
            onClick={checkAuth}
            className="flex items-center gap-2 text-purple-700 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-2xl font-medium transition-all duration-300 hover:scale-105 border-2 border-purple-300"
          >
            <Share2 className="w-4 h-4" />
            Partager
          </button>
          
          <button 
            onClick={checkAuth}
            className="flex items-center gap-2 text-orange-700 bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-2xl font-medium transition-all duration-300 hover:scale-105 border-2 border-orange-300"
          >
            <Bookmark className="w-4 h-4" />
            Sauvegarder
          </button>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-2xl border border-green-200">
            <TrendingUp className="w-4 h-4" />
            <span className="font-bold">{juris.citations} citations</span>
          </div>
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-2xl border border-blue-200">
            <Clock className="w-4 h-4" />
            <span className="font-bold">{juris.year}</span>
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
            <Scale className="w-10 h-10 text-green-700" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-4">Accès Premium Requis</h3>
          <p className="text-green-700 leading-relaxed">
            Pour accéder au texte intégral des décisions, télécharger les documents et gérer vos favoris, 
            rejoignez la communauté juridique Sunu Loi.
          </p>
        </div>

        <div className="space-y-4">
          <button className="w-full py-4 bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
            Se connecter
          </button>
          <button className="w-full py-4 border-2 border-green-300 text-green-700 rounded-2xl font-bold hover:bg-green-50 transition-all duration-300 hover:scale-105">
            Créer un compte avocat/juriste
          </button>
          <button 
            onClick={onClose}
            className="w-full py-4 text-green-600 hover:text-green-700 transition-colors font-semibold"
          >
            Continuer en consultation limitée
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl border border-green-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-bold">Plateforme Officielle</span>
          </div>
          <p className="text-green-700 text-sm text-center font-medium">
            République du Sénégal - Ministère de la Justice
          </p>
        </div>
      </div>
    </div>
  );
}

export default Jurisprudence