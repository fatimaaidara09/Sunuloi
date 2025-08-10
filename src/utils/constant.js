export const APP_CONFIG = {
  name: "JuriSénégal",
  description: "Plateforme officielle d'accès aux textes juridiques du Sénégal",
  version: "1.0.0",
  author: "République du Sénégal",
  contact: "info@jurisenega.sn",
  supportUrl: "https://support.jurisenega.sn"
};

export const API_ENDPOINTS = {
  base: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
  texts: '/texts',
  search: '/search',
  categories: '/categories',
  auth: '/auth',
  admin: '/admin',
  stats: '/stats'
};

export const USER_ROLES = {
  CITIZEN: 'citizen',
  PROFESSIONAL: 'professional',
  STUDENT: 'student',
  ADMIN: 'administrator',
  MODERATOR: 'moderator'
};

export const TEXT_STATUS = {
  ACTIVE: 'En vigueur',
  ABROGATED: 'Abrogé',
  SUSPENDED: 'Suspendu',
  DRAFT: 'Projet'
};

export const PAGINATION = {
  defaultLimit: 12,
  maxLimit: 100
};

export const VALIDATION_RULES = {
  search: {
    minLength: 2,
    maxLength: 500
  },
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true
  }
};