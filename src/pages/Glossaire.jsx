import { useState, useEffect } from 'react';
import { Search, BookOpen, Tag, Eye, Filter, Star, ArrowRight, Hash, Bot, Lightbulb, TrendingUp, Volume2, Bookmark, Share2, ThumbsUp, Download, Globe, Zap, Award, Target, Sparkles, Users, MessageCircle, PlayCircle, Clock, Brain, Layers, Book, FileText, Headphones, Shield, Building } from 'lucide-react';

const Glossaire = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLetter, setSelectedLetter] = useState('all');
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [featuredTerm, setFeaturedTerm] = useState(null);
  const [viewMode, setViewMode] = useState('detailed');
  const [aiSearchActive, setAiSearchActive] = useState(false);
  const [favoriteTerms, setFavoriteTerms] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularTerms, setPopularTerms] = useState([]);

  // Données enrichies du glossaire
  useEffect(() => {
    const sampleTerms = [
      {
        id: 1,
        term: 'Abrogation',
        category: 'Droit constitutionnel',
        definition: 'Suppression définitive d\'une loi ou d\'un règlement par une autorité compétente. L\'abrogation peut être expresse (explicitement mentionnée) ou tacite (résultant de l\'incompatibilité avec une nouvelle norme).',
        detailedDefinition: 'L\'abrogation constitue un acte juridique par lequel une autorité compétente met fin à l\'existence d\'une norme juridique. Elle se distingue de la dérogation qui n\'est qu\'une exception temporaire. En droit sénégalais, l\'abrogation des lois relève de la compétence de l\'Assemblée nationale.',
        examples: ['Abrogation d\'une loi par une nouvelle loi', 'Abrogation tacite par incompatibilité', 'Abrogation expresse dans un texte'],
        relatedTerms: ['Dérogation', 'Modification', 'Révision', 'Caducité'],
        letter: 'A',
        featured: true,
        difficulty: 'Intermédiaire',
        views: 1250,
        likes: 89,
        pronunciation: '/a.bʁo.ɡa.sjɔ̃/',
        etymology: 'Du latin "abrogatio", de "abrogare" (abroger)',
        lawReferences: ['Constitution du Sénégal, art. 78', 'Loi organique sur les lois'],
        isNew: false,
        lastUpdated: '2025-09-10'
      },
      {
        id: 2,
        term: 'Blockchain Juridique',
        category: 'Droit numérique',
        definition: 'Technologie de stockage et de transmission d\'informations juridiques de manière décentralisée, sécurisée et transparente, permettant de créer des registres infalsifiables pour les actes juridiques.',
        detailedDefinition: 'La blockchain juridique révolutionne la pratique du droit en permettant la création de smart contracts, la certification d\'horodatage et l\'authentification de documents. Au Sénégal, cette technologie commence à être utilisée pour les actes notariés et les contrats commerciaux.',
        examples: ['Contrats intelligents', 'Certification d\'horodatage', 'Registres fonciers décentralisés'],
        relatedTerms: ['Smart Contract', 'Signature électronique', 'Dématérialisation', 'Cryptographie'],
        letter: 'B',
        featured: true,
        difficulty: 'Avancé',
        views: 2100,
        likes: 156,
        pronunciation: '/blɔk.tʃejn/',
        etymology: 'De l\'anglais "block" (bloc) et "chain" (chaîne)',
        lawReferences: ['Loi sur les transactions électroniques', 'Décret sur la signature numérique'],
        isNew: true,
        lastUpdated: '2025-09-12'
      },
      {
        id: 3,
        term: 'Cassation',
        category: 'Procédure civile',
        definition: 'Annulation d\'une décision de justice par la Cour de cassation pour violation de la loi. La cassation ne rejuge pas l\'affaire au fond mais renvoie devant une autre juridiction.',
        detailedDefinition: 'La cassation est une voie de recours extraordinaire qui permet de contrôler la conformité des décisions de justice à la loi. Au Sénégal, la Cour de cassation est la plus haute juridiction de l\'ordre judiciaire et veille à l\'unité d\'interprétation du droit.',
        examples: ['Pourvoi en cassation', 'Arrêt de cassation avec renvoi', 'Cassation sans renvoi'],
        relatedTerms: ['Pourvoi', 'Cour de cassation', 'Renvoi', 'Juridiction suprême'],
        letter: 'C',
        featured: true,
        difficulty: 'Intermédiaire',
        views: 1890,
        likes: 134,
        pronunciation: '/ka.sa.sjɔ̃/',
        etymology: 'Du latin "cassatio", de "cassare" (casser)',
        lawReferences: ['Code de procédure civile, art. 605 et s.', 'Loi organique sur la Cour de cassation'],
        isNew: false,
        lastUpdated: '2025-09-08'
      },
      {
        id: 4,
        term: 'DAO (Organisation Autonome Décentralisée)',
        category: 'Droit des sociétés',
        definition: 'Entité organisationnelle gouvernée par des smart contracts sur blockchain, fonctionnant sans intervention humaine directe dans la prise de décisions opérationnelles.',
        detailedDefinition: 'Les DAO représentent une nouvelle forme d\'organisation juridique émergente. Bien que non encore réglementées au Sénégal, elles posent des questions importantes sur la personnalité juridique, la responsabilité et la gouvernance d\'entreprise.',
        examples: ['DAO de gouvernance', 'DAO d\'investissement', 'DAO de service'],
        relatedTerms: ['Smart Contract', 'Gouvernance décentralisée', 'Token', 'Blockchain'],
        letter: 'D',
        featured: false,
        difficulty: 'Avancé',
        views: 756,
        likes: 67,
        pronunciation: '/dao/',
        etymology: 'Acronyme anglais "Decentralized Autonomous Organization"',
        lawReferences: ['Projet de loi sur les actifs numériques', 'Directive européenne MiCA (référence)'],
        isNew: true,
        lastUpdated: '2025-09-11'
      },
      {
        id: 5,
        term: 'e-Résidence',
        category: 'Droit administratif',
        definition: 'Statut juridique numérique permettant à des non-résidents d\'accéder à certains services administratifs et commerciaux d\'un État via des plateformes digitales sécurisées.',
        detailedDefinition: 'L\'e-résidence, inspirée du modèle estonien, pourrait révolutionner l\'administration sénégalaise en permettant l\'accès distant aux services publics. Ce concept s\'inscrit dans la stratégie de digitalisation de l\'État.',
        examples: ['Création d\'entreprise en ligne', 'Déclaration fiscale dématérialisée', 'Authentification numérique'],
        relatedTerms: ['Administration numérique', 'Identité digitale', 'Services publics en ligne', 'Dématérialisation'],
        letter: 'E',
        featured: false,
        difficulty: 'Intermédiaire',
        views: 1123,
        likes: 98,
        pronunciation: '/e.ʁe.zi.dɑ̃s/',
        etymology: 'Néologisme de "électronique" et "résidence"',
        lawReferences: ['Stratégie numérique Sénégal 2025', 'Code de l\'administration numérique'],
        isNew: true,
        lastUpdated: '2025-09-09'
      },
      {
        id: 6,
        term: 'Force majeure',
        category: 'Droit des obligations',
        definition: 'Événement imprévisible, irrésistible et extérieur qui rend impossible l\'exécution d\'une obligation contractuelle, exonérant le débiteur de sa responsabilité.',
        detailedDefinition: 'La force majeure est une cause d\'exonération de responsabilité contractuelle. Depuis la pandémie de COVID-19, sa définition et son application ont évolué, particulièrement dans le contexte des contrats commerciaux au Sénégal.',
        examples: ['Catastrophe naturelle', 'Guerre', 'Épidémie', 'Cyber-attaque majeure'],
        relatedTerms: ['Cas fortuit', 'Impossibilité d\'exécution', 'Exonération', 'Pandémie'],
        letter: 'F',
        featured: true,
        difficulty: 'Débutant',
        views: 2567,
        likes: 234,
        pronunciation: '/fɔʁs.ma.ʒœʁ/',
        etymology: 'Du latin "vis major" (force supérieure)',
        lawReferences: ['Code des obligations civiles, art. 147', 'Loi sur les contrats commerciaux'],
        isNew: false,
        lastUpdated: '2025-09-07'
      },
      {
        id: 7,
        term: 'Gouvernance Algorithmique',
        category: 'Droit numérique',
        definition: 'Système de prise de décision utilisant des algorithmes d\'intelligence artificielle pour automatiser certains processus de gouvernance et de régulation juridique.',
        detailedDefinition: 'La gouvernance algorithmique transforme la pratique juridique en automatisant l\'analyse de jurisprudence, la rédaction de contrats et même certaines décisions administratives. Elle soulève des questions importantes sur la transparence et la responsabilité.',
        examples: ['IA de classification juridique', 'Systèmes experts en droit', 'Automatisation des décisions administratives'],
        relatedTerms: ['Intelligence artificielle', 'Algorithme', 'Automatisation juridique', 'LegalTech'],
        letter: 'G',
        featured: true,
        difficulty: 'Avancé',
        views: 1456,
        likes: 112,
        pronunciation: '/ɡu.vɛʁ.nɑ̃s.al.ɡo.ʁit.mik/',
        etymology: 'Composé de "gouvernance" et "algorithmique"',
        lawReferences: ['Projet de loi sur l\'IA', 'Règlement européen sur l\'IA (référence)'],
        isNew: true,
        lastUpdated: '2025-09-12'
      },
      {
        id: 8,
        term: 'Habeas Data',
        category: 'Protection des données',
        definition: 'Droit fondamental permettant à toute personne d\'accéder, de rectifier, de supprimer ou de transférer ses données personnelles détenues par des tiers.',
        detailedDefinition: 'L\'habeas data, équivalent numérique de l\'habeas corpus, garantit la protection des données personnelles. Au Sénégal, ce droit est renforcé par la loi sur la protection des données personnelles inspirée du RGPD européen.',
        examples: ['Droit d\'accès aux données', 'Droit de rectification', 'Droit à l\'effacement', 'Portabilité des données'],
        relatedTerms: ['RGPD', 'Protection des données', 'Vie privée', 'Données personnelles'],
        letter: 'H',
        featured: false,
        difficulty: 'Intermédiaire',
        views: 987,
        likes: 76,
        pronunciation: '/a.be.as.da.ta/',
        etymology: 'Du latin "habeas" (que tu aies) et anglais "data" (données)',
        lawReferences: ['Loi sur la protection des données personnelles', 'CDP - Commission de protection des données'],
        isNew: false,
        lastUpdated: '2025-09-06'
      }
    ];
    
    setTerms(sampleTerms);
    setFilteredTerms(sampleTerms);
    setFeaturedTerm(sampleTerms.find(term => term.featured));
    setPopularTerms(sampleTerms.sort((a, b) => b.views - a.views).slice(0, 5));
    setRecentSearches(['Blockchain', 'DAO', 'Force majeure', 'Cassation']);
  }, []);

  // Filtrage des termes
  useEffect(() => {
    let filtered = terms;

    if (searchTerm) {
      filtered = filtered.filter(term =>
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.relatedTerms.some(related => related.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(term => term.category === selectedCategory);
    }

    if (selectedLetter !== 'all') {
      filtered = filtered.filter(term => term.letter === selectedLetter);
    }

    setFilteredTerms(filtered);
  }, [searchTerm, selectedCategory, selectedLetter, terms]);

  const categories = [
    { name: 'Toutes catégories', value: 'all', count: terms.length, icon: BookOpen, color: 'yellow' },
    { name: 'Droit constitutionnel', value: 'Droit constitutionnel', count: terms.filter(t => t.category === 'Droit constitutionnel').length, icon: Award, color: 'green' },
    { name: 'Droit numérique', value: 'Droit numérique', count: terms.filter(t => t.category === 'Droit numérique').length, icon: Bot, color: 'yellow' },
    { name: 'Droit des sociétés', value: 'Droit des sociétés', count: terms.filter(t => t.category === 'Droit des sociétés').length, icon: Users, color: 'green' },
    { name: 'Procédure civile', value: 'Procédure civile', count: terms.filter(t => t.category === 'Procédure civile').length, icon: FileText, color: 'yellow' },
    { name: 'Protection des données', value: 'Protection des données', count: terms.filter(t => t.category === 'Protection des données').length, icon: Shield, color: 'green' },
    { name: 'Droit administratif', value: 'Droit administratif', count: terms.filter(t => t.category === 'Droit administratif').length, icon: Building, color: 'yellow' }
  ];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const toggleFavorite = (termId) => {
    setFavoriteTerms(prev => 
      prev.includes(termId) 
        ? prev.filter(id => id !== termId)
        : [...prev, termId]
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Débutant': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Avancé': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-100">
      <div className="pt-8">
        {/* En-tête révolutionnaire */}
        <div className="text-center py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-yellow-600/10"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/4 w-32 h-32 bg-green-300/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-32 right-1/4 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-green-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              Glossaire Intelligent
            </h1>
            <p className="text-2xl text-gray-700 mb-8">Dictionnaire juridique révolutionnaire avec IA intégrée</p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <Bot className="w-4 h-4 text-green-600" />
                IA Intégrée
              </span>
              <span className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <Volume2 className="w-4 h-4 text-yellow-600" />
                Prononciation Audio
              </span>
              <span className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <Layers className="w-4 h-4 text-green-600" />
                Définitions Multicouches
              </span>
            </div>
          </div>
        </div>

        {/* Terme vedette révolutionnaire */}
        {featuredTerm && (
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-yellow-200 relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-yellow-500"></div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-500 fill-current animate-pulse" />
                    <span className="text-sm font-bold text-green-600 uppercase tracking-wide bg-green-100 px-3 py-1 rounded-full">Terme Vedette IA</span>
                  </div>
                  {featuredTerm.isNew && (
                    <span className="bg-gradient-to-r from-green-400 to-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce">
                      NOUVEAU
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">{featuredTerm.term}</h2>
                      <button 
                        onClick={() => toggleFavorite(featuredTerm.id)}
                        className="p-2 rounded-full hover:bg-green-50 transition-colors"
                      >
                        <Bookmark className={`w-5 h-5 ${favoriteTerms.includes(featuredTerm.id) ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                      </button>
                      <button className="p-2 rounded-full hover:bg-yellow-50 transition-colors">
                        <Volume2 className="w-5 h-5 text-green-600" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-6">
                      <span className="bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                        {featuredTerm.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm border ${getDifficultyColor(featuredTerm.difficulty)}`}>
                        {featuredTerm.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">{featuredTerm.pronunciation}</span>
                    </div>
                    
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">{featuredTerm.detailedDefinition}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50 rounded-2xl p-4">
                        <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Exemples pratiques
                        </h4>
                        <ul className="space-y-2">
                          {featuredTerm.examples.map((example, index) => (
                            <li key={index} className="text-sm text-green-700 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-yellow-50 rounded-2xl p-4">
                        <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                          <Book className="w-4 h-4" />
                          Références légales
                        </h4>
                        <ul className="space-y-2">
                          {featuredTerm.lawReferences.map((ref, index) => (
                            <li key={index} className="text-sm text-yellow-700 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                              {ref}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-6 border border-green-200">
                      <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        Statistiques
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Vues</span>
                          <span className="font-bold text-green-600">{featuredTerm.views}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">J'aime</span>
                          <span className="font-bold text-yellow-600">{featuredTerm.likes}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Dernière MAJ</span>
                          <span className="font-bold text-gray-700 text-xs">{featuredTerm.lastUpdated}</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <h5 className="font-semibold text-gray-800 mb-3">Termes associés</h5>
                        <div className="flex flex-wrap gap-2">
                          {featuredTerm.relatedTerms.slice(0, 4).map((related, index) => (
                            <span
                              key={index}
                              className="bg-white text-green-700 px-3 py-1 rounded-full text-sm border border-green-200 hover:bg-green-50 cursor-pointer transition-colors"
                            >
                              {related}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Barre de recherche IA */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-yellow-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-yellow-50/50"></div>
            <div className="relative">
              <div className="flex flex-col lg:flex-row gap-6 mb-6">
                <div className="flex-1 relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {aiSearchActive ? (
                      <div className="flex items-center gap-2">
                        <Bot className="text-green-500 w-6 h-6 animate-pulse" />
                        <Sparkles className="text-yellow-500 w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      <Search className="text-gray-400 w-6 h-6" />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher un terme juridique... L'IA comprend vos questions en langage naturel !"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setAiSearchActive(true)}
                    onBlur={() => setAiSearchActive(false)}
                    className="w-full pl-16 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all text-lg bg-gradient-to-r from-white to-yellow-50/30"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <button className="p-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-xl hover:shadow-lg transition-all">
                      <Headphones className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <button className="bg-gradient-to-r from-green-600 to-yellow-600 text-white px-8 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 font-medium">
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Recherche IA
                  </div>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none bg-white"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-gray-500" />
                  <select
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none bg-white"
                  >
                    <option value="detailed">Vue détaillée</option>
                    <option value="compact">Vue compacte</option>
                    <option value="cards">Vue cartes</option>
                  </select>
                </div>
              </div>

              {/* Index alphabétique modernisé */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Hash className="w-5 h-5 text-green-600" />
                  Navigation Alphabétique Intelligente
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                  <button
                    onClick={() => setSelectedLetter('all')}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                      selectedLetter === 'all'
                        ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 border border-gray-200'
                    }`}
                  >
                    Tous
                  </button>
                  {alphabet.map(letter => {
                    const count = terms.filter(term => term.letter === letter).length;
                    return (
                      <button
                        key={letter}
                        onClick={() => setSelectedLetter(letter)}
                        className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${
                          selectedLetter === letter
                            ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-white shadow-lg transform scale-105'
                            : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 border border-gray-200'
                        }`}
                      >
                        {letter}
                        {count > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recherches récentes et suggestions */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Recherches récentes:</span>
                  {recentSearches.slice(0, 4).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchTerm(search)}
                      className="bg-gray-100 hover:bg-green-50 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal révolutionnaire */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12">
          {/* Liste des termes */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-yellow-200">
              <div className="p-6 border-b bg-gradient-to-r from-green-50 via-yellow-50 to-green-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-green-600" />
                    Définitions ({filteredTerms.length})
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
                      Mis à jour en temps réel
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {viewMode === 'cards' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTerms.map((term) => (
                      <div key={term.id} className="bg-gradient-to-br from-white to-green-50/30 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-green-100">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                              {term.letter}
                            </div>
                            <h3 className="text-xl font-bold text-green-800">{term.term}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            {term.isNew && (
                              <span className="bg-green-400 text-white px-2 py-1 rounded-full text-xs font-bold">NEW</span>
                            )}
                            <button 
                              onClick={() => toggleFavorite(term.id)}
                              className="p-1 rounded hover:bg-green-100"
                            >
                              <Bookmark className={`w-4 h-4 ${favoriteTerms.includes(term.id) ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                            </button>
                          </div>
                        </div>
                        
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                          {term.category}
                        </span>
                        
                        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                          {term.definition}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {term.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {term.likes}
                            </span>
                          </div>
                          <span className={`px-2 py-1 rounded-full ${getDifficultyColor(term.difficulty)}`}>
                            {term.difficulty}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-0">
                    {filteredTerms.map((term, index) => (
                      <div
                        key={term.id}
                        className={`group p-6 hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 transition-all duration-300 cursor-pointer border-b last:border-b-0 hover:translate-x-2 ${
                          viewMode === 'compact' ? 'py-4' : ''
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                          <div className="flex items-center gap-4 mb-3 lg:mb-0">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                              {term.letter}
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-bold text-green-800 group-hover:text-green-600">{term.term}</h3>
                                {term.isNew && (
                                  <span className="bg-gradient-to-r from-green-400 to-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                    NOUVEAU
                                  </span>
                                )}
                                <button className="p-1 rounded-full hover:bg-green-100 transition-colors">
                                  <Volume2 className="w-4 h-4 text-green-600" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>{term.pronunciation}</span>
                                <span>•</span>
                                <span>{term.etymology}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              {term.category}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm border ${getDifficultyColor(term.difficulty)}`}>
                              {term.difficulty}
                            </span>
                            <button 
                              onClick={() => toggleFavorite(term.id)}
                              className="p-2 rounded-full hover:bg-yellow-50 transition-colors"
                            >
                              <Bookmark className={`w-4 h-4 ${favoriteTerms.includes(term.id) ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                            </button>
                            <button className="p-2 rounded-full hover:bg-green-50 transition-colors">
                              <Share2 className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                          {viewMode === 'compact' ? term.definition : term.detailedDefinition}
                        </p>
                        
                        {viewMode === 'detailed' && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                              {term.examples && term.examples.length > 0 && (
                                <div className="bg-green-50 rounded-xl p-4">
                                  <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    Exemples pratiques
                                  </h4>
                                  <ul className="space-y-2">
                                    {term.examples.map((example, exampleIndex) => (
                                      <li key={exampleIndex} className="text-sm text-green-700 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                        {example}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {term.lawReferences && term.lawReferences.length > 0 && (
                                <div className="bg-yellow-50 rounded-xl p-4">
                                  <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                                    <Book className="w-4 h-4" />
                                    Références légales
                                  </h4>
                                  <ul className="space-y-2">
                                    {term.lawReferences.map((ref, refIndex) => (
                                      <li key={refIndex} className="text-sm text-yellow-700 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                                        {ref}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-2">
                                {term.relatedTerms.map((related, relatedIndex) => (
                                  <span
                                    key={relatedIndex}
                                    className="bg-white text-green-700 px-3 py-1 rounded-full text-sm border border-green-200 hover:bg-green-50 cursor-pointer transition-colors flex items-center gap-1"
                                  >
                                    <Tag className="w-3 h-3" />
                                    {related}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {term.views}
                                </span>
                                <span className="flex items-center gap-1">
                                  <ThumbsUp className="w-3 h-3" />
                                  {term.likes}
                                </span>
                                <span>Mis à jour: {term.lastUpdated}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {filteredTerms.length === 0 && (
                  <div className="text-center py-16">
                    <Bot className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-600 mb-4">Aucun terme trouvé</h3>
                    <p className="text-gray-500 mb-6">Essayez de reformuler votre recherche ou utilisez notre IA pour des suggestions</p>
                    <button className="bg-gradient-to-r from-green-500 to-yellow-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-medium">
                      Demander à l'IA
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar enrichie */}
          <div className="lg:col-span-1 space-y-6">
            {/* Statistiques en temps réel */}
            <div className="bg-gradient-to-br from-green-600 to-yellow-600 text-white p-6 rounded-3xl text-center shadow-2xl">
              <div className="text-4xl font-bold mb-2">{terms.length}</div>
              <div className="text-sm opacity-90 mb-4">Termes définis</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold">{terms.filter(t => t.isNew).length}</div>
                  <div className="opacity-80">Nouveaux</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{favoriteTerms.length}</div>
                  <div className="opacity-80">Favoris</div>
                </div>
              </div>
            </div>

            {/* Catégories avec icônes */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-green-600" />
                Catégories Juridiques
              </h3>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 hover:translate-x-2 border-2 ${
                        selectedCategory === category.value
                          ? `bg-gradient-to-r from-${category.color}-50 to-${category.color}-100 text-${category.color}-700 font-bold border-${category.color}-300 shadow-lg`
                          : 'hover:bg-gray-50 border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r from-${category.color}-400 to-${category.color}-600`}>
                          <category.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        selectedCategory === category.value 
                          ? `bg-${category.color}-200 text-${category.color}-800`
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Termes populaires avec analytics */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
                Tendances
              </h3>
              <div className="space-y-4">
                {popularTerms.map((term, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-green-50 transition-all cursor-pointer border border-gray-100">
                    <div className="bg-gradient-to-r from-yellow-400 to-green-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-sm">{term.term}</div>
                      <div className="text-xs text-gray-500">{term.category}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {term.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {term.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assistant IA intégré */}
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl shadow-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Bot className="w-5 h-5 text-green-600" />
                Assistant Définitions IA
              </h3>
              <p className="text-sm text-gray-600 mb-4">Obtenez des définitions personnalisées et des explications adaptées à votre niveau.</p>
              <button className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all font-medium">
                <div className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Discuter avec l'IA
                </div>
              </button>
            </div>

            {/* Outils rapides */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Outils Rapides</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl transition-colors">
                  <Download className="w-4 h-4" />
                  Exporter le glossaire
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-xl transition-colors">
                  <PlayCircle className="w-4 h-4" />
                  Mode apprentissage
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors">
                  <Globe className="w-4 h-4" />
                  Traductions multilingues
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section d'amélioration continue */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="bg-gradient-to-r from-green-600 to-yellow-600 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Participez à l'Enrichissement du Glossaire</h2>
              <p className="text-xl mb-8 opacity-90">Votre expertise contribue à améliorer le droit sénégalais</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Lightbulb className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Suggérer des Termes</h3>
                  <p className="text-sm opacity-90">Proposez de nouveaux termes juridiques</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Users className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Révision Collaborative</h3>
                  <p className="text-sm opacity-90">Participez à la révision des définitions</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Award className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Devenir Expert</h3>
                  <p className="text-sm opacity-90">Obtenez le statut d'expert contributeur</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-green-600 px-8 py-4 rounded-2xl hover:shadow-xl transition-all text-lg font-bold hover:scale-105">
                  Contribuer Maintenant
                </button>
                <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl hover:bg-white/30 transition-all text-lg font-bold border-2 border-white/30">
                  En Savoir Plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Glossaire;