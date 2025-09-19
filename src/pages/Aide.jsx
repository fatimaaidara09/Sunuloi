import { useState, useEffect } from 'react';
import { Search, HelpCircle, ChevronDown, ChevronUp, Book, MessageCircle, Phone, Mail, Video, FileText, Users, Settings, Star, Zap, Bot, Lightbulb, TrendingUp, Clock, Filter, ArrowRight, Bookmark, Share2, ThumbsUp, Eye, PlayCircle, Download, Globe, Shield, Headphones, Calendar } from 'lucide-react';

const AideFAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid ou list
  const [aiSearchActive, setAiSearchActive] = useState(false);
  const [quickTips, setQuickTips] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  // Données enrichies des FAQ
  useEffect(() => {
    const faqData = [
      {
        id: 1,
        question: 'Comment utiliser la recherche intelligente IA de Sunu Loi ?',
        answer: 'Notre IA révolutionnaire comprend le langage naturel. Posez vos questions comme "Que dit la loi sur les contrats de travail au Sénégal ?" et obtenez des réponses précises avec des références exactes aux articles de loi.',
        category: 'IA & Recherche',
        popularity: 98,
        tags: ['IA', 'recherche', 'langage naturel'],
        difficulty: 'Débutant',
        readTime: '2 min',
        views: 1250,
        helpful: 234,
        lastUpdated: '2025-09-10',
        videoTutorial: true,
        isNew: true
      },
      {
        id: 2,
        question: 'Comment fonctionne l\'analyse automatique de documents ?',
        answer: 'Uploadez vos contrats, décisions ou documents juridiques. Notre IA analyse automatiquement le contenu, identifie les clauses importantes, détecte les risques potentiels et suggère des améliorations basées sur la jurisprudence sénégalaise.',
        category: 'IA & Analyse',
        popularity: 95,
        tags: ['analyse', 'documents', 'contrats', 'risques'],
        difficulty: 'Intermédiaire',
        readTime: '3 min',
        views: 980,
        helpful: 198,
        lastUpdated: '2025-09-08',
        videoTutorial: true,
        isNew: true
      },
      {
        id: 3,
        question: 'Comment utiliser l\'assistant juridique virtuel ?',
        answer: 'Notre assistant IA est disponible 24/7. Il peut répondre à des questions complexes, rédiger des modèles de documents, expliquer des termes juridiques et même vous guider dans des procédures administratives sénégalaises.',
        category: 'Assistant IA',
        popularity: 92,
        tags: ['assistant', 'IA', '24/7', 'rédaction'],
        difficulty: 'Débutant',
        readTime: '2 min',
        views: 1105,
        helpful: 267,
        lastUpdated: '2025-09-12',
        videoTutorial: true,
        isNew: false
      },
      {
        id: 4,
        question: 'Comment créer des alertes juridiques personnalisées ?',
        answer: 'Configurez des alertes intelligentes pour être notifié automatiquement des nouvelles lois, décrets ou jurisprudences dans vos domaines d\'expertise. L\'IA analyse la pertinence et ne vous envoie que l\'essentiel.',
        category: 'Notifications Smart',
        popularity: 88,
        tags: ['alertes', 'notifications', 'personnalisation'],
        difficulty: 'Intermédiaire',
        readTime: '4 min',
        views: 756,
        helpful: 145,
        lastUpdated: '2025-09-05',
        videoTutorial: false,
        isNew: false
      },
      {
        id: 5,
        question: 'Comment utiliser la recherche vocale et dictée ?',
        answer: 'Activez la recherche vocale pour poser vos questions oralement. Parfait pour les avocats en déplacement ! La reconnaissance vocale est optimisée pour le français et le wolof.',
        category: 'Innovation',
        popularity: 85,
        tags: ['vocal', 'dictée', 'mobilité', 'wolof'],
        difficulty: 'Débutant',
        readTime: '2 min',
        views: 623,
        helpful: 112,
        lastUpdated: '2025-09-07',
        videoTutorial: true,
        isNew: true
      },
      {
        id: 6,
        question: 'Comment collaborer avec d\'autres juristes ?',
        answer: 'Partagez vos recherches, créez des espaces de travail collaboratifs, annotez des documents en équipe et échangez avec la communauté juridique sénégalaise via notre plateforme intégrée.',
        category: 'Collaboration',
        popularity: 82,
        tags: ['collaboration', 'partage', 'communauté'],
        difficulty: 'Intermédiaire',
        readTime: '5 min',
        views: 445,
        helpful: 98,
        lastUpdated: '2025-09-03',
        videoTutorial: false,
        isNew: false
      },
      {
        id: 7,
        question: 'Comment accéder aux fonctionnalités hors-ligne ?',
        answer: 'Téléchargez les documents essentiels pour y accéder sans internet. L\'application mobile synchronise automatiquement vos données quand vous retrouvez une connexion.',
        category: 'Mobile & Offline',
        popularity: 79,
        tags: ['hors-ligne', 'mobile', 'synchronisation'],
        difficulty: 'Avancé',
        readTime: '3 min',
        views: 334,
        helpful: 76,
        lastUpdated: '2025-09-01',
        videoTutorial: false,
        isNew: false
      },
      {
        id: 8,
        question: 'Comment sécuriser mes données confidentielles ?',
        answer: 'Sunu Loi utilise un chiffrement de niveau bancaire, une authentification à deux facteurs et des serveurs hébergés au Sénégal. Vos données restent 100% confidentielles et conformes au RGPD.',
        category: 'Sécurité',
        popularity: 94,
        tags: ['sécurité', 'chiffrement', 'confidentialité', 'RGPD'],
        difficulty: 'Intermédiaire',
        readTime: '4 min',
        views: 892,
        helpful: 189,
        lastUpdated: '2025-09-06',
        videoTutorial: false,
        isNew: false
      }
    ];
    
    setFaqs(faqData);
    setFilteredFaqs(faqData);

    // Quick tips
    setQuickTips([
      { icon: Zap, text: "Utilisez 'Ctrl + K' pour ouvrir la recherche rapide", category: "Raccourci" },
      { icon: Bot, text: "L'IA peut résumer des documents de 100+ pages en quelques secondes", category: "IA" },
      { icon: Lightbulb, text: "Créez des modèles personnalisés pour vos documents récurrents", category: "Productivité" }
    ]);

    // Recent activity
    setRecentActivity([
      { action: "Nouvelle jurisprudence", detail: "Cour Suprême - Droit commercial", time: "Il y a 2h" },
      { action: "Décret mis à jour", detail: "Code du travail - Article 145", time: "Il y a 5h" },
      { action: "Webinaire", detail: "Les nouveautés du droit fiscal", time: "Demain 14h" }
    ]);
  }, []);

  // Filtrage avancé des FAQ
  useEffect(() => {
    let filtered = faqs;

    if (searchTerm) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        faq.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    filtered.sort((a, b) => b.popularity - a.popularity);
    setFilteredFaqs(filtered);
  }, [searchTerm, selectedCategory, faqs]);

  const categories = [
    { name: 'Toutes', value: 'all', count: faqs.length, icon: HelpCircle, color: 'yellow' },
    { name: 'IA & Recherche', value: 'IA & Recherche', count: faqs.filter(f => f.category === 'IA & Recherche').length, icon: Bot, color: 'green' },
    { name: 'IA & Analyse', value: 'IA & Analyse', count: faqs.filter(f => f.category === 'IA & Analyse').length, icon: Zap, color: 'yellow' },
    { name: 'Assistant IA', value: 'Assistant IA', count: faqs.filter(f => f.category === 'Assistant IA').length, icon: MessageCircle, color: 'green' },
    { name: 'Innovation', value: 'Innovation', count: faqs.filter(f => f.category === 'Innovation').length, icon: Lightbulb, color: 'yellow' },
    { name: 'Collaboration', value: 'Collaboration', count: faqs.filter(f => f.category === 'Collaboration').length, icon: Users, color: 'green' },
    { name: 'Sécurité', value: 'Sécurité', count: faqs.filter(f => f.category === 'Sécurité').length, icon: Shield, color: 'yellow' }
  ];

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const modernFeatures = [
    {
      title: 'Assistant IA Juridique',
      description: 'Intelligence artificielle avancée pour répondre à toutes vos questions juridiques',
      icon: Bot,
      gradient: 'from-green-400 to-green-600',
      features: ['Réponses instantanées', 'Analyse de documents', 'Rédaction assistée']
    },
    {
      title: 'Recherche Vocale',
      description: 'Posez vos questions oralement en français ou wolof',
      icon: Headphones,
      gradient: 'from-yellow-400 to-yellow-600',
      features: ['Reconnaissance vocale', 'Multi-langues', 'Mains libres']
    },
    {
      title: 'Collaboration Temps Réel',
      description: 'Travaillez en équipe sur vos dossiers juridiques',
      icon: Users,
      gradient: 'from-green-500 to-yellow-500',
      features: ['Partage instantané', 'Annotations', 'Discussions']
    },
    {
      title: 'Alertes Intelligentes',
      description: 'Soyez notifié des changements importants dans votre domaine',
      icon: Zap,
      gradient: 'from-yellow-500 to-green-500',
      features: ['Personnalisables', 'IA intégrée', 'Multi-canaux']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-100">
      <div className="pt-8">
        {/* En-tête moderne avec animation */}
        <div className="text-center py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-yellow-600/10"></div>
          <div className="relative z-10">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              Centre d'Aide Intelligent
            </h1>
            <p className="text-2xl text-gray-700 mb-8">Votre assistant juridique révolutionnaire</p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Bot className="w-4 h-4" />
                IA Avancée
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                Réponses Instantanées
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                100% Sécurisé
              </span>
            </div>
          </div>
        </div>

        {/* Barre de recherche intelligente */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-yellow-200">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                {aiSearchActive ? (
                  <Bot className="text-green-500 w-6 h-6 animate-pulse" />
                ) : (
                  <Search className="text-gray-400 w-6 h-6" />
                )}
              </div>
              <input
                type="text"
                placeholder="Posez votre question juridique... L'IA comprend le langage naturel !"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setAiSearchActive(true)}
                onBlur={() => setAiSearchActive(false)}
                className="w-full pl-14 pr-20 py-5 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all text-lg bg-gradient-to-r from-white to-yellow-50/30"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <button className="p-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-xl hover:shadow-lg transition-all">
                  <Headphones className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gradient-to-r from-yellow-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Recherche IA activée
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4 text-green-500" />
                  Français & Wolof
                </span>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Nouvelle fonctionnalité !
              </span>
            </div>
          </div>
        </div>

        {/* Fonctionnalités révolutionnaires */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Fonctionnalités Révolutionnaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modernFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-yellow-100">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.features.map((feat, featIndex) => (
                    <div key={featIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></div>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact révolutionnaire */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-200">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Assistant IA</h3>
              <p className="text-gray-600 mb-4">Réponses intelligentes 24/7</p>
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg transition-all shadow-lg hover:shadow-xl">
                Discuter avec l'IA
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-yellow-200">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Tutoriels Vidéo</h3>
              <p className="text-gray-600 mb-4">Apprenez visuellement</p>
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-2 rounded-lg transition-all shadow-lg hover:shadow-xl">
                Voir les vidéos
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-200">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Communauté</h3>
              <p className="text-gray-600 mb-4">Échangez avec des experts</p>
              <button className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white px-6 py-2 rounded-lg transition-all shadow-lg hover:shadow-xl">
                Rejoindre
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-yellow-200">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Rendez-vous</h3>
              <p className="text-gray-600 mb-4">Consultation personnalisée</p>
              <button className="bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white px-6 py-2 rounded-lg transition-all shadow-lg hover:shadow-xl">
                Réserver
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal amélioré */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12">
          {/* FAQ modernisée */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-yellow-200">
              <div className="p-8 border-b bg-gradient-to-r from-green-50 via-yellow-50 to-green-50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <HelpCircle className="w-8 h-8 text-green-600" />
                    FAQ Intelligente
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                    >
                      <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                      </div>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                    >
                      <div className="w-4 h-4 flex flex-col gap-0.5">
                        <div className="bg-current h-0.5 rounded"></div>
                        <div className="bg-current h-0.5 rounded"></div>
                        <div className="bg-current h-0.5 rounded"></div>
                      </div>
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">
                  {filteredFaqs.length} question(s) trouvée(s) • Mise à jour en temps réel
                </p>
              </div>

              <div className="p-8">
                {filteredFaqs.map((faq, index) => (
                  <div key={faq.id} className="border-b last:border-b-0 py-6 group">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left flex items-center justify-between p-6 hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 rounded-2xl transition-all duration-300 group-hover:shadow-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-700">
                            {faq.question}
                          </h3>
                          {faq.isNew && (
                            <span className="bg-gradient-to-r from-green-400 to-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                              NOUVEAU
                            </span>
                          )}
                          {faq.popularity > 90 && (
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {faq.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(faq.difficulty)}`}>
                            {faq.difficulty}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {faq.readTime}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {faq.views}
                          </span>
                          {faq.videoTutorial && (
                            <span className="text-sm text-red-600 flex items-center gap-1">
                              <PlayCircle className="w-3 h-3" />
                              Vidéo
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex items-center gap-2">
                        <div className="text-sm text-gray-500 text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <ThumbsUp className="w-3 h-3" />
                            {faq.helpful}
                          </div>
                          <div>{faq.popularity}%</div>
                        </div>
                        {expandedFAQ === faq.id ? (
                          <ChevronUp className="w-6 h-6 text-green-600" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-green-600" />
                        )}
                      </div>
                    </button>

                    {expandedFAQ === faq.id && (
                      <div className="px-6 pb-6 animate-in slide-in-from-top-4 duration-500">
                        <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-6 mt-4 border border-green-100">
                          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                            {faq.answer}
                          </p>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex flex-wrap gap-2">
                              {faq.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="bg-white text-gray-600 px-3 py-1 rounded-full text-sm border border-green-200 hover:bg-green-50 cursor-pointer transition-colors"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-2 bg-white rounded-full hover:bg-green-50 transition-colors">
                                <Share2 className="w-4 h-4 text-gray-600" />
                              </button>
                              <button className="p-2 bg-white rounded-full hover:bg-green-50 transition-colors">
                                <ThumbsUp className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                          </div>

                          <div className="border-t border-green-200 pt-4 text-sm text-gray-600">
                            <div className="flex items-center justify-between">
                              <span>Dernière mise à jour: {faq.lastUpdated}</span>
                              {faq.videoTutorial && (
                                <button className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full hover:bg-red-100 transition-colors">
                                  <PlayCircle className="w-4 h-4" />
                                  Voir la vidéo
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {filteredFaqs.length === 0 && (
                  <div className="flex items-center gap-2">
  <button className="p-2 bg-white rounded-full hover:bg-green-50 transition-colors">
    <Share2 className="w-4 h-4 text-gray-600" />
  </button>
  <button className="p-2 bg-white rounded-full hover:bg-green-50 transition-colors">
    <ThumbsUp className="w-4 h-4 text-gray-600" />
  </button>
  <button className="p-2 bg-white rounded-full hover:bg-green-50 transition-colors">
    <Bookmark className="w-4 h-4 text-gray-600" />
  </button>
</div>

                )}
              </div>
            </div>
          </div>

          {/* Sidebar enrichie */}
          <div className="lg:col-span-1 space-y-6">
            {/* Catégories avec couleurs */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5 text-green-600" />
                Catégories
              </h3>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 hover:translate-x-2 border-2 ${
                        selectedCategory === category.value
                          ? `bg-gradient-to-r from-${category.color}-50 to-${category.color}-100 text-${category.color}-700 font-semibold border-${category.color}-300 shadow-lg`
                          : 'hover:bg-gray-50 border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r from-${category.color}-400 to-${category.color}-600`}>
                          <category.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
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

            {/* Conseils rapides */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Conseils Rapides
              </h3>
              <div className="space-y-4">
                {quickTips.map((tip, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-yellow-50 to-green-50 rounded-xl border border-yellow-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-lg">
                        <tip.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 mb-1">{tip.text}</p>
                        <span className="text-xs bg-white px-2 py-1 rounded-full text-green-700 border border-green-200">
                          {tip.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activité récente */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Activité Récente
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{activity.action}</p>
                      <p className="text-xs text-gray-600 truncate">{activity.detail}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 p-3 bg-gradient-to-r from-green-50 to-yellow-50 text-green-700 rounded-xl hover:from-green-100 hover:to-yellow-100 transition-all font-medium">
                Voir tout
              </button>
            </div>

            {/* Questions populaires avec analytics */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Tendances
              </h3>
              <div className="space-y-4">
                {faqs
                  .sort((a, b) => b.popularity - a.popularity)
                  .slice(0, 5)
                  .map((faq, index) => (
                    <button
                      key={index}
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left p-4 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-green-50 rounded-xl transition-all duration-300 hover:shadow-lg border border-gray-100"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-gradient-to-r from-yellow-400 to-green-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
                            {faq.question}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {faq.popularity}%
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {faq.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {faq.helpful}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Centre de téléchargement */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Download className="w-5 h-5 text-green-500" />
                Ressources
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-gray-800">Guide Complet</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Manuel d'utilisation détaillé avec toutes les fonctionnalités</p>
                  <button className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                    Télécharger PDF
                  </button>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-green-50 rounded-xl border border-yellow-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Video className="w-5 h-5 text-red-500" />
                    <h4 className="font-semibold text-gray-800">Tutoriels Vidéo</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Série de vidéos explicatives pour maîtriser Sunu Loi</p>
                  <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                    Regarder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section d'assistance premium */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="bg-gradient-to-r from-green-600 to-yellow-600 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Besoin d'une Assistance Premium ?</h2>
              <p className="text-xl mb-8 opacity-90">Accédez à notre équipe d'experts juridiques pour un accompagnement personnalisé</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Bot className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">IA Dédiée</h3>
                  <p className="text-sm opacity-90">Assistant IA personnalisé pour votre cabinet</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Users className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Expert Dédié</h3>
                  <p className="text-sm opacity-90">Juriste expert assigné à votre compte</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Zap className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Support Priority</h3>
                  <p className="text-sm opacity-90">Réponse garantie en moins d'1 heure</p>
                </div>
              </div>
              <button className="bg-white text-green-600 px-8 py-4 rounded-2xl hover:shadow-xl transition-all text-lg font-bold hover:scale-105">
                Découvrir Premium
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AideFAQPage;<Bookmark className="w-4 h-4 text-gray-600" />
                              