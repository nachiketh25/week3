const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://nachiketh:attkinson@cluster0.jul2h1f.mongodb.net/course_selling_app').then(()=>{
    console.log("connected to db");
}
).catch((err)=>{
    console.log(err);
}
);


// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

const UserSchema = new mongoose.Schema({
    // Schema definition here

    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
        title:String,
        description:String,
        imageLink:String,
        price:Number

    
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}