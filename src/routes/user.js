const express = require('express');
const userRouter = express.Router();
const {userAuth} = require("../middleware/auth.js");
const connectionRequestModel = require("../models/connectionRequest.js");
const user = require('../models/user.js');



userRouter.get("/user/request/received",userAuth,async(req,res)=>{
    try{
     const loogedInUser = req.user;

     const connectionRequests = await connectionRequestModel.find({
        toUserId: loogedInUser._id,
        status: "intrested"
     }).populate("fromUserId","firstName lastName email");
       if(!connectionRequests){
        throw new Error("Connection request not found");
    }
     res.json({message: "Connection requests received", data:connectionRequests});

    }catch(err){
        res.status(400).send("ERROR: ", err.message)
    }
})
 userRouter.get("/user/connections", userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const connections = await connectionRequestModel.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" }
            ]
        }).populate("fromUserId toUserId", "firstName lastName email");
        if(!connections){
            throw new Error("No connections found");
        }
        res.json({message: "Connections found", data:connections});

    }
    catch(err){
        res.status(400).send("ERROR:",err.message);
    }
 })

 userRouter.get("/user/feed/:page/:limit", userAuth, async(req,res)=>{
    try{
        const page = req.params.page || 0;
        const limit = req.params.limit || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1)*limit
        const loggedInUser = req.user;
        const connections = await connectionRequestModel.find({
            $or: [
                { fromUserId: loggedInUser._id},
                { toUserId: loggedInUser._id}
            ]
        });
        if(!connections){
            throw new Error("No connections found");
        }
        const hideUsersFromFeed = new Set();
        connections.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })
           const feedUsers = await user.find({ $and:[{_id :{$nin:Array.from(hideUsersFromFeed)}}, {_id:{$ne:loggedInUser._id}}] 
        }).skip(skip).limit(limit);
        //const feedUsers = await user.find({_id: {$in: connectionIds}});
        res.json({message: "Feed users found", data:feedUsers});    

    }
    catch(err){
        res.status(400).send("ERROR:",err.message);
    }
 })

module.exports = userRouter;