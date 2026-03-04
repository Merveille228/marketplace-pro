const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      nom: user.nom, 
      email: user.email, 
      role: user.role 
    },
    process.env.JWT_SECRET || 'votre_secret_par_defaut',
    { expiresIn: '24h' }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'votre_secret_par_defaut');
};

module.exports = {
  generateToken,
  verifyToken
};
