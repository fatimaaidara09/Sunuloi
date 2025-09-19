const express = require('express');
const router = express.Router();
const comparateurController = require('../controllers/comparateurController');
const auth = require('../middleware/auth');
const { validateComparison } = require('../middleware/validation');

// GET /api/comparateur/comparisons
router.get('/comparisons', auth, comparateurController.getUserComparisons);

// GET /api/comparateur/comparisons/:id
router.get('/comparisons/:id', comparateurController.getComparisonById);

// POST /api/comparateur/compare
router.post('/compare', auth, validateComparison, comparateurController.createComparison);

// PUT /api/comparateur/comparisons/:id
router.put('/comparisons/:id', auth, comparateurController.updateComparison);

// DELETE /api/comparateur/comparisons/:id
router.delete('/comparisons/:id', auth, comparateurController.deleteComparison);

// POST /api/comparateur/comparisons/:id/share
router.post('/comparisons/:id/share', auth, comparateurController.shareComparison);

// GET /api/comparateur/shared/:token
router.get('/shared/:token', comparateurController.getSharedComparison);

module.exports = router;
