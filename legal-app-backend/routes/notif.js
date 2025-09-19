const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middleware/auth');

// GET /api/notifications
router.get('/', auth, notificationController.getAll);

// GET /api/notifications/unread-count
router.get('/unread-count', auth, notificationController.getUnreadCount);

// PUT /api/notifications/:id/read
router.put('/:id/read', auth, notificationController.markAsRead);

// PUT /api/notifications/mark-all-read
router.put('/mark-all-read', auth, notificationController.markAllAsRead);

// DELETE /api/notifications/:id
router.delete('/:id', auth, notificationController.delete);

module.exports = router;