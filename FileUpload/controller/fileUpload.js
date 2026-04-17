const fs = require('fs');
const path = require('path');
const File = require('../model/file');
const { cloudinary } = require('../config/cloudinary');

const LocalfileUpload = async (req, res) => {
    try {
        const uploadedFile = req.files.file;

        if (!uploadedFile) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const uploadDir = path.join(__dirname, "temp");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const tempFilePath = path.join(uploadDir, uploadedFile.name);

        await uploadedFile.mv(tempFilePath);

        return res.status(200).json({
            message: "File uploaded successfully",
            path: tempFilePath
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

function isSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

async function UploadToCloudinary(file, folder, quality = "none") {
    const options = { folder };

    if (quality !== "none") {
        options.quality = quality;
    }

    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

const imageUpload = async (req, res) => {
    try {
        const { tags, email } = req.body;
        const imageFile = req.files?.imageFile;

        if (!tags || !email || !imageFile) {
            return res.status(401).json({
                success: false,
                message: "Incomplete Credentials"
            });
        }

        const fileName = Date.now() + "tempFile";
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = imageFile.name.split('.').pop().toLowerCase();

        if (!isSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Type Not Supported"
            });
        }

        const response = await UploadToCloudinary(imageFile, "Files");

        if (!response) {
            return res.status(400).json({
                success: false,
                message: "No Response Found"
            });
        }

        const fileData = await File.create({
            filename: fileName,
            fileUrl: response.secure_url,
            type: fileType,
            tags,
            email
        });

        res.status(200).json({
            success: true,
            message: "Successfully Uploaded to Cloudinary"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const videoUpload= async (req,res)=>{
    try{
        const {tags,email}=req.body
        const videoFile= req.files?.videoFile

        console.log("Received video file:", videoFile ? videoFile.name : "No file received");

        if(!videoFile || !tags || !email){
            return res.status(401).json({
                success:false,
                message:"Incomplete Credentials"
            })
        }

        const fileName=videoFile.name
        const supportedTypes=["mp4","mkv","avi"]
        const fileType=fileName.split('.').pop().toLowerCase()

        if(!isSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Type Not Supported"
            })
        }

        const response=await UploadToCloudinary(videoFile,"Videos","auto")
        if(!response){
            return res.status(400).json({
                success:false,
                message:"No Response Found"
            })
        }   
        console.log("Cloudinary response:", response)
        
        const fileData=await File.create({
            filename:fileName,
            fileUrl:response.secure_url,
            type:fileType,
            tags,
            email
        })

        console.log("Video uploaded successfully:", response.secure_url)
        res.status(200).json({
            success:true,
            message:"Successfully Uploaded to Cloudinary"
        })
    }catch(err){
        console.log("Error in Video Upload", err)
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

module.exports = { LocalfileUpload, imageUpload,videoUpload};