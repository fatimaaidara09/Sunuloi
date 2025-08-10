const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

router.get('/', utilisateurController.getAll);
router.post('/', utilisateurController.create);

module.exports = router;
