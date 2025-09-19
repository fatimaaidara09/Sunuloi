import React, { useState } from 'react';
import { 
  Settings, Server, Database, Shield, RefreshCw, Save, Download, Upload,
  AlertTriangle, CheckCircle, Clock, Activity, Zap, Bell, Lock, Unlock,
  Globe, Wifi, WifiOff, HardDrive, Cpu, MemoryStick, Monitor
} from 'lucide-react';

const SystemSettings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    autoBackup: true,
    emailNotifications: true,
    searchIndexing: true,
    cacheEnabled: true,
    securityMode: 'standard',
    apiRateLimit: 1000,
    maxFileSize: 50,
    sessionTimeout: 30,
    logLevel: 'info',
    sslEnabled: true,
    autoUpdates: true
  });

  const [systemStatus, setSystemStatus] = useState({
    database: { status: 'online', uptime: '99.9%', responseTime: '12ms' },
    api: { status: 'online', uptime: '99.7%', responseTime: '45ms' },
    search: { status: 'online', uptime: '99.8%', responseTime: '89ms' },
    cache: { status: 'online', uptime: '99.9%', responseTime: '2ms' },
    backup: { status: 'success', lastBackup: '2024-01-21 02:00', size: '1.2GB' },
    security: { status: 'active', lastScan: '2024-01-21 06:00', threats: 0 }
  });

  const [performanceMetrics, setPerformanceMetrics] = useState({
    cpu: { usage: 45, cores: 8, frequency: '3.2 GHz' },
    memory: { usage: 68, total: '16 GB', available: '5.1 GB' },
    disk: { usage: 34, total: '500 GB', available: '330 GB' },
    network: { inbound: '23 Mbps', outbound: '15 Mbps', latency: '12ms' }
  });

  const [backupHistory, setBackupHistory] = useState([
    { id: 1, date: '2024-01-21 02:00', status: 'success', size: '1.2 GB', type: 'auto', duration: '8m 45s' },
    { id: 2, date: '2024-01-20 02:00', status: 'success', size: '1.1 GB', type: 'auto', duration: '7m 32s' },
    { id: 3, date: '2024-01-19 14:30', status: 'success', size: '1.1 GB', type: 'manual', duration: '9m 12s' },
    { id: 4, date: '2024-01-18 02:00', status: 'failed', size: '0 GB', type: 'auto', duration: '0m 00s' },
    { id: 5, date: '2024-01-17 02:00', status: 'success', size: '1.0 GB', type: 'auto', duration: '7m 18s' }
  ]);

  const sections = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'performance', label: 'Performance', icon: Activity },
    { id: 'backup', label: 'Sauvegarde', icon: Database },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'maintenance', label: 'Maintenance', icon: RefreshCw }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulation de sauvegarde réussie
    }, 2000);
  };

  const handleSystemAction = (action) => {
    setLoading(true);
    console.log(`Exécution de l'action système: ${action}`);
    setTimeout(() => setLoading(false), 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
      case 'success':
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'warning':
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'offline':
      case 'failed':
      case 'error':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getPerformanceColor = (usage) => {
    if (usage < 50) return 'text-green-600 bg-green-500';
    if (usage < 80) return 'text-yellow-600 bg-yellow-500';
    return 'text-red-600 bg-red-500';
  };

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-gray-500/10 to-blue-500/10 dark:from-gray-900/20 dark:to-blue-900/20 rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Administration Système
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Configuration et maintenance de la plateforme SunuLoi
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-xl text-sm font-medium">
              <CheckCircle className="h-4 w-4 mr-2" />
              Système opérationnel
            </div>
            <button 
              onClick={handleSave}
              disabled={loading}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50"
            >
              <Save className="h-5 w-5 mr-2" />
              {loading ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </div>

        {/* État système global */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatusCard title="Base de données" status="online" value="99.9%" />
          <StatusCard title="API" status="online" value="99.7%" />
          <StatusCard title="Recherche" status="online" value="99.8%" />
          <StatusCard title="Cache" status="online" value="99.9%" />
          <StatusCard title="Sécurité" status="active" value="100%" />
          <StatusCard title="Sauvegarde" status="success" value="OK" />
        </div>
      </div>

      {/* Navigation des sections */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-2 shadow-xl">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu des sections */}
      <div className="space-y-8">
        {activeSection === 'general' && <GeneralSettings settings={settings} handleSettingChange={handleSettingChange} />}
        {activeSection === 'performance' && <PerformanceSettings performanceMetrics={performanceMetrics} />}
        {activeSection === 'backup' && <BackupSettings backupHistory={backupHistory} handleSystemAction={handleSystemAction} loading={loading} />}
        {activeSection === 'security' && <SecuritySettings settings={settings} handleSettingChange={handleSettingChange} />}
        {activeSection === 'maintenance' && <MaintenanceSettings handleSystemAction={handleSystemAction} loading={loading} />}
      </div>
    </div>
  );
};

// Composant StatusCard
const StatusCard = ({ title, status, value }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
      case 'success':
      case 'active':
        return 'from-green-500 to-green-600';
      case 'warning':
        return 'from-yellow-500 to-yellow-600';
      case 'offline':
      case 'failed':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
      <div className="flex items-center justify-center mb-3">
        <div className={`p-2 bg-gradient-to-r ${getStatusColor(status)} rounded-xl`}>
          <CheckCircle className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{value}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{title}</p>
      </div>
    </div>
  );
};

// Section Paramètres généraux
const GeneralSettings = ({ settings, handleSettingChange }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Configuration générale</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <SettingToggle
          title="Mode maintenance"
          description="Désactive temporairement l'accès public"
          value={settings.maintenanceMode}
          onChange={(value) => handleSettingChange('maintenanceMode', value)}
          danger={true}
        />
        
        <SettingToggle
          title="Sauvegarde automatique"
          description="Sauvegarde quotidienne à 2h00"
          value={settings.autoBackup}
          onChange={(value) => handleSettingChange('autoBackup', value)}
        />
        
        <SettingToggle
          title="Notifications email"
          description="Alertes système par email"
          value={settings.emailNotifications}
          onChange={(value) => handleSettingChange('emailNotifications', value)}
        />
        
        <SettingToggle
          title="Indexation de recherche"
          description="Mise à jour automatique de l'index"
          value={settings.searchIndexing}
          onChange={(value) => handleSettingChange('searchIndexing', value)}
        />
      </div>
      
      <div className="space-y-6">
        <SettingInput
          title="Limite API (requêtes/heure)"
          description="Nombre maximum de requêtes par utilisateur"
          value={settings.apiRateLimit}
          onChange={(value) => handleSettingChange('apiRateLimit', parseInt(value))}
          type="number"
        />
        
        <SettingInput
          title="Taille max fichier (MB)"
          description="Limite de téléchargement"
          value={settings.maxFileSize}
          onChange={(value) => handleSettingChange('maxFileSize', parseInt(value))}
          type="number"
        />
        
        <SettingSelect
          title="Niveau de logs"
          description="Détail des journaux système"
          value={settings.logLevel}
          onChange={(value) => handleSettingChange('logLevel', value)}
          options={[
            { value: 'debug', label: 'Debug (détaillé)' },
            { value: 'info', label: 'Info (standard)' },
            { value: 'warning', label: 'Warning (alertes)' },
            { value: 'error', label: 'Error (erreurs uniquement)' }
          ]}
        />
        
        <SettingSelect
          title="Mode sécurité"
          description="Niveau de sécurité appliqué"
          value={settings.securityMode}
          onChange={(value) => handleSettingChange('securityMode', value)}
          options={[
            { value: 'low', label: 'Faible' },
            { value: 'standard', label: 'Standard' },
            { value: 'high', label: 'Élevé' },
            { value: 'maximum', label: 'Maximum' }
          ]}
        />
      </div>
    </div>
  </div>
);

// Section Performance
const PerformanceSettings = ({ performanceMetrics }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <PerformanceCard
        title="CPU"
        usage={performanceMetrics.cpu.usage}
        details={`${performanceMetrics.cpu.cores} cœurs • ${performanceMetrics.cpu.frequency}`}
        icon={Cpu}
      />
      <PerformanceCard
        title="Mémoire"
        usage={performanceMetrics.memory.usage}
        details={`${performanceMetrics.memory.available} libre sur ${performanceMetrics.memory.total}`}
        icon={MemoryStick}
      />
      <PerformanceCard
        title="Disque"
        usage={performanceMetrics.disk.usage}
        details={`${performanceMetrics.disk.available} libre sur ${performanceMetrics.disk.total}`}
        icon={HardDrive}
      />
      <PerformanceCard
        title="Réseau"
        usage={75}
        details={`${performanceMetrics.network.inbound} ↓ ${performanceMetrics.network.outbound} ↑`}
        icon={Wifi}
      />
    </div>
    
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Optimisations recommandées</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-800/10 rounded-2xl">
          <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
          <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">Performance optimale</h4>
          <p className="text-sm text-green-700 dark:text-green-400">
            Le système fonctionne dans les paramètres recommandés. Aucune action nécessaire.
          </p>
        </div>
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/10 rounded-2xl">
          <Zap className="h-8 w-8 text-blue-600 mb-4" />
          <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Cache optimization</h4>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Vidage du cache recommandé pour améliorer les performances de 12%.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Section Sauvegarde
const BackupSettings = ({ backupHistory, handleSystemAction, loading }) => (
  <div className="space-y-8">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des sauvegardes</h2>
        <button
          onClick={() => handleSystemAction('backup')}
          disabled={loading}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50"
        >
          <Database className="h-5 w-5 mr-2" />
          {loading ? 'Sauvegarde...' : 'Créer une sauvegarde'}
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Date & Heure
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Taille
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Durée
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {backupHistory.map((backup) => (
              <tr key={backup.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {new Date(backup.date).toLocaleString('fr-FR')}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    backup.type === 'auto' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
                  }`}>
                    {backup.type === 'auto' ? 'Automatique' : 'Manuelle'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {backup.size}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {backup.duration}
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    backup.status === 'success'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  }`}>
                    {backup.status === 'success' ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 mr-1" />
                    )}
                    {backup.status === 'success' ? 'Réussie' : 'Échouée'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {backup.status === 'success' && (
                      <>
                        <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Section Sécurité
const SecuritySettings = ({ settings, handleSettingChange }) => (
  <div className="space-y-8">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Configuration sécurité</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <SettingToggle
            title="SSL/TLS"
            description="Chiffrement des communications"
            value={settings.sslEnabled}
            onChange={(value) => handleSettingChange('sslEnabled', value)}
            icon={Lock}
          />
          
          <SettingToggle
            title="Mises à jour automatiques"
            description="Installation automatique des correctifs"
            value={settings.autoUpdates}
            onChange={(value) => handleSettingChange('autoUpdates', value)}
            icon={RefreshCw}
          />
          
          <SettingInput
            title="Timeout de session (minutes)"
            description="Durée avant déconnexion automatique"
            value={settings.sessionTimeout}
            onChange={(value) => handleSettingChange('sessionTimeout', parseInt(value))}
            type="number"
          />
        </div>
        
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-800/10 rounded-2xl">
            <Shield className="h-8 w-8 text-green-600 mb-4" />
            <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">Sécurité active</h4>
            <p className="text-sm text-green-700 dark:text-green-400 mb-4">
              Dernière analyse: Aucune menace détectée
            </p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
              Lancer un scan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Section Maintenance
const MaintenanceSettings = ({ handleSystemAction, loading }) => (
  <div className="space-y-8">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Actions de maintenance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MaintenanceCard
          title="Vider le cache"
          description="Améliore les performances"
          icon={RefreshCw}
          color="from-blue-500 to-blue-600"
          action={() => handleSystemAction('clear-cache')}
          loading={loading}
          duration="~2 minutes"
        />
        
        <MaintenanceCard
          title="Réindexer recherche"
          description="Met à jour l'index de recherche"
          icon={Database}
          color="from-green-500 to-green-600"
          action={() => handleSystemAction('reindex')}
          loading={loading}
          duration="~15 minutes"
        />
        
        <MaintenanceCard
          title="Optimiser BDD"
          description="Optimise la base de données"
          icon={Activity}
          color="from-purple-500 to-purple-600"
          action={() => handleSystemAction('optimize-db')}
          loading={loading}
          duration="~30 minutes"
        />
        
        <MaintenanceCard
          title="Audit sécurité"
          description="Analyse complète de sécurité"
          icon={Shield}
          color="from-yellow-500 to-yellow-600"
          action={() => handleSystemAction('security-audit')}
          loading={loading}
          duration="~10 minutes"
        />
      </div>
    </div>
  </div>
);

// Composants utilitaires
const SettingToggle = ({ title, description, value, onChange, danger = false, icon: Icon }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-center space-x-3">
      {Icon && <Icon className="h-5 w-5 text-gray-500" />}
      <div>
        <span className="font-medium text-gray-900 dark:text-white">{title}</span>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${
        value 
          ? danger 
            ? 'bg-red-600 peer-checked:bg-red-600' 
            : 'bg-blue-600 peer-checked:bg-blue-600'
          : 'bg-gray-200 dark:bg-gray-700'
      }`}></div>
    </label>
  </div>
);

const SettingInput = ({ title, description, value, onChange, type = "text" }) => (
  <div className="space-y-3">
    <div>
      <label className="block text-sm font-medium text-gray-900 dark:text-white">{title}</label>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

const SettingSelect = ({ title, description, value, onChange, options }) => (
  <div className="space-y-3">
    <div>
      <label className="block text-sm font-medium text-gray-900 dark:text-white">{title}</label>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

const PerformanceCard = ({ title, usage, details, icon: Icon }) => {
  const getColor = (usage) => {
    if (usage < 50) return 'from-green-500 to-green-600';
    if (usage < 80) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{usage}%</span>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">{title}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className={`h-3 bg-gradient-to-r ${getColor(usage)} rounded-full transition-all duration-500`}
            style={{ width: `${usage}%` }}
          ></div>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 dark:text-gray-400">{details}</p>
    </div>
  );
};

const MaintenanceCard = ({ title, description, icon: Icon, color, action, loading, duration }) => (
  <button
    onClick={action}
    disabled={loading}
    className="group p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <div className={`p-4 bg-gradient-to-r ${color} rounded-2xl mb-4 group-hover:shadow-lg transition-all`}>
      <Icon className="h-8 w-8 text-white" />
    </div>
    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{description}</p>
    <p className="text-xs text-gray-500 dark:text-gray-500">{duration}</p>
  </button>
);

export default SystemSettings;