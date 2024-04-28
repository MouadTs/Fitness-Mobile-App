// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('./Auth_Controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/difficulty', authController.updateDifficulty);


module.exports = router;
