const cloudinary = require("cloudinary").v2;
require("dotenv").config()

const uploadtoCloud = async(path)=>{

    cloudinary.config({
        api_key:process.env.CLOUNDINARY_API_KEY,
        api_secret:process.env.CLOUNDINARY_API_SECRET,
        cloud_name:process.env.CLOUNDINARY_CLOUD_NAME
    })

    const cloundinaryresponse =  await cloudinary.uploader.upload(path)
    return cloundinaryresponse

}
module.exports = uploadtoCloud
