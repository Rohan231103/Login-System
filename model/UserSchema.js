const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    phone:{
        type: Number,
        required : true
    },
    password:{
        type:String,
        required : true
    },
    cpassword:{
        type:String,
        required : true
    }
})

UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})


UserSchema.methods.generateAuthToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email
        },
        process.env.SECRET_KEY,
    );
        
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.model("User", UserSchema)
module.exports = User;