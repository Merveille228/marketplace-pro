const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const vendeurController = require('../controllers/vendeur.controller');

// POST /vendeurs - Créer un vendeur
router.post('/', authMiddleware, vendeurController.create);

// GET /vendeurs/:id - Lire un vendeur par id
router.get('/:id', authMiddleware, vendeurController.findById);

// GET /vendeurs/user/:userId - Lire vendeur via utilisateur
router.get('/user/:userId', authMiddleware, vendeurController.findByUserId);

// PUT /vendeurs/:id - Mettre à jour un vendeur
router.put('/:id', authMiddleware, vendeurController.update);

// DELETE /vendeurs/:id - Supprimer un vendeur
router.delete('/:id', authMiddleware, vendeurController.delete);

module.exports = router;
