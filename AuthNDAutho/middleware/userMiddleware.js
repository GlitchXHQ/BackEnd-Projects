const jwt=require('jsonwebtoken')

const auth=async(req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1]

        if(!token){
            return res.status(404).json({
                success:false,
                message:"No Token Found"
            })
        }

        const decode=jwt.verify(token,process.env.SECRET_KEY)

        if(!decode){    
            return res.status(401).json({
                success:false,
                message:"Invalid Token  Provided"
            })
        }   

        req.user=decode
        next()

    }catch(err){
        res.status(500).json({
            success:false,
            message:"Server Error",
            err
        })
    }
}

const Student=async(req,res,next)=>{
    try{
        if(req.user.role!=='Student'){
            return res.status(403).json({
                success:false,
                message:"Access Denied"
            })
        }
        next()

    }catch(err){
        res.status(500).json({
            success:false,
            message:"Server Error",
            err
        })
    }
}

const Admin=async(req,res,next)=>{
    try{
        if(req.user.role!=='Admin'){
            return res.status(403).json({
                success:false,
                message:"Access Denied"
            })
        }   
        next()
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Server Error",
            err
        })
    }
}

const Visitor=async(req,res)=>{
    try{
        if(req.user.role!=='Visitor'){
            return res.status(403).json({
                success:false,
                message:"Access Denied"
            })
        }           
        next()
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Server Error",
            err
        })
    }   
}

//Instead of this we can also use this for accessing the routes

/*
const authorizeRoutes=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }
        next()
    }
}
*/

module.exports={auth,Student,Admin,Visitor}
//module.exports={authorizeRoutes}