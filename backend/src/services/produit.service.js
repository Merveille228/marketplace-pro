const produitRepository = require('../repositories/produit.repository');
const vendeurRepository = require('../repositories/vendeur.repository');
const userRepository = require('../repositories/user.repository');

// Créer un produit (sécurisé)
exports.createProduct = async (userId, productData) => {
  try {
    // 1. Vérifier que l'utilisateur existe
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // 2. Vérifier qu'il est vendeur
    const vendor = await vendeurRepository.findByUserId(userId);
    if (!vendor) {
      throw new Error('Utilisateur n\'est pas vendeur - accès refusé');
    }

    // 3. Validation des données
    const { nom, description, prix, statut } = productData;
    
    if (!nom || !description || !prix) {
      throw new Error('Nom, description et prix sont requis');
    }

    if (prix <= 0) {
      throw new Error('Le prix doit être supérieur à 0');
    }

    // 4. Créer le produit avec le vendeur_id
    const newProduct = await produitRepository.create(
      nom,
      description,
      parseFloat(prix),
      vendor.id, // vendeur_id récupéré du vendeur
      statut || 'disponible'
    );

    return newProduct;

  } catch (error) {
    throw error;
  }
};

// Obtenir un produit par son ID
exports.getProductById = async (productId) => {
  try {
    const product = await produitRepository.findById(productId);
    
    if (!product) {
      throw new Error('Produit non trouvé');
    }

    return product;

  } catch (error) {
    throw error;
  }
};

// Obtenir tous les produits d'un vendeur (avec vérification)
exports.getProductsByVendor = async (userId, vendorId = null) => {
  try {
    // Si vendorId n'est pas fourni, on utilise celui de l'utilisateur connecté
    let targetVendorId = vendorId;
    
    if (!targetVendorId) {
      const vendor = await vendeurRepository.findByUserId(userId);
      if (!vendor) {
        throw new Error('Utilisateur n\'est pas vendeur');
      }
      targetVendorId = vendor.id;
    }

    const products = await produitRepository.findByVendorId(targetVendorId);
    return products;

  } catch (error) {
    throw error;
  }
};

// Mettre à jour un produit (sécurisé)
exports.updateProduct = async (userId, productId, updateData) => {
  try {
    // 1. Vérifier que l'utilisateur est vendeur
    const vendor = await vendeurRepository.findByUserId(userId);
    if (!vendor) {
      throw new Error('Utilisateur n\'est pas vendeur');
    }

    // 2. Vérifier que le produit existe
    const product = await produitRepository.findById(productId);
    if (!product) {
      throw new Error('Produit non trouvé');
    }

    // 3. Vérifier que le produit appartient au vendeur
    if (product.vendeur_id !== vendor.id) {
      throw new Error('Ce produit ne vous appartient pas');
    }

    // 4. Validation des données
    const { nom, description, prix, statut } = updateData;
    
    if (prix && prix <= 0) {
      throw new Error('Le prix doit être supérieur à 0');
    }

    // 5. Mettre à jour le produit
    const updatedProduct = await produitRepository.update(
      productId,
      nom || product.nom,
      description || product.description,
      prix ? parseFloat(prix) : product.prix,
      statut || product.statut
    );

    return updatedProduct;

  } catch (error) {
    throw error;
  }
};

// Mettre à jour le stock/prix d'un produit (sécurisé)
exports.updateProductStock = async (userId, productId, nouveauPrix, nouveauStatut) => {
  try {
    // 1. Vérifier que l'utilisateur est vendeur
    const vendor = await vendeurRepository.findByUserId(userId);
    if (!vendor) {
      throw new Error('Utilisateur n\'est pas vendeur');
    }

    // 2. Vérifier que le produit existe et appartient au vendeur
    const product = await produitRepository.findById(productId);
    if (!product) {
      throw new Error('Produit non trouvé');
    }

    if (product.vendeur_id !== vendor.id) {
      throw new Error('Ce produit ne vous appartient pas');
    }

    // 3. Validation du prix
    if (nouveauPrix && nouveauPrix <= 0) {
      throw new Error('Le prix doit être supérieur à 0');
    }

    // 4. Mettre à jour
    const updatedProduct = await produitRepository.updateStock(
      productId,
      nouveauPrix ? parseFloat(nouveauPrix) : product.prix,
      nouveauStatut || product.statut
    );

    return updatedProduct;

  } catch (error) {
    throw error;
  }
};

// Supprimer un produit (sécurisé)
exports.deleteProduct = async (userId, productId) => {
  try {
    // 1. Vérifier que l'utilisateur est vendeur
    const vendor = await vendeurRepository.findByUserId(userId);
    if (!vendor) {
      throw new Error('Utilisateur n\'est pas vendeur');
    }

    // 2. Vérifier que le produit existe et appartient au vendeur
    const product = await produitRepository.findById(productId);
    if (!product) {
      throw new Error('Produit non trouvé');
    }

    if (product.vendeur_id !== vendor.id) {
      throw new Error('Ce produit ne vous appartient pas');
    }

    // 3. Supprimer le produit
    const deletedProduct = await produitRepository.delete(productId);
    return deletedProduct;

  } catch (error) {
    throw error;
  }
};

// Obtenir tous les produits (public)
exports.getAllProducts = async (limit = 50, offset = 0) => {
  try {
    const products = await produitRepository.findAll(limit, offset);
    return products;
  } catch (error) {
    throw error;
  }
};

// Rechercher des produits (public)
exports.searchProducts = async (searchTerm, limit = 20) => {
  try {
    const products = await produitRepository.searchByName(searchTerm, limit);
    return products;
  } catch (error) {
    throw error;
  }
};
