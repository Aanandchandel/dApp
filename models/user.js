const mongoose = require('mongoose');

// Define the schema for the user model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the User model based on the userSchema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
