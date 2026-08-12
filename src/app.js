const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validateLoginData");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const {userAuth} = require("./middleware/auth");
const app = express();
const saltRounds =10;
// middleware which will take json and convert it into object and store in req.body
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async(req,res)=>{
    validateSignUpData(req);
    const {firstName,lastName,emailId,password} = req.body;
    try{
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({firstName,lastName,emailId,password:passwordHash});
    await user.save();
    console.log(req.body);
    res.send("User is added successfully!");
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message)
    }
})

app.get("/profile", userAuth, async(req,res) => {
    try{
    const User = req.body;
    res.send(User);
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message)
    }
})

app.post("/login", async(req,res) => {
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

app.patch("/user",(req,res)=>{
    const ID = req.body.Id;
    const data = req.body;
    const validate = { runValidators: true }
    console.log(data, ID)
    try{
     const user = User.findByIdAndUpdate(ID,data, validate);
     //console.log(user);
     res.send("Updated Successfully");

    }catch(err){
        res.status(400).send("Something went wrong");
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
