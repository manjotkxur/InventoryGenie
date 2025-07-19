const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const analyticsController = require('../controllers/analyticsController');

router.use(authenticateUser);

router.get('/total-products', analyticsController.getTotalProducts);
router.get('/total-categories', analyticsController.getTotalCategories);
router.get('/total-suppliers', analyticsController.getTotalSuppliers);
router.get('/total-locations', analyticsController.getTotalLocations);
router.get('/getDashboardSummary', analyticsController.getDashboardSummary); 

router.get('/stock-per-product', analyticsController.getStockPerProduct);
router.get('/stock-per-category', analyticsController.getStockPerCategory);
router.get('/stock-per-location', analyticsController.getStockPerLocation);
router.get('/stock-per-supplier', analyticsController.getStockPerSupplier);

router.get('/low-stock-products', analyticsController.getLowStockProducts);
router.get('/out-of-stock-products', analyticsController.getOutOfStockProducts);
router.get('/top-stocked-products', analyticsController.getTopStockedProducts);

router.get('/recent-movements', analyticsController.getRecentMovements);
router.get('/movement-summary', analyticsController.getMovementSummary);

router.get('/archived-products', analyticsController.getArchivedProducts);
router.get('/monthly-movement-stats', analyticsController.getMonthlyMovementStats);
router.get('/product-turnover-rate', analyticsController.getProductTurnoverRate);
router.get('/total-inventory-value', analyticsController.getTotalInventoryValue);

router.get('/chart/category-distribution', analyticsController.getCategoryDistribution);
router.get('/chart/top-products', analyticsController.getTopSellingProducts);
router.get('/chart/monthly-sales', analyticsController.getMonthlySalesGrowth);
module.exports = router;
