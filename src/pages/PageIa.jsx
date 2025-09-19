import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Brain, Zap, FileText, TrendingUp, Target, AlertTriangle, CheckCircle, Clock, 
  BarChart3, Cpu, Sparkles, Eye, Download, MessageCircle, Settings, PlayCircle, 
  PauseCircle, Users, Shield, Award, ChevronRight, Search, Filter, X, Upload, 
  Mic, Volume2, BookOpen, Scale, Gavel, Camera, RefreshCw, Star, 
  Globe, MapPin, Calendar, Bell, Home, User, Menu, ChevronDown,
  Bookmark, Share2, ThumbsUp, History, Lightbulb, HelpCircle,
  Phone, Mail, ExternalLink, ArrowRight, Play, Plus, Send,
  Loader2, Database, Network, Activity, Wifi, WifiOff, Save,
  FileCheck, AlertCircle, Info, Trash2, Edit, Copy, Bot,
  Headphones, Monitor, Smartphone, Cloud, Lock, Rocket
} from 'lucide-react';

// Configuration du thème Sunu Loi
const SUNU_THEME = {
  colors: {
    primary: {
      green: '#22c55e',
      yellow: '#facc15',
      darkGreen: '#16a34a',
      darkYellow: '#eab308'
    },
    gradients: {
      main: 'from-green-400 via-yellow-400 to-green-500',
      reverse: 'from-yellow-400 via-green-400 to-yellow-500',
      subtle: 'from-green-50 to-yellow-50',
      dark: 'from-green-600 to-yellow-600'
    },
    backgrounds: {
      lightGreen: 'bg-green-50',
      lightYellow: 'bg-yellow-50',
      green: 'bg-green-100',
      yellow: 'bg-yellow-100'
    }
  }
};

// Services d'API simulés
class SunuAIService {
  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async analyzeDocument(document) {
    await this.delay(2000);
    return {
      success: true,
      data: {
        score: Math.floor(Math.random() * 30) + 70,
        issues: [
          { type: 'Clause manquante', severity: 'Moyenne', location: 'Article 5' },
          { type: 'Référence obsolète', severity: 'Faible', location: 'Préambule' }
        ],
        suggestions: [
          'Ajouter clause de résiliation',
          'Mettre à jour les références légales',
          'Clarifier les modalités de paiement'
        ]
      }
    };
  }

  static async generateLegalText(type, params) {
    await this.delay(1500);
    const templates = {
      'contrat': `CONTRAT DE ${params.category || 'PRESTATION'}\n\nGénéré par Sunu IA\nDate: ${new Date().toLocaleDateString('fr-FR')}\n\nPARTIES:\n- Client: ${params.client || '[À compléter]'}\n- Prestataire: ${params.provider || '[À compléter]'}\n\nCONDITIONS:\n[Contenu généré automatiquement selon le droit sénégalais]\n\nFait à Dakar, le ${new Date().toLocaleDateString('fr-FR')}`,
      'lettre': `LETTRE DE ${params.purpose || 'DEMANDE'}\n\nGénérée par Sunu IA\n\nDestinaire: ${params.recipient || '[À compléter]'}\nObjet: ${params.subject || 'Demande d\'information'}\n\nMonsieur/Madame,\n\n[Contenu personnalisé selon votre demande]\n\nCordialement,\n[Votre nom]`,
      'avis': `AVIS JURIDIQUE\n\nÉmis par Sunu IA\nDate: ${new Date().toLocaleDateString('fr-FR')}\n\nSUITE À VOTRE CONSULTATION:\n\n[Analyse juridique détaillée basée sur le droit sénégalais]\n\nRECOMMANDATIONS:\n- [Recommandation 1]\n- [Recommandation 2]\n- [Recommandation 3]`
    };
    
    return {
      success: true,
      data: {
        content: templates[type] || 'Document généré par Sunu IA',
        wordCount: templates[type]?.split(' ').length || 0,
        createdAt: new Date().toISOString()
      }
    };
  }

