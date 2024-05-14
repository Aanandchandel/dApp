require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
// create a new user
const secretKey = process.env.SECRE_TKEY;
const createUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const findEmail = await User.find({ email });
    console.log(findEmail);
    if (findEmail.length <= 0) {
      const newUser = new User({ email, password, username }); // Create a new User instance
      await newUser.save(); // Save the new user to the database
      const responseData = {
        id: newUser._id, // Assuming id is the identifier field
        email: newUser.email,
        username: newUser.username,
        createdAt: newUser.createdAt,
      };

      // Create a JWT token
      const token = jwt.sign(responseData, secretKey, { expiresIn: "24h" });
      // try{}catch(err){}

      // / Enable CORS middleware
      // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
      // res.setHeader('Access-Control-Allow-Credentials', 'true');

      // Set a cookie in the response
      // res.setHeader('Set-Cookie', `jwt=${token}; HttpOnly; Max-Age=86400; Path=/`);

      res.status(201).send({ message: "done", token: token }); // Send the created user as the response
    } else {
      res.status(409).send({ message: "User already exist" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message }); // Handle errors
  }
};

//  Get all users

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a single user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { createUser, getUser, deleteUser, updateUser, getUsers };
