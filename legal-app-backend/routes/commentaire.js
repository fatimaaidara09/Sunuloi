const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaireController');
const auth = require('../middleware/auth');

// GET /api/commentaires
router.get('/', commentaireController.getAll);

// GET /api/commentaires/:id
router.get('/:id', commentaireController.getById);

// POST /api/commentaires
router.post('/', auth, commentaireController.create);

// PUT /api/commentaires/:id
router.put('/:id', auth, commentaireController.update);

// DELETE /api/commentaires/:id
router.delete('/:id', auth, commentaireController.delete);

// GET /api/commentaires/document/:documentId
router.get('/document/:documentId', commentaireController.getByDocument);

module.exports = router;
