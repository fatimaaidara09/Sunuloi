// routes/lawRoutes.js
const express = require('express');
const router = express.Router();
const lawController = require('../controllers/lawController');

router.post('/laws', lawController.createLaw);
router.get('/laws', lawController.getAllLaws);
router.get('/laws/search', lawController.searchLaws);

module.exports = router;
