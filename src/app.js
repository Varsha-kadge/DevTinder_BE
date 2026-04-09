const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());
app.post("/signup", async(req,res)=>{
    //const user = new User();
    try{
    ///await user.save();
    console.log(req.body);
    res.send("User added successfully!");
    }
    catch(err){
        res.status(400).send("Error saving the user:" + err.message)
    }
})

app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const user = await User.findOne({emailId: userEmail });
        if(!user){
          res.status(404).send("user not found");
        }
        else{
            res.send(user)
        }
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})

app.delete("/user",async (req,res)=>{
 const userId = req.body.ID;
 console.log(userId)
try{
    const user = await User.findByIdAndDelete({_id : userId });
    if(!user){
        res.status(400).send("User Not Found");
    }
    else {
        res.send(user)
    }
}catch(err){
    res.status(400).send("Something Went Wrong");
}
})

connectDB().then(()=>{
console.log("Connected to DB Successfully");
app.listen(3000,()=>{
    console.log("server started successfully on port 3000...");
});
}).catch((err)=>{
 console.log(err);
})
