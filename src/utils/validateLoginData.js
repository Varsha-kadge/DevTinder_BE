const validator = require('validator');
const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName || !emailId || !password){
        throw new Error("Missing Required Fields");
    }
    else if(firstName.length <3 || lastName.length<3){
        throw new Error("First Name and Last Name should be at least 3 characters long");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
    }
    return true;

}
module.exports = {validateSignUpData};