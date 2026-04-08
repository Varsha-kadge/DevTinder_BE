require('express');

const authUser = (req,res,next) => {
    const token = "xyz";
    const isUserAuthenticate = token === 'xyz'
    if(!isUserAuthenticate){
        res.status(401).send("UnAutherised User");
    }
    else{
        next();
    }
}

module.exports = {authUser}