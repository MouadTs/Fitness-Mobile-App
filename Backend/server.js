// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Auth_Routes');
const cors = require('cors');

const app = express();

// Apply CORS middleware before defining routes
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect( 'mongodb+srv://mouadisma655:5wooRTFvGCqMztrM@cluster0.6qimisa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
