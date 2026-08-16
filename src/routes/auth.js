const express = require ('express');
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validateLoginData");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const saltRounds =10;

authRouter.post("/signup", async(req,res)=>{
    validateSignUpData(req);
    const {firstName,lastName,emailId,password} = req.body;
    try{
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({firstName,lastName,emailId,password:passwordHash});
    await user.save();
    res.send("User is added successfully!");
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message)
    }
})

authRouter.post("/login", async(req,res) => {
    const {emailId, password} = req.body;
    try{
        const user = await User.findOne({emailId: emailId});
        if(user){
         const isPasswordMatch =  await user.validatePassword(password);
         if(!isPasswordMatch){
            res.status(400).send("Invalid Credentials");
        }
        else{
            const token = await user.getjwtToken();
            res.cookie("token", token);
            res.send("Login Successful");
        }
        }
        else{
            res.status(404).send("Invalid Credentials");
        }
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message)
    }
})

authRouter.post("/logout" , (req,res) => {
    res.clearCookie("token");
    res.send("Logout Successfully");
})

authRouter.post("/forgot-password", async(req,res) =>{
    try{
        const {emailId} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            res.status(404).send("User is not present");
        }
        else{
            res.send("Password reset link is sent to your email");
        }
    }catch(err){
        res.status(400).send("ERROR:" + err.message)
    }
})

module.exports = authRouter;