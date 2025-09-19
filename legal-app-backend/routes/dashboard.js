const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

// GET /api/dashboard
router.get('/', auth, dashboardController.getDashboardData);

// GET /api/dashboard/stats
router.get('/stats', auth, dashboardController.getStats);

// GET /api/dashboard/notifications
router.get('/notifications', auth, dashboardController.getNotifications);

// PUT /api/dashboard/notifications/:id/read
router.put('/notifications/:id/read', auth, dashboardController.markNotificationRead);

// GET /api/dashboard/favorites
router.get('/favorites', auth, dashboardController.getFavorites);

// POST /api/dashboard/favorites
router.post('/favorites', auth, dashboardController.addToFavorites);

// DELETE /api/dashboard/favorites/:id
router.delete('/favorites/:id', auth, dashboardController.removeFromFavorites);

// GET /api/dashboard/history
router.get('/history', auth, dashboardController.getSearchHistory);

// PUT /api/dashboard/settings
router.put('/settings', auth, dashboardController.updateSettings);

module.exports = router;

