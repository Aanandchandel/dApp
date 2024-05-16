require("dotenv").config()
const serverless=require('serverless-http')
// Import required modules
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors")
const morgan = require('morgan');
const mongoose = require('mongoose');
const introPageRoute=require("./routes/introPageRoute.js")
const userRoutes =require("./routes/userRoute.js") 
// const mail=require("./Funtion/mail.js")
// const verifyUserToken=require("./middleware/__tknValidationUser.js")
// const verifyToken =require("./middleware/__tknValidationAdmin")

const e = require("express");
// Create Express app
const app = express();



// set the view engine to ejs
app.set('view engine', 'ejs');
// Set up middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(express.json());
app.use(morgan('dev')); // Log HTTP requests to the console



// warning defind routes after middellware
// Set Routes
// app.use('/api',userRoutes)
app.use("/.netlify/functions/api",introPageRoute)
// app.use(mail)



// Connect to MongoDB database
const DB_URL = process.env.DB_URL ;
mongoose.connect('mongodb://localhost/my_database', {
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});



const KEY=process.env.KEY
// Define routes
app.get('/setindex',(req, res) => {
  res.render('setindex')
  
});





// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


module.exports.handler=serverless(app)