const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,User,Course}=require('../db');
const jwt =require ('jsonwebtoken');
const {JWT_SECRET} = require('../config');


// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    const admin=new Admin({
        username:username,
        password:password
    }); 
    await Admin.create({
        username,
        password
    })
        .then(()=>{
            res.status(201).json({
                message:'Admin created successfully',
            });
        })
       
    
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    const user=await User.find({
        username:username,
        password:password
    })
    if (user){
        const token=jwt.sign({username},JWT_SECRET);
        res.status(200).json({
            message:'Admin logged in',
            token:token
        });
    }
    else{
        res.status(401).json({
            message:'Unauthorized'
        });
    }
   

});

router.post('/courses', adminMiddleware ,async (req, res) => {
    // Implement course creation logic

    const title=req.body.title;
    const description=req.body.description;
    const imageLink=req.body.imageLink;
    const price =req.body.price;
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({msg:"Course created successfully"},{cousreId:newCourse._id});

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses= await Course.find({});
    res.json({
        courses:allCourses

    })
});

module.exports = router;