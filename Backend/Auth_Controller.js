const bcrypt = require('bcrypt');
const User = require('./User');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// Set up multer for file upload
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: Storage });

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password with salt round 10
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            username: name,
            email,
            password: hashedPassword,
            profilePicture: '',
            weight: 0,
            calories:0,
            exerciseDates:[]

        });

        // Save the new user to the database
        await newUser.save();
        console.log("bb. ", newUser._id.toString(), typeof newUser._id.toString());
        
        // Create JWT with user ID and name
        const token = jwt.sign({ userId: newUser._id.toString(), name: newUser.username }, 'your_secret_key', { expiresIn: '4h' });
        const userid = newUser._id.toString();

        // Return token in response
        return res.status(201).json({ token, message: 'User registered successfully', userId: userid });
        
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed, email not found' });
        }

        // Check password using bcrypt.compare
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed, incorrect password' });
        }

        console.log('hahwa lid :', user.id);
        // Create JWT with user ID and name
        const token = jwt.sign({ userId: user._id.toString(), name: user.username }, 'your_secret_key', { expiresIn: '4h' });

        // Return token and user data in response
        return res.status(200).json({
            token,
            message: 'Connected successfully',
            user: {
                id: user._id,
                name: user.username,
                email: user.email,
                difficulty: user.difficulty,
                profilePicture: user.profilePicture, // Ensure profilePicture is included
                weight: user.weight,
                calories: user.calories,
                exerciseDates:user.exerciseDates,
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



exports.updateDifficulty = async (req, res) => {
    const { userId, difficulty } = req.body;

    try {
        // Convert userId to ObjectId type
        const userIdObject = new mongoose.Types.ObjectId(userId);

        // Find the user by ID
        const user = await User.findById(userIdObject);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the difficulty field
        user.difficulty = difficulty;
        await user.save();

        return res.status(200).json({ message: 'Difficulty updated successfully', difficulty: user.difficulty });
    } catch (error) {
        console.error('Error updating difficulty:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.uploadProfilePicture = async (req, res) => {
    const { userId } = req.body;

    try {
        // Convert userId to ObjectId type
        const userIdObject = new mongoose.Types.ObjectId(userId);

        const user = await User.findById(userIdObject);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.file) {
            user.profilePicture = `/uploads/${req.file.filename}`;
            await user.save();
            return res.status(200).json({ success: true, profilePictureUrl: user.profilePicture });
        } else {
            return res.status(400).json({ message: 'No file uploaded' });
        }
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.Weight = async (req, res) => {
    const { userId, weight } = req.body;

    try {
        // Convert userId to ObjectId type
        const userIdObject = new mongoose.Types.ObjectId(userId);

        // Find the user by ID
        const user = await User.findById(userIdObject);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the weight field
        user.weight = weight;
        await user.save();

        // Return the user object with the updated weight in the response
      
        return res.status(200).json({ message: 'Weight saved successfully', weight: user.weight });
    } catch (error) {
        console.error('Error updating weight:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.Calories = async (req, res) => {
    const { userId, calories } = req.body;

    try {
        // Convert userId to ObjectId type
        const userIdObject = new mongoose.Types.ObjectId(userId);

        // Find the user by ID
        const user = await User.findById(userIdObject);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the calories field
        user.calories = parseInt(user.calories) + parseInt(calories);
        await user.save();

        // Return the user object in the response
        return res.status(200).json({ message: 'calories saved successfully',calories: user.calories });
    } catch (error) {
        console.error('Error updating calories:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.addExerciseDate = async (req, res) => {
    const { userId } = req.body;

    try {
        // Convert userId to ObjectId type
        const userIdObject = new mongoose.Types.ObjectId(userId);

        // Find the user by ID
        const user = await User.findById(userIdObject);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add the current date to the exerciseDates array
        user.exerciseDates.push(new Date());
        await user.save();

        return res.status(200).json({ message: 'Exercise date added successfully', exerciseDates: user.exerciseDates });
    } catch (error) {
        console.error('Error adding exercise date:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



// Export the multer upload instance
exports.upload = upload;
