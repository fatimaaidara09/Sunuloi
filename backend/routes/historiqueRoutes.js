const express = require('express');
const router = express.Router();
const historiqueController = require('../controllers/historiqueController');

router.get('/', historiqueController.getAll);
router.post('/', historiqueController.create);

module.exports = router;
