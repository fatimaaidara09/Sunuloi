// src/pages/JournalDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  FileText, Download, Share2, Bookmark, Star, Eye, Calendar,
  ArrowLeft, Tag, Clock, User, Building, ExternalLink, Copy,
  ChevronDown, ChevronUp, Search, MessageCircle, ThumbsUp,
  AlertCircle, CheckCircle, TrendingUp, Print
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const JournalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Données mockées pour le document
  useEffect(() => {
    // Simulation de chargement
    setTimeout(() => {
      setDocument({
        id: parseInt(id),
        date: "2024-09-10",
        titre: "Loi n° 2024-25 sur la transformation numérique",
        type: "Loi",
        status: "Nouveau",
        downloads: 1850,
        views: 4520,
        description: "Nouvelle réglementation sur la digitalisation des services publics au Sénégal",
        urgent: false,
        category: "Technologies",
        tags: ["Numérique", "Innovation", "Services publics"],
        fileSize: "2.3 MB",
        author: "Ministère de l'Économie Numérique",
        publishedBy: "République du Sénégal",
        reference: "JO n° 7234 du 10 septembre 2024",
        effectiveDate: "2024-10-01",
        content: {
          preamble: "Le Président de la République du Sénégal promulgue la loi dont la teneur suit, adoptée par l'Assemblée nationale.",
          sections: [
            {
              id: "dispositions-generales",
              title: "TITRE I - DISPOSITIONS GÉNÉRALES",
              articles: [
                {
                  number: "Article 1er",
                  content: "La présente loi définit le cadre juridique de la transformation numérique au Sénégal et établit les principes directeurs pour l'adoption et l'utilisation des technologies numériques dans les services publics."
                },
                {
                  number: "Article 2",
                  content: "Au sens de la présente loi, on entend par :\n- Service numérique : tout service fourni par voie électronique\n- Transformation numérique : processus d'intégration des technologies numériques\n- Données personnelles : toute information relative à une personne physique identifiée"
                }
              ]
            },
            {
              id: "services-numeriques",
              title: "TITRE II - SERVICES NUMÉRIQUES PUBLICS",
              articles: [
                {
                  number: "Article 3",
                  content: "Les administrations publiques sont tenues de mettre en place des services numériques pour faciliter les démarches des citoyens."
                },
                {
                  number: "Article 4", 
                  content: "Un guichet unique numérique sera créé pour centraliser l'accès aux services publics en ligne."
                }
              ]
            },
            {
              id: "protection-donnees",
              title: "TITRE III - PROTECTION DES DONNÉES",
              articles: [
                {
                  number: "Article 5",
                  content: "Le traitement des données personnelles dans le cadre de la transformation numérique doit respecter les principes de licéité, loyauté et transparence."
                }
              ]
            }
          ],
          annexes: [
            {
              title: "Annexe I - Calendrier de mise en œuvre",
              description: "Planning détaillé de déploiement des services numériques"
            },
            {
              title: "Annexe II - Spécifications techniques",
              description: "Requirements techniques pour les plateformes numériques"
            }
          ]
        },
        relatedDocuments: [
          { id: 2, title: "Décret d'application n° 2024-1847", type: "Décret" },
          { id: 3, title: "Circulaire d'instruction n° 2024-089", type: "Circulaire" }
        ]
      });
      setViewCount(4520);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Gestion du scroll pour la progression de lecture
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleDownload = () => {
    // Simulation de téléchargement
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${document.titre}.pdf`;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Afficher une notification de succès
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const getStatusBadge = (status, urgent = false) => {
    if (urgent) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          <AlertCircle className="h-4 w-4 mr-1" />
          Urgent
        </span>
      );
    }
    if (status === "Nouveau") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-4 w-4 mr-1" />
          Nouveau
        </span>
      );
    }
    return null;
  };

  const getTypeColor = (type) => {
    const colors = {
      'Loi': 'bg-green-100 text-green-800 border-green-200',
      'Décret': 'bg-blue-100 text-blue-800 border-blue-200',
      'Ordonnance': 'bg-purple-100 text-purple-800 border-purple-200',
      'Jurisprudence': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Circulaire': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement du document...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Document non trouvé</h2>
          <p className="text-gray-600 mb-6">Le document demandé n'existe pas ou a été supprimé.</p>
          <Link
            to="/journal-officiel"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au Journal Officiel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Navbar />
      
      {/* Barre de progression de lecture */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div
          className="h-1 bg-gradient-to-r from-green-600 to-yellow-600 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {/* Navigation de retour */}
            <div className="mb-6">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </button>
            </div>

            {/* En-tête du document */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getTypeColor(document.type)}`}>
                      {document.type}
                    </span>
                    {getStatusBadge(document.status, document.urgent)}
                    <span className="text-sm text-gray-500">{formatDate(document.date)}</span>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {document.titre}
                  </h1>
                  
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {document.description}
                  </p>

                  {/* Métadonnées */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Building className="h-4 w-4 mr-2" />
                      <span className="font-medium mr-2">Publié par:</span>
                      <span>{document.publishedBy}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      <span className="font-medium mr-2">Auteur:</span>
                      <span>{document.author}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-medium mr-2">Effectif le:</span>
                      <span>{formatDate(document.effectiveDate)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FileText className="h-4 w-4 mr-2" />
                      <span className="font-medium mr-2">Référence:</span>
                      <span>{document.reference}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {document.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={toggleFavorite}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                    isFavorite ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-700'
                  }`}
                >
                  <Star className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Retiré des favoris' : 'Ajouter aux favoris'}
                </button>

                <button
                  onClick={toggleBookmark}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                    isBookmarked ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  Marquer
                </button>

                <button
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger PDF
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Print className="h-4 w-4 mr-2" />
                  Imprimer
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager
                  </button>

                  {showShareMenu && (
                    <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-48 z-20">
                      <button
                        onClick={() => copyToClipboard(window.location.href)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copier le lien
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ouvrir dans un nouvel onglet
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contenu du document */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Table des matières collapsible */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setShowToc(!showToc)}
                  className="w-full px-8 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800">Table des matières</span>
                  {showToc ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                
                {showToc && (
                  <div className="px-8 pb-4 bg-gray-50">
                    <ul className="space-y-2">
                      {document.content.sections.map((section) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className="block py-2 text-green-600 hover:text-green-700 hover:underline"
                            onClick={() => setActiveSection(section.id)}
                          >
                            {section.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Préambule */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 font-medium italic text-center py-6 border-b border-gray-200">
                    {document.content.preamble}
                  </p>

                  {/* Sections du document */}
                  {document.content.sections.map((section) => (
                    <div key={section.id} id={section.id} className="mt-12 first:mt-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-green-200">
                        {section.title}
                      </h2>
                      
                      <div className="space-y-6">
                        {section.articles.map((article, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-6">
                            <h3 className="font-bold text-green-700 mb-3 text-lg">
                              {article.number}
                            </h3>
                            <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                              {article.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Annexes */}
                  {document.content.annexes && document.content.annexes.length > 0 && (
                    <div className="mt-12">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-green-200">
                        ANNEXES
                      </h2>
                      
                      <div className="space-y-4">
                        {document.content.annexes.map((annex, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">{annex.title}</h3>
                            <p className="text-gray-600">{annex.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Documents connexes */}
            {document.relatedDocuments && document.relatedDocuments.length > 0 && (
              <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-green-600" />
                  Documents connexes
                </h3>
                <div className="space-y-3">
                  {document.relatedDocuments.map((related) => (
                    <Link
                      key={related.id}
                      to={`/journal-officiel/${related.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getTypeColor(related.type)} mr-3`}>
                            {related.type}
                          </span>
                          <span className="font-medium text-gray-800 group-hover:text-green-600">
                            {related.title}
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-green-500" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Statistiques */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Statistiques</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Eye className="h-4 w-4 mr-2" />
                      <span className="text-sm">Vues</span>
                    </div>
                    <span className="font-semibold">{viewCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Download className="h-4 w-4 mr-2" />
                      <span className="text-sm">Téléchargements</span>
                    </div>
                    <span className="font-semibold">{document.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Tag className="h-4 w-4 mr-2" />
                      <span className="text-sm">Taille</span>
                    </div>
                    <span className="font-semibold">{document.fileSize}</span>
                  </div>
                </div>
              </div>

              {/* Navigation rapide */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Navigation</h3>
                <nav className="space-y-2">
                  {document.content.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === section.id
                          ? 'bg-green-100 text-green-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      {section.title.replace(/^TITRE \w+ - /, '')}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Actions rapides */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger PDF
                  </button>
                  
                  <Link
                    to="/journal-officiel"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour à la liste
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JournalDetailPage;