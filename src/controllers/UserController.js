//usermodel require
const userModel = require("../models/UserModel");
//db.users

const getAllUsers = async (req, res) => {
  //db.users.find()
  const users = await userModel.find();
  res.json({ message: "get all users..", data: users });
};
const getUserById = async (req, res) => {
  //req.params
  const id = req.params.id;

  //const foundUser = await userModel.find({_id:id})
  //const foundUser = await userModel.findOne({_id:id})
  const foundUser = await userModel.findById(id);
  if (foundUser) {
    res.json({
      message: "user found",
      data: foundUser,
    });
  } else {
    res.json({
      message: "user not found",
    });
  }
};

//req.query

const searchUser = async (req, res) => {
  const data = req.query; //{josn object}
  console.log(data);
  res.json({ data: data });
};

// const createUser = async(req,res)=>{
//     //req.params :id
//     //req.query = ?&
//     //req.body : POST,PUT,DELETE
//     console.log("req body",req.body)
//     //db.users.insertOne(req.body)
//     //userModel.insertOne(req.body)
//     const savedUser = await userModel.insertOne(req.body) //-->
//     res.json({message:"user created",data:savedUser})
// }

const createUser = async (req, res) => {
  try {
    const savedUser = await userModel.insertOne(req.body);
    res.json({
      message: "user saved!!",
      data: savedUser,
    });
  } catch (err) {
    res.json({ err: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    //const deletedUser = userModel.deleteOne({_id:ObjectId(req.params.id)})
    const id = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (deletedUser) {
      res.status(200).json({
        message: "user deleted.",
        date: deletedUser,
      });
    } else {
      res.status(404).json({
        message: "user not found to delete",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error while deleting user",
      err: err,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    //const data = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body,{new:true});
    if (updatedUser) {
      res.status(200).json({
        message: "user updated",
        data: updatedUser,
      });
    } else {
      res.status(404).json({
        message: "user not found to update",
      });
    }
  } catch (err) {
    res.status(500).json({
      err: err,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  searchUser,
  createUser,
  deleteUser,
  updateUser
};
