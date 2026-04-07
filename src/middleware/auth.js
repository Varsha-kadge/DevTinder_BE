require('express');

const authUser = (req,res,next) => {
    const token = "xyz";
    const isUserAuthenticate = token === 'xy'
    if(!isUserAuthenticate){
        res.status(401).send("UnAutherised User");
    }
    else{
        next();
    }
}

module.exports = {authUser}