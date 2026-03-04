const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const userController = require('../controllers/user.controller');

// POST /users/register
router.post('/register', userController.register);

// POST /users/login  
router.post('/login', userController.login);

// GET /users/profile (protégée)
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: "Accès autorisé",
    user: req.user
  });
});

module.exports = router;
