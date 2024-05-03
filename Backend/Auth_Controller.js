const bcrypt = require('bcrypt');
const User = require('./User');
const jwt = require('jsonwebtoken');

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
        });

        // Save the new user to the database
        await newUser.save();
        console.log("bb. ", newUser._id.toString(), typeof newUser._id.toString());
        // Create JWT with user ID and name
        const token = jwt.sign({ userId: newUser._id.toString(), name: newUser.username }, 'your_secret_key', { expiresIn: '4h' });
        const userid = newUser._id.toString();
        // Return token in response
        return res.status(201).json({ token, message: 'User registered successfully'+' '+newUser._id, userId: userid });
        
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
// to complete tomorrow use context api and find user by id wla by name li deja endi 
exports.login = async (req, res) => {
    const { email, password,difficulty } = req.body;

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

        // Create JWT with user ID and name
        const token = jwt.sign({ userId: user._id.toString(), name: user.username }, 'your_secret_key', { expiresIn: '4h' });
        // Return token in response
        return res.status(200).json({ token, message: 'Connected successfully :', name: user.username,difficulty:user.difficulty });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
};
// controllers/userController.js
exports.updateDifficulty = async (req, res) => {
    const { userId, difficulty } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the difficulty field
        user.difficulty = difficulty;
        await user.save();

        return res.status(200).json({ message: 'Difficulty updated successfully', difficulty: user.difficulty });
    } catch (error) {
        console.error('Error updating difficulty backend :', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

