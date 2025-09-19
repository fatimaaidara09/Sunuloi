const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const auth = require('../middleware/auth');

// GET /api/tags
router.get('/', tagController.getAll);

// GET /api/tags/:id
router.get('/:id', tagController.getById);

// POST /api/tags
router.post('/', auth, tagController.create);

// PUT /api/tags/:id
router.put('/:id', auth, tagController.update);

// DELETE /api/tags/:id
router.delete('/:id', auth, tagController.delete);

// GET /api/tags/popular
router.get('/popular', tagController.getPopular);

module.exports = router;