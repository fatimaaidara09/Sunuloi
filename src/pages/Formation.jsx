import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  Play,
  Pause,
  Clock,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Calendar,
  Download,
  Share2,
  Bookmark,
  CheckCircle,
  Lock,
  Unlock,
  Trophy,
  Target,
  BarChart3,
  TrendingUp,
  FileText,
  Video,
  Headphones,
  MessageCircle,
  Eye,
  ThumbsUp,
  Certificate,
  Shield,
  Zap,
  Globe,
  Briefcase,
  Scale,
  Gavel,
  Heart,
  ArrowRight,
  Plus,
  Settings,
  HelpCircle,
  RefreshCw
} from 'lucide-react';

const FormationCertificationPage = () => {
  const [activeTab, setActiveTab] = useState('formations');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [userProgress, setUserProgress] = useState({});

  // Données simulées des formations
  const mockCourses = [
    {
      id: 1,
      title: 'Initiation au Droit Sénégalais',
      description: 'Une introduction complète aux fondements du système juridique sénégalais, parfait pour les débutants.',
      instructor: 'Prof. Amadou Kane',
      duration: '8 heures',
      lessons: 24,
      students: 1250,
      rating: 4.8,
      reviews: 156,
      price: 25000,
      level: 'Débutant',
      category: 'general',
      language: 'Français',
      certificate: true,
      preview: true,
      thumbnail: '/api/placeholder/300/200',
      tags: ['Introduction', 'Bases', 'Système juridique'],
      lastUpdated: '2024-09-01',
      featured: true,
      progress: 0,
      modules: [
        { title: 'Introduction au système juridique', duration: '45min', completed: false },
        { title: 'Sources du droit sénégalais', duration: '60min', completed: false },
        { title: 'Organisation judiciaire', duration: '50min', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Droit du Travail Approfondi',
      description: 'Maîtrisez les complexités du droit du travail sénégalais avec des cas pratiques et jurisprudence.',
      instructor: 'Me Fatou Diop',
      duration: '12 heures',
      lessons: 36,
      students: 892,
      rating: 4.9,
      reviews: 203,
      price: 45000,
      level: 'Intermédiaire',
      category: 'social',
      language: 'Français',
      certificate: true,
      preview: true,
      thumbnail: '/api/placeholder/300/200',
      tags: ['Travail', 'Social', 'Pratique'],
      lastUpdated: '2024-08-28',
      featured: false,
      progress: 35,
      modules: [
        { title: 'Contrat de travail', duration: '90min', completed: true },
        { title: 'Durée du travail', duration: '75min', completed: true },
        { title: 'Sanctions disciplinaires', duration: '85min', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Procédure Civile Moderne',
      description: 'Apprenez les procédures civiles actuelles incluant la dématérialisation des procédures.',
      instructor: 'Juge Ousmane Sall',
      duration: '10 heures',
      lessons: 30,
      students: 567,
      rating: 4.7,
      reviews: 89,
      price: 38000,
      level: 'Avancé',
      category: 'procedure',
      language: 'Français',
      certificate: true,
      preview: false,
      thumbnail: '/api/placeholder/300/200',
      tags: ['Procédure', 'Civil', 'Numérique'],
      lastUpdated: '2024-09-05',
      featured: true,
      progress: 0,
      modules: [
        { title: 'Instance et compétence', duration: '65min', completed: false },
        { title: 'Actes de procédure', duration: '80min', completed: false },
        { title: 'Voies de recours', duration: '70min', completed: false }
      ]
    },
    {
      id: 4,
      title: 'Droit de l\'Environnement et Développement Durable',
      description: 'Formation spécialisée sur la législation environnementale sénégalaise et les enjeux climatiques.',
      instructor: 'Dr Mariama Thiam',
      duration: '6 heures',
      lessons: 18,
      students: 324,
      rating: 4.6,
      reviews: 67,
      price: 32000,
      level: 'Intermédiaire',
      category: 'environment',
      language: 'Français',
      certificate: true,
      preview: true,
      thumbnail: '/api/placeholder/300/200',
      tags: ['Environnement', 'Durable', 'Climat'],
      lastUpdated: '2024-09-10',
      featured: false,
      progress: 0,
      modules: [
        { title: 'Cadre juridique environnemental', duration: '40min', completed: false },
        { title: 'Responsabilité environnementale', duration: '55min', completed: false },
        { title: 'Contentieux environnemental', duration: '45min', completed: false }
      ]
    },
    {
      id: 5,
      title: 'Droit Pénal et Criminologie',
      description: 'Étude complète du droit pénal sénégalais avec analyse criminologique moderne.',
      instructor: 'Prof. Ibrahima Sarr',
      duration: '14 heures',
      lessons: 42,
      students: 445,
      rating: 4.8,
      reviews: 134,
      price: 52000,
      level: 'Avancé',
      category: 'penal',
      language: 'Français',
      certificate: true,
      preview: true,
      thumbnail: '/api/placeholder/300/200',
      tags: ['Pénal', 'Criminologie', 'Justice'],
      lastUpdated: '2024-08-22',
      featured: false,
      progress: 0,
      modules: [
        { title: 'Théorie générale du droit pénal', duration: '95min', completed: false },
        { title: 'Infractions et sanctions', duration: '120min', completed: false },
        { title: 'Procédure pénale', duration: '100min', completed: false }
      ]
    },
    {
      id: 6,
      title: 'Droit des Affaires International',
      description: 'Maîtrisez le droit des affaires dans un contexte international et régional (CEDEAO/OHADA).',
      instructor: 'Me Aïssatou Fall',
      duration: '16 heures',
      lessons: 48,
      students: 287,
      rating: 4.9,
      reviews: 92,
      price: 65000,
      level: 'Expert',
      category: 'business',
      language: 'Français',
      certificate: true,
      preview: false,
      thumbnail: '/api/placeholder/300/200',
      tags: ['Affaires', 'International', 'OHADA'],
      lastUpdated: '2024-09-03',
      featured: true,
      progress: 0,
      modules: [
        { title: 'Droit OHADA', duration: '110min', completed: false },
        { title: 'Contrats internationaux', duration: '130min', completed: false },
        { title: 'Résolution de conflits', duration: '105min', completed: false }
      ]
    },
    {
      id: 7,
      title: 'Pratique Notariale au Sénégal',
      description: 'Formation pratique pour les futurs notaires et clerc de notaires.',
      instructor: 'Notaire Mame Diarra Seck',
      duration: '20 heures',
      lessons: 60,
      students: 156,
      rating: 4.7,
      reviews: 45,
      price: 75000,
      level: 'Expert',
      category: 'notarial',
      language: 'Français',
      certificate: true,
      preview: true,
      thumbnail: '/api/placeholder/300/200',
      tags: ['Notariat', 'Pratique', 'Actes'],
      lastUpdated: '2024-08-15',
      featured: false,
      progress: 0,
      modules: [
        { title: 'Statut du notaire', duration: '85min', completed: false },
        { title: 'Actes notariés', duration: '125min', completed: false },
        { title: 'Déontologie notariale', duration: '90min', completed: false }
      ]
    },
    {
      id: 8,
      title: 'Médiation et Arbitrage',
      description: 'Apprenez les modes alternatifs de résolution des conflits au Sénégal.',
      instructor: 'Médiateur Alpha Diallo',
      duration: '8 heures',
      lessons: 24,
      students: 213,
      rating: 4.5,
      reviews: 58,
      price: 28000,
      level: 'Intermédiaire',
      category: 'mediation',
      language: 'Français',
      certificate: true,
      preview: true,
      thumbnail: '/api/placeholder/300/200',
      tags: ['Médiation', 'Arbitrage', 'Résolution'],
      lastUpdated: '2024-09-08',
      featured: false,
      progress: 0,
      modules: [
        { title: 'Principes de la médiation', duration: '60min', completed: false },
        { title: 'Processus d\'arbitrage', duration: '75min', completed: false },
        { title: 'Exécution des sentences', duration: '50min', completed: false }
      ]
    }
  ];

  // Données des certifications
  const mockCertifications = [
    {
      id: 1,
      title: 'Certification Droit Sénégalais Fondamental',
      description: 'Certification officielle en droit sénégalais reconnue par le Barreau',
      requirements: ['Completer 3 formations de base', 'Examen final 80%+', '20h de formation minimum'],
      duration: '3 mois',
      price: 85000,
      level: 'Professionnel',
      issued_by: 'SunuLoi Academy',
      recognition: 'Barreau du Sénégal',
      students: 456,
      rating: 4.9,
      badge_color: 'bg-green-500',
      exam: {
        questions: 100,
        duration: '3 heures',
        passing_score: 80
      }
    },
    {
      id: 2,
      title: 'Expert en Droit du Travail',
      description: 'Certification avancée pour les spécialistes en droit social',
      requirements: ['Formation droit du travail', 'Cas pratiques validés', 'Mémoire professionnel'],
      duration: '4 mois',
      price: 125000,
      level: 'Expert',
      issued_by: 'SunuLoi Academy',
      recognition: 'Ministère du Travail',
      students: 234,
      rating: 4.8,
      badge_color: 'bg-blue-500',
      exam: {
        questions: 120,
        duration: '4 heures',
        passing_score: 85
      }
    },
    {
      id: 3,
      title: 'Médiateur Juridique Certifié',
      description: 'Devenez médiateur professionnel agréé',
      requirements: ['Formation médiation', 'Stage pratique 50h', 'Évaluation continue'],
      duration: '6 mois',
      price: 95000,
      level: 'Spécialisé',
      issued_by: 'SunuLoi Academy',
      recognition: 'Centre de Médiation',
      students: 189,
      rating: 4.7,
      badge_color: 'bg-purple-500',
      exam: {
        questions: 80,
        duration: '2.5 heures',
        passing_score: 75
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les catégories', count: 8, icon: BookOpen },
    { id: 'general', name: 'Droit Général', count: 1, icon: Scale },
    { id: 'social', name: 'Droit Social', count: 1, icon: Users },
    { id: 'procedure', name: 'Procédure', count: 1, icon: FileText },
    { id: 'environment', name: 'Environnement', count: 1, icon: Globe },
    { id: 'penal', name: 'Droit Pénal', count: 1, icon: Gavel },
    { id: 'business', name: 'Droit des Affaires', count: 1, icon: Briefcase },
    { id: 'notarial', name: 'Notariat', count: 1, icon: Certificate },
    { id: 'mediation', name: 'Médiation', count: 1, icon: Heart }
  ];

  useEffect(() => {
    setCourses(mockCourses);
    setCertifications(mockCertifications);
  }, []);

  // Filtrage et pagination
  const filteredCourses = courses.filter(course => {
    if (selectedCategory !== 'all' && course.category !== selectedCategory) return false;
    if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popularity': return b.students - a.students;
      case 'rating': return b.rating - a.rating;
      case 'price_low': return a.price - b.price;
      case 'price_high': return b.price - a.price;
      case 'recent': return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      default: return 0;
    }
  });

  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = sortedCourses.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const enrollInCourse = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, enrolled: true }
        : course
    ));
  };

  const formatPrice = (price) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Débutant': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Avancé': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-yellow-500 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Formation & Certification</h1>
                <p className="text-gray-600 dark:text-gray-400">Développez votre expertise juridique avec SunuLoi Academy</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600 dark:text-gray-400">Mes formations</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">3 en cours</div>
              </div>
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                Mon profil
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Formations disponibles', value: courses.length, icon: BookOpen, color: 'text-blue-600' },
            { label: 'Étudiants actifs', value: '3,247', icon: Users, color: 'text-green-600' },
            { label: 'Certifications délivrées', value: '1,189', icon: Award, color: 'text-yellow-600' },
            { label: 'Taux de réussite', value: '87%', icon: Trophy, color: 'text-purple-600' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-8">
          {[
            { id: 'formations', label: 'Formations', icon: BookOpen },
            { id: 'certifications', label: 'Certifications', icon: Award },
            { id: 'webinaires', label: 'Webinaires Live', icon: Video },
            { id: 'progress', label: 'Mon Parcours', icon: BarChart3 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-green-700 dark:text-green-300 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Onglet Formations */}
        {activeTab === 'formations' && (
          <div className="space-y-8">
            {/* Barre de recherche et filtres */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une formation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="flex gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="popularity">Plus populaires</option>
                    <option value="rating">Mieux notées</option>
                    <option value="recent">Plus récentes</option>
                    <option value="price_low">Prix croissant</option>
                    <option value="price_high">Prix décroissant</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Formations en vedette */}
            <div className="bg-gradient-to-r from-green-600 to-yellow-600 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Formations en Vedette</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.filter(course => course.featured).slice(0, 3).map(course => (
                  <div key={course.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{course.title}</h3>
                    <p className="text-sm text-green-100 mb-3">{course.description.slice(0, 80)}...</p>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-300 font-bold">{formatPrice(course.price)}</span>
                      <button className="px-4 py-2 bg-white text-green-600 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                        Voir plus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Liste des formations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCourses.map(course => (
                <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-r from-green-400 to-blue-400 rounded-t-xl flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-white" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      {course.certificate && (
                        <div className="p-1 bg-yellow-500 rounded-full">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {course.title}
                      </h3>
                      <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Par <span className="font-medium text-green-600">{course.instructor}</span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    {course.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Progression</span>
                          <span className="font-medium text-green-600">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-green-600">
                        {formatPrice(course.price)}
                      </div>
                      <div className="flex space-x-2">
                        {course.preview && (
                          <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Play className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          </button>
                        )}
                        <button 
                          onClick={() => enrollInCourse(course.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            course.enrolled
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-green-600 hover:bg-green-700 text-white'
                          }`}
                        >
                          {course.enrolled ? 'Inscrit' : 'S\'inscrire'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex space-x-2">
                  <button
                    onClick={() => goToPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isCurrentPage = page === currentPage;
                    const isNearCurrentPage = Math.abs(page - currentPage) <= 2;
                    const isFirstOrLast = page === 1 || page === totalPages;
                    
                    if (isNearCurrentPage || isFirstOrLast) {
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            isCurrentPage
                              ? 'bg-green-600 text-white'
                              : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 3 || page === currentPage + 3) {
                      return <span key={page} className="px-2 py-2 text-gray-400">...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            )}

            {/* Informations sur la pagination */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Affichage de {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCourses.length)} sur {filteredCourses.length} formations
            </div>
          </div>
        )}

        {/* Onglet Certifications */}
        {activeTab === 'certifications' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Certifications Professionnelles</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {certifications.map(cert => (
                  <div key={cert.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 ${cert.badge_color} rounded-xl`}>
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Par {cert.issued_by}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{formatPrice(cert.price)}</div>
                        <div className="text-sm text-gray-500">{cert.duration}</div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">{cert.description}</p>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Prérequis :</h4>
                      <ul className="space-y-1">
                        {cert.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="font-medium text-gray-900 dark:text-white">Examen</div>
                        <div className="text-gray-600 dark:text-gray-400">{cert.exam.questions} questions</div>
                        <div className="text-gray-600 dark:text-gray-400">{cert.exam.duration}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="font-medium text-gray-900 dark:text-white">Reconnaissance</div>
                        <div className="text-gray-600 dark:text-gray-400">{cert.recognition}</div>
                        <div className="text-green-600">Seuil: {cert.exam.passing_score}%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{cert.students} étudiants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span>{cert.rating}</span>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                        Commencer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Onglet Webinaires */}
        {activeTab === 'webinaires' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Webinaires à Venir</h2>
              
              <div className="space-y-6">
                {[
                  {
                    title: 'Les Défis du Droit Numérique au Sénégal',
                    speaker: 'Prof. Amadou Kane',
                    date: '2024-09-20',
                    time: '15:00',
                    duration: '90 min',
                    registered: 245,
                    maxParticipants: 500,
                    price: 15000,
                    description: 'Exploration des enjeux juridiques liés à la transformation numérique'
                  },
                  {
                    title: 'Médiation Familiale : Pratiques et Techniques',
                    speaker: 'Me Fatou Diop',
                    date: '2024-09-25',
                    time: '14:30',
                    duration: '120 min',
                    registered: 178,
                    maxParticipants: 300,
                    price: 20000,
                    description: 'Techniques avancées de médiation dans les conflits familiaux'
                  },
                  {
                    title: 'Droit OHADA : Nouveautés 2024',
                    speaker: 'Dr Mariama Thiam',
                    date: '2024-09-30',
                    time: '16:00',
                    duration: '75 min',
                    registered: 312,
                    maxParticipants: 400,
                    price: 25000,
                    description: 'Analyse des dernières réformes du droit OHADA'
                  }
                ].map((webinar, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{webinar.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{webinar.description}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(webinar.date).toLocaleDateString('fr-FR', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                          <Clock className="h-4 w-4 ml-4" />
                          <span>{webinar.time} ({webinar.duration})</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Animé par <span className="font-medium text-green-600">{webinar.speaker}</span>
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <div className="text-2xl font-bold text-green-600 mb-2">{formatPrice(webinar.price)}</div>
                        <div className="text-sm text-gray-500 mb-2">
                          {webinar.registered}/{webinar.maxParticipants} inscrits
                        </div>
                        <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-3">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(webinar.registered / webinar.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors w-full">
                          S'inscrire
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Onglet Mon Parcours */}
        {activeTab === 'progress' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Formations Complétées</h3>
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">+2 ce mois-ci</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Heures d'Étude</h3>
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">127h</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">+15h cette semaine</div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Certifications</h3>
                  <Award className="h-6 w-6 text-purple-500" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">1 en cours</div>
              </div>
            </div>

            {/* Formations en cours */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Formations en Cours</h3>
              
              <div className="space-y-6">
                {courses.filter(course => course.progress > 0 && course.progress < 100).map(course => (
                  <div key={course.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">{course.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Par {course.instructor}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{course.lessons} leçons</span>
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{course.progress}%</div>
                        <button className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                          Continuer
                        </button>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-4">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {course.modules.slice(0, 3).map((module, idx) => (
                        <div key={idx} className={`p-3 rounded-lg ${
                          module.completed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-700'
                        }`}>
                          <div className="flex items-center space-x-2">
                            {module.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                            )}
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {module.title}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 ml-6">{module.duration}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications obtenues */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Mes Certifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-green-300 dark:border-green-600 rounded-lg p-6 text-center">
                  <Award className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Certification Droit Sénégalais Fondamental
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Obtenue le 15 août 2024
                  </p>
                  <div className="flex space-x-2 justify-center">
                    <button className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-sm">
                      Voir
                    </button>
                    <button className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded text-sm">
                      Télécharger
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 text-center opacity-50">
                  <Lock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Expert en Droit du Travail
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    En cours - 65% complété
                  </p>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Continuer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormationCertificationPage;