// src/components/Admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Shield, BarChart3, FileText, Users, Eye, Calendar, TrendingUp, 
  Plus, Edit, Trash2, Download, Upload, Search, Filter, Settings,
  AlertTriangle, CheckCircle, Clock, Globe, BookOpen, Gavel,
  UserCheck, Activity, Database, Server, Wifi, WifiOff
} from 'lucide-react';

const AdminDashboard = ({ darkMode, user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemStatus, setSystemStatus] = useState({
    database: 'online',
    api: 'online',
    search: 'online',
    backup: 'success'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    const loadDashboardData = async () => {
      setLoading(true);
      
      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalTexts: 2547,
        totalViews: 154320,
        activeUsers: 8921,
        monthlyUpdates: 23,
        newTextsThisMonth: 8,
        popularCategory: 'Droit civil',
        averageTimeOnSite: '4m 32s',
        searchQueries: 45120
      });

      setRecentActivity([
        {
          id: 1,
          type: 'text_added',
          title: 'Nouveau Code de l\'environnement ajouté',
          user: 'Admin Principal',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          status: 'success'
        },
        {
          id: 2,
          type: 'text_updated',
          title: 'Code du travail mis à jour',
          user: 'Marie Diop',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          status: 'success'
        },
        {
          id: 3,
          type: 'user_registered',
          title: 'Nouvel utilisateur inscrit',
          user: 'Système',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'info'
        },
        {
          id: 4,
          type: 'error',
          title: 'Tentative d\'accès non autorisé',
          user: 'Système de sécurité',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'warning'
        }
      ]);

      setLoading(false);
    };

    if (user && user.role === 'administrator') {
      loadDashboardData();
    }
  }, [user]);

  if (!user || user.role !== 'administrator') {
    return (
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-lg p-8 text-center`}>
        <Shield className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Accès Restreint</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Vous devez être administrateur pour accéder à cette section.
        </p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'texts', label: 'Gestion des textes', icon: FileText },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'analytics', label: 'Analytiques', icon: TrendingUp },
    { id: 'system', label: 'Système', icon: Settings }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 flex items-center ${
              change.startsWith('+') ? 'text-green-600' : change.startsWith('-') ? 'text-red-600' : 'text-gray-500'
            }`}>
              <TrendingUp className="h-4 w-4 mr-1" />
              {change} ce mois
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/20`}>
          <Icon className={`h-8 w-8 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'text_added': return <Plus className="h-4 w-4 text-green-600" />;
        case 'text_updated': return <Edit className="h-4 w-4 text-blue-600" />;
        case 'user_registered': return <UserCheck className="h-4 w-4 text-purple-600" />;
        case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
        default: return <Activity className="h-4 w-4 text-gray-600" />;
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
        case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
        case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
        default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      }
    };

    return (
      <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
        <div className="flex-shrink-0 mt-1">
          {getActivityIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{activity.title}</p>
          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Par {activity.user} • {new Date(activity.timestamp).toLocaleDateString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
          {activity.status}
        </span>
      </div>
    );
  };

  const SystemStatusIndicator = ({ service, status }) => {
    const getStatusInfo = (status) => {
      switch (status) {
        case 'online':
          return { color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20', icon: CheckCircle, label: 'En ligne' };
        case 'offline':
          return { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/20', icon: WifiOff, label: 'Hors ligne' };
        case 'maintenance':
          return { color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/20', icon: Clock, label: 'Maintenance' };
        case 'success':
          return { color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20', icon: CheckCircle, label: 'Succès' };
        default:
          return { color: 'text-gray-600', bg: 'bg-gray-100 dark:bg-gray-900/20', icon: AlertTriangle, label: 'Inconnu' };
      }
    };

    const statusInfo = getStatusInfo(status);
    const Icon = statusInfo.icon;

    return (
      <div className={`flex items-center justify-between p-3 rounded-lg ${statusInfo.bg}`}>
        <div className="flex items-center space-x-2">
          <Icon className={`h-4 w-4 ${statusInfo.color}`} />
          <span className="font-medium">{service}</span>
        </div>
        <span className={`text-sm ${statusInfo.color}`}>
          {statusInfo.label}
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
        <div className="animate-pulse">
          <div className="flex items-center mb-6">
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded mr-3"></div>
            <div className="h-6 w-48 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg border mt-8`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Tableau de bord administrateur</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Bienvenue, {user.name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau texte
          </button>
          
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Upload className="h-4 w-4 mr-2" />
            Importer
          </button>
        </div>
      </div>

      {/* Tableau des textes */}
      <div className="overflow-x-auto">
        <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Titre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Modifié
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Vues
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {texts
              .filter(text => text.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((text) => (
              <tr key={text.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium">{text.title}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Par {text.author}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    text.type === 'code' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                    text.type === 'loi' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                  }`}>
                    {text.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{text.category}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                    {text.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(text.lastModified).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 text-sm">{text.views}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(text.id)}
                      className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(text.id)}
                      className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      title="Télécharger"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Composant de gestion des utilisateurs
const UserManagement = ({ darkMode }) => {
  const [users] = useState([
    {
      id: 1,
      name: 'Amadou Diallo',
      email: 'amadou@example.com',
      role: 'citizen',
      status: 'active',
      lastLogin: '2024-01-20',
      joinDate: '2023-06-15'
    },
    {
      id: 2,
      name: 'Marie Diop',
      email: 'marie@juriste.sn',
      role: 'professional',
      status: 'active',
      lastLogin: '2024-01-19',
      joinDate: '2023-08-20'
    },
    {
      id: 3,
      name: 'Ousmane Fall',
      email: 'ousmane@student.com',
      role: 'student',
      status: 'inactive',
      lastLogin: '2024-01-10',
      joinDate: '2023-11-05'
    }
  ]);

  const getRoleLabel = (role) => {
    const labels = {
      'citizen': 'Citoyen',
      'professional': 'Professionnel',
      'student': 'Étudiant',
      'administrator': 'Administrateur'
    };
    return labels[role] || role;
  };

  const getRoleColor = (role) => {
    const colors = {
      'administrator': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
      'professional': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      'student': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      'citizen': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    };
    return colors[role] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestion des utilisateurs</h3>
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <UserCheck className="h-4 w-4 mr-2" />
          Inviter un administrateur
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Dernière connexion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Inscription
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {user.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {getRoleLabel(user.role)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  }`}>
                    {user.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(user.joinDate).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                      title="Suspendre"
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Composant Analytics
const Analytics = ({ darkMode, stats }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Analytiques détaillées</h3>
      
      {/* Graphiques simulés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
          <h4 className="font-semibold mb-4">Évolution des consultations</h4>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p>Graphique des consultations</p>
              <p className="text-sm">(Intégration Chart.js recommandée)</p>
            </div>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
          <h4 className="font-semibold mb-4">Répartition par catégorie</h4>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p>Graphique en secteurs</p>
              <p className="text-sm">(Intégration Chart.js recommandée)</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top des recherches */}
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
        <h4 className="font-semibold mb-4">Recherches populaires</h4>
        <div className="space-y-3">
          {[
            { term: 'Code de la famille', count: 1250 },
            { term: 'Droit du travail', count: 890 },
            { term: 'Procédure civile', count: 750 },
            { term: 'Code pénal', count: 680 },
            { term: 'Loi électorale', count: 520 }
          ].map((search, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm">{search.term}</span>
              <div className="flex items-center space-x-2">
                <div className={`w-32 h-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full`}>
                  <div 
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: `${(search.count / 1250) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium w-12 text-right">{search.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Composant System Settings
const SystemSettings = ({ darkMode, systemStatus }) => {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    autoBackup: true,
    emailNotifications: true,
    searchIndexing: true,
    cacheEnabled: true
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Paramètres système</h3>
      
      {/* État du système */}
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
        <h4 className="font-semibold mb-4">État des services</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-green-600" />
              <span>Base de données</span>
            </div>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Server className="h-4 w-4 text-green-600" />
              <span>Serveur API</span>
            </div>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-green-600" />
              <span>Moteur de recherche</span>
            </div>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Sécurité</span>
            </div>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
        </div>
      </div>
      
      {/* Paramètres */}
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
        <h4 className="font-semibold mb-4">Configuration</h4>
        <div className="space-y-4">
          {Object.entries(settings).map(([key, value]) => {
            const labels = {
              maintenanceMode: 'Mode maintenance',
              autoBackup: 'Sauvegarde automatique',
              emailNotifications: 'Notifications par email',
              searchIndexing: 'Indexation de recherche',
              cacheEnabled: 'Cache activé'
            };
            
            return (
              <div key={key} className="flex items-center justify-between">
                <span className="font-medium">{labels[key]}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleSettingChange(key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Actions système */}
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
        <h4 className="font-semibold mb-4">Actions système</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Database className="h-4 w-4 mr-2" />
            Sauvegarder maintenant
          </button>
          
          <button className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Search className="h-4 w-4 mr-2" />
            Réindexer recherche
          </button>
          
          <button className="flex items-center justify-center px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
            <Trash2 className="h-4 w-4 mr-2" />
            Vider le cache
          </button>
          
          <button className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Exporter données
          </button>
          
          <button className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <Settings className="h-4 w-4 mr-2" />
            Optimiser BDD
          </button>
          
          <button className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Logs système
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau texte
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation des onglets */}
        <div className="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-800 shadow-sm text-green-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="p-6">
        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Textes juridiques"
                value={stats.totalTexts.toLocaleString()}
                change="+8"
                icon={FileText}
                color="blue"
              />
              <StatCard
                title="Consultations"
                value={stats.totalViews.toLocaleString()}
                change="+12%"
                icon={Eye}
                color="green"
              />
              <StatCard
                title="Utilisateurs actifs"
                value={stats.activeUsers.toLocaleString()}
                change="+5%"
                icon={Users}
                color="purple"
              />
              <StatCard
                title="Mises à jour"
                value={stats.monthlyUpdates}
                change="+3"
                icon={Calendar}
                color="orange"
              />
            </div>

            {/* Graphiques et activité récente */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Activité récente */}
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-600" />
                  Activité récente
                </h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {recentActivity.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>

              {/* État du système */}
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Server className="h-5 w-5 mr-2 text-green-600" />
                  État du système
                </h3>
                <div className="space-y-3">
                  <SystemStatusIndicator service="Base de données" status={systemStatus.database} />
                  <SystemStatusIndicator service="API" status={systemStatus.api} />
                  <SystemStatusIndicator service="Recherche" status={systemStatus.search} />
                  <SystemStatusIndicator service="Sauvegarde" status={systemStatus.backup} />
                </div>
              </div>
            </div>

            {/* Métriques supplémentaires */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 text-center`}>
                <Globe className="h-8 w-8 mx-auto text-blue-600 mb-3" />
                <p className="text-2xl font-bold">{stats.searchQueries.toLocaleString()}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Recherches ce mois</p>
              </div>
              
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 text-center`}>
                <Clock className="h-8 w-8 mx-auto text-purple-600 mb-3" />
                <p className="text-2xl font-bold">{stats.averageTimeOnSite}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Temps moyen sur site</p>
              </div>
              
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6 text-center`}>
                <BookOpen className="h-8 w-8 mx-auto text-green-600 mb-3" />
                <p className="text-2xl font-bold">{stats.popularCategory}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Catégorie populaire</p>
              </div>
            </div>
          </div>
        )}

        {/* Gestion des textes */}
        {activeTab === 'texts' && (
          <TextManagement darkMode={darkMode} />
        )}

        {/* Gestion des utilisateurs */}
        {activeTab === 'users' && (
          <UserManagement darkMode={darkMode} />
        )}

        {/* Analytiques */}
        {activeTab === 'analytics' && (
          <Analytics darkMode={darkMode} stats={stats} />
        )}

        {/* Système */}
        {activeTab === 'system' && (
          <SystemSettings darkMode={darkMode} systemStatus={systemStatus} />
        )}
      </div>
    </div>
  );
};

// Composant de gestion des textes
const TextManagement = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [texts, setTexts] = useState([
    {
      id: 1,
      title: 'Code de la famille',
      type: 'code',
      category: 'Droit civil',
      status: 'En vigueur',
      lastModified: '2024-01-15',
      author: 'Admin Principal',
      views: 1250
    },
    {
      id: 2,
      title: 'Loi sur la protection des données',
      type: 'loi',
      category: 'Droit numérique',
      status: 'En vigueur',
      lastModified: '2024-01-10',
      author: 'Marie Diop',
      views: 890
    },
    // Plus de textes...
  ]);

  const handleEdit = (textId) => {
    console.log('Éditer le texte:', textId);
  };

  const handleDelete = (textId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce texte ?')) {
      setTexts(texts.filter(text => text.id !== textId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Actions et filtres */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un texte..."
              className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
              }`}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-3 py-2 border rounded-lg ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}
          >
            <option value="">Toutes les catégories</option>
            <option value="civil">Droit civil</option>
            <option value="penal">Droit pénal</option>
            <option value="travail">Droit du travail</option>
          </select>
          
          <button className="flex items-center px-4 py