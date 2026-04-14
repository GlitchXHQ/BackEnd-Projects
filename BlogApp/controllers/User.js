const User=require('../models/user')
const bcrypt=require('bcrypt')

const userRegister=async(req,res)=>{
    try{
        const{name,email,password}=req.body
        
        if(!name || !email || !password){
            console.log("Incomplete Login Details")
            return res.status(404).json({
                success:false,
                message:"Fields Must Be Filled"
            })
        }

        const existingUser=await User.findOne({email})
        
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User Already Exists"
            })
        }

        const newPass=await bcrypt.hash(password,10)
        const user=await User.create({
            name,
            email,
            password:newPass
        })

        return res.status(201).json({
            success:true,
            message:"User Created Successfully",
            user
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Server Error",
            error:err
        })
    }
}

const userLogin=async(req,res)=>{
    try{
        const {email,password}=req.body

        if(!email || !password){
            return res.status(404).json({
                success:false,
                message:"Fields Must Be Filled"
            })
        }

        const user=await User.findOne({email})
        
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            })
        }   

        const token = jwt.sign(
            { id: user._id },
            "secretkey",
            { expiresIn: "2h" }
        );

        user.password=undefined

        return res.status(200).json({
            success:true,
            message:"Login Successful",
            user,
            token
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Server Error",
            error:err
        })
    }
}