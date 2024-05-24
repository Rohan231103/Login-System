const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/UserSchema');

exports.Register = async(req,res) => {
  try {
    const { name, email, phone, password, cpassword } = req.body;

    if(!name || !email || !phone || !password || !cpassword){
        return res.status(422).json({error: "Please Fill The Field Properly"});
    }

    const userExist = await User.findOne({ email: email });

    if(userExist){
        return res.status(422).json({ error: "Email already Exist"});
    }else if(password != cpassword){
        return res.status(422).json({ error: "Password Are Not Match"});
    }else{
        //const user = new User({name, email, phone, password, cpassword});

        const user = await User.create(req.body)
        await user.save();
    
        res.status(201).json({
            message: "User register Successfully",

            token: await user.generateAuthToken(), 
            userId: user._id.toString()
        })
    }
    
  } catch (error) {
    console.log(error);
  }
}

// exports.Register = (req,res) => {
//     const { name, email, phone, password, cpassword } = req.body

//     if(!name || !email || !phone || !password || !cpassword){
//         return res.status(422).json({error: "Please Fill The Field Properly"});
//     }

//    User.findOne({ email:email })
//    .then((userExist) => {
//         if(userExist) {
//             return res.status(422).json({error: "Email already Exist"});
//         }

//         const user = new User({name, email, phone, password, cpassword})

//         user.save().then(()=>{
//             res.status(201).json({
//                 message: "User Register Successfully"
//             });
//         }).catch((err) => res.status(500).json({
//             error: "Failed to Register"
//         }))
//    }).catch(err => {console.log(err);})
// }

exports.Login = async(req,res) => {
    try {
        let token;
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                error: "Please enter your email and password"
            })
        }

        const userLogin = await User.findOne({email:email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();

            if(!isMatch){
                res.status(400).json({
                    error:"Invalid Details"
                })
            }else{
                res.status(200).json({
                    message: "User Login Succesfully",
                    token: await userLogin.generateAuthToken(),
                    userId: userLogin._id.toString()
                })
            }
        }else{
            res.status(400).json({
                error:"Invalid Details"
            })
        }

       
    } catch (error) {
        console.log(error);
    }
}

exports.getData = async(req,res) => {
    try {
        res.send("Hello")
    } catch (error) {
        error
    }
}