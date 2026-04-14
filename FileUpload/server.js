const express=require('express')
const app=express()

require('dotenv').config()
const PORT=process.env.PORT || 4000

//Middlewares
app.use(express.json())

//Server Start
app.listen(PORT,()=>{
    console.log("App is Running Smoothly at PORT: ",PORT)
})

app.get('/',(req,res)=>{
    res.send("Hello Server")
})