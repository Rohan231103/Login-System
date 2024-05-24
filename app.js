const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

var app = express();
app.use(express.json());

dotenv.config({path: './.env'});
require('./db/conn');
app.use(require('./router/user'));

var PORT = process.env.PORT;


app.listen(PORT, ()=>{
    console.log(`Server as running at PORT Number ${PORT}`);
})
