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

        // Create JWT with user ID and name
        const token = jwt.sign({ userId: newUser._id, name: newUser.username }, 'your_secret_key', { expiresIn: '1h' });

        // Return token in response
        return res.status(201).json({ token, message: 'User registered successfully'+' '+newUser.username });
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

        // Create JWT with user ID and name
        const token = jwt.sign({ userId: user._id, name: user.username }, 'your_secret_key', { expiresIn: '1h' });

        // Return token in response
        return res.status(200).json({ token, message: 'Connected successfully', name: user.username });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};