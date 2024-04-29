const express = require('express');
const router = express.Router();
const User = require("../models/user"); // Import the User model

const { createUser, getUser, deleteUser, updateUser, getUsers } = require("../controllers/userController.js");

// Route to create a new user
router.post('/users', createUser);

// Route to get all users
router.get('/users', getUsers);

// Route to get a single user by ID
router.get('/users/:id', getUser);

// Route to update a user by ID
router.patch('/users/:id', updateUser);

// Route to delete a user by ID
router.delete('/users/:id', deleteUser);

module.exports = router;
