const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const {
  createStockMovement,
  getCurrentStock,
} = require('../controllers/stockMovementController');

router.use(authenticateUser);

router.post('/', createStockMovement);

router.get('/:productId', getCurrentStock);

module.exports = router;
