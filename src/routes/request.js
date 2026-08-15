const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require("../middleware/auth");

 requestRouter.get("/request", userAuth, async(req,res) => {
    try{
    const User = req.body;
    res.send(User);
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message)
    }
})

module.exports = requestRouter;