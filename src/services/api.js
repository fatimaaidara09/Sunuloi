/ services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

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

    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('sunuloi_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Méthodes de recherche
  async search(query, options = {}) {
    const params = new URLSearchParams({
      query,
      ...options
    }).toString();
    
    return this.request(`/search?${params}`);
  }

  async voiceSearch(audioData, language = 'fr-FR') {
    return this.request('/search/voice', {
      method: 'POST',
      body: JSON.stringify({ audioData, language })
    });
  }

  // Méthodes statistiques
  async getTrends(period = '30d', category) {
    const params = new URLSearchParams({ period, ...(category && { category }) });
    return this.request(`/trends?${params}`);
  }

  async getStats() {
    return this.request('/stats');
  }

  // Méthodes utilisateur
  async getFavorites() {
    return this.request('/user/favorites');
  }

  async addToFavorites(documentId, documentType) {
    return this.request('/user/favorites', {
      method: 'POST',
      body: JSON.stringify({ documentId, documentType })
    });
  }

  async getSearchHistory(page = 1, limit = 20) {
    const params = new URLSearchParams({ page, limit });
    return this.request(`/user/search-history?${params}`);
  }

  // Méthodes téléchargement
  async downloadDocument(documentId, format = 'pdf') {
    const response = await fetch(`${this.baseURL}/download/${documentId}?format=${format}`);
    return response.blob();
  }

  // Notifications
  async getNotifications(unreadOnly = false) {
    const params = new URLSearchParams({ unreadOnly });
    return this.request(`/notifications?${params}`);
  }

  async markNotificationAsRead(id) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT'
    });
  }
}



export const apiService = new ApiService();

// src/services/api.js

class DashboardAPI {
  constructor() {
    this.baseURL = `${API_BASE_URL}/dashboard`;
  }

  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'x-auth-token': token }),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.msg || 'Erreur API');
      }

      return await response.json();
    } catch (error) {
      console.error(`Erreur API ${endpoint}:`, error);
      throw error;
    }
  }

  async getDashboardData() {
    return this.request('');
  }

  async getStats() {
    return this.request('/stats');
  }

  async getTrainings() {
    return this.request('/trainings');
  }

  async getForumActivity() {
    return this.request('/forum');
  }

  async getComparisons() {
    return this.request('/comparisons');
  }

  async getAchievements() {
    return this.request('/achievements');
  }

  async getLearningPath() {
    return this.request('/learning-path');
  }

  async getNotifications(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/notifications${query ? `?${query}` : ''}`);
  }

  async getFavorites() {
    return this.request('/favorites');
  }

  async getSearchHistory() {
    return this.request('/search-history');
  }

  async updateSettings(settings) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify({ settings })
    });
  }

  async markNotificationAsRead(notificationId) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT'
    });
  }

  async removeFromFavorites(favoriteId) {
    return this.request(`/favorites/${favoriteId}`, {
      method: 'DELETE'
    });
  }

  async addToFavorites(document) {
    return this.request('/favorites', {
      method: 'POST',
      body: JSON.stringify(document)
    });
  }

  async deleteComparison(comparisonId) {
    return this.request(`/comparisons/${comparisonId}`, {
      method: 'DELETE'
    });
  }

  async clearSearchHistory() {
    return this.request('/search-history', {
      method: 'DELETE'
    });
  }

  async removeFromSearchHistory(searchId) {
    return this.request(`/search-history/${searchId}`, {
      method: 'DELETE'
    });
  }
}

export const dashboardAPI = new DashboardAPI();
