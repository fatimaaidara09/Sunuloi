import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellRing,
  Settings,
  Filter,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Mail,
  Smartphone,
  Globe,
  FileText,
  Scale,
  Gavel,
  TrendingUp,
  Users,
  Star,
  Trash2,
  Archive,
  MoreVertical,
  Plus,
  Search,
  ChevronDown,
  ChevronRight,
  Zap,
  Shield,
  BookOpen
} from 'lucide-react';

const Notification = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [alertPreferences, setAlertPreferences] = useState({
    newLaws: true,
    jurisprudence: true,
    decrets: false,
    constitution: true,
    emailNotifs: true,
    pushNotifs: true,
    smsNotifs: false,
    soundEnabled: true
  });
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Données de notifications simulées
  const mockNotifications = [
    {
      id: 1,
      type: 'law',
      title: 'Nouvelle Loi sur la Transformation Numérique',
      description: 'La loi n° 2024-15 sur la digitalisation des services publics a été promulguée',
      timestamp: new Date().toISOString(),
      priority: 'high',
      category: 'Législation',
      read: false,
      source: 'Journal Officiel',
      tags: ['numérique', 'services publics', 'transformation'],
      url: '/lois/2024-15'
    },
    {
      id: 2,
      type: 'jurisprudence',
      title: 'Arrêt Important - Droit du Travail',
      description: 'La Cour Suprême vient de rendre une décision sur les droits des travailleurs',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      priority: 'medium',
      category: 'Jurisprudence',
      read: true,
      source: 'Cour Suprême',
      tags: ['travail', 'droits sociaux'],
      url: '/jurisprudence/cs-2024-089'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Mise à jour du Code de l\'Environnement',
      description: 'Nouvelles dispositions sur la protection de la biodiversité',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      priority: 'urgent',
      category: 'Code',
      read: false,
      source: 'Ministère de l\'Environnement',
      tags: ['environnement', 'biodiversité'],
      url: '/codes/environnement'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Échéance Procédure - Dossier #2024-156',
      description: 'Date limite de dépôt des conclusions dans 3 jours',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      priority: 'high',
      category: 'Personnel',
      read: false,
      source: 'SunuLoi Assistant',
      tags: ['échéance', 'procédure'],
      url: '/dashboard/dossiers/2024-156'
    },
    {
      id: 5,
      type: 'update',
      title: 'Tendance Juridique Détectée',
      description: 'Augmentation de 25% des recherches sur l\'IA et le droit',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      priority: 'low',
      category: 'Analyse',
      read: true,
      source: 'SunuLoi Analytics',
      tags: ['IA', 'tendances', 'statistiques'],
      url: '/analytics/trends'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'law': return <FileText className="h-5 w-5" />;
      case 'jurisprudence': return <Scale className="h-5 w-5" />;
      case 'alert': return <AlertTriangle className="h-5 w-5" />;
      case 'reminder': return <Clock className="h-5 w-5" />;
      case 'update': return <TrendingUp className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300';
      case 'high': return 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300';
      case 'medium': return 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300';
      default: return 'bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filterType !== 'all' && notif.type !== filterType) return false;
    if (activeTab === 'unread' && notif.read) return false;
    if (searchTerm && !notif.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-yellow-500 rounded-xl">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications & Alertes</h1>
                <p className="text-gray-600 dark:text-gray-400">Restez informé des dernières actualités juridiques</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {unreadCount} non lues
                </div>
              )}
              <button 
                onClick={markAllAsRead}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Tout marquer comme lu
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Paramètres et filtres */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Créer une nouvelle alerte */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg flex items-center justify-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Nouvelle Alerte</span>
              </button>
            </div>

            {/* Filtres */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filtres</h3>
              
              <div className="space-y-3">
                {[
                  { id: 'all', label: 'Toutes', count: notifications.length },
                  { id: 'law', label: 'Lois', count: notifications.filter(n => n.type === 'law').length },
                  { id: 'jurisprudence', label: 'Jurisprudence', count: notifications.filter(n => n.type === 'jurisprudence').length },
                  { id: 'alert', label: 'Alertes', count: notifications.filter(n => n.type === 'alert').length },
                  { id: 'reminder', label: 'Rappels', count: notifications.filter(n => n.type === 'reminder').length }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setFilterType(filter.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      filterType === filter.id 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Préférences rapides */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Préférences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Email</span>
                  </div>
                  <button 
                    onClick={() => setAlertPreferences(prev => ({ ...prev, emailNotifs: !prev.emailNotifs }))}
                    className={`w-10 h-6 rounded-full transition-colors ${alertPreferences.emailNotifs ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${alertPreferences.emailNotifs ? 'translate-x-5' : 'translate-x-1'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Push</span>
                  </div>
                  <button 
                    onClick={() => setAlertPreferences(prev => ({ ...prev, pushNotifs: !prev.pushNotifs }))}
                    className={`w-10 h-6 rounded-full transition-colors ${alertPreferences.pushNotifs ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${alertPreferences.pushNotifs ? 'translate-x-5' : 'translate-x-1'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Son</span>
                  </div>
                  <button 
                    onClick={() => setAlertPreferences(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
                    className={`w-10 h-6 rounded-full transition-colors ${alertPreferences.soundEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${alertPreferences.soundEnabled ? 'translate-x-5' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg font-medium transition-colors">
                Paramètres avancés
              </button>
            </div>
          </div>

          {/* Zone principale des notifications */}
          <div className="lg:col-span-3">
            
            {/* Barre de recherche et onglets */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher dans les notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {[
                  { id: 'all', label: 'Toutes' },
                  { id: 'unread', label: 'Non lues' },
                  { id: 'read', label: 'Lues' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-gray-600 text-green-700 dark:text-green-300 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Liste des notifications */}
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
                  <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Aucune notification</h3>
                  <p className="text-gray-600 dark:text-gray-400">Vous êtes à jour avec toutes vos notifications</p>
                </div>
              ) : (
                filteredNotifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border transition-all hover:shadow-xl ${
                      notification.read 
                        ? 'border-gray-200 dark:border-gray-700' 
                        : 'border-green-300 dark:border-green-600 bg-green-50/30 dark:bg-green-900/10'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className={`p-2 rounded-lg ${getPriorityColor(notification.priority)}`}>
                            {getTypeIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className={`text-lg font-semibold ${
                                notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'
                              }`}>
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              )}
                              <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-3">
                              {notification.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{new Date(notification.timestamp).toLocaleString('fr-FR')}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Globe className="h-4 w-4" />
                                <span>{notification.source}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                              title="Marquer comme lu"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {notification.tags && notification.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {notification.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Catégorie: {notification.category}
                        </span>
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                          <span>Voir détails</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {filteredNotifications.length > 10 && (
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Précédent
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Suivant
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;