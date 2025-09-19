// routes/api.js - Configuration des routes API pour SunuLoi

const express = require('express');
const router = express.Router();

// Middleware d'authentification
const authMiddleware = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Configuration du rate limiting
const searchLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par IP
  message: 'Trop de requêtes de recherche. Réessayez dans 15 minutes.'
});

const apiLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Limite d\'API atteinte. Réessayez dans 15 minutes.'
});