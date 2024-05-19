const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Import path for static file serving
const authRoutes = require('./Auth_Routes'); // Adjust the path to match the file structure
const cors = require('cors');

const app = express();

// Apply CORS middleware before defining routes
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://mouadisma655:5wooRTFvGCqMztrM@cluster0.6qimisa.mongodb.net/', {

})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
