require("dotenv").config();
const generateOTP = require("../Funtion/otp.js");
const User = require("../models/user");
const mail = require("../Funtion/mail.js");
const jwt = require("jsonwebtoken");
// create a new user  //otp port 
const secretKey = process.env.SECRE_TKEY;
const createUser = async (req, res) => {
  try {
    const { email, password, user } = req.body;
    const username = email.split("@")[0];
    const findEmail = await User.find({ email });
    console.log(findEmail);
    // if user exist but not varifyed
    if (!findEmail.length <= 0 && !findEmail.valid) {
      const otp = generateOTP(6);
      //sending otp to existing user
      mail(email, { otp, username, user }).catch((error) => {
        console.error("OTP sending error:", error);
        return res.status(500).send({ message: "OTP sending error" });
      });

      const updateUser = await User.findOneAndUpdate(
        { email },
        { username, email, otp, password }
      );
      console.log("upated", updateUser);
      return res.status(201).send({ message: "otp sent" });
    }
    //if user is not availble
    if (findEmail.length <= 0) {
      const otp = generateOTP(6);
      mail(email, { otp, username, user }).catch(console.error);
      const newUser = new User({ email, password, username, otp }); // Create a new User instance
      console.log(newUser);
      await newUser.save(); //Save the new user to the database
      const responseData = {
        id: newUser._id, //Assuming id is the identifier field
        email: newUser.email,
        username: newUser.username,
        createdAt: newUser.createdAt,
      };
      // Create a JWT token
      const token = jwt.sign(responseData, secretKey, { expiresIn: "24h" });
      res.status(201).send({ message: "otp sent", token: token, username }); // Send the created user as the response
    } else {
      res.status(409).send({ message: "User already exist" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message }); // Handle errors
  }
};

     
//varify otp 
const varifyOTP=async (req, res) => {
  try {
      const { otp, email } = req.body;
      const user = await User.findOne({ email });
      
      if (user && user.otp === otp) {
          const updatedUser = await User.findOneAndUpdate({ email }, { otp: generateOTP(10), valid: true });
          console.log(updatedUser.otp, otp);
          
          const responseData = {
              id: user._id, // Assuming id is the identifier field
              email: user.email,
              username: user.username,
              createdAt: user.createdAt,
          };
  
          const tokenExpiration = 6 * 30 * 24 * 60 * 60; // 6 months in seconds

          const token = jwt.sign(responseData, secretKey, { expiresIn: tokenExpiration });

          return res.status(200).send({ message: "valid", token });
      } else {
          return res.status(404).send({ message: "otp is not valid" });
      }
  } catch (error) {
      console.error("Error in /varify route:", error);
      return res.status(500).send({ message: "An error occurred while processing the request" });
  }
}

//login route

const login=async(req,res)=>{
  try{
      const {email,password}=req.body;
      if(email&&password){
          const user=await User.findOne({email})
          if(user){
              if(user.password==password){
                  const responseData = {
                      id: user._id, // Assuming id is the identifier field
                      email: user.email,
                      username: user.username,
                      createdAt: user.createdAt,
                  };
                  const tokenExpiration = 6 * 30 * 24 * 60 * 60; // 6 months in seconds
                  const token = jwt.sign(responseData, secretKey, { expiresIn: tokenExpiration });
                  return res.status(200).send({message:"valid user",token,username:user.username})
              }else{
                  return res.send({message:"password is not valid"})
              }
          }else{
              return res.send({message:"email note fond"})
          }
      }else{res.send({message:"email and password required"})}
  }catch(err){res.send({message:err})}
}


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

module.exports = {login, createUser,varifyOTP, getUser, deleteUser, updateUser, getUsers };
