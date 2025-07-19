const pool = require('../db');

const executeSQL = async (sql) => {
  try {
    const { rows } = await pool.query(sql);
    return rows;
  } catch (err) {
    console.error('SQL Execution Error:', err);
    throw new Error('Failed to execute SQL query');
  }
};

module.exports = { executeSQL };
