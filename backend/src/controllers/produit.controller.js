const produitService = require('../services/produit.service');

// POST /produits - Créer un produit
exports.create = async (req, res) => {
  try {
    const { nom, description, prix, statut } = req.body;

    // Validation basique
    if (!nom || !description || !prix) {
      return res.status(400).json({ message: "Nom, description et prix sont requis" });
    }

    // Créer le produit via le service
    const newProduct = await produitService.createProduct(
      req.user.id, // ID de l'utilisateur authentifié
      { nom, description, prix, statut }
    );

    return res.status(201).json({
      message: "Produit créé avec succès",
      produit: newProduct
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: "Erreur serveur",
      error: error.message 
    });
  }
};

// GET /produits/:id - Lire un produit par id
exports.findById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID requis" });
    }

    const produit = await produitService.getProductById(id);

    return res.status(200).json({
      message: "Produit trouvé",
      produit: produit
    });

  } catch (error) {
    console.error(error);
    return res.status(404).json({ 
      message: "Produit non trouvé",
      error: error.message 
    });
  }
};

// GET /produits - Lister tous les produits (public)
exports.findAll = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const produits = await produitService.getAllProducts(limit, offset);

    return res.status(200).json({
      message: "Produits récupérés",
      produits: produits,
      pagination: { limit, offset }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /produits/vendor/:vendeurId - Produits d'un vendeur spécifique
exports.findByVendorId = async (req, res) => {
  try {
    const { vendeurId } = req.params;

    if (!vendeurId) {
      return res.status(400).json({ message: "Vendeur ID requis" });
    }

    const produits = await produitService.getProductsByVendor(req.user.id, vendeurId);

    return res.status(200).json({
      message: "Produits du vendeur récupérés",
      produits: produits
    });

  } catch (error) {
    console.error(error);
    return res.status(403).json({ 
      message: "Accès refusé",
      error: error.message 
    });
  }
};

// GET /produits/me - Mes produits (vendeur connecté)
exports.getMyProducts = async (req, res) => {
  try {
    const produits = await produitService.getProductsByVendor(req.user.id);

    return res.status(200).json({
      message: "Vos produits récupérés",
      produits: produits
    });

  } catch (error) {
    console.error(error);
    return res.status(403).json({ 
      message: "Accès refusé",
      error: error.message 
    });
  }
};

// PUT /produits/:id - Mettre à jour un produit
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, prix, statut } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID requis" });
    }

    const updatedProduct = await produitService.updateProduct(
      req.user.id,
      id,
      { nom, description, prix, statut }
    );

    return res.status(200).json({
      message: "Produit mis à jour",
      produit: updatedProduct
    });

  } catch (error) {
    console.error(error);
    return res.status(403).json({ 
      message: "Erreur mise à jour",
      error: error.message 
    });
  }
};

// PUT /produits/:id/stock - Mettre à jour le stock/prix d'un produit
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { prix, statut } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID requis" });
    }

    const updatedProduct = await produitService.updateProductStock(
      req.user.id,
      id,
      prix,
      statut
    );

    return res.status(200).json({
      message: "Stock/Prix mis à jour",
      produit: updatedProduct
    });

  } catch (error) {
    console.error(error);
    return res.status(403).json({ 
      message: "Erreur mise à jour stock",
      error: error.message 
    });
  }
};

// DELETE /produits/:id - Supprimer un produit
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID requis" });
    }

    const deletedProduct = await produitService.deleteProduct(req.user.id, id);

    return res.status(200).json({
      message: "Produit supprimé",
      produit: deletedProduct
    });

  } catch (error) {
    console.error(error);
    return res.status(403).json({ 
      message: "Erreur suppression",
      error: error.message 
    });
  }
};

// GET /produits/search - Rechercher des produits
exports.search = async (req, res) => {
  try {
    const { q: searchTerm, limit } = req.query;

    if (!searchTerm) {
      return res.status(400).json({ message: "Terme de recherche requis" });
    }

    const produits = await produitService.searchProducts(searchTerm, limit);

    return res.status(200).json({
      message: "Résultats de recherche",
      produits: produits,
      searchTerm: searchTerm
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur recherche" });
  }
};
