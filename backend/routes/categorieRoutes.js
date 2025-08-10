const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

router.get('/', categorieController.getAll);
router.post('/', categorieController.create);

module.exports = router;
