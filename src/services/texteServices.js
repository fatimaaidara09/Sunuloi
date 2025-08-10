import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const textService = {
  // Récupérer tous les textes avec pagination et filtres
  getTexts: async (params = {}) => {
    try {
      const response = await api.get(API_ENDPOINTS.texts, { params });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des textes:', error);
      throw error;
    }
  },

  // Récupérer un texte par ID
  getTextById: async (id) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.texts}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du texte ${id}:`, error);
      throw error;
    }
  },

  // Rechercher des textes
  searchTexts: async (query, filters = {}) => {
    try {
      const response = await api.post(API_ENDPOINTS.search, {
        query,
        filters
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      throw error;
    }
  },

  // Créer un nouveau texte (admin)
  createText: async (textData) => {
    try {
      const response = await api.post(API_ENDPOINTS.texts, textData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du texte:', error);
      throw error;
    }
  },

  // Mettre à jour un texte (admin)
  updateText: async (id, textData) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.texts}/${id}`, textData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du texte ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un texte (admin)
  deleteText: async (id) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.texts}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du texte ${id}:`, error);
      throw error;
    }
  },

  // Télécharger un texte en PDF
  downloadTextPDF: async (id) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.texts}/${id}/pdf`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `text-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return true;
    } catch (error) {
      console.error(`Erreur lors du téléchargement du texte ${id}:`, error);
      throw error;
    }
  },

  // Marquer un texte comme consulté
  markAsViewed: async (id) => {
    try {
      await api.post(`${API_ENDPOINTS.texts}/${id}/view`);
    } catch (error) {
      console.error(`Erreur lors du marquage de consultation du texte ${id}:`, error);
    }
  },

  // Obtenir les catégories disponibles
  getCategories: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.categories);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      throw error;
    }
  },

  // Obtenir les statistiques des textes
  getStats: async () => {
    try {
      const response = await api.get(`${API_ENDPOINTS.stats}/texts`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }
};