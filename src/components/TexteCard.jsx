// src/components/TextCard/TextCard.jsx
import React, { useState } from 'react';
import { 
  BookOpen, Gavel, FileText, Eye, Download, Share2, Calendar, 
  Tag, User, Clock, Star, BookmarkPlus, ExternalLink, 
  ThumbsUp, MessageCircle, TrendingUp, Shield, AlertCircle
} from 'lucide-react';

const TextCard = ({ text, darkMode, onView, onBookmark, isBookmarked = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(text.likes || 0);

  const getTypeIcon = (type) => {
    const icons = {
      'code': BookOpen,
      'loi': Gavel,
      'décret': FileText,
      'decret': FileText,
      'arrêté': FileText,
      'arrete': FileText,
      'circulaire': FileText,
      'jurisprudence': Gavel
    };
    const IconComponent = icons[type.toLowerCase()] || FileText;
    return <IconComponent className="h-4 w-4" />;
  };

  const getTypeColor = (type) => {
    const colors = {
      'code': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700',
      'loi': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700',
      'décret': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700',
      'decret': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700',
      'arrêté': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700',
      'arrete': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700',
      'circulaire': 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-700',
      'jurisprudence': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700'
    };
    return colors[type.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'en vigueur':
        return 'text-green-600 dark:text-green-400';
      case 'abrogé':
        return 'text-red-600 dark:text-red-400';
      case 'suspendu':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'projet':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'en vigueur':
        return <Shield className="h-3 w-3" />;
      case 'abrogé':
        return <AlertCircle className="h-3 w-3" />;
      case 'suspendu':
        return <Clock className="h-3 w-3" />;
      case 'projet':
        return <FileText className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: text.title,
          text: text.summary,
          url: `${window.location.origin}/text/${text.id}`
        });
      } catch (err) {
        console.log('Partage annulé');
      }
    } else {
      // Fallback - copier le lien
      navigator.clipboard.writeText(`${window.location.origin}/text/${text.id}`);
      // Vous pouvez ajouter une notification ici
    }
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    // Logique de téléchargement PDF
    console.log('Téléchargement du texte:', text.id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div 
      className={`group relative ${
        darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-gray-50'
      } border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onView(text)}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(text.type)}`}>
              {getTypeIcon(text.type)}
              <span className="ml-1">{text.type.toUpperCase()}</span>
            </span>
            
            {text.status && (
              <span className={`inline-flex items-center text-xs font-medium ${getStatusColor(text.status)}`}>
                {getStatusIcon(text.status)}
                <span className="ml-1">{text.status}</span>
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={handleLike}
              className={`p-1.5 rounded-lg transition-colors ${
                isLiked 
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
            >
              <ThumbsUp className="h-4 w-4" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark && onBookmark(text);
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
                  : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
              }`}
            >
              <BookmarkPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Titre */}
        <h3 className={`text-lg font-semibold mb-3 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors`}>
          {text.title}
        </h3>

        {/* Résumé */}
        <p className={`text-sm mb-4 line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {truncateText(text.summary)}
        </p>

        {/* Métadonnées */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <span className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(text.date)}
              </span>
              
              <span className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Eye className="h-3 w-3 mr-1" />
                {text.views?.toLocaleString() || 0}
              </span>

              {likeCount > 0 && (
                <span className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  {likeCount}
                </span>
              )}
            </div>
            
            {text.trending && (
              <span className="flex items-center text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="text-xs font-medium">Tendance</span>
              </span>
            )}
          </div>

          {text.category && (
            <div className="flex items-center">
              <Tag className={`h-3 w-3 mr-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {text.category}
              </span>
            </div>
          )}

          {text.author && (
            <div className="flex items-center">
              <User className={`h-3 w-3 mr-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {text.author}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        {text.tags && text.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {text.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className={`inline-block px-2 py-1 rounded-full text-xs ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 text-gray-700'
                } hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-300 transition-colors cursor-pointer`}
              >
                #{tag}
              </span>
            ))}
            {text.tags.length > 3 && (
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                +{text.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer avec actions */}
      <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-100 bg-gray-50'} rounded-b-xl`}>
        <div className="flex items-center justify-between">
          {/* Actions principales */}
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(text);
              }}
              className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                darkMode
                  ? 'text-green-400 hover:bg-green-900/20'
                  : 'text-green-600 hover:bg-green-50'
              }`}
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Lire
            </button>

            <button
              onClick={handleDownload}
              className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                darkMode
                  ? 'text-blue-400 hover:bg-blue-900/20'
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Download className="h-4 w-4 mr-1" />
              PDF
            </button>
          </div>

          {/* Actions secondaires */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleShare}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              title="Partager"
            >
              <Share2 className="h-4 w-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                // Ouvrir dans un nouvel onglet
                window.open(`/text/${text.id}`, '_blank');
              }}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              title="Ouvrir dans un nouvel onglet"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Barre de progression de lecture (si applicable) */}
        {text.readingProgress && text.readingProgress > 0 && (
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Progression de lecture
              </span>
              <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {text.readingProgress}%
              </span>
            </div>
            <div className={`w-full h-1.5 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div 
                className="h-1.5 bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${text.readingProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Indicateur de nouveauté */}
      {text.isNew && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
            Nouveau
          </span>
        </div>
      )}

      {/* Indicateur de mise à jour */}
      {text.isUpdated && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
            <Clock className="h-3 w-3 mr-1" />
            Mis à jour
          </span>
        </div>
      )}

      {/* Effet de survol */}
      {isHovered && (
        <div className="absolute inset-0 rounded-xl ring-2 ring-green-500 ring-opacity-50 pointer-events-none"></div>
      )}
    </div>
  );
};

export default TextCard;