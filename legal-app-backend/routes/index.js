const express = require('express');
const router = express.Router();

// Import de toutes les routes
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const documentRoutes = require('./documentRoutes');
const categorieRoutes = require('./categorieRoutes');
const tagRoutes = require('./tagRoutes');
const commentaireRoutes = require('./commentaireRoutes');
const formationRoutes = require('./formationRoutes');
const forumRoutes = require('./forumRoutes');
const comparateurRoutes = require('./comparateurRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const notificationRoutes = require('./notificationRoutes');
const historiqueRoutes = require('./historiqueRoutes');

// Définition des routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/documents', documentRoutes);
router.use('/categories', categorieRoutes);
router.use('/tags', tagRoutes);
router.use('/commentaires', commentaireRoutes);
router.use('/formations', formationRoutes);
router.use('/forum', forumRoutes);
router.use('/comparateur', comparateurRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/notifications', notificationRoutes);
router.use('/historique', historiqueRoutes);

module.exports = router;