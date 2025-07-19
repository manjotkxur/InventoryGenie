const express = require('express');
const router = express.Router();
const { signup, login, refresh, logout, getMe, updateProfile, profile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh-token', refresh);
router.post('/logout', logout);
router.get('/me', authMiddleware, getMe);
router.put('/update', authMiddleware, updateProfile);
router.get('/profile', authMiddleware, profile);

module.exports = router;
