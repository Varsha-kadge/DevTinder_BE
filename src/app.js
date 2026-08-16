const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");

app.use(express.json());
app.use(cookieParser());

// middleware which will take json and convert it into object and store in req.body
app.use('/', authRouter);
app.use('/', requestRouter);
app.use('/', profileRouter);
app.use("/", userRouter);



connectDB().then(()=>{
console.log("Connected to DB Successfully");
app.listen(3000,()=>{
    console.log("server started successfully on port 3000...");
});
}).catch((err)=>{
 console.log(err);
})
