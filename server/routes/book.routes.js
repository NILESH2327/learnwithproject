const express = require('express');
const { handlebookstorecontroller ,handlebooklistcontroller,handlebookDeletecontroller,handlebookUpdatecontroller} = require('../controller/book.controller');

const router = express.Router();
// http://localhost:8000/book/addbook
router.post('/addbook',handlebookstorecontroller)
router.get('/booklists',handlebooklistcontroller)
router.post('/deletebook',handlebookDeletecontroller);
router.put('/updatebook',handlebookUpdatecontroller);
module.exports= router;
