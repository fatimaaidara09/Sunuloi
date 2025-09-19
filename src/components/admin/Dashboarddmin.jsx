import React, { useState, useEffect } from 'react';
import { 
  Shield, BarChart3, FileText, Users, Eye, Calendar, TrendingUp, 
  Plus, Edit, Trash2, Download, Upload, Search, Filter, Settings,
  AlertTriangle, CheckCircle, Clock, Globe, BookOpen, Gavel,
  UserCheck, Activity, Database, Server, Wifi, WifiOff, Bell,
  ChevronDown, ChevronRight, Star, Award, Zap, Target, Heart,
  MessageSquare, Share2, Flag, Lock, Unlock, RefreshCw, Save,
  MoreHorizontal, ExternalLink, Copy, Archive, Bookmark, Tag,
  PieChart, LineChart, BarChart, MapPin, Phone, Mail
} from 'lucide-react';

// Composant principal du dashboard
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Simulation du chargement des données
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStats({
        totalTexts: 2547,
        totalViews: 154320,
        activeUsers: 8921,
        monthlyUpdates: 23,
        newTextsThisMonth: 8,
        popularCategory: 'Droit civil',
        averageTimeOnSite: '4m 32s',
        searchQueries: 45120,
        pendingApprovals: 12,
        totalDownloads: 89345,
        userGrowth: 15.2,
        engagementRate: 78.5
      });
      
      setLoading(false);
    };

    loadDashboardData();
  }, []);

  // Configuration des onglets de navigation
  const navigationTabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3, color: 'from-green-500 to-yellow-500' },
    { id: 'texts', label: 'Gestion des textes', icon: FileText, color: 'from-blue-500 to-indigo-500' },
    { id: 'users', label: 'Utilisateurs', icon: Users, color: 'from-purple-500 to-pink-500' },
    { id: 'analytics', label: 'Analytiques', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
    { id: 'system', label: 'Système', icon: Settings, color: 'from-gray-500 to-gray-600' },
    { id: 'moderation', label: 'Modération', icon: Flag, color: 'from-red-500 to-pink-500' }
  ];

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* En-tête moderne */}
      <Header />
      
      <div className="flex">
        {/* Sidebar révolutionnaire */}
        <Sidebar 
          navigationTabs={navigationTabs} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        {/* Contenu principal */}
        <MainContent 
          activeTab={activeTab} 
          stats={stats}
          sidebarCollapsed={sidebarCollapsed}
        />
      </div>
    </div>
  );
};

// Composant d'écran de chargement modernisé
const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
    <div className="text-center">
      <div className="relative">
        <div className="w-32 h-32 border-8 border-green-200 rounded-full animate-spin border-t-green-600 dark:border-green-800 dark:border-t-green-400"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className="h-12 w-12 text-green-600 animate-pulse" />
        </div>
      </div>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent mt-6">
        SunuLoi Admin
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">Chargement du tableau de bord...</p>
    </div>
  </div>
);

// En-tête révolutionnaire
const Header = () => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
    <div className="max-w-full mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-green-600 p-3 rounded-2xl shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-yellow-600 to-green-700 bg-clip-text text-transparent">
              SunuLoi Admin
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Dashboard Révolutionnaire • Système Juridique Sénégalais
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <NotificationBell />
          <AdminProfile />
        </div>
      </div>
    </div>
  </div>
);

// Composant de notifications intelligent
const NotificationBell = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Nouveau code de la famille publié', time: '2 min' },
    { id: 2, type: 'warning', message: '5 utilisateurs en attente de validation', time: '10 min' },
    { id: 3, type: 'info', message: 'Sauvegarde automatique réussie', time: '1h' }
  ]);
  
  return (
    <div className="relative group">
      <button className="relative p-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105">
        <Bell className="h-6 w-6" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-bounce">
            {notifications.length}
          </span>
        )}
      </button>
    </div>
  );
};

// Profil administrateur
const AdminProfile = () => (
  <div className="flex items-center space-x-3">
    <div className="hidden md:block text-right">
      <p className="text-sm font-medium text-gray-900 dark:text-white">Admin Principal</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">Administrateur Système</p>
    </div>
    <div className="h-12 w-12 bg-gradient-to-r from-green-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
      AP
    </div>
  </div>
);

// Sidebar moderne et responsive
const Sidebar = ({ navigationTabs, activeTab, setActiveTab, collapsed, setCollapsed }) => (
  <div className={`${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-r border-gray-200/50 dark:border-gray-700/50 shadow-xl sticky top-[88px] h-[calc(100vh-88px)]`}>
    <div className="p-4">
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-center p-2 mb-6 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
      >
        <ChevronRight className={`h-5 w-5 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
      </button>
      
      <nav className="space-y-2">
        {navigationTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                isActive
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'} ${isActive ? 'animate-pulse' : 'group-hover:scale-110'} transition-all`} />
              {!collapsed && (
                <span className="truncate">{tab.label}</span>
              )}
            </button>
          );
        })}
      </nav>
      
      {!collapsed && (
        <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20 rounded-2xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Conseil du jour</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Pensez à sauvegarder régulièrement vos modifications pour éviter toute perte de données.
          </p>
        </div>
      )}
    </div>
  </div>
);

