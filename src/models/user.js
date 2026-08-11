const mongoose = require("mongoose");
const validator = require("validator");

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

module.exports = mongoose.model("User", userSchema);