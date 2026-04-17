const express=require('express')
const app=express()
require('dotenv').config()

const PORT=process.env.PORT || 4000

app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(PORT,()=>(
    console.log("Server is Running at PORT", PORT)
))
