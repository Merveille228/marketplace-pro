const vendeurRepository = require('../repositories/vendeur.repository');
const userRepository = require('../repositories/user.repository');

//Créer un vendeur
exports.createVendor = async (userId, vendorData) => {
  try {
    // Vérifier que l'utilisateur existe (on cherche par ID)
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Vérifier qu'il n'est pas déjà vendeur
    const existingVendor = await vendeurRepository.findByUserId(userId);
    if (existingVendor) {
      throw new Error('Utilisateur est déjà vendeur');
    }

    // Créer le vendeur
    const newVendor = await vendeurRepository.create(
      userId,
      vendorData.nom_Boutique,
      vendorData.description_Boutique
    );

    // (Optionnel) Mettre à jour le rôle utilisateur → "vendeur"
    // await userRepository.updateRole(userId, 'vendeur');

    return newVendor;

  } catch (error) {
    throw error;
  }
};

// Obtenir le vendeur d'un utilisateur
exports.getVendorByUserId = async (userId) => {
  try {
    const vendor = await vendeurRepository.findByUserId(userId);
    
    if (!vendor) {
      throw new Error('Aucun vendeur trouvé pour cet utilisateur');
    }

    return vendor;

  } catch (error) {
    throw error;
  }
};

// Obtenir un vendeur par son ID
exports.getVendorById = async (vendorId) => {
  try {
    const vendor = await vendeurRepository.findById(vendorId);
    
    if (!vendor) {
      throw new Error('Vendeur non trouvé');
    }

    return vendor;

  } catch (error) {
    throw error;
  }
};

// Mettre à jour un vendeur
exports.updateVendor = async (vendorId, userId, updateData) => {
  try {
    // Vérifier que le vendeur existe et appartient à l'utilisateur
    const existingVendor = await vendeurRepository.findById(vendorId);
    if (!existingVendor || existingVendor.utilisateur_id !== userId) {
      throw new Error('Vendeur non trouvé ou non autorisé');
    }

    const updatedVendor = await vendeurRepository.update(
      vendorId,
      updateData.nom_Boutique,
      updateData.description_Boutique
    );

    return updatedVendor;

  } catch (error) {
    throw error;
  }
};

// Supprimer un vendeur
exports.deleteVendor = async (vendorId, userId) => {
  try {
    // Vérifier que le vendeur existe et appartient à l'utilisateur
    const existingVendor = await vendeurRepository.findById(vendorId);
    if (!existingVendor || existingVendor.utilisateur_id !== userId) {
      throw new Error('Vendeur non trouvé ou non autorisé');
    }

    const deletedVendor = await vendeurRepository.delete(vendorId);
    return deletedVendor;

  } catch (error) {
    throw error;
  }
};
