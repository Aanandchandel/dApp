require("dotenv").config()
// const express= require("express")
// const mail=express.Router()
const nodemailer=require("nodemailer")

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "jacklinuxnd@gmail.com", //sender gmail address
      pass: process.env.E_PASSWORD,//App password frome gmail account
    },
  });


  async function main(to,data) {
    console.log(process.env.USER)
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: {name:"Anand ",
    address:process.env.USER}, // sender address
      to: [to], // list of receivers
      subject: "OTP ✔", // Subject line
      text: "Youir otp is 12345678", // plain text body

      html:`<p>hello,${data.user} your username is </p>
      <h1>${data.username}</h1> 
      <p>and your OTP is ${data.otp}</p>`
      //  `<b>Hello your OTP is ${data.otp}  </b>,
      // <b>your username ${data.username}</b>` // html body
    }
    );
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }


// mail.get("/p",(req,res)=>{
//     res.send("ksdhfksadhfkahsd")
//     main("jacklinuxnd@gmail.com",10000).catch(console.error);

// })











module.exports=main;