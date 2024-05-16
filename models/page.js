const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  data: { type: String, required: true },
  email: { type: String, required: true },
  otp: { type: String, required: true, default: null },
  password:{type:String,required:true}
});

const Page = mongoose.model("Page", pageSchema);
module.exports = Page;
