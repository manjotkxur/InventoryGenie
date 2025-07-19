const { queryGroq } = require('../utils/groqClient');
const { executeSQL } = require('../utils/sqlRunner');
const db = require('../db');

const resolveFiltersFromPrompt = async (prompt, filters = {}) => {
  const lowerPrompt = prompt.toLowerCase();
  const today = new Date();
  const formatDate = (d) => d.toISOString().split('T')[0];

  const locRes = await db.query("SELECT id, name FROM locations");
  for (const loc of locRes.rows) {
    if (lowerPrompt.includes(loc.name.toLowerCase())) {
      filters.locationId = loc.id;
      break;
    }
  }

  const catRes = await db.query("SELECT id, name FROM categories");
  for (const cat of catRes.rows) {
    if (lowerPrompt.includes(cat.name.toLowerCase())) {
      filters.categoryId = cat.id;
      break;
    }
  }

  const supRes = await db.query("SELECT id, name FROM suppliers");
  for (const sup of supRes.rows) {
    if (lowerPrompt.includes(sup.name.toLowerCase())) {
      filters.supplierId = sup.id;
      break;
    }
  }

  const prodRes = await db.query("SELECT id, name FROM products");
  for (const prod of prodRes.rows) {
    if (lowerPrompt.includes(prod.name.toLowerCase())) {
      filters.productId = prod.id;
      break;
    }
  }

  if (lowerPrompt.includes("last 3 days")) {
    const start = new Date(today);
    start.setDate(today.getDate() - 3);
    filters.startDate = formatDate(start);
    filters.endDate = formatDate(today);
  }

  if (lowerPrompt.includes("last 7 days")) {
    const start = new Date(today);
    start.setDate(today.getDate() - 7);
    filters.startDate = formatDate(start);
    filters.endDate = formatDate(today);
  }

  if (lowerPrompt.includes("yesterday")) {
    const y = new Date(today);
    y.setDate(today.getDate() - 1);
    const yStr = formatDate(y);
    filters.startDate = yStr;
    filters.endDate = yStr;
  }

  if (lowerPrompt.includes("today")) {
    const todayStr = formatDate(today);
    filters.startDate = todayStr;
    filters.endDate = todayStr;
  }

  return filters;
};

const handleAIQuery = async (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const { prompt, filters: baseFilters = {}, groupBy = '' } = req.body;

    const filters = await resolveFiltersFromPrompt(prompt, baseFilters);


    let fullPrompt = `
Generate a minimal, safe PostgreSQL SELECT query for the following inventory schema.
- Avoid SELECT *.
- Use INNER JOINs with aliases:
  sm = stock_movements,
  p = products,
  s = suppliers,
  l = locations,
  c = categories.
- Always apply: user_id = ${userId}.
- Use WHERE clauses for filters if present.
- Use GROUP BY and ORDER BY if aggregating.
- Use LIMIT 1 if asking for top, best, highest, most.
- Use LIMIT 50 otherwise.

User prompt: "${prompt}".`;

    const filterClauses = [];

    if (filters.startDate && filters.endDate)
      filterClauses.push(`sm.created_at BETWEEN '${filters.startDate}' AND '${filters.endDate}'`);
    if (filters.locationId)
      filterClauses.push(`sm.location_id = ${filters.locationId}`);
    if (filters.categoryId)
      filterClauses.push(`p.category_id = ${filters.categoryId}`);
    if (filters.supplierId)
      filterClauses.push(`p.supplier_id = ${filters.supplierId}`);
    if (filters.productId)
      filterClauses.push(`p.id = ${filters.productId}`);

    if (filterClauses.length > 0)
      fullPrompt += `\nFilters to apply: ${filterClauses.join(', ')}.`;

    if (groupBy) {
      if (groupBy === 'category') fullPrompt += ` Group by c.name.`;
      else if (groupBy === 'location') fullPrompt += ` Group by l.name.`;
      else if (groupBy === 'supplier') fullPrompt += ` Group by s.name.`;
      else fullPrompt += ` Group by ${groupBy}.`;
    }

    let sqlQuery = await queryGroq(fullPrompt, userId, filters, groupBy);
    sqlQuery = sqlQuery.trim();

    if (!/limit\s+\d+/i.test(sqlQuery)) {
      sqlQuery += ' LIMIT 50';
    }

    const result = await executeSQL(sqlQuery);

    return res.status(200).json({
      query: sqlQuery,
      result,
    });

  } catch (err) {
    console.error('AI Query Error:', err.message);
    return res.status(500).json({
      message: 'Server error during AI query',
      error: err.message,
    });
  }
};

module.exports = { handleAIQuery };
