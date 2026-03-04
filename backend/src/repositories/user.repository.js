const pool = require('../db');


exports.createUser = async (nom, email, passwordHash, role, telephone) => {
  const result = await pool.query(
    `INSERT INTO utilisateur (nom, email, password_hash, role,telephone)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, nom, email, role`,
    [nom, email, passwordHash, role, telephone]
  );

  return result.rows[0];
};

exports.findByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM utilisateur WHERE email = $1',
    [email]
  );

  return result.rows[0]; // undefined si pas trouvé
};

// Trouver un utilisateur par son ID
exports.findById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM utilisateur WHERE id = $1',
    [id]
  );

  return result.rows[0]; // undefined si pas trouvé
};
