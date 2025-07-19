const express = require('express');
const router = express.Router();

const authenticateUser = require('../middleware/authMiddleware');
const { handleAIQuery } = require('../controllers/aiController');

router.post('/query', authenticateUser, handleAIQuery);

module.exports = router;
