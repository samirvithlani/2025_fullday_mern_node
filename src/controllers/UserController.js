//usermodel require
const userModel = require("../models/UserModel")
//db.users

const getAllUsers = async(req,res)=>{

    //db.users.find()
    const users = await userModel.find()
    res.json({message:"get all users..",data:users})
}
const getUserById = (req,res)=>{
    console.log("params",req.params) //{id:""}
    console.log(req.params.id)
    res.json({message:"get user by id called...",id:req.params.id})
}

module.exports ={
    getAllUsers,getUserById
}
