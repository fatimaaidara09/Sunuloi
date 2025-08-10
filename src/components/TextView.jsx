// src/components/TextViewer/TextViewer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Download, Share2, BookmarkPlus, Eye, Calendar, Tag, User, 
  Search, ZoomIn, ZoomOut, Type, Palette, Volume2, VolumeX, 
  ChevronLeft, ChevronRight, MessageCircle, ThumbsUp, Flag, 
  Copy, ExternalLink, Printer, RotateCcw, BookOpen, FileText,
  Lightbulb, Languages, Settings, Moon, Sun
} from 'lucide-react';

const TextViewer = ({ text, isOpen, onClose, darkMode, user }) => {
  const [fontSize, setFontSize] = useState(16);
  const [isReading, setIsReading] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showSimplified, setShowSimplified] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [searchInText, setSearchInText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [viewerTheme, setViewerTheme] = useState('default');
  
  const contentRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const handleScroll = () => {
        const element = contentRef.current;
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight - element.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      };

      contentRef.current.addEventListener('scroll', handleScroll);
      return () => contentRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  if (!isOpen || !text) return null;

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const content = text.content.toLowerCase();
    const searchTerm = query.toLowerCase();
    const results = [];
    let index = content.indexOf(searchTerm);
    
    while (index !== -1) {
      results.push(index);
      index = content.indexOf(searchTerm, index + 1);
    }
    
    setSearchResults(results);
    setCurrentSearchIndex(0);
  };

  const navigateSearch = (direction) => {
    if (searchResults.length === 0) return;
    
    const newIndex = direction === 'next' 
      ? (currentSearchIndex + 1) % searchResults.length
      : (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
    
    setCurrentSearchIndex(newIndex);
    
    // Scroll to the search result
    const element = contentRef.current;
    const position = searchResults[newIndex];
    // Implementation would depend on how you want to highlight and scroll to results
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSelectedText(selection.toString());
    }
  };

  const copySelectedText = () => {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText);
      // Show notification
    }
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    // API call to save/remove bookmark
  };

  const toggleLike = () => {
    setLiked(!liked);
    // API call to like/unlike
  };

  const downloadPDF = () => {
    // Implement PDF download
    console.log('Downloading PDF for text:', text.id);
  };

  const shareText = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: text.title,
          text: text.summary,
          url: `${window.location.origin}/text/${text.id}`
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const printText = () => {
    window.print();
  };

  const resetView = () => {
    setFontSize(16);
    setViewerTheme('default');
    setShowSimplified(false);
    setSearchInText('');
    setSearchResults([]);
  };

  const getThemeStyles = () => {
    const themes = {
      default: darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
      sepia: 'bg-yellow-50 text-yellow-900',
      night: 'bg-gray-900 text-gray-100',
      high_contrast: 'bg-black text-white'
    };
    return themes[viewerTheme] || themes.default;
  };

  const tableOfContents = [
    { id: 'article-1', title: 'Article 1 - Définitions', level: 1 },
    { id: 'article-2', title: 'Article 2 - Champ d\'application', level: 1 },
    { id: 'chapitre-1', title: 'Chapitre I - Dispositions générales', level: 0 },
    { id: 'article-3', title: 'Article 3 - Principes fondamentaux', level: 1 },
  ];

  const comments = [
    {
      id: 1,
      user: 'Dr. Amadou Diallo',
      role: 'Professeur de droit',
      content: 'Cette disposition est particulièrement importante dans le contexte sénégalais...',
      timestamp: '2024-01-15T10:30:00Z',
      likes: 5,
      replies: 2
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className={`${getThemeStyles()} w-full h-full flex flex-col`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        } bg-opacity-95 backdrop-blur-sm`}>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div>
              <h1 className="text-lg font-semibold">{text.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(text.date).toLocaleDateString('fr-FR')}
                </span>
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {text.views} vues
                </span>
                <span className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  {text.category}
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex-1 mx-8">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${readingProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-center mt-1 text-gray-500">
              {Math.round(readingProgress)}% lu
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                bookmarked 
                  ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title="Marquer comme favori"
            >
              <BookmarkPlus className="h-5 w-5" />
            </button>

            <button
              onClick={toggleLike}
              className={`p-2 rounded-lg transition-colors ${
                liked 
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title="J'aime"
            >
              <ThumbsUp className="h-5 w-5" />
            </button>

            <button
              onClick={shareText}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Partager"
            >
              <Share2 className="h-5 w-5" />
            </button>

            <button
              onClick={downloadPDF}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Télécharger PDF"
            >
              <Download className="h-5 w-5" />
            </button>

            <button
              onClick={printText}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Imprimer"
            >
              <Printer className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar gauche - Table des matières */}
          {showTableOfContents && (
            <div className={`w-80 border-r ${
              darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
            } overflow-y-auto`}>
              <div className="p-4">
                <h3 className="font-semibold mb-4">Table des matières</h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item, index) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-2 px-3 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        item.level === 0 ? 'font-medium' : 'ml-4 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Contenu principal */}
          <div className="flex-1 flex flex-col">
            {/* Barre d'outils */}
            <div className={`flex items-center justify-between p-3 border-b ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            } bg-opacity-95 backdrop-blur-sm`}>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowTableOfContents(!showTableOfContents)}
                  className={`p-2 rounded-lg transition-colors ${
                    showTableOfContents 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title="Table des matières"
                >
                  <FileText className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setShowSimplified(!showSimplified)}
                  className={`p-2 rounded-lg transition-colors ${
                    showSimplified 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title="Version simplifiée"
                >
                  <Lightbulb className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setIsReading(!isReading)}
                  className={`p-2 rounded-lg transition-colors ${
                    isReading 
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title={isReading ? "Arrêter la lecture" : "Lecture audio"}
                >
                  {isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>

                <div className="flex items-center space-x-1 border-l pl-2 ml-2">
                  <button
                    onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Diminuer la police"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="text-sm px-2">{fontSize}px</span>
                  <button
                    onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Augmenter la police"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>

                <select
                  value={viewerTheme}
                  onChange={(e) => setViewerTheme(e.target.value)}
                  className={`px-3 py-1 rounded border text-sm ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="default">Par défaut</option>
                  <option value="sepia">Sépia</option>
                  <option value="night">Nuit</option>
                  <option value="high_contrast">Contraste élevé</option>
                </select>
              </div>

              {/* Recherche dans le texte */}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchInText}
                    onChange={(e) => {
                      setSearchInText(e.target.value);
                      handleSearch(e.target.value);
                    }}
                    placeholder="Rechercher dans le texte..."
                    className={`pl-10 pr-4 py-2 border rounded-lg text-sm w-64 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                
                {searchResults.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-500">
                      {currentSearchIndex + 1}/{searchResults.length}
                    </span>
                    <button
                      onClick={() => navigateSearch('prev')}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => navigateSearch('next')}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <button
                  onClick={resetView}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Réinitialiser la vue"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Zone de contenu */}
            <div 
              ref={contentRef}
              className="flex-1 overflow-y-auto p-8"
              onMouseUp={handleTextSelection}
            >
              {/* Résumé du texte */}
              {!showSimplified && (
                <div className={`p-4 rounded-lg mb-6 ${
                  darkMode ? 'bg-gray-700' : 'bg-blue-50'
                }`}>
                  <h3 className="font-semibold mb-2">Résumé</h3>
                  <p className="text-sm">{text.summary}</p>
                </div>
              )}

              {/* Version simplifiée */}
              {showSimplified && (
                <div className={`p-4 rounded-lg mb-6 ${
                  darkMode ? 'bg-green-900/20' : 'bg-green-50'
                }`}>
                  <div className="flex items-center mb-3">
                    <Lightbulb className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-800 dark:text-green-300">
                      Version simplifiée
                    </h3>
                  </div>
                  <div className="prose prose-sm max-w-none text-green-700 dark:text-green-200">
                    <p>
                      <strong>En résumé :</strong> Ce texte établit les règles concernant {text.category.toLowerCase()}. 
                      Les points essentiels à retenir sont :
                    </p>
                    <ul>
                      <li>Définition des termes juridiques importants</li>
                      <li>Droits et obligations des parties concernées</li>
                      <li>Procédures à suivre en cas de litige</li>
                      <li>Sanctions prévues en cas de non-respect</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Contenu principal du texte */}
              <div 
                className="prose prose-lg max-w-none"
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
              >
                <div className="whitespace-pre-wrap">
                  {text.content}
                </div>
                
                {/* Contenu étendu pour la démonstration */}
                <div className="mt-8">
                  <h2 id="chapitre-1">CHAPITRE PREMIER - DISPOSITIONS GÉNÉRALES</h2>
                  
                  <h3 id="article-1">Article 1 - Définitions</h3>
                  <p>
                    Au sens de la présente loi, on entend par :
                  </p>
                  <ul>
                    <li><strong>Autorité compétente :</strong> l'organe habilité à prendre les décisions en vertu des dispositions légales en vigueur ;</li>
                    <li><strong>Bénéficiaire :</strong> toute personne physique ou morale qui tire profit des dispositions du présent texte ;</li>
                    <li><strong>Contrôle :</strong> la vérification de la conformité aux dispositions légales et réglementaires.</li>
                  </ul>
                  
                  <h3 id="article-2">Article 2 - Champ d'application</h3>
                  <p>
                    Les dispositions de la présente loi s'appliquent à toutes les personnes physiques et morales 
                    se trouvant sur le territoire national du Sénégal.
                  </p>
                  
                  <h3 id="article-3">Article 3 - Principes fondamentaux</h3>
                  <p>
                    La mise en œuvre des dispositions du présent texte obéit aux principes suivants :
                  </p>
                  <ol>
                    <li>Le respect de la dignité humaine ;</li>
                    <li>L'égalité de traitement sans discrimination ;</li>
                    <li>La transparence dans les procédures ;</li>
                    <li>La célérité dans le traitement des dossiers.</li>
                  </ol>

                  <blockquote className="border-l-4 border-green-500 pl-4 italic my-4">
                    "La justice est le fondement de la souveraineté" - Devise de la République du Sénégal
                  </blockquote>

                  <h2>CHAPITRE II - PROCÉDURES ET MODALITÉS</h2>
                  
                  <p>
                    Les procédures définies dans ce chapitre visent à garantir une application uniforme 
                    et équitable des dispositions légales sur l'ensemble du territoire national.
                  </p>
                </div>
              </div>

              {/* Actions sur le texte sélectionné */}
              {selectedText && (
                <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-3 flex items-center space-x-2">
                  <button
                    onClick={copySelectedText}
                    className="flex items-center px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copier
                  </button>
                  <button
                    onClick={() => setSelectedText('')}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar droite - Commentaires */}
          {showComments && (
            <div className={`w-80 border-l ${
              darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
            } overflow-y-auto`}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Commentaires</h3>
                  <button
                    onClick={() => setShowComments(false)}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Formulaire d'ajout de commentaire */}
                {user && (
                  <div className="mb-6">
                    <textarea
                      placeholder="Ajouter un commentaire..."
                      className={`w-full p-3 border rounded-lg resize-none ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600' 
                          : 'bg-white border-gray-300'
                      }`}
                      rows="3"
                    ></textarea>
                    <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                      Publier
                    </button>
                  </div>
                )}

                {/* Liste des commentaires */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className={`p-3 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-white'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {comment.user.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">{comment.user}</span>
                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {comment.role}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{comment.content}</p>
                          <div className="flex items-center space-x-3 mt-2 text-xs">
                            <button className="flex items-center text-gray-500 hover:text-blue-500">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {comment.likes}
                            </button>
                            <button className="text-gray-500 hover:text-blue-500">
                              Répondre
                            </button>
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                              {new Date(comment.timestamp).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer avec actions flottantes */}
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-full shadow-lg px-4 py-2 flex items-center space-x-3`}>
          <button
            onClick={() => setShowComments(!showComments)}
            className={`p-2 rounded-full transition-colors ${
              showComments 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Commentaires"
          >
            <MessageCircle className="h-4 w-4" />
          </button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Signaler un problème"
          >
            <Flag className="h-4 w-4" />
          </button>

          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Traduire"
          >
            <Languages className="h-4 w-4" />
          </button>

          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Paramètres de lecture"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>

        {/* Overlay pour fermer en cliquant à l'extérieur */}
        <div 
          className="fixed inset-0 -z-10" 
          onClick={onClose}
        ></div>
      </div>
    </div>
  );
};

export default TextViewer;