require('dotenv').config({ path: '../.env' });
const express = require('express');
const pool = require('./db');
const userRoutes = require('./routes/user.routes');
const vendeurRoutes = require('./routes/vendeur.routes');
const produitRoutes = require('./routes/produit.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ strict: false }));

// Test de connexion DB
(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Connexion PostgreSQL établie');
    console.log('� Heure DB :', result.rows[0]);
  } catch (err) {
    console.error('❌ Test DB échoué', err);
  }
})();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/vendeurs', vendeurRoutes);
app.use('/api/produits', produitRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API Marketplace Pro - Backend' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
