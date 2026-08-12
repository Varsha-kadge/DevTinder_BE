const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        maxlength:20,
        minlength:3,
        required:true
    },
    lastName:{
        type:String,
        maxlength:20,
        minlength:3,
        required:true
    },
    emailId:{
        type:String,
        unique:true,
        lowercase:true,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        },
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
        min:18,
        max:100,

    },
    gender:{
        type:String,
        validate(value){
            if(!["Male","Female","Other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
});

userSchema.methods.getjwtToken = async function(){
    let user = this;
    const token = jwt.sign({emailId:user.emailId}, "vk@devtinder#1234", {expiresIn: "1h"});
    return token;
} 
userSchema.methods.validatePassword = async function(password){
    let user = this;
    const isvalidatePassword = await bcrypt.compare(password,user.password);
    return isvalidatePassword
}

module.exports = mongoose.model("User", userSchema);