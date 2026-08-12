const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req,res,next) => {
    try{const {token} = req.cookies;
    if(!token){
        throw new Error("Token is not present");
    }
    const decoded = jwt.verify(token, "vk@devtinder#1234");
    const user = await User.findOne({emailId: decoded.emailId});
    if(!user){
        throw new Error("User is not present");
    }
    req.body = user;
    next();
    }    
    catch(err){
        res.status(400).send("ERROR:" + err.message)
    }
 }
module.exports = {userAuth}