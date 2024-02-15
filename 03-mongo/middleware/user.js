const {User}=require('../db');
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username=req.headers.username;
    const password=req.headers.password;
    User.find({username,password})
    .then((user)=>{
        if(user){
            next();
        }
        else{
            res.send("Not an user");
        }
    })
    .catch((err)=>{
        res.send(err);
    })

}

module.exports = userMiddleware;