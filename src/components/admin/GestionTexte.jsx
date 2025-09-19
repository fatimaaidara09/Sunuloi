import React, { useState } from 'react';
import { 
  FileText, Plus, Edit, Trash2, Eye, Download, Upload, Search, 
  Filter, MoreHorizontal, Clock, CheckCircle, AlertTriangle,
  BookOpen, Gavel, Flag, Archive, Star, TrendingUp
} from 'lucide-react';

const TextManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTexts, setSelectedTexts] = useState([]);

  const [texts, setTexts] = useState([
    {
      id: 1,
      title: 'Code de la famille du Sénégal',
      type: 'code',
      category: 'Droit civil',
      status: 'En vigueur',
      lastModified: '2024-01-15',
      author: 'Admin Principal',
      views: 1250,
      downloads: 456,
      articles: 245,
      version: '2.1',
      priority: 'high',
      description: 'Ensemble des règles juridiques régissant la famille au Sénégal'
    },
    {
      id: 2,
      title: 'Loi sur la protection des données personnelles',
      type: 'loi',
      category: 'Droit numérique',
      status: 'En vigueur',
      lastModified: '2024-01-10',
      author: 'Marie Diop',
      views: 890,
      downloads: 234,
      articles: 78,
      version: '1.3',
      priority: 'medium',
      description: 'Protection des données personnelles dans l\'ère numérique'
    },
    {
      id: 3,
      title: 'Décret sur l\'environnement urbain',
      type: 'decret',
      category: 'Droit environnemental',
      status: 'Projet',
      lastModified: '2024-01-08',
      author: 'Ousmane Fall',
      views: 345,
      downloads: 89,
      articles: 34,
      version: '1.0',
      priority: 'low',
      description: 'Réglementation environnementale pour les zones urbaines'
    },
    {
      id: 4,
      title: 'Code du travail - Amendement 2024',
      type: 'code',
      category: 'Droit du travail',
      status: 'En révision',
      lastModified: '2024-01-20',
      author: 'Aminata Sow',
      views: 2100,
      downloads: 678,
      articles: 312,
      version: '3.2',
      priority: 'high',
      description: 'Mise à jour du code du travail sénégalais'
    }
  ]);

  const categories = [
    'Droit civil', 'Droit pénal', 'Droit du travail', 'Droit commercial',
    'Droit environnemental', 'Droit numérique', 'Droit constitutionnel',
    'Droit administratif', 'Droit fiscal', 'Droit international'
  ];

  const handleBulkAction = (action) => {
    if (selectedTexts.length === 0) return;
    console.log(`Action ${action} sur ${selectedTexts.length} textes`);
    // Implémenter les actions en lot
  };

  const handleTextAction = (textId, action) => {
    console.log(`Action ${action} sur le texte ${textId}`);
  };

  const filteredTexts = texts.filter(text => {
    return (
      text.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || text.category === selectedCategory) &&
      (selectedStatus === '' || text.status === selectedStatus)
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'En vigueur': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Projet': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'En révision': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'Archivé': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'code': return <BookOpen className="h-5 w-5" />;
      case 'loi': return <Gavel className="h-5 w-5" />;
      case 'decret': return <FileText className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* En-tête avec statistiques */}
      <div className="bg-gradient-to-r from-green-500/10 to-yellow-500/10 dark:from-green-900/20 dark:to-yellow-900/20 rounded-3xl p-8 border border-green-200/50 dark:border-green-700/50">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent mb-3">
              Gestion des Textes Juridiques
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Interface révolutionnaire pour administrer le patrimoine juridique sénégalais
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              <Plus className="h-5 w-5 mr-2" />
              Nouveau texte
            </button>
            <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              <Upload className="h-5 w-5 mr-2" />
              Importer
            </button>
            <button className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              <Download className="h-5 w-5 mr-2" />
              Exporter tout
            </button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-green-600 font-semibold">+8%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{texts.length}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Textes totaux</p>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <span className="text-yellow-600 font-semibold">2</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {texts.filter(t => t.status === 'Projet').length}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">En attente</p>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <span className="text-blue-600 font-semibold">+15%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {texts.reduce((sum, text) => sum + text.views, 0).toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Vues totales</p>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                <Download className="h-6 w-6 text-white" />
              </div>
              <span className="text-purple-600 font-semibold">+22%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {texts.reduce((sum, text) => sum + text.downloads, 0).toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Téléchargements</p>
          </div>
        </div>
      </div>

      {/* Interface de recherche et filtres avancés */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher dans les textes juridiques..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Toutes les catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Tous les statuts</option>
            <option value="En vigueur">En vigueur</option>
            <option value="Projet">Projet</option>
            <option value="En révision">En révision</option>
            <option value="Archivé">Archivé</option>
          </select>
        </div>

        {/* Actions en lot */}
        {selectedTexts.length > 0 && (
          <div className="flex items-center space-x-3 mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
              {selectedTexts.length} texte(s) sélectionné(s)
            </span>
            <button 
              onClick={() => handleBulkAction('publish')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Publier
            </button>
            <button 
              onClick={() => handleBulkAction('archive')}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
            >
              Archiver
            </button>
            <button 
              onClick={() => handleBulkAction('delete')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Supprimer
            </button>
          </div>
        )}

        {/* Contrôles de vue */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all ${
                viewMode === 'grid' 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/20' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="grid grid-cols-2 gap-1 h-4 w-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-current rounded-sm"></div>
                ))}
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all ${
                viewMode === 'list' 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/20' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="space-y-1 h-4 w-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-current rounded-sm h-1"></div>
                ))}
              </div>
            </button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredTexts.length} texte(s) trouvé(s)
          </p>
        </div>
      </div>

      {/* Affichage des textes */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTexts.map((text) => (
            <TextCard 
              key={text.id} 
              text={text} 
              onAction={handleTextAction}
              selectedTexts={selectedTexts}
              setSelectedTexts={setSelectedTexts}
              getStatusColor={getStatusColor}
              getTypeIcon={getTypeIcon}
              getPriorityColor={getPriorityColor}
            />
          ))}
        </div>
      ) : (
        <TextTable 
          texts={filteredTexts}
          onAction={handleTextAction}
          selectedTexts={selectedTexts}
          setSelectedTexts={setSelectedTexts}
          getStatusColor={getStatusColor}
          getTypeIcon={getTypeIcon}
          getPriorityColor={getPriorityColor}
        />
      )}

      {filteredTexts.length === 0 && (
        <div className="text-center py-16">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Aucun texte trouvé
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Ajustez vos critères de recherche ou créez un nouveau texte juridique.
          </p>
        </div>
      )}
    </div>
  );
};

