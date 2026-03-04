const pool = require('../db');

// Créer un produit
exports.create = async (nom, description, prix, vendeurId, statut = 'disponible') => {
  const result = await pool.query(
    `INSERT INTO produit (nom, description, prix, vendeur_id, statut, date_publication)
     VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
     RETURNING *`,
    [nom, description, prix, vendeurId, statut]
  );

  return result.rows[0];
};

// Trouver un produit par son ID
exports.findById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM produit WHERE id = $1',
    [id]
  );

  return result.rows[0]; // undefined si pas trouvé
};

// Trouver tous les produits d'un vendeur
exports.findByVendorId = async (vendeurId) => {
  const result = await pool.query(
    'SELECT * FROM produit WHERE vendeur_id = $1 ORDER BY date_publication DESC',
    [vendeurId]
  );

  return result.rows; // tableau (peut être vide)
};

// Mettre à jour le stock d'un produit
exports.updateStock = async (id, nouveauPrix, nouveauStatut) => {
  const result = await pool.query(
    `UPDATE produit 
     SET prix = $2, statut = $3
     WHERE id = $1
     RETURNING *`,
    [id, nouveauPrix, nouveauStatut]
  );

  return result.rows[0]; // undefined si pas trouvé
};

// Mettre à jour un produit complet
exports.update = async (id, nom, description, prix, statut) => {
  const result = await pool.query(
    `UPDATE produit 
     SET nom = $2, description = $3, prix = $4, statut = $5
     WHERE id = $1
     RETURNING *`,
    [id, nom, description, prix, statut]
  );

  return result.rows[0]; // undefined si pas trouvé
};

// Supprimer un produit
exports.delete = async (id) => {
  const result = await pool.query(
    'DELETE FROM produit WHERE id = $1 RETURNING *',
    [id]
  );

  return result.rows[0]; // undefined si pas trouvé
};

// Trouver tous les produits (pour la page d'accueil)
exports.findAll = async (limit = 50, offset = 0) => {
  const result = await pool.query(
    `SELECT p.*, v.nom_boutique 
     FROM produit p 
     JOIN vendeur v ON p.vendeur_id = v.id 
     ORDER BY p.date_publication DESC 
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  return result.rows;
};

// Rechercher des produits par nom
exports.searchByName = async (searchTerm, limit = 20) => {
  const result = await pool.query(
    `SELECT p.*, v.nom_boutique 
     FROM produit p 
     JOIN vendeur v ON p.vendeur_id = v.id 
     WHERE p.nom ILIKE $1 
     ORDER BY p.date_publication DESC 
     LIMIT $2`,
    [`%${searchTerm}%`, limit]
  );

  return result.rows;
};

// Filtrer par statut
exports.findByStatus = async (statut, limit = 50) => {
  const result = await pool.query(
    `SELECT p.*, v.nom_boutique 
     FROM produit p 
     JOIN vendeur v ON p.vendeur_id = v.id 
     WHERE p.statut = $1 
     ORDER BY p.date_publication DESC 
     LIMIT $2`,
    [statut, limit]
  );

  return result.rows;
};
