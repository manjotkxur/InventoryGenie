const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const executeSQL = async (query) => {
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error('SQL execution error:', err.message);
    console.error('Query:', query);
    throw new Error('Failed to execute SQL query');
  }
};

module.exports = executeSQL;
