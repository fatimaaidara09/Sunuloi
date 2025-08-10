const express = require('express');
const router = express.Router();
const documentTagController = require('../controllers/documentTagController');

router.get('/', documentTagController.getAll);
router.post('/', documentTagController.create);

module.exports = router;
