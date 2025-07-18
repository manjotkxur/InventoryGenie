
const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../controllers/categoryController');
const authenticate = require('../middleware/authMiddleware');

router.get('/', authenticate, getAllCategories);

module.exports = router;
