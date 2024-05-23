const express = require('express');
const router = express.Router();
const authController = require('./Auth_Controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/difficulty', authController.updateDifficulty);
router.post('/uploadProfilePicture', authController.upload.single('profilePicture'), authController.uploadProfilePicture);
router.post('/Weight', authController.Weight);
router.post('/Calories', authController.Calories);
router.post('/addExerciseDate',authController.addExerciseDate);

module.exports = router;