// Composant TextCard moderne
const TextCard = ({ text, onAction, selectedTexts, setSelectedTexts, getStatusColor, getTypeIcon, getPriorityColor }) => {
  const isSelected = selectedTexts.includes(text.id);

  const toggleSelection = () => {
    if (isSelected) {
      setSelectedTexts(prev => prev.filter(id => id !== text.id));
    } else {
      setSelectedTexts(prev => [...prev, text.id]);
    }
  };

  return (
    <div className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border ${
      isSelected ? 'border-green-500 ring-2 ring-green-500/20' : 'border-gray-200/50 dark:border-gray-700/50'
    } rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2`}>
      
      {/* En-tête de la carte */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={toggleSelection}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <div className={`w-1 h-16 rounded-full ${getPriorityColor(text.priority)}`}></div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(text.status)}`}>
            {text.status}
          </span>
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Icône et type */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-green-500 to-yellow-500 rounded-2xl text-white">
          {getTypeIcon(text.type)}
        </div>
        <div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {text.type}
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-400">{text.category}</p>
        </div>
      </div>

      {/* Titre et description */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-yellow-600 group-hover:bg-clip-text transition-all duration-300">
        {text.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
        {text.description}
      </p>

      {/* Métriques */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/10 rounded-xl">
          <Eye className="h-5 w-5 text-blue-600 mx-auto mb-1" />
          <p className="text-sm font-bold text-gray-900 dark:text-white">{text.views}</p>
          <p className="text-xs text-gray-500">Vues</p>
        </div>
        <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-800/10 rounded-xl">
          <Download className="h-5 w-5 text-green-600 mx-auto mb-1" />
          <p className="text-sm font-bold text-gray-900 dark:text-white">{text.downloads}</p>
          <p className="text-xs text-gray-500">Téléchargements</p>
        </div>
        <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-800/10 rounded-xl">
          <FileText className="h-5 w-5 text-purple-600 mx-auto mb-1" />
          <p className="text-sm font-bold text-gray-900 dark:text-white">{text.articles}</p>
          <p className="text-xs text-gray-500">Articles</p>
        </div>
      </div>

      {/* Métadonnées */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span>Par {text.author}</span>
        <span>v{text.version}</span>
        <span>{new Date(text.lastModified).toLocaleDateString('fr-FR')}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onAction(text.id, 'edit')}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all text-sm font-medium"
        >
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </button>
        <button
          onClick={() => onAction(text.id, 'view')}
          className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={() => onAction(text.id, 'delete')}
          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl transition-all"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Composant TextTable moderne
const TextTable = ({ texts, onAction, selectedTexts, setSelectedTexts, getStatusColor, getTypeIcon, getPriorityColor }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl overflow-hidden shadow-xl">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20">
          <tr>
            <th className="px-6 py-4 text-left">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTexts(texts.map(t => t.id));
                  } else {
                    setSelectedTexts([]);
                  }
                }}
                checked={texts.length > 0 && selectedTexts.length === texts.length}
              />
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Texte juridique
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Type & Catégorie
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Performance
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Dernière modification
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
          {texts.map((text) => {
            const isSelected = selectedTexts.includes(text.id);
            return (
              <tr 
                key={text.id} 
                className={`hover:bg-gradient-to-r hover:from-green-50/50 hover:to-yellow-50/50 dark:hover:from-green-900/10 dark:hover:to-yellow-900/10 transition-all duration-300 ${
                  isSelected ? 'bg-green-50/50 dark:bg-green-900/10' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => {
                        if (isSelected) {
                          setSelectedTexts(prev => prev.filter(id => id !== text.id));
                        } else {
                          setSelectedTexts(prev => [...prev, text.id]);
                        }
                      }}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <div className={`w-2 h-8 rounded-full ${getPriorityColor(text.priority)}`}></div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-yellow-500 rounded-xl text-white">
                      {getTypeIcon(text.type)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {text.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Par {text.author} • v{text.version}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      text.type === 'code' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                      text.type === 'loi' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
                    }`}>
                      {text.type.toUpperCase()}
                    </span>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{text.category}</div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(text.status)}`}>
                    {text.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-blue-600">
                      <Eye className="h-4 w-4 mr-1" />
                      {text.views}
                    </div>
                    <div className="flex items-center text-green-600">
                      <Download className="h-4 w-4 mr-1" />
                      {text.downloads}
                    </div>
                    <div className="flex items-center text-purple-600">
                      <FileText className="h-4 w-4 mr-1" />
                      {text.articles}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(text.lastModified).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onAction(text.id, 'edit')}
                      className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onAction(text.id, 'view')}
                      className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-xl transition-all"
                      title="Aperçu"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onAction(text.id, 'download')}
                      className="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-xl transition-all"
                      title="Télécharger"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onAction(text.id, 'delete')}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl transition-all"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default TextManagement;