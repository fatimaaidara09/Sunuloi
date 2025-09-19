const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');
const auth = require('../middleware/auth');

// GET /api/categories
router.get('/', categorieController.getAll);

// GET /api/categories/:id
router.get('/:id', categorieController.getById);

// POST /api/categories
router.post('/', auth, categorieController.create);

// PUT /api/categories/:id
router.put('/:id', auth, categorieController.update);

// DELETE /api/categories/:id
router.delete('/:id', auth, categorieController.delete);

// GET /api/categories/:id/documents
router.get('/:id/documents', categorieController.getDocuments);

module.exports = router;