const mongoose = require('mongoose');
var DB = process.env.DATABASE;


mongoose.connect(DB)
.catch((err) => {
    console.log(`Connection Failed !`);
})