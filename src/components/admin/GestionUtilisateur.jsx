import React, { useState } from 'react';
import { 
  Users, Search, Filter, UserCheck, Edit, Trash2, Eye, Download,
  CheckCircle, AlertTriangle, Clock, MapPin, Mail, Phone,
  Award, Shield, Lock, Unlock, MessageSquare, MoreHorizontal,
  TrendingUp, Star, Flag, UserPlus, RefreshCw
} from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Amadou Ba Diallo',
      email: 'amadou.diallo@gmail.com',
      role: 'citizen',
      status: 'active',
      lastLogin: '2024-01-20T14:30:00',
      joinDate: '2023-06-15',
      location: 'Dakar, Plateau',
      totalViews: 156,
      downloadsCount: 45,
      verified: true,
      profession: 'Commerçant',
      phone: '+221 77 123 45 67',
      loginStreak: 15,
      favoriteCategory: 'Droit commercial'
    },
    {
      id: 2,
      name: 'Dr. Marie Diop Sow',
      email: 'marie.sow@juriste.sn',
      role: 'professional',
      status: 'active',
      lastLogin: '2024-01-21T08:15:00',
      joinDate: '2023-08-20',
      location: 'Thiès Centre',
      totalViews: 892,
      downloadsCount: 234,
      verified: true,
      profession: 'Avocate',
      phone: '+221 78 987 65 43',
      loginStreak: 42,
      favoriteCategory: 'Droit civil'
    },
    {
      id: 3,
      name: 'Ousmane Fall',
      email: 'ousmane.fall@student.edu',
      role: 'student',
      status: 'inactive',
      lastLogin: '2024-01-10T16:20:00',
      joinDate: '2023-11-05',
      location: 'Saint-Louis, Centre',
      totalViews: 67,
      downloadsCount: 12,
      verified: false,
      profession: 'Étudiant en droit',
      phone: '+221 76 555 44 33',
      loginStreak: 3,
      favoriteCategory: 'Droit constitutionnel'
    },
    {
      id: 4,
      name: 'Fatou Bintou Sarr',
      email: 'fatou.sarr@ministere.gouv.sn',
      role: 'administrator',
      status: 'active',
      lastLogin: '2024-01-21T09:45:00',
      joinDate: '2023-01-12',
      location: 'Dakar, Almadies',
      totalViews: 1420,
      downloadsCount: 567,
      verified: true,
      profession: 'Fonctionnaire',
      phone: '+221 77 789 12 34',
      loginStreak: 89,
      favoriteCategory: 'Droit administratif'
    },
    {
      id: 5,
      name: 'Cheikh Ahmadou Bamba Ndiaye',
      email: 'cheikh.ndiaye@enterprise.com',
      role: 'professional',
      status: 'suspended',
      lastLogin: '2024-01-15T11:30:00',
      joinDate: '2023-09-08',
      location: 'Mbour, Centre',
      totalViews: 345,
      downloadsCount: 89,
      verified: true,
      profession: 'Consultant juridique',
      phone: '+221 78 246 81 35',
      loginStreak: 0,
      favoriteCategory: 'Droit du travail'
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
      'administrator': 'from-red-500 to-red-600',
      'professional': 'from-blue-500 to-blue-600',
      'student': 'from-purple-500 to-purple-600',
      'citizen': 'from-green-500 to-green-600'
    };
    return colors[role] || 'from-gray-500 to-gray-600';
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      'inactive': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      'suspended': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleUserAction = (userId, action) => {
    console.log(`Action ${action} pour l'utilisateur ${userId}`);
    if (action === 'suspend' || action === 'activate') {
      setUsers(prev => 
        prev.map(user => 
          user.id === userId 
            ? { ...user, status: action === 'suspend' ? 'suspended' : 'active' }
            : user
        )
      );
    }
  };

  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) return;
    console.log(`Action ${action} sur ${selectedUsers.length} utilisateurs`);
  };

  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRole === '' || user.role === selectedRole) &&
      (selectedStatus === '' || user.status === selectedStatus)
    );
  });

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    verified: users.filter(u => u.verified).length,
    professionals: users.filter(u => u.role === 'professional').length,
    students: users.filter(u => u.role === 'student').length,
    citizens: users.filter(u => u.role === 'citizen').length,
    suspended: users.filter(u => u.status === 'suspended').length
  };

  return (
    <div className="space-y-8">
      {/* En-tête avec statistiques */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-blue-200/50 dark:border-blue-700/50">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Gestion des Utilisateurs
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Administrez la communauté SunuLoi avec des outils avancés
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              <UserPlus className="h-5 w-5 mr-2" />
              Inviter admin
            </button>
            <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              <Download className="h-5 w-5 mr-2" />
              Exporter données
            </button>
          </div>
        </div>

        {/* Statistiques des utilisateurs */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <StatCard
            title="Total"
            value={userStats.total}
            icon={Users}
            color="from-gray-500 to-gray-600"
          />
          <StatCard
            title="Actifs"
            value={userStats.active}
            icon={CheckCircle}
            color="from-green-500 to-green-600"
          />
          <StatCard
            title="Vérifiés"
            value={userStats.verified}
            icon={Award}
            color="from-yellow-500 to-yellow-600"
          />
          <StatCard
            title="Professionnels"
            value={userStats.professionals}
            icon={Shield}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            title="Étudiants"
            value={userStats.students}
            icon={Users}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            title="Citoyens"
            value={userStats.citizens}
            icon={Users}
            color="from-green-500 to-green-600"
          />
          <StatCard
            title="Suspendus"
            value={userStats.suspended}
            icon={AlertTriangle}
            color="from-red-500 to-red-600"
          />
        </div>
      </div>

      {/* Interface de recherche et filtres */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un utilisateur..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tous les rôles</option>
            <option value="administrator">Administrateur</option>
            <option value="professional">Professionnel</option>
            <option value="student">Étudiant</option>
            <option value="citizen">Citoyen</option>
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="suspended">Suspendu</option>
            <option value="pending">En attente</option>
          </select>
        </div>

        {/* Actions en lot */}
        {selectedUsers.length > 0 && (
          <div className="flex items-center space-x-3 mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
              {selectedUsers.length} utilisateur(s) sélectionné(s)
            </span>
            <button 
              onClick={() => handleBulkAction('activate')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Activer
            </button>
            <button 
              onClick={() => handleBulkAction('suspend')}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
            >
              Suspendre
            </button>
            <button 
              onClick={() => handleBulkAction('verify')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Vérifier
            </button>
            <button 
              onClick={() => handleBulkAction('message')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              Message groupé
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
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20' 
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
              onClick={() => setViewMode('table')}
              className={`p-3 rounded-xl transition-all ${
                viewMode === 'table' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20' 
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
            {filteredUsers.length} utilisateur(s) trouvé(s)
          </p>
        </div>
      </div>

      {/* Affichage des utilisateurs */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard 
              key={user.id} 
              user={user} 
              onAction={handleUserAction}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              getRoleColor={getRoleColor}
              getRoleLabel={getRoleLabel}
              getStatusColor={getStatusColor}
            />
          ))}
        </div>
      ) : (
        <UserTable 
          users={filteredUsers}
          onAction={handleUserAction}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          getRoleColor={getRoleColor}
          getRoleLabel={getRoleLabel}
          getStatusColor={getStatusColor}
        />
      )}

      {filteredUsers.length === 0 && (
        <div className="text-center py-16">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Aucun utilisateur trouvé
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Ajustez vos critères de recherche ou invitez de nouveaux utilisateurs.
          </p>
        </div>
      )}
    </div>
  );
};

// Composant StatCard pour les statistiques
const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105">
    <div className="flex items-center justify-center mb-3">
      <div className={`p-2 bg-gradient-to-r ${color} rounded-xl`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
    </div>
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{title}</p>
    </div>
  </div>
);

// Composant UserCard moderne
const UserCard = ({ user, onAction, selectedUsers, setSelectedUsers, getRoleColor, getRoleLabel, getStatusColor }) => {
  const isSelected = selectedUsers.includes(user.id);

  const toggleSelection = () => {
    if (isSelected) {
      setSelectedUsers(prev => prev.filter(id => id !== user.id));
    } else {
      setSelectedUsers(prev => [...prev, user.id]);
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  return (
    <div className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border ${
      isSelected ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200/50 dark:border-gray-700/50'
    } rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2`}>
      
      {/* En-tête avec sélection */}
      <div className="flex items-start justify-between mb-6">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={toggleSelection}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
        />
        <div className="flex items-center space-x-2">
          {user.verified && (
            <div className="p-1 bg-green-100 dark:bg-green-900/20 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          )}
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
            {user.status === 'active' ? 'Actif' : 
             user.status === 'inactive' ? 'Inactif' : 
             user.status === 'suspended' ? 'Suspendu' : 'En attente'}
          </span>
        </div>
      </div>

      {/* Avatar et informations de base */}
      <div className="text-center mb-6">
        <div className={`h-20 w-20 bg-gradient-to-r ${getRoleColor(user.role)} rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
          {getInitials(user.name)}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
          {user.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{user.profession}</p>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRoleColor(user.role)} text-white`}>
          {getRoleLabel(user.role)}
        </div>
      </div>

      {/* Métriques utilisateur */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/10 rounded-xl">
          <Eye className="h-5 w-5 text-blue-600 mx-auto mb-1" />
          <p className="text-sm font-bold text-gray-900 dark:text-white">{user.totalViews}</p>
          <p className="text-xs text-gray-500">Consultations</p>
        </div>
        <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-800/10 rounded-xl">
          <Download className="h-5 w-5 text-green-600 mx-auto mb-1" />
          <p className="text-sm font-bold text-gray-900 dark:text-white">{user.downloadsCount}</p>
          <p className="text-xs text-gray-500">Téléchargements</p>
        </div>
      </div>

      {/* Informations détaillées */}
      <div className="space-y-3 mb-6 text-sm">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4" />
          <span>{user.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <Mail className="h-4 w-4" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <Star className="h-4 w-4" />
          <span>{user.favoriteCategory}</span>
        </div>
        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs">Série: {user.loginStreak} jours</span>
          </div>
          <span className="text-xs">
            Inscrit: {new Date(user.joinDate).toLocaleDateString('fr-FR')}
          </span>
        </div>
      </div>

      {/* Actions utilisateur */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onAction(user.id, 'edit')}
          className="flex-1 flex items-center justify-center px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all text-sm font-medium"
        >
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </button>
        
        <button
          onClick={() => onAction(user.id, 'message')}
          className="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-xl transition-all"
          title="Envoyer un message"
        >
          <MessageSquare className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => onAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
          className={`p-2 rounded-xl transition-all ${
            user.status === 'active' 
              ? 'text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/20'
              : user.status === 'suspended'
              ? 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20'
              : 'text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20'
          }`}
          title={
            user.status === 'active' ? 'Suspendre' : 
            user.status === 'suspended' ? 'Activer' : 'Activer'
          }
        >
          {user.status === 'active' ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
        </button>
        
        <button
          onClick={() => onAction(user.id, 'view')}
          className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
          title="Voir le profil"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Composant UserTable moderne
const UserTable = ({ users, onAction, selectedUsers, setSelectedUsers, getRoleColor, getRoleLabel, getStatusColor }) => {
  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(u => u.id));
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <tr>
              <th className="px-6 py-4 text-left">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={toggleSelectAll}
                  checked={users.length > 0 && selectedUsers.length === users.length}
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Utilisateur
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Rôle & Statut
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Activité
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Localisation
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Dernière connexion
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
            {users.map((user) => {
              const isSelected = selectedUsers.includes(user.id);
              const getInitials = (name) => name.split(' ').map(n => n[0]).join('').substring(0, 2);
              
              return (
                <tr 
                  key={user.id} 
                  className={`hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-300 ${
                    isSelected ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => {
                        if (isSelected) {
                          setSelectedUsers(prev => prev.filter(id => id !== user.id));
                        } else {
                          setSelectedUsers(prev => [...prev, user.id]);
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className={`h-12 w-12 bg-gradient-to-r ${getRoleColor(user.role)} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm font-bold text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          {user.verified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {user.profession}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRoleColor(user.role)} text-white`}>
                        {getRoleLabel(user.role)}
                      </span>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status === 'active' ? 'Actif' : 
                           user.status === 'inactive' ? 'Inactif' : 
                           user.status === 'suspended' ? 'Suspendu' : 'En attente'}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center text-blue-600">
                        <Eye className="h-4 w-4 mr-1" />
                        {user.totalViews}
                      </div>
                      <div className="flex items-center text-green-600">
                        <Download className="h-4 w-4 mr-1" />
                        {user.downloadsCount}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Série: {user.loginStreak} jours
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-900 dark:text-white">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {user.location}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {user.favoriteCategory}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(user.lastLogin).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Inscrit: {new Date(user.joinDate).toLocaleDateString('fr-FR')}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onAction(user.id, 'edit')}
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onAction(user.id, 'message')}
                        className="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-xl transition-all"
                        title="Message"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                        className={`p-2 rounded-xl transition-all ${
                          user.status === 'active' 
                            ? 'text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/20'
                            : 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20'
                        }`}
                        title={user.status === 'active' ? 'Suspendre' : 'Activer'}
                      >
                        {user.status === 'active' ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => onAction(user.id, 'view')}
                        className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
                        title="Voir profil"
                      >
                        <Eye className="h-4 w-4" />
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
};

export default UserManagement;