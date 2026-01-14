const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const bookRouter =require('./routes/book.routes');

const dbconnection = require('./database');

dbconnection();


const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
  res.send("Hello World");
})
app.use('/book',bookRouter);


app.listen(8000,()=>{
console.log("server is running on port 8000");
});