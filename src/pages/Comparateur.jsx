import React, { useState, useRef, useEffect } from 'react';
import {
  GitCompare,
  FileText,
  Upload,
  Download,
  Eye,
  EyeOff,
  RotateCcw,
  Save,
  Share2,
  Search,
  Filter,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Zap,
  BookOpen,
  Scale,
  Gavel,
  Settings,
  BarChart3,
  TrendingUp,
  Users,
  Star,
  Copy,
  Edit,
  Trash2,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  History,
  Layers,
  Target,
  Award
} from 'lucide-react';

const TextComparatorPage = () => {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [comparisonResult, setComparisonResult] = useState(null);
  const [comparisonMode, setComparisonMode] = useState('side-by-side');
  const [showDifferences, setShowDifferences] = useState(true);
  const [showSimilarities, setShowSimilarities] = useState(true);
  const [activeTab, setActiveTab] = useState('compare');
  const [savedComparisons, setSavedComparisons] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);

  // Données de comparaisons sauvegardées simulées
  const mockSavedComparisons = [
    {
      id: 1,
      title: 'Code Travail 2023 vs 2024',
      date: '2024-09-10',
      type: 'code',
      leftDoc: 'Code du Travail - Version 2023',
      rightDoc: 'Code du Travail - Version 2024',
      changes: 15,
      additions: 8,
      deletions: 3,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Loi Environnement - Versions',
      date: '2024-09-08',
      type: 'law',
      leftDoc: 'Loi Environnement - Projet initial',
      rightDoc: 'Loi Environnement - Version adoptée',
      changes: 23,
      additions: 12,
      deletions: 7,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Constitution - Amendements',
      date: '2024-09-05',
      type: 'constitution',
      leftDoc: 'Constitution 2001',
      rightDoc: 'Proposition amendement 2024',
      changes: 5,
      additions: 3,
      deletions: 1,
      status: 'draft'
    }
  ];

  // Textes d'exemple
  const sampleTexts = {
    left: `Article 1er - Définitions
Au sens de la présente loi, on entend par :
- Service public : toute activité d'intérêt général exercée par une personne publique ou sous son contrôle
- Usager : toute personne physique ou morale bénéficiaire d'un service public
- Qualité de service : ensemble des caractéristiques qui confèrent au service l'aptitude à satisfaire les besoins

Article 2 - Principes généraux
Les services publics sont régis par les principes suivants :
1) Égalité de traitement des usagers
2) Continuité du service
3) Adaptabilité aux besoins`,

    right: `Article 1er - Définitions
Au sens de la présente loi, on entend par :
- Service public : toute activité d'intérêt général exercée par une personne publique ou privée sous contrôle public
- Usager : toute personne physique ou morale, y compris les entreprises, bénéficiaire d'un service public
- Qualité de service : ensemble des caractéristiques qui confèrent au service l'aptitude à satisfaire les besoins et attentes des usagers
- Numérique : ensemble des technologies de l'information et de la communication

Article 2 - Principes généraux
Les services publics sont régis par les principes suivants :
1) Égalité de traitement des usagers
2) Continuité du service public
3) Adaptabilité aux besoins évolutifs
4) Accessibilité numérique`
  };

  useEffect(() => {
    setSavedComparisons(mockSavedComparisons);
  }, []);

  const loadSampleTexts = () => {
    setLeftText(sampleTexts.left);
    setRightText(sampleTexts.right);
  };

  const performComparison = async () => {
    if (!leftText.trim() || !rightText.trim()) {
      alert('Veuillez saisir du texte dans les deux zones');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulation de l'analyse IA
    setTimeout(() => {
      const mockResults = {
        differences: 12,
        additions: 8,
        deletions: 3,
        modifications: 4,
        similarity: 78,
        confidence: 95,
        keyChanges: [
          'Ajout de la définition "Numérique"',
          'Modification de la définition "Service public"',
          'Extension de la définition "Usager"',
          'Ajout du principe "Accessibilité numérique"'
        ]
      };
      
      setComparisonResult(mockResults);
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
    }, 2000);
  };

  const clearTexts = () => {
    setLeftText('');
    setRightText('');
    setComparisonResult(null);
    setAnalysisResults(null);
  };

  const saveComparison = () => {
    const newComparison = {
      id: Date.now(),
      title: `Comparaison ${new Date().toLocaleDateString()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'custom',
      leftDoc: 'Document gauche',
      rightDoc: 'Document droite',
      changes: comparisonResult?.differences || 0,
      additions: comparisonResult?.additions || 0,
      deletions: comparisonResult?.deletions || 0,
      status: 'completed'
    };
    
    setSavedComparisons([newComparison, ...savedComparisons]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-yellow-500 rounded-xl">
                <GitCompare className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Comparateur de Textes</h1>
                <p className="text-gray-600 dark:text-gray-400">Analysez et comparez vos documents juridiques avec l'IA</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Upload className="h-4 w-4 mr-2 inline" />
                Importer
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                <Save className="h-4 w-4 mr-2 inline" />
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Onglets */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-8">
          {[
            { id: 'compare', label: 'Comparer', icon: GitCompare },
            { id: 'history', label: 'Historique', icon: History },
            { id: 'templates', label: 'Modèles', icon: BookOpen }
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

        {activeTab === 'compare' && (
          <div className="space-y-8">
            {/* Barre d'outils */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={loadSampleTexts}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <Zap className="h-4 w-4 mr-2 inline" />
                    Exemple
                  </button>
                  <button 
                    onClick={performComparison}
                    disabled={isAnalyzing}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 inline animate-spin" />
                        Analyse en cours...
                      </>
                    ) : (
                      <>
                        <Target className="h-4 w-4 mr-2 inline" />
                        Comparer
                      </>
                    )}
                  </button>
                  <button 
                    onClick={clearTexts}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4 mr-2 inline" />
                    Effacer
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <select 
                    value={comparisonMode}
                    onChange={(e) => setComparisonMode(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="side-by-side">Côte à côte</option>
                    <option value="unified">Vue unifiée</option>
                    <option value="inline">En ligne</option>
                  </select>

                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={showDifferences}
                        onChange={(e) => setShowDifferences(e.target.checked)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Différences</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={showSimilarities}
                        onChange={(e) => setShowSimilarities(e.target.checked)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Similitudes</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Zone de comparaison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Texte gauche */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Document Original</h3>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Upload className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <textarea
                    ref={leftTextRef}
                    value={leftText}
                    onChange={(e) => setLeftText(e.target.value)}
                    placeholder="Collez ou tapez votre texte original ici..."
                    className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Texte droite */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Document Modifié</h3>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Upload className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <textarea
                    ref={rightTextRef}
                    value={rightText}
                    onChange={(e) => setRightText(e.target.value)}
                    placeholder="Collez ou tapez votre texte modifié ici..."
                    className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Résultats de l'analyse */}
            {analysisResults && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Analyse IA Complète</h3>
                      <p className="text-gray-600 dark:text-gray-400">Résultats détaillés de la comparaison</p>
                    </div>
                  </div>
                  <button 
                    onClick={saveComparison}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2 inline" />
                    Sauvegarder
                  </button>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">{analysisResults.similarity}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Similarité</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{analysisResults.differences}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Différences</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{analysisResults.additions}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Ajouts</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400">{analysisResults.deletions}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Suppressions</div>
                  </div>
                </div>

                {/* Changements clés */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Changements Clés Détectés</h4>
                  <div className="space-y-3">
                    {analysisResults.keyChanges.map((change, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="mt-1">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{change}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Niveau de confiance */}
                <div className="mt-6 flex items-center justify-between p-4 bg-gradient-to-r from-green-100 to-yellow-100 dark:from-green-900/20 dark:to-yellow-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">Niveau de confiance IA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${analysisResults.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold text-green-600">{analysisResults.confidence}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Historique des Comparaisons</h3>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                  <Plus className="h-4 w-4 mr-2 inline" />
                  Nouvelle comparaison
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {savedComparisons.map(comparison => (
                  <div key={comparison.id} className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white">{comparison.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            comparison.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}>
                            {comparison.status === 'completed' ? 'Terminé' : 'Brouillon'}
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {comparison.leftDoc} ↔ {comparison.rightDoc}
                        </div>

                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-1 text-blue-600">
                            <span>{comparison.changes}</span>
                            <span>modifications</span>
                          </div>
                          <div className="flex items-center space-x-1 text-green-600">
                            <Plus className="h-3 w-3" />
                            <span>{comparison.additions}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-red-600">
                            <Minus className="h-3 w-3" />
                            <span>{comparison.deletions}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>{comparison.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Comparaison de Codes',
                description: 'Modèle spécialisé pour comparer différentes versions de codes juridiques',
                icon: BookOpen,
                color: 'from-blue-500 to-blue-600',
                features: ['Détection des articles modifiés', 'Analyse des impacts', 'Visualisation hiérarchique']
              },
              {
                title: 'Analyse de Jurisprudence',
                description: 'Compare des décisions de justice et identifie les évolutions jurisprudentielles',
                icon: Scale,
                color: 'from-green-500 to-green-600',
                features: ['Analyse des motifs', 'Détection des revirements', 'Tendances juridiques']
              },
              {
                title: 'Évolution Législative',
                description: 'Suit les modifications des lois et règlements au fil du temps',
                icon: Gavel,
                color: 'from-yellow-500 to-yellow-600',
                features: ['Chronologie des modifications', 'Impact analysis', 'Alertes automatiques']
              }
            ].map((template, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${template.color} mb-4`}>
                  <template.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{template.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{template.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {template.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                  Utiliser ce modèle
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextComparatorPage;