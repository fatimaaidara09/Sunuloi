import React, { useState, useEffect } from 'react';
import { 
  BarChart3, LineChart, PieChart, TrendingUp, Eye, Download, Search,
  Clock, Users, FileText, MapPin, Calendar, Filter, RefreshCw,
  Zap, Target, AlertTriangle, CheckCircle, Star, Award, Globe
} from 'lucide-react';

const Analytics = ({ stats }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('views');
  const [loading, setLoading] = useState(false);

  // Données simulées pour les graphiques
  const analyticsData = {
    views: {
      daily: [
        { date: '01/01', value: 1200 },
        { date: '02/01', value: 1450 },
        { date: '03/01', value: 1100 },
        { date: '04/01', value: 1800 },
        { date: '05/01', value: 1650 },
        { date: '06/01', value: 2100 },
        { date: '07/01', value: 1950 }
      ],
      total: 154320,
      growth: '+15.3%'
    },
    downloads: {
      daily: [
        { date: '01/01', value: 450 },
        { date: '02/01', value: 520 },
        { date: '03/01', value: 380 },
        { date: '04/01', value: 720 },
        { date: '05/01', value: 650 },
        { date: '06/01', value: 850 },
        { date: '07/01', value: 780 }
      ],
      total: 89345,
      growth: '+25.1%'
    },
    searches: {
      daily: [
        { date: '01/01', value: 320 },
        { date: '02/01', value: 410 },
        { date: '03/01', value: 280 },
        { date: '04/01', value: 580 },
        { date: '05/01', value: 490 },
        { date: '06/01', value: 640 },
        { date: '07/01', value: 570 }
      ],
      total: 45120,
      growth: '+18.7%'
    }
  };

  // Données des régions du Sénégal
  const regionalData = [
    { region: 'Dakar', users: 3240, growth: '+18%', topLaw: 'Code de la famille', percentage: 45 },
    { region: 'Thiès', users: 1890, growth: '+12%', topLaw: 'Droit du travail', percentage: 26 },
    { region: 'Saint-Louis', users: 1120, growth: '+15%', topLaw: 'Code rural', percentage: 16 },
    { region: 'Kaolack', users: 890, growth: '+8%', topLaw: 'Droit commercial', percentage: 13 }
  ];

  // Top recherches
  const topSearches = [
    { term: 'Code de la famille', count: 2340, trend: '+15%', category: 'Droit civil' },
    { term: 'Droit du travail', count: 1890, trend: '+8%', category: 'Droit social' },
    { term: 'Procédure civile', count: 1567, trend: '+12%', category: 'Procédure' },
    { term: 'Code pénal', count: 1234, trend: '+5%', category: 'Droit pénal' },
    { term: 'Loi électorale', count: 987, trend: '+22%', category: 'Droit public' },
    { term: 'Droit commercial', count: 876, trend: '+7%', category: 'Droit des affaires' },
    { term: 'Code rural', count: 654, trend: '+18%', category: 'Droit rural' },
    { term: 'Droit environnemental', count: 543, trend: '+25%', category: 'Environnement' }
  ];

  // Données des catégories juridiques
  const categoryData = [
    { name: 'Droit civil', value: 35, downloads: 12450, color: '#10B981', users: 4200 },
    { name: 'Droit pénal', value: 25, downloads: 8900, color: '#EF4444', users: 3100 },
    { name: 'Droit du travail', value: 20, downloads: 7650, color: '#3B82F6', users: 2800 },
    { name: 'Droit commercial', value: 15, downloads: 5400, color: '#F59E0B', users: 2100 },
    { name: 'Autres', value: 5, downloads: 1800, color: '#8B5CF6', users: 900 }
  ];

  // Activité par heure
  const hourlyActivity = [
    { time: '00h-02h', active: 120, percentage: 8 },
    { time: '02h-04h', active: 80, percentage: 5 },
    { time: '04h-06h', active: 200, percentage: 13 },
    { time: '06h-08h', active: 450, percentage: 30 },
    { time: '08h-10h', active: 780, percentage: 52 },
    { time: '10h-12h', active: 1250, percentage: 83 },
    { time: '12h-14h', active: 980, percentage: 65 },
    { time: '14h-16h', active: 1100, percentage: 73 },
    { time: '16h-18h', active: 1560, percentage: 100 },
    { time: '18h-20h', active: 920, percentage: 59 },
    { time: '20h-22h', active: 670, percentage: 43 },
    { time: '22h-24h', active: 340, percentage: 22 }
  ];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-8">
      {/* En-tête avec contrôles */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-900/20 dark:to-blue-900/20 rounded-3xl p-8 border border-purple-200/50 dark:border-purple-700/50">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Analytiques Avancées
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Insights détaillés sur l'usage de la plateforme SunuLoi
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="90d">3 derniers mois</option>
              <option value="1y">1 an</option>
            </select>
            
            <button 
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
          </div>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalyticsCard
            title="Pages vues"
            value="154,320"
            change="+15.3%"
            icon={Eye}
            color="from-blue-500 to-blue-600"
            subtitle="Ce mois-ci"
          />
          <AnalyticsCard
            title="Téléchargements"
            value="89,345"
            change="+25.1%"
            icon={Download}
            color="from-green-500 to-green-600"
            subtitle="Documents téléchargés"
          />
          <AnalyticsCard
            title="Recherches"
            value="45,120"
            change="+18.7%"
            icon={Search}
            color="from-purple-500 to-purple-600"
            subtitle="Requêtes effectuées"
          />
          <AnalyticsCard
            title="Temps moyen"
            value="4m 32s"
            change="+8.2%"
            icon={Clock}
            color="from-yellow-500 to-yellow-600"
            subtitle="Session utilisateur"
          />
        </div>
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Évolution temporelle */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Évolution des métriques</h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="views">Vues</option>
              <option value="downloads">Téléchargements</option>
              <option value="searches">Recherches</option>
            </select>
          </div>
          
          {/* Graphique simulé */}
          <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-900/10 dark:to-blue-900/10">
            <div className="text-center">
              <LineChart className="h-16 w-16 mx-auto mb-4 text-purple-400" />
              <p className="text-gray-600 dark:text-gray-400 font-medium">Graphique {selectedMetric}</p>
              <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
                <span className="text-purple-600 font-semibold">
                  Total: {analyticsData[selectedMetric]?.total.toLocaleString()}
                </span>
                <span className="text-green-600 font-semibold">
                  {analyticsData[selectedMetric]?.growth}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Répartition par catégorie */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Répartition par catégorie juridique</h3>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-20">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${category.value}%`,
                          backgroundColor: category.color 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-8">
                      {category.value}%
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {category.downloads.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {category.users} utilisateurs
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analyses régionales et recherches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Aperçu régional Sénégal */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <MapPin className="h-6 w-6 mr-2 text-green-600" />
            Analyses par région - Sénégal
          </h3>
          <div className="space-y-4">
            {regionalData.map((region, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-green-50/50 to-yellow-50/50 dark:from-green-900/10 dark:to-yellow-900/10 rounded-2xl border border-green-200/30 hover:border-green-300/50 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{region.region}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{region.topLaw}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-gray-900 dark:text-white">
                      {region.users.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      {region.growth}
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full transition-all duration-700"
                    style={{ width: `${region.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top recherches */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-purple-600" />
            Recherches populaires
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {topSearches.map((search, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 rounded-xl transition-all">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-xs font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {search.term}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {search.category}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-right">
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {search.count.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      {search.trend}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activité temporelle et insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activité par heure */}
        <div className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Clock className="h-6 w-6 mr-2 text-blue-600" />
            Activité par tranche horaire
          </h3>
          <div className="space-y-4">
            {hourlyActivity.map((period, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-20">
                  {period.time}
                </span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                  <div 
                    className="h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                    style={{ width: `${period.percentage}%` }}
                  >
                    {period.percentage > 20 && (
                      <span className="text-xs font-bold text-white">
                        {period.active}
                      </span>
                    )}
                  </div>
                  {period.percentage <= 20 && (
                    <span className="absolute left-2 top-0 h-4 flex items-center text-xs font-medium text-gray-600 dark:text-gray-400">
                      {period.active}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 w-12 text-right">
                  {period.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights et recommandations */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Zap className="h-6 w-6 mr-2 text-yellow-600" />
            Insights IA
          </h3>
          
          <div className="space-y-4">
            <InsightCard
              type="success"
              title="Croissance exceptionnelle"
              message="Le trafic a augmenté de 25% ce mois grâce aux nouveaux contenus juridiques."
              icon={TrendingUp}
            />
            
            <InsightCard
              type="info"
              title="Pic d'activité"
              message="Les consultations sont maximales entre 16h-18h. Optimisez vos publications."
              icon={Clock}
            />
            
            <InsightCard
              type="warning"
              title="Opportunité régionale"
              message="Saint-Louis montre une forte croissance (+15%). Considérez du contenu local."
              icon={Target}
            />
            
            <InsightCard
              type="success"
              title="Engagement élevé"
              message="Le droit environnemental génère +25% d'engagement. Tendance émergente."
              icon={Award}
            />
          </div>
        </div>
      </div>

      {/* Performance comparée */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 dark:from-green-900/20 dark:to-blue-900/20 rounded-3xl p-8 border border-green-200/50 dark:border-green-700/50">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
          <BarChart3 className="h-7 w-7 mr-3 text-green-600" />
          Performance comparative - République du Sénégal
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ComparisonCard
            title="Croissance utilisateurs"
            current="15.2%"
            previous="12.8%"
            isPositive={true}
            subtitle="vs mois précédent"
          />
          <ComparisonCard
            title="Taux d'engagement"
            current="78.5%"
            previous="74.2%"
            isPositive={true}
            subtitle="Interaction moyenne"
          />
          <ComparisonCard
            title="Temps de session"
            current="4m 32s"
            previous="4m 18s"
            isPositive={true}
            subtitle="Durée moyenne"
          />
          <ComparisonCard
            title="Téléchargements/Visite"
            current="2.8"
            previous="2.5"
            isPositive={true}
            subtitle="Ratio conversion"
          />
        </div>
      </div>
    </div>
  );
};

// Composant pour les cartes d'analytiques
const AnalyticsCard = ({ title, value, change, icon: Icon, color, subtitle }) => (
  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-4 rounded-2xl bg-gradient-to-r ${color} shadow-lg`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
        <TrendingUp className="h-4 w-4 mr-1" />
        {change}
      </div>
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</h3>
      <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
    </div>
  </div>
);

// Composant pour les insights
const InsightCard = ({ type, title, message, icon: Icon }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300';
      default:
        return 'bg-gray-50 dark:bg-gray-900/10 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-300';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`p-4 rounded-2xl border ${getTypeStyles()}`}>
      <div className="flex items-center mb-2">
        <Icon className={`h-5 w-5 mr-2 ${getIconColor()}`} />
        <span className="font-semibold text-sm">{title}</span>
      </div>
      <p className="text-sm opacity-90">{message}</p>
    </div>
  );
};

// Composant pour les comparaisons
const ComparisonCard = ({ title, current, previous, isPositive, subtitle }) => (
  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105">
    <h4 className="font-medium text-gray-600 dark:text-gray-400 text-sm mb-2">{title}</h4>
    <div className="flex items-center justify-between mb-2">
      <span className="text-3xl font-bold text-gray-900 dark:text-white">{current}</span>
      <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        isPositive 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
      }`}>
        <TrendingUp className={`h-3 w-3 mr-1 ${isPositive ? '' : 'rotate-180'}`} />
        {isPositive ? '+' : '-'}{Math.abs(parseFloat(current) - parseFloat(previous)).toFixed(1)}%
      </div>
    </div>
    <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
    <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
      Précédent: {previous}
    </div>
  </div>
);

export default Analytics;