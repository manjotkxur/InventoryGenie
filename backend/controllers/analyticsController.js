const getTotalProducts = require('../services/analytics/getTotalProducts');
const getTotalCategories = require('../services/analytics/getTotalCategories');
const getTotalSuppliers = require('../services/analytics/getTotalSuppliers');
const getTotalLocations = require('../services/analytics/getTotalLocations');
const getStockPerProduct = require('../services/analytics/getStockPerProduct');
const getStockPerCategory = require('../services/analytics/getStockPerCategory');
const getStockPerLocation = require('../services/analytics/getStockPerLocation');
const getStockPerSupplier = require('../services/analytics/getStockPerSupplier');
const getLowStockProducts = require('../services/analytics/getLowStockProducts');
const getOutOfStockProducts = require('../services/analytics/getOutOfStockProducts');
const getTopStockedProducts = require('../services/analytics/getTopStockedProducts');
const getRecentMovements = require('../services/analytics/getRecentMovements');
const getMovementSummary = require('../services/analytics/getMovementSummary');
const getArchivedProducts = require('../services/analytics/getArchivedProducts');
const getMonthlyMovementStats = require('../services/analytics/getMonthlyMovementStats');
const getProductTurnoverRate = require('../services/analytics/getProductTurnoverRate');
const getTotalInventoryValue = require('../services/analytics/getTotalInventoryValue');
const getDashboardSummary = require('../services/analytics/getDashboardSummary');
const {
  getCategoryDistribution,
  getTopSellingProducts,
  getMonthlySalesGrowth
} = require('../services/analytics/charts');


// ✅ All wrapped as Express-safe handlers
module.exports = {
  getTotalProducts: async (req, res) => {
    try {
      const data = await getTotalProducts(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get total products', detail: err.message });
    }
  },

  getTotalCategories: async (req, res) => {
    try {
      const data = await getTotalCategories(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get total categories', detail: err.message });
    }
  },

  getTotalSuppliers: async (req, res) => {
    try {
      const data = await getTotalSuppliers(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get total suppliers', detail: err.message });
    }
  },

  getTotalLocations: async (req, res) => {
    try {
      const data = await getTotalLocations(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get total locations', detail: err.message });
    }
  },

  getStockPerProduct: async (req, res) => {
    try {
      const data = await getStockPerProduct(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get stock per product', detail: err.message });
    }
  },

  getStockPerCategory: async (req, res) => {
    try {
      const data = await getStockPerCategory(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get stock per category', detail: err.message });
    }
  },

  getStockPerLocation: async (req, res) => {
    try {
      const data = await getStockPerLocation(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get stock per location', detail: err.message });
    }
  },

  getStockPerSupplier: async (req, res) => {
    try {
      const data = await getStockPerSupplier(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get stock per supplier', detail: err.message });
    }
  },

  getLowStockProducts: async (req, res) => {
    try {
      const data = await getLowStockProducts(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get low stock products', detail: err.message });
    }
  },

  getOutOfStockProducts: async (req, res) => {
    try {
      const data = await getOutOfStockProducts(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get out of stock products', detail: err.message });
    }
  },

  getTopStockedProducts: async (req, res) => {
    try {
      const data = await getTopStockedProducts(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get top stocked products', detail: err.message });
    }
  },

  getRecentMovements: async (req, res) => {
    try {
      const data = await getRecentMovements(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get recent movements', detail: err.message });
    }
  },

  getMovementSummary: async (req, res) => {
    try {
      const data = await getMovementSummary(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get movement summary', detail: err.message });
    }
  },

  getArchivedProducts: async (req, res) => {
    try {
      const data = await getArchivedProducts(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get archived products', detail: err.message });
    }
  },

  getMonthlyMovementStats: async (req, res) => {
    try {
      const data = await getMonthlyMovementStats(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get monthly movement stats', detail: err.message });
    }
  },

  getProductTurnoverRate: async (req, res) => {
    try {
      const data = await getProductTurnoverRate(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get product turnover rate', detail: err.message });
    }
  },

  getTotalInventoryValue: async (req, res) => {
    try {
      const data = await getTotalInventoryValue(req.user.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get total inventory value', detail: err.message });
    }
  },

getDashboardSummary: async (req, res) => {
  try {
    const summary = await getDashboardSummary(req.user.id);
    console.log('📊 DASHBOARD SUMMARY:', summary);
    res.json(summary);
  } catch (err) {
    console.error('❌ Error in getDashboardSummary:', err.message);
    res.status(500).json({ message: 'Failed to fetch dashboard summary' });
  }
},

  getCategoryDistribution: async (req, res) => {
    try {
      const data = await getCategoryDistribution(req.user.id);  
      res.json(data);  
    } catch (err) {
      res.status(500).json({ error: 'Failed to get category distribution', detail: err.message });
    }
  },

  // Controller for Bar Chart: Top-Selling Products
  getTopSellingProducts: async (req, res) => {
    try {
      const data = await getTopSellingProducts(req.user.id);  // Calls business logic from charts.js
      res.json(data);  // Sends the data to the client
    } catch (err) {
      res.status(500).json({ error: 'Failed to get top-selling products', detail: err.message });
    }
  },

  // Controller for Line Chart: Monthly Sales Growth
  getMonthlySalesGrowth: async (req, res) => {
    try {
      const data = await getMonthlySalesGrowth(req.user.id);  // Calls business logic from charts.js
      res.json(data);  // Sends the data to the client
    } catch (err) {
      res.status(500).json({ error: 'Failed to get monthly sales growth', detail: err.message });
    }
  }
};
