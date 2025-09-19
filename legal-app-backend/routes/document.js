const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateDocument } = require('../middleware/validation');

// GET /api/documents
router.get('/', documentController.getAll);

// GET /api/documents/search
router.get('/search', documentController.search);

// GET /api/documents/categories
router.get('/categories', documentController.getByCategory);

// GET /api/documents/:id
router.get('/:id', documentController.getById);

// POST /api/documents (protégé)
router.post('/', auth, upload.single('file'), validateDocument, documentController.create);

// PUT /api/documents/:id (protégé)
router.put('/:id', auth, validateDocument, documentController.update);

// DELETE /api/documents/:id (protégé)
router.delete('/:id', auth, documentController.delete);

// POST /api/documents/:id/download
router.post('/:id/download', documentController.download);

// GET /api/documents/:id/versions
router.get('/:id/versions', documentController.getVersions);

module.exports = router;
