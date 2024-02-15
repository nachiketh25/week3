// Middleware for handling auth
const jwt =require ('jsonwebtoken');
const secret=require('../index');
const {Admin}=require('../db');
const {JWT_SECRET} = require('../config');

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token =req.headers.authorization;
    const words=token.split(" ");
    const jwtToken=words[1];
   const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
   if(decodedValue.username){
       next();
   }
    else{
         res.status(401).json({
              message:'Unauthorized'
         });
    }

    const username=req.headers.username;    
    const password=req.headers.password;
    Admin.find({
        username:username,
        password:password
    })
    .then((Admin)=>{
        if(Admin){
            next();
        }
        else{
            res.send("Not an admin");
        }
    })
    .catch((err)=>{
        res.send(err);
    })



}


module.exports = adminMiddleware;