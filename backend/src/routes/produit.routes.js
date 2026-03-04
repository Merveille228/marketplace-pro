const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const produitController = require('../controllers/produit.controller');

// POST /produits - Créer un produit
router.post('/', authMiddleware, produitController.create);

// GET /produits - Lister tous les produits (public)
router.get('/', produitController.findAll);

// GET /produits/search - Rechercher des produits (public)
router.get('/search', produitController.search);

// GET /produits/me - Mes produits (vendeur connecté)
router.get('/me', authMiddleware, produitController.getMyProducts);

// GET /produits/vendor/:vendeurId - Produits d'un vendeur spécifique
router.get('/vendor/:vendeurId', authMiddleware, produitController.findByVendorId);

// GET /produits/:id - Lire un produit par id
router.get('/:id', produitController.findById);

// PUT /produits/:id - Mettre à jour un produit
router.put('/:id', authMiddleware, produitController.update);

// PUT /produits/:id/stock - Mettre à jour le stock/prix d'un produit
router.put('/:id/stock', authMiddleware, produitController.updateStock);

// DELETE /produits/:id - Supprimer un produit
router.delete('/:id', authMiddleware, produitController.delete);

module.exports = router;
