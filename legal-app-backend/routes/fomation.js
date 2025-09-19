const express = require('express');
const router = express.Router();
const formationController = require('../controllers/formationController');
const auth = require('../middleware/auth');
const { validateFormation } = require('../middleware/validation');

// GET /api/formations
router.get('/', formationController.getAll);

// GET /api/formations/categories
router.get('/categories', formationController.getCategories);

// GET /api/formations/:id
router.get('/:id', formationController.getById);

// POST /api/formations (instructeur/admin)
router.post('/', auth, validateFormation, formationController.create);

// PUT /api/formations/:id
router.put('/:id', auth, formationController.update);

// DELETE /api/formations/:id
router.delete('/:id', auth, formationController.delete);

// POST /api/formations/:id/enroll (s'inscrire)
router.post('/:id/enroll', auth, formationController.enroll);

// POST /api/formations/:id/progress (progression)
router.post('/:id/progress', auth, formationController.updateProgress);

// GET /api/formations/:id/certificate
router.get('/:id/certificate', auth, formationController.getCertificate);

module.exports = router;