const groupByLocation = require('./groupers/groupByLocation');
const groupByCategory = require('./groupers/groupByCategory');
const groupBySupplier = require('./groupers/groupBySupplier');
const groupByProduct = require('./groupers/groupByProduct');
const pool = require('../../db');

const getInventoryReport = async (userId, filters, groupBy = 'product') => {
  let builder;

  switch (groupBy) {
    case 'location':
      builder = groupByLocation;
      break;
    case 'category':
      builder = groupByCategory;
      break;
    case 'supplier':
      builder = groupBySupplier;
      break;
    case 'product':
    default:
      builder = groupByProduct;
  }

  const { query, params } = builder(userId, filters);
  const result = await pool.query(query, params);
  return result.rows;
};

module.exports = getInventoryReport;
