const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

 requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res) => {
    try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const isValidStatus = ["intrested","ignored"].includes(status);
    if(!isValidStatus){
        throw new Error("Invalid status type");
    }
    const existingRequest = await connectionRequestModel.findOne({$or: [{fromUserId, toUserId}, {fromUserId: toUserId, toUserId: fromUserId}]});
    if(existingRequest){
        throw new Error("Connection request already sent");
    }
    
   const isvalidUser = await User.findOne({ _id: toUserId });
    if(!isvalidUser){
        throw new Error("Invalid user");
    }

    const newConnectionRequest = new connectionRequestModel({
        fromUserId,toUserId,status
    });

    const data = await newConnectionRequest.save();
    res.send(data);
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message)
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res)=>{
    const requestId = req.params.requestId;
    const status = req.params.status;
    //const toUserId = req.user._id;

    const isValidStatus = ["accepted","rejected"].includes(status);
    if(!isValidStatus){
        throw new Error("Invalid status type");
    }
   const loggedInUser = req.user;
    const connectionRequest = await connectionRequestModel.findOne({
        _id: requestId, 
        toUserId: loggedInUser._id,
        status:"intrested"});
    if(!connectionRequest){
        throw new Error("Connection request not found");
    }

   connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.send(data);
})



module.exports = requestRouter;