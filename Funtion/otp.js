const crypto = require('crypto');

function generateOTP(length) {
  const chars = '0123456789'; // Characters to include in the OTP
  let otp = '';

  for (let i = 0; i < length; i++) {
    const index = crypto.randomInt(0, chars.length); // Generate random index
    otp += chars[index]; // Append random character to OTP
  }

  return otp;
}


// const otp = generateOTP(6); // Generate a 6-digit OTP
// console.log("Generated OTP:", otp);
module.exports=generateOTP;