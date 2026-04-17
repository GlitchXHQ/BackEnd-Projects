const mongoose=require('mongoose')

const fileSchema=new mongoose.Schema({
    filename:{
        type:String,
    },
    fileUrl:{
        type:String,
    },
    type:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        toLowerCase:true,
        trim:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model('File',fileSchema)