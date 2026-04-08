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

connectDB().then(()=>{
console.log("Connected to DB Successfully");
app.listen(3000,()=>{
    console.log("server started successfully on port 3000...");
});
}).catch((err)=>{
 console.log(err);
})
