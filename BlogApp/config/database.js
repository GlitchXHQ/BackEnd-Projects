const mongoose=require('mongoose')

const db = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("DB connected successfully")
        }).catch((err)=>{
            console.log("DB connection failed", err)
        })
    }catch(err){    
        console.log("Error while connecting DB",err)
    }
}

module.exports=db