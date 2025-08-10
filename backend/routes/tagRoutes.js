const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.get('/', tagController.getAll);
router.post('/', tagController.create);

module.exports = router;
