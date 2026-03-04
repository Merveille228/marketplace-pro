const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository');
const { generateToken } = require('../utils/jwt.util');

exports.register = async (req, res) => {
  try {
    const { nom, email, password, role, telephone } = req.body;

    // Vérification basique
    if (!nom || !email || !password || !role || !telephone) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Mot de passe trop court" });
    }

    if (!['buyer', 'seller'].includes(role)) {
      return res.status(400).json({ message: "Rôle invalide" });
    }

    //Vérifier si email existe
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    //Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    //Créer utilisateur
    const newUser = await userRepository.createUser(
      nom,
      email,
      passwordHash,
      role,
      telephone
    );

    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: newUser
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Vérification basique
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // Vérifier si utilisateur existe
    const user = await userRepository.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    //Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Retourner utilisateur sans mot de passe
    const { password_hash, ...userWithoutPassword } = user;

    // Générer le token JWT
    const token = generateToken(userWithoutPassword);

    return res.status(200).json({
      message: "Connexion réussie",
      token: token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
