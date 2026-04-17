const express=require('express');
const router=express.Router()
const {LocalfileUpload,imageUpload,videoUpload}=require('../controller/fileUpload')

router.post('/upload',LocalfileUpload)
router.post('/uploadImages',imageUpload)
router.post('/upload/videoUpload',videoUpload)

module.exports=router