// Contenu principal avec rendu conditionnel
const MainContent = ({ activeTab, stats, sidebarCollapsed }) => (
  <div className={`flex-1 p-6 transition-all duration-300`}>
    <div className="max-w-7xl mx-auto">
      {activeTab === 'overview' && <OverviewDashboard stats={stats} />}
      {activeTab === 'texts' && <TextManagement />}
      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'analytics' && <AnalyticsDashboard stats={stats} />}
      {activeTab === 'system' && <SystemSettings />}
      {activeTab === 'moderation' && <ContentModeration />}
    </div>
  </div>
);

// Dashboard vue d'ensemble amélioré
const OverviewDashboard = ({ stats }) => (
  <div className="space-y-8">
    {/* Métriques principales avec animations */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Textes juridiques"
        value={stats.totalTexts.toLocaleString()}
        change="+8.2%"
        icon={FileText}
        gradient="from-green-400 to-green-600"
        description="Total des textes publiés"
      />
      <MetricCard
        title="Consultations"
        value={stats.totalViews.toLocaleString()}
        change="+15.3%"
        icon={Eye}
        gradient="from-blue-400 to-blue-600"
        description="Vues ce mois-ci"
      />
      <MetricCard
        title="Utilisateurs actifs"
        value={stats.activeUsers.toLocaleString()}
        change="+12.1%"
        icon={Users}
        gradient="from-purple-400 to-purple-600"
        description="Utilisateurs connectés"
      />
      <MetricCard
        title="Taux d'engagement"
        value={`${stats.engagementRate}%`}
        change="+3.2%"
        icon={Heart}
        gradient="from-yellow-400 to-yellow-600"
        description="Interaction utilisateurs"
      />
    </div>

    {/* Widgets modernes */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <ActivityFeed />
      </div>
      <div className="space-y-6">
        <QuickActions />
        <SystemStatus />
      </div>
    </div>
    
    {/* Insights régionaux Sénégal */}
    <SenegalRegionalInsights />
  </div>
);

// Composant de métrique avec animations
const MetricCard = ({ title, value, change, icon: Icon, gradient, description }) => (
  <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-4 rounded-2xl bg-gradient-to-r ${gradient} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
        <TrendingUp className="h-4 w-4 mr-1" />
        {change}
      </div>
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</h3>
      <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-yellow-600 group-hover:bg-clip-text transition-all duration-300">
        {value}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

// Feed d'activité moderne
const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'text_added',
      title: 'Nouveau Code de l\'environnement 2024',
      user: 'Admin Principal',
      time: '2h',
      icon: Plus,
      color: 'text-green-600 bg-green-100 dark:bg-green-900/20'
    },
    {
      id: 2,
      type: 'user_joined',
      title: '15 nouveaux juristes inscrits',
      user: 'Système',
      time: '4h',
      icon: UserCheck,
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
    },
    {
      id: 3,
      type: 'text_updated',
      title: 'Code du travail mis à jour',
      user: 'Marie Diop',
      time: '6h',
      icon: Edit,
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20'
    }
  ];

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Activity className="h-6 w-6 mr-2 text-green-600" />
          Activité récente
        </h3>
        <button className="text-sm text-green-600 hover:text-green-700 font-medium hover:underline">
          Voir tout
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const IconComponent = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 rounded-2xl transition-all duration-300">
              <div className={`p-2 rounded-xl ${activity.color}`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{activity.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Par {activity.user} • il y a {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Actions rapides modernisées
const QuickActions = () => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Actions rapides</h3>
    <div className="grid grid-cols-2 gap-3">
      {[
        { icon: Plus, label: 'Ajouter', color: 'from-green-500 to-green-600' },
        { icon: Upload, label: 'Importer', color: 'from-blue-500 to-blue-600' },
        { icon: BarChart3, label: 'Rapport', color: 'from-purple-500 to-purple-600' },
        { icon: Settings, label: 'Config', color: 'from-yellow-500 to-yellow-600' }
      ].map((action, index) => (
        <button key={index} className={`p-4 bg-gradient-to-r ${action.color} text-white rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 group`}>
          <action.icon className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">{action.label}</span>
        </button>
      ))}
    </div>
  </div>
);

// État système avec indicateurs visuels
const SystemStatus = () => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
      <Server className="h-5 w-5 mr-2 text-green-600" />
      État du système
    </h3>
    <div className="space-y-3">
      {[
        { name: 'Base de données', status: 'online' },
        { name: 'API Server', status: 'online' },
        { name: 'Cache Redis', status: 'online' },
        { name: 'Search Engine', status: 'maintenance' }
      ].map((service, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-green-50/50 dark:bg-green-900/10 rounded-2xl">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${service.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{service.name}</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${service.status === 'online' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'}`}>
            {service.status === 'online' ? 'En ligne' : 'Maintenance'}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Insights régionaux spécifiques au Sénégal
const SenegalRegionalInsights = () => (
  <div className="bg-gradient-to-r from-green-500/10 to-yellow-500/10 dark:from-green-900/20 dark:to-yellow-900/20 rounded-3xl p-8 border border-green-200/50 dark:border-green-700/50">
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
      <MapPin className="h-7 w-7 mr-3 text-green-600" />
      Aperçu Régional - République du Sénégal
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { region: 'Dakar', users: '3,240', growth: '+18%', topLaw: 'Code de la famille' },
        { region: 'Thiès', users: '1,890', growth: '+12%', topLaw: 'Droit du travail' },
        { region: 'Saint-Louis', users: '1,120', growth: '+15%', topLaw: 'Code rural' },
        { region: 'Kaolack', users: '890', growth: '+8%', topLaw: 'Droit commercial' }
      ].map((data, index) => (
        <div key={index} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{data.region}</h4>
            <span className="text-green-600 font-semibold text-sm">{data.growth}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{data.users}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">utilisateurs actifs</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Plus consulté: {data.topLaw}</p>
        </div>
      ))}
    </div>
  </div>
);

// Gestion des textes simplifiée
const TextManagement = () => (
  <div className="space-y-6">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Gestion des Textes Juridiques</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Interface révolutionnaire pour gérer tous les textes de SunuLoi</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white">
          <FileText className="h-8 w-8 mb-4" />
          <h3 className="text-xl font-bold mb-2">2,547</h3>
          <p className="text-green-100">Textes publiés</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
          <Clock className="h-8 w-8 mb-4" />
          <h3 className="text-xl font-bold mb-2">12</h3>
          <p className="text-blue-100">En attente</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-2xl text-white">
          <TrendingUp className="h-8 w-8 mb-4" />
          <h3 className="text-xl font-bold mb-2">+23</h3>
          <p className="text-purple-100">Ce mois</p>
        </div>
      </div>

      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Module de gestion avancée
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Interface complète pour la gestion des textes juridiques sénégalais
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all">
            Accéder au module complet
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Gestion des utilisateurs simplifiée
const UserManagement = () => (
  <div className="space-y-6">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Gestion des Utilisateurs</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Administrez la communauté SunuLoi avec des outils avancés</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white text-center">
          <Users className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">8,921</h3>
          <p className="text-blue-100">Utilisateurs actifs</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white text-center">
          <UserCheck className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">7,234</h3>
          <p className="text-green-100">Vérifiés</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-2xl text-white text-center">
          <Award className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">1,456</h3>
          <p className="text-purple-100">Professionnels</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-2xl text-white text-center">
          <Clock className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">234</h3>
          <p className="text-yellow-100">En attente</p>
        </div>
      </div>

      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Module de gestion des utilisateurs
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Outils avancés pour administrer la communauté juridique sénégalaise
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all">
            Accéder au module complet
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Analytiques simplifiées
const AnalyticsDashboard = ({ stats }) => (
  <div className="space-y-6">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Analytiques Avancées</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Insights détaillés sur l'usage de la plateforme</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-2xl text-white text-center">
          <BarChart3 className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">154,320</h3>
          <p className="text-purple-100">Pages vues</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white text-center">
          <Download className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">89,345</h3>
          <p className="text-green-100">Téléchargements</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white text-center">
          <Search className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">45,120</h3>
          <p className="text-blue-100">Recherches</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-2xl text-white text-center">
          <Clock className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">4m 32s</h3>
          <p className="text-yellow-100">Temps moyen</p>
        </div>
      </div>

      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Module d'analytiques avancées
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Analyses détaillées avec insights régionaux du Sénégal
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all">
            Accéder aux analyses complètes
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Paramètres système simplifiés
const SystemSettings = () => (
  <div className="space-y-6">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Administration Système</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Configuration et maintenance de la plateforme</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white text-center">
          <Server className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">99.9%</h3>
          <p className="text-green-100">Uptime</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white text-center">
          <Database className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">1.2GB</h3>
          <p className="text-blue-100">Dernière sauvegarde</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-2xl text-white text-center">
          <Shield className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">Sécurisé</h3>
          <p className="text-yellow-100">État sécurité</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-2xl text-white text-center">
          <Activity className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">45%</h3>
          <p className="text-purple-100">Utilisation CPU</p>
        </div>
      </div>

      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Configuration système avancée
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Outils complets d'administration et de maintenance
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all">
            Accéder aux paramètres
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Modération de contenu simplifiée
const ContentModeration = () => (
  <div className="space-y-6">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Modération de Contenu</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Gérez et modérez le contenu de la communauté</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-2xl text-white text-center">
          <Clock className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">12</h3>
          <p className="text-yellow-100">En attente</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white text-center">
          <CheckCircle className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">234</h3>
          <p className="text-green-100">Approuvés</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-2xl text-white text-center">
          <AlertTriangle className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">3</h3>
          <p className="text-red-100">Rejetés</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white text-center">
          <Flag className="h-8 w-8 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">8</h3>
          <p className="text-blue-100">Signalements</p>
        </div>
      </div>

      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <Flag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Module de modération avancée
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Outils complets pour modérer et valider le contenu juridique
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all">
            Accéder à la modération
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;