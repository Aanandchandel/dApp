require("dotenv").config()
const jwt = require('jsonwebtoken');
const KEY=process.env.SECRE_TKEY


// Middleware function to verify JWT token
const verifyUserToken = (req, res, next) => {
  // Extract token from headers
  const token = req.body.token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, KEY);

    // Attach user information to request object
    req.user = decoded; // Change to req.user
    console.log(`user ${decoded.id} logedin`)
    // Call next middleware or route handler
    next();
  } catch (error) {
    console.log(req.body.token,error)
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyUserToken;
