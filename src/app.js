const express = require("express");
const app = express();

app.get("/ab*c",(req, res) => {
 res.send({"firstname" :"varsha", "lastname":"kadge"})
})
app.post("/user",(req, res) => {
 res.send({"firstname" :"Ritiz", "lastname":"dudeja"})
})

app.listen(3000,()=>{
    console.log("server started successfully on port 3000...")
});