const express = require("express");
const introPageRoute = express.Router();
const Page = require("../models/page");
const generateOTP = require("../Funtion/otp.js");
const mail = require("../Funtion/mail.js");





introPageRoute.get("/", async (req, res) => {
  try {
    const email = "jacklinuxnd@gmail.com";
    const data = await Page.findOne({ email });
    console.log(data);
    //   res.render('index',{data})
    if(data.data){
        res.send(data.data);
    }else{
        res.send("not found")
    }

  } catch (err) {
    console.log(err);
    res.send({ err });
  }
});

//get the page data HTML
introPageRoute.get("/pages", async (req, res) => {
  const page = await Page.find();
  console.log("hit the page", page);
  res.send(page);
});

//otp genrate
introPageRoute.get("/otp", async (req, res) => {
  try {
    const otp = generateOTP(6);
    const data = { user: "jsck", username: "jacklinuxnd@gmail.com", otp };
    const to = "jacklinuxnd@gmail.com";
    const mil = await mail("jacklinuxnd@gmail.com", data);
    const respdata = await Page.findOneAndUpdate({ email: to }, { otp });
    res.render("reset", { data });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//reset password

introPageRoute.post("/rpasswort", async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    console.log("getting body ", email, password, otp);
    const getotp = await Page.findOne({ email });
    console.log("getting otp", getotp);
    if (otp == getotp.otp) {
      const setpassword = await Page.findOneAndUpdate({ email }, { password });
      console.log("setting password", setpassword);
      return res.status(200).send({ message: "password changed" });
    }
    res.status(400).send({ message: "your otp is invalid" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server error" });
  }
});

//to set the string in page which is HTML
introPageRoute.post("/set", async (req, res) => {
  try {
    const { data, email, password } = req.body;

    // Find a page with the given email

    const existingPage = await Page.findOne({ email });
    if (existingPage) {
      // If a page with the email exists, update it

      //password chack
      if (existingPage.password==password) {
        const updatedPage = await Page.findOneAndUpdate({ email },{ data },{ new: true });
        console.log("Updated page:", updatedPage);
        return res.send({ message: "Page updated", page: updatedPage });
      }else{//if password in not valid
        return res.status(400).send({message:"password in invaild"})
      }
    } else {
      // If no page with the email exists, create a new one
      const newPage = await Page.create({ data, email,password });
      console.log("New page created:", newPage);
      return res.send({ message: "New page created", page: newPage });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "An error occurred" });
  }
});

module.exports = introPageRoute;
