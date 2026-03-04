const vendeurService = require('../services/vendeur.service');

// POST /vendeurs - Créer un vendeur
exports.create = async (req, res) => {
  try {
    const { nom_Boutique, description_Boutique } = req.body;
    const utilisateur_Id = req.user.id; // Utiliser l'ID de l'utilisateur authentifié

    // Vérification basique
    if (!nom_Boutique || !description_Boutique) {
      return res.status(400).json({ message: "nom_Boutique et description_Boutique sont requis" });
    }

    // Créer le vendeur via le service
    const newVendeur = await vendeurService.createVendor(
      utilisateur_Id,
      { nom_Boutique, description_Boutique }
    );

    return res.status(201).json({
      message: "Vendeur créé avec succès",
      vendeur: newVendeur
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /vendeurs/:id - Lire un vendeur par id via le service
exports.findById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID requis" });
    }

    const vendeur = await vendeurService.getVendorById(id);

    if (!vendeur) {
      return res.status(404).json({ message: "Vendeur non trouvé" });
    }

    return res.status(200).json({
      message: "Vendeur trouvé",
      vendeur: vendeur
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /vendeurs/user/:userId - Lire vendeur via utilisateur via le service
exports.findByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "UserID requis" });
    }

    const vendeur = await vendeurService.getVendorByUserId(userId);

    if (!vendeur) {
      return res.status(404).json({ message: "Aucun vendeur trouvé pour cet utilisateur" });
    }

    return res.status(200).json({
      message: "Vendeur trouvé",
      vendeur: vendeur
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT /vendeurs/:id - Mettre à jour un vendeur
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom_Boutique, description_Boutique } = req.body;

    if (!id || !nom_Boutique || !description_Boutique) {
      return res.status(400).json({ message: "ID et champs requis" });
    }

    // Mettre à jour un vendeur via le service
    const updatedVendeur = await vendeurService.updateVendor(
      id,
      req.user.id, // Utilisateur authentifié
      { nom_Boutique, description_Boutique }
    );

    if (!updatedVendeur) {
      return res.status(404).json({ message: "Vendeur non trouvé" });
    }

    return res.status(200).json({
      message: "Vendeur mis à jour",
      vendeur: updatedVendeur
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE /vendeurs/:id - Supprimer un vendeur
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID requis" });
    }

    // Supprimer un vendeur via le service
    const deletedVendeur = await vendeurService.deleteVendor(
      id,
      req.user.id // Utilisateur authentifié
    );

    if (!deletedVendeur) {
      return res.status(404).json({ message: "Vendeur non trouvé" });
    }

    return res.status(200).json({
      message: "Vendeur supprimé",
      vendeur: deletedVendeur
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
