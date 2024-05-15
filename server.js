require("dotenv").config()

// Import required modules
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors")
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes =require("./routes/userRoute.js") 
const mail=require("./Funtion/mail.js")
const verifyUserToken=require("./middleware/__tknValidationUser.js")
const verifyToken =require("./middleware/__tknValidationAdmin")
// Create Express app
const app = express();



// Set up middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(express.json());
app.use(morgan('dev')); // Log HTTP requests to the console



// warning defind routes after middellware
// Set Routes
app.use('/api',userRoutes)
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
app.get('/',verifyUserToken,(req, res) => {
  const token = req.user

  
  console.log(token) 
  res.status(200).json({hellow:"insta_Id:aanand_chandel_ "})
});

app.post('/',verifyUserToken, (req, res) => {
  console.log(req.user)
  console.log(req.body)

  res.status(200).json({message:"valid",username:`${req.user. username}`})

});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports=app