// src/components/JournalOfficielSection.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Eye, Download, Star, Share2, ChevronRight, Clock, Bookmark } from "lucide-react";

const JournalOfficielSection = ({ journalData = [] }) => {
  const [favoriteDocuments, setFavoriteDocuments] = useState([]);

  // Données par défaut si aucune donnée n'est fournie
  const defaultJournalData = [
  {
    id: 1,
      date: "10 août 2024", 
      titre: "Loi n° 2024-15 sur la transformation numérique",
      type: "Loi",
      status: "Nouveau",
      downloads: 1250,
      views: 3420,
      description: "Nouvelle réglementation sur la digitalisation des services publics",
      urgent: false
    },
    { 
      id: 2,
      date: "08 août 2024", 
      titre: "Décret relatif à la protection de l'environnement",
      type: "Décret",
      status: "Mis à jour",
      downloads: 890,
      views: 2180,
      description: "Mesures renforcées pour la préservation de l'environnement",
      urgent: true
    },
    { 
      id: 3,
      date: "05 août 2024", 
      titre: "Arrêt Cour Suprême - Droit du travail",
      type: "Jurisprudence",
      status: "",
      downloads: 650,
      views: 1560,
      description: "Décision importante concernant les droits des travailleurs",
      urgent: false
    },
    {
      id: 4,
      date: "03 août 2024", 
      titre: "Ordonnance sur le commerce électronique",
      type: "Ordonnance",
      status: "Nouveau",
      downloads: 425,
      views: 980,
      description: "Réglementation du commerce en ligne au Sénégal",
      urgent: false
    },
    {
      id: 5,
      date: "01 août 2024", 
      titre: "Circulaire ministérielle - Fonction publique",
      type: "Circulaire",
      status: "",
      downloads: 320,
      views: 750,
      description: "Instructions relatives aux procédures administratives",
      urgent: false
    }
  ];

  const data = journalData.length > 0 ? journalData : defaultJournalData;

  const toggleFavorite = (docId) => {
    setFavoriteDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const getStatusBadge = (status, type, urgent = false) => {
    if (urgent) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">
          🚨 Urgent
        </span>
      );
    }
    if (status === "Nouveau") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ✨ Nouveau
        </span>
      );
    }
    if (status === "Mis à jour") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          🔄 Mis à jour
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        {type}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    const icons = {
      'Loi': '⚖️',
      'Décret': '📋',
      'Jurisprudence': '🏛️',
      'Ordonnance': '📜',
      'Circulaire': '📝'
    };
    return icons[type] || '📄';
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl mr-4">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-800">Journal Officiel</h2>
            <p className="text-gray-600">Publications officielles récentes</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>Mis à jour il y a 2h</span>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Liste des documents */}
      <div className="space-y-4">
        {data.map((item) => (
          <div 
            key={item.id} 
            className="group p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:border-green-300 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-25 hover:to-white"
          >
            <div className="flex items-start justify-between">
              {/* Contenu principal */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">{getTypeIcon(item.type)}</span>
                  <span className="text-sm text-gray-500 font-medium">{item.date}</span>
                  {getStatusBadge(item.status, item.type, item.urgent)}
                </div>
                
                <Link 
                  to={`/journal-officiel/${item.id}`}
                  className="block group-hover:text-green-700 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {item.titre}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </Link>

                {/* Statistiques */}
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center hover:text-green-600 transition-colors">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{formatNumber(item.views)} vues</span>
                  </div>
                  <div className="flex items-center hover:text-green-600 transition-colors">
                    <Download className="h-4 w-4 mr-1" />
                    <span>{formatNumber(item.downloads)} téléchargements</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-green-600 font-medium">{item.type}</span>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2 ml-6">
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    favoriteDocuments.includes(item.id) 
                      ? 'text-yellow-500 bg-yellow-50 scale-110' 
                      : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 hover:scale-110'
                  }`}
                  title="Ajouter aux favoris"
                >
                  <Star 
                    className="h-4 w-4" 
                    fill={favoriteDocuments.includes(item.id) ? "currentColor" : "none"} 
                  />
                </button>
                
                <button 
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 hover:scale-110"
                  title="Ajouter aux signets"
                >
                  <Bookmark className="h-4 w-4" />
                </button>
                
                <button 
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                  title="Partager"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                
                <Link
                  to={`/journal-officiel/${item.id}`}
                  className="flex items-center justify-center w-10 h-10 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200 group-hover:translate-x-1"
                  title="Voir le détail"
                >
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer avec lien vers toutes les publications */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <Link 
          to="/journal-officiel" 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 hover:shadow-lg group"
        >
          <FileText className="h-5 w-5 mr-2" />
          Voir tout le Journal Officiel
          <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-500">
          <span>📊 {data.length} publications récentes</span>
          <span>🔔 Notifications activées</span>
          <span>⚡ Mise à jour automatique</span>
        </div>
      </div>
    </div>
  );
};

export default JournalOfficielSection; 
      
