const User=require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fields Must Be Filled"
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const checkPass = await bcrypt.compare(password, user.password);

        if (!checkPass) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        );

        const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        };

        user.password = undefined;

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "User Login Successfully",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


const userSignUp=async(req,res)=>{
    try{
        const{name,email,password,role}=req.body
        
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Fields Must Be Filled"
            })
        }
        
        const normalizedEmail=email.toLowerCase().trim()
        const isPresent=await User.findOne({email})

        if(isPresent){
            return res.status(409).json({
                success:false,
                message:"User Already Present"
            })
        }

        const hashPass=await bcrypt.hash(password,10)

        const user=new User({
            name,
            email:normalizedEmail,
            password:hashPass,
            role:'Student'
        })

        await user.save()

        res.status(201).json({
            success:true,
            message:"Sign Up Successful"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

module.exports={userLogin,userSignUp}
