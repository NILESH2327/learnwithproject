const mongoose = require('mongoose');
const dotenv = require("dotenv");

const connectDB = async ()=>{
  
   mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connected to database")
   }).catch((err)=>{
    console.log("error connecting to database",err.message)
   })
  
  

};
module.exports= connectDB;
