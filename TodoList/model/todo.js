const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    comments:[
        {
            text:String,
            createdAt:{
                type:Date,
                default:Date.now()
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Todo", todoSchema);