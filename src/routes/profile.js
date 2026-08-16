const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const {validateProfileEditData} = require("../utils/validateLoginData");

profileRouter.get("/profile/view", userAuth, async(req,res) => {
    try{
    const User = req.body;
    res.send(User);
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message)
    }
})
 
profileRouter.patch("/profile/edit",userAuth, async(req,res)=>{
    (!validateProfileEditData(req)) ? res.status(400).send("Invalid Fields") : null;
    try{
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) =>
          (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        res.send("Profile Updated Successfully");
        
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message)
    }
})

module.exports = profileRouter;