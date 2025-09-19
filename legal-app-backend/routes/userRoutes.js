const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const { validateUser } = require('../middleware/validation');

// GET /api/users (admin seulement)
router.get('/', auth, userController.getAll);

// GET /api/users/:id
router.get('/:id', auth, userController.getById);

// POST /api/users (admin seulement) 
router.post('/', auth, validateUser, userController.create);

// PUT /api/users/:id
router.put('/:id', auth, validateUser, userController.update);

// DELETE /api/users/:id
router.delete('/:id', auth, userController.delete);

// GET /api/users/:id/stats
router.get('/:id/stats', auth, userController.getUserStats);

module.exports = router;