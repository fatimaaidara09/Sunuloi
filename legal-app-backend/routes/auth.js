const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validation');

// POST /api/auth/register
router.post('/register', validateRegister, authController.register);

// POST /api/auth/login  
router.post('/login', validateLogin, authController.login);

// POST /api/auth/logout
router.post('/logout', auth, authController.logout);

// GET /api/auth/me
router.get('/me', auth, authController.getProfile);

// PUT /api/auth/profile
router.put('/profile', auth, authController.updateProfile);

// POST /api/auth/forgot-password
router.post('/forgot-password', authController.forgotPassword);

// POST /api/auth/reset-password
router.post('/reset-password', authController.resetPassword);

module.exports = router;