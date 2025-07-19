const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const { getProductHistory } = require('../controllers/historyController');

router.use(authenticateUser);
router.get('/:productId', getProductHistory);

module.exports = router;