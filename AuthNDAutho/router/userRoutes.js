const express=require('express')
const router=express.Router()
const {userLogin,userSignUp}=require('../controller/user')
const {auth,Student,Admin,Visitor}=require('../middleware/userMiddleware')
//const {auth,const {auth,Student,Admin,Visitor}=require('../middleware/userMiddleware')

//Signup & SignIn
router.get('/login',userLogin)
router.get('/signup',userSignUp)

//Accessing the Routes
router.get('/student',auth,Student,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to Student Route"
    })
})

router.get('/admin',auth,Admin,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to Admin Route"
    })
})

router.get('/visitor',auth,Visitor,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to Visitor Route"
    })
})

//Instead of this we can also do

/*
router.get('/student',auth,authorizeRoutes,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to Student Route"
    })
})

router.get('/admin',auth,authorizeRoutes,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to Admin Route"
    })
})

router.get('/visitor',auth,authorizeRoutes,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to Visitor Route"
    })
})
*/