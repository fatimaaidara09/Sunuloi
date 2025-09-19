import React, { useState, useEffect } from 'react';
import {
  Users,
  MessageSquare,
  Heart,
  Star,
  Eye,
  Reply,
  Search,
  Filter,
  Plus,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Bookmark,
  Share2,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  FileText,
  Scale,
  Gavel,
  BookOpen,
  Zap,
  Crown,
  Badge,
  ThumbsUp,
  ThumbsDown,
  Send,
  Paperclip,
  Image,
  Video,
  Mic,
  Settings,
  Bell,
  UserPlus,
  Globe,
  MapPin,
  Briefcase,
  GraduationCap
} from 'lucide-react';

const ForumCommunityPage = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [user, setUser] = useState({
    name: 'Me Fatou Diop',
    title: 'Avocat spécialisé en droit des affaires',
    avatar: '/api/placeholder/150/150',
    reputation: 2847,
    badges: ['Expert', 'Contributeur actif', 'Mentor'],
    posts: 156,
    helpful: 89,
    joined: '2023-01-15'
  });
  const [newPost, setNewPost] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  // Données simulées
  const mockDiscussions = [
    {
      id: 1,
      title: 'Application du nouveau Code du Travail : questions pratiques',
      content: 'Bonjour la communauté, j\'aimerais avoir vos retours sur l\'application concrète des nouvelles dispositions du Code du Travail, notamment concernant...',
      author: {
        name: 'Me Amadou Ba',
        title: 'Avocat en droit social',
        avatar: '/api/placeholder/40/40',
        reputation: 1250,
        badges: ['Expert Social']
      },
      category: 'droit-social',
      tags: ['code-travail', 'jurisprudence', 'pratique'],
      timestamp: '2024-09-12T10:30:00Z',
      views: 234,
      replies: 12,
      likes: 18,
      solved: false,
      pinned: true,
      urgent: false,
      lastReply: {
        author: 'Me Aïssatou Fall',
        timestamp: '2024-09-12T15:45:00Z'
      }
    },
    {
      id: 2,
      title: 'Dématérialisation des procédures : retours d\'expérience',
      content: 'Suite à la mise en place de la dématérialisation dans plusieurs tribunaux, quels sont vos retours ? Avez-vous rencontré des difficultés particulières ?',
      author: {
        name: 'Me Ousmane Sall',
        title: 'Avocat au Barreau de Dakar',
        avatar: '/api/placeholder/40/40',
        reputation: 890,
        badges: ['Numérique']
      },
      category: 'procedure',
      tags: ['dématérialisation', 'tribunaux', 'numérique'],
      timestamp: '2024-09-12T09:15:00Z',
      views: 156,
      replies: 8,
      likes: 23,
      solved: true,
      pinned: false,
      urgent: false,
      lastReply: {
        author: 'Me Mariama Diallo',
        timestamp: '2024-09-12T14:20:00Z'
      }
    },
    {
      id: 3,
      title: 'Jurisprudence récente en droit de l\'environnement',
      content: 'La Cour Suprême vient de rendre un arrêt important concernant la responsabilité environnementale des entreprises. Qu\'en pensez-vous ?',
      author: {
        name: 'Dr Mame Diarra Thiam',
        title: 'Professeure de droit',
        avatar: '/api/placeholder/40/40',
        reputation: 2100,
        badges: ['Professeur', 'Expert Environnement']
      },
      category: 'environnement',
      tags: ['jurisprudence', 'environnement', 'cour-supreme'],
      timestamp: '2024-09-11T16:22:00Z',
      views: 189,
      replies: 15,
      likes: 31,
      solved: false,
      pinned: false,
      urgent: true,
      lastReply: {
        author: 'Me Ibrahima Sarr',
        timestamp: '2024-09-12T11:10:00Z'
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les catégories', count: 245, icon: MessageSquare },
    { id: 'droit-social', name: 'Droit Social', count: 67, icon: Users },
    { id: 'procedure', name: 'Procédure', count: 43, icon: FileText },
    { id: 'environnement', name: 'Droit de l\'Environnement', count: 32, icon: Globe },
    { id: 'affaires', name: 'Droit des Affaires', count: 58, icon: Briefcase },
    { id: 'penal', name: 'Droit Pénal', count: 29, icon: Scale },
    { id: 'famille', name: 'Droit de la Famille', count: 41, icon: Heart },
    { id: 'questions', name: 'Questions/Réponses', count: 89, icon: HelpCircle }
  ];

  const topContributors = [
    {
      name: 'Me Fatou Diop',
      title: 'Avocate spécialisée',
      reputation: 2847,
      posts: 156,
      badges: ['Expert', 'Mentor', 'Top Contributeur'],
      avatar: '/api/placeholder/40/40'
    },
    {
      name: 'Dr Amadou Kane',
      title: 'Professeur de Droit',
      reputation: 2156,
      posts: 98,
      badges: ['Professeur', 'Expert Constitutionnel'],
      avatar: '/api/placeholder/40/40'
    },
    {
      name: 'Me Aïssatou Fall',
      title: 'Avocate',
      reputation: 1890,
      posts: 134,
      badges: ['Expert Social', 'Contributrice Active'],
      avatar: '/api/placeholder/40/40'
    }
  ];

  useEffect(() => {
    setDiscussions(mockDiscussions);
  }, []);

  const filteredDiscussions = discussions.filter(discussion => {
    if (selectedCategory !== 'all' && discussion.category !== selectedCategory) return false;
    if (searchTerm && !discussion.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}j`;
    if (hours > 0) return `${hours}h`;
    return 'maintenant';
  };

  const handleLike = (discussionId) => {
    setDiscussions(discussions.map(d => 
      d.id === discussionId 
        ? { ...d, likes: d.likes + 1 }
        : d
    ));
  };

  const submitNewPost = () => {
    if (!newPost.trim()) return;
    
    // Simuler l'ajout d'un nouveau post
    const newDiscussion = {
      id: Date.now(),
      title: newPost.split('\n')[0] || 'Nouvelle discussion',
      content: newPost,
      author: user,
      category: 'all',
      tags: [],
      timestamp: new Date().toISOString(),
      views: 0,
      replies: 0,
      likes: 0,
      solved: false,
      pinned: false,
      urgent: false
    };
    
    setDiscussions([newDiscussion, ...discussions]);
    setNewPost('');
    setShowNewPostForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-yellow-500 rounded-xl">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Forum & Communauté</h1>
                <p className="text-gray-600 dark:text-gray-400">Échangez avec la communauté juridique sénégalaise</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4" />
                <span>2,847 membres actifs</span>
              </div>
              <button 
                onClick={() => setShowNewPostForm(true)}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Nouveau sujet</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Profil utilisateur */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{user.title}</p>
                
                <div className="flex items-center justify-center space-x-4 text-sm mb-4">
                  <div className="text-center">
                    <div className="text-green-600 font-bold">{user.reputation}</div>
                    <div className="text-gray-500">Réputation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-600 font-bold">{user.posts}</div>
                    <div className="text-gray-500">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-600 font-bold">{user.helpful}</div>
                    <div className="text-gray-500">Utile</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 justify-center">
                  {user.badges.map((badge, idx) => (
                    <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Catégories */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Catégories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className="h-4 w-4" />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Top Contributeurs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Contributeurs</h3>
              <div className="space-y-4">
                {topContributors.map((contributor, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {contributor.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {contributor.reputation} points
                      </div>
                    </div>
                    {idx === 0 && <Crown className="h-4 w-4 text-yellow-500" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Zone principale */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Barre de recherche et filtres */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher dans les discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="latest">Plus récent</option>
                    <option value="popular">Plus populaire</option>
                    <option value="replies">Plus de réponses</option>
                    <option value="views">Plus vues</option>
                  </select>
                  
                  <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Formulaire nouveau post */}
            {showNewPostForm && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nouveau sujet de discussion</h3>
                  <button 
                    onClick={() => setShowNewPostForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Catégorie
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white">
                      {categories.filter(c => c.id !== 'all').map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contenu
                    </label>
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Décrivez votre question ou sujet de discussion..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-32 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Paperclip className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Image className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setShowNewPostForm(false)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Annuler
                      </button>
                      <button 
                        onClick={submitNewPost}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Publier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Statistiques du forum */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Discussions actives', value: '1,247', icon: MessageSquare, color: 'text-blue-600' },
                { label: 'Membres', value: '2,847', icon: Users, color: 'text-green-600' },
                { label: 'Messages aujourd\'hui', value: '156', icon: TrendingUp, color: 'text-yellow-600' },
                { label: 'Experts en ligne', value: '23', icon: Award, color: 'text-purple-600' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Liste des discussions */}
            <div className="space-y-4">
              {filteredDiscussions.map(discussion => (
                <div key={discussion.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {discussion.author.name.split(' ').map(n => n[0]).join('')}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {discussion.pinned && (
                              <div className="p-1 bg-yellow-100 dark:bg-yellow-900 rounded">
                                <Star className="h-3 w-3 text-yellow-600" />
                              </div>
                            )}
                            {discussion.urgent && (
                              <div className="p-1 bg-red-100 dark:bg-red-900 rounded">
                                <AlertCircle className="h-3 w-3 text-red-600" />
                              </div>
                            )}
                            {discussion.solved && (
                              <div className="p-1 bg-green-100 dark:bg-green-900 rounded">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                              <Bookmark className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Titre et contenu */}
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer">
                          {discussion.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {discussion.content}
                        </p>

                        {/* Tags */}
                        {discussion.tags && discussion.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {discussion.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-300 cursor-pointer transition-colors"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Métadonnées */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <span className="font-medium text-gray-700 dark:text-gray-300">{discussion.author.name}</span>
                              <div className="flex items-center space-x-1">
                                {discussion.author.badges?.map((badge, idx) => (
                                  <Badge key={idx} className="h-3 w-3 text-green-500" />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatTimeAgo(discussion.timestamp)}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{discussion.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Reply className="h-4 w-4" />
                              <span>{discussion.replies}</span>
                            </div>
                            <button 
                              onClick={() => handleLike(discussion.id)}
                              className="flex items-center space-x-1 hover:text-green-600 transition-colors"
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span>{discussion.likes}</span>
                            </button>
                          </div>
                        </div>

                        {/* Dernière réponse */}
                        {discussion.lastReply && (
                          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Dernière réponse de <span className="font-medium">{discussion.lastReply.author}</span> il y a {formatTimeAgo(discussion.lastReply.timestamp)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Précédent
                </button>
                {[1, 2, 3].map(page => (
                  <button
                    key={page}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      page === 1 
                        ? 'bg-green-600 text-white' 
                        : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumCommunityPage;