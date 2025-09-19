// legal-app-backend/routes/texts.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/textController');

router.get('/', controller.getTexts);
router.get('/:id', controller.getTextById);
router.post('/', controller.createText);

module.exports = router;
