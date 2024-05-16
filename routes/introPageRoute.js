const express=require("express")
const introPageRoute=express.Router();
const Page=require('../models/page');
introPageRoute.get('/',async(req, res) => {
    try{
      const email="jacklinuxnd@gmail.com"
      const data=await Page.findOne({email})
      console.log(data)
    //   res.render('index',{data})
res.send(data.data)  
    }catch(err){
      console.log(err)
  res.send({err})
    }
  
  });




//get the page data HTML
introPageRoute.get('/pages',async(req,res)=>{
    const page=await Page.find()
    console.log("hit the page",page)
  res.send(page);
  
  })

//to set the string in page which is HTML
introPageRoute.post("/set", async (req, res) => {
    try {
      const { data, email } = req.body;
      
      // Find a page with the given email
      const existingPage = await Page.findOne({ email });
  
      if (existingPage) {
        // If a page with the email exists, update it
        const updatedPage = await Page.findOneAndUpdate({ email }, { data, email }, { new: true });
        console.log("Updated page:", updatedPage);
        return res.send({ message: "Page updated", page: updatedPage });
      } else {
        // If no page with the email exists, create a new one
        const newPage = await Page.create({ data, email });
        console.log("New page created:", newPage);
        return res.send({ message: "New page created", page: newPage });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "An error occurred" });
    }
  });
  
  




module.exports=introPageRoute;