// src/pages/CategoriesPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Scale, BookOpen, Gavel, Building, Globe, Users, 
  Search, Filter, ChevronRight, TrendingUp, Eye,
  FileText, Tag, Star, ArrowRight, Grid, List
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CategoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showStats, setShowStats] = useState(false);

  // Données des catégories juridiques sénégalaises
  const categoriesData = [
    {
      id: 'droit-national',
      title: "Droit national en vigueur",
      description: "Ensemble des textes juridiques applicables au Sénégal",
      icon: Scale,
      color: "from-green-500 to-green-600",
      documentCount: 2450,
      trending: true,
      subcategories: [
        { name: "Codes", count: 156, link: "/codes", description: "Codes civil, pénal, du travail..." },
        { name: "Jurisprudence", count: 892, link: "/jurisprudence", description: "Décisions des tribunaux sénégalais" },
        { name: "Constitution", count: 12, link: "/constitution", description: "Texte fondamental et révisions" },
        { name: "Textes consolidés", count: 234, link: "/textes-consolides", description: "Versions à jour des textes" },
        { name: "Circulaires", count: 445, link: "/circulaires", description: "Instructions administratives" },
        { name: "Accords collectifs", count: 167, link: "/accords-collectifs", description: "Conventions de travail" }
      ]
    },
    {
      id: 'publications-officielles',
      title: "Publications officielles",
      description: "Documents publiés par les autorités sénégalaises",
      icon: FileText,
      color: "from-yellow-500 to-yellow-600",
      documentCount: 1850,
      trending: true,
      subcategories: [
        { name: "Bulletin officiel", count: 245, link: "/bulletin-officiel", description: "Publications administratives" },
        { name: "Journal officiel", count: 523, link: "/journal-officiel", description: "Textes officiels promulgués" },
        { name: "Conventions collectives", count: 89, link: "/conventions-collectives", description: "Accords sectoriels" },
        { name: "Débats parlementaires", count: 334, link: "/debats-parlementaires", description: "Comptes-rendus de l'Assemblée" },
        { name: "Questions parlementaires", count: 156, link: "/questions-parlementaires", description: "Questions écrites et orales" },
        { name: "Documents administratifs", count: 503, link: "/documents-administratifs", description: "Circulaires et instructions" }
      ]
    },
    {
      id: 'droit-specialise',
      title: "Droits spécialisés",
      description: "Domaines juridiques spécifiques au contexte sénégalais",
      icon: Gavel,
      color: "from-green-600 to-green-700",
      documentCount: 1420,
      trending: false,
      subcategories: [
        { name: "Droit des affaires OHADA", count: 234, link: "/droit-ohada", description: "Harmonisation du droit des affaires" },
        { name: "Droit foncier", count: 189, link: "/droit-foncier", description: "Propriété et usage des terres" },
        { name: "Droit minier", count: 67, link: "/droit-minier", description: "Exploitation des ressources" },
        { name: "Droit de la pêche", count: 45, link: "/droit-peche", description: "Réglementation maritime" },
        { name: "Droit pastoral", count: 78, link: "/droit-pastoral", description: "Élevage et transhumance" },
        { name: "Droit coutumier", count: 123, link: "/droit-coutumier", description: "Traditions juridiques locales" }
      ]
    },
    {
      id: 'droit-communautaire',
      title: "Droit communautaire CEDEAO",
      description: "Textes de la Communauté Économique des États de l'Afrique de l'Ouest",
      icon: Globe,
      color: "from-yellow-600 to-yellow-700",
      documentCount: 890,
      trending: true,
      subcategories: [
        { name: "Traités CEDEAO", count: 45, link: "/traites-cedeao", description: "Accords fondateurs" },
        { name: "Règlements", count: 234, link: "/reglements-cedeao", description: "Normes communautaires" },
        { name: "Directives", count: 167, link: "/directives-cedeao", description: "Orientations aux États" },
        { name: "Jurisprudence CCJA", count: 123, link: "/ccja", description: "Cour Commune de Justice" },
        { name: "Protocoles", count: 89, link: "/protocoles-cedeao", description: "Accords sectoriels" },
        { name: "Décisions", count: 232, link: "/decisions-cedeao", description: "Actes des institutions" }
      ]
    },
    {
      id: 'droit-international',
      title: "Droit international",
      description: "Conventions et traités internationaux ratifiés par le Sénégal",
      icon: Building,
      color: "from-green-700 to-green-800",
      documentCount: 650,
      trending: false,
      subcategories: [
        { name: "Conventions ONU", count: 78, link: "/conventions-onu", description: "Traités des Nations Unies" },
        { name: "Accords bilatéraux", count: 145, link: "/accords-bilateraux", description: "Traités entre États" },
        { name: "Conventions OIT", count: 56, link: "/conventions-oit", description: "Droit du travail international" },
        { name: "Traités régionaux", count: 89, link: "/traites-regionaux", description: "Accords africains" },
        { name: "Droits de l'Homme", count: 67, link: "/droits-homme", description: "Conventions internationales" },
        { name: "Droit commercial international", count: 215, link: "/droit-commercial-intl", description: "Commerce et investissements" }
      ]
    },
    {
      id: 'ressources-pratiques',
      title: "Ressources pratiques",
      description: "Outils d'aide à la compréhension du droit sénégalais",
      icon: BookOpen,
      color: "from-yellow-700 to-yellow-800",
      documentCount: 1230,
      trending: false,
      subcategories: [
        { name: "Glossaire juridique", count: 456, link: "/glossaire", description: "Définitions des termes" },
        { name: "Modèles d'actes", count: 234, link: "/modeles-actes", description: "Formulaires types" },
        { name: "Procédures", count: 189, link: "/procedures", description: "Guides pratiques" },
        { name: "Tarifications", count: 67, link: "/tarifications", description: "Coûts des démarches" },
        { name: "Contacts utiles", count: 145, link: "/contacts", description: "Institutions et professionnels" },
        { name: "Guide du justiciable", count: 139, link: "/guide-justiciable", description: "Aide à la navigation juridique" }
      ]
    }
  ];

  // Filtrage des catégories
  const filteredCategories = categoriesData.filter(category => {
    const matchesSearch = searchTerm === '' || 
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subcategories.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDomain = selectedDomain === 'all' || 
      (selectedDomain === 'trending' && category.trending) ||
      category.id === selectedDomain;
    
    return matchesSearch && matchesDomain;
  });

  // Calcul des statistiques
  const totalDocuments = categoriesData.reduce((sum, cat) => sum + cat.documentCount, 0);
  const totalSubcategories = categoriesData.reduce((sum, cat) => sum + cat.subcategories.length, 0);
  const trendingCount = categoriesData.filter(cat => cat.trending).length;

  const domainFilters = [
    { value: 'all', label: 'Tous les domaines', count: categoriesData.length },
    { value: 'trending', label: 'Tendances', count: trendingCount },
    { value: 'droit-national', label: 'Droit national', count: 1 },
    { value: 'publications-officielles', label: 'Publications', count: 1 },
    { value: 'droit-international', label: 'International', count: 1 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl mr-6">
                  <Scale className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-green-800 mb-2">Catégories Juridiques</h1>
                  <p className="text-gray-600">Explorez le droit sénégalais par domaine de compétence</p>
                </div>
              </div>
              <div className="hidden md:block">
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="flex items-center px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Statistiques
                </button>
              </div>
            </div>
            
            {/* Statistiques */}
            {showStats && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{totalDocuments.toLocaleString()}</p>
                    <p className="text-gray-600 text-sm">Documents totaux</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">{categoriesData.length}</p>
                    <p className="text-gray-600 text-sm">Catégories principales</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{totalSubcategories}</p>
                    <p className="text-gray-600 text-sm">Sous-catégories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">{trendingCount}</p>
                    <p className="text-gray-600 text-sm">En tendance</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une catégorie ou un domaine juridique..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            {/* Filtres */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {domainFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label} ({filter.count})
                  </option>
                ))}
              </select>
              
              <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'bg-white text-gray-600'} hover:bg-green-50 transition-colors`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'bg-white text-gray-600'} hover:bg-green-50 transition-colors`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Résultats */}
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <Scale className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucune catégorie trouvée</h3>
            <p className="text-gray-600">Modifiez vos critères de recherche pour voir plus de résultats</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : 'space-y-6'}>
            {filteredCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Header de la catégorie */}
                <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-xl mr-4">
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold mb-1">{category.title}</h2>
                        <p className="text-white text-opacity-90 text-sm">{category.description}</p>
                      </div>
                    </div>
                    {category.trending && (
                      <div className="flex items-center text-white text-opacity-90">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Tendance</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-white text-opacity-90 text-sm">
                      {category.documentCount.toLocaleString()} documents
                    </span>
                    <span className="text-white text-opacity-90 text-sm">
                      {category.subcategories.length} sous-catégories
                    </span>
                  </div>
                </div>

                {/* Sous-catégories */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.subcategories.map((sub, index) => (
                      <Link
                        key={index}
                        to={sub.link}
                        className="group p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                            {sub.name}
                          </h3>
                          <div className="flex items-center text-gray-400 group-hover:text-green-500 transition-colors">
                            <span className="text-xs mr-1">{sub.count}</span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{sub.description}</p>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Footer de la catégorie */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>Consulté récemment</span>
                      </div>
                      <Link
                        to={`/categories/${category.id}`}
                        className="flex items-center text-green-600 hover:text-green-700 font-medium text-sm group"
                      >
                        Explorer tout
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Section d'aide */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-yellow-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-2">Besoin d'aide pour naviguer ?</h2>
            <p className="text-green-100 mb-6">
              Notre équipe est là pour vous accompagner dans vos recherches juridiques
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/guide"
                className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Guide d'utilisation
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-colors font-medium"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoriesPage;