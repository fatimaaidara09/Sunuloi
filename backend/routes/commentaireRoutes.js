const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaireController');

router.get('/', commentaireController.getAll);
router.post('/', commentaireController.create);

module.exports = router;
