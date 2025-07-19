const express = require('express');
const router = express.Router();
const {
  createStockMovement,
  getAllStockMovements,
  getStockMovementById,
  updateStockMovement,
  deleteStockMovement,
  getCurrentStock,
} = require('../controllers/stockMovementController');
const authenticate = require('../middleware/authMiddleware');


router.use(authenticate);
router.post('/', createStockMovement);
router.get('/', getAllStockMovements);
router.get('/:id', getStockMovementById);
router.put('/:id', updateStockMovement);
router.delete('/:id', deleteStockMovement);
router.get('/stock/:productId', getCurrentStock);


module.exports = router;
