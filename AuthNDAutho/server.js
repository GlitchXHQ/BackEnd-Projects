const express=require('express')
const app=express()
const dotenv=require('dotenv')
const PORT=process.env.PORT || 4000;

require('dotenv').config()

app.use(express.json())

app.listen(PORT,()=>{
    console.log("Server Running on PORT", PORT)
})