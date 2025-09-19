// src/utils/constants.js
export const APP_CONFIG = {
  name: "JuriSénégal",
  description: "Plateforme officielle d'accès aux textes juridiques du Sénégal",
  version: "1.0.0",
  author: "République du Sénégal",
  contact: "info@jurisenega.sn",
  supportUrl: "https://support.jurisenega.sn"
};

// Vite: utiliser import.meta.env pour les variables d'environnement
export const API_ENDPOINTS = {
  // mettre dans .env (à la racine du projet frontend) : VITE_API_BASE_URL=http://localhost:5000/api
  base: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  texts: '/texts',
  search: '/search',
  categories: '/categories',
  auth: '/auth',
  admin: '/admin',
  maxLimit: 100
};

export const VALIDATION_RULES = {
  search: { minLength: 2, maxLength: 500 },
  password: { minLength: 8, requireUppercase: true, requireLowercase: true, requireNumbers: true }
};
