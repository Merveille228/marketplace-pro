const pool = require('../db');
async function findAllUsers(limit = 5) {
  const query = `
    SELECT *
    FROM utilisateur
    LIMIT $1
  `;
  const result = await pool.query(query, [limit]);
  return result.rows;
}
module.exports = {
  findAllUsers
};