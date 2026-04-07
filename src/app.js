const express = require("express");
const app = express();
const {authUser} = require("./middleware/auth");

app.use("/user",authUser, (req,res) => {
    res.send("response")
})

app.listen(3000,()=>{
    console.log("server started successfully on port 3000...");
});