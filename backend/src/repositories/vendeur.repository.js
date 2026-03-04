const pool = require('../db');

// Trouver un vendeur par son ID utilisateur
exports.findByUserId = async (utilisateur_Id) => {
  const result = await pool.query(
    'SELECT * FROM vendeur WHERE utilisateur_id = $1',
    [utilisateur_Id]
  );

  return result.rows[0]; // undefined si pas trouvé
};

// Créer un nouveau vendeur
exports.create = async (utilisateur_Id, nom_Boutique, description_Boutique) => {
  const result = await pool.query(
    `INSERT INTO vendeur (utilisateur_id, nom_boutique, description_boutique, date_activation)
     VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
     RETURNING *`,
    [utilisateur_Id, nom_Boutique, description_Boutique]
  );

  return result.rows[0];
};

// Trouver un vendeur par son ID
exports.findById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM vendeur WHERE id = $1',
    [id]
  );

  return result.rows[0]; // undefined si pas trouvé
};

// Mettre à jour un vendeur
exports.update = async (id, nom_Boutique, description_Boutique) => {
  const result = await pool.query(
    `UPDATE vendeur 
     SET nom_boutique = $2, description_boutique = $3
     WHERE id = $1
     RETURNING *`,
    [id, nom_Boutique, description_Boutique]
  );

  return result.rows[0];
};

// Supprimer un vendeur
exports.delete = async (id) => {
  const result = await pool.query(
    'DELETE FROM vendeur WHERE id = $1 RETURNING *',
    [id]
  );

  return result.rows[0];
};