  static async searchJurisprudence(query) {
    await this.delay(800);
    return {
      success: true,
      data: {
        results: [
          {
            title: `Arrêt relatif à "${query}"`,
            court: 'Cour Suprême du Sénégal',
            date: '2024-08-15',
            relevance: Math.floor(Math.random() * 20) + 80,
            summary: `Décision importante concernant ${query.toLowerCase()} dans le contexte du droit sénégalais...`
          },
          {
            title: `Jugement sur ${query}`,
            court: 'TGI Dakar',
            date: '2024-06-10',
            relevance: Math.floor(Math.random() * 15) + 75,
            summary: `Jurisprudence récente sur ${query.toLowerCase()} établissant un précédent...`
          }
        ],
        total: Math.floor(Math.random() * 100) + 50
      }
    };
  }

  static async chatWithAI(message) {
    await this.delay(1000);
    const responses = [
      `Selon le droit sénégalais, concernant "${message}", je peux vous informer que...`,
      `D'après ma base de données juridique sénégalaise, votre question sur "${message}" trouve sa réponse dans...`,
      `En tant qu'IA spécialisée en droit sénégalais, je peux confirmer que pour "${message}", la procédure appropriée est...`,
      `Basé sur l'analyse de la jurisprudence sénégalaise, concernant "${message}", je recommande...`
    ];
    
    return {
      success: true,
      data: {
        message: responses[Math.floor(Math.random() * responses.length)],
        confidence: Math.floor(Math.random() * 30) + 70,
        timestamp: new Date().toISOString()
      }
    };
  }

  static async predictCaseOutcome(caseData) {
    await this.delay(2500);
    return {
      success: true,
      data: {
        probability: Math.floor(Math.random() * 30) + 70,
        duration: Math.floor(Math.random() * 12) + 3,
        cost: Math.floor(Math.random() * 1500000) + 500000,
        confidence: Math.floor(Math.random() * 25) + 75,
        factors: [
          'Solidité du dossier',
          'Jurisprudence favorable',
          'Qualification juridique claire'
        ]
      }
    };
  }
}

