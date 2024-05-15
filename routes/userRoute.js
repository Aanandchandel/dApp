require("dotenv").config();
const generateOTP = require("../Funtion/otp.js");
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const User = require("../models/user"); // Import the User model
const secretKey = process.env.SECRE_TKEY;
const { login,createUser,varifyOTP, getUser, deleteUser, updateUser, getUsers } = require("../controllers/userController.js");
//login route
router.post('/login',login)
                    








// Route to create a new user
router.post('/otp', createUser);
//email password user required in body

//varify email otp
router.post('/varify',varifyOTP);
//email otp

// Route to get all users
router.get('/users', getUsers);

// Route to get a single user by ID
router.get('/users/:id', getUser);

// Route to update a user by ID
router.patch('/users/:id', updateUser);

// Route to delete a user by ID
router.delete('/users/:id', deleteUser);

module.exports = router;
