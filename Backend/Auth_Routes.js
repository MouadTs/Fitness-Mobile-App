const express = require('express');
const router = express.Router();
const authController = require('./Auth_Controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/difficulty', authController.updateDifficulty);
router.post('/uploadProfilePicture', authController.upload.single('profilePicture'), authController.uploadProfilePicture);

module.exports = router;