// Hook pour la gestion des notifications
const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now();
    const newNotification = { id, ...notification };
    setNotifications(prev => [...prev, newNotification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, notification.duration || 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return { notifications, addNotification, removeNotification };
};

// Hook pour l'état de connexion
const useConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

const PageIa = () => {
  // États principaux
  const [activeService, setActiveService] = useState('chat');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // États pour les différents services
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [documentToAnalyze, setDocumentToAnalyze] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [predictionForm, setPredictionForm] = useState({
    type: 'civil',
    description: '',
    amount: ''
  });
  const [predictionResult, setPredictionResult] = useState(null);

  // Hooks
  const { notifications, addNotification, removeNotification } = useNotifications();
  const isOnline = useConnectionStatus();
  const chatEndRef = useRef(null);

  // Services disponibles
  const services = useMemo(() => [
    {
      id: 'chat',
      name: 'Assistant IA Juridique',
      icon: <MessageCircle className="w-8 h-8" />,
      description: 'Discutez avec notre IA spécialisée en droit sénégalais',
      color: 'from-green-400 to-yellow-400'
    },
    {
      id: 'analyze',
      name: 'Analyse de Documents',
      icon: <FileCheck className="w-8 h-8" />,
      description: 'Analysez vos documents juridiques avec l\'IA',
      color: 'from-yellow-400 to-green-400'
    },
    {
      id: 'generate',
      name: 'Génération de Textes',
      icon: <Edit className="w-8 h-8" />,
      description: 'Générez des documents juridiques automatiquement',
      color: 'from-green-500 to-yellow-500'
    },
    {
      id: 'search',
      name: 'Recherche Jurisprudentielle',
      icon: <Search className="w-8 h-8" />,
      description: 'Recherchez dans la base de jurisprudence sénégalaise',
      color: 'from-yellow-500 to-green-500'
    },
    {
      id: 'predict',
      name: 'Prédiction d\'Issues',
      icon: <TrendingUp className="w-8 h-8" />,
      description: 'Prédisez l\'issue probable de vos affaires',
      color: 'from-green-600 to-yellow-600'
    }
  ], []);

  // Initialisation du chat
  useEffect(() => {
    if (activeService === 'chat' && chatMessages.length === 0) {
      setChatMessages([{
        type: 'bot',
        message: 'Salut ! Je suis Sunu IA, votre assistant juridique intelligent. Je connais le droit sénégalais et je suis là pour vous aider. Comment puis-je vous assister aujourd\'hui ?',
        timestamp: new Date().toLocaleTimeString(),
        confidence: 95
      }]);
    }
  }, [activeService, chatMessages.length]);

  // Auto-scroll du chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Gestionnaires d'événements
  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !isOnline) return;

    const userMessage = {
      type: 'user',
      message: currentMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage('');
    setLoading(true);

    try {
      const response = await SunuAIService.chatWithAI(messageToSend);
      if (response.success) {
        setChatMessages(prev => [...prev, {
          type: 'bot',
          message: response.data.message,
          timestamp: new Date().toLocaleTimeString(),
          confidence: response.data.confidence
        }]);
      }
    } catch (error) {
      setError('Erreur lors de l\'envoi du message');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeDocument = async () => {
    if (!documentToAnalyze.trim() || !isOnline) return;

    setLoading(true);
    setError(null);

    try {
      const response = await SunuAIService.analyzeDocument(documentToAnalyze);
      if (response.success) {
        setAnalysisResult(response.data);
        addNotification({
          type: 'success',
          title: 'Analyse complétée',
          message: `Score de qualité: ${response.data.score}%`
        });
      }
    } catch (error) {
      setError('Erreur lors de l\'analyse');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDocument = async (type) => {
    setLoading(true);
    setError(null);

    try {
      const response = await SunuAIService.generateLegalText(type, {});
      if (response.success) {
        setGeneratedDocument(response.data);
        addNotification({
          type: 'success',
          title: 'Document généré',
          message: `${response.data.wordCount} mots créés`
        });
      }
    } catch (error) {
      setError('Erreur lors de la génération');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || !isOnline) return;

    setLoading(true);
    setError(null);

    try {
      const response = await SunuAIService.searchJurisprudence(searchQuery);
      if (response.success) {
        setSearchResults(response.data.results);
        addNotification({
          type: 'info',
          title: 'Recherche terminée',
          message: `${response.data.results.length} résultats trouvés`
        });
      }
    } catch (error) {
      setError('Erreur lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  const handlePrediction = async () => {
    if (!predictionForm.description || !isOnline) return;

    setLoading(true);
    setError(null);

    try {
      const response = await SunuAIService.predictCaseOutcome(predictionForm);
      if (response.success) {
        setPredictionResult(response.data);
        addNotification({
          type: 'success',
          title: 'Prédiction complétée',
          message: `${response.data.probability}% de chances de succès`
        });
      }
    } catch (error) {
      setError('Erreur lors de la prédiction');
    } finally {
      setLoading(false);
    }
  };

  // Composant de notifications
  const NotificationCenter = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-2xl shadow-2xl backdrop-blur-xl border-2 transition-all duration-500 ${
            notification.type === 'success' ? 'bg-green-50/90 border-green-200 text-green-800' :
            notification.type === 'error' ? 'bg-red-50/90 border-red-200 text-red-800' :
            'bg-yellow-50/90 border-yellow-200 text-yellow-800'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                {notification.type === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
                {notification.type === 'info' && <Info className="w-5 h-5 text-yellow-600" />}
              </div>
              <div>
                <h4 className="font-bold text-sm">{notification.title}</h4>
                <p className="text-xs mt-1 opacity-90">{notification.message}</p>
              </div>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Composant Chat IA
  const ChatAIComponent = () => (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-green-200">
        {/* Header du chat */}
        <div className="bg-gradient-to-r from-green-500 to-yellow-500 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Sunu IA Assistant</h3>
                <p className="text-green-100">Spécialisé en droit sénégalais</p>
              </div>
            </div>
            <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
              isOnline ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
            }`}>
              {isOnline ? <Wifi className="w-4 h-4 mr-1" /> : <WifiOff className="w-4 h-4 mr-1" />}
              {isOnline ? 'En ligne' : 'Hors ligne'}
            </div>
          </div>
        </div>

        {/* Zone de messages */}
        <div className="h-96 overflow-y-auto p-6 bg-gradient-to-b from-green-50/50 to-yellow-50/50">
          <div className="space-y-4">
            {chatMessages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-white' 
                    : 'bg-white border-2 border-green-200 text-gray-800'
                }`}>
                  {message.type === 'bot' && message.confidence && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-green-600 font-medium">Sunu IA</span>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        {message.confidence}% sûr
                      </span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.message}</p>
                  <p className="text-xs mt-2 opacity-70">{message.timestamp}</p>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-green-200 px-4 py-3 rounded-2xl shadow-lg">
                  <div className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin text-green-500" />
                    <span className="text-sm text-gray-600">Sunu IA réfléchit...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={chatEndRef} />
        </div>

        {/* Zone de saisie */}
        <div className="p-6 border-t-2 border-green-200">
          <div className="flex space-x-3 mb-4">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Posez votre question juridique..."
              disabled={loading || !isOnline}
              className="flex-1 p-4 border-2 border-green-200 rounded-2xl focus:border-green-400 focus:ring-2 focus:ring-green-200 disabled:bg-gray-100"
            />
            <button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || loading || !isOnline}
              className="bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-4 rounded-2xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['Divorce', 'Contrat de travail', 'Succession', 'Droit foncier'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setCurrentMessage(`Je voudrais des informations sur ${suggestion.toLowerCase()}`)}
                className="text-sm bg-green-50 text-green-700 px-3 py-2 rounded-xl hover:bg-green-100 transition-colors border border-green-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Composant Analyse de Documents
  const DocumentAnalysisComponent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-yellow-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <FileCheck className="w-7 h-7 mr-3 text-yellow-600" />
          Analyser un Document
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Document à analyser
            </label>
            <textarea
              rows={8}
              value={documentToAnalyze}
              onChange={(e) => setDocumentToAnalyze(e.target.value)}
              placeholder="Collez votre document juridique ici pour l'analyser..."
              className="w-full p-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl focus:ring-3 focus:ring-yellow-500 resize-none"
            />
          </div>
          
          <button
            onClick={handleAnalyzeDocument}
            disabled={loading || !documentToAnalyze.trim() || !isOnline}
            className="w-full bg-gradient-to-r from-yellow-500 to-green-500 text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyse en cours...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Eye className="w-5 h-5 mr-2" />
                Analyser avec Sunu IA
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-green-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Résultats d'Analyse</h3>
        
        {analysisResult ? (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-6 rounded-2xl border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-gray-900">Score de Qualité</span>
                <span className={`text-3xl font-black ${
                  analysisResult.score > 80 ? 'text-green-600' : 
                  analysisResult.score > 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {analysisResult.score}%
                </span>
              </div>
              <div className="w-full bg-white rounded-full h-4">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    analysisResult.score > 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                    analysisResult.score > 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                    'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                  style={{ width: `${analysisResult.score}%` }}
                />
              </div>
            </div>

            {analysisResult.issues.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900">Problèmes détectés:</h4>
                {analysisResult.issues.map((issue, index) => (
                  <div key={index} className={`p-4 rounded-xl border-l-4 ${
                    issue.severity === 'Élevée' ? 'bg-red-50 border-red-500' :
                    issue.severity === 'Moyenne' ? 'bg-yellow-50 border-yellow-500' :
                    'bg-green-50 border-green-500'
                  }`}>
                    <div className="font-semibold text-gray-900">{issue.type}</div>
                    <div className="text-sm text-gray-600">📍 {issue.location}</div>
                  </div>
                ))}
              </div>
            )}

            {analysisResult.suggestions.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-200">
                <h4 className="font-bold text-blue-900 mb-3">Suggestions d'amélioration:</h4>
                <ul className="space-y-2">
                  {analysisResult.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start text-blue-700">
                      <Lightbulb className="w-4 h-4 mr-2 mt-0.5 text-blue-500" />
                      <span className="text-sm">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <FileCheck className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">Prêt pour l'analyse</p>
              <p>Sunu IA analysera votre document</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Composant de génération de documents
  const DocumentGenerationComponent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-green-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Edit className="w-7 h-7 mr-3 text-green-600" />
          Générateur de Documents
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { type: 'contrat', name: 'Contrat', icon: '📄' },
              { type: 'lettre', name: 'Lettre', icon: '✉️' },
              { type: 'avis', name: 'Avis Juridique', icon: '⚖️' }
            ].map((template) => (
              <button
                key={template.type}
                onClick={() => handleGenerateDocument(template.type)}
                disabled={loading}
                className="p-6 bg-gradient-to-br from-green-50 to-yellow-50 border-2 border-green-200 rounded-2xl hover:shadow-lg transition-all text-center disabled:opacity-50"
              >
                <div className="text-3xl mb-2">{template.icon}</div>
                <div className="font-bold text-gray-900">{template.name}</div>
                <div className="text-sm text-gray-600 mt-1">Générer</div>
              </button>
            ))}
          </div>
          
          {loading && (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 text-green-500 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Génération par Sunu IA...</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-yellow-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Document Généré</h3>
        
        {generatedDocument ? (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-2xl p-6 h-80 overflow-y-auto border-2 border-yellow-200">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">{generatedDocument.content}</pre>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-gradient-to-r from-green-500 to-yellow-500 text-white py-3 rounded-2xl font-bold hover:shadow-lg transition-all">
                <Download className="w-4 h-4 inline mr-2" />
                Télécharger
              </button>
              <button className="flex-1 bg-gradient-to-r from-yellow-500 to-green-500 text-white py-3 rounded-2xl font-bold hover:shadow-lg transition-all">
                <Edit className="w-4 h-4 inline mr-2" />
                Modifier
              </button>
              <button className="px-4 py-3 bg-blue-100 text-blue-600 rounded-2xl hover:bg-blue-200 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-80 text-gray-500">
            <div className="text-center">
              <Edit className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">Prêt pour la génération</p>
              <p>Choisissez un type de document</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Composant de recherche jurisprudentielle
  const JurisprudenceSearchComponent = () => (
    <div className="space-y-8">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-green-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Search className="w-7 h-7 mr-3 text-green-600" />
          Recherche Jurisprudentielle
        </h3>
        
        <div className="space-y-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Rechercher dans la jurisprudence sénégalaise..."
                className="w-full pl-12 pr-4 py-4 bg-green-50 border-2 border-green-200 rounded-2xl focus:ring-3 focus:ring-green-500"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !searchQuery.trim() || !isOnline}
              className="bg-gradient-to-r from-green-500 to-yellow-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Rechercher'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-2xl border-2 border-green-200 text-center">
              <Scale className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="font-bold text-green-900">15,000+</div>
              <div className="text-sm text-green-700">Décisions</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-2xl border-2 border-yellow-200 text-center">
              <Gavel className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="font-bold text-yellow-900">28</div>
              <div className="text-sm text-yellow-700">Juridictions</div>
            </div>
            <div className="bg-green-50 p-4 rounded-2xl border-2 border-green-200 text-center">
              <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="font-bold text-green-900">98%</div>
              <div className="text-sm text-green-700">Précision IA</div>
            </div>
          </div>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-yellow-200">
          <h4 className="text-2xl font-bold text-gray-900 mb-6">Résultats de Recherche</h4>
          
          <div className="space-y-6">
            {searchResults.map((result, index) => (
              <div key={index} className="p-6 border-2 border-green-200 rounded-2xl hover:shadow-lg transition-all hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-900 text-lg mb-2">{result.title}</h5>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {result.court}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(result.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-gray-700">{result.summary}</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                    {result.relevance}% pertinent
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="bg-green-100 text-green-700 px-4 py-2 rounded-xl hover:bg-green-200 transition-colors text-sm font-medium">
                    <Eye className="w-4 h-4 inline mr-1" />
                    Voir détails
                  </button>
                  <button className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl hover:bg-yellow-200 transition-colors text-sm font-medium">
                    <Download className="w-4 h-4 inline mr-1" />
                    Télécharger
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Composant de prédiction d'issues
  const PredictionComponent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-green-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-7 h-7 mr-3 text-green-600" />
          Prédiction d'Issue
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Type d'affaire
            </label>
            <select
              value={predictionForm.type}
              onChange={(e) => setPredictionForm({...predictionForm, type: e.target.value})}
              className="w-full p-4 bg-green-50 border-2 border-green-200 rounded-2xl focus:ring-3 focus:ring-green-500"
            >
              <option value="civil">Affaire civile</option>
              <option value="commercial">Litige commercial</option>
              <option value="penal">Affaire pénale</option>
              <option value="administratif">Contentieux administratif</option>
              <option value="foncier">Droit foncier</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Montant en jeu (FCFA)
            </label>
            <input
              type="number"
              value={predictionForm.amount}
              onChange={(e) => setPredictionForm({...predictionForm, amount: e.target.value})}
              placeholder="Ex: 2,000,000"
              className="w-full p-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl focus:ring-3 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Description de l'affaire
            </label>
            <textarea
              rows={6}
              value={predictionForm.description}
              onChange={(e) => setPredictionForm({...predictionForm, description: e.target.value})}
              placeholder="Décrivez votre affaire en détail..."
              className="w-full p-4 bg-green-50 border-2 border-green-200 rounded-2xl focus:ring-3 focus:ring-green-500 resize-none"
            />
          </div>

          <button
            onClick={handlePrediction}
            disabled={loading || !predictionForm.description || !isOnline}
            className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Prédiction en cours...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Prédire avec Sunu IA
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-yellow-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Résultats de Prédiction</h3>
        
        {predictionResult ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-2xl text-white text-center">
                <div className="text-3xl font-black mb-2">{predictionResult.probability}%</div>
                <div className="text-sm">Chances de succès</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-2xl text-white text-center">
                <div className="text-2xl font-black mb-2">{predictionResult.duration} mois</div>
                <div className="text-sm">Durée estimée</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-6 rounded-2xl border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-gray-900">Coût Estimé</span>
                <span className="text-2xl font-bold text-green-600">
                  {(predictionResult.cost / 1000).toFixed(0)}K FCFA
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Confiance de l'IA: {predictionResult.confidence}%
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200">
              <h4 className="font-bold text-blue-900 mb-4">Facteurs clés identifiés:</h4>
              <div className="space-y-2">
                {predictionResult.factors.map((factor, index) => (
                  <div key={index} className="flex items-center text-blue-700">
                    <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-96 text-gray-500">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">Prêt pour la prédiction</p>
              <p>Remplissez le formulaire à gauche</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Rendu du contenu selon le service actif
  const renderActiveService = () => {
    switch (activeService) {
      case 'chat':
        return <ChatAIComponent />;
      case 'analyze':
        return <DocumentAnalysisComponent />;
      case 'generate':
        return <DocumentGenerationComponent />;
      case 'search':
        return <JurisprudenceSearchComponent />;
      case 'predict':
        return <PredictionComponent />;
      default:
        return <ChatAIComponent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      
      <NotificationCenter />
      
      {/* Header principal */}
      <div className={`bg-gradient-to-r ${SUNU_THEME.gradients.main} text-white shadow-2xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
                <Brain className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl font-black flex items-center">
                  Sunu IA
                  <Sparkles className="w-8 h-8 ml-3 text-yellow-300 animate-pulse" />
                </h1>
                <p className="text-green-100 text-lg">Intelligence Artificielle Juridique Sénégalaise</p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-300' : 'bg-red-300'}`}></div>
                    <span className="text-sm text-green-200">
                      {isOnline ? 'IA opérationnelle' : 'Connexion limitée'}
                    </span>
                  </div>
                  <div className="text-sm text-green-200">
                    Dakar, Sénégal • {new Date().toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/30">
                <div className="text-center">
                  <div className="text-2xl font-black text-yellow-300">IA PRO</div>
                  <div className="text-sm text-green-100">Accès Premium</div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-3 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all group border border-white/20">
                  <Bell className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
                <button className="p-3 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all group border border-white/20">
                  <Settings className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Métriques en temps réel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 text-center border-2 border-green-200">
            <div className="text-3xl font-black text-green-600 mb-2">247</div>
            <div className="text-sm text-gray-600">Analyses aujourd'hui</div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 text-center border-2 border-yellow-200">
            <div className="text-3xl font-black text-yellow-600 mb-2">98.2%</div>
            <div className="text-sm text-gray-600">Précision IA</div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 text-center border-2 border-green-200">
            <div className="text-3xl font-black text-green-600 mb-2">156</div>
            <div className="text-sm text-gray-600">Documents générés</div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 text-center border-2 border-yellow-200">
            <div className="text-3xl font-black text-yellow-600 mb-2">4.9★</div>
            <div className="text-sm text-gray-600">Satisfaction</div>
          </div>
        </div>

        {/* Alerte connexion */}
        {!isOnline && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-8">
            <div className="flex items-center justify-center">
              <WifiOff className="w-6 h-6 text-red-600 mr-3" />
              <span className="text-red-800 font-medium">
                Connexion internet requise pour utiliser Sunu IA
              </span>
            </div>
          </div>
        )}

        {/* Erreur globale */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
              <div>
                <h4 className="font-bold text-red-800">Erreur</h4>
                <p className="text-red-700">{error}</p>
              </div>
              <button 
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        
        {/* Navigation des services */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Services Sunu IA</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 border-2 ${
                  activeService === service.id
                    ? `bg-gradient-to-br ${service.color} text-white shadow-2xl border-white/30 transform scale-105`
                    : 'bg-white/90 hover:bg-white text-gray-700 border-green-200 hover:border-yellow-300 hover:shadow-lg'
                }`}
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                <p className={`text-sm ${
                  activeService === service.id ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Contenu du service actif */}
        <div className="mb-12">
          {renderActiveService()}
        </div>
      </div>

      {/* Footer */}
      <div className={`bg-gradient-to-r ${SUNU_THEME.gradients.dark} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <Brain className="w-10 h-10 mr-4 text-yellow-300" />
                <div>
                  <div className="text-2xl font-black text-yellow-300">Sunu IA</div>
                  <div className="text-green-200">Intelligence Artificielle Juridique</div>
                </div>
              </div>
              <p className="text-green-100 mb-6 leading-relaxed">
                Sunu IA révolutionne la pratique du droit au Sénégal avec une intelligence artificielle 
                spécialement conçue pour le système juridique sénégalais. Accessible, précis et conforme.
              </p>
              <div className="flex space-x-4">
                <button className="bg-white/20 backdrop-blur-md p-3 rounded-xl hover:bg-white/30 transition-all">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="bg-white/20 backdrop-blur-md p-3 rounded-xl hover:bg-white/30 transition-all">
                  <Mail className="w-5 h-5" />
                </button>
                <button className="bg-white/20 backdrop-blur-md p-3 rounded-xl hover:bg-white/30 transition-all">
                  <Globe className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-yellow-300 mb-4">Services IA</h4>
              <ul className="space-y-2 text-green-100">
                <li className="hover:text-white cursor-pointer transition-colors">Assistant Juridique</li>
                <li className="hover:text-white cursor-pointer transition-colors">Analyse Documents</li>
                <li className="hover:text-white cursor-pointer transition-colors">Génération Textes</li>
                <li className="hover:text-white cursor-pointer transition-colors">Recherche Jurisprudence</li>
                <li className="hover:text-white cursor-pointer transition-colors">Prédictions</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-green-300 mb-4">Support</h4>
              <ul className="space-y-2 text-green-100">
                <li className="hover:text-white cursor-pointer transition-colors flex items-center">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Centre d'aide
                </li>
                <li className="hover:text-white cursor-pointer transition-colors flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +221 XX XXX XXXX
                </li>
                <li className="hover:text-white cursor-pointer transition-colors flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  support@sunuloi.sn
                </li>
                <li className="hover:text-white cursor-pointer transition-colors flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Dakar, Sénégal
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <div className="flex items-center justify-center space-x-6 text-sm text-green-200 mb-4">
              <span>&copy; 2024 Sunu Loi. Tous droits réservés.</span>
              <span>&bull;</span>
              <span>Conforme au droit sénégalais</span>
              <span>&bull;</span>
              <span>IA certifiée et sécurisée</span>
            </div>
            <div className="text-yellow-300 text-sm flex items-center justify-center">
              Développé avec passion au Sénégal
              <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageIa;