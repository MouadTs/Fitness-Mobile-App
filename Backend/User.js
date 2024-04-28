const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    difficulty: { type: String, required: false, default: 'beginner' }
});

module.exports = mongoose.model('User', userSchema);
