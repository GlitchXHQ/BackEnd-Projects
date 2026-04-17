const express=require('express');
const app=express()
const database=require('./config/database')
const {connectCloudinary}=require('./config/cloudinary')
const fileRoutes=require('./routes/file')
const fileUpload = require('express-fileupload');

const PORT=process.env.PORT || 3000

app.use(express.json())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'./temp'
}))

require('dotenv').config()

database()
connectCloudinary()

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use('/api/v1/files',fileRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})