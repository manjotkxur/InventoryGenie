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

// Apply authentication to all stock movement routes
router.use(authenticate);

// Create a new stock movement
router.post('/', createStockMovement);

// Get all stock movements
router.get('/', getAllStockMovements);

// Get a single stock movement by ID
router.get('/:id', getStockMovementById);

// Update a stock movement
router.put('/:id', updateStockMovement);

// Delete a stock movement
router.delete('/:id', deleteStockMovement);

// Get current stock level for a product
router.get('/stock/:productId', getCurrentStock);



module.exports = router;
