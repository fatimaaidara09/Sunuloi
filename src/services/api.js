const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Token d'authentification
    const token = localStorage.getItem('sunuloi_token') || sessionStorage.getItem('sunuloi_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Error ${endpoint}:`, error);
      throw error;
    }
  }

  // ===== AUTHENTIFICATION =====
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async getProfile() {
    return this.request('/auth/me');
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST'
    });
  }

  // ===== DOCUMENTS =====
  async getDocuments(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/documents${query ? `?${query}` : ''}`);
  }

  async getDocument(id) {
    return this.request(`/documents/${id}`);
  }

  async createDocument(documentData) {
    return this.request('/documents', {
      method: 'POST',
      body: JSON.stringify(documentData)
    });
  }

  async updateDocument(id, documentData) {
    return this.request(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(documentData)
    });
  }

  async deleteDocument(id) {
    return this.request(`/documents/${id}`, {
      method: 'DELETE'
    });
  }

  // ===== RECHERCHE =====
  async search(query, options = {}) {
    const params = new URLSearchParams({
      search: query,
      ...options
    }).toString();
    
    return this.request(`/documents?${params}`);
  }

  async voiceSearch(audioData, language = 'fr-FR') {
    return this.request('/search/voice', {
      method: 'POST',
      body: JSON.stringify({ audioData, language })
    });
  }

  // ===== CATÉGORIES =====
  async getCategories() {
    return this.request('/categories');
  }

  async getCategory(id) {
    return this.request(`/categories/${id}`);
  }

  // ===== FAVORIS =====
  async getFavorites() {
    return this.request('/favorites');
  }

  async addToFavorites(documentId) {
    return this.request('/favorites', {
      method: 'POST',
      body: JSON.stringify({ documentId })
    });
  }

  async removeFromFavorites(favoriteId) {
    return this.request(`/favorites/${favoriteId}`, {
      method: 'DELETE'
    });
  }

  // ===== NOTIFICATIONS =====
  async getNotifications(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/notifications${query ? `?${query}` : ''}`);
  }

  async markNotificationAsRead(id) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT'
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/notifications/mark-all-read', {
      method: 'PUT'
    });
  }

  // ===== STATISTIQUES =====
  async getStats() {
    return this.request('/stats');
  }

  async getTrends(period = '30d', category) {
    const params = new URLSearchParams({ 
      period, 
      ...(category && { category }) 
    });
    return this.request(`/trends?${params}`);
  }

  // ===== DASHBOARD =====
  async getDashboardData() {
    return this.request('/dashboard');
  }

  async updateSettings(settings) {
    return this.request('/dashboard/settings', {
      method: 'PUT',
      body: JSON.stringify({ settings })
    });
  }

  async getSearchHistory(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/dashboard/history${query ? `?${query}` : ''}`);
  }

  // ===== FORMATIONS =====
  async getTrainings() {
    return this.request('/formations');
  }

  async getTraining(id) {
    return this.request(`/formations/${id}`);
  }

  async enrollInTraining(id) {
    return this.request(`/formations/${id}/enroll`, {
      method: 'POST'
    });
  }

  async updateTrainingProgress(id, progress) {
    return this.request(`/formations/${id}/progress`, {
      method: 'POST',
      body: JSON.stringify({ progress })
    });
  }

  // ===== FORUM =====
  async getForumPosts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/forum/posts${query ? `?${query}` : ''}`);
  }

  async getForumPost(id) {
    return this.request(`/forum/posts/${id}`);
  }

  async createForumPost(postData) {
    return this.request('/forum/posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    });
  }

  async replyToPost(id, replyData) {
    return this.request(`/forum/posts/${id}/reply`, {
      method: 'POST',
      body: JSON.stringify(replyData)
    });
  }

  async likePost(id) {
    return this.request(`/forum/posts/${id}/like`, {
      method: 'POST'
    });
  }

  // ===== COMPARATEUR =====
  async getComparisons() {
    return this.request('/comparateur/comparisons');
  }

  async createComparison(comparisonData) {
    return this.request('/comparateur/compare', {
      method: 'POST',
      body: JSON.stringify(comparisonData)
    });
  }

  async updateComparison(id, updates) {
    return this.request(`/comparateur/comparisons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async deleteComparison(id) {
    return this.request(`/comparateur/comparisons/${id}`, {
      method: 'DELETE'
    });
  }

  async shareComparison(id) {
    return this.request(`/comparateur/comparisons/${id}/share`, {
      method: 'POST'
    });
  }

  // ===== TÉLÉCHARGEMENTS =====
  async downloadDocument(documentId, format = 'pdf') {
    const response = await fetch(`${this.baseURL}/download/${documentId}?format=${format}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('sunuloi_token') || sessionStorage.getItem('sunuloi_token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors du téléchargement');
    }

    return response.blob();
  }

  // ===== UTILISATEURS =====
  async updateUser(userData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  async changePassword(passwordData) {
    return this.request('/users/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData)
    });
  }
}

export const apiService = new ApiService();
export default apiService